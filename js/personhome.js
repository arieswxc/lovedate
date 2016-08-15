/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	var doT = require('doT');
	var ajax = require('ajax');
	var albumBig = require('albumBig');
	var tools = require('tools');
	var globalState = require('../common/js/globalState');
	var tools = require('tools');
	var hint = require('hint');
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
				var templateData = res.body;
				// templateData.b112.b19 = tools.getEnumNameByCode('educationLevel', templateData.b19);//学历
				// templateData.b112.b62 = tools.getEnumNameByCode('profession_personal', templateData.b62);//职业
				// // templateData.b62 = tools.getEnumNameByCode('wage', templateData.b62);//月收入
				templateData.b112.b194 = tools.getEnumNameByCode('dating_purpose', templateData.b112.b194);//交友目的
				templateData.b112.b195 = tools.getEnumNameByCode('indulged', templateData.b112.b195);//恋爱观
				templateData.b112.b196 = tools.getEnumNameByCode('meet_place', templateData.b112.b196);//首次见面希望
				templateData.b112.b197 = tools.getEnumNameByCode('love_place', templateData.b112.b197);//爱爱的地点
				if(templateData.b114){
					templateData.b114.b19 = tools.getEnumNameByCode('educationLevel', templateData.b114.b19);//择友学历
					templateData.b114.b9 = tools.getCityIds(templateData.b114.b67,templateData.b114.b9);//市
					templateData.b114.b67 = tools.getProvinceNameById(templateData.b114.b67);//省
				}

				templateData.b112.b9 = tools.getCityIds(templateData.b112.b67,templateData.b112.b9);//市
				templateData.b112.b67 = tools.getProvinceNameById(templateData.b112.b67);//省

				console.log(templateData)
				$('body').append(template(templateData));
				var albums = [];
				$.each(res.body.b113,function(i,v) {
					albums.push(v.b58);
				});
				// console.log(albums)
   				events(personId,albums);
			},
			err: function(err){
				console.log(err);
			}
   		})
   	}

   	function events(personId,albums) {
   		$('.albums').on('click','img',function(e) {
   			var index = $(this).index();
   			albumBig.showBigPic(albums,index,false);
   		});

   		$('body').on('click','.connect_btn.love',function(e) { //关注好友
			var self = $(this);
			if(self.find('span').text() == '喜欢') {
				var url = '/lp-bus-msc/f_105_10_2.service';
				var btnType = 'add';
			} else {
				var url = '/lp-bus-msc/f_105_12_3.service';
				var btnType = 'delete';
			}
			ajax.ajax({
				url: url,
				type: 'post',
				data: {
					a77: personId	
				},
				callback: function(res) {
					console.log(res);
					if(btnType == 'add') {
						hint.show('已喜欢');
						self.find('span').text('已喜欢');
					} else {
						hint.show('已取消喜欢');
						self.find('span').text('喜欢');
					}
				},
				err: function(err){
					console.log(err);
				}
			});
		});
   	}

  

});