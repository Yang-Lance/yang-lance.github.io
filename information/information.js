/**
 * 标题列表事件注册
 */
function listRegister(callback){
	var listDiv = document.getElementById("information-list");
	var informationList = listDiv.getElementsByTagName("li");
	for( var i=0;i<informationList.length;i++ ){
		console.log(informationList[i]);
		informationList[i].onclick = function(){
			//this: informationList[i]
			callback(this);
			return false;
		}
	}
}

/**
 * 生成标题列表
 * @param titleLists: Array, list of titles
 */
function listGenerate(titleLists){
	var listDiv = document.getElementById("information-list");
	var titleListHTML = "";
	for( var i=0;i<titleLists.length;i++){
		titleListHTML = titleListHTML + "<li onclick='console.log(this)'>" + titleLists[i] + "</li>" ;
	}
	console.log(titleListHTML);
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * 加载文章列表
 * 注册点击标题事件
 */
var queryList = new queryOrder(0, "content", "");
postData("information.php", queryList, function(request){
	var titleLists = decodeJSON( JSON.parse(request.responseText) );
	listGenerate(titleLists);
});
