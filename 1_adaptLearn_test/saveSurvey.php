<?php
include('database_config.php');
$table_data = 'questionnaires';


// decode data from HTTP request
$post_data = json_decode(file_get_contents('php://input'), true);

// extract ID and JSPsych data
$id = $post_data['prolific_id'];
$data = $post_data['data'];
//print_r($post_data);

// the directory "data" must be writable by the www-data user!
// path to directory
$name = "data/test_surveys.txt";

// write the file to disk
file_put_contents($name, json_encode($data));

// save to DB
$date = $data['date'];
$time = $data['time'];
$audit1 = $data['audit1'];
$audit2 = $data['audit2'];
$audit3 = $data['audit3'];
$audit4 = $data['audit4'];
$audit5 = $data['audit5'];
$audit6 = $data['audit6'];
$audit7 = $data['audit7'];
$audit8 = $data['audit8'];
$audit9 = $data['audit9'];
$LA1 = $data['LA1'];
$LA2 = $data['LA2'];
$LA3 = $data['LA3'];
$LA4 = $data['LA4'];
$LA5 = $data['LA5'];
$LA6 = $data['LA6'];
$LA7 = $data['LA7'];
$RA1 = $data['RA1'];
$RA2 = $data['RA2'];
$RA3 = $data['RA3'];
$RA4 = $data['RA4'];
$IU1 = $data['IU1'];
$IU2 = $data['IU1'];
$IU3 = $data['IU3'];
$IU4 = $data['IU4'];
$IU5 = $data['IU5'];
$SS1 = $data['SS1'];
$SS2 = $data['SS2'];
$SS3 = $data['SS3'];
$bis1 = $data['bis1'];
$bis1 = $data['bis1'];
$bis2 = $data['bis2'];
$bis3 = $data['bis3'];




try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO $table_data(`audit1`,`audit2`,`audit3`,`audit4`,`audit5`,`audit6`,`audit7`,`audit8`,`audit9`,`audit10`,
    `LA1`,`LA2`,`LA3`,`LA4`,`LA5`,`LA6`,`LA7`,
    `RA1`,`RA2`,`RA3`,`RA4`,
    `IU1`,`IU2`,`IU3`,`IU4`,`IU5`,
    `SS1`,`SS2`,`SS3`,
    `bis1`,`bis2`,`bis3`) VALUES ('$audit1','$audit2','$audit3','$audit4','$audit5','$audit6','$audit7','$audit8','$audit9','$audit10',
    '$LA1','$LA2','$LA3','$LA4','$LA5','$LA6','$LA7',
    '$RA1','$RA2','$RA3','$RA4',
    '$IU1','$IU2','$IU3','$IU4','$IU5',
    '$SS1','$SS2','$SS3',
    '$bis1','$bis2','$bis3')";


    $insertstmt = $conn->prepare($sql);

    $insertstmt->execute();
    echo '{"success": true}';
  } catch(PDOException $e) {
    echo '{"success": false, "message": ' . $e->getMessage();
  }
  $conn = null;
?>