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
				'<ul class="select_items">',
				'</ul>',
				'<div class="selected_flag"></div>'
			].join('');
			document.body.appendChild(bg);
			document.body.appendChild(box);

			selectContain.setConstant();
			selectContain.setVariables();
		}
		//移除控件
		selectContain.remove = function() {
			if(selectContain.selectBg.parentNode) {
				selectContain.selectBg.parentNode.removeChild(selectContain.selectBg);
				selectContain.selectBox.parentNode.removeChild(selectContain.selectBox);
			}
		}
		//设置常量
		selectContain.setConstant = function() {
			//选择插件dom
			selectContain.selectBg = document.getElementsByClassName('select_bg')[0];
			selectContain.selectBox = document.getElementsByClassName('select_box')[0];
			selectContain.confirmBtn = (document.getElementsByClassName('select_confirm')[0]).children[0];//确认按钮
			selectContain.cancelBtn = (document.getElementsByClassName('select_cancel')[0]).children[0];//取消按钮
			selectContain.selectItemArr = document.getElementsByClassName('select_item');
			selectContain.selectItems = document.getElementsByClassName('select_items')[0];//select_items
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
			selectContain.returnIndex = 0;
			selectContain.paraType = 0; //判断参数数组类型 0 string 1 obj
			selectContain.isScrollend = true; //判断滚动是否结束
		}
		//处理选择数据
		selectContain.dealSelectOption = function() {
			var selectItemDom = '';
			var optionArrLoc = selectContain.recievePara.optionArr;
			if(typeof optionArrLoc[0] == 'object'){
				selectContain.paraType = 1;
			} else {
				selectContain.paraType = 0;
			}
			optionArrLoc.push('');
			optionArrLoc.push('');
			optionArrLoc.push('');
			optionArrLoc.unshift('');
			optionArrLoc.unshift('');
			optionArrLoc.unshift('');
			optionArrLoc.forEach(function(value,index) {
				var temIndex = index - 3;
				if(selectContain.paraType == 1) {
					selectItemDom += '<li class="select_item" data-code="'+ value.code + '" data-index=' + temIndex + '>' +  (value.value?value.value:"") + '</li>'
				} else {
					selectItemDom += '<li class="select_item" data-index=' + temIndex + '>' +  value + '</li>'
				}
				
			})
			selectContain.selectItems.innerHTML = selectItemDom;
			selectContain.itemHeight = document.getElementsByClassName('select_item')[4].offsetHeight;//一个选项高度
		}
		

		selectContain.init = function() {
			selectContain.create();
			selectContain.selectBg.style.display = 'block';
			selectContain.selectBox.style.display = 'block';
			selectContain.selectTitle.innerHTML = selectContain.recievePara.title;//显示title
			selectContain.dealSelectOption();
			selectContain.confirmAndCancelEvent();
			selectContain.scrollDeal();
		}
		//确认和取消事件
		selectContain.confirmAndCancelEvent = function() {
			var selectItemArr = selectContain.selectItemArr;
			selectContain.cancelBtn.addEventListener('click',function(e) {
				selectContain.recievePara.cancelCallback();
				selectContain.remove();
			});
			selectContain.confirmBtn.addEventListener('click',function(e) {
				if(selectContain.isScrollend) {
					console.log(selectContain.returnIndex);
					if(selectContain.paraType == 1) {
						var selectValue = {
							value: selectItemArr[selectContain.returnIndex + 3].innerHTML,
							code: selectItemArr[selectContain.returnIndex +3].getAttribute('data-code')
						};
					} else {
						var selectValue = selectItemArr[selectContain.returnIndex + 3].innerHTML;
					} 
					selectContain.recievePara.confirmCallback(selectValue);
					selectContain.remove();
				}
			});
		}
		

		selectContain.scrollDeal = function() {
			var isTouchEnd = false;
			var selectItems = selectContain.selectItems;
			var itemHeight = selectContain.itemHeight;
			selectItems.addEventListener('touchstart',function(e) {
				isTouchEnd = false;
				selectContain.isScrollend = false;
				// e.preventDefault()
			});
			selectItems.addEventListener('touchcancel',function(e) {
				// selectContain.selectTitle.innerHTML = 'cancel';
				isTouchEnd = true;
				if(selectContain.isScrollend) {
					var scrollMultiple = selectItems.scrollTop/itemHeight;
					selectItems.scrollTop = Math.round(scrollMultiple)*itemHeight;
					// isTouchEnd = false;
				}
			});
			selectItems.addEventListener('touchend',function(e) {
				// alert('touchend' + selectContain.isScrollend)
				// selectContain.selectTitle.innerHTML = 'end';
				isTouchEnd = true;
				if(selectContain.isScrollend) {
					var scrollMultiple = selectItems.scrollTop/itemHeight;
					selectItems.scrollTop = Math.round(scrollMultiple)*itemHeight;
					// isTouchEnd = false;
				}
			});

			function justifyIsScrollStop() {  
		        // 判断此刻到顶部的距离是否和1秒前的距离相等  
		        if(selectItems.scrollTop == topValue) { 
		            clearInterval(interval);  
		            interval = null;  
		            var scrollMultiple = selectItems.scrollTop/itemHeight;
					console.log(Math.round(scrollMultiple));
					selectContain.returnIndex = Math.round(scrollMultiple);
					selectItems.scrollTop = Math.round(scrollMultiple)*itemHeight;
					selectContain.isScrollend = true;
		        }  
		    }

			var topValue = 0,// 上次滚动条到顶部的距离  
	        	interval = null;// 定时器  
		    selectItems.onscroll = function() {
		    	// console.log(interval + '  ' + isTouchEnd);
		        if(interval == null && isTouchEnd) {// 未发起时，启动定时器，1秒1执行  
		            interval = setInterval(function(){
		            	selectContain.isScrollend = false;
		            	justifyIsScrollStop()
		            }, 1000); 
		            isInScroll = true;
		        } else {
		        	selectContain.isScrollend = true;
		        }
		        topValue = selectItems.scrollTop;  
		    } 
		}

		selectContain.init();
	}
});