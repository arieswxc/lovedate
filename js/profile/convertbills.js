/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	var ajax = require('ajax');
	
	$('.convert_btn').click(function() {
		if(judgePone($('.phone_input').val())) {
			$('.convert').hide();
			$('.convert_late').show();
		}
		
	});
		
	
   	function judgePone(phoneNum) {
		if(/^1[3,5,7,8]\d{9}$/g.test(phoneNum)){
			return true;
		}
		else{
		   return false;
		}
	}
});