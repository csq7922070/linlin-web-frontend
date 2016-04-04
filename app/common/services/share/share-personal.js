angular.module('app.share')
	.service('sharePersonal', ['$q','$http','$timeout','errorLog', 'addresses','userInfo','shareTypes',
		function($q,$http,$timeout, errorLog,addresses,userInfo,shareTypes){
			this.getSharePersonal = function(accountId){
				var defer = $q.defer();
				$http({
					method: "GET",
					url: basePath + '/offers/center/findAccount',
					params:{
						accountId:accountId
					}
				}).success(function(data){
					defer.resolve(data);
				}).error(function(reason){
					var reason = {
						errorCode: "GET_SHARE_PERSONAL_ERROR",
						errorMessage: errorLog.getErrorMessage(reason)
					};
					defer.reject(reason);
				});
				return defer.promise;
			}
		}
	]);