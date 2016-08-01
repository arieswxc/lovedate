/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	var doT = require('doT');
	var ajax = require('ajax');
	var select = require('select');

	(function init() {
		getProfileInfo();
	})();


	function getProfileInfo() {
		ajax.ajax({
			url: '/lp-bus-msc/f_108_10_1.service',
			type: 'POST',
			data: {
				// a78: '',
				// a95: '',
				// a110: ''
			},
			callback: function(res){
				console.log(res);
				LS.setItem('profileInfo', JSON.stringify(res.body));
				var template = doT.template($('#profile_info').html());
				$('body').append(template(res.body));
				events();
			},
			err: function(err) {
				console.log(err);
			}
		});
	};

	function events() {
		$('.info_item .qq').click(function(e) {
			location.href = './profileinfo_qq.html';
		});
		$('.info_item .wechat').click(function(e) {
			location.href = './profileinfo_wechat.html';
		});
		$('.info_item .nickname').click(function() {
			location.href = './profileinfo_nickname.html';
		})
		$('.info_item .sex').click(function() {
			location.href = './profileinfo_sex.html';
		});
		$('.info_item .motto_value').click(function() {
			location.href = './profileinfo_motto.html';
		});

		$('body').on('click','.info_item .age',function(e) {
			var self = this;
			select.selectPI({
				title: '年龄',
				selectOptions: [
					'140-150',
					'150-160',
					'160-170',
					'170-175',
					'175-180',
					'180-185',
					'185-190',
					'190-200'
				],
				confirmCallback: function(data) {
					console.log(data);
					$(self).text(data);
				}
			});
		})
	};
});