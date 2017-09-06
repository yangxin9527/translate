var $cookie = {
    setCookie: function (c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    },
    getCookie: function (c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                var c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }
}

chrome.cookies.onChanged.addListener(function (changeInfo) {
    console.log(changeInfo)
    if (changeInfo.cookie.name == "translateJson" && changeInfo.cause == "overwrite") {
        localStorage.setItem("translateJson", changeInfo.cookie.value);
        getTableData();
    }
});
// 读取localstorage  渲染
function getTableData() {
    let htmlEle = "";
    for (let i = 0, len = localStorage.length; i < len; i++) {
        return;
        var itemTime = localStorage.key(i);
        var itemQuery = JSON.parse(unescape(localStorage.getItem(localStorage.key(i))));
        console.log(itemQuery);
        item = "<tr><td>" +
            itemQuery.query +
            "</td><td>" +
            itemQuery.basic.us + itemQuery.basic.uk +
            "</td><td>" +
            itemQuery.explains +
            //translation
            "<i class='close' flag='" +
            itemTime +
            "' ></i></td></tr>"
        htmlEle += item;
    }
    document.getElementById("tableExcel").innerHTML = htmlEle;
    setTimeout(function () {
        var closeEle = document.getElementsByClassName("close");
        for (let i = 0, len = closeEle.length; i < len; i++) {
            closeEle[i].onclick = function () {
                localStorage.removeItem(this.getAttribute("flag"));
                getTableData();
            }
        }
    }, 0)
}
getTableData();


// table导出成excel
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
        base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) },
        format = function (s, c) {
            return s.replace(/{(\w+)}/g,
                function (m, p) { return c[p]; })
        }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.open(uri + base64(format(template, ctx)))
    }
})()

document.getElementById("export").onclick = function () {
    tableToExcel('tableExcel')
}

document.getElementById("isopen").onchange=function(){
   localStorage["isopen"]=document.getElementById("isopen").checked;
}

