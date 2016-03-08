<?php
	$type = $_POST['queryType'];
	$url = $_POST['url'];
	$query = $_POST['query'];
	
	echo json_encode( array_diff(scandir($url), array('..', '.')) );
?>