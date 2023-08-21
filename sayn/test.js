// 在全局范围内定义 datasets 变量
var datasets = [];
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
            // 在这里可以访问 datasets 变量
            if (!isPaused) {
                var selectedResultID = resultIDs[currentIndex];
                $("#resultID_select").val(selectedResultID).trigger("change");
                currentIndex = (currentIndex + 1) % resultIDs.length;
            }

            // 根据 datasetVisibility 对象的状态，设置相应的可见性
            for (var i = 0; i < datasets.length; i++) {
                var dataset = datasets[i];
                var label = dataset.label;
                // 根据 label 执行某些操作
                console.log("Label: " + label);
            }


            // 更新图表
            displayBarChart(datasets);
        }
        setInterval(updateCharts, 2000);

        // Event listener for the resultID_select dropdown
        $("#resultID_select").on("change", function () {
            var selectedResultID = $(this).val();
            var selectedData = data[2].data.find(
                (item) => item.result_UE_BS_info_ID === selectedResultID
            );

            // 创建六个数据集，每个数据集都有自己的标签
            datasets = [
                {
                    label: "init_satisfied_1_1",
                    data: [parseFloat(selectedData.init_satisfied_1_1)],
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1
                },
                {
                    label: "MLB_satisfied_1_1",
                    data: [parseFloat(selectedData.MLB_satisfied_1_1)],
                    backgroundColor: "rgba(255, 205, 86, 0.5)",
                    borderColor: "rgba(255, 205, 86, 1)",
                    borderWidth: 1
                },
                {
                    label: "init_satisfied_0_6",
                    data: [parseFloat(selectedData.init_satisfied_0_6)],
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1
                },
                {
                    label: "MLB_satisfied_0_6",
                    data: [parseFloat(selectedData.MLB_satisfied_0_6)],
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                },
                {
                    label: "init_satisfied_0_1",
                    data: [parseFloat(selectedData.init_satisfied_0_1)],
                    backgroundColor: "rgba(255, 159, 64, 0.5)",
                    borderColor: "rgba(255, 159, 64, 1)",
                    borderWidth: 1
                },


                {
                    label: "MLB_satisfied_0_1",
                    data: [parseFloat(selectedData.MLB_satisfied_0_1)],
                    backgroundColor: "rgba(153, 102, 255, 0.5)",
                    borderColor: "rgba(153, 102, 255, 1)",
                    borderWidth: 1
                }
            ];

            // 更新图表
            displayBarChart(datasets);

        });

        // 切换标签的按钮点击事件
        $(".button-container button").click(function () {
            // 获取按钮的文本内容，即标签名
            selectedLabel = $(this).text();
            // 触发下拉菜单的改变事件，以重新渲染图表
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
    function displayBarChart(datasets) {
        // Remove any existing chart in the chart-container
        $("#bar_chart-container").empty();

        // Create a canvas element to render the chart
        var canvas = document.createElement("canvas");
        canvas.id = "barChart";
        $("#bar_chart-container").append(canvas);

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
                        beginAtZero: true
                    }
                },
                animation: {
                    duration: 0 // 動畫效果
                }
            }
        });
        // 获取所有数据集的可见性状态

    }
    var datasetVisibility = myChart.getDataVisibility();
    // 遍历数据集可见性状态并打印出来
    for (var datasetLabel in datasetVisibility) {
        var isDatasetVisible = datasetVisibility[datasetLabel];
        console.log("数据集 '" + datasetLabel + "' 可见性状态: " + isDatasetVisible);
    }
});
