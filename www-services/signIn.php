<?php
include 'config.php';

//recieve the info, set vars
$uname = $_POST['username'];
$pword = $_POST['password'];
//$email = $_POST['email'];

//check the username and password for a match for sign-in

if (isset($_POST['username']) == TRUE && isset($_POST['password']) == TRUE ) {

    //$safeUname = mysql_real_escape_string($uname) ;
	//$safePword = md5($pword) ;
    $sql = "select uname, pword, id " . 
		"from users where uname = '$uname' and pword = '$pword' " ;

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