/* 
* @Author: wangxiaochen
* @Date:   2016-07-28
*/
define(function(require,exports,module) {
	var doT = require('doT');
	var ajax = require('ajax');


	(function init() {
		var profileInfo = JSON.parse(LS.getItem('profileInfo'));
		console.log(profileInfo);
		if(profileInfo.b159 && profileInfo.b159 == 1) {
			$('.wechatinput').val(profileInfo.b157);
			$('.switch img').attr({'src':'../../assets/img/switch_on.png','data-status':'1'});
		} else {
			$('.wechatinput').val(profileInfo.b157);
			$('.switch img').attr({'src':'../../assets/img/switch_off.png','data-status':'2'});
		}

		$('.switch img').click(function(e) {
			if($(this).attr('data-status') == 1) {
				$(this).attr({'src':'../../assets/img/switch_off.png','data-status':'2'});
			} else {
				$(this).attr({'src':'../../assets/img/switch_on.png','data-status':'1'});
			}
		});

		$('.qq_confirm').click(function(e) {
			profileInfo.b157 = $('.wechatinput').val();
			profileInfo.b159 = $('.switch img').attr('data-status');
			var postProfileInfo = {};
			for(var key in profileInfo) {
				var newKey = 'a' + key.substr(1);
				postProfileInfo[newKey] = profileInfo[key];
			}
			updateWechat(postProfileInfo,profileInfo);
		});
		
	})();


	function updateWechat(postProfileInfo,profileInfo) {
		ajax.ajax({
			url: '/lp-bus-msc/f_108_11_2.service',
			type: 'POST',
			data: postProfileInfo,
			callback: function(res){
				console.log(res);
				LS.setItem('profileInfo', JSON.stringify(profileInfo));
				history.go(-1);
			},
			err: function(err) {
				console.log(err);
			}
		})
	};

	
});