<?php
// decode data from HTTP request
$post_data = json_decode(file_get_contents('php://input'), true);

print $post_data;

// the directory "data" must be writable by the www-data user!
// path to directory
$name = "data/test_exp1.csv";

// write the file to disk
file_put_contents($name, json_encode($post_data));
?>