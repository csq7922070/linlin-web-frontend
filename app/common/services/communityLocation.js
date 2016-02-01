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
				method: 'GET',
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

		this.changeCommunity = function(openId, cmmInfo){
			var defer = $q.defer();
			$http({
				method: 'POST',
				url: basePath + '/GPS/save',
				data:{
					openid: openId,
					name: cmmInfo.name,
					city: cmmInfo.city,
					address: cmmInfo.address
				}
			}).success(function(data){
				defer.resolve(data);
			}).error(function(data){
				defer.reject(data);
			});
			return defer.promise;
		}

		this.compareCommunity = function(data){
			var result = false;
			if(data.type == "false" && data.name == data.lastName && data.city == data.lastCity && data.address == data.lastAddress){
				result = true;
			}
			return result;
		}
	}]);