<?php
// decode data from HTTP request
$post_data = json_decode(file_get_contents('php://input'), true);
//$post_data=var_dump($_POST['test']);
echo $post_data;

// the directory "data" must be writable by the www-data user!
// path to directory
$name = "data/test_exp1.csv";
$name2 = "data/test_exp1.txt";


// write the file to disk
file_put_contents($name, json_encode($post_data));
file_put_contents($name2, json_encode($post_data));
?>