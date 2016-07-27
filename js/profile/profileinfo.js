/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	$('.info_item .qq').click(function(e) {
		location.href = './profileinfo_qq.html';
	});
	$('.info_item .wechat').click(function(e) {
		location.href = './profileinfo_wechat.html';
	});
	$('.info_item .nickname').click(function() {
		location.href = './profileinfo_nickname.html';
	})
	$('.info_item .sex').click(function() {
		location.href = './profileinfo_sex.html';
	})
	
   	
});