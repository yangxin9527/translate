
// 读取localstorage  渲染
function getTableData() {
    let wordHtml = "";
    let sentenceHtml = "";
    
    for (let i = 0, len = localStorage.length; i < len; i++) {
        var itemTime = localStorage.key(i);
        var newReg = /^[0-9]{13}$/;
        if(!newReg.test(itemTime)){
            continue;
        }
        var itemQuery = JSON.parse(unescape(localStorage.getItem(localStorage.key(i))));
        if(itemQuery.type==1){
            //单词
            wordHtml += `
            <tr>
            <td>${itemQuery.query}</td>
            <td>[英]${itemQuery.us}<br>[美]${itemQuery.uk}</td>
            <td>${itemQuery.explains}<i class='close' flag='${itemTime}'></i></td></tr>
            `;
        }else{
            //短句
            sentenceHtml += `
            <tr>
            <td>${itemQuery.query}</td>
            <td>${itemQuery.translation}<i class='close' flag='${itemTime}'></i></td>
            </tr>
            `;
        }
    }
    document.getElementById("wordBody").innerHTML = wordHtml;
    document.getElementById("sentenceBody").innerHTML = sentenceHtml;
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
    var id = this.getAttribute("flag");
    tableToExcel(id)
}

document.getElementById("isOpen").onchange=function(){
    localStorage["isOpen"]=document.getElementById("isOpen").checked?1:0;
}
if(localStorage["isOpen"]==1){
    document.getElementById("isOpen").checked=true;
}

document.getElementById("chooseTable").onchange=function(){
    let tableId = this.value;
    document.getElementById("export").setAttribute("flag",tableId);
    if(tableId=="word"){
        document.getElementById("word").style.display="table"
        document.getElementById("sentence").style.display="none"
    }else{
        document.getElementById("word").style.display="none"
        document.getElementById("sentence").style.display="table"
    }
}
