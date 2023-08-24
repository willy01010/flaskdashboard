<?php
// Include the database connection file (db.php)
include_once 'db.php';

// Fetch data from the database, including result_UE_BS_info_ID
$query = "SELECT ue_init_dist, ue_MLB_dist, result_UE_BS_info_ID FROM mlb_result WHERE mlb_data_group_ID = 1";
$result = mysqli_query($conn, $query);

$ueDistributionData = array();
// Initialize an array to store result IDs
$resultIDs = [];

while ($row = mysqli_fetch_array($result)) {
    $ueDistributionData[] = array(
        'result_UE_BS_info_ID' => $row['result_UE_BS_info_ID'],
        'ue_init_dist' => json_decode($row['ue_init_dist']),
        'ue_MLB_dist' => json_decode($row['ue_MLB_dist'])
    );
}
// Check if there are rows in the result set
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $resultIDs[] = $row['result_UE_BS_info_ID'];
    }
}

// Encode the fetched data into JSON
$ueDistributionJson = json_encode($ueDistributionData);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>UE Distribution</title>
    <!-- Include Chart.js library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
</head>

<body>
    <div id='UE_Dist-chart' class="w3-third dashout">
        <div class=" w3-card dash">
            <div class="dashbar">
                <div class="dashbar-title">
                    UE Distribution
                </div>
            </div>


            <div id="bar_chart-container">
                <canvas id="barChart"></canvas>
            </div>
        </div>
    </div>

    <script>
        var ueDistributionData = <?php echo $ueDistributionJson; ?>;
        var bsLabels = ["BS1", "BS2", "BS3", "BS4", "BS5", "BS6", "BS7"];
        var resultIDSelect = document.getElementById("resultID_select");
        var barChart = null; // Store the chart instance
        var currentIndex = 0; // Index to track the current data to display
        
        // Function to display the bar chart for the selected UE
        // Function to display the bar chart for the selected result ID
        function displayBarChart(selectedResultID) {
            var canvas = document.getElementById("barChart").getContext("2d");

            // Find the selected UE data by result_UE_BS_info_ID
            var selectedUEData = ueDistributionData.find(function (ueData) {
                return ueData.result_UE_BS_info_ID === selectedResultID;
            });

            if (selectedUEData) {
                var initDistData = selectedUEData.ue_init_dist.map(parseFloat);
                var mlbDistData = selectedUEData.ue_MLB_dist.map(parseFloat);

                var datasets = [
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
                ];

                // Update the existing chart or create a new one if it doesn't exist
                if (barChart) {
                    // Update the chart data
                    barChart.data.datasets = datasets;
                    barChart.update();
                } else {
                    // Create a new chart
                    barChart = new Chart(canvas, {
                        type: "bar",
                        data: {
                            labels: bsLabels,
                            datasets: datasets
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                }
            }
            // Increment the currentIndex
            currentIndex = (currentIndex + 1) % ueDistributionData.length;

            // Update the selected value in the dropdown
            resultIDSelect.value = ueDistributionData[currentIndex].result_UE_BS_info_ID;

            // Call the function again after 2 seconds
            setTimeout(function () {
                displayBarChart(ueDistributionData[currentIndex].result_UE_BS_info_ID);
            }, 2000);
        }

        // Get the resultID_select element
        var resultIDSelect = document.getElementById("resultID_select");
        var barChart = null; // Store the chart instance

        // Add an event listener to the resultID_select dropdown
        resultIDSelect.addEventListener("change", function () {
            var selectedResultID = resultIDSelect.value;
            // Display the bar chart for the selected record
            displayBarChart(selectedResultID);
        });

        // Call the function to start the automatic update
        displayBarChart(ueDistributionData[currentIndex].result_UE_BS_info_ID);

    </script>
</body>

</html>