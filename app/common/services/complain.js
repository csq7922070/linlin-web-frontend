angular.module('app.complain')
	.service('complain', ['$q','$http','$timeout','errorLog','userInfo', 'complains',
		function($q,$http,$timeout, errorLog, userInfo, complains){
			var complainList = null;
			var complainListTotal = 0;

			this.getComplainList = function(goPage,limit) {
				var defer = $q.defer();
				if(!complainList || complainList.length<limit*goPage && complainList.length<complainListTotal){
					console.log(!complainList);
					var params = {
	                    offset: limit * (goPage - 1),
	                    limit: limit,
	                    accountId : userInfo.getAccountId(),
	                    queryType: 'accountId'
	                };
	                // console.log('limit*goPage');
	                // console.log(limit*goPage);
	                complains.query(params).$promise.then(function (data) {
	                	if(!complainList){
	                		complainList = [];
	                	}
	                	Array.prototype.push.apply(complainList,data.items);
	                	complainListTotal = data.count;
	                    defer.resolve(complainList);
	                    // defer.resolve(data);
	                }, function (reason) {
	                	reason = {
		            		errorCode: "GET_COMPLAIN_LIST_ERROR",
		            		errorMessage: errorLog.getErrorMessage(reason)
		            	};
						defer.reject(reason);
	                });
				}else{
					defer.resolve(complainList);
				}
		        return defer.promise;
			}

			this.getComplainTotal = function(){
				return complainListTotal;
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

			this.getComplainDetailComplete = function(params) {
				var defer = $q.defer();
				console.log(params);
				complains.save(params).$promise.then(function(data) {
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
                	complainList.unshift(data);
                	defer.resolve(complainList);
                }, function (reason) {
                	reason = {
	            		errorCode: "SAVE_COMPLAIN_ADD_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
					defer.reject(reason);
                });
                return defer.promise;
			}

			this.saveComplainReply = function(params) {
				var defer = $q.defer();
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