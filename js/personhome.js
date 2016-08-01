/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	var doT = require('doT');
	var ajax = require('ajax');
	var albumBig = require('albumBig');
	var globalState = require('../common/js/globalState');
   	(function init(personId){
   		getPersonInfo(personId);

   	}) (globalState.personId);

   	function getPersonInfo(personId) {
   		ajax.ajax({
   			url: '/lp-bus-msc/f_108_13_1.service',
			type: 'post',
			loading: true,
			personId: personId,
			data: {
				// a9: '',
				// a67: '',
				// a40: '',
				// a38: '',
			},
			callback: function(res) {
				console.log(res);
				var template = doT.template($('#person_into').html());
				$('body').append(template(res.body));
				var albums = [];
				$.each(res.body.b113,function(i,v) {
					// console.log(i + '  ' + v);
					albums.push(v.b58);
				});
				// console.log(albums)
   				lookAlbum(albums);
			},
			err: function(err){
				console.log(err);
			}
   		})
   	}

   	function lookAlbum(albums) {
   		$('.albums').on('click','img',function(e) {
   			var index = $(this).index();
   			albumBig.showBigPic(albums,index,false);
   		});
   	}

});