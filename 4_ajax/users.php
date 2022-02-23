<?php
//creat connection
$conn = mysqli_connect('localhost', 'root', 'root', 'ajaxtest');

$query= 'SELECT * FROM users';

// Get results
$results = mysqli_query($conn, $query);

// Fetch data
$users =mysqli_fetch_all($results, MYSQLI_ASSOC);

echo json_encode($users);