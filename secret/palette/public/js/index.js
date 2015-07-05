'use strict';

(function() {

angular.module('palette', [])

    .factory('Color', function() {
        return {
            getGRB: function(color) {
                for (var s = document.styleSheets.length - 1; s >= 0; s--) {
                    var cssRules = document.styleSheets[s].cssRules || document.styleSheets[s].rules || [];

                    for (var c = 0; c < cssRules.length; c++) {
                        if (cssRules[c].selectorText === '.' + color) {
                            return cssRules[c]. style['background-color'];
                        }
                    }
                }

                return null;
            },

            convertToHex: function(data) {
                var value = parseInt(data).toString(16).toUpperCase();

                if (value.length < 2) {
                    value = '0' + value;
                }

                return value;
            }
        }
    })

    .controller('PaletteCtrl', ['$scope', '$http', 'Color', function(scope, http, colorService) {

        http.get('data/palettes.json').then(function(response) {
            scope.palettes = response.data;

            var palette = scope.palettes[0];
            scope.firstColor = palette.firstColor;
            scope.secondColor = palette.secondColor;
            scope.thirdColor = palette.thirdColor;
            scope.index = 0;
        });

        scope.format = function(index) {
            if (index < 9) {
                return '00' + (index + 1).toString();
            }

            if (index < 99) {
                return '0' + (index + 1).toString();
            }

            return index + 1;
        }

        scope.getColor = function(color) {
            var rgb = colorService.getGRB(color);

            if (rgb !== null) {
                var rgba = rgb.match(/[0-9]+/g);
                return '#' + colorService.convertToHex(rgba[0]) +
                        colorService.convertToHex(rgba[1]) +
                        colorService.convertToHex(rgba[2]);
            }
        }

        scope.choosePalette = function(palette, index) {
            scope.firstColor = palette.firstColor;
            scope.secondColor = palette.secondColor;
            scope.thirdColor = palette.thirdColor;
            scope.index = index;

            var buttons = document.getElementsByClassName('checked-button');

            angular.forEach(buttons, function(value, key) {
                angular.element(value).removeClass('pink-A200');
            });

            angular.element(buttons[index]).addClass('pink-A200');
        }
    }])
;

})();