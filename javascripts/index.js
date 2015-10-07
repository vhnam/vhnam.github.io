(function() {

'use strict';

angular.module('blog-list', [])
    .factory('blogFactory', function($http) {
        return {
            get: function() {
                return $http.get('/data/blogs.json');
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

    .controller('ListControler', ['$scope', 'blogFactory', function($scope, blogFactory) {
        blogFactory.get().then(function(response) {
            $scope.blogs = response.data.blogs;
            $scope.currentPage = 0;
            $scope.pageSize = 20;

            $scope.numberOfPages = function(){
                return Math.ceil($scope.blogs.length / $scope.pageSize);
            }
        });
    }])
;

})();