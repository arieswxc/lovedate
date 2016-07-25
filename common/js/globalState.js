/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	var LS = localStorage;
	var globalState = LS.globalState ? JSON.parse(LS.globalState) : {
		footerIndex : 0
	}
	exports.footerIndex = globalState.footerIndex;
	exports.setFooterIndex = function(value) {
		globalState.footerIndex = value;
		LS.globalState = JSON.stringify(globalState);
	}
});