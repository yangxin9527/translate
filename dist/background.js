

chrome.cookies.onChanged.addListener(function(changeInfo) {
    if(changeInfo.cookie.name=="translateJson" && changeInfo.cause=="overwrite"){
        var value = JSON.parse(unescape(changeInfo.cookie.value));
        localStorage.setItem(value.time,JSON.stringify(value.data));
    }
});

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting == "hello")
        sendResponse({farewell: "goodbye"});
      else
        sendResponse({}); // snub them.
    });
