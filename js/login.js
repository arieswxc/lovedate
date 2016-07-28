/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	// var tools = require('tools');
	var ajax = require('ajax')
	// var teststr = "F6KtKD7WDpgYryPx4WdOEVX/2W0XjwzqW5yZD1hm4ClmoPx0DPB56xB0g1EAKxJsKpIErFPXGHup"+
	// 	"Kav/e96/aODkG8HrC44EXPtksjunFXk6+x7SEqQeuLpDNatqJyPVuKURg6gM/UVxj7+FYOAsr9xK"+
	// 	"P//YQNS2rTVvFR7tG/W2txqkF5i6LWVzqBFQX8i7vAbSAP/OK6lpyBK+8fV5KeaMqaKrM/nsERVc"+
	// 	"uz3sb9Q2x/yFBY/4NX9bDI5jsUfYIz+ZxTxxC6ldC4MR87UQp5hizbycJPIbghABjKtU8nbsIwjs"+
	// 	"9rRp3rCmne7kD8zMB0RInTVEJQtLPu/bN7FvC26X3e6CGKv32NYOejZzhuhxmmo1884uTuI5cxcg"+
	// 	"QbA3glO1GXCqJ/e7aR3AgIWw/mROB5cQFWqxOkZax23RtBEqfd0JGpLpSnzlGfMjdeoU/Xw9xW4m"+
	// 	"OOmBI9qevnjFAqbed2ZvOgL7IsJTRkZ8uN+S9ajvbVkdCsP4C0NCmmBM6rMd8i5JHadw0sDMNbhk"+
	// 	"vZJ+HsCZQcTGfJFILphEB/9iZcjoHJGZG9C6Vym0c5jfUyRn6kdkdvNqqy/VGYJ+IP5i47r8BrXq"+
	// 	"zDa7Xx/suWzd5C6s38kvuBGb1S9xZ7KR6rnKYKjV0Xcj7FI5EH6oixxgst0OXMB/Z/sx/X8SovnZ"+
	// 	"Ird6tMs3j+4PKsEP/ms5E5ukCUWla+Jm88ieyAWch1gDo3OTQ1LLXtILgpSHsiyHg7c6cQz0wgV4"+
	// 	"h193TdoUvuuhU/voVW/3UykSchIHRaRnDwK35emun55VHpzVRGSj/kfxVIf60Fxe0RlT/DcqThGX"+
	// 	"7CoXjUuu0pIodsBMZJlE7y6QD6iOyO9rc0KiW9Nd70rQKb/K0OcrFNsmYLwtp0plFCdayW3UZZ8u"+
	// 	"EZ/Es5OiyAtdPhBNQCNlZJhPjs+n26G2L+xm2aEAQL+uJyM5";
	// var teststr = "o4XIbS+lgJaqRCSXrxiERxnto0X/ui8gP5FBBJFdxx1YRciOMHEfGf6wmJWGcAXOR8Pu2koUetb60V3fKUtReQ==";

	// console.log(transResult(teststr))



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
				LS.setItem('sex', res.body.b69);
				location.href = './index.html';
			}
			// console.log(err.responseText);
			// console.log(transResult(err.responseText));
			// console.log(transResult(err));
		},
		
	})
   	
});