//计算font-size
!function () {
	document.addEventListener('DOMContentLoaded', function () {
		var html = document.documentElement;
        var windowWidth = html.clientWidth;
        html.style.fontSize = windowWidth / 7.5 + 'px';
        // 等价于html.style.fontSize = windowWidth / 640 * 100 + 'px';
    }, false);

    
}();

var LS = localStorage;
var debug = true;
var baseUrl = location.origin;

var ageSection = [],
	heigthSection = [],
	weightSection = [];
for(var i=0; i<=99; i++) {
	ageSection.push(i);
}
for(var j=130; j<=220; j++) {
	heigthSection.push(j);
}
for(var k=40; k<=120; k++) {
	weightSection.push(k);
}

document.onclick = function(e) {
	if(e.target.parentNode.className == 'header_back') {
		history.back();
	}
}

function isTrue(str) {
	if(str=='null' || str=='undefined' || str=='false' || str=='' || str==null || str==undefined || str==false) {
		return false;
	} else {
		return true;
	}
}