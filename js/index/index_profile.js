/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	var albumBig = require('albumBig');
	var doT = require('doT');
	var ajax = require('ajax');
	var albumsArr = [];
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
				console.log(res);
				var result = res.body;
				if(isTrue(res.body)) {
					LS.setItem('profileInfo', JSON.stringify(res.body.b112));
					fillProfileInfo(result);
				} else {
					$('.profile_header .head_img').attr('src', LS.getItem('headImg'));//头像
					$('.classify_item.vip .open_vip').show();
					$('.classify_item.phone .to_auth').show();
					$('.classify_item.loveme .value span').text('0');
				}
				// bindEvent();
			},
			err: function(err){
				console.log(err);
			}
		})
	}

	function fillProfileInfo(profileInfoObj) {
		// console.log(profileInfoObj);
		$('.profile_header .head_img').attr('src', profileInfoObj.b112.b57);//头像
		$('.profile_header .name').text(profileInfoObj.b112.b52);//昵称
		if(profileInfoObj.b112.b75 == 1) {
			var nameStatus = '通过';
		} else if(profileInfoObj.b112.b75 == 2) {
			var nameStatus = '待审核';
		} else {
			var nameStatus = '未通过';
		}
		$('.profile_header .status').text(nameStatus);//审核状态

		var albumsDom = '';
		// $('.profile_album .ablum_list').html('<li class="addImg"><img src="../assets/img/add_img.png"></li>');
		var albumsLen = profileInfoObj.b113.length;
		albumsArr = [];
		for(var i=0; i < Math.min(albumsLen,3); i++) {
			albumsDom += '<li class="ablum_item"><img src="' + profileInfoObj.b113[i].b60 +'"></li>';
			albumsArr.push(profileInfoObj.b113[i].b58);
		}
		$('.profile_album .ablum_list').append(albumsDom);//相册

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
			$('.classify_item.phone .value span').text(profileInfoObj.b112.b81);
		} else {
			$('.classify_item.phone .to_auth').show();
		}

		$('.classify_item.loveme .value span').text(profileInfoObj.b112.b200?profileInfoObj.b112.b200:'0');//喜欢我的人
	}

	function getVisiterNum() {
		ajax.ajax({
			url: '/lp-bus-msc/f_109_12_1.service',
			type: 'post',
			loading: true,
			callback: function(res) {
				// console.log(res);
				$('.classify_item.visiter .value span').text(res.body.b15);
			},
			err: function(err){
				console.log(err);
			}
		})
	}
	exports.init = function() {
		getProfileInfo();
		getVisiterNum();
		bindEvent();
	};
	
	function bindEvent() {
		$('.profile_album .ablum_list').html('<li class="addImg"><img src="../assets/img/add_img.png"></li>');
		$('.profile_album .addImg').click(function() {
			location.href = './profile/profilealbum.html';
		});
		
		$('.profile_album').on('click','.ablum_item',function() {
			console.log($(this).index())
			console.log(albumsArr);
   			albumBig.showBigPic(albumsArr,$(this).index()-1,false);
		});
		$('.profile_classify .vip').click(function() {//手机认证
			location.href = './profile/profilevipprovilege.html'
		});
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
		$('.profile_classify .visiter').click(function() {//最近访客
			location.href = './profile/profilevisiter.html'
		});
	}
	
   	
});