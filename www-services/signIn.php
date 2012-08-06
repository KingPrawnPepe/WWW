<?php
include 'config.php';

//recieve the info, set vars
$uname = $_POST['uname'];
$pword = $_POST['pword'];
$email = $_POST['email'];

if (isset($_POST['uname']) == TRUE && isset($_POST['pword']) == TRUE ) {

    $sql = "select uName, pWord, id " . 
		"from users where uName = '' " .
		"group by e.id order by e.lastName, e.firstName";

    try {
	    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    $stmt = $dbh->query($sql);  
	    $employees = $stmt->fetchAll(PDO::FETCH_OBJ);
	    $dbh = null;
	    echo '{"items":'. json_encode($employees) .'}'; 
    } catch(PDOException $e) {
	    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}
else {

	echo "The uname or pword was not received properly";
}

?>