/* 
* @Author: wangxiaochen
* @Date:   2016-07-28
*/
define(function(require,exports,module) {
	var albumBig = require('albumBig');
	var doT = require('doT');
	var ajax = require('ajax');
	var select = require('select');
	var select_address = require('select_address');
	var tools = require('tools');
	// console.log(JSON.parse(LS.getItem('profile')))

	var postData = {};
	function event() {
		$('.condition_item .age').click(function() {
			var self = this;
			select.selectPI({
				title: '身高',
				selectOptions: [
					'0-10',
					'10-20',
					'20-30',
					'30-40',
					'40-50',
					'50-60',
					'60-70',
					'70-80',
					'80-90',
					'90-100'
				],
				confirmCallback: function(data) {
					$(self).text(data);
					updateCondition('a1',data);
				}
			});
		});
		$('.condition_item .height').click(function() {
			var self = this;
			select.selectPI({
				title: '年龄',
				selectOptions: [
					'140-150',
					'150-160',
					'160-170',
					'170-175',
					'175-180',
					'180-185',
					'185-190',
					'190-200'
				],
				confirmCallback: function(data) {
					$(self).text(data);
					updateCondition('a33',data);
				}
			});
		});
		$('.condition_item .marriageStatus').click(function() {
			var self = this;
			var enumArr = tools.getEnum('marriageStatus');
			select.selectPI({
				title: '婚姻状况',
				selectOptions: enumArr,
				confirmCallback: function(data) {
					console.log(data)
					$(self).text(data.value);
					updateCondition('a46',data.code);
				}
			});
		});
		$('.condition_item .educationLevel').click(function() {
			var self = this;
			var enumArr = tools.getEnum('educationLevel');
			select.selectPI({
				title: '学历',
				selectOptions:enumArr,
				confirmCallback: function(data) {
					console.log(data);
					$(self).text(data.value);
					updateCondition('a19',data.code);
				}
			});
		});
		$('.condition_item .wage').click(function() {
			var self = this;
			select.selectPI({
				title: '月收入',
				selectOptions: [
					'3000-5000',
					'5000-8000',
					'8000-10000',
					'10000-20000',
					'20000-50000',
					'50000-100000'
				],
				confirmCallback: function(data) {
					$(self).text(data);
					updateCondition('a85',data);
				}
			});
		});
		$('.condition_item .address').click(function() {
			var self = $(this);
			var addressEnumArr = require('../../common/json/provence.json');
			// console.log(addressEnumArr)
			select_address.selectPI({
				title: '选择地区',
				selectOptions: addressEnumArr.body,
				confirmCallback: function(data){
					updateCondition(['a67','a9'],[data.provinceId,data.cityId]);
					self.text(data.provinceName + ' ' + data.cityName);
				}
			})
		});
	};
	
	function getCondition() {
		ajax.ajax({
			url: '/lp-bus-msc/f_110_10_1.service',
			type: 'POST',
			loading: true,
			data: {
				// a78: '',
				// a95: '',
				// a110: ''
			},
			callback: function(res){
				console.log(res);
				for(var key in res.body) {
					var newKey = 'a' + key.substr(1);
					postData[newKey] = res.body[key];
				}
				console.log(postData);
				$('.condition_item .age').text(postData.a1?postData.a1:'未填写');
				$('.condition_item .height').text(postData.a33?postData.a33:'未填写');
				$('.condition_item .marriageStatus').text(postData.a46?(tools.getEnumNameByCode('marriageStatus', postData.a46)):'未填写');

				$('.condition_item .educationLevel').text(postData.a19?(tools.getEnumNameByCode('educationLevel', postData.a19)):'未填写');
				$('.condition_item .address').text(postData.a9?(tools.getProvinceNameById(postData.a67) + ' ' + tools.getCityIds(postData.a67,postData.a9)):'未填写');
				$('.condition_item .wage').text(postData.a85?postData.a85:'未填写');
			},
			err: function(err) {
				console.log(err);
			}
		})
	}

	function updateCondition(key,value) {
		if(typeof key == 'object') {
			for(var i in key) {
				postData[key[i]] = value[i]
			}
		} else {
			postData[key] = value;
		}
		ajax.ajax({
			url: '/lp-bus-msc/f_110_11_2.service',
			type: 'post',
			loading: true,
			data: postData,
			callback: function(res){
				console.log(res)

			},
			err: function(err) {
				console.log(err);
			}
		});
	}

	(function init() {
		getCondition();
		event();
	}) ();
});