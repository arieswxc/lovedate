/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	var globalState = require('../common/js/globalState');
	var ajax = require('ajax');
	// LS.clear();

	//普通登录
	function login() {
		ajax.ajax({
			url: '/lp-author-msc/f_120_10_1.service',
			type: 'post',
			login: true,
			data: {
				// a81: '10122289', //测试账号
				// a56: 'iu523151'
				a81: '10132894', //aries的账号
				a56: 'iu855887'
			},
			callback: function(res) {
				console.log(res);
				if(res.code = 200) {
					console.log('login success');
					LS.setItem('userId', res.body.b80);
					LS.setItem('sessionId', res.body.b101);
					LS.setItem('sex', res.body.b69);
					location.href = './index.html';
				}
			},
			err: function(err) {
				console.log(err)
			}
		});
	}

	//第三方登录
	var loginByWechat = {
	};

	// LS.setItem('sessionId', '3f94f54b99ae22d5b29504924a16c8b9');
	// LS.setItem('userId', '103205601');
	// LS.setItem('sex', 0);
	// LS.setItem('username', '10132388');
	// LS.setItem('password', 'iu324211');

	$('.button').click(function() {
		globalState.setFooterIndex(0);
		location.href = './index.html';
	})

	//获取code
	loginByWechat.getCode = function() {
		var code = location.search.split('&')[0].split('=')[1];
		loginByWechat.getAccess_tokenAndOpenid(code);
	}

	//根据code 获取 openid 和 access_token -- 微信接口
	loginByWechat.getAccess_tokenAndOpenid = function(code) {
		var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxd5f871e36f664d36&secret=5f8d6276fffdf69304f901ded9569a39&code=' + code + '&grant_type=authorization_code';
		// alert(url);
		ajax.ajax2({
			url: url,
			type: 'get',
			loading: true,
			suc: function(res) {
				// alert(res.openid);
				// alert(res.access_token);
				loginByWechat.getProfileInfoByOpenidAndToken(res.openid,res.access_token);
			},
			err: function(err) {
				alert(err);
			}
		})
	}

	//根据openid、access_token获取个人 sessionId, userId，性别，头像
	loginByWechat.getProfileInfoByOpenidAndToken = function(openid, access_token) {
		ajax.ajax({
			url: '/lp-author-msc/f_132_15_1.service',
			type: 'post',
			login: true,
			loading: true,
			data: {
				a162: 1,
				a167: openid,
				a169: access_token
			},
			callback: function(res) {
				// alert(res.body.b101);
				// alert(res.body.b80);
				// alert(res.body.b69);
				// alert(res.body.b81);
				// alert(res.body.b56);
				// alert(res.body.b168);
				// alert(res.body.b166); //头像
				LS.setItem('sessionId', res.body.b101);
				LS.setItem('userId', res.body.b80);
				LS.setItem('sex', res.body.b69);
				LS.setItem('username', res.body.b81);
				LS.setItem('password', res.body.b56);
				LS.setItem('headImg', res.body.b166);
				loginByWechat.saveProfileInfo();
			},
			err: function(err) {
				alert(err);
				console.log(err)
			}
		});
	};

	//保存信息
	loginByWechat.saveProfileInfo = function() {
		ajax.ajax({
			url: '/lp-bus-msc/f_108_11_2.service',
			type: 'post',
			loading: true,
			data: {
				a69: LS.getItem('sex'),
				a57: LS.getItem('headImg')
			},
			callback: function(res) {
				// alert('saveinfo suc');;
				location.href = './index.html';
			},
			err: function(err) {
				// alert('save err');
				location.href = './index.html';
				console.log(err)
			}
		})
	}

	loginByWechat.init = function() {
		loginByWechat.getCode();
		// loginByWechat.getProfileInfoByOpenidAndToken('fjsdf','fsdjlfjdslf');
	}

	login();
	// loginByWechat.init();

	function loginSocket() {
		var socket = new WebSocket('ws://192.168.0.121:9066');
		socket.onopen = function(event) {
			console.log('open:  ' + socket.readyState);
			var msg = {
				"object": {
				    password: '10132894',
					userId: 'iu855887',
					clientType: 3,
					appId: 1999
				},
				"type": 2001
			}

			// socket.send(JSON.stringify(msg));
		}
		socket.onclose = function(event) {
			console.log('socket close, statue' + socket.readyState);
		}
		socket.onmessage= function(data) {
			console.log('socket message');
			console.log(data);
		}
		socket.onerror = function(event) {
			console.log('We got an error: ' + event.data);
		}
	}
	// loginSocket();


  	// 获取 jsapi_ticket
  	var access_token = "MEH8H1LwgBnmbbq3GBglOo7m4AuMIWY6UQrkay8HqUmCGg7Dy2OTa9GMSEttSCkEkQ3N5cdX7HJdk9ZyHimV7sCjNLZi7m52ETD4ipvLg3Y01f9BpqAeS2gqKatz5LknJUDfAJAQBK"
	// ajax.ajax2({
	// 	url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+ access_token + '&type=jsapi',
	// 	type: 'get',
	// 	success: function(res) {
	// 		console.log(res);
	// 	},
	// 	error: function(err) {
	// 		console.log(err);
	// 	}
	// });



   	



});