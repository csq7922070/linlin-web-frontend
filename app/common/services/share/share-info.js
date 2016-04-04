angular.module('app.share')
	.service('shareInfo', ['$q','$http','$timeout','errorLog', 'addresses','userInfo','shareTypes','$filter',
		function($q,$http,$timeout, errorLog,addresses,userInfo,shareTypes,$filter){
			//shareType string 'skill' or 'requirement'
			//skillId number
			//allArea bool
			//sortRule number
			//pageIndex start 0
			this.getShareInfoList = function(shareType, skillId,allArea,city,district,sortRule,pageIndex,pageSize){
				var defer = $q.defer();
				var type = shareType == 'skill'?'offers':'requirements';
				$http({
					method: "GET",
					url: basePath + '/'+type+'/query',
					params:{
						categoryType:skillId,
						queryType:allArea?-1:0,
						city:city,
						district:district,
						orderType:sortRule,
						offset:pageIndex,
						limit:pageSize
					}
				}).success(function(data){
					var shareInfoList = [];
					if(data&&data.items){
						shareInfoList = getFormatShareInfoList(data.items,shareType);
					}
					defer.resolve(shareInfoList);
				}).error(function(reason){
					var reason = {
						errorCode: "GET_SHARE_LIST_ERROR",
						errorMessage: errorLog.getErrorMessage(reason)
					};
					defer.reject(reason);
				});
				return defer.promise;
			}

			//shareType string 'skill' or 'requirement'
			function getFormatShareInfoList(shareInfoList,shareType){
				var result = [];
                if(shareInfoList){
                    angular.forEach(shareInfoList,function(item){
                    	var newItem = $filter("shareInfo")(item);//调用过滤器shareInfo对共享信息进行格式化处理，主要为了页面显示
						newItem.shareType = shareType;//用来判断数据是技能信息还是需求信息
						result.push(newItem);						
                    });
                }
				return result;
			}

			//shareType string 'skill'代表技能，'requirement'代表需求
			this.getPersonalShareInfoList = function(accoundId,shareType,pageIndex, pageSize){
				var defer = $q.defer();
				var type = shareType == 'skill'?'offers':'requirements';
				$http({
					method: "GET",
					url: basePath + '/'+type+'/center/'+accoundId,
					params:{
						offset:pageIndex,
						limit:pageSize
					}
				}).success(function(data){
					var shareInfoList = [];
					if(data&&data.items){
						shareInfoList = getFormatShareInfoList(data.items,shareType);
					}
					defer.resolve(shareInfoList);
				}).error(function(reason){
					var reason = {
						errorCode: "GET_PERSONAL_SHARE_LIST_ERROR",
						errorMessage: errorLog.getErrorMessage(reason)
					};
					defer.reject(reason);
				});
				return defer.promise;
			}
		}
	]);