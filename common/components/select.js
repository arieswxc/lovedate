/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	var SelectPI = function(config) {
		var config = config || {

		};

		var selectBg = document.getElementsClassName('select_bg')[0];
		var selectEl = document.getElementsClassName('select_box')[0];

		var confirmBtn = document.getElementsClassName('select_confirm')
		var cancelBtn = document.getElementsClassName('cancelBtn')



		var eventsFuc = {
			confirmEvent: function(){

			},
			cancelEvent: function() {
				selectBg.parentNode.removeChild(selectBg);
			}
		}
	}
	
});