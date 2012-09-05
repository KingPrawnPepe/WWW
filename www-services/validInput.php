<?php
include 'config.php';

//recieve the info, set vars
$value = $_POST['value'];
$form = $_POST['form'];

if (isset($_POST['value']) == TRUE && isset($_POST['form']) == TRUE ) {

    //$safeValue = mysql_real_escape_string($value) ;
    //$safeForm = mysql_real_escape_string($form) ;

    // check which form this is coming from to set a custom sql query	
    switch ($form) {
    	case 'newUname':
            $sql = "select uname " . 
		    "from users where uname like '$value%' " ;
    		break;
     	case 'newEmail':
            $sql = "select email " . 
		    "from users where email like '$value' " ;
    		break;   		   	
    	default:
    		echo 'Not a recognized input ID';
    		break;
    }

    try {
	    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    $stmt = $dbh->query($sql);  
	    $results = $stmt->fetchAll(PDO::FETCH_OBJ);
	    $dbh = null;
	    if (empty($results)) {
	    	echo 'true';
	    }
	    else {
	    	echo 'false';
	    }
    } catch(PDOException $e) {
	    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}
else {

	echo "The form input was not received properly";
}

?>