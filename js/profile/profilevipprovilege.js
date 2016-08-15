/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	var ajax = require('ajax');
	var hint = require('hint');
	var doT = require('doT');
	

	function getPackageInfo() {
		ajax.ajax({
			url: '/lp-bus-msc/f_115_12_1.service',
			type: 'post',
			data: {
				a78: 1, //type: 1 套餐 2 单卖
				a188: 1, //source: 1 普通商品 2 活动商品
			},
			callback: function(res){
				console.log(res);
				var template = doT.template($('#vip_package').html());
				var packageDom  = '';
				$.each(res.body[0].b111, function(i,v) {
					packageDom += template(v);
				});
				$('.package').html(packageDom);
			},
			err: function(err) {
				console.log(err);
			}
		})
	}
	
	
	function events() {
		 $('.convert_btn').click(function() {
			var isVip = JSON.parse(LS.getItem('profileInfo')).b144;
			if(isVip == '2') {
				hint.show('您还没有参加活动，不能领取话费');
			} else {
				location.href = './convertbills.html';
			}
		});
			
		$('.package').on('click','.package_item .buy_btn',function() {
			var goodscode = $(this).closest('.package_item').attr('data-goodscode');
			var price = $(this).closest('.package_item').attr('data-price');
			LS.setItem('goodscode', goodscode);
			LS.setItem('price', price);
			location.href = '../pay.html'
			// hint.show('ceshi');
		});
	}
	getPackageInfo();
	events();
   	
});