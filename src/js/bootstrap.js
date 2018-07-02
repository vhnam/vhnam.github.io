window.axios = require('axios');
window.Popper = require('popper.js').default;

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

// Force a quick redirect to HTTPS on Github Pages for your domain (and only your domain)
let host = 'vhnam.github.io';
if ((host == window.location.host) && (window.location.protocol != 'https:')) {
    window.location.protocol = 'https';
}
