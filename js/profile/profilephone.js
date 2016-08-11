/* 
* @Author: wangxiaochen
* @Date:   2016-07-28
*/
define(function(require,exports,module) {
	var albumBig = require('albumBig');
	var doT = require('doT');
	var ajax = require('ajax');
	var globalState = require('globalState');
	var alert = require('alert');
	var page = {};

	
	page.init = function() {
		page.isSend = false; //控制是否发送
		page.isNextCanClick = false;
		page.timeFlag = 30;//定时器控制

		page.phoneNum = '';//手机号码
		page.msgCode = '';//验证码
		page.systemName = JSON.parse(LS.getItem('profileInfo')).b152;//系统用户号
		page.events();
	}
	page.events = function() {
		$('.send').click(function() {
			if(!page.isSend && page.judgePhone($('input.phone').val())) {
				console.log('suc')
				$('.send').addClass('send_again_btn').text('30s后重新发送').removeClass('send');
				$('input.phone').attr('readonly','readonly');
				page.phoneNum = $('input.phone').val();
				page.sendMessage(page.phoneNum);
				page.isNextCanClick = true;
				page.isSend = true;

				page.interval = setInterval(function() {
					page.timeFlag--;
					$('.send_again_btn').text(page.timeFlag + 's后重新发送');
					if(page.timeFlag==0) {
						clearInterval(page.interval);
						page.isSend = false;
						page.timeFlag = 30;
						$('.send_again_btn').removeClass('send_again_btn').text('重新发送').addClass('send');
						$('input.phone').removeAttr('readonly');
					}
				}, 1000);
			}
		});

		$('.next').click(function() {
			page.msgCode = $('input.varify_num').val();
			if(page.isNextCanClick){
				page.varifyCode(page.msgCode);
			}
		});
	}
	
	page.sendMessage = function(phoneNum) {
		ajax.ajax({
			url: '/lp-author-msc/f_118_10_1.service',
			type: 'post',
			data: {
				a81: phoneNum,
				a92: 3
			},
			callback: function(res) {
				console.log(res);
			},
			err: function(err) {
				console.log(err);
			}
		})
	};

	page.varifyCode = function(code) {
		ajax.ajax({
			url: '/lp-author-msc/f_120_14_1.service',
			type: 'post',
			data: {
				a81: page.phoneNum,
				a152: page.systemName,
				a93: code
			},
			callback: function(res) {
				alert.show(null,null,function() {
					history.back();
				});
				console.log(res);
			},
			err: function(err) {
				console.log(err);
			}
		})
	};

	page.judgePhone = function(phoneNum) {
		if(/^1[3,5,7,8]\d{9}$/g.test(phoneNum)){
			return true;
		}
		else{
		   return false;
		}
	}
	

	page.init();

});