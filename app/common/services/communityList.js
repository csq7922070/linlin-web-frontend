angular.module('app.location')
	.service('communityList', ['$q','$http','$timeout', function($q,$http,$timeout){
		var cmmList = null;
		this.getCommunityList = function(cityName){
			var promise = null;
			if(cmmList){
				promise = $q.when(cmmList);
			}else{
				var defer = $q.defer();
				$http({
					method: "GET",
					url: basePath + '/GPS/findArea',
					params: {
						city: cityName
					}
				}).success(function(data){
					cmmList = data.items;
					defer.resolve(cmmList);
				}).error(function(data){
					defer.reject(data);
				});
				promise = defer.promise;
			}
			return promise;
		}
	}]);