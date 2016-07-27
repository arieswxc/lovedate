/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	var indexFate = require('./index/index_fate.js')
	var indexProfile = require('./index/index_profile.js');
	var indexMessage = require('./index/index_message.js');
	var indexNearby = require('./index/index_nearby.js');
	var globalState = require('../common/js/globalState');

	//底部菜单
	var footer = {
		footerIndex: 0,
		setFooterIndex: function(value, isGlobalTrue) {
			this.footerIndex = value;
			if(isGlobalTrue){
				globalState.setFooterIndex(value);
			}
			switch(value) {
				case 0://缘分
					indexFate.init()
					break;
				case 1: //私信
					indexMessage.init();
					break;
				case 2: //附近
					indexNearby.init();
					break;
				case 3: //我
					indexProfile.init();
					break
			}
			[0,1,2,3].forEach(function(i,v) {
				if(value == i) {
					$('.footer_btn').eq(i).find('img').attr('src','../assets/img/footer_img_red_' + i + '.png');//图像变为红
					$('.footer_btn').eq(i).addClass('selected').siblings('.footer_btn').removeClass('selected');//字体变为红
					$('.page').eq(i).show().siblings('.page').hide();
				} else {
					$('.footer_btn').eq(i).find('img').attr('src','../assets/img/footer_img_grey_' + i + '.png');
				}
			});
		},
		view: $('.footer'),
		init: function() {
			var self = this;
			// console.log(globalState);
			self.setFooterIndex(globalState.footerIndex, true);

			self.view.find('.footer_btn').click(function(e) {
				self.setFooterIndex($(this).index(), true);
			});
		}
	};



	footer.init();
	

	

	$('.mesage_person_list').on('click','.person_item', function(e) {
		location.href = './message.html'
	});
   	
});