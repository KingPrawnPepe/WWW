<?php
include 'config.php';

//recieve the info, set vars
$unameEmail = $_POST['unameEmail'];
$pword = $_POST['password'];

//check the username and password for a match for sign-in

if (isset($_POST['unameEmail']) == TRUE && isset($_POST['password']) == TRUE ) {

    //$safeUnameEmail = mysql_real_escape_string($unameEmail);
	//$safePword = md5($pword) ;
    $sql = "select uname, id " . 
		"from users where (uname = '$safeUnameEmail' or email = '$safeUnameEmail') and pword = '$pword' " ;

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