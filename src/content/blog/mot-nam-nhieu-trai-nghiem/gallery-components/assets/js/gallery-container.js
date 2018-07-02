'use strict';

(function() {

    function initialize(self) {
        var list = self.querySelector('ul');
        var color = '#' + self.color;

        list.style.color = color;
    }

    function resetGallery(self) {
        var children = self.getElementsByTagName('li');

        for (var i = 0; i < children.length; i++) {
            children[i].style.display = 'none';
        }
    }

    function show(self) {
        var delay = self.delay;
        var children = self.getElementsByTagName('li');
        var index = 0;

        var timeout = setInterval(function() {
            if (index === children.length) {
                index = 0;
                resetGallery(self);
            } else {
                children[index++].style.display = 'block';
            }
        }, delay);
    }

    var options = {
        is: 'gallery-container',
        properties: {
            color: {
                type: String,
                value: '536DFE'
            },
            delay: {
                value: 2000
            }
        },
        ready: function() {
            var self = this;
            initialize(self);
            show(self);
        },
    };

    Polymer(options);

})();
