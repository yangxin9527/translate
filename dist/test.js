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
var myTrans;
if (!myTrans) {
    myTrans = {
        isOpen: 2,
        changeOpen:function(type){
            chrome.extension.sendRequest({isOpen: myTrans.isOpen,type:type?type:""}, function(response) {
                if(!response.code){
                    myTrans.isOpen = response.isOpen;
                }
              });
              return myTrans.isOpen;
        },
        locationBox: function (e) {
            var boxConfig = {
                width: 450,
                height: 300
            }
            var browser = {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
            let boxEle = $(".translate-box");
            if (e.pageY + boxConfig.height < browser.height) {
                boxEle.css({
                    top: e.pageY + "px"
                })
            } else {
                boxEle.css({
                    bottom: 0
                })
            }

            if (e.pageX + boxConfig.width < browser.width) {
                boxEle.css({
                    left: e.pageX + "px"
                })
            } else {
                boxEle.css({
                    right: 0
                })
            }
            boxEle.show();
        },
        translateSearch: function (text, e) {
            // youdao翻译
            if (text.length > 300) {
                alert("最大翻译字符长度为300");
                return false;
            }
            var youdaoConfig = {
                url: "http://openapi.youdao.com/api",
                appKey: "0a2974b71ca222c7",
                secretKey: "AIjDPQIao6sg79gSjZHlgbo3KX4M6bNF"
            };

            let salt = Math.round(Math.random() * 1000);
            let sign = hex_md5(youdaoConfig.appKey + text + salt + youdaoConfig.secretKey);
            let param = "from=auto&to=auto&appKey=" + youdaoConfig.appKey + "&salt=" + salt + "&sign=" + sign + "&q=" + encodeURIComponent(text);
            $.ajax({
                type: "POST",
                url: youdaoConfig.url,
                dataType: "json",
                data: param,
                success: function (data) {
                    if (data.errorCode == 0) {
             
                        let addJson = {
                            time:Date.parse(new Date()),
                            data:{
                                query:data.query,
                                basic:{
                                    uk:"",
                                    us:""
                                },
                                explains:[],
                                translation:data.translation
                            }
                        };
                        var $div = $("<div>").addClass("translate-box");
                        $div.append($("<span>").addClass("collect").html("collect"));
                        $div.append($("<input>").attr("type","hidden").attr("id","translateInput"));
                        if (data.basic) {
                            $div.append($("<div>").addClass("title").html(data.query));
                            $div.append($("<span>").addClass("uk-phonetic").html("[英]" + data.basic['uk-phonetic']));
                            $div.append($("<span>").addClass("us-phonetic").html("[美]" + data.basic['us-phonetic']));
                            var str = "";
                            for (let i = 0, len = data.basic.explains.length; i < len; i++) {
                                str += "<li><span>" +
                                    data.basic.explains[i]
                                    + "</span></li>";
                                addJson.data.explains.push(data.basic.explains[i]);
                            }
                            $div.append($("<ul>").addClass("comment").html(str));
                            addJson.data.basic.uk = data.basic['uk-phonetic'];
                            addJson.data.basic.us = data.basic['us-phonetic'];
                        } else if (data.translation) {
                            $div.append($("<div>").addClass("sentence-translation").html(data.translation));
                        }
                        $("body").append($div);
                        myTrans.locationBox(e);
                        $("#translateInput").val(JSON.stringify(addJson));
                    }
                },
                error: function (error) {
                    console.log("error")
                },
            })

        },
        setCookie :function (c_name,value,expiredays)
        {
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
        },
        getCookie : function (c_name)
        {
        if (document.cookie.length>0)
          {
          var c_start=document.cookie.indexOf(c_name + "=")
          if (c_start!=-1)
            { 
            c_start=c_start + c_name.length+1 
            var c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
            } 
          }
        return ""
        }
    }
    $(function () {
        $("body").mouseup(function (e) {
            if (myTrans.changeOpen() !=1) {
                return false;
            }
            let text = window.getSelection().toString();
            if (text != "") {
                myTrans.translateSearch(text, e);
            }
        }).mousedown(function () {
            if ($(".translate-box")) {
                $(".translate-box").remove();
            }
        });

        $("body").on("mouseup", ".translate-box", function (event) {
            event.stopPropagation();
        }).on("mousedown", ".translate-box", function (event) {
            event.stopPropagation();
        })
        $("body").on("mouseup", ".collect", function (event) {
            event.stopPropagation();
        }).on("mousedown", ".collect", function (event) {
            event.stopPropagation();
            // console.log("收藏");
            if(myTrans.getCookie("translateJson")){
                var translateJson = JSON.parse(myTrans.getCookie("translateJson"));
            }else{
                var translateJson=[];
            }
            myTrans.setCookie("translateJson",$("#translateInput").val())
            setTimeout(function () {
                $(".translate-box").remove();
            }, 0)
        })
    });
    document.onkeydown = function () {
        var oEvent = window.event;
        if (oEvent.keyCode == 84 && oEvent.altKey) {
            myTrans.changeOpen("change");
            if ($(".translate-box"))
                $(".translate-box").remove();
        }
    }

}else{
    console.log("翻译插件加载失败。全局有myTrans变量，为了不和你浏览网站产生冲突，故不加载插件。若你仍想加载翻译插件，请在右上角 ")
}


