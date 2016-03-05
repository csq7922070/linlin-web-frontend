angular.module('app.repair')
	.service('notice', ['$q','$http','$timeout','errorLog', 'address','userInfo', 'notices',
		function($q,$http,$timeout, errorLog, address, userInfo, notices){
			var defaultCommunityId;

            this.getDefaultCommunityId = function(){
            	var defer = $q.defer();
        		address.getDefaultAddress().then(function(data){
	                defaultCommunityId = data.communityId;
	                defer.resolve(data.communityId);
	            }, function (reason) {
	                	reason = {
		            		errorCode: "GET_NOTICE_DEFAULT_COMMUNITYID_ERROR",
		            		errorMessage: errorLog.getErrorMessage(reason)
		            	};
						defer.reject(reason);
	                });
	            return defer.promise;
            }

     		this.getNoticeList = function(limit,goPage){
            	var defer = $q.defer();
        		this.getDefaultCommunityId().then(function(data){
					var params = {
	                    offset: limit * (goPage - 1),
	                    limit: limit,
	                    openid: userInfo.getOpenIdSync(),
	                    communityId:defaultCommunityId
	                };
	                return notices.query(params).$promise;
        		},function(reason){
        			return $q.reject(reason);
        		}).then(function(data){
        			defer.resolve(data);
        		}, function (reason){
        			reason = {
	            		errorCode: "GET_NOTICE_LIST_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
        		});
            	return defer.promise;
            }

            this.getNoticeDetail = function(id) {
				var defer = $q.defer();
				var params = {
					'id': id
				};
				notices.get(params).$promise.then(function(data) {
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
		}
	]);