/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	var doT = require('doT');
	var ajax = require('ajax');
	var globalState = require('globalState');
	function initNearByPerson(personList) {
		// console.log(personList);
		var template = doT.template($('#nearby_person_item').html());
		var personListDom = [];
		$.each(personList, function(i,v) {
			personListDom += template({
				photoUrl: v.b57,
				userId: v.b80,
				name: v.b52 || '未知',
				age: v.b1 || '未知',
				height: v.b33 || '未知',
				distance: v.b94 || '未知'
			})
		});
		$('.nearby_person_list').html(personListDom);
	}

	(function event() {
		$('.nearby_person_list').on('click','.person_item .head_img', function(e) {
			var userId = $(this).closest('.person_item').attr('data-id');
			globalState.setPersonId(userId);
			location.href = './personhome.html';
		});
		$('.nearby_greet_btn').click(function(e) {//一键打招呼
			console.log('一键打招呼')
		});
	})();

	exports.init = function() {
		$('.position').text(LS.getItem('address'));
		ajax.ajax({
			url: '/lp-bus-msc/f_108_16_1.service',
			type: 'post',
			loading: true,
			data: {
				a69: isTrue(LS.getItem('profileInfo'))?(JSON.parse(LS.getItem('profileInfo'))).b69:1,
				a95: 1,
				a9: isTrue(LS.getItem('profileInfo'))?(JSON.parse(LS.getItem('profileInfo'))).b9:'',
				a67: isTrue(LS.getItem('profileInfo'))?(JSON.parse(LS.getItem('profileInfo'))).b67:'',
				a40: isTrue(LS.getItem('lon'))?LS.getItem('lon'):'',
				a38: isTrue(LS.getItem('lat'))?LS.getItem('lat'):'',
				a117: ''
			},
			callback: function(res) {
				console.log(res);
				initNearByPerson(res.body);
			},
			err: function(err){
				console.log(err);
			}
		})	
	}
});