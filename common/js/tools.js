/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
    // var allow = location.href.indexOf("192.168") != -1 ? false : true;
    var allow = false;
    var loadingRemain = function(boolean) {//加载动画
        var loadingDom = [
            '<div class="loadingBox" style="position: fixed;width: 100%;height: 100%; background:#efefef;opacity:0.8;left:0;top:0;z-index:1000;">',
                '<div class="loadingImg" style="margin: auto;width: 50px;height: 50px;position: absolute;left: 0;right: 0;bottom: 0;top: 0;">',
                    '<img src="../img/loading.gif" style="width:100%;height:100%;">',
                '</div>',
            '</div>'
        ].join('');
        if (boolean) {
            $('body').append(loadingDom);
        } else {
            $('.loadingBox').remove();
        }
    };


    //ajax请求
    exports.ajax = function (json) {
        var type = json.type;
        var data = json.data;
        var url = json.url;
        if(allow){
            url = url.split("!").join("?");
            url = url.split("@").join("&");
        }
        else{
            url = url.split("?").join("!");
            url = url.split("&").join("@");
            url = "../../url.jsp?url=" + url;
        }
        var loading = json.loading;
        if(loading) {
            loadingRemain(true);
        }
        $.ajax({
            type : type,
            data : data,
            url : url,
            timeout: 30000,
            cache:false,
            dataType: "json", 
            success : function(res, textStatus, jqXHR) {
                loadingRemain(false);
                if (res.status == 1) {
                    if (json.suc && typeof json.suc === 'function') {
                        json.suc(res);
                    }
                } else {
                    if(json.err && typeof json.err === 'function'){
                        json.err(res.exceptionMessage);
                    }
                }
            },
            error : function(e,errormsg,msg){
                loadingRemain(false);
                if(json.err){
                    json.err(errormsg,"fail");
                } else {
                    console.log(errormsg);
                }
            }
        });
    };

    exports.loadPage = function(url) {
        window.location.href = url;
    };

    //获取手机系统
    exports.getSystem =  function(us){
        us = us.toLowerCase();
        if(us.indexOf("android") != -1 || us.indexOf("linux") != -1){
            return "Android";
        }
        if(us.indexOf("safari") != -1){
            if(us.indexOf("windows") != -1){
                return "pc";
            }
            else{
                if(us.indexOf("mac") != -1){
                    return "ios";
                }
                else{
                    return "Android";
                }
            }
        }
        if(us.indexOf("iphone") != -1 || us.indexOf("ipad") != -1 || us.indexOf("ios") != -1){
            if(us.indexOf("mac") != -1){
                return "ios";
            }
        }
        if(us.indexOf("iuc") != -1 && us.indexOf("mac") != -1){
            return "ios";
        }
        return "pc";
    };

    exports.isqqOrucBrowser = function() {
        var bLevel = {
            qq: {forbid: 0, lower: 1, higher: 2},
            uc: {forbid: 0, allow: 1}
        };
        var UA = navigator.appVersion;
        var isqqBrowser = (UA.split("MQQBrowser/").length > 1) ? bLevel.qq.higher : bLevel.qq.forbid;
        var isucBrowser = (UA.split("UCBrowser/").length > 1) ? bLevel.uc.allow : bLevel.uc.forbid;
        return isqqBrowser || isucBrowser;
    }
    
    exports.isWeiXin = function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }

    exports.loadingRemain = loadingRemain;

});