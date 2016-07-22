/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	//存储页面状态
	var state = {
		footer_index: 0
	};


	$('.footer .footer_btn').click(function(e) {
		state.footer_index = $(this).index();
		dealFunc.footerIndexChange(state.footer_index);
	});

	$('.mesage_person_list').on('click','.person_item', function(e) {
		location.href = './message.html'
	});
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
	var dealFunc = {
		footerIndexChange: function(index) {
			[0,1,2,3].forEach(function(i,v) {
				if(index == i) {
					$('.footer_btn').eq(i).find('img').attr('src','../assets/img/footer_img_red_' + i + '.png');//图像变为红
					$('.footer_btn').eq(i).addClass('selected').siblings('.footer_btn').removeClass('selected');//字体变为红
					$('.page').eq(i).show().siblings('.page').hide();
				} else {
					$('.footer_btn').eq(i).find('img').attr('src','../assets/img/footer_img_grey_' + i + '.png');
				}
			})
		}
	}
   	
});