/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	var ajax = require('ajax');
	var wx =require('../common/js/lib/jweixin-1.0.0.js');
	var wx_config =require('../common/js/wechat/wx_config.js');
	var goodscode = LS.getItem('goodscode');
	$('.confirm_pay span').text(LS.getItem('price'))

	$('.pay_item .pay_check').click(function() {
		$(this).hide();
		$(this).closest('.pay_item').find('.pay_check_img').show()		
		$(this).closest('.pay_item').siblings('.pay_item').find('.pay_check_img').hide()		
		$(this).closest('.pay_item').siblings('.pay_item').find('.pay_check').show()		
	});
	
	$('.confirm_pay').click(function(e) {
		getOrder();
	});
   	
   	function getOrder() {
   		ajax.ajax({
   			url: '/lp-pay-msc/f_124_10_1.service',
   			type: 'post',
   			data: {
   				a130: 2,
   				a153: goodscode,
   				m16: 1999
   			},
   			suc: function(res) {
   				payByWechat(res.body);
   			},
   			err: function(err) {
   				console.log(err);
   			}
   		})
   	}

   	function payByWechat(payParas) {
   		alert('sha1');
   		wx.chooseWXPay({
		    timeStamp: payParas.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		    nonceStr: payParas.nonce_str, // 支付签名随机串，不长于 32 位
		    package: 'prepay_id=' + payParas.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
		    signType: 'SHA1', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
		    paySign: payParas.sign, // 支付签名
		    success: function (res) {
		    	console.log(res);
		        // 支付成功后的回调函数
		    },
		    error: function(err) {
		    	alert(err);
		    }
		});

		//  WeixinJSBridge.invoke(
		//    'getBrandWCPayRequest', {
		//        "appId" ： "wxd5f871e36f664d36",     //公众号名称，由商户传入     
		//     	"timestamp": payParas.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		//        "nonceStr" ： payParas.nonce_str, //随机串     
		//        "package" ： 'prepay_id=' + payParas.prepay_id,     
		//        "signType" ： "MD5",         //微信签名方式：     
		//        "paySign" ： "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
		//    },
		//    function(res){     
		//        	alert(res)
		//        if(res.err_msg == "get_brand_wcpay_request：ok" ) {
		//        }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
		//    }
		// ); 
   	}


});