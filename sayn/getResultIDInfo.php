<?php
    include_once("connect.php");
    ini_set('display_errors','off');
?>

<?php
    @$n = $_GET['resultID'];
    $sql = "SELECT * FROM mlb_info WHERE result_ID = $n";
    $result = mysqli_query($link,$sql);
    $content = @$result->fetch_assoc();
    if($n==0)
        $result_ID = " ";
    else
        $result_ID = $n;
    $computer_ID = $content['computer_ID'];
    $date = $content['date'];
    $spent_time = $content['spent_time'];
    $init_tp = $content['init_tp'];
    $MLB_tp = $content['MLB_tp'];
    $ue_init_dist = $content['ue_init_dist'];
    $ue_MLB_dist = $content['ue_MLB_dist'];
    $CIO_table = $content['CIO_table'];

    echo '<p>result_ID : '.$result_ID.'</p></br>';
    echo '<p>computer_ID : '.$computer_ID.'</p></br>';
    echo '<p>date : '.$date.'</p></br>';
    echo '<p>spent_time : '.$spent_time.'</p></br>';
    echo '<p>init_tp : '.$init_tp.'</p></br>';
    echo '<p>MLB_tp : '.$MLB_tp.'</p></br>';
    echo '<p>ue_init_dist : '.$ue_init_dist.'</p></br>';
    echo '<p>ue_MLB_dist : '.$ue_MLB_dist.'</p></br>';
    echo '<p>CIO_table : '.$CIO_table.'</p></br>';

?>

