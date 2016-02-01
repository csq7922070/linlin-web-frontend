angular.module('app.location')
	.service('communityList', ['$q','$http','$timeout', function($q,$http,$timeout){
		var cmmList = null;
		this.getCommunityList = function(cityName){
			var promise = null;
			if(cmmList){
				promise = $q.when(cmmList);
			}else{
				var defer = $q.defer();
				// $timeout(function(){
				// 	$http.get('data/communityList.json').success(function(data){
				// 		defer.resolve(data);
				// 	}).error(function(data){
				// 		defer.reject(data);
				// 	});
				// },1000);
				$http({
					method: "GET",
					url: basePath + '/findArea',
					params: {
						city: cityName
					}
				}).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				promise = defer.promise;
			}
			return promise;
		}
	}]);