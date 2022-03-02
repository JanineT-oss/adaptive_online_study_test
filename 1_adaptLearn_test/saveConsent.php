<?php

echo 'Processing ... ';

include('database_config.php');
$table_data = 'consent';

$data = json_decode(file_get_contents('php://input'), true);
$prolific_id = $data['prolific_id'];


$nameFile = "/Applications/MAMP/htdocs/1_adaptLearn_test/data/testfile_consent.txt";
file_put_contents($nameFile, $data, $prolific_id);

if (is_writable($nameFile)) {
  $message = "The file $nameFile exists";
} else {
  $message = "The file $nameFile does not exist";
}
//echo $message;
echo json_encode($message);

$consent1 = $data['consent1'];
$consent2 = $data['consent2'];
//$consent3 = $data['consent3'];
//$consent4 = $data['consent4'];
//$consent5 = $data['consent5'];
//$consent6 = $data['consent6'];
//$consent7 = $data['consent7'];
//$date = $data['date'];
//$time = $data['time'];



try {
    $conn = new PDO("mysql:host='localhost';dbname='database_trial'", 'root', 'root');
    //$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   // $sql = "INSERT INTO $table_data(`prolific_id`, 
   // `new_id`, `consent1`, `consent2`, 
   // `consent3`, `consent4`, `consent5`, 
   // `consent6`, `consent7`, `date`, `time`) VALUES ('$prolific_id',
   // '$new_id','$consent1','$consent2', '$consent3',
   // '$consent4', '$consent5', '$consent6','$consent7', '$date', '$time')";

   $sql = "INSERT INTO $table_data (`consent1`, `consent2`) VALUES ('$consent1','$consent2')";


    $insertstmt = $conn->prepare($sql);

    $insertstmt->execute();
    echo '{"success": true}';
  } catch(PDOException $e) {
    echo '{"success": false, "message": ' . $e->getMessage();
  }
  $conn = null;
?>