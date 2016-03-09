<?php
	/**
	 * 前端数据
	 */
	$type = $_POST['queryType'];		//指令类型
	$url = $_POST['url'];				//文档路径
	$query = $_POST['query'];			//查询条件
	
	/**
	 * 适配的文件格式
	 */
	define( 'FORMATLIST', array('.txt', '.html', '.xml', '.htm') );
	
	/**
	 * 
	 */
	switch($type){
		case 0:							//查列表
			// echo json_encode( array_diff(scandir($url), array('..', '.')) );		//如果文件系统编码是utf-8，就使用这一句
			$docs = scandir($url); $count = count($docs);
			for($x=0;$x<$count;$x++) {
				$docs[$x] = iconv( "GBK","utf-8", $docs[$x] );						//如果文件系统编码不是utf-8，则转码
			}
			// $docs = array_diff( $docs, array('..', '.') );							//去掉"."和".."两项
			$docs = formatFilter( $docs );								//去掉文件类型不符合项
			echo json_encode( $docs );				
			break;
		case 1:							//查内容
			$fp = fopen("content/".$url , rw);
			$url = iconv( "utf-8", "GBK", $url );									//如果文件系统编码不是utf-8，则转码
			echo readfile("content/".$url);
			break;
		default:
			echo "fail!";
			break;
	}
	
	/**
	 * 
	 */
	function formatFilter( $docs ){
		$docsFilted = array();
		for($j=0;$j<count($docs);$j++){
			for($i=0;$i<count(FORMATLIST);$i++){
				$pattern = '/\\'.FORMATLIST[$i].'$/';
				if( preg_match( $pattern, $docs[$j] ) ){
					array_push( $docsFilted, $docs[$j] );
				}
			}
		}
		return $docsFilted;
	}
	
?>