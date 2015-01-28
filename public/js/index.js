angular.module('blog', [])
	.factory('Post', function($http) {
		return {
			get: function() {
				return $http.get('/index/index.json');
			}
		};
	})
	.controller('BlogController', function($scope, Post) {
		Post.get().then(function(collection) {
			$scope.postCollection = [];
			var index;
			for (index = 0; index < collection.data.length; index++) {
				if (index < 5) {
					$scope.postCollection.push(collection.data[index]);
				} else {
					break;
				}
			}
		});
	});