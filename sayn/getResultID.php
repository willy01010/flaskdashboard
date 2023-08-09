<?php
    session_start();
    include_once("connect.php");
    //ini_set('display_errors','off');
?>

<?php
    //ini_set('_display_errors','off');
    echo '<p>請選擇想看的資料ID</p>';

    $i=0;
    $resultID_select .= '<select id=resultID_select>';
    $resultID_select .= '<option value="0">請選擇想看的資料</option>';

    $sql = "SELECT result_UE_BS_info_ID FROM mlb_result";
    $result = mysqli_query($link,$sql);
    while($content = @$result->fetch_assoc()){
        $result_ID = $content['result_UE_BS_info_ID'];
        $resultID_select .= '<option value="'.$result_ID.'">'.$result_ID.'</option>';
    }
    $resultID_select .= '</select>';

?>