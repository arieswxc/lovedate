/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	var indexProfile = require('./index_profile.js')

	//底部菜单
	var footer = {
		footerIndex: 0,
		setFooterIndex: function(value, isGlobalTrue) {
			this.footerIndex = value;
			if(isGlobalTrue){
				globalState.setFooterIndex(value);
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
			self.setFooterIndex(globalState.footerIndex, true);

			self.view.find('.footer_btn').click(function(e) {
				self.setFooterIndex($(this).index(), true);
			});
		}
	};
	function initPage(){
		footer.init();
	}

	initPage();
	

	

	$('.mesage_person_list').on('click','.person_item', function(e) {
		location.href = './message.html'
	});
   	
});