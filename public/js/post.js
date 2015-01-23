angular.module('index', [])
	.factory('Post', function($http) {
		return {
			get: function() {
				return $http.get('/about/index.json');
			}
		};
	})
	.controller('IndexController', function($scope, Post) {
		Post.get().then(function(collection) {
			$scope.postCollection = collection.data;
		});
	});