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
