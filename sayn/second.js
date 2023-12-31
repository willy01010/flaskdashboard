visiable_bar = [true, true, true, true, true, true]
var one, two, three, four, five, six = true;

$(document).ready(function () {
    // Load the MLB info from the JSON file
    $.getJSON("mlb_result.json", function (data) {
        // Populate the resultID_select dropdown with options
        var select = $("#resultID_select");
        $.each(data[2].data, function (index, item) {
            select.append(
                $("<option></option>")
                    .attr("value", item.result_UE_BS_info_ID)
                    .text("Result ID " + item.result_UE_BS_info_ID)
            );
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

            // 創建六個數據集，每個數據集都有自己的標籤
            var datasets = [
                {
                    label: "init_satisfied_1_1",
                    data: visiable_bar[0] ? [parseFloat(selectedData.init_satisfied_1_1)] : [],
                    // data: [parseFloat(selectedData.init_satisfied_1_1)],
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1
                },
                {
                    label: "MLB_satisfied_1_1",
                    data: visiable_bar[1] ? [parseFloat(selectedData.MLB_satisfied_1_1)] : [],
                    // data: [parseFloat(selectedData.MLB_satisfied_1_1)],
                    backgroundColor: "rgba(255, 205, 86, 0.5)",
                    borderColor: "rgba(255, 205, 86, 1)",
                    borderWidth: 1
                },
                {
                    label: "init_satisfied_0_6",
                    data: visiable_bar[2] ? [parseFloat(selectedData.init_satisfied_0_6)] : [],
                    // data: [parseFloat(selectedData.init_satisfied_0_6)],
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1
                },
                {
                    label: "MLB_satisfied_0_6",
                    data: visiable_bar[3] ? [parseFloat(selectedData.MLB_satisfied_0_6)] : [],
                    // data: [parseFloat(selectedData.MLB_satisfied_0_6)],
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                },
                {
                    label: "init_satisfied_0_1",
                    data: visiable_bar[4] ? [parseFloat(selectedData.init_satisfied_0_1)] : [],
                    // data: [parseFloat(selectedData.init_satisfied_0_1)],
                    backgroundColor: "rgba(255, 159, 64, 0.5)",
                    borderColor: "rgba(255, 159, 64, 1)",
                    borderWidth: 1
                },


                {
                    label: "MLB_satisfied_0_1",
                    data: visiable_bar[5] ? [parseFloat(selectedData.MLB_satisfied_0_1)] : [],
                    // data: [parseFloat(selectedData.MLB_satisfied_0_1)],
                    backgroundColor: "rgba(153, 102, 255, 0.5)",
                    borderColor: "rgba(153, 102, 255, 1)",
                    borderWidth: 1
                }
            ];
            displaySatisfied(datasets);

        });

        // 切換標籤的按鈕點擊事件
        $(".button-container button").click(function () {
            // 獲取按鈕的文本內容，即標籤名
            selectedLabel = $(this).text();
            // 觸發下拉菜單的改變事件，以重新渲染圖表
            $("#resultID_select").trigger("change");
        });

        // Trigger the change event to display the initial CIO table
        $("#resultID_select").trigger("change");
    });

    var isPaused = false; // 初始值為未暫停

    // 點擊暫停按鈕時的處理程序
    $("#pauseButton").click(function () {
        isPaused = true; // 設置為暫停狀態
    });

    // 點擊繼續按鈕時的處理程序
    $("#resumeButton").click(function () {
        isPaused = false; // 設置為非暫停狀態
    });

    // Function to display the CIO table
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

    //                                                                           Bar Chart

    // Function to display the bar chart
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
            document.getElementById('showDistribution').checked == true &&      //全選
            document.getElementById('showThroughput').checked == true &&
            document.getElementById('showSatisfied').checked == true) ||
            (document.getElementById('showCIO').checked == false &&
                document.getElementById('showDistribution').checked == false &&
                document.getElementById('showThroughput').checked == false &&       //全不選
                document.getElementById('showSatisfied').checked == false) ||
            (document.getElementById('showCIO').checked == true &&
                document.getElementById('showDistribution').checked == true &&
                document.getElementById('showThroughput').checked == true &&        //選三個
                document.getElementById('showSatisfied').checked == false) ||
            (document.getElementById('showCIO').checked == true &&
                document.getElementById('showDistribution').checked == true &&
                document.getElementById('showThroughput').checked == false &&
                document.getElementById('showSatisfied').checked == true) ||
            (document.getElementById('showCIO').checked == true &&
                document.getElementById('showDistribution').checked == false &&
                document.getElementById('showThroughput').checked == true &&
                document.getElementById('showSatisfied').checked == true) ||
            (document.getElementById('showCIO').checked == false &&
                document.getElementById('showDistribution').checked == true &&
                document.getElementById('showThroughput').checked == true &&
                document.getElementById('showSatisfied').checked == true)

        ) {
            document.getElementById('UE_Dist-chart').className = "w3-third dashout"
            document.getElementById('CIO_table-chart').className = "w3-third dashout"
            document.getElementById('BS_Thro-chart').className = "w3-third dashout"
            document.getElementById('Satisfied-chart').className = "w3-third dashout"
        }

        if ((document.getElementById('showCIO').checked == false &&
            document.getElementById('showDistribution').checked == false &&
            document.getElementById('showThroughput').checked == true &&
            document.getElementById('showSatisfied').checked == true) ||
            (document.getElementById('showCIO').checked == false &&
                document.getElementById('showDistribution').checked == true &&
                document.getElementById('showThroughput').checked == false &&
                document.getElementById('showSatisfied').checked == true) ||
            (document.getElementById('showCIO').checked == false &&
                document.getElementById('showDistribution').checked == true &&
                document.getElementById('showThroughput').checked == true &&
                document.getElementById('showSatisfied').checked == false) ||
            (document.getElementById('showCIO').checked == true &&
                document.getElementById('showDistribution').checked == false &&
                document.getElementById('showThroughput').checked == false &&
                document.getElementById('showSatisfied').checked == true) ||
            (document.getElementById('showCIO').checked == true &&
                document.getElementById('showDistribution').checked == false &&
                document.getElementById('showThroughput').checked == true &&
                document.getElementById('showSatisfied').checked == false) ||
            (document.getElementById('showCIO').checked == true &&
                document.getElementById('showDistribution').checked == true &&
                document.getElementById('showThroughput').checked == false &&
                document.getElementById('showSatisfied').checked == false)
        ) {
            document.getElementById('UE_Dist-chart').className = "w3-half dashout"
            document.getElementById('CIO_table-chart').className = "w3-half dashout"
            document.getElementById('BS_Thro-chart').className = "w3-half dashout"
            document.getElementById('Satisfied-chart').className = "w3-half dashout"

        }
        if ((document.getElementById('showCIO').checked == true &&
            document.getElementById('showDistribution').checked == false &&
            document.getElementById('showThroughput').checked == false &&
            document.getElementById('showSatisfied').checked == false) ||
            (document.getElementById('showCIO').checked == false &&
                document.getElementById('showDistribution').checked == true &&
                document.getElementById('showThroughput').checked == false &&
                document.getElementById('showSatisfied').checked == false) ||
                (document.getElementById('showCIO').checked == false &&
                document.getElementById('showDistribution').checked == false &&
                document.getElementById('showThroughput').checked == true &&
                document.getElementById('showSatisfied').checked == false) ||
            (document.getElementById('showCIO').checked == false &&
                document.getElementById('showDistribution').checked == false &&
                document.getElementById('showThroughput').checked == false &&
                document.getElementById('showSatisfied').checked == true)                
        ) {
            document.getElementById('UE_Dist-chart').className = "w3-twothird dashout"
            document.getElementById('CIO_table-chart').className = "w3-twothird dashout"
            document.getElementById('BS_Thro-chart').className = "w3-twothird dashout"
            document.getElementById('Satisfied-chart').className = "w3-twothird dashout"

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

    $("#showSatisfied").change(function () {
        if (this.checked) {
            $("#Satisfied-chart").show();
            check_SelectBox();

        } else {
            $("#Satisfied-chart").hide();
            check_SelectBox();

        }
    });

    //                                                                            linear Chart

    var dataLabels = ['1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', '10s'];
    var data_init_tp = [133058, 253219, 255194, 133058, 253219, 277318, 277714, 173337, 155194, 177318];
    var data_MLB_tp = [1338, 33219, 25194, 33058, 25321, 27738, 7714, 17337, 15594, 77318];

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
    // 創建圖表函數
    function displaySatisfied(datasets) {
        // Remove any existing chart in the chart-container
        $("#Satisfied-container").empty();

        // Create a canvas element to render the chart
        var canvas = document.createElement("canvas");
        canvas.id = "barChart";
        $("#Satisfied-container").append(canvas);

        var ctx = canvas.getContext("2d");

        var myChart = new Chart(ctx, {
            type: "horizontalBar", // Change the chart type to horizontalBar
            data: {
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'y', // Set the axis to y for horizontal bars
                scales: {
                    x: { // Use x scale for horizontal bars
                        // beginAtZero: true,
                        min: 0,
                        max: 80,
                    }
                },
                animation: {
                    duration: 0 // 動畫效果
                }
            }
        });
    }
});


function bar_vis(i) {

    // for(var k=0;k<6;k++){

    if (i == 1) {

        if (one) {

            visiable_bar[0] = false//show

            one = false

            document.getElementById('oneBT').style = "background-color: aqua;"

        } else {

            visiable_bar[0] = true//hide

            one = true

            document.getElementById('oneBT').style = ""

            document.getElementById('oneBT').class = ""

        }

    }

    if (i == 2) {

        if (two) {

            visiable_bar[1] = false//show

            two = false

            document.getElementById('twoBT').style = "background-color: aqua;"

        } else {

            visiable_bar[1] = true//hide

            two = true

            document.getElementById('twoBT').style = ""

            document.getElementById('twoBT').class = ""

        }

    }

    if (i == 3) {

        if (three) {

            visiable_bar[2] = false//show

            three = false

            document.getElementById('threeBT').style = "background-color: aqua;"

        } else {

            visiable_bar[2] = true//hide

            three = true

            document.getElementById('threeBT').style = ""

            document.getElementById('threeBT').class = ""

        }

    }

    if (i == 4) {

        if (four) {

            visiable_bar[3] = false//show

            four = false

            document.getElementById('fourBT').style = "background-color: aqua;"

        } else {

            visiable_bar[3] = true//hide

            four = true

            document.getElementById('fourBT').style = ""

            document.getElementById('fourBT').class = ""

        }

    }

    if (i == 5) {

        if (five) {

            visiable_bar[4] = false//show

            five = false

            document.getElementById('fiveBT').style = "background-color: aqua;"

        } else {

            visiable_bar[4] = true//hide

            five = true

            document.getElementById('fiveBT').style = ""

            document.getElementById('fiveBT').class = ""

        }

    }

    if (i == 6) {

        if (six) {

            visiable_bar[5] = false//show

            six = false

            document.getElementById('sixBT').style = "background-color: aqua;"

        } else {

            visiable_bar[5] = true//hide

            six = true

            document.getElementById('sixBT').style = ""

            document.getElementById('sixBT').class = ""

        }

    }

}

