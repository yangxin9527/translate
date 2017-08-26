// ==UserScript==
// @name               iciba划词翻译
// @namespace          noe132.com
// @author             noe132
// @include            http://*
// @include            https://*
// @exclude            http://www.iciba.com*
// @grant              GM_xmlhttpRequest
// @grant              GM_addStyle
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_registerMenuCommand
// @icon               http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @require            https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.auto.min.js
// @version            3.3.1
// @supportURL         http://tieba.baidu.com/f?kw=firefox
// ==/UserScript==



'use strict'
$(function () {
    init();
    $("body").mouseup(function (e) {
        let text = window.getSelection().toString();
        if (text != "") {
            translateSearch(text,e);
        }
    }).mousedown(function () {
        if($(".translate-box")){
            $(".translate-box").remove();
        }
        
    });
});
function init() {
    
}
function locationBox(e) {
    $(".translate-box").css({
        top: e.pageY + 5 + "px",
        left: e.pageX + 5 + "px"
    }).show();
}
function translateSearch(text,e) {
    // youdao翻译
    var youdaoConfig={
        url:"http://openapi.youdao.com/api",
        appKey:"0a2974b71ca222c7",
        secretKey:"AIjDPQIao6sg79gSjZHlgbo3KX4M6bNF"
    };

    let salt = Math.round(Math.random()*1000);
    let sign = hex_md5(youdaoConfig.appKey+text+salt+youdaoConfig.secretKey);
    let param = "from=auto&to=auto&appKey="+youdaoConfig.appKey+"&salt="+salt+"&sign="+sign+"&q="+encodeURIComponent(text);
    $.ajax({
        type: "POST",
        url: youdaoConfig.url,
        dataType: "json",
        data: param,
        success: function (data) {
            if(data.errorCode ==0){
                var $div = $("<div>").addClass("translate-box");
                $div.append($("<div>").addClass("title").html(data.query));

                if(data.basic){
                    $div.append($("<span>").addClass("uk-phonetic").html("[英]"+data.basic['uk-phonetic']));
                    $div.append($("<span>").addClass("us-phonetic").html("[美]"+data.basic['us-phonetic']));
             
                            
                    var str = "";
                    for(let i=0,len=data.basic.explains.length;i<len;i++){
                        str +="<li><span>"+
                                data.basic.explains[i]
                            +"</span></li>"
                    }
                    $div.append($("<ul>").addClass("comment").html(str));
                }else if(data.translation){
                    var $div = $("<div>").addClass("translate-box");
                    $div.append($("<div>").addClass("sentence-translation").html(data.translation));
            
                }
                $("body").append($div);
                locationBox(e);
            }
        },
        error: function (error) {
            console.log("error")
        },
    })
}


