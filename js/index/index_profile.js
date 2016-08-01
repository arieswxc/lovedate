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
				// console.log(res);
				var result = res.body;
				LS.setItem('profile', JSON.stringify(res.body));
				fillProfileInfo(result);
			},
			err: function(err){
				console.log(err);
			}
		})
	}

	function fillProfileInfo(profileInfoObj) {
		console.log(profileInfoObj);
		$('.profile_header .head_img').attr('src', profileInfoObj.b112.b57);//头像
		$('.profile_header .name').text(profileInfoObj.b112.b52);//昵称
		if(profileInfoObj.b112.b75 == 1) {
			var nameStatus = '通过';
		} else if(result.b75 == 2) {
			var nameStatus = '待审核';
		} else {
			var nameStatus = '未通过';
		}
		$('.profile_header .status').text(nameStatus);//审核状态
		var albumsDom = '';
		$.each(profileInfoObj.b113, function(i,v) {
			albumsDom += '<li class="ablum_item"><img src="' + v.b60 +'"></li>';
		});
		$('.profile_album').prepend(albumsDom);//相册

		//会员特权
		if(profileInfoObj.b112.b144 == 1) {
			$('.classify_item.vip .time').show();
			$('.classify_item.vip .time span').text('到期时间');
		} else {
			$('.classify_item.vip .open_vip').show();
		}

		//手机认证
		if(profileInfoObj.b112.b202) {
			$('.classify_item.phone .value').show();
			$('.classify_item.phone .value span').text('手机号');
		} else {
			$('.classify_item.phone .to_auth').show();
		}

		$('.classify_item.loveme .value span').text(profileInfoObj.b112.b200?profileInfoObj.b112.b200:'0');//喜欢我的人

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
		$('.profile_classify .phone').click(function() {//手机认证
			location.href = './profile/profilephone.html'
		});
		$('.profile_classify .lover').click(function() {//我喜欢的人
			location.href = './profile/profilelover.html'
		})
		$('.profile_classify .loveme').click(function() {//喜欢我的人
			location.href = './profile/profileloveme.html'
		})
		$('.profile_classify .friend').click(function() {//择友条件
			location.href = './profile/profilefriendcondition.html'
		})
		$('.profile_header .info_box,.profile_header .head_img').click(function() {//进入个人资料
			location.href = './profile/profileinfo.html';
		});
		// 
		$('.profile_classify .visiter').click(function() {//最近访客
			location.href = './profile/profilevisiter.html'
		});
	}
	
   	
});