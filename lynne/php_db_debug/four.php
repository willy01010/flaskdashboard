<?php
// Include the database connection file (db.php)
include_once 'db.php';

// Fetch initial data from the database for MLB_tp and init_tp
$query = "SELECT date, MLB_tp, init_tp FROM mlb_result WHERE mlb_data_group_ID = 1 ORDER BY date ASC LIMIT 10"; // Assuming you want the latest 10 entries
$result = mysqli_query($conn, $query);

$mlbData = array();
$initData = array();
$labels = array();

while ($row = mysqli_fetch_assoc($result)) {
    $mlbData[] = $row['MLB_tp'];
    $initData[] = $row['init_tp'];
    $labels[] = $row['date'];
}

// Encode the fetched data into JSON
$mlbDataJson = json_encode($mlbData);
$initDataJson = json_encode($initData);
$labelsJson = json_encode($labels);
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dynamic Line Chart</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>

<body>
    <div id='BS_Thro-chart' class="w3-third dashout">
        <div class=" w3-card dash">
            <div class="dashbar">
                <div class="dashbar-title">
                    BS Total Throughput
                </div>
            </div>
            <div>
            <canvas id="linear_chart-container" width="400" height="200"></canvas>
            </div>
        </div>
    </div>

    
    <script>
        var ctx = document.getElementById('linear_chart-container').getContext('2d');
        var mlbData = <?php echo $mlbDataJson; ?>;
        var initData = <?php echo $initDataJson; ?>;
        var labels = <?php echo $labelsJson; ?>;
        var chart;

        // Initialize chart with initial data
        function initChart() {
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [ {
                        label: 'init_tp',
                        data: initData,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false
                    },{
                        label: 'MLB_tp',
                        data: mlbData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Function to update the chart with new data
        function updateChart(newMLBData, newInitData) {
            // Push the new data points
            mlbData.push(newMLBData);
            initData.push(newInitData);

            // Remove the oldest data points (if data length exceeds a certain number)
            if (mlbData.length > 10) {
                mlbData.shift();
                initData.shift();
            }

            // Update the chart's labels and data
            chart.data.labels = labels.slice(-10); // Show only the latest 10 labels
            chart.data.datasets[0].data = mlbData;
            chart.data.datasets[1].data = initData;
            chart.update();
        }

        // Initialize the chart
        initChart();

        // Simulate dynamic data update (replace this with real-time data retrieval)
        var interval = setInterval(function () {
            // Simulate fetching new data (replace this with actual data retrieval)
            var newMLBData = Math.random() * 100; // Generate random data for MLB_tp for demonstration
            var newInitData = Math.random() * 100; // Generate random data for init_tp for demonstration

            // Update the chart with the new data
            updateChart(newMLBData, newInitData);
        }, 2000); // Update every 2 seconds (2000 milliseconds)
    </script>
</body>

</html>