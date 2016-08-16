/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
    // var allow = location.href.indexOf("192.168") != -1 ? false : true;
    var loadingRemain = function(boolean) {//加载动画
        var loadingDom = [
            '<div class="loadingBox" style="position: fixed;width: 100%;height: 100%; background:#efefef;opacity:0.8;left:0;top:0;z-index:1000;">',
                '<div class="loadingImg" style="margin: auto;width: 50px;height: 50px;position: absolute;left: 0;right: 0;bottom: 0;top: 0;">',
                    '<img src="/lovedate/assets/img/loading.gif" style="width:100%;height:100%;">',
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
        for(var key in data) {
            if(data[key]=='' || data[key]==null) {
                delete data[key];
            }
        }
        if(json.debug) {
            var url = 'http://192.168.0.17:8080' + json.url;
        } else {
            var url = 'http://192.168.0.122:8080' + json.url;
        }
        var loading = json.loading;
        if(loading) {
            loadingRemain(true);
        }
        if(json.uploadFormat){//如果是上传文件
            data.append("p2", LS.getItem('userId'));
            data.append("p1", LS.getItem('sessionId'));
            $.ajax({
                type : type,
                data : data,
                url : url,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                timeout: 30000,
                dataType: "json", 
                success : function(res, textStatus, jqXHR) {
                    // console.log(res);
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
                error : function(err){
                    loadingRemain(false);
                    var result = transResult(err.responseText);
                    if(result.code==200) {
                        json.callback(result);
                    } else {
                        json.err(result);
                    }
                }
            });
        } else {
            if(json.login) {//如果是登录
                var postdata = $.extend({
                    m4: 'test',
                    m5: '100',
                    m6: '1.0.0',
                    m7: 3,
                    m11: 'wx',
                    // m16: '',
                    m18: 'lovedate'
                },data);
            } else {
                var postdata = $.extend({
                    p1: LS.getItem('sessionId'),
                    p2: isTrue(json.personId)?json.personId:LS.getItem('userId'),
                    m4: 'test',
                    m5: '100',
                    m6: '1.0.0',
                    m7: 3,
                    m11: 'wx',
                    // m16: '',
                    m18: 'lovedate'
                },data);
            }
            $.ajax({
                type : type,
                data : postdata,
                url : url,
                timeout: 30000,
                dataType: "json", 
                success : function(res) {
                    loadingRemain(false);
                    if (json.suc && typeof json.suc === 'function') {
                        json.suc(res);
                    }
                },
                error : function(err){
                    // alert(err);
                    loadingRemain(false);
                    var result = transResult(err.responseText);
                    if(result.code==200) {
                        json.callback(result);
                    } else {
                        json.err(result);
                    }
                }
            });
        }
    };

     //ajax请求
    exports.ajax2 = function (json) {
        var type = json.type;
        var data = json.data;
        var url = json.url;
        var loading = json.loading;
        if(loading) {
            loadingRemain(true);
        }
        url = url.split("?").join("!");
        url = url.split("&").join("@");
        url = "../url.jsp?url=" + url;
        $.ajax({
            type : type,
            data : data,
            url : url,
            timeout: 30000,
            cache:false,
            dataType: "json", 
            success : function(res) {
                loadingRemain(false);
                console.log(res);
                if (json.suc && typeof json.suc === 'function') {
                    json.suc(res);
                }
            },
            error : function(error){
                loadingRemain(false);
                // console.log(error.responseText);
                json.err(error.responseText);
            }
        });
    };


    // exports.loadingRemain = loadingRemain;

});