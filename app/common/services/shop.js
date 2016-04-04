angular.module('app.shop')
	.service('shop', ['$q','$http','$timeout','errorLog', 'addresses','userInfo','shops',
		function($q,$http,$timeout, errorLog,addresses,userInfo,shops){
			this.getShopList = function(pageIndex, pageSize, type, longitude, latitude){//pageIndex从1开始算，type从0开始算
				var defer = $q.defer();
				var params = {
                    page: pageIndex,
                    limit: pageSize,
                    type: type,
                    lon: longitude,
                    lat: latitude
                }
                shops.query(params).$promise.then(function(data) {
                	defer.resolve(data);
                },function(reason){
                    reason = {
	            		errorCode: "GET_SHOP_LIST_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
					defer.reject(reason);
                });
                return defer.promise;
			}
		}
	]);