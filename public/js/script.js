$(window).scroll(function() {
	if($(this).scrollTop()>100) {
		$('.widget-top').fadeIn('slow');
	} else {
		$('.widget-top').fadeOut('slow');
	}
});

$('.widget-top').click(function() {
    $('body').animate({
    	scrollTop: 0
    }, 'slow');
});