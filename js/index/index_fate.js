/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	var doT = require('doT');
	var ajax = require('ajax');

	function initBanner(imgList) {
		// console.log(imgList)
		var template = doT.template($('#fate_header_item').html());
		var imgListDom = '';
		$.each(imgList,function(i,v) {
			imgListDom += template({photo_url:v.b57});
		});
		$('.fate_header').html(imgListDom);
	}

	function initPerson(personList) {
		// console.log(personList);
		var template = doT.template($('#fate_person_item').html());
		var personListDom = [];
		$.each(personList, function(i,v) {
			personListDom += template({
				photoUrl: v.b57,
				name: v.b52 || '未知',
				age: v.b1 || '未知',
				height: v.b33 || '未知',
				position: v.b67 || '未知',
				isLove: v.b116
			})
		});
		$('.fate_person_list').html(personListDom);
	}
	exports.init = function() {
		ajax.ajax({
			url: '/lp-bus-msc/f_111_17_1.service',
			type: 'post',
			loading: true,
			data: {
				p1: LS.getItem('sessionId'),
				p2: LS.getItem('userId'),
				a69: LS.getItem('sex'),
				// a95: 10,
				// a9: '',
				// a67: '',
				// a40: '',
				// a38: '',
				// a117: ''
			},
			callback: function(res) {
				console.log(res);
				initBanner(res.body.b179);
				initPerson(res.body.b180);
			},
			err: function(err){
				console.log(err);
			}
		})
	}
});