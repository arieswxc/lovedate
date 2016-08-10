/* 
* @Author: wangxiaochen
* @Date:   2016-07-28
*/
define(function(require,exports,module) {
	var albumBig = require('albumBig');
	var doT = require('doT');
	var ajax = require('ajax');
	var tools = require('tools');
	var globalState = require('globalState');
	function getLover() {
		ajax.ajax({
			url: '/lp-bus-msc/f_105_11_1.service',
			type: 'POST',
			loading: true,
			data: {
				a78: 1,
				// a95: '',
			},
			callback: function(res){
				console.log(res);
				if(res.body.length > 0) {
					$('.no_lover').hide();
					$('.person_lists').show();
					var template = doT.template($('#person_item').html());
					var personListDom = '';
					$.each(res.body,function(i,v) {
						if(v.b80) {
							personListDom += template({
								photoUrl:v.b57,
								name: v.b52,
								age: v.b1,
								height: v.b33,
								province: tools.getProvinceNameById(v.b67),
								city: tools.getCityIds(v.b67,v.b9),
								isVip: v.b144,
								personId: v.b80
							});
						}
					});
					$('.person_lists').append(personListDom);

					$('.person_item .head_img').click(function(e) {
						var userId = $(this).attr('data-id');
						globalState.setPersonId(userId);
						location.href = '../personhome.html';
					})
				} else {
					$('.no_lover').show();
					$('.person_lists').hide();
					$('.no_lover .to_btn').click(function() {
						globalState.setFooterIndex(0);
						location.href = '../index.html';
					});
				}
				
			},
			err: function(err) {
				console.log(err);
			}
		})
	}
	
	(function init() {
		getLover();
	})();
	
});