// JavaScript file for the web page

console.log('first',document.getElementById("title").value);


setTimeout(() => {
    console.log("show:::",document.getElementById("title").value)
  }, "1000");

// Get the current time in minutes
var currentTime = new Date().getMinutes();

// Generate random static data for the first chart
var data1 = [];
for (var i = 0; i <= currentTime; i += 5) {
    // Generate a random number between 0 and 100
    var y = Math.floor(Math.random() * 101);
    // Push an object with x and y values to the data array
    data1.push({x: i, y: y});
}

// Generate random static data for the second chart
var data2 = [];
for (var j = 1; j <= 7; j++) {
    // Generate a random number between 0 and 70
    var y = Math.floor(Math.random() * 71);
    // Push an object with x and y values to the data array
    data2.push({x: "BS" + j, y: y});
}

// Generate random static data for the third chart
var data3 = [];
for (var k = 1; k <= 7; k++) {
    // Create an array for each row
    var row = [];
    for (var l = 1; l <= 7; l++) {
        // Generate a random number between 0 and 100
        var cell = Math.floor(Math.random() * 101);
        // Push the cell value to the row array
        row.push(cell);
    }
    // Push the row array to the data array
    data3.push(row);
}

// Get the canvas element for the first chart
var ctx1 = document.getElementById("chart1").getContext("2d");

// Create a new chart object for the first chart
var chart1 = new Chart(ctx1, {
    // The type of chart we want to create
    type: "line",
    // The data for our dataset
    data: {
        // The labels for the x axis
        labels: data1.map(function(d) {return d.x + " min"}),
        // The datasets for the y axis
        datasets: [{
            // The label for the dataset
            label: "BS Total Throughput",
            // The background color of the area under the line
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            // The border color of the line
            borderColor: "rgb(0, 255, 0)",
            // The data points for the line
            data: data1.map(function(d) {return d.y}),
            // The fill option to fill the area under the line
            fill: true,
        }]
    },
    // Configuration options go here
    options: {
        // The title of the chart
        title: {
            display: true,
            text: "BS Total Throughput"
        },
        // The scales of the axes
        scales: {
            xAxes: [{
                // The type of scale
                type: "time",
                // The time unit of the scale
                time: {
                    unit: "minute"
                },
                // The title of the x axis
                scaleLabel: {
                    display: true,
                    labelString: "Time"
                }
            }],
            yAxes: [{
                // The ticks of the scale
                ticks: {
                    // The minimum value of the scale
                    min: 0,
                    // The maximum value of the scale
                    max: 100,
                    // The step size of the scale
                    stepSize: 10
                },
                // The title of the y axis
                scaleLabel: {
                    display: true,
                    labelString: "Mbps"
                }
            }]
        }
    }
});

// Get the canvas element for the second chart
var ctx2 = document.getElementById("chart2").getContext("2d");

// Create a new chart object for the second chart
var chart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: "bar",
    // The data for our dataset
    data: {
        // The labels for the x axis
        labels: data2.map(function(d) {return d.x}),
        // The datasets for the y axis
        datasets: [{
            // The label for the dataset
            label: "UE Distribution",
            // The background color of the bars
            backgroundColor: "rgb(255, 99, 132)",
            // The border color of the bars
            borderColor: "rgb(255, 99, 132)",
            // The data points for the bars
            data: data2.map(function(d) {return d.y}),
        }]
    },
    // Configuration options go here
    options: {
        // The title of the chart
        title: {
            display: true,
            text: "UE Distribution"
        },
        // The scales of the axes
        scales: {
            xAxes: [{
                // The title of the x axis
                scaleLabel: {
                    display: true,
                    labelString: "BS ID"
                }
            }],
            yAxes: [{
                // The ticks of the scale
                ticks: {
                    // The minimum value of the scale
                    min: 0,
                    // The maximum value of the scale
                    max: 70,
                    // The step size of the scale
                    stepSize: 10
                }
            }]
        }
    }
});

// Get the table body element for the third chart
var tbody = document.getElementById("chart3-body");

// Loop through each row of data for the third chart
for (var m = 0; m < data3.length; m++) {
    // Create a table row element for each row of data 
    var tr = document.createElement("tr");
    // Create a table cell element for the first column of each row
    var td1 = document.createElement("td");
    // Set the text content of the cell to the BS ID
    td1.textContent = "BS" + (m + 1);
    // Append the cell to the row
    tr.appendChild(td1);
    // Loop through each cell of data for each row
    for (var n = 0; n < data3[m].length; n++) {
        // Create a table cell element for each cell of data 
        var td2 = document.createElement("td");
        // Set the text content of the cell to the data value
        td2.textContent = data3[m][n];
        // Append the cell to the row
        tr.appendChild(td2);
    }
    // Append the row to the table body
    tbody.appendChild(tr);
}
