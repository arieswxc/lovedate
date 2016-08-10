/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
	var doT = require('doT');
	var ajax = require('ajax');
	var select = require('select');
	var select_address = require('select_address');
	var tools = require('tools');

	(function init() {
		getProfileInfo();
	})();


	function getProfileInfo() {
		ajax.ajax({
			url: '/lp-bus-msc/f_108_10_1.service',
			type: 'POST',
			loading: true,
			data: {
				// a78: '',
				// a95: '',
				// a110: ''
			},
			callback: function(res){
				console.log(res);
				LS.setItem('profileInfo', JSON.stringify(res.body));
				var template = doT.template($('#profile_info').html());
				var templateData = res.body;
				templateData.b19 = tools.getEnumNameByCode('educationLevel', templateData.b19);//学历
				templateData.b62 = tools.getEnumNameByCode('profession_personal', templateData.b62);//职业
				// templateData.b62 = tools.getEnumNameByCode('wage', templateData.b62);//月收入
				templateData.b194 = tools.getEnumNameByCode('dating_purpose', templateData.b194);//交友目的
				templateData.b195 = tools.getEnumNameByCode('indulged', templateData.b195);//恋爱观
				templateData.b196 = tools.getEnumNameByCode('meet_place', templateData.b196);//首次见面希望
				templateData.b197 = tools.getEnumNameByCode('love_place', templateData.b197);//爱爱的地点
				templateData.b9 = tools.getCityIds(templateData.b67,templateData.b9);//市
				templateData.b67 = tools.getProvinceNameById(templateData.b67);//省
				$('body').append(template(templateData));
				events();
			},
			err: function(err) {
				console.log(err);
			}
		});
	};

	function events() {
		$('.info_item .qq').click(function(e) {
			location.href = './profileinfo_qq.html';
		});
		$('.info_item .wechat').click(function(e) {
			location.href = './profileinfo_wechat.html';
		});
		$('.info_item .nickname').click(function() {
			location.href = './profileinfo_nickname.html';
		})
		$('.info_item .sex').click(function() {
			location.href = './profileinfo_sex.html';
		});
		$('.info_item .motto_value').click(function() {
			location.href = './profileinfo_motto.html';
		});

		$('body').on('click','.info_item .age',function(e) {
			var self = this;
			select.selectPI({
				title: '年龄',
				selectOptions: ageSection,
				confirmCallback: function(data) {
					updateInfo('b1',data);
					console.log(data);
					$(self).text(data);
				}
			});
		}).on('click','.info_item .height',function(e) {
			var self = this;
			select.selectPI({
				title: '身高',
				selectOptions: heigthSection,
				confirmCallback: function(data) {
					updateInfo('b33',data);
					console.log(data);
					$(self).text(data);
				}
			});
		}).on('click','.info_item .weight',function(e) {
			var self = this;
			select.selectPI({
				title: '体重',
				selectOptions: weightSection,
				confirmCallback: function(data) {
					updateInfo('b88',data);
					// console.log(data);
					$(self).text(data);
				}
			});
		}).on('click','.info_item .educationLevel',function(e) {
			selectByKey($(this), 'b19', 'educationLevel', '学历');
		}).on('click','.info_item .profession_personal',function(e) {
			selectByKey($(this), 'b62', 'profession_personal', '职业');
		}).on('click','.info_item .dating_purpose',function(e) {
			selectByKey($(this), 'b194', 'dating_purpose', '交友目的');
		}).on('click','.info_item .love_place',function(e) {
			selectByKey($(this), 'b197', 'love_place', '爱爱的地点');
		}).on('click','.info_item .meet_place',function(e) {
			selectByKey($(this), 'b196', 'meet_place', '首次见面希望');
		}).on('click','.info_item .indulged',function(e) {
			selectByKey($(this), 'b195', 'indulged', '恋爱观');
		}).on('click','.info_item .address',function(e) {
			var self = $(this);
			var addressEnumArr = require('../../common/json/provence.json');
			console.log(addressEnumArr)
			select_address.selectPI({
				title: '选择地区',
				selectOptions: addressEnumArr.body,
				confirmCallback: function(data){
					updateInfo(['b67','b9'],[data.provinceId,data.cityId]);
					self.text(data.provinceName + data.cityName);
				}
			})
		}).on('click','.info_item .wage',function(e) {
			var self = $(this);
			var wageEnumArr = tools.getEnum('wage');
			select.selectPI({
				title: '月收入',
				selectOptions: wageEnumArr,
				confirmCallback: function(data) {
					updateInfo(['a87','a86'],[data.value.split('-')[0],data.value.split('-')[1]]);
					self.text(data.value);
				}
			})
		});
	};

	function selectByKey(dom, key, enumName, title) {
		var enumArr = tools.getEnum(enumName);
		select.selectPI({
			title: title,
			selectOptions: enumArr,
			confirmCallback: function(data) {
				// console.log(data);
				updateInfo(key ,data.code);
				dom.text(data.value);
			}
		});
	}

	function updateInfo(key,value) {
		var profileInfo = JSON.parse(LS.getItem('profileInfo'));
		if(typeof key == 'object') {
			for(var i in key) {
				profileInfo[key[i]] = value[i]
			}
		} else {
			profileInfo[key] = value;
		}
		var postProfileInfo = {};
		for(var key in profileInfo) {
			var newKey = 'a' + key.substr(1);
			postProfileInfo[newKey] = profileInfo[key];
		}
		ajax.ajax({
			url: '/lp-bus-msc/f_108_11_2.service',
			type: 'POST',
			data: postProfileInfo,
			callback: function(res){
				console.log(res);
				LS.setItem('profileInfo', JSON.stringify(profileInfo));
			},
			err: function(err) {
				console.log(err);
			}
		})
	}
});