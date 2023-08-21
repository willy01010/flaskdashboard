<?php
$hostname='localhost';
$username='root';
$password='';
$database='mlb';

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die("連線失敗: " . $conn->connect_error);
}

$result = array();
$sql = "SELECT result_UE_BS_info_ID, CIO_Table FROM mlb_data";
$queryResult = $conn->query($sql);

if ($queryResult->num_rows > 0) {
    while ($row = $queryResult->fetch_assoc()) {
        $result[] = array(
            "result_UE_BS_info_ID" => $row["result_UE_BS_info_ID"],
            "CIO_Table" => json_decode($row["CIO_Table"])
        );
    }
}

$conn->close();

// 將結果以 JSON 格式輸出
header('Content-Type: application/json');
echo json_encode($result);
?>
