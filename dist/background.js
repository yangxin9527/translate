
localStorage['isOpen']=0;
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if(request.time){
            localStorage[request.time]=JSON.stringify(request.data);
            sendResponse({code:0}); 
        }else{
          if(request.type=="change"){
            localStorage['isOpen']= request.isOpen==1?0:1;
          }
        sendResponse({code:0,isOpen:localStorage['isOpen']});
      }
      
    });
