/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	exports.init = function() {
		bindEvent();
	};
	
	function bindEvent() {
		$('.profile_album').click(function() {
			location.href = './profile/profilealbum.html'
		});
		$('.profile_classify .phone').click(function() {
			location.href = './profile/profilephone.html'
		});
		$('.profile_classify .lover').click(function() {
			location.href = './profile/profilelover.html'
		})
		$('.profile_classify .loveme').click(function() {
			location.href = './profile/profileloveme.html'
		})
		$('.profile_classify .friend').click(function() {
			location.href = './profile/profilefriendcondition.html'
		})
		$('.profile_header .info_box').click(function() {
			location.href = './profile/profileinfo.html'
		});
		$('.profile_header .head_img').click(function() {
			location.href = './profile/profilehome.html'
		});
		$('.profile_classify .visiter').click(function() {
			location.href = './profile/profilevisiter.html'
		});
	}
	
   	
});