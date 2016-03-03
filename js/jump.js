var lang = navigator.browserLanguage ? navigator.browserLanguage : navigator.language ; 
if( lang== "zh-CN")
	location.replace("zh.html");
else
	location.replace("en.html");
