/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
    //全屏查看图片插件
    exports.showBigPic = function(data, picIndex, isBigBooeal) {
        // history.pushState(null,null,'detail.html');
        var isNeedBack = false;
        var thisUrl = window.location.href;
        // console.log(thisUrl);
        window.location=thisUrl + '#foo';
        isNeedBack = true;
        var screenWidth =window.screen.width;//屏宽
        var screenHeight =window.screen.height;//屏高
        var bigPicBoxDom = $('<div class="bigPicBox"></div>'); //最外层盒子
        var bigPicBoxDomStyle = [
            'width: 100%;',
            'height: 100%;',
            'background: #000000;',
            'position: fixed;',
            'z-index: 3333;',
            'left: 0;',
            'top: 0;',
            'overflow: hidden;',
            'font-size:0;'
        ];
        bigPicBoxDom.attr('style',bigPicBoxDomStyle.join('')); 
        var len = data.length;

        var bigPicCounter = $('<div class="bigPicCounter">' + (+picIndex+1) + '/' + len + '</div>'); //相册计数
        var bigPicCounterStyle = [
            'position: absolute;',
            'bottom: .4rem;',
            'left: .4rem;',
            'height: .5rem;',
            'line-height: .5rem;',
            'width: 1rem;',
            'background: #000000;',
            'text-align: center;',
            'color: #ffffff;',
            'opacity: 0.5;',
            'z-index:999;',
            'font-size: .36rem'
        ];
        bigPicCounter.attr('style', bigPicCounterStyle.join(''));

        var bigPicDel = $('<img class="delBtn" src="' + '/lovedate/assets/img/delBtn.png">')
        var bigPicDelStyle = [
            'z-index:9999;',
            'position:absolute;',
            'left: .2rem;',
            'top: .2rem;',
            'width: .48rem;',
            'height: .48rem;'
        ];
        bigPicDel.attr('style', bigPicDelStyle.join(''));

        var bigPicClose = $('<img class="closeBtn" src="' + '/lovedate/assets/img/closeBtn.png">')
        var bigPicCloseStyle = [
            'z-index:9999;',
            'position:absolute;',
            'right: .2rem;',
            'top: .2rem;',
            'width: .48rem;',
            'height: .48rem;'
        ];
        bigPicClose.attr('style', bigPicCloseStyle.join(''));

        var bigPicUl = $('<div class="bigPicLists"></div>');//相册加载盒子
        var bigPicUlStyle = [
            'width:' + len*screenWidth + 'px;',
            'margin: 0;',
            'padding: 0;',
            'position: absolute;',
            'left: -' + picIndex*screenWidth + 'px;',
            'top: 0;',
            'height: 100%;'
        ];
        bigPicUl.attr('style', bigPicUlStyle.join(''));
        for (var i = 0; i < len; i++) {
            var picItemDom = $('<img class="bigPicItem" data-index="' + i + '" src="' + data[i] + '">'); //相册中的每张图片
            if(isBigBooeal) {
                var picItemDomStyle = [
                    'float: left;',
                    'width: ' + screenWidth + 'px;',
                    'height: 100%;',
                ];
            } else {
                var picItemDomStyle = [
                    'float: left;',
                    'width: ' + screenWidth + 'px;',
                    'height: ' + screenWidth + 'px;',
                    'margin-top: ' + (screenHeight - screenWidth)/2 + 'px'
                ]
            }
          
            console.log(screenHeight);
            
            picItemDom.attr('style',picItemDomStyle.join(''));
            bigPicUl.append(picItemDom);
        }

        bigPicBoxDom.append(bigPicCounter);
        if(isBigBooeal){
            bigPicBoxDom.append(bigPicDel);
        }
        bigPicBoxDom.append(bigPicClose);
        bigPicBoxDom.append(bigPicUl)
        $('body').append(bigPicBoxDom); 

        var events = function() {
            var bigPicItemLen = $('.bigPicItem').length;
            var startX,endX;
            var nowLeft;
            $('.bigPicBox').on('touchstart','.bigPicItem', function(e) {
                // e.preventDefault();
                startX = e.originalEvent.targetTouches[0].pageX;
                nowLeft = $(this).closest('.bigPicLists').css('left');
            }).on('touchmove','.bigPicItem',function(e){
                e.preventDefault();
                var durX = e.originalEvent.targetTouches[0].pageX; 
                var moveX = durX - startX;
                $(this).closest('.bigPicLists').css('left', (moveX + parseInt(nowLeft)) + 'px');
            }).on('touchend','.bigPicItem',function(e) {
                // e.preventDefault();
                var index = $(this).attr('data-index');
                endX = e.originalEvent.changedTouches[0].pageX;
                if( (endX-startX) > 50 && index > 0) {
                    // $(this).closest('.bigPicLists').css('left', (-index + 1) * screenWidth + 'px');
                    $(this).closest('.bigPicLists').stop(false).animate({left: (-index + 1) * screenWidth + 'px'}, 300);
                    $('.bigPicCounter').text(((+index + 1)-1) + '/' + len);
                } else if ( (endX - startX) < -50 && index < bigPicItemLen-1) {
                    // console.log((-index - 1) * screenWidth);
                    // $(this).closest('.bigPicLists').css('left', (-index - 1) * screenWidth + 'px');
                    $(this).closest('.bigPicLists').stop(false).animate({left: (-index - 1) * screenWidth + 'px'}, 300);
                    $('.bigPicCounter').text(((+index + 1)+1) + '/' + len);
                } else {
                    // $(this).closest('.bigPicLists').css('left',(index * screenWidth) + 'px');
                    $(this).closest('.bigPicLists').stop(false).animate({left: -(index * screenWidth) + 'px'}, 300);
                }
            }).on('click','.bigPicItem',function(e) {
                isNeedBack = false;
                e.preventDefault();
                $(this).closest('.bigPicBox').remove();
                history.back();
            }).on('click','.closeBtn',function(e) {
                isNeedBack = false;
                e.preventDefault();
                $(this).closest('.bigPicBox').remove();
                history.back();
            });

            window.onpopstate = function() {
                if(isNeedBack) {
                    // history.back();
                    $('.bigPicBox').remove();
                }
            };

        };
        events();    
    };
});