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
		if(profileInfo.b158 && profileInfo.b158 == 1) {
			$('.qqinput').val(profileInfo.b156);
			$('.switch img').attr({'src':'../../assets/img/switch_on.png','data-status':'1'});
		} else {
			$('.qqinput').val(profileInfo.b156);
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
			profileInfo.b156 = $('.qqinput').val();
			profileInfo.b158 = $('.switch img').attr('data-status');
			var postProfileInfo = {};
			for(var key in profileInfo) {
				var newKey = 'a' + key.substr(1);
				postProfileInfo[newKey] = profileInfo[key];
			}
			updateQQ(postProfileInfo,profileInfo);
		});
		
	})();


	function updateQQ(postProfileInfo,profileInfo) {
		ajax.ajax({
			url: '/lp-bus-msc/f_108_11_2.service',
			type: 'POST',
			data: postProfileInfo,
			callback: function(res){
				console.log(res);
				LS.setItem('profileInfo', JSON.stringify(profileInfo));
				history.back();
			},
			err: function(err) {
				console.log(err);
			}
		})
	};

	
});