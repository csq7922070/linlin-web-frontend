angular.module('app.address')
	.service('address', ['$q','$http','$timeout','errorLog',
		function($q,$http,$timeout, errorLog){
			var defaultAddress = {
				city: null,
				community: null,
				block: null,
				unit: null,
				room: null,
				owner:null
			};
			var addressList = [];

			this.getDefaultAddress = function(){
				return defaultAddress;
			}

			this.getAddressList = function(){
				return addressList;
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