(function() {

var count = 0,
	countWithThrottle = 0,
    time = 250;

$('#block-non-throttle').on('mousemove', hover);
$('#block-throttle').on('mousemove', throttle(hoverWithThrottle, time));

function hover() {
	var self = this;

	$(self).html(++count);
}

function throttle(func, time) {
	var wait = false;

	return function() {
		if (!wait) {
			func.call();
			wait = true;

			setTimeout(function() {
				wait = false;
			}, time);
		}
	}
}

function hoverWithThrottle() {
	var self = $('#block-throttle');

	$(self).html(++countWithThrottle);
}

})();