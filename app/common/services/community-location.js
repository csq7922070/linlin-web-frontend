angular.module('app.location')
	.service('communityLocation', ['$q', '$timeout', '$http', 'errorLog', 'userInfo', 'location',
		function($q, $timeout, $http, errorLog, userInfo, location){
		this.changeCommunityHand = false;

		var lastCommunity = null;
		// id: null,
  //       name: null,
  //       province: null,
  //       city: null,
  //       district: null,
  //       street: null,
  //       steetNumber: null,
  //       address: null,//这是完整的地址
  //       auth: null//该字段用来判断小区是否为合作小区，值为true or false
		
		//根据经纬度定位小区
		function locationCommunity(openId, longitude, latitude){// longitude经度，latitude维度
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

		//自动定位小区，先定位经纬度，然后调用接口查询小区信息
		this.autoLocationCommunity = function(){
			//alert("autoLocationCommunity...");
			var defer = $q.defer();
			var openId = null;
    		userInfo.getOpenId().then(function(data){//openid
    			openId = data;
    			return location.getLocation();
    		},function(reason){
    			return $q.reject(reason);
    		}).then(function(data){
    			return locationCommunity(openId, data.longitude, data.latitude);
    		},function(reason){
    			return $q.reject(reason);
    		}).then(function(data){//community
    			defer.resolve(data);
    		}, function(reason){
    			defer.reject(reason);
    		});
			return defer.promise;
		}

		this.changeCommunity = function(openId, cmmInfo){
			var that = this;
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
				lastCommunity = cmmInfo;
				that.storageCommunity(cmmInfo);
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
			if(!data.type && (data.areaName != data.lastAreaName 
				|| data.city != data.lastCity || data.address != data.lastAddress)){
				result = false;
			}
			return result;
		}

		//获取上一次使用的小区信息，此信息通过localStorage持久化存储
		this.getLastCommunity = function(){
			if(!lastCommunity && window.localStorage && localStorage.communityInfo){
				lastCommunity = JSON.parse(localStorage.communityInfo);
			}
			// alert("getLastCommunity");
			// alert(errorLog.getFullErrorMessage(lastCommunity));
			return lastCommunity;
		}

		this.storageCommunity = function(cmmInfo){
			// alert("storageCommunity");
			// alert(errorLog.getFullErrorMessage(cmmInfo));
			var state = false;
			if(window.localStorage){
				localStorage.communityInfo = JSON.stringify(cmmInfo);
				state = true;
			}
			return state;
		}
	}]);