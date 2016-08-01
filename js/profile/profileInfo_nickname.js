/* 
* @Author: wangxiaochen
* @Date:   2016-07-28
*/
define(function(require,exports,module) {
	var doT = require('doT');
	var ajax = require('ajax');


	(function init() {
		var profileInfo = JSON.parse(LS.getItem('profileInfo'));
		// console.log(profileInfo);
		$('.nicknameinput').val(profileInfo.b52);

		$('.nick_confirm').click(function(e) {
			profileInfo.b52 = $('.nicknameinput').val();
			var postProfileInfo = {};
			for(var key in profileInfo) {
				var newKey = 'a' + key.substr(1);
				postProfileInfo[newKey] = profileInfo[key];
			}
			updateNickname(postProfileInfo,profileInfo);
		});
		
	})();


	function updateNickname(postProfileInfo,profileInfo) {
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