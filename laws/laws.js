/**
 * 查询指令
 * [Object]
 * 用关键字new声明
 */
function queryOrder(queryType, url, query){
	this.queryType = queryType;
	this.url = url;
	this.query = query;
}
queryOrder.prototype = {
	constructor: queryOrder,
	toString: function(){ return this; },
};

/**
 * 
 */

/**
 * 标题列表事件注册
 */
function listRegister(callback){
	var listDiv = document.getElementById("laws-list");
	var lawsList = listDiv.getElementsByTagName("li");
	for( var i=0;i<lawsList.length;i++ ){
		console.log(lawsList[i]);
		lawsList[i].onclick = function(){
			//this: lawsList[i]
			callback(this);
			return false;
		}
	}
}

/**
 * onClick function
 */
function onClick(that){
	var docPath = that.innerHTML + that.getAttribute("class");
	var queryList = new queryOrder(1, docPath, "");
	postData("laws.php", queryList , function(request){
		var div = document.getElementsByClassName("details")[0];
		div.innerHTML = request.responseText ;
		var imgs = div.getElementsByTagName('img');
		for(var i=0;i<imgs.length;i++){
			var originalSrc = div.getElementsByTagName('img')[i].getAttribute('src');
			var src = "content/" + originalSrc;
			div.getElementsByTagName('img')[i].setAttribute('src', src);
		}
		location.hash = docPath;							//设置锚，用于标定网页位置
	});
}

/**
 * 生成标题列表
 * @param titleLists: Array, list of titles
 */
function listGenerate(titleLists){
	var listDiv = document.getElementById("laws-list");
	if(!listDiv) return false;
	var titleListHTML = "";
	for( var i=0;i<titleLists.length;i++){
		var docType = checkDocType(titleLists[i]);
		titleLists[i] = titleLists[i].replace(docType, "");
		titleListHTML = titleListHTML + "<li " + "class=\"" + docType + "\"" + "onclick=onClick(this)" + ">" + titleLists[i] + "</li>" ;
	}
	listDiv.innerHTML = titleListHTML;
}
function decodeJSON(jsonObj){
	if (!jsonObj) return "";    // Always return a string
	var pairs = [];          // To hold name=value pairs
	for(var name in jsonObj) {                                  // For each name
		if (!jsonObj.hasOwnProperty(name)) continue;            // Skip inherited
		if (typeof jsonObj[name] === "function") continue;      // Skip methods
		if (jsonObj[name] == null) continue;
		var value = jsonObj[name].toString();                   // Value as string
		pairs.push(value);   // Remember name=value pair
	}
	return pairs;
}
function checkDocType(files){
	var formatList = new Array('.txt', '.html', '.xml', '.htm');
	for(var j=0;j<formatList.length;j++){
		var pattern = new RegExp( '\\' + formatList[j] + '$' );
		if( pattern.test(files) )
			return formatList[j];
	}
}

/**
 * Use JSON decode to send a HTML POST request
 * @param callback: function that used to deal with request
 * @param data: original data to post
 */
function postJSON(url, data, callback){
	var request = new XMLHttpRequest();
	request.open("POST", url);
	request.onreadystatechange = function(){
		callback(request);
	};
	request.setRequestHeader("Content-Type", "application/json");
	request.send( JSON.stringify(data) );
}

/**
 * Encode the properties of an object as if they were name/value pairs from
 * an HTML form, using application/x-www-form-urlencoded format
 * @param data: must be [Object]
 */
function encodeFormData(data) {
    if (!data) return "";    // Always return a string
    var pairs = [];          // To hold name=value pairs
    for(var name in data) {                                  // For each name
        if (!data.hasOwnProperty(name)) continue;            // Skip inherited
        if (typeof data[name] === "function") continue;      // Skip methods
		if (data[name] == null) continue;
        var value = data[name].toString();                   // Value as string
        name = encodeURIComponent(name.replace(" ", "+"));   // Encode name
        value = encodeURIComponent(value.replace(" ", "+")); // Encode value
        pairs.push(name + "=" + value);   // Remember name=value pair
    }
    return pairs.join('&'); // Return joined pairs separated with &
}
function postData(url, data, callback) {
    var request = new XMLHttpRequest();            
    request.open("POST", url);                    // POST to the specified url
    request.onreadystatechange = function() {     // Simple event handler
        if (request.readyState === 4 && callback) // When response is complete
            callback(request);                    // call the callback.
    };
    request.setRequestHeader("Content-Type",      // Set Content-Type
                             "application/x-www-form-urlencoded");
    request.send(encodeFormData(data));           // Send form-encoded data
}

/*
 * 初始化整个内容
 * 加载文章列表
 * 注册点击标题事件
 */
function initMain(){
	var queryList = new queryOrder(0, "content", "");
	postData("laws.php", queryList, function(request){
		var titleLists = decodeJSON( JSON.parse(request.responseText) );
		listGenerate(titleLists);
	});
}

/**
 * backward操作
 */
window.onhashchange = function() {
	console.log(location.hash);
	if( location.hash == "" )
		initMain();
}

initMain();

////////////////////////////////////////////////////////////////////////////////////////////////////