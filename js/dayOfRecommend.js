/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	var doT = require('doT');
	var ajax = require('ajax');
	var globalState = require('../common/js/globalState');

	(function getRecommender() {
		ajax.ajax({
			url: '/lp-bus-msc/f_108_22_1.service',
			type: 'post',
			loading: true,
			data: {
				a69: JSON.parse(LS.getItem('profileInfo')).b69,
				// a40: '',
				// a38: '',
				// a67: '',
				// a9: ''
			},
			callback: function(res) {
				console.log(res);
				if(res.body) {
					var template = doT.template($('#recommender').html());
					var recommenderDom = '';
					$.each(res.body,function(i,v) {
						recommenderDom += template(v);
					});
					$('.person_lists').html(recommenderDom);
				} else {
					console.log('跳转');
					// location.href = './index.html';
				}
			}, 
			err: function(err){
				console.log(err);
			}
		})
	}) ();
	
   	
});