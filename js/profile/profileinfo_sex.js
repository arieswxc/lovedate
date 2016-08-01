/* 
* @Author: wangxiaochen
* @Date:   2016-07-28
* b69:  1 男  2 女
*/
define(function(require,exports,module) {
	var doT = require('doT');
	var ajax = require('ajax');


	(function init() {
		var profileInfo = JSON.parse(LS.getItem('profileInfo'));
		console.log(profileInfo);

		if(profileInfo.b69 == 1){
			$('.boy .check_img').attr('src','../../assets/img/check_yes.png').removeClass('can_click');
			$('.girl .check_img').attr('src','../../assets/img/check_no.png').addClass('can_click');
		} else {
			$('.boy .check_img').attr('src','../../assets/img/check_no.png').addClass('can_click');
			$('.girl .check_img').attr('src','../../assets/img/check_yes.png').removeClass('can_click');
		}

		$('.checkbox').on('click','.can_click',function(e) {
			var sex = $(this).attr('data-sex');
			console.log(sex);
			if(sex == 1) {
				$('.boy .check_img').attr('src','../../assets/img/check_yes.png').removeClass('can_click');
				$('.girl .check_img').attr('src','../../assets/img/check_no.png').addClass('can_click');
			} else {
				$('.boy .check_img').attr('src','../../assets/img/check_no.png').addClass('can_click');
				$('.girl .check_img').attr('src','../../assets/img/check_yes.png').removeClass('can_click');
			}

			profileInfo.b69 = sex;
			
		});

		$('.sex_confirm').click(function(e) {
			var postProfileInfo = {};
			for(var key in profileInfo) {
				var newKey = 'a' + key.substr(1);
				postProfileInfo[newKey] = profileInfo[key];
			}
			updateSex(postProfileInfo,profileInfo);
		});
		
	})();


	function updateSex(postProfileInfo,profileInfo) {
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