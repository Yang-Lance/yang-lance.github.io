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
  myReq.onreadystatechange = theHTTPResponse(myReq);
  myReq.send(null);
}

function theHTTPResponse(myReq) {
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
}
function onMouseClick(){
	var myReq = getXMLHTTPRequest();
	getServerTime(myReq);
}
