angular.module('app.share')
	.service('shareImage', ['$q','$http','$timeout','errorLog', 'addresses','userInfo',
		function($q,$http,$timeout, errorLog,addresses,userInfo){
			this.getImages = function(releaseId){
				var defer = $q.defer();
				$http({
					method: "GET",
					url: basePath + '/data/'+releaseId
				}).success(function(data){
					var images = [];
					if(data&&data.items){
						images = getFormatImages(data.items);
					}
					defer.resolve(images);
				}).error(function(reason){
					var reason = {
						errorCode: "GET_SHARE_IMAGES_ERROR",
						errorMessage: errorLog.getErrorMessage(reason)
					};
					defer.reject(reason);
				});
				return defer.promise;
			}

			function getFormatImages(images){
				var result = [];
				if(images){
					angular.forEach(images, function(item){
						var newImage = angular.copy(item);
						newImage.dataUrl = item.picture;
						result.push(newImage);
					});
				}
				return result;
			}

			//将[{dataUrl:'...'}]转换为['...','...']格式
			this.getImageDataUrls = function(images){
				var dataUrls = [];
				if(images){
					for(var i = 0 ; i < images.length ; i ++){
						dataUrls.push(images[i].dataUrl);
					}
				}
				return dataUrls;
			}
		}
	]);