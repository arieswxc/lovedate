/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	var ajax = require('ajax');
	
	$('.pay_item .pay_check').click(function() {
		$(this).hide();
		$(this).closest('.pay_item').find('.pay_check_img').show()		
		$(this).closest('.pay_item').siblings('.pay_item').find('.pay_check_img').hide()		
		$(this).closest('.pay_item').siblings('.pay_item').find('.pay_check').show()		
	});
		
   
});