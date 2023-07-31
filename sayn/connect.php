<?php
    $hostname='127.0.0.1';
    $username=' ';
    $password=' ';
    $database='mlb';
    $link=mysqli_connect($hostname,$username,$password,$database);
    if($link){
        mysqli_query($link,"SET NAMES utf8");
    }
    else{
        echo 'can not connect'.mysquli_connect_error();
    }
?>
