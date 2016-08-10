/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	var globalState = require('../common/js/globalState');
	var ajax = require('ajax');
	// var sign = require('../common/js/wechat/sign.js');
	// console.log(sign('jsapi_ticket', 'http://example.com'));

	//普通登录
	function login() {
		ajax.ajax({
			url: '/lp-author-msc/f_120_10_1.service',
			type: 'post',
			login: true,
			data: {
				// a81: '10122289',
				// a56: 'iu523151'
				a81: '10132388',
				a56: 'iu324211'
			},
			callback: function(res) {
				console.log(res);
				if(res.code = 200) {
					console.log('login success');
					LS.setItem('userId', res.body.b80);
					LS.setItem('sessionId', res.body.b101);
					LS.setItem('sex', res.body.b69);
				}
			},
			err: function(err) {
				console.log(err)
			}
		});
	}

	login();

	function loginByWechat(openid, access_token) {
		ajax.ajax({
			url: '/lp-author-msc/f_132_15_1.service',
			type: 'post',
			login: true,
			data: {
				a162: 1,
				a167: openid,
				a169: access_token,
			},
			callback: function(res) {
				alert(res.body.b101);
				alert(res.body.b80);
				alert(res.body.b69);
				alert(res.body.b81);
				alert(res.body.b56);
				alert(res.body.b168);
				LS.setItem('userId', res.body.b80);
				LS.setItem('sessionId', res.body.b101);
				LS.setItem('sex', res.body.b69);
				LS.setItem('username', res.body.b81);
				LS.setItem('password', res.body.b56);
				location.href = './index.html'
				console.log(res);
				
			},
			err: function(err) {
				alert(err);
				console.log(err)
			}
		});
	}
	
				// LS.setItem('userId', '3f94f54b99ae22d5b29504924a16c8b9');
				// LS.setItem('sessionId', '103205601');
				// LS.setItem('sex', 0);
				// LS.setItem('username', '10132388');
				// LS.setItem('password', 'iu324211');




	$('.button').click(function() {
		globalState.setFooterIndex(0);
		location.href = './index.html';
	})

	//获取code
	function getCode() {
		var code = location.search.split('&')[0].split('=')[1];
		getAccess_token(code);
	}

	//根据code 获取 openid 和 access_token
	function getAccess_token(code) {
		var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxd5f871e36f664d36&secret=5f8d6276fffdf69304f901ded9569a39&code=' + code + '&grant_type=authorization_code';
		// alert(url);
		ajax.ajax2({
			url: url,
			type: 'get',
			suc: function(res) {
				alert('suc');
				alert(res.openid);
				alert(res.access_token);
				loginByWechat(res.openid,res.access_token);
			},
			err: function(err) {
				alert('err');
				alert(err);
			}
		})
	}

	// getCode();

	// function loginSocket() {
	// 	var socket = new WebSocket('ws://192.168.0.121:9066');
	// 	socket.onopen = function(event) {
	// 		console.log('open:  ' + socket.readyState);
	// 		var msg = {
	// 			"object": {
	// 			    password: '10122289',
	// 				userId: 'iu523151',
	// 				clientType: 3,
	// 				appId: 1999
	// 			},
	// 			"type": 2001
	// 		}

	// 		// socket.send(JSON.stringify(msg));
	// 	}
	// 	socket.onclose = function(event) {
	// 		console.log('socket close, statue' + socket.readyState);
	// 	}
	// 	socket.onmessage= function(data) {
	// 		console.log('socket message');
	// 		console.log(data);
	// 	}
	// 	socket.onerror = function(event) {
	// 		console.log('We got an error: ' + event.data);
	// 	}
	// }
	// loginSocket();


 //  	// 获取 jsapi_ticket
 //  	var access_token = "m4sbV2OjJhb8xlj7eIJjbf-2CI8Kwdozod5pgO9I_gemaCZATxReuGEiQiMSVMrvUdFXJnckHpAy1FpeSUcfDLEXiKInWaZYHGUUYDd3cDcYFXhABAKRJ"
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