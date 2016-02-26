angular.module('app.location')
	.service('communityList', ['$q','$http','$timeout', 'errorLog',
		function($q,$http,$timeout, errorLog){
		var cmmList = null;
		this.getCommunityList = function(cityName){
			var promise = null;
			if(cmmList){
				promise = $q.when(cmmList);
			}else{
				var defer = $q.defer();
				cityName = cityName ? cityName:"";
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
					var reason = {
						errorCode: "GET_COMMUNITY_LIST_ERROR",
						errorMessage: errorLog.getErrorMessage(data)
					};
					defer.reject(reason);
				});
				promise = defer.promise;
			}
			return promise;
		}
	}]);