/* 
* @Author: wangxiaochen
* @Date:   2016-07-28
*/
define(function(require,exports,module) {
	var albumBig = require('albumBig');
	var doT = require('doT');
	var ajax = require('ajax');
	if(debug) {
	}


	function getLover() {
		ajax.ajax({
			url: '/lp-bus-msc/f_105_11_1.service',
			type: 'POST',
			data: {
				a78: 2,
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
						personListDom += template({
							photoUrl:v.b57,
							name: v.b52,
							age: v.b1,
							height: v.b33,
							province: v.b67,
							city: v.b9,
							isVip: v.b144
						});
					});
					$('.person_lists').append(personListDom);
				} else {
					$('.no_lover').show();
					$('.person_lists').hide();
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