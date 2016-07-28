/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	exports.selectPI = function(config) {
		var config = config || {

		};

		//选择插件dom
		var selectBg = document.getElementsByClassName('select_bg')[0];
		var selectEl = document.getElementsByClassName('select_box')[0];
		//确认按钮
		var confirmBtn = (document.getElementsByClassName('select_confirm')[0]).children[0];
		//取消按钮
		var cancelBtn = (document.getElementsByClassName('select_cancel')[0]).children[0];
		//select_items
		var selectItems = document.getElementsByClassName('select_items')[0];

		cancelBtn.addEventListener('click',function(e) {
			eventsFuc.cancelEvent();
		});
		confirmBtn.addEventListener('click',function(e) {
			eventsFuc.confirmEvent();
		})

		selectItems.addEventListener('touchstart',function(e) {
			console.log(e)
			console.log(e.clientX)
		})

		var eventsFuc = {
			confirmEvent: function(){
				selectBg.parentNode.removeChild(selectBg);
				selectEl.parentNode.removeChild(selectEl);
			},
			cancelEvent: function() {
				selectBg.parentNode.removeChild(selectBg);
				selectEl.parentNode.removeChild(selectEl);
			}
		}
	}

	
});