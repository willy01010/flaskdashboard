<!-- PHP and JavaScript Code -->
<?php
// PHP code to fetch CIO table data
include_once 'db.php'; // Include the database connection script

// Perform a query to retrieve CIO_table data from the database
$query = "SELECT CIO_table, result_UE_BS_info_ID FROM mlb_result WHERE mlb_data_group_ID = 1";
$result = mysqli_query($conn, $query);

if (!$result) {
    die("Query failed: " . mysqli_error($conn));
}

// Initialize an array to store CIO_table data
$cioTableData = [];

// Initialize an array to store result IDs
$resultIDs = [];

// Check if there are rows in the result set
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        // Decode the CIO_table data from JSON to an array
        $cioTableData[$row['result_UE_BS_info_ID']] = json_decode($row['CIO_table'], true);
        // Store the result IDs
        $resultIDs[] = $row['result_UE_BS_info_ID'];
    }
}

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MLB CIO Table</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>

<body>
    <div>
        <!-- Dropdown menu to select a specific record by ID -->
        <label for="resultID_select">Select a Record:</label>
        <select id="resultID_select">
            <option value="">Select a Record</option>
            <?php
            // Populate the dropdown menu with result IDs from the database
            foreach ($resultIDs as $resultID) {
                echo "<option value='" . $resultID . "'>" . $resultID . "</option>";
            }
            ?>
        </select>&emsp;&emsp;
        <button id="pauseButton">Pause</button>
        <button id="resumeButton">Resume</button>

    </div>
    <!-- CIO Table Container -->
    <div id='CIO_table-chart' class="w3-third dashout" height="426">
        <div class=" w3-card dash">
            <div class="dashbar">
                <div class="dashbar-title">
                    CIO Table
                </div>
            </div>
            <div id="cio_table-container">
                <!-- CIO Table Content - Generated by JavaScript -->
            </div>
        </div>
    </div>

    <!-- Include jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- JavaScript to display the CIO table based on selected record ID -->
    <script>


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

        // Function to initialize the page with the first record
        function initializePage1() {
            var firstResultID = <?php echo json_encode($resultIDs[0]); ?>; // Get the first result ID
            var selectedCIOData = <?php echo json_encode($cioTableData); ?>;

            // Display the CIO table for the first record
            if (selectedCIOData[firstResultID]) {
                displayCIOTable(selectedCIOData[firstResultID]);
                $("#resultID_select").val(firstResultID); // Set the dropdown value to the first record
            }
        }
        // Listen for changes in the dropdown menu
        $("#resultID_select").on("change", function () {
            var selectedResultID = $(this).val();

            // Get the CIO table data for the selected record ID
            var selectedCIOData = <?php echo json_encode($cioTableData); ?>;

            // Display the CIO table for the selected record
            if (selectedCIOData[selectedResultID]) {
                displayCIOTable(selectedCIOData[selectedResultID]);
            } else {
                // Clear the CIO table container if no data is found
                $("#cio_table-container").html("");
            }
        });
        // Call the initializePage function when the page loads
        $(document).ready(function () {
            initializePage1();
        });

        function fetchDataForSelectedRecord(selectedResultID) {
            // Get the CIO table data for the selected record ID
            var selectedCIOData = <?php echo json_encode($cioTableData); ?>;

            // Display the CIO table for the selected record
            if (selectedCIOData[selectedResultID]) {
                displayCIOTable(selectedCIOData[selectedResultID]);
            } else {
                // Clear the CIO table container if no data is found
                $("#cio_table-container").html("");
            }
        }
        // Listen for changes in the dropdown menu
        $("#resultID_select").on("change", function () {
            var selectedResultID = $(this).val();
            fetchDataForSelectedRecord(selectedResultID);
        })

        var selectedResultIndex = 0;
        // Automatically fetch and display data for the next record every 2 seconds
        var currentIndex = 0; // Initialize the index
        var resultIDs = <?php echo json_encode($resultIDs); ?>;
        var totalResults = resultIDs.length;

        function updateDataAndDisplayNextRecord() {
            // Calculate the next index
            currentIndex = (currentIndex + 1) % totalResults;

            // Get the next selected result ID
            var selectedResultID = resultIDs[currentIndex];

            // Update the dropdown selection
            $("#resultID_select").val(selectedResultID);

            // Fetch and display data for the selected record
            fetchDataForSelectedRecord(selectedResultID);
            currentIndex = currentIndex - 1;
        }

    </script>
</body>

</html>