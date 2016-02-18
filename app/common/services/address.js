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
			// this.sendAuthCode = function(tel){
			// 	var defer = $q.defer();
			// 	$timeout(function(){
			// 		defer.resolve(true);
			// 	},1000);
			// 	// $http({
			// 	// 	method: "POST",
			// 	// 	url: basePath + '/GPS/findArea',
			// 	// 	data: {
			// 	// 		tel: tel
			// 	// 	}
			// 	// }).success(function(data){
			// 	// 	defer.resolve(data);
			// 	// }).error(function(data){
			// 	// 	var reason = {
			// 	// 		errorCode: "SEND_AUTH_CODE_ERROR",
			// 	// 		errorMessage: errorLog.getErrorMessage(data)
			// 	// 	};
			// 	// 	defer.reject(reason);
			// 	// });
			// 	return defer.promise;
			// }
	}]);