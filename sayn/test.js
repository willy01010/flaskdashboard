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

        var resultIDs = data[2].data.map((item) => item.result_UE_BS_info_ID);
        var currentIndex = 0;

        function updateCharts() {
            // 訪問 datasets 變量
            if (!isPaused) {
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

            // 更新圖表
            displaySatisfied(datasets);

        });

        // 切換標籤的按鈕點擊事件
        $(".button-container button").click(function () {
            // 獲取按鈕的文本內容，即標籤名
            selectedLabel = $(this).text();
            // 觸發下拉菜單的改變事件，以重新渲染圖表
            $("#resultID_select").trigger("change");
        });

        // Trigger the change event to display the initial data
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

            // if (!visiable_bar[0]) {
            //     datasets[0].hidden = true;
            // } else {
            //     datasets[0].hidden = false;
            // }
            
            // if (!visiable_bar[1]) {
            //     datasets[1].hidden = true;
            // } else {
            //     datasets[1].hidden = false;
            // }
            
            
            // if (!visiable_bar[2]) {
            //     datasets[2].hidden = true;
            // } else {
            //     datasets[2].hidden = false;
            // }
            
            
            // if (!visiable_bar[3]) {
            //     datasets[3].hidden = true;
            // } else {
            //     datasets[3].hidden = false;
            // }
            
            
            // if (!visiable_bar[4]) {
            //     datasets[4].hidden = true;
            // } else {
            //     datasets[4].hidden = false;
            // }
            
            
            // if (!visiable_bar[5]) {
            //     datasets[5].hidden = true;
            // } else {
            //     datasets[5].hidden = false;
            // }