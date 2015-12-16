(function() {

'use strict';

angular.module('story-list', [])
    .factory('storyFactory', function($http) {
        return {
            get: function() {
                return $http.get('/data/stories.json');
            }
        };
    })

    .filter('startFrom', function() {
        return function(input, start) {
            start = +start; //parse to int
            if (input != undefined)
                return input.slice(start);
        }
    })

    .controller('ListControler', ['$scope', 'storyFactory', function($scope, storyFactory) {
        storyFactory.get().then(function(response) {
            $scope.stories = response.data.stories;
            $scope.currentPage = 0;
            $scope.pageSize = 20;

            $scope.numberOfPages = function(){
                return Math.ceil($scope.stories.length / $scope.pageSize);
            }
        });
    }])
;

})();