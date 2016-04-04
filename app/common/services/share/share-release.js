angular.module('app.share')
	.service('shareRelease', ['$q','$http','$timeout','errorLog','userInfo', 'shares', 'shareImage',
		function($q,$http,$timeout, errorLog, userInfo ,shares, shareImage){
			//发布技能信息
			this.releaseSkill = function(params,address,offer,images){
				var defer = $q.defer();
				params.transType = 'json';
				params.address = address;
				params.images = shareImage.getImageDataUrls(images);
				params.offer = offer;
				console.log(params);
				$http({
					method: 'POST',
					url: basePath + '/offers/save',
					headers: {
						'Content-Type': 'application/json',
					},
					transformRequest:function(data){
						return JSON.stringify(data);
					},
					data:params
				}).success(function(data){
					defer.resolve(data);
				}).error(function(reason){
					var reason = {
						errorCode: "RELEASE_SKILL_ERROR",
						errorMessage: errorLog.getErrorMessage(reason)
					};
					defer.reject(reason);
				});
				return defer.promise;
			}

			//发布需求信息
			this.releaseDemand = function(params,address,requirement,images){
				var defer = $q.defer();
				params.transType = 'json';
				params.address = address;
				params.images = shareImage.getImageDataUrls(images);
				params.requirement = requirement;
				console.log(params);
				$http({
					method: 'POST',
					url: basePath + '/requirements/save',
					headers: {
						'Content-Type': 'application/json',
					},
					transformRequest:function(data){
						return JSON.stringify(data);
					},
					data:params
				}).success(function(data){
					defer.resolve(data);
				}).error(function(reason){
					var reason = {
						errorCode: "RELEASE_DEMAND_ERROR",
						errorMessage: errorLog.getErrorMessage(reason)
					};
					defer.reject(reason);
				});
				return defer.promise;
			}

			//获取发布的技能详情
			this.getSkillDetail = function(releseId){
				var defer = $q.defer();
				$http({
					method: 'GET',
					url: basePath + '/offers/' + releseId
				}).success(function(data){
					defer.resolve(data);
				}).error(function(reason){
					var reason = {
						errorCode: "GET_SKILL_DETAIL_ERROR",
						errorMessage: errorLog.getErrorMessage(reason)
					};
					defer.reject(reason);
				});
				return defer.promise;
			}

			//获取发布的需求详情
			this.getDemandDetail = function(releseId){
				var defer = $q.defer();
				$http({
					method: 'GET',
					url: basePath + '/requirements/' + releseId
				}).success(function(data){
					defer.resolve(data);
				}).error(function(reason){
					var reason = {
						errorCode: "GET_DEMAND_DETAIL_ERROR",
						errorMessage: errorLog.getErrorMessage(reason)
					};
					defer.reject(reason);
				});
				return defer.promise;
			}
		}
	]);