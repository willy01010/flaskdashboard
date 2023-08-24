<?php
$servername = '120.126.10.188';
$username = 'allUser';
$password = 'compalcgu';
$db = 'mlb';


// Create connection
$conn = mysqli_connect($servername, $username, $password, $db);
mysqli_set_charset($conn, "utf8");
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
