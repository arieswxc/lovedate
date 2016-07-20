/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	// var $ = require('jquery');

	$('.footer .footer_btn').click(function(e) {
		var self = this;
		var index = $(this).index();
		$(this).addClass('selected').siblings('.footer_btn').removeClass('selected');
		$(this).find('img').attr('src','../assets/img/footer_img_red_' + index + '.png');
		$('.page').eq(index).show().siblings('.page').hide();
		[0,1,2,3].forEach(function(i,v) {
			if(index != i) {
				$(self).siblings('.footer_btn').eq(i).find('img').attr('src','../assets/img/footer_img_grey_' + i + '.png');
			}
		})
	});
   	
});