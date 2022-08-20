<?php
// change paths according to system
// paths linux:
$pypath = "/Users/janine/opt/anaconda3/bin/python";
$scriptpath = "/Applications/MAMP/htdocs/1_adaptLearn_test/Exp1_getCorrResp.py";

// decode data from HTTP request
//$post_data = json_decode(file_get_contents('php://input'), true);

// extract ID and JSPsych data
//$id = $post_data['prolific_id'];
//echo $id;

$name = "/Applications/MAMP/htdocs/1_adaptLearn_test/data/test_exp1.txt";

// execute python script: file must be executable by the www-data user!
// $pythonstuff = shell_exec("$pypath $scriptpath ".escapeshellarg($id));
// echo $pythonstuff;

try {
    //$pythonstuff = shell_exec("$pypath $scriptpath ".escapeshellarg($id));
    $pythonstuff = shell_exec("$pypath $scriptpath ");
    echo $pythonstuff;
    echo '{"success": true}';
  } catch(Exception $e) {
    echo '{"success": false, "message": ' . $e->getMessage();
}
?>
