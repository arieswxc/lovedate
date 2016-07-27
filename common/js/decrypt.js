define(function(require,exports,module) {
	var CryptoJS = require('./lib/crypto-js');
	console.log(CryptoJS);
	exports.test = function(value) {
		function strToJson(str){
	     	var json = eval('(' + str + ')');
	     	return json;
		}


		var data = "message";
		var key = CryptoJS.enc.Latin1.parse('2015$!@aiyoutech');
		var iv = CryptoJS.enc.Latin1.parse('0123456789abcdef');
		var encrypted = CryptoJS.AES.encrypt(data,key,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});  
		var encrypted= value;
		var decrypted = CryptoJS.AES.decrypt(encrypted,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding}); 
		var result = decrypted.toString(CryptoJS.enc.Utf8);
		console.log(result)
		return strToJson(result);
	}
});