

chrome.cookies.onChanged.addListener(function(changeInfo) {
    if(changeInfo.cookie.name=="translateJson" && changeInfo.cause=="overwrite"){
        var value = JSON.parse(unescape(changeInfo.cookie.value));
        localStorage.setItem(value.time,JSON.stringify(value.data));
    }
});

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        console.log(request.isOpen);
      if (request.isOpen){
          if(request.type=="change"){
            localStorage['isOpen']= request.isOpen==1?2:1;
          }
        sendResponse({code: 0,isOpen:localStorage['isOpen']});
      }
      else{
          sendResponse({}); 
      }
    });
