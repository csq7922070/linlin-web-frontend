angular.module('app.address')
	.service('address', ['$q','$http','$timeout','errorLog', 'addresses',
		function($q,$http,$timeout, errorLog,addresses){
			var defaultAddress = {
				city: null,
				community: null,
				block: null,
				unit: null,
				room: null,
				owner: null,//房屋所有者姓名
				ownerStar: null//所有者姓名加*处理
			};
			var addressList = null;
			var cityList = null;

			this.getDefaultAddress = function(){
				return defaultAddress;
			}

			this.getAddressList = function(){
				var defer = $q.defer();
				if(!addressList){
					addressList = [];
					var params = {
		                type: 'openid',
		                openid: sessionStorage.getItem("openid")
		            }
		            addresses.query(params).$promise.then(function(data) {
		            	addressList = data.items;
		            	defer.resolve(addressList);
		            },function(reason){
		            	reason = {
		            		errorCode: "GET_ADDRESS_LIST_ERROR",
		            		errorMessage: errorLog.getErrorMessage(reason)
		            	};
		                defer.reject(reason);
		            });
				}else{
					defer.resolve(addressList);
				}
				return defer.promise;
			}

			this.getCityList = function(){
				var defer = $q.defer();
				if(!cityList){
					var params = {
		                type:'city'
		            }
		            addresses.query(params).$promise.then(function (data) {
		                cityList = data.items;
		                defer.resolve(cityList);
		            }, function (reason) {
		                reason = {
		            		errorCode: "GET_CITY_LIST_ERROR",
		            		errorMessage: errorLog.getErrorMessage(reason)
		            	};
		                defer.reject(reason);
		            });
		        }else{
		        	defer.resolve(cityList);
		        }
				return defer.promise;
			}

			this.getCommunityList = function(city){
				var defer = $q.defer();
				var communityList= null;
				var params = {
	                type:'community',
	                city:city
	            }
	            addresses.query(params).$promise.then(function (data) {
	                communityList = data.items;
	                defer.resolve(communityList);
	            }, function (reason) {
	                reason = {
	            		errorCode: "GET_COMMUNITY_LIST_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
	                defer.reject(reason);
	            });
				return defer.promise;
			}

			this.getBlockList = function(city,community){
				var defer = $q.defer();
				var blockList = null;
				var params = {
	                type: "block",
	                city:city,
	                community:community
	            }
	            addresses.query(params).$promise.then(function (data) {
	                blockList = data.items;
	                defer.resolve(blockList);
	            }, function (reason) {
	                reason = {
	            		errorCode: "GET_BLOCK_LIST_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
	                defer.reject(reason);
	            });
				return defer.promise;
			}

			this.getUnitList = function(city,community,block){
				var defer = $q.defer();
				var unitList = null;
				var params = {
	                type:'unit',
	                city:city,
	                community:community,
	                block:block
	            }
	            addresses.query(params).$promise.then(function (data) {
	                unitList = data.items;
	                defer.resolve(unitList);
	            }, function (reason) {
	                reason = {
	            		errorCode: "GET_UNIT_LIST_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
	                defer.reject(reason);
	            });
				return defer.promise;
			}

			this.getRoomList = function(city,community,block,unit){
				var defer = $q.defer();
				var roomList = null;
				var params={
	                type:'room',
	                city:city,
	                community:community,
	                block:block,
	                unit:unit?unit:""
	            }
	            addresses.query(params).$promise.then(function(data){
	                roomList = data.items;
	                defer.resolve(roomList);
	            },function(reason){
	            	reason = {
	            		errorCode: "GET_ROOM_LIST_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
	                defer.reject(reason);
	            });
				return defer.promise;
			}
		}
	]);