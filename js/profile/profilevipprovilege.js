/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	var ajax = require('ajax');
	
	
	$('.convert_btn').click(function() {
		location.href = './convertbills.html'
	});
		
	$('.buy_btn').click(function() {
		location.href = '../pay.html'
	});
   	
});