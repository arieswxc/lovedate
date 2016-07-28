/* 
* @Author: wangxiaochen
* @Date:   2016-07-28
*/
define(function(require,exports,module) {
	var albumBig = require('albumBig');
	var doT = require('doT');
	var ajax = require('ajax');
	if(debug) {
		var isVip = 2;
	}
	function getVisiterTotal() {
		$('.person_lists').hide();
		$('.no_permission').show();
		ajax.ajax({
			url: '/lp-bus-msc/f_109_12_1.service',
			type: 'POST',
			data: {
				// a95: '',
			},
			callback: function(res){
				console.log(res);
				$('.self_name').text();
				$('.recent_visiter').text(res.body.b15);
			},
			err: function(err) {
				console.log(err);
			}
		})
	}

	function getVisiter() {
		$('.person_lists').show();
		$('.no_permission').hide();
		ajax.ajax({
			url: '/lp-bus-msc/f_109_10_1.service',
			type: 'POST',
			data: {
				// a95: '',
			},
			callback: function(res){
				console.log(res);
				var template = doT.template($('#person_item').html());
				var personListDom = '';
				$.each(res.body,function(i,v) {
					personListDom += template({
						photoUrl:v.b57,
						name: v.b52,
						age: v.b1,
						height: v.b33,
						province: v.b67,
						city: v.b9,
						visitTime: v.b16,
						isVip: v.b144
					});
				});
				$('.person_lists').append(personListDom);
			},
			err: function(err) {
				console.log(err);
			}
		})
	}
	
	(function init() {
		if(isVip==1) {
			getVisiter();
		} else {
			getVisiterTotal();
			$('.member_btn').click(function(e) {
				isVip = 1;
				getVisiter();
			})
		}
	})();
	
});