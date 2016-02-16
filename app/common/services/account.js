angular.module('app.account')
	.service('account', ['$q','$http','$timeout','errorLog',
		function($q,$http,$timeout, errorLog){
			this.sendAuthCode = function(tel){
				var defer = $q.defer();
				$timeout(function(){
					defer.resolve(true);
				},1000);
				// $http({
				// 	method: "POST",
				// 	url: basePath + '/GPS/findArea',
				// 	data: {
				// 		tel: tel
				// 	}
				// }).success(function(data){
				// 	defer.resolve(data);
				// }).error(function(data){
				// 	var reason = {
				// 		errorCode: "SEND_AUTH_CODE_ERROR",
				// 		errorMessage: errorLog.getErrorMessage(data)
				// 	};
				// 	defer.reject(reason);
				// });
				return defer.promise;
			}

			this.login = function(tel, authCode){
				var defer = $q.defer();
				$timeout(function(){
					if(authCode == "1001")
						defer.resolve(true);
					else
						defer.resolve(false);
				},1000);
				// $http({
				// 	method: "POST",
				// 	url: basePath + '/GPS/findArea',
				// 	data: {
				// 		tel: tel,
				//      authCode: authCode
				// 	}
				// }).success(function(data){
				// 	defer.resolve(data);
				// }).error(function(data){
				// 	var reason = {
				// 		errorCode: "LOGIN_ERROR",
				// 		errorMessage: errorLog.getErrorMessage(data)
				// 	};
				// 	defer.reject(reason);
				// });
				return defer.promise;
			}
	}]);