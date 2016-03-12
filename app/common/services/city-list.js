angular.module('app.location')
	.service('cityList', ['$q','$http','$timeout', 'errorLog',
		function($q,$http,$timeout, errorLog){
		var cityList = null;
		this.getCityList = function(){
			var promise = null;
			if(cityList){
				promise = $q.when(cityList);
			}else{
				var defer = $q.defer();
				$http({
					method: "GET",
					url: basePath + '/houses/city'
				}).success(function(data){
					cityList = data.items;
					defer.resolve(cityList);
				}).error(function(reason){
					var reason = {
						errorCode: "GET_CITY_LIST_ERROR",
						errorMessage: errorLog.getErrorMessage(reason)
					};
					defer.reject(reason);
				});
				promise = defer.promise;
			}
			return promise;
		}
	}]);