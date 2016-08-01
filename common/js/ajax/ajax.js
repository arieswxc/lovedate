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
        var url = 'http://192.168.0.122:8080' + json.url;
        var loading = json.loading;
        if(loading) {
            loadingRemain(true);
        }
        if(json.personId) {
            userId = json.personId;
        } else {
            userId = LS.getItem('userId');
        }
        $.extend(data, {
            p1: LS.getItem('sessionId'),
            p2: userId,
            m4: 'test',
            m5: '100',
            m6: '1.0.0',
            m7: 3,
            m11: 'wx',
            m16: '',
            m18: 'lovedate',
        });
        $.ajax({
            type : type,
            data : data,
            url : url,
            timeout: 30000,
            cache:false,
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
    };

    // exports.loadingRemain = loadingRemain;

});