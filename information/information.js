function getXMLHTTPRequest() {
   var req =  false;
   try {
      /* for Firefox */
      req = new XMLHttpRequest(); 
   } catch (err) {
      try {
         /* for some versions of IE */
         req = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (err) {
         try {
            /* for some other versions of IE */
            req = new ActiveXObject("Microsoft.XMLHTTP");
         } catch (err) {
            req = false;
         }
     }
   }
   
   return req;
}

function getServerTime(myReq) {
  var thePage = 'http://localhost/instance/test.php';
  myRand = parseInt(Math.random()*999999999999999);
  var theURL = thePage +"?rand="+myRand;
  myReq.open("GET", theURL, true);
  myReq.onreadystatechange = function() {
	  if (myReq.readyState == 4) {
			console.log(myReq);
		if(myReq.status == 200) {
			console.log(myReq);
		   var timeString = myReq.responseXML.getElementsByTagName("timestring")[0];
		   document.getElementById('showtime').innerHTML = timeString.childNodes[0].nodeValue;
		}
	  } else {
		console.log(myReq);
		document.getElementById('showtime').innerHTML = '<p>wait...</p>';
	  }
	};
  myReq.send(null);
}


function onMouseClick(){
	var myReq = getXMLHTTPRequest();
	getServerTime(myReq);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
		titleListHTML = titleListHTML + "<li>" + titleLists[i] + "</li>" ;
	}
	console.log(titleListHTML);
	listDiv.innerHTML = titleListHTML;
}

/**
 * Use JSON decode to send a HTML POST request
 * @param callback: function that used to deal with request
 */
function postJSON(url, data, callback){
	var request = new XMLHttpRequest();
	request.open("POST", url);
	request.onreadystatechange = function(){
		callback(request);
	};
	request.setRequestHeader("Content-Type", "application/json");
	request.sent( JSON.stringify(data) );
}
