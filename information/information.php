<?php
	/**
	 * 前端数据
	 * 一个消息类
	 */
	$type  = $_POST['queryType'];		//指令类型
	$url   = $_POST['url'];				//文档路径
	$query = $_POST['query'];			//查询条件
	
	/**
	 * 适配的文件格式
	 * define can only apply to string and numeric
	 */
	// define( 'FORMATLIST', array('.txt', '.html', '.xml', '.htm') );
	
	/**
	 * 判断操作系统
	 */
	$PHP_OS
	
	/**
	 * 根据指令类型作出反应
	 */
	switch($type){
		case 0:							//查列表
			// echo json_encode( array_diff(scandir($url), array('..', '.')) );		//如果文件系统编码是utf-8，就使用这一句
			$docs = scandir($url); $count = count($docs);
			/*for($x=0;$x<$count;$x++) {
				$docs[$x] = iconv( "GBK","utf-8", $docs[$x] );						//如果文件系统编码不是utf-8，则转码
			}*/																		//Linux下，不需转码
			$docs = formatFilter( $docs );											//去掉文件类型不符合项
			echo json_encode( $docs );
			// filemtime($url."/2.txt");											//获取文件最后一次更改时间
			// date( "F d Y H:i:s.", filemtime($url."/2.txt") );					//格式化时间（格林尼治时间，按时区加减即可）
			break;
		case 1:							//查内容
			// $fp = fopen("content/".$url);
			// $url = iconv( "utf-8", "GBK", $url );									//如果文件系统编码不是utf-8，则转码
			$text = readfile("content/".$url);
			// echo iconv( "GBK", "utf-8//IGNORE", $text );
			echo $text = mb_convert_encoding($text, "UTF-8", "gbk");
			break;
		default:
			echo "fail!";
			break;
	}
	
	/**
	 * 格式过滤器
	 * 参数 $formatList 为格式列表，只有格式列表中的文件格式不会被过滤掉
	 * 参数 $docs 为待过滤格式列表，包含指定路径内的所有格式的文件
	 */
	function formatFilter( $docs ){
		$formatList = array('.txt', '.html', '.xml', '.htm');
		$docsFilted = array();														//符合格式的文件列表
		for($j=0;$j<count($docs);$j++){
			for($i=0;$i<count($formatList);$i++){
				$pattern = '/\\'.$formatList[$i].'$/';								//创建正则表达式
				if( preg_match( $pattern, $docs[$j] ) ){							//匹配
					array_push( $docsFilted, $docs[$j] );							//匹配项存入 $ 中
				}
			}
		}
		return $docsFilted;															//返回 $docsFilted
	}
	
?>