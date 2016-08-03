/* 
* @Author: wangxiaochen
* @Date:   2016-07-28
*/
define(function(require,exports,module) {
	var albumBig = require('albumBig');
	var doT = require('doT');
	var ajax = require('ajax');
	var tools = require('tools');

	var albumsArr = [];
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
				var template = doT.template($('#album_item').html());
				$('.album').append(template(res.body));
				$.each(res.body,function(i,v) {
					albumsArr.push(v.b58);
				});
				events();
			},
			err: function(err) {
				console.log(err);
			}
		})
	}
	getAlbums();

	function events() {
		$('.album .img_box .album_img').click(function(e) {
			var index = $(this).attr('data-index');
	   		albumBig.showBigPic(albumsArr,index,true, function(indexPara) {
	   			console.log(indexPara);
	   			deleteAlbum(indexPara);
	   		});
		});

		//添加相册
		$('.album .img_box .add_btn').click(function(e) {
			$('input').trigger('click');
		});

		//保存相册
		$('input').on('change',function() {
			takephoto(this, function() {
				location.reload();
			});
		});
	}
	
	function deleteAlbum(index) {
		console.log(index);
		var delId = $('.album .img_box .album_img[data-index=' + index + ']').attr('data-id');
		ajax.ajax({
			url: '/lp-file-msc/f_111_12_3.service',
			type: "POST",
			data: {
				a34: delId
			},
			callback:function(data){
				console.log(data);
				location.reload();
			},
			err: function(err) {
				console.log(err);
			}
		})
		// $('.album .img_box .album_img[data-index=' + index + ']').closest('.img_box').remove();
	}

	function takephoto(file, uploadSucCallback){
		var reader = new FileReader();
		reader.onload = function(evt){
		 	var fd = new FormData(document.getElementById("headuploadForm"));
			ajax.ajax({
				uploadFormat: true,
				url: '/lp-file-msc/f_111_10_2.service',
				type: "POST",
				data: fd,
				processData: false,  // 告诉jQuery不要去处理发送的数据
				contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
				callback:function(data){
					console.log(data);
					uploadSucCallback();
				},
				err: function(err) {
					console.log(err);
				}
			 });
	    };
	    reader.readAsDataURL(file.files[0]);
	};
});