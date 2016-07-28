/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	var albumBig = require('albumBig');
	var doT = require('doT');
	var ajax = require('ajax');
	function getProfileInfo() {
		ajax.ajax({
			url: '/lp-bus-msc/f_108_13_1.service',
			type: 'post',
			loading: true,
			data: {
				p1: LS.getItem('sessionId'),
				p2: LS.getItem('userId'),
				// a40: '',
				// a38: '',
				// a69: '',
				// a9: ''
			},
			callback: function(res) {
				var result = res.body;
				$('.profile_header .name').text(result.b52);
				var nameStatus;
				if(result.b75 == 1) {
					nameStatus = '通过';
				} else if(result.b75 == 2) {
					nameStatus = '待审核';
				} else {
					nameStatus = '未通过';
				}
				$('.profile_header .status').text(nameStatus);
				$('.profile_header .head_img').attr('src',result.b57);
				// $('.page_profile name').text();
				console.log(res);
			},
			err: function(err){
				console.log(err);
			}
		})
	}

	exports.init = function() {
		getProfileInfo();
		bindEvent();
	};
	
	function bindEvent() {
		$('.profile_album .addImg').click(function() {
			location.href = './profile/profilealbum.html'
		});
		$('.profile_album .ablum_item').click(function() {
			var data = ['../assets/img/headImg.jpg','../assets/img/headImg.jpg'];
   			albumBig.showBigPic(data,0,false);
		})
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