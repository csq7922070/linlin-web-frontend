angular.module('app.repair')
	.service('complain', ['$q','$http','$timeout','errorLog','userInfo', 'complains',
		function($q,$http,$timeout, errorLog, userInfo, complains){
			this.getComplainList = function(goPage,limit) {
				var defer = $q.defer();
                var params = {
                    offset: limit * (goPage - 1),
                    limit: limit,
                    openid: userInfo.getOpenIdSync(),
                    queryType: 'openid'
                };
                complains.query(params).$promise.then(function (data) {
                    defer.resolve(data);
                }, function (reason) {
                	reason = {
	            		errorCode: "GET_COMPLAIN_LIST_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
					defer.reject(reason);
                });
		        return defer.promise;
			}

			this.getComplainDetail = function(id) {
				var defer = $q.defer();
				var params = {
					'id': id
				};
				complains.get(params).$promise.then(function(data) {
	                defer.resolve(data);
	            }, function (reason) {
                	reason = {
	            		errorCode: "GET_COMPLAIN_DETAIL_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
					defer.reject(reason);
                });
	            return defer.promise;
			}

			this.saveComplainAdd = function(params) {
				var defer = $q.defer();
				// var params = params;
                complains.save(params).$promise.then(function(data){
                	defer.resolve(data);
                }, function (reason) {
                	reason = {
	            		errorCode: "SAVE_COMPLAIN_ADD_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
					defer.reject(reason);
                });
                return defer.promise;
			}

		}
	]);