angular.module('app.share')
	.service('shareOrder', ['$q','$http','$timeout','errorLog','userInfo', 'shares',
		function($q,$http,$timeout, errorLog, userInfo ,shares){
			//发送订单
			this.submitOrder = function(params){
				var defer = $q.defer();
				$http({
					method: 'POST',
					url: basePath + '/offers/order',
					data:params
				}).success(function(data){
					defer.resolve(data);
				}).error(function(reason){
					var reason = {
						errorCode: "SUBMIT_ORDER__ERROR",
						errorMessage: errorLog.getErrorMessage(reason)
					};
					defer.reject(reason);
				});
				return defer.promise;
			}
		}
	]);