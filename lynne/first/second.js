$(document).ready(function () {
    // Event listener for the resultID_select dropdown
    $("#resultID_select").on("change", function () {
        var selectedResultID = $(this).val();
        var currentIndex = 0;
        // Send an AJAX request to the server to fetch the data for the selected resultID
        $.ajax({
            url: '/getresultdata',
            method: 'GET',
            data: { resultID: selectedResultID },
            success: function (resultData) {
                var selectedData = resultData[0];

                displayCIOTable(selectedData.CIO_table);
                displayBarChart(selectedData.ue_init_dist, selectedData.ue_MLB_dist);
                updateChartData();
            },
            error: function (error) {
                console.error("Error fetching data:", error);
            }
        });
    });
        //CIO Table Chart
        var resultIDs = data[2].data.map((item) => item.result_UE_BS_info_ID);
        var currentIndex = 0;


        function updateCharts() {
            if (!isPaused) { // 如果非暫停狀態才更新圖表
                var selectedResultID = resultIDs[currentIndex];
                $("#resultID_select").val(selectedResultID).trigger("change");
                currentIndex = (currentIndex + 1) % resultIDs.length;
            }
        }

        setInterval(updateCharts, 2000);

        // Event listener for the resultID_select dropdown
        $("#resultID_select").on("change", function () {
            var selectedResultID = $(this).val();
            var selectedData = data[2].data.find(
                (item) => item.result_UE_BS_info_ID === selectedResultID
            );

            var CIO_table = JSON.parse(selectedData.CIO_table);
            displayCIOTable(CIO_table);

            var ue_init_dist = JSON.parse(selectedData.ue_init_dist);
            var ue_MLB_dist = JSON.parse(selectedData.ue_MLB_dist);
            displayBarChart(ue_init_dist, ue_MLB_dist);
            updateChartData();

        });

        // Trigger the change event to display the initial CIO table
        $("#resultID_select").trigger("change");
    

    var isPaused = false;

    $("#pauseButton").click(function () {
        isPaused = true;
    });

    $("#resumeButton").click(function () {
        isPaused = false;
    });

    // ... Rest of your code for checkbox handling, linear chart, etc.

    function displayCIOTable(CIO_table) {
        var tableHtml = "<table>";

        // Adding header row with cell names
        tableHtml += "<tr><th></th>";
        for (let i = 1; i <= 7; i++) {
            tableHtml += "<th>BS" + i + "</th>";
        }
        tableHtml += "</tr>";

        // Adding table data rows with cell names
        for (let i = 0; i < CIO_table.length; i++) {
            tableHtml += "<tr><th>BS" + (i + 1) + "</th>";
            for (let j = 0; j < CIO_table[i].length; j++) {
                tableHtml += "<td>" + CIO_table[i][j] + "</td>";
            }
            tableHtml += "</tr>";
        }

        tableHtml += "</table>";
        $("#cio_table-container").html(tableHtml);
    }

    function displayBarChart(ue_init_dist, ue_MLB_dist) {
        // Remove any existing chart in the chart-container
        $("#bar_chart-container").empty();

        // Create a canvas element to render the chart
        var canvas = document.createElement("canvas");
        canvas.id = "barChart";
        $("#bar_chart-container").append(canvas);

        var ctx = canvas.getContext("2d");

        // Prepare data for the chart
        var bsLabels = ["BS1", "BS2", "BS3", "BS4", "BS5", "BS6", "BS7"];
        var initDistData = ue_init_dist.map(parseFloat);
        var mlbDistData = ue_MLB_dist.map(parseFloat);

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: bsLabels,
                datasets: [
                    {
                        label: "UE Init Dist",
                        data: initDistData,
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1
                    },
                    {
                        label: "UE MLB Dist",
                        data: mlbDistData,
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true, // Set to false to control the chart's size
                // width: 800, // 設定圖形的寬度
                // height: 800, // 設定圖形的高度
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function check_SelectBox() {
        var on3 = '';
        var on2 = '';
        var on1 = '';
        var on0 = '';
        if ((document.getElementById('showCIO').checked == true &&
            document.getElementById('showDistribution').checked == true &&
            document.getElementById('showThroughput').checked == true) ||
            (document.getElementById('showCIO').checked == true &&
                document.getElementById('showDistribution').checked == true &&
                document.getElementById('showThroughput').checked == true) ||
            (document.getElementById('showCIO').checked == true &&
                document.getElementById('showDistribution').checked == true &&
                document.getElementById('showThroughput').checked == true)
        ) {
            document.getElementById('UE_Dist-chart').className = "w3-third dashout"
            document.getElementById('CIO_table-chart').className = "w3-third dashout"
            document.getElementById('BS_Thro-chart').className = "w3-third dashout"
            return on3;
        }

        else if ((document.getElementById('showCIO').checked == true &&
            document.getElementById('showDistribution').checked == true &&
            document.getElementById('showThroughput').checked == false) ||
            (document.getElementById('showCIO').checked == true &&
                document.getElementById('showDistribution').checked == false &&
                document.getElementById('showThroughput').checked == true) ||
            (document.getElementById('showCIO').checked == false &&
                document.getElementById('showDistribution').checked == true &&
                document.getElementById('showThroughput').checked == true)
        ) {

            document.getElementById('UE_Dist-chart').className = "w3-half dashout"
            document.getElementById('CIO_table-chart').className = "w3-half dashout"
            document.getElementById('BS_Thro-chart').className = "w3-half dashout"
            return on2;
        }

        else if ((document.getElementById('showCIO').checked == true &&
            document.getElementById('showDistribution').checked == false &&
            document.getElementById('showThroughput').checked == false) ||
            (document.getElementById('showCIO').checked == false &&
                document.getElementById('showDistribution').checked == true &&
                document.getElementById('showThroughput').checked == false) ||
            (document.getElementById('showCIO').checked == false &&
                document.getElementById('showDistribution').checked == false &&
                document.getElementById('showThroughput').checked == true)
        ) {
            document.getElementById('UE_Dist-chart').className = "w3-twothird dashout"
            document.getElementById('CIO_table-chart').className = "w3-twothird dashout"
            document.getElementById('BS_Thro-chart').className = "w3-twothird dashout"
            return on1;
        }

        else if ((document.getElementById('showCIO').checked == false &&
            document.getElementById('showDistribution').checked == false &&
            document.getElementById('showThroughput').checked == false) ||
            (document.getElementById('showCIO').checked == false &&
                document.getElementById('showDistribution').checked == false &&
                document.getElementById('showThroughput').checked == false) ||
            (document.getElementById('showCIO').checked == false &&
                document.getElementById('showDistribution').checked == false &&
                document.getElementById('showThroughput').checked == false)
        ) {

            // document.getElementById('UE_Dist-chart').className = "w3-half dashout"
            // document.getElementById('CIO_table-chart').className = "w3-half dashout"
            // document.getElementById('BS_Thro-chart').className = "w3-half dashout"
            return on0;
        }

    }

    // Event listeners for checkboxes
    $("#showCIO").change(function () {

        if (this.checked) {
            $("#CIO_table-chart").show();
            check_SelectBox();
        } else {
            $("#CIO_table-chart").hide();
            check_SelectBox();
        }
    });

    $("#showDistribution").change(function () {
        if (this.checked) {
            $("#UE_Dist-chart").show();
            check_SelectBox();

        } else {
            $("#UE_Dist-chart").hide();
            check_SelectBox();

        }
    });

    $("#showThroughput").change(function () {
        if (this.checked) {
            $("#BS_Thro-chart").show();
            check_SelectBox();

        } else {
            $("#BS_Thro-chart").hide();
            check_SelectBox();

        }
    });

    var config = {
        type: 'line',
        data: {
            labels: dataLabels,
            datasets: [
                {
                    label: 'Init BS Total Throughput',
                    data: data_init_tp,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                }
                ,
                {
                    label: 'MLB BS Total Throughput',
                    data: data_MLB_tp,
                    backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgb(0, 0, 255)',
                    fill: false,
                }
            ]


        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'BS Total Throughput'
            },
        }
    };
    var ctx = document.getElementById('linear_chart-container').getContext('2d');
    var chart = new Chart(ctx, config);

    function updateChartData() {
        if (config.data.datasets.length > 0) {

            var last = parseInt(dataLabels[dataLabels.length - 1]);
            var label = last + 1;

            label = label + 's';

            dataLabels.push(label);
            data_init_tp.push(getRandomNum(0, 300000));
            data_MLB_tp.push(getRandomNum(0, 300000));

            dataLabels.shift();
            data_init_tp.shift();
            data_MLB_tp.shift();

            chart.update();

            // setTimeout(updateChartData, 1000);
        }
    }

    function getRandomNum(min, max) {
        var range = max - min;
        var rand = Math.random();
        return (min + Math.round(rand * range));
    }

    $.ajax({
        url: '/getresultdata', // Change this URL to match your server endpoint
        method: 'GET',
        data: { resultID: 1 }, // Change this to the desired result ID
        success: function (resultData) {
            var selectedData = resultData[0];

            displayCIOTable(selectedData.CIO_table);
            displayBarChart(selectedData.ue_init_dist, selectedData.ue_MLB_dist);
            updateChartData();
        },
        error: function (error) {
            console.error("Error fetching data:", error);
        }
    });

});
