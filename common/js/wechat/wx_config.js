define(function(require,exports,module) {
    var wx = require('wx');
    var locationUrl = location.href;
    if(locationUrl.indexOf('index.html') != -1) {
        var checkData = { jsapi_ticket: 'kgt8ON7yVITDhtdwci0qedV5qlnWY_iGUTxOIEkCiK-IxIY_pKMwey1tDeShel2HS_KzMacyGgzUk-1st2Lntg',
  nonceStr: 'uxl77s1fcb1q0k9',
  timestamp: '1471250315',
  url: 'http://aries.vip.natapp.cn/lovedate/view/index.html',
  signature: '9f3ebb8d48da892fa7da484bf93af8681709b111' }
    } else if(locationUrl.indexOf('profilealbum.html') != -1) {
        var checkData = { jsapi_ticket: 'kgt8ON7yVITDhtdwci0qedV5qlnWY_iGUTxOIEkCiK_yP7wEhEsoClYyihaLUpAQ8FhZm_R-2fEMaRr_k55UWQ',
            nonceStr: 'ur63o2hukxogvi',
            timestamp: '1470817311',
            url: 'http://aries.vip.natapp.cn/lovedate/view/profile/profilealbum.html',
            signature: '6d886ccdebcc8af431458a54a1fe8904b864a13e' 
        };
    } else if(locationUrl.indexOf('pay.html') != -1) {
        var checkData ={ jsapi_ticket: 'kgt8ON7yVITDhtdwci0qedV5qlnWY_iGUTxOIEkCiK-IxIY_pKMwey1tDeShel2HS_KzMacyGgzUk-1st2Lntg',
  nonceStr: 'q2nvsolnzeiv0a4',
  timestamp: '1471250360',
  url: 'http://aries.vip.natapp.cn/lovedate/view/pay.html',
  signature: '48e4e27b9ec46622ab4b8a060629eeb6d2f2cc19' }

    }
    


    !(function configWechat() {
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxd5f871e36f664d36', // 必填，公众号的唯一标识
            timestamp: checkData.timestamp, // 必填，生成签名的时间戳
            nonceStr: checkData.nonceStr, // 必填，生成签名的随机串
            signature: checkData.signature,// 必填，签名，见附录1
            jsApiList: [
                'checkJsApi',  
                'onMenuShareTimeline',  
                'onMenuShareAppMessage',  
                'onMenuShareQQ',  
                'onMenuShareWeibo',  
                'hideMenuItems',  
                'showMenuItems',  
                'hideAllNonBaseMenuItem',  
                'showAllNonBaseMenuItem',  
                'translateVoice',  
                'startRecord',  
                'stopRecord',  
                'onRecordEnd',  
                'playVoice',  
                'pauseVoice',  
                'stopVoice',  
                'uploadVoice',  
                'downloadVoice',  
                'chooseImage',  
                'previewImage',  
                'uploadImage',  
                'downloadImage',  
                'getNetworkType',  
                'openLocation',  
                'getLocation',  
                'hideOptionMenu',  
                'showOptionMenu',  
                'closeWindow',  
                'scanQRCode',  
                'chooseWXPay',  
                'openProductSpecificView',  
                'addCard',  
                'chooseCard',  
                'openCard'  
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        
    }) ();

    exports.ready = function(callBackFuc) {
        wx.ready(function(){
            callBackFuc();
        });
    }

    exports.chooseImage = function(callBackFuc) {
        
    }
});