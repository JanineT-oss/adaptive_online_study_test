<?php
echo 'Processing ... ';

$post_data = json_decode(file_get_contents('php://input'), true);
$save_data = $post_data['name'];

echo $post_data;

$name = "/Applications/MAMP/htdocs/6_testroutine/data/testfile.txt";
file_put_contents($name, $post_data);

if (is_writable($name)) {
    $message = "The file $name exists";
} else {
    $message = "The file $name does not exist";
}
//echo $message;
echo json_encode($message);


