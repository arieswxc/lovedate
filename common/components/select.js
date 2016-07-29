/* 
* @Author: wangxiaochen
* @Date:   2016-07-25
*/
define(function(require,exports,module) {
	exports.selectPI = function(config) {
		var intance = {};
		intance.bg = document.createElement('div');
		intance.bg.className = 'select_bg';
		intance.el = document.createElement('div');
		intance.el.className = 'select_box';
		intance.el.innerHTML = [
			'<div class="select_title_box">',
				'<div class="select_cancel"><span>取消</span></div>',
				'<div class="select_title"></div>',
				'<div class="select_confirm"><span>完成</span></div>',
			'</div>',
			'<ul class="select_items">',
			'</ul>',
			'<div class="selected_flag"></div>'
		].join('');
		document.body.appendChild(intance.bg);
		document.body.appendChild(intance.el);
		// console.log(intance.el)
		var title = config.title || '默认标题';
		var optionArr = config.selectOptions;
		var confirmCallback = config.confirmCallback || function() {
			selectBg.parentNode.removeChild(selectBg);
			selectEl.parentNode.removeChild(selectEl);
		};
		var cancelCallback = config.cancelCallback || function() {
			selectBg.parentNode.removeChild(selectBg);
			selectEl.parentNode.removeChild(selectEl);
		};

		//选择插件dom
		var selectBg = document.getElementsByClassName('select_bg')[0];
		var selectEl = document.getElementsByClassName('select_box')[0];
		//确认按钮
		var confirmBtn = (document.getElementsByClassName('select_confirm')[0]).children[0];
		//取消按钮
		var cancelBtn = (document.getElementsByClassName('select_cancel')[0]).children[0];

		var selectItemArr = document.getElementsByClassName('select_item');
		//select_items
		var selectItems = document.getElementsByClassName('select_items')[0];
		
		//标题
		var selectTitle = document.getElementsByClassName('select_title')[0];


		var returnIndex = 0,//选择item的index
			itemHeight;//一个选项高度
		(function init(){
			selectBg.style.display = 'block';
			selectEl.style.display = 'block';
			selectTitle.innerHTML = title;//显示title
			dealSelectOption();
			itemHeight = document.getElementsByClassName('select_item')[0].offsetHeight;
			confirmAndCancelEvent();
			scrollDeal();
		})();
		
		
		//处理选择数据
		function dealSelectOption() {
			var selectItemDom = '';
			optionArr.push('');
			optionArr.push('');
			optionArr.push('');
			optionArr.unshift('');
			optionArr.unshift('');
			optionArr.unshift('');
			optionArr.forEach(function(i,v) {
				if(i != '') {
					var temIndex = v - 3;
				}
				// console.log(i + '  ' + v); 
				selectItemDom += '<li class="select_item" data-index=' + temIndex + '>' +  i + '</li>'
			})
			selectItems.innerHTML = selectItemDom;
		}

		//确认和取消事件
		function confirmAndCancelEvent() {
			cancelBtn.addEventListener('click',function(e) {
				cancelCallback();
				selectBg.style.display = 'none';
				selectEl.style.display = 'none';
				selectBg.parentNode.removeChild(selectBg);
				selectEl.parentNode.removeChild(selectEl);
				// confirmBtn.removeEventListener('click',function(){});
				// cancelBtn.removeEventListener('click',function(){});
			});
			confirmBtn.addEventListener('click',function(e) {
				// console.log(returnIndex);
				// console.log(selectItemArr[returnIndex + 3].innerHTML);
				var selectValue = selectItemArr[returnIndex + 3].innerHTML;
				confirmCallback(selectValue);
				selectBg.style.display = 'none';
				selectEl.style.display = 'none';
				selectBg.parentNode.removeChild(selectBg);
				selectEl.parentNode.removeChild(selectEl);
				// confirmBtn.removeEventListener('click',function(){});
				// cancelBtn.removeEventListener('click',function(){});
			})
		}

		function scrollDeal() {
			var isTouchEnd = false;
			var isScrollend = false;
			selectItems.addEventListener('touchstart',function(e) {
				isTouchEnd = false;
				isScrollend = false;
			});
			selectItems.addEventListener('touchend',function(e) {
				isTouchEnd = true;
				if(isScrollend) {
					var scrollMultiple = selectItems.scrollTop/itemHeight;
					selectItems.scrollTop = Math.round(scrollMultiple)*itemHeight;
					// isTouchEnd = false;
				}
			});

			function justifyIsScrollStop() {  
		        // 判断此刻到顶部的距离是否和1秒前的距离相等  
		        if(selectItems.scrollTop == topValue) { 
		        	// console.log('scrollend') 
		            clearInterval(interval);  
		            interval = null;  
		            var scrollMultiple = selectItems.scrollTop/itemHeight;
					console.log(Math.round(scrollMultiple));
					returnIndex = Math.round(scrollMultiple);
					selectItems.scrollTop = Math.round(scrollMultiple)*itemHeight;
		        }  
		    }

			var topValue = 0,// 上次滚动条到顶部的距离  
	        	interval = null;// 定时器  
		    selectItems.onscroll = function() {
		    	// console.log(interval + '  ' + isTouchEnd);
		        if(interval == null && isTouchEnd) {// 未发起时，启动定时器，1秒1执行  
		            interval = setInterval(function(){
		            	isScrollend = false;
		            	justifyIsScrollStop()
		            }, 1000); 
		            // console.log('start');
		            isInScroll = true;
		        } else {
		        	// console.log('not start');
		        	isScrollend = true;
		        }
		        topValue = selectItems.scrollTop;  
		    } 
		}
	}
});