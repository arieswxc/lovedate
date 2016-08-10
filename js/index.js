/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	var ajax = require('ajax');
	var wx =require('wx');
	var wx_config =require('wx_config');
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
					var indexFate = require('./index/index_fate.js')
					indexFate.init()
					break;
				case 1: //私信
					var indexMessage = require('./index/index_message.js');
					indexMessage.init();
					break;
				case 2: //附近
					var indexNearby = require('./index/index_nearby.js');
					indexNearby.init();
					break;
				case 3: //我
					var indexProfile = require('./index/index_profile.js');
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
			initPerson();
			getIngAndLat();
			var self = this;
			// console.log(globalState);
			self.setFooterIndex(globalState.footerIndex, true);

			self.view.find('.footer_btn').click(function(e) {
				self.setFooterIndex($(this).index(), true);
			});
		}
	};

	//获取个人信息
	function initPerson() {
		ajax.ajax({
			url: '/lp-bus-msc/f_108_10_1.service',
			type: 'post',
			callback: function(res) {
				// console.log(res);
				if(res.body) {
					LS.setItem('profileInfo', JSON.stringify(res.body));
				}
			},
			err: function(err){
				console.log(err);
			}
		})
	};


	//根据微信接口获取地址信息
	function getIngAndLat() {
		wx_config.ready(function() {
			wx.getLocation({
			    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			    success: function (res) {
			        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
			        LS.setItem('lat', latitude);
			        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
			        LS.setItem('lon', longitude);
			        var speed = res.speed; // 速度，以米/每秒计
			        var accuracy = res.accuracy; // 位置精度
			        getAddressName();
			    }
			});

		});
	};
    // LS.setItem('lat', 30.292100);
    // LS.setItem('lon', 120.084300);

    //根据百度接口获取具体地址
	function getAddressName() {
		var ak = 'mpRW2KTrn1Qzzbysw77OtbMQG3LQ9m07';
		ajax.ajax2({
			url: 'http://api.map.baidu.com/geocoder/v2/?ak=' + ak + '&location=' + LS.getItem('lat') + ',' + LS.getItem('lon') + '&output=json&pois=1&pois=0',
			type: 'get',
			suc: function(res) {
				// alert(res)
				console.log(res);
				LS.setItem('addressDetail', res.result.formatted_address);
				LS.setItem('address', res.result.business);
			},
			err: function(err) {
				console.log(err);
			}
		})

	}

	footer.init();

});