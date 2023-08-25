<?php
// Include the database connection file (db.php)
include_once 'db.php';

// Fetch data from the database, including result_UE_BS_info_ID and satisfaction values
$query = "SELECT result_UE_BS_info_ID, init_satisfied_1_1, MLB_satisfied_1_1, init_satisfied_0_6, MLB_satisfied_0_6, init_satisfied_0_1, MLB_satisfied_0_1 FROM mlb_result";
$result = mysqli_query($conn, $query);

$satisfactionData = array();

while ($row = mysqli_fetch_assoc($result)) {
    $satisfactionData[] = $row;
}

// Encode the fetched data into JSON
$satisfactionJson = json_encode($satisfactionData);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Satisfaction Chart</title>
    <!-- Include Chart.js library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</head>

<body>
    <div id='Satisfied-chart' class="w3-third dashout">
        <div class=" w3-card dash">
            <div class="dashbar">
                <div class="dashbar-title">
                    Satisfied Chart
                </div>
            </div>
            <div class="w3-col" style="text-align:center">
                <button id="oneBT" onclick="bar_vis(1)">one</button>
                <button id="twoBT" onclick="bar_vis(2)">two</button>
                <button id="threeBT" onclick="bar_vis(3)">third</button>
                <button id="fourBT" onclick="bar_vis(4)">four</button>
                <button id="fiveBT" onclick="bar_vis(5)">five</button>
                <button id="sixBT" onclick="bar_vis(6)">six</button>
            </div>
            <div id="Satisfied-container">
                <canvas id="satisfied_Chart"></canvas>
            </div>
        </div>
    </div>

    <script>
        // 定義顏色陣列，可以新增更多顏色
        var backgroundColors = [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
            // ... 可以繼續新增更多顏色
        ];
        var satisfactionData = <?php echo $satisfactionJson; ?>;
        var satisfactionLabels = [
            'init_satisfied_1_1',
            'MLB_satisfied_1_1',
            'init_satisfied_0_6',
            'MLB_satisfied_0_6',
            'init_satisfied_0_1',
            'MLB_satisfied_0_1'
        ];

        var currentIndex = 0; // Initialize the current index

        visiable_bar = [true, true, true, true, true, true]
        var one, two, three, four, five, six = true;
        // Function to display the bar chart for the selected result ID
        // Function to display the bar chart for the selected result ID
        function displaySatisfiedChart(selectedResultID) {
            var canvas = document.getElementById("satisfied_Chart").getContext("2d");

            // Find the selected satisfaction data by result_UE_BS_info_ID
            var selectedSatisfactionData = satisfactionData.find(function (data) {
                return data.result_UE_BS_info_ID == selectedResultID;
            });

            if (selectedSatisfactionData) {
                var datasets = [];

                // Loop through the keys in satisfactionLabels
                for (var i = 0; i < satisfactionLabels.length; i++) {
                    var label = satisfactionLabels[i];

                    // Check if the corresponding visiable_bar value is true and the data is greater than 0
                    if (visiable_bar[i] && selectedSatisfactionData[label] > 0) {
                        datasets.push({
                            label: label,
                            data: [selectedSatisfactionData[label]],
                            backgroundColor: backgroundColors[i % backgroundColors.length], // 選取不同的顏色
                            borderColor: backgroundColors[i % backgroundColors.length], // 選取不同的顏色
                            borderWidth: 1
                        });
                    }
                }

                // Update the existing chart or create a new one if it doesn't exist
                if (satisfied_Chart) {
                    // Update the chart data
                    satisfied_Chart.data.datasets = datasets;
                    satisfied_Chart.update();
                } else {
                    // Create a new chart
                    satisfied_Chart = new Chart(canvas, {
                        type: "horizontalBar",
                        data: {
                            labels: [""], // Empty label since legend is not shown
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
                            },
                            plugins: {
                                legend: {
                                    display: false // Hide legend
                                }
                            }
                        }
                    });
                }
            }
        }



        // Get the resultID_select element
        var resultIDSelect = document.getElementById("resultID_select");
        var satisfied_Chart = null; // Store the chart instance

        // Add an event listener to the resultID_select dropdown
        resultIDSelect.addEventListener("change", function () {
            var selectedResultID = resultIDSelect.value;

            // Display the bar chart for the selected record
            displaySatisfiedChart(selectedResultID);
        });

        // Call the function to display the initial chart
        displaySatisfiedChart(satisfactionData[0].result_UE_BS_info_ID);

        function bar_vis(i) {
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
        // Function to update the chart with the next record
        function updateChartWithNextRecord() {
            currentIndex++; // Increment the index to move to the next record

            // Check if we've reached the end of the data
            if (currentIndex >= satisfactionData.length) {
                currentIndex = 0; // Start over if we've reached the end
            }

            // Get the result ID for the current index
            var selectedResultID = satisfactionData[currentIndex].result_UE_BS_info_ID;

            // Display the bar chart for the selected record
            displaySatisfiedChart(selectedResultID);
        }

        // Call the function to display the initial chart
        displaySatisfiedChart(satisfactionData[0].result_UE_BS_info_ID);

        // Set up an interval to call the custom function every 2 seconds

    </script>
</body>

</html>