/* 
* @Author: wangxiaochen
* @Date:   2016-07-28
*/
define(function(require,exports,module) {
	var albumBig = require('albumBig');
	var doT = require('doT');
	var ajax = require('ajax');

	function getAlbums() {
		ajax.ajax({
			url: '/lp-file-msc/f_111_11_1.service',
			type: 'POST',
			data: {
				// a78: '',
				// a95: '',
				// a110: ''
			},
			callback: function(res){
				console.log(res);
			},
			err: function(err) {
				console.log(err);
			}
		})
	}
	getAlbums();

	$('.album .img_box img').click(function(e) {
		var data = ['../../assets/img/headImg.jpg','../../assets/img/headImg.jpg'];
   		albumBig.showBigPic(data,0,true);
		// location.href = './profilealbum_one.html';
	});

   	$('.album_one .album_img').click(function() {
   		var data = ['../../assets/img/headImg.jpg','../../assets/img/headImg.jpg'];
   		albumBig.showBigPic(data,0,false);
   	});
});