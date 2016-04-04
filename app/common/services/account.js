angular.module('app.account')
	.service('account', ['$q','$http','$timeout','errorLog','userInfo','$q',
		function($q,$http,$timeout, errorLog,userInfo,$q){			
			this.sendAuthCode = function(tel){
				var defer = $q.defer();
				// $timeout(function(){
				// 	defer.resolve(true);
				// },1000);
				$http({
					method: "GET",
					url: basePath + '/sendCode',
					params: {
						phone: tel,
						type: "send"
					}
				}).success(function(data){
					defer.resolve(data.flag);
				}).error(function(data){
					var reason = {
						errorCode: "SEND_AUTH_CODE_ERROR",
						errorMessage: errorLog.getErrorMessage(data)
					};
					defer.reject(reason);
				});
				return defer.promise;
			}

			this.login = function(tel, authCode){
				var defer = $q.defer();
				$http({
					method: "GET",
					url: basePath + '/sendCode',
					params: {
						phone: tel,
				     	code: authCode,
				     	type: "login",
				     	openid: userInfo.getOpenIdSync()
					}
				}).success(function(data){
					defer.resolve(data);
				}).error(function(reason){
					var reason = {
						errorCode: "LOGIN_ERROR",
						errorMessage: errorLog.getErrorMessage(reason)
					};
					defer.reject(reason);
				});
				return defer.promise;
			}

			this.hasLogin = function(){
				var has = false;
				var lastLoginInfo = userInfo.getLastLoginInfo();
				if(lastLoginInfo&&lastLoginInfo.login&&lastLoginInfo.accountId){
					// console.log("lastLoginInfo:");
					// console.log(lastLoginInfo);
					has = true;
				}
				return has;
			}

			this.logout = function(){
				userInfo.storageLogoutInfo();
			}
	}]);