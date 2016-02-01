angular.module('app.location')
	.service('communityLocation', ['$q', '$timeout', '$http', function($q, $timeout, $http){
		this.locationCommunity = function(openId, longitude, latitude){// longitude经度，latitude维度
			console.log("locationCommunity...");
			var defer = $q.defer();
			// $timeout(function(){
			// 	$http.get('data/communityLocation.json').success(function(data){
			// 		defer.resolve(data);
			// 	}).error(function(data){
			// 		defer.reject(data);
			// 	});
			// },1500);
			$http({
				type: 'get',
				url: basePath + '/GPS/',
				params: {
					openid: openId,
					lon: longitude,
					lat: latitude
				}
			}).success(function(data){
				defer.resolve(data);
			}).error(function(data){
				defer.reject(data);
			});
			return defer.promise;
		}
	}]);