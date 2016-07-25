(function () {
	document.addEventListener('DOMContentLoaded', function () {
		var html = document.documentElement;
        var windowWidth = html.clientWidth;
        html.style.fontSize = windowWidth / 7.5 + 'px';
        // 等价于html.style.fontSize = windowWidth / 640 * 100 + 'px';
    }, false);
})();

var LS = localStorage;
var globalState = LS.globalState ? JSON.parse(LS.globalState) : {
	footerIndex : 0,
	setFooterIndex : 'function(value) {var self = this;self.footerIndex = value;LS.globalState = JSON.stringify(self);}'
}
console.log(globalState);
console.log(LS.globalState);
