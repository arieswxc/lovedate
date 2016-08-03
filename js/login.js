/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	var ajax = require('ajax')
	ajax.ajax({
		url: '/lp-author-msc/f_120_10_1.service',
		type: 'post',
		data: {
			a81: '10122289',
			a56: 'iu523151',
		},
		callback: function(res) {
			console.log(res);
			if(res.code = 200) {
				console.log('login success');
				LS.setItem('userId', res.body.b80);
				LS.setItem('sessionId', res.body.b101);
				// LS.setItem('sex', res.body.b69);
				$('.button').click(function() {
					location.href = './index.html';
				})
			}
		},
		
	})
   	
});