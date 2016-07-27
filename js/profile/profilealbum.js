/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	var albumBig = require('albumBig');
	$('.album .img_box img').click(function(e) {
		location.href = './profilealbum_one.html';
	});

	
   	$('.album_one .album_img').click(function() {
   		var data = ['../../assets/img/headImg.jpg','../../assets/img/headImg.jpg'];
   		albumBig.showBigPic(data,0,true);
   	});
});