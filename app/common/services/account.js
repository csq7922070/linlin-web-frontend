angular.module('app.account')
	.service('account', ['$q','$http','$timeout','errorLog','userInfo',
		function($q,$http,$timeout, errorLog,userInfo){
			this.sendAuthCode = function(tel){
				var defer = $q.defer();
				$timeout(function(){
					defer.resolve(true);
				},1000);
				// $http({
				// 	method: "GET",
				// 	url: basePath + '/sendCode',
				// 	param: {
				// 		phone: tel,
				// 		type: "send"
				// 	}
				// }).success(function(data){
				// 	defer.resolve(data.flag);
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
				userInfo.getOpenId().then(function(data){
					$http({
						method: "GET",
						url: basePath + '/sendCode',
						param: {
							phone: tel,
					     	code: authCode,
					     	type: "login",
					     	openid: data
						}
					}).success(function(data){
						defer.resolve(data);
					}).error(function(data){
						var reason = {
							errorCode: "LOGIN_ERROR",
							errorMessage: errorLog.getErrorMessage(data)
						};
						defer.reject(reason);
					});
				},function(reason){
					defer.reject(reason);
				});
				return defer.promise;
			}

			this.hasLogin = function(){
				var has = false;
				var lastLoginInfo = userInfo.getLastLoginInfo();
				if(lastLoginInfo){
					console.log("lastLoginInfo:");
					console.log(lastLoginInfo);
					has = true;
				}
				return has;
			}
	}]);