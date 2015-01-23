angular.module('index', [])
	.factory('Post', function($http) {
		return {
			get: function() {
				return $http.get('/index/index.json');
			}
		};
	})
	.controller('IndexController', function($scope, Post) {
		Post.get().then(function(collection) {
			$scope.postCollection = collection.data;
			$scope.currentPage = 0;
			$scope.pageSize = 6;

			$scope.numberOfPages = function(){
				return Math.ceil($scope.postCollection.length / $scope.pageSize);
			}
		});
	})
	.filter('startFrom', function() {
		return function(input, start) {
			start = +start; //parse to int
			if (input != undefined)
				return input.slice(start);
		}
	});;