<?php
ini_set('display_errors', 1);

// decode data from HTTP request
$post_data = json_decode(file_get_contents('php://input'), true);

// extract ID and JSPsych data
$id = $post_data['prolific_id'];
$save_data = $post_data['data'];
echo $id;

// the directory "data" must be writable by the www-data user!
// path to directory
$name = "/".$id."_demographics.json";

// write the file to disk
file_put_contents($name, json_encode($save_data));


// test write data janine
$nameFile = "/Applications/MAMP/htdocs/1_adaptLearn_test/data/testfile_demo.txt";
file_put_contents($nameFile, $save_data);

if (is_writable($nameFile)) {
  $message = "The file $nameFile exists";
} else {
  $message = "The file $nameFile does not exist";
}
//echo $message;
echo json_encode($message);

// SAVE TO DB
include('database_config.php');
$table_data = 'demographics';

// json format: $data['prolific_id']

$age = $save_data['age'];
$gender = $save_data['gender'];
$education = $save_data['education'];
$employment = $save_data['employment'];
$country = $save_data['country'];
$date = $save_data['date'];
$time = $save_data['time'];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO $table_data(`new_id`, 
    `age`, `gender`, 
    `education`, `employment`, `country`, `date`, `time`) VALUES ('$id',
    '$age','$gender','$education', '$employment',
    '$country', '$date', '$time')";


    $insertstmt = $conn->prepare($sql);

    $insertstmt->execute();
    echo '{"success": true}';
  } catch(PDOException $e) {
    echo '{"success": false, "message": ' . $e->getMessage();
  }
  $conn = null;
?>