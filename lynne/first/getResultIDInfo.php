<?php
    include_once("connect.php");
    ini_set('display_errors', 'off');
?>

<?php
    $n = isset($_GET['resultID']) ? $_GET['resultID'] : 0;
    $n = intval($n); // 將輸入轉換為整數，以防止 SQL 注入攻擊
    $sql = "SELECT * FROM mlb_result WHERE result_UE_BS_info_ID = $n";
    $result = mysqli_query($link, $sql);

    if ($result && $result->num_rows > 0) {
        $content = $result->fetch_assoc();
        $result_ID = $content['mlb_data_group_ID'];
        $computer_ID = $content['computer_ID'];
        $date = $content['date'];
        $spent_time = $content['spent_time'];
        $init_tp = $content['init_tp'];
        $MLB_tp = $content['MLB_tp'];
        $ue_init_dist = $content['ue_init_dist'];
        $ue_MLB_dist = $content['ue_MLB_dist'];
        $CIO_table = $content['CIO_table'];

        echo '<div id="result">';
        echo '<p>result_ID : '.$result_ID.'</p>';
        echo '<p>computer_ID : '.$computer_ID.'</p>';
        echo '<p>date : '.$date.'</p>';
        echo '<p>spent_time : '.$spent_time.'</p>';
        echo '<p>init_tp : '.$init_tp.'</p>';
        echo '<p>MLB_tp : '.$MLB_tp.'</p>';
        echo '<p>ue_init_dist : '.$ue_init_dist.'</p>';
        echo '<p>ue_MLB_dist : '.$ue_MLB_dist.'</p>';
        echo '<p>CIO_table : '.$CIO_table.'</p>';
        echo '</div>';
    } else {
        echo '<p>No results found.</p>';
    }
?>
