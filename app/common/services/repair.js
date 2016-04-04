angular.module('app.repair')
	.service('repair', ['$q','$http','$timeout','errorLog','userInfo', 'repairs',
		function($q,$http,$timeout, errorLog, userInfo, repairs){
			this.repairDevice = null;
			var repairList = null;
			var repairListTotal = 0;
			var repairCompletedState = [];


			this.getRepairList = function(limit,goPage) {
				var defer = $q.defer();
				if(!repairList || repairList.length<limit*goPage && repairList.length<repairListTotal){
					// console.log(repair.repairComplete);
					var params = {
	                    offset: limit * (goPage - 1),
	                    limit: limit,
	                    accountId : userInfo.getAccountId(),
	                    queryType: 'accountId'
	                };
	                repairs.query(params).$promise.then(function (data) {
	                	if(!repairList){
	                		repairList = [];
	                	}
	                	Array.prototype.push.apply(repairList,data.items);
	                	repairListTotal = data.count;
	                    defer.resolve(repairList);
	                }, function (reason) {
	                	reason = {
		            		errorCode: "GET_REPAIR_LIST_ERROR",
		            		errorMessage: errorLog.getErrorMessage(reason)
		            	};
						defer.reject(reason);
	                });
				}else{
					defer.resolve(repairList);
				}
		        return defer.promise;
			}

			this.getRepairTotal = function(){
				return repairListTotal;
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

			this.saveRepairDetailComfirm = function(params){
				var defer = $q.defer();
	            repairs.save(params).$promise.then(function(data) {
	            	console.log(repairList);
	            	updateRepairCompletedState(data.id);
	            	console.log('state');
	            	console.log(repairList);
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

			function updateRepairCompletedState(id){
				if(repairList){
					for (var i = 0; i < repairList.length; i++) {
						if(repairList[i].id == id){
							repairList[i].state = 3;
							repairCompletedState = repairList[i];
							repairList.splice(i,1);
							repairList.unshift(repairCompletedState);
							return false;
						}
					}
				}
			}

			this.saveRepairAdd = function(params) {
				var defer = $q.defer();
                repairs.save(params).$promise.then(function(data){
                	repairList.unshift(data);
                	defer.resolve(repairList);
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