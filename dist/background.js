

chrome.cookies.onChanged.addListener(function(changeInfo) {
    if(changeInfo.cookie.name=="translateJson" && changeInfo.cause=="overwrite"){
        var value = JSON.parse(unescape(changeInfo.cookie.value));
        localStorage.setItem(value.time,JSON.stringify(value.data));
    }
});


