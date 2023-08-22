<?php
/*成功的話會顯示result_UE_BS_info_ID與w2的折線圖
請負責圖表同學將當前的圖表資料來源換成本程式之作法 
建議將所有的code都放在這裡
*/

    /* Database connection settings */
    include_once 'db.php';

    $data = array();
    /*視情況加更多的query 及data array 以獲得更多資料 
    ex. $query2 = "SELECT result_UE_BS_info_ID, w1 FROM mlb_result";
    $runQuery2 = mysqli_query($conn, $query2);
    */

    $query = "SELECT result_UE_BS_info_ID, w2 FROM mlb_result";
    $runQuery = mysqli_query($conn, $query);

    /*每新增一筆runQuery就要再寫一個while loop */
    while ($row = mysqli_fetch_array($runQuery)) {
        $data[] = array(
            'result_UE_BS_info_ID' => $row['result_UE_BS_info_ID'],
            'w2' => $row['w2']
        );
    }
    /*json 亦然 */
    $json_data = json_encode($data);
?>

<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"></script>
        <title>Line Chart using PHP MySQL and Chart JS</title>

        <style type="text/css">
            body {
                font-family: Arial;
                margin: 80px 100px 10px 100px;
                padding: 0;
                color: white;
                text-align: center;
                background: #555652;
            }

            .container {
                color: #E8E9EB;
                background: #222;
                border: #555652 1px solid;
                padding: 10px;
            }
        </style>

    </head>

    <body>
        <div class="container">
            <h1>Line Chart using PHP MySQL and Chart JS</h1>
            <canvas id="chart" style="width: 100%; height: 65vh; background: #222; border: 1px solid #555652; margin-top: 10px;"></canvas>

            <script>
                var ctx = document.getElementById("chart").getContext('2d');
                /*在這裡新增要用的資料 */
                var data = <?php echo $json_data; ?>;
                var labels = data.map(item => item.result_UE_BS_info_ID);
                var w2Data = data.map(item => item.w2);

                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'w2',
                                data: w2Data,
                                backgroundColor: 'transparent',
                                borderColor: 'rgba(255, 99, 132)',
                                borderWidth: 3
                            }
                        ]
                    },
                    options: {
                        scales: {
                            yAxes: [{ beginAtZero: false }],
                            xAxes: [{ autoskip: true, maxTicketsLimit: 20 }]
                        },
                        tooltips: { mode: 'index' },
                        legend: {
                            display: true,
                            position: 'top',
                            labels: { fontColor: 'rgb(255, 255, 255)', fontSize: 16 }
                        }
                    }
                });
            </script>
        </div>
    </body>
</html>
