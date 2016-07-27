/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	exports.init = function() {
		$('.mesage_person_list').on('click','.person_item', function(e) {
			location.href = './message.html'
		});
	}
});