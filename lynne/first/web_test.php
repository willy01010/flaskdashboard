<?php
    include_once("connect.php");
    include_once("getResultID.php");
    ini_set('display_errors','off');
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset = 'utf8'>
        <title>mlb</title>
        <script src= "https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>
    <body>
        <div id=content1>
            <?php echo $resultID_select ?>
        </div>
        <div id=content2>

            
        </div>
    <script src="web_test.js"></script>
    </body>
</html>