angular.module('app.location')
	.service('communityLocation', ['$q', '$timeout', '$http', 'errorLog', function($q, $timeout, $http, errorLog){
		this.locationCommunity = function(openId, longitude, latitude){// longitude经度，latitude维度
			console.log("locationCommunity...");
			var defer = $q.defer();
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
				var reason = {
					errorCode: "LOCATION_COMMUNITY_ERROR",
					errorMessage: errorLog.getErrorMessage(data)
				};
				defer.reject(reason);
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
				var reason = {
					errorCode: "CHANGE_COMMUNITY_ERROR",
					errorMessage: errorLog.getErrorMessage(data)
				};
				defer.reject(reason);
			});
			return defer.promise;
		}

		//判断2次小区定位是否一致，如果上次定位不存在，直接返回true
		// data:{type,areaName,city,address,lastAreaName,lastCity,lastAddress}
		this.compareCommunity = function(data){
			var result = true;
			if(data.type == "false" && 
				(data.areaName != data.lastAreaName || data.city != data.lastCity || data.address != data.lastAddress)){
				result = false;
			}
			return result;
		}

		//获取上一次使用的小区信息，此信息通过localStorage持久化存储
		this.getLastCommunity = function(){
			var cmm = null;
			if(window.localStorage && localStorage.communityInfo){
				cmm = JSON.parse(localStorage.communityInfo);
			}
			return cmm;
		}

		this.storageCommunity = function(cmmInfo){
			var state = false;
			if(window.localStorage){
				localStorage.communityInfo = JSON.stringify(cmmInfo);
				state = true;
			}
			return state;
		}
	}]);