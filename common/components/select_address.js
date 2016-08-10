/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	exports.selectPI = function(config) {
		var selectContain = {};
		
		selectContain.create = function(callback) {
			var bg = document.createElement('div');
			bg.className = 'select_bg';
			var box = document.createElement('div');
			box.className = 'select_box';
			box.innerHTML = [
				'<div class="select_title_box">',
					'<div class="select_cancel"><span>取消</span></div>',
					'<div class="select_title"></div>',
					'<div class="select_confirm"><span>完成</span></div>',
				'</div>',
				'<ul class="select_items select_items1">',
				'</ul>',
				'<ul class="select_items select_items2">',
				'</ul>',
				'<div class="selected_flag"></div>'
			].join('');
			document.body.appendChild(bg);
			document.body.appendChild(box);

			selectContain.setConstant();
			selectContain.setVariables();
		}
		
		//设置常量
		selectContain.setConstant = function() {
			//选择插件dom
			selectContain.selectBg = document.getElementsByClassName('select_bg')[0];
			selectContain.selectBox = document.getElementsByClassName('select_box')[0];
			selectContain.confirmBtn = (document.getElementsByClassName('select_confirm')[0]).children[0];//确认按钮
			selectContain.cancelBtn = (document.getElementsByClassName('select_cancel')[0]).children[0];//取消按钮
			selectContain.selectItemArr1 = document.getElementsByClassName('select_item1');
			selectContain.selectItemArr2 = document.getElementsByClassName('select_item2');
			selectContain.selectItems1 = document.getElementsByClassName('select_items1')[0];//select_items
			selectContain.selectItems2 = document.getElementsByClassName('select_items2')[0];//select_items
			selectContain.selectTitle = document.getElementsByClassName('select_title')[0];//标题
			selectContain.recievePara = {
				title: config.title || '默认标题',
				optionArr: config.selectOptions || [],
				confirmCallback: config.confirmCallback || function() {
					selectContain.remove();
				},
				cancelCallback: config.cancelCallback || function() {
					selectContain.remove();
				}
			};
		}
		//设置控制变量
		selectContain.setVariables = function() {
			selectContain.returnIndex1 = 0;
			selectContain.returnIndex2 = 0;
			selectContain.isScrollend1 = true; //判断滚动是否结束
			selectContain.isScrollend2 = true; //判断滚动是否结束
			selectContain.optionArr1 = [];
			selectContain.optionArr2 = [];
		}
		//处理选择数据
		selectContain.addItem1 = function() {
			var selectItemDom = '';
			var optionArrLoc = [];
			selectContain.recievePara.optionArr.forEach(function(value,index) {
				optionArrLoc.push(value);
			})
			optionArrLoc.push('');
			optionArrLoc.push('');
			optionArrLoc.push('');
			optionArrLoc.unshift('');
			optionArrLoc.unshift('');
			optionArrLoc.unshift('');
			optionArrLoc.forEach(function(value,index) {
				selectItemDom += '<li class="select_item select_item1" data-code="'+ value.provinceId + '" data-index=' + (index - 3) + '>' + (value.provinceName?value.provinceName:'') + '</li>'
			})
			selectContain.selectItems1.innerHTML = selectItemDom;
			selectContain.itemHeight = document.getElementsByClassName('select_item1')[4].offsetHeight;//一个选项高度
			selectContain.scrollDeal1();
		}
		//移除控件
		selectContain.remove = function() {
			if(selectContain.selectBg.parentNode) {
				selectContain.selectBg.parentNode.removeChild(selectContain.selectBg);
				selectContain.selectBox.parentNode.removeChild(selectContain.selectBox);
			}
		}

		selectContain.init = function() {
			selectContain.create();
			selectContain.selectBg.style.display = 'block';
			selectContain.selectBox.style.display = 'block';
			selectContain.selectTitle.innerHTML = selectContain.recievePara.title;//显示title
			selectContain.addItem1();
			selectContain.addItem2();
			selectContain.confirmAndCancelEvent();
			
		}
		//确认和取消事件
		selectContain.confirmAndCancelEvent = function() {
			var selectItemArr1 = selectContain.selectItemArr1;
			var selectItemArr2 = selectContain.selectItemArr2;
			selectContain.cancelBtn.addEventListener('click',function(e) {
				selectContain.recievePara.cancelCallback();
				selectContain.remove();
			});
			selectContain.confirmBtn.addEventListener('click',function(e) {
				if(selectContain.isScrollend1 && selectContain.isScrollend2) {
					console.log(selectContain.returnIndex1 + '---' + selectContain.returnIndex2);
					var selectValue = {
						provinceName: selectItemArr1[selectContain.returnIndex1 + 3].innerHTML,
						provinceId: selectItemArr1[selectContain.returnIndex1 + 3].getAttribute('data-code'),
						cityName: selectItemArr2[selectContain.returnIndex2 + 3].innerHTML,
						cityId: selectItemArr2[selectContain.returnIndex2 + 3].getAttribute('data-code')
					};
					console.log(selectValue);
					selectContain.recievePara.confirmCallback(selectValue);
					selectContain.remove();
				}
			});
		}
		
		selectContain.getCityArrByProvince =function(index){
			selectContain.optionArr2 = [];
			var provinceId = selectContain.selectItemArr1[index].getAttribute('data-code');
			selectContain.recievePara.optionArr.forEach(function(value,index) {
				if(value.provinceId == provinceId) {
					value.cityList.forEach(function(v,i) {
						selectContain.optionArr2.push(v);
					});
				}
			});
		}	

		selectContain.scrollDeal1 = function() {
			var isTouchEnd = false;
			var selectItems1 = selectContain.selectItems1;
			var itemHeight = selectContain.itemHeight;
			var topValue = 0;// 上次滚动条到顶部的距离  
	        var	interval = null;// 定时器  
			selectItems1.addEventListener('touchstart',function(e) {
				isTouchEnd = false;
				selectContain.isScrollend1 = false;
			});
			selectItems1.addEventListener('touchcancel',function(e) {
				isTouchEnd = true;
				if(selectContain.isScrollend1) {
					var scrollMultiple = selectItems1.scrollTop/itemHeight;
					selectItems1.scrollTop = Math.round(scrollMultiple)*itemHeight;
					// isTouchEnd = false;
				}
			});
			selectItems1.addEventListener('touchend',function(e) {
				isTouchEnd = true;
				if(selectContain.isScrollend1) {
					var scrollMultiple = selectItems1.scrollTop/itemHeight;
					selectItems1.scrollTop = Math.round(scrollMultiple)*itemHeight;
					// isTouchEnd = false;
				}
			});
			function justifyIsScrollStop() {  
		        // 判断此刻到顶部的距离是否和1秒前的距离相等  
		        if(selectItems1.scrollTop == topValue) { 
		        	console.log('scrollend') 
		            clearInterval(interval);  
		            interval = null;  
		            var scrollMultiple = selectItems1.scrollTop/itemHeight;
					console.log(Math.round(scrollMultiple));
					selectContain.returnIndex1 = Math.round(scrollMultiple);
					selectItems1.scrollTop = Math.round(scrollMultiple)*itemHeight;
					selectContain.isScrollend1 = true;
					// console.log(selectContain.getCityArrByProvince(selectContain.returnIndex1 + 3));
					selectContain.selectItems2.scrollTop = 0;
					selectContain.addItem2();
		        }  
		    }

			
		    selectItems1.onscroll = function() {
		    	// console.log(interval + '  ' + isTouchEnd);
		        if(interval == null && isTouchEnd) {// 未发起时，启动定时器，1秒1执行  
		            interval = setInterval(function(){
		            	selectContain.isScrollend1 = false;
		            	justifyIsScrollStop()
		            }, 300); 
		        } else {
		        	selectContain.isScrollend1 = true;
		        }
		        topValue = selectItems1.scrollTop;  
		    } 
		}

		selectContain.addItem2 = function(){
			selectContain.getCityArrByProvince(selectContain.returnIndex1 + 3)
			var optionArr2 = selectContain.optionArr2;
			selectContain.selectItems2.innerHTML = '';
			var selectItemDom2 = '';
			optionArr2.push('');
			optionArr2.push('');
			optionArr2.push('');
			optionArr2.unshift('');
			optionArr2.unshift('');
			optionArr2.unshift('');
			optionArr2.forEach(function(value,index) {
				selectItemDom2 += '<li class="select_item select_item2" data-code="'+ value.cityId + '" data-index=' + (index - 3) + '>' + (value.cityName?value.cityName:'') + '</li>'
			});
			selectContain.selectItems2.innerHTML = selectItemDom2;
			selectContain.scrollDeal2();
		}
		selectContain.scrollDeal2 = function() {
			var isTouchEnd = false;
			var selectItems2 = selectContain.selectItems2;
			var topValue = 0;// 上次滚动条到顶部的距离  
	        var	interval2 = null;// 定时器  
			var itemHeight = selectContain.itemHeight;
			selectItems2.addEventListener('touchstart',function(e) {
				isTouchEnd = false;
				selectContain.isScrollend2 = false;
			});
			selectItems2.addEventListener('touchcancel',function(e) {
				isTouchEnd = true;
				if(selectContain.isScrollend2) {
					var scrollMultiple = selectItems2.scrollTop/itemHeight;
					selectItems2.scrollTop = Math.round(scrollMultiple)*itemHeight;
					// isTouchEnd = false;
				}
			});
			selectItems2.addEventListener('touchend',function(e) {
				isTouchEnd = true;
				if(selectContain.isScrollend2) {
					var scrollMultiple = selectItems2.scrollTop/itemHeight;
					selectItems2.scrollTop = Math.round(scrollMultiple)*itemHeight;
					// isTouchEnd = false;
				}
			});

			function justifyIsScrollStop() {  
		        // 判断此刻到顶部的距离是否和1秒前的距离相等  
		        if(selectItems2.scrollTop == topValue) { 
		        	console.log('scrollend2') 
		            clearInterval(interval2);  
		            interval2 = null;  
		            var scrollMultiple = selectItems2.scrollTop/itemHeight;
					console.log(Math.round(scrollMultiple));
					selectContain.returnIndex2 = Math.round(scrollMultiple);
					selectItems2.scrollTop = Math.round(scrollMultiple)*itemHeight;
					selectContain.isScrollend2 = true;
		        }  
		    }

			
		    selectItems2.onscroll = function() {
		    	// console.log(interval2 + '  ' + isTouchEnd);
		        if(interval2 == null && isTouchEnd) {// 未发起时，启动定时器，1秒1执行  
		            interval2 = setInterval(function(){
		            	selectContain.isScrollend2 = false;
		            	justifyIsScrollStop()
		            }, 1000); 
		        } else {
		        	selectContain.isScrollend2 = true;
		        }
		        topValue = selectItems2.scrollTop;  
		    }
		}

		selectContain.init();
	}
});