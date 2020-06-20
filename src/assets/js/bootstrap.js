window.axios = require('axios');
window.Popper = require('popper.js').default;

try {
  window.$ = window.jQuery = require('jquery');

  require('bootstrap');
} catch (e) {}

$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

// Fill year into footer automatically
const year = new Date().getFullYear();
const yearElement = document.getElementById('footer-year');
yearElement.innerText = year;

// Set Active into header automatically
const navigationLinks = {
  '/blog/': 'blog',
  '/tutorials/': 'tutorials',
  '/about.html': 'about',
  '/contact.html': 'contact',
};
$.each(navigationLinks, function (link) {
  if (window.location.pathname.match(link)) {
    $(`#${navigationLinks[link]}`).addClass('navbar__page--active');
  }
});
