<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MLB Viewer</title>
    <link rel="stylesheet" href="second.css">
</head>

<body>
    <h1>MLB Information</h1>
    <div style="display: flex;">
        <input type="checkbox" id="showCIO" checked>
        <label for="showCIO">Show CIO Table &emsp;&emsp;</label>
        <input type="checkbox" id="showDistribution" checked>
        <label for="showDistribution">Show UE Distribution &emsp;&emsp;</label>
        <input type="checkbox" id="showThroughput" checked>
        <label for="showThroughput">Show BS Total Throughput &emsp;&emsp;</label>
        <input type="checkbox" id="showSatisfied" checked>
        <label for="showSatisfied">Show Satisfied &emsp;&emsp;</label>
    </div>

    <div>
        <?php include_once 'one.php'; ?>
    </div>

    <div>
        <?php include_once 'two.php'; ?>
    </div>

    <div>
        <?php include_once 'three.php'; ?>
    </div>

    <div>
        <?php include_once 'four.php'; ?>
    </div>

    <script>


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
                // document.getElementById('UE_Dist-chart').style = "height : 426px;"
                // document.getElementById('CIO_table-chart').style = "height : 426px;"
                // document.getElementById('BS_Thro-chart').style = "height :426px;"
                // document.getElementById('Satisfied-chart').style = "height :426px;"

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
                // document.getElementById('UE_Dist-chart').style = "height : 500px;"
                // document.getElementById('CIO_table-chart').style = "height : 500px;"
                // document.getElementById('BS_Thro-chart').style = "height :500px;"
                // document.getElementById('Satisfied-chart').style = "height :500px;"
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


        var isPaused = false; // 用來追蹤是否暫停

        // 暫停按鈕的點擊事件
        document.getElementById("pauseButton").addEventListener("click", function () {
            isPaused = true;
        });

        // 繼續按鈕的點擊事件
        document.getElementById("resumeButton").addEventListener("click", function () {
            isPaused = false;
            updateDataAndDisplayNextRecord(); // 手動觸發一次更新
            updateAndDisplayNextRecord(); // 手動觸發一次更新
            updateChartWithNextRecord(); // 手動觸發一次更新
        });

        // 在每個 setInterval 函數的開頭加入條件檢查
        setInterval(function () {
            if (!isPaused) {
                // 執行更新資料的程式碼
                updateDataAndDisplayNextRecord();
                updateAndDisplayNextRecord();
                updateChartWithNextRecord();
            }
        }, 2000); // 更新間隔 2 秒

        // setInterval(updateDataAndDisplayNextRecord, 2000); // Update every 2 seconds
        // setInterval(updateAndDisplayNextRecord, 2000); // Update every 2 seconds
        // setInterval(updateChartWithNextRecord, 2000);

    </script>

</body>

</html>