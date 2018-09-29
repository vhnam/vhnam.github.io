window.axios = require('axios');
window.Popper = require('popper.js').default;

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

const year = new Date().getFullYear();
const yearElement = document.getElementById('footer-year');
yearElement.innerText = year;

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
  
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
  
    return elementBottom > viewportTop && elementTop < viewportBottom;
};



var index = $("#index");
var position = index.position();

$(window).on('resize scroll', function() {
    $('.heading').each(function() {
        const id = $(this).attr('id');
        if ($(this).isInViewport()) {
            $('.index__item').removeClass('index--highlight');
            $(`#prefix-${id}`).addClass('index--highlight');
        }
    });
    
    const windowPosition = $(window).scrollTop();

    if (windowPosition >= position.top) {
        index.addClass("index--sticked");
    } else {
        index.removeClass("index--sticked"); 
    }
});
