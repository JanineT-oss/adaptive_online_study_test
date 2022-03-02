<?php
$servername = "localhost";
$username = "root"; // ONLY FOR LOCAL USE
$password = "root";
$dbname = "database_trial";

$MySQLDb = new mysqli("localhost", "root", "root", "database_trial");

if ($MySQLDb->connect_error) {
    echo $MySQLDb-> connect_error;
} else {
    echo "MySQL connection succeeded.";
}

?>

