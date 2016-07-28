/* 
* @Author: wangxiaochen
* @Date:   2016-07-28
*/
define(function(require,exports,module) {
	// var albumBig = require('albumBig');
	// var doT = require('doT');
	// var ajax = require('ajax');
	var select = require('select');
	select.selectPI();
	function getCondition() {
		ajax.ajax({
			url: '/lp-bus-msc/f_110_10_1.service',
			type: 'POST',
			data: {
				// a78: '',
				// a95: '',
				// a110: ''
			},
			callback: function(res){
				console.log(res);
			},
			err: function(err) {
				console.log(err);
			}
		})
	}

	function setCondition() {
		ajax.ajax({
			url: '/lp-bus-msc/f_110_11_2.service',
			type: 'post',
			data: {
				a34: '',
				a9: '',
				a67: '',
				a1: '20-29',
				a85: '1000-2000',
				a19: '',
				a33: '170-185',
				a46: ''
			},
			callback: function(res){
				console.log(res)
			},
			err: function(err) {
				console.log(err);
			}
		});
	}
	// getCondition();
	// setCondition();
});