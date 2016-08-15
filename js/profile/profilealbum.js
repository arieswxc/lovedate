/* 
* @Author: wangxiaochen
* @Date:   2016-07-28
*/
define(function(require,exports,module) {
	var wx =require('wx');
	var wx_config =require('wx_config');
	var albumBig = require('albumBig');
	var doT = require('doT');
	var ajax = require('ajax');
	var hint = require('hint');
	var tools = require('tools');

	var albumsArr = [];
	function getAlbums() {
		ajax.ajax({
			url: '/lp-file-msc/f_111_11_1.service',
			type: 'POST',
			loading: true,
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
			// wx.chooseImage({
			//     count: 9, // 默认9
			//     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			//     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			//     success: function (res) {
			//         var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
			//     }
			// });
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
			loading: true,
			data: {
				a34: delId
			},
			callback:function(data){
				console.log(data);
				hint.show('照片删除成功');
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
				loading: true,
				processData: false,  // 告诉jQuery不要去处理发送的数据
				contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
				callback:function(data){
					hint.show('照片上传成功');
					console.log(data);
					uploadSucCallback();
				},
				err: function(err) {
					alert('err');
					console.log(err);
				}
			 });
	    };
	    reader.readAsDataURL(file.files[0]);
	};
});