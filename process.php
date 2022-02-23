<?php

echo 'Processing ... ';




// Check for GET variable
if(isset($_GET['name'])){
    echo 'GET: Your name is ' .$_GET['name'];
}

// connect to database
$conn = mysqli_connect('localhost', 'root', 'root', 'ajaxtest');

// CHeck for POST variable
if(isset($_POST['name'])){
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    echo 'POST: Your name is ' .$_POST['name'];

    $query = "INSERT INTO users(name) VALUES('$name')";

    if(mysqli_query($conn, $query)){
        echo 'User added ...';
    } else{
        echo 'ERROR:' . mysqli_error($conn); 
    }
}