// JavaScript file for the web page

// 初始資料集的顯示狀態
var datasetVisibility = {
    "Init Satisfied 1_1": true,
    "MLB Satisfied 1_1": true,
    "Init Satisfied 0_6": true,
    "MLB Satisfied 0_6": true,
    "Init Satisfied 0_1": true,
    "MLB Satisfied 0_1": true
};

// 捕獲按鈕點擊事件
var toggleButtons = document.querySelectorAll(".toggle-button");
toggleButtons.forEach(function(button) {
    button.addEventListener("click", toggleDatasetVisibility);
});

function toggleDatasetVisibility(event) {
    var dataset = event.target.getAttribute("data-dataset");
    datasetVisibility[dataset] = !datasetVisibility[dataset];
    
    switchChartData();
}


// Dummy data for the first chart (Replace this with actual data from your database)
var dbChartData = [
    { result_ID: 1, init_satisfied_1_1: 13, MLB_satisfied_1_1: 19, init_satisfied_0_6: 11, MLB_satisfied_0_6: 19, init_satisfied_0_1: 20, MLB_satisfied_0_1: 20 },
    { result_ID: 2, init_satisfied_1_1: 13, MLB_satisfied_1_1: 18, init_satisfied_0_6: 11, MLB_satisfied_0_6: 18, init_satisfied_0_1: 20, MLB_satisfied_0_1: 20 },
    { result_ID: 3, init_satisfied_1_1: 13, MLB_satisfied_1_1: 22, init_satisfied_0_6: 11, MLB_satisfied_0_6: 20, init_satisfied_0_1: 20, MLB_satisfied_0_1: 20 },
    { result_ID: 4, init_satisfied_1_1: 13, MLB_satisfied_1_1: 22, init_satisfied_0_6: 11, MLB_satisfied_0_6: 18, init_satisfied_0_1: 20, MLB_satisfied_0_1: 20 },
    { result_ID: 5, init_satisfied_1_1: 13, MLB_satisfied_1_1: 24, init_satisfied_0_6: 11, MLB_satisfied_0_6: 18, init_satisfied_0_1: 20, MLB_satisfied_0_1: 20 },
];

// 初始化畫面時的資料索引
var currentChartDataIndex = 0;

// 修改生成圖表資料的函數
function generateBarChartData() {
    var colors = ["#006000", "#00EC00", "#28004D", "#9F35FF", "#000093", "#7D7DFF"];
    var datasets = [];

    var data = {
        labels: [],
        datasets: []
    };

    // 使用當前資料索引來獲取單筆資料
    var currentData = dbChartData[currentChartDataIndex];

    // 清空 labels 並只添加一個單筆資料的標籤
    data.labels = [""];

    // 添加單筆資料集
    datasets.push({
        label: "Init Satisfied 1_1",
        backgroundColor: colors[0],
        data: datasetVisibility["Init Satisfied 1_1"] ? [currentData.init_satisfied_1_1] : [],
    });

    datasets.push({
        label: "MLB Satisfied 1_1",
        backgroundColor: colors[1],
        data: datasetVisibility["MLB Satisfied 1_1"] ? [currentData.MLB_satisfied_1_1] : [],
    });

    datasets.push({
        label: "Init Satisfied 0_6",
        backgroundColor: colors[2],
        data: datasetVisibility["Init Satisfied 0_6"] ? [currentData.init_satisfied_0_6] : [],
    });

    datasets.push({
        label: "MLB Satisfied 0_6",
        backgroundColor: colors[3],
        data: datasetVisibility["MLB Satisfied 0_6"] ? [currentData.MLB_satisfied_0_6] : [],
    });

    datasets.push({
        label: "Init Satisfied 0_1",
        backgroundColor: colors[4],
        data: datasetVisibility["Init Satisfied 0_1"] ? [currentData.init_satisfied_0_1] : [],
    });

    datasets.push({
        label: "MLB Satisfied 0_1",
        backgroundColor: colors[5],
        data: datasetVisibility["MLB Satisfied 0_1"] ? [currentData.MLB_satisfied_0_1] : [],
    });
    data.datasets = datasets;
    return data;
}

// 修改切換資料的函數
function switchChartData() {
    currentChartDataIndex = (currentChartDataIndex + 1) % dbChartData.length; // 在資料集範圍內循環切換索引
    var barChartData = generateBarChartData();

    var chart = Chart.instances[0];
    chart.data = barChartData;

    // 設置圖表標題和 X 軸標籤，僅顯示當前資料的 result_ID
    var currentResultID = dbChartData[currentChartDataIndex].result_ID;
    chart.options.plugins.title.text = "UE numbers after MLB - Result ID: " + currentResultID;
    chart.options.scales.x.title.text = "Number of UE";

    chart.update();

    // 顯示目前索引
    var indexValue = currentChartDataIndex + 1; // 索引從 0 開始，顯示時加 1
    var indexElement = document.getElementById("index-value");
    indexElement.textContent = indexValue.toString();
}

function createChart() {
    var ctx = document.getElementById("chart").getContext("2d");

    var barChartData = generateBarChartData();

    var options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Result ID"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Number of UE"
                }
            }
        },
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "UE numbers after MLB"
            }
        }
    };

    var chart = new Chart(ctx, {
        type: "bar",
        data: barChartData,
        options: {
            indexAxis: 'y',
        }

    });
}



// Call the function to create the chart
createChart();
// 每2秒自動切換資料
setInterval(switchChartData, 2000);


