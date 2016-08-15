define(function(require,exports,module) {
	var hint = {

	};

	hint.create = function(showMsg) {
		var hintDom = $('<div class="hint_box"><div>' + showMsg + '</div></div>');
		var hintStyle = [
			'display:none;',
			'position: fixed;',
			'top: 0;',
			'left: 0;',
			'bottom: 0;',
			'right: 0;',
			'margin: auto;',
			'height: .7rem;',
			'line-height: .7rem;',
			'text-align: center;'
		].join('');

		var hintDivStyle = [
			'color: #ffffff;',
			'font-size: .3rem;',
			'text-align: center;background: black;',
			'width: auto;',
			'display: inline-block;',
		    'padding: 0 .2rem;',
			'border-radius: .1rem;'
		].join('');

		$('body').append(hintDom);
		$('.hint_box').attr('style', hintStyle);
		$('.hint_box div').attr('style', hintDivStyle);

		$('.hint_box').fadeIn('slow',function() {
			$('.hint_box').fadeOut(1500,function() {
				$(this).remove();
			});
		});
		
	}


	hint.show = function(showMsg) {
		hint.create(showMsg);

	};

	exports.show = hint.show;
 });