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
    const baiduAppid = "20170825000076986";
    const baiduSign = "JIxEYXJqTtFJnLS0QyfM";
    $("body").mouseup(function (e) {
        let text = window.getSelection();
        let salt = Math.round(Math.random()*1000);
        let sign = hex_md5(baiduAppid+text+salt+baiduSign);
        let param = "from=en&to=zh&appid="+baiduAppid+"&salt="+salt+"&sign="+sign+"&q="+text;
      
        if (text != "") {
            $.ajax({
                type:"post",
                url:"http://api.fanyi.baidu.com/api/trans/vip/translate",
                dataType:"json",
                data:param,
                success:function(data){
                    console.log("success:"+data);
                   alert("success:"+data.trans_result[0].dst);
        
                },
                error:function(error){
                console.log("error:"+error)    
                },
            })
        }
    }).mousedown(function () {
        console.log("鼠标按下")
    });
});
