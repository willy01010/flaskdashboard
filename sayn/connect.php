<?php
    $hostname='localhost';
    $username='root';
    $password='12345678';
    $database='mlb';
    $link=mysqli_connect($hostname,$username,$password,$database);
    if($link){
        mysqli_query($link,"SET NAMES utf8");
    }
    else{
        echo 'can not connect'.mysquli_connect_error();
    }
?>
