$(document).ready(function () {
    // Load the MLB info from the JSON file
    $.getJSON("mlb_info.json", function (data) {
        // Populate the resultID_select dropdown with options
        var select = $("#resultID_select");
        $.each(data[2].data, function (index, item) {
            select.append(
                $("<option></option>")
                    .attr("value", item.result_ID)
                    .text("Result ID " + item.result_ID)
            );
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
                    width: 800, // 設定圖形的寬度
                    height: 800, // 設定圖形的高度
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Event listener for the resultID_select dropdown
        $("#resultID_select").on("change", function () {
            var selectedResultID = $(this).val();
            var selectedData = data[2].data.find(
                (item) => item.result_ID === selectedResultID
            );

            var CIO_table = JSON.parse(selectedData.CIO_table);
            displayCIOTable(CIO_table);

            var ue_init_dist = JSON.parse(selectedData.ue_init_dist);
            var ue_MLB_dist = JSON.parse(selectedData.ue_MLB_dist);
            displayBarChart(ue_init_dist, ue_MLB_dist);
        });

        // Trigger the change event to display the initial CIO table
        $("#resultID_select").trigger("change");

        // Function to generate a random number between min and max (inclusive)
        function getRandomNumber(min, max) {
            return Math.random() * (max - min) + min;
        }

        // Function to update line chart with random data
        function updateLineChart() {
            var bsLabels = ["BS1", "BS2", "BS3", "BS4", "BS5", "BS6", "BS7"];
            var randomData = bsLabels.map(function () {
                return getRandomNumber(0, 100); // Generate random data between 0 and 100
            });

            // Call the function to display the line chart
            displayLineChart(bsLabels, randomData);
        }

        // Function to display the line chart
        function displayLineChart(labels, data) {
            // Remove any existing chart in the chart-container
            $("#line_chart-container").empty();

            // Create a canvas element to render the chart
            var canvas = document.createElement("canvas");
            canvas.id = "lineChart";
            $("#line_chart-container").append(canvas);

            var ctx = canvas.getContext("2d");

            new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Performance",
                            data: data,
                            backgroundColor: "rgba(75, 192, 192, 0.5)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Set to true to control the chart's size
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Function to update the line chart every second
        setInterval(updateLineChart, 1000);
    });
});
