/* 
* @Author: wangxiaochen
* @Date:   2016-04-28
*/
define(function(require,exports,module) {
    //根据参数名称获取enum数组
    var enumJson = require('../../common/json/enum.json');
    var provinceJson = require('../../common/json/provence.json');
        // console.log(enumJson);
    exports.getEnum = function(key) {
        var returnEnumArr = [];
        enumJson.body.forEach(function(value,index) {
            // console.log(index + '   ' + value);
            if(key == value.b20) {
                value.b98.forEach(function(v,i) {
                    returnEnumArr.push({
                        code: v.b22,
                        value: v.b21
                    });
                });
            }
        });
        return returnEnumArr;
    };

    //根据code获取name
    exports.getEnumNameByCode = function(key, code) {
        var returnValue = '';
        enumJson.body.forEach(function(value,index) {
            if(key == value.b20) {
                value.b98.forEach(function(v,i) {
                    if(code == v.b22) {
                        returnValue = v.b21;
                    }
                });
            }
        });
        return returnValue;
    };

    exports.getProvinceNameById = function(id) {
        var returnName = '';
        console.log(provinceJson)
        provinceJson.body.forEach(function(value,index) {
            if(id == value.provinceId) {
                returnName = value.provinceName;
            }
        });
        return returnName;
    };

    exports.getCityIds = function(pId,cId) {
        var returnName = '';
        provinceJson.body.forEach(function(value,index) {
            if(pId == value.provinceId) {
                (value.cityList).forEach(function(v,i) {
                    if(cId == v.cityId) {
                        returnName = v.cityName;
                    }
                });
            }
        });
        return returnName;
    }

    exports.loadPage = function(url) {
        window.location.href = url;
    };

    //获取手机系统
    exports.getSystem =  function(us){
        us = us.toLowerCase();
        if(us.indexOf("android") != -1 || us.indexOf("linux") != -1){
            return "Android";
        }
        if(us.indexOf("safari") != -1){
            if(us.indexOf("windows") != -1){
                return "pc";
            }
            else{
                if(us.indexOf("mac") != -1){
                    return "ios";
                }
                else{
                    return "Android";
                }
            }
        }
        if(us.indexOf("iphone") != -1 || us.indexOf("ipad") != -1 || us.indexOf("ios") != -1){
            if(us.indexOf("mac") != -1){
                return "ios";
            }
        }
        if(us.indexOf("iuc") != -1 && us.indexOf("mac") != -1){
            return "ios";
        }
        return "pc";
    };

    exports.isqqOrucBrowser = function() {
        var bLevel = {
            qq: {forbid: 0, lower: 1, higher: 2},
            uc: {forbid: 0, allow: 1}
        };
        var UA = navigator.appVersion;
        var isqqBrowser = (UA.split("MQQBrowser/").length > 1) ? bLevel.qq.higher : bLevel.qq.forbid;
        var isucBrowser = (UA.split("UCBrowser/").length > 1) ? bLevel.uc.allow : bLevel.uc.forbid;
        return isqqBrowser || isucBrowser;
    }
    
    exports.isWeiXin = function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }


    exports.convertImgToBase64 = function(url, callback, outputFormat){ 
        var canvas = document.createElement('CANVAS'); 
        var ctx = canvas.getContext('2d'); 
        var img = new Image; 
        img.crossOrigin = 'Anonymous'; 
        img.onload = function(){ 
          canvas.height = img.height; 
          canvas.width = img.width; 
          ctx.drawImage(img,0,0); 
          var dataURL = canvas.toDataURL(outputFormat || 'image/png'); 
          callback.call(this, dataURL); 
          // Clean up 
          canvas = null; 
        }; 
        img.src = url; 
    } 

});