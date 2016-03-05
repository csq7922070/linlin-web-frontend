angular.module('app.repair')
	.service('repair', ['$q','$http','$timeout','errorLog','userInfo', 'repairs',
		function($q,$http,$timeout, errorLog, userInfo, repairs){
			this.getRepairList = function(limit,goPage) {
				var defer = $q.defer();
                var params = {
                    offset: limit * (goPage - 1),
                    limit: limit,
                    openid: userInfo.getOpenIdSync(),
                    queryType: 'openid'
                };
                repairs.query(params).$promise.then(function (data) {
                    defer.resolve(data);
                }, function (reason) {
                	reason = {
	            		errorCode: "GET_REPAIR_LIST_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
					defer.reject(reason);
                });
		        return defer.promise;
			}

			this.getRepairDetail = function(id) {
				var defer = $q.defer();
				var params = {
					'id': id
				};
				repairs.get(params).$promise.then(function(data) {
	                defer.resolve(data);
	            }, function (reason) {
                	reason = {
	            		errorCode: "GET_REPAIR_DETAIL_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
					defer.reject(reason);
                });
	            return defer.promise;
			}

			this.saveRepairDetailComfirm = function(id){
				var defer = $q.defer();
				var params = {
	                    id: id,
	                    state: 3
	                };
	            repairs.save(params).$promise.then(function(data) {
	            	defer.resolve(data);
                }, function (reason) {
                	reason = {
	            		errorCode: "SAVE_REPAIR_DETAIL_CONFIRM_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
					defer.reject(reason);
                });
	            return defer.promise;
			}

			this.saveRepairAdd = function(params) {
				var defer = $q.defer();
				// var params = params;
				// console.log(params);
                repairs.save(params).$promise.then(function(data){
                	defer.resolve(data);
                }, function (reason) {
                	reason = {
	            		errorCode: "SAVE_REPAIR_ADD_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
					defer.reject(reason);
                });
                return defer.promise;
			}

		}
	]);