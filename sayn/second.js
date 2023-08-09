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
        //                                                                             CIO Table Chart

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
        });

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

                setTimeout(updateChartData, 1000);
            }
        }

        updateChartData();

        function getRandomNum(min, max) {
            var range = max - min;
            var rand = Math.random();
            return (min + Math.round(rand * range));
        }



        // Trigger the change event to display the initial CIO table
        $("#resultID_select").trigger("change");
    });
});
