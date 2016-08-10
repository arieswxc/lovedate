/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
    //全屏查看图片插件
    exports.show = function(title,text,confirmCallback) {
        var alert = {};
        alert.create = function() {
            $('body').append(alert.alertDom);
            $('.alert_bg').attr('data-id','2')
            $('.alert_bg').attr('style','position: fixed;width: 100%;height: 100%;background: #000;opacity: .5;top: 0;left: 0;')
            $('.alert').attr('style','position: absolute;left: 0;top:0;right:0;bottom: 0;width: 5.44rem;height: 3.45rem;margin: auto;text-align: center;background: #ffffff;border-radius: .1rem;font-size: 0;box-sizing:border-box;-moz-box-sizing:border-box; /* Firefox */-webkit-box-sizing:border-box; /* Safari */padding: 0 .36rem;')
            $('.alert_img').attr('style','width: 1.2rem;height: 1.2rem;margin-top: -0.6rem;')
            $('.alert_title').attr('style','font-size: .32rem;color: #333333;margin-top: .32rem;')
            $('.alert_text').attr('style','font-size: .28rem;color: #666666;margin-top: .28rem;')
            $('.alert_btn').attr('style','font-size: .32rem;color: #e43f3f;height: .88rem;line-height: .88rem;border-top: 1px solid #efefef;margin-top: .36rem;')
            alert.confirmEvent();
        }
        alert.paras = {
            title: title || '温馨提示',
            text: text || '绑定成功，你以后可以用手机登录啦！',
            confirmCallback: confirmCallback || function(){
                alert.remove();
            }
        }
        alert.remove = function() {
            $('.alert_bg').remove();
            $('.alert').remove();
        }
        alert.alertDom = [
            '<div class="alert_bg"></div>',
            '<div class="alert">',
                '<img class="alert_img" src="../../assets/img/alert_logo.png">',
                '<div class="alert_title">温馨提示</div>',
                '<div class="alert_text">绑定成功，你以后可以用手机登录啦！</div>',
                '<div class="alert_btn">好哒</div>',
            '</div>'
        ].join('');
        alert.confirmEvent = function() {
            $('.alert_btn').click(function() {
                alert.paras.confirmCallback();
                if($('.alert')) {
                    alert.remove();
                }
            });
        }  

        alert.init = function() {
            alert.create();
        } 

        alert.init();
    };

        
});