/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	var doT = require('doT');
	var ajax = require('ajax');
	var globalState = require('globalState');

	function initBanner(imgList) {
		var template = doT.template($('#fate_header_item').html());
		var imgListDom = '';
		$.each(imgList,function(i,v) {
			imgListDom += template({
				photo_url:v.b57,
				userId: v.b80
			});
		});
		$('.fate_header').html(imgListDom);
	}


	function initPerson(personList) {
		var template = doT.template($('#fate_person_item').html());
		var personListDom = [];
		$.each(personList, function(i,v) {
			personListDom += template({
				photoUrl: v.b57,
				name: v.b52 || '未知',
				age: v.b1 || '未知',
				height: v.b33 || '未知',
				position: v.b67 || '未知',
				isLove: v.b116,
				userId: v.b80
			})
		});
		$('.fate_person_list').html(personListDom);
	}

	(function events() {
		$('.fate_header').on('click','li img',function(e) {
			var userId = $(this).attr('data-id');
			console.log(userId);
			globalState.setPersonId(userId);
			location.href = './personhome.html';
		});
		$('.fate_person_list').on('click','li.person_item .person_box', function() {
			var userId = $(this).attr('data-id');
			console.log(userId);
			globalState.setPersonId(userId);
			location.href = './personhome.html';
		}).on('click','li.person_item .love_btn',function(e) { //关注好友
			var self = $(this);
			var userId = self.closest('.person_item').find('.person_box').attr('data-id');
			if(self.find('span').text() == '喜欢') {
				var url = '/lp-bus-msc/f_105_10_2.service';
				var btnType = 'add';
			} else {
				var url = '/lp-bus-msc/f_105_12_3.service';
				var btnType = 'delete';
			}
			ajax.ajax({
				url: url,
				type: 'post',
				loading: true,
				data: {
					a77: userId	
				},
				callback: function(res) {
					console.log(res);
					if(btnType == 'add') {
						self.find('span').text('已喜欢');
					} else {
						self.find('span').text('喜欢');
					}
				},
				err: function(err){
					console.log(err);
				}
			});
		});
	})();

	exports.init = function() {
		ajax.ajax({
			url: '/lp-bus-msc/f_111_17_1.service',
			type: 'post',
			loading: true,
			data: {
				a69: LS.getItem('sex'),
				// a95: 10,
				// a9: '',
				// a67: '',
				// a40: '',
				// a38: '',
				// a117: ''
			},
			callback: function(res) {
				// console.log(res);
				initBanner(res.body.b179);
				initPerson(res.body.b180);
			},
			err: function(err){
				console.log(err);
			}
		})
	}
});