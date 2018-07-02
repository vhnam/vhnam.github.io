'use strict';

(function() {

    var options = {
        is: 'gallery-photo',
        properties: {
            src: {
                type: String
            },
            alt: {
                type: String
            }
        },
        ready: function() {
            var self = this;
            var element = self.querySelector('div.gallery-photo');
            var rangeRotation = 10;
            var position = Math.floor(Math.random() * 30) - 0;
            var deg = Math.floor(Math.random() * rangeRotation * 2 + 1) - rangeRotation;

            deg = 'rotate(' + deg + 'deg)';
            element.style.webkitTransform = deg;
            element.style.MozTransform = deg;
            element.style.msTransform = deg;
            element.style.OTransform = deg;
            element.style.transform = deg;

            element.style.left = position + '%';
        }
    };

    Polymer(options);
})();