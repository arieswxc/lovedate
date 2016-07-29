/* 
* @Author: wangxiaochen
* @Date:   2016-07-28
*/
define(function(require,exports,module) {
	var globalState = LS.globalState ? JSON.parse(LS.globalState) : {
		footerIndex : 0
	}
	exports.footerIndex = globalState.footerIndex;
	exports.setFooterIndex = function(value) {
		globalState.footerIndex = value;
		LS.globalState = JSON.stringify(globalState);
	}

	exports.personId = globalState.personId;
	exports.setPersonId = function(id) {
		globalState.personId = id;
		LS.globalState = JSON.stringify(globalState);
	}
});