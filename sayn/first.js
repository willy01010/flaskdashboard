// JavaScript file for the web page

// Dummy data for the first chart (Replace this with actual data from your database)
var dbChartData = [
    { result_ID: 1, init_satisfied_1_1: 13, MLB_satisfied_1_1: 19, init_satisfied_0_6: 11, MLB_satisfied_0_6: 19, init_satisfied_0_1: 20, MLB_satisfied_0_1: 20 },
    { result_ID: 2, init_satisfied_1_1: 13, MLB_satisfied_1_1: 18, init_satisfied_0_6: 11, MLB_satisfied_0_6: 18, init_satisfied_0_1: 20, MLB_satisfied_0_1: 20 },
    { result_ID: 3, init_satisfied_1_1: 13, MLB_satisfied_1_1: 22, init_satisfied_0_6: 11, MLB_satisfied_0_6: 20, init_satisfied_0_1: 20, MLB_satisfied_0_1: 20 },
    { result_ID: 4, init_satisfied_1_1: 13, MLB_satisfied_1_1: 22, init_satisfied_0_6: 11, MLB_satisfied_0_6: 18, init_satisfied_0_1: 20, MLB_satisfied_0_1: 20 },
    { result_ID: 5, init_satisfied_1_1: 13, MLB_satisfied_1_1: 24, init_satisfied_0_6: 11, MLB_satisfied_0_6: 18, init_satisfied_0_1: 20, MLB_satisfied_0_1: 20 },
];

// Dummy data for the second table (Replace this with actual data from your database)
var dbTableData = [
    { result_ID: 1, computer_ID: 101, date: "2023-07-27", spent_time: "01:23:45", init_tp: 100, MLB_tp: 150, ue_init_dist: "A", ue_MLB_dist: "B", CIO_table: "C", init_satisfied_1_1: 13, init_satisfied_0_6: 11, init_satisfied_0_1: 20, MLB_satisfied_1_1: 19, MLB_satisfied_0_6: 19, MLB_satisfied_0_1: 20 },
    { result_ID: 2, computer_ID: 102, date: "2023-07-28", spent_time: "02:34:56", init_tp: 120, MLB_tp: 180, ue_init_dist: "A", ue_MLB_dist: "B", CIO_table: "C", init_satisfied_1_1: 13, init_satisfied_0_6: 11, init_satisfied_0_1: 20, MLB_satisfied_1_1: 18, MLB_satisfied_0_6: 18, MLB_satisfied_0_1: 20 },
    { result_ID: 3, computer_ID: 103, date: "2023-07-29", spent_time: "03:45:01", init_tp: 110, MLB_tp: 160, ue_init_dist: "A", ue_MLB_dist: "B", CIO_table: "C", init_satisfied_1_1: 13, init_satisfied_0_6: 11, init_satisfied_0_1: 20, MLB_satisfied_1_1: 22, MLB_satisfied_0_6: 20, MLB_satisfied_0_1: 20 },
    { result_ID: 4, computer_ID: 104, date: "2023-07-30", spent_time: "04:56:12", init_tp: 130, MLB_tp: 140, ue_init_dist: "A", ue_MLB_dist: "B", CIO_table: "C", init_satisfied_1_1: 13, init_satisfied_0_6: 11, init_satisfied_0_1: 20, MLB_satisfied_1_1: 22, MLB_satisfied_0_6: 18, MLB_satisfied_0_1: 20 },
    { result_ID: 5, computer_ID: 105, date: "2023-07-31", spent_time: "05:01:23", init_tp: 140, MLB_tp: 170, ue_init_dist: "A", ue_MLB_dist: "B", CIO_table: "C", init_satisfied_1_1: 13, init_satisfied_0_6: 11, init_satisfied_0_1: 20, MLB_satisfied_1_1: 24, MLB_satisfied_0_6: 18, MLB_satisfied_0_1: 20 },
];

//Dummy data for the third table
var mlb_data = [
    { Group_ID: 1, Demand_num_1_1: 50, Demand_num_0_6: 30, Demand_num_0_1: 20 },
];

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
        data: [currentData.init_satisfied_1_1],
    });

    datasets.push({
        label: "MLB Satisfied 1_1",
        backgroundColor: colors[1],
        data: [currentData.MLB_satisfied_1_1],
    });

    datasets.push({
        label: "Init Satisfied 0_6",
        backgroundColor: colors[2],
        data: [currentData.init_satisfied_0_6],
    });

    datasets.push({
        label: "MLB Satisfied 0_6",
        backgroundColor: colors[3],
        data: [currentData.MLB_satisfied_0_6],
    });

    datasets.push({
        label: "Init Satisfied 0_1",
        backgroundColor: colors[4],
        data: [currentData.init_satisfied_0_1],
    });

    datasets.push({
        label: "MLB Satisfied 0_1",
        backgroundColor: colors[5],
        data: [currentData.MLB_satisfied_0_1],
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

// ... (您的其餘程式碼)


// 初始化畫面時的資料索引
var currentChartDataIndex = 0;

// Call the function to create the chart
createChart();

// Call the function to generate the data for the second table
generateTableData();

// Call the function to generate the data for the third table
generateTableData_mlb();



// 每2秒自動切換資料
setInterval(switchChartData, 2000);


// Function to generate data for the second table
function generateTableData() {
    var tableBody = document.getElementById("table2-body");

    for (var i = 0; i < dbTableData.length; i++) {
        var row = document.createElement("tr");

        var result_IDCell = document.createElement("td");
        result_IDCell.textContent = dbTableData[i].result_ID;
        row.appendChild(result_IDCell);

        var computer_IDCell = document.createElement("td");
        computer_IDCell.textContent = dbTableData[i].computer_ID;
        row.appendChild(computer_IDCell);

        var dateCell = document.createElement("td");
        dateCell.textContent = dbTableData[i].date;
        row.appendChild(dateCell);

        var spent_timeCell = document.createElement("td");
        spent_timeCell.textContent = dbTableData[i].spent_time;
        row.appendChild(spent_timeCell);

        var init_tpCell = document.createElement("td");
        init_tpCell.textContent = dbTableData[i].init_tp;
        row.appendChild(init_tpCell);

        var MLB_tpCell = document.createElement("td");
        MLB_tpCell.textContent = dbTableData[i].MLB_tp;
        row.appendChild(MLB_tpCell);

        var ue_init_distCell = document.createElement("td");
        ue_init_distCell.textContent = dbTableData[i].ue_init_dist;
        row.appendChild(ue_init_distCell);

        var ue_MLB_distCell = document.createElement("td");
        ue_MLB_distCell.textContent = dbTableData[i].ue_MLB_dist;
        row.appendChild(ue_MLB_distCell);

        var CIO_tableCell = document.createElement("td");
        CIO_tableCell.textContent = dbTableData[i].CIO_table;
        row.appendChild(CIO_tableCell);

        var init_satisfied_1_1Cell = document.createElement("td");
        init_satisfied_1_1Cell.textContent = dbTableData[i].init_satisfied_1_1;
        row.appendChild(init_satisfied_1_1Cell);

        var init_satisfied_0_6Cell = document.createElement("td");
        init_satisfied_0_6Cell.textContent = dbTableData[i].init_satisfied_0_6;
        row.appendChild(init_satisfied_0_6Cell);

        var init_satisfied_0_1Cell = document.createElement("td");
        init_satisfied_0_1Cell.textContent = dbTableData[i].init_satisfied_0_1;
        row.appendChild(init_satisfied_0_1Cell);

        var MLB_satisfied_1_1Cell = document.createElement("td");
        MLB_satisfied_1_1Cell.textContent = dbTableData[i].MLB_satisfied_1_1;
        row.appendChild(MLB_satisfied_1_1Cell);

        var MLB_satisfied_0_6Cell = document.createElement("td");
        MLB_satisfied_0_6Cell.textContent = dbTableData[i].MLB_satisfied_0_6;
        row.appendChild(MLB_satisfied_0_6Cell);

        var MLB_satisfied_0_1Cell = document.createElement("td");
        MLB_satisfied_0_1Cell.textContent = dbTableData[i].MLB_satisfied_0_1;
        row.appendChild(MLB_satisfied_0_1Cell);

        tableBody.appendChild(row);
    }
}

//Function to generate data for the third table
function generateTableData_mlb() {
    var tableBody = document.getElementById("table3-body");

    for (var i = 0; i < mlb_data.length; i++) {
        var row = document.createElement("tr");

        var Group_IDCell = document.createElement("td");
        Group_IDCell.textContent = mlb_data[i].Group_ID;
        row.appendChild(Group_IDCell);

        var Demand_num_1_1Cell = document.createElement("td");
        Demand_num_1_1Cell.textContent = mlb_data[i].Demand_num_1_1;
        row.appendChild(Demand_num_1_1Cell);

        var Demand_num_0_6Cell = document.createElement("td");
        Demand_num_0_6Cell.textContent = mlb_data[i].Demand_num_0_6;
        row.appendChild(Demand_num_0_6Cell);

        var Demand_num_0_1Cell = document.createElement("td");
        Demand_num_0_1Cell.textContent = mlb_data[i].Demand_num_0_1;
        row.appendChild(Demand_num_0_1Cell);

        tableBody.appendChild(row);
    }
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

