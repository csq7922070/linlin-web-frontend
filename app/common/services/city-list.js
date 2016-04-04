angular.module('app.location')
	.service('cityList', ['$q','$http','$timeout', 'errorLog',
		function($q,$http,$timeout, errorLog){
		var cityList = null;
		var recommandCityList = [{
			id:134,
			name:'廊坊',
			initial:'L',
			pinyin:'langfang',
			py:'lf'
		}];

		// this.getCityList = function(){
		// 	var promise = null;
		// 	if(cityList){
		// 		promise = $q.when(cityList);
		// 	}else{
		// 		var defer = $q.defer();
		// 		$http({
		// 			method: "GET",
		// 			url: basePath + '/houses/city'
		// 		}).success(function(data){
		// 			cityList = data.items;
		// 			defer.resolve(cityList);
		// 		}).error(function(reason){
		// 			var reason = {
		// 				errorCode: "GET_CITY_LIST_ERROR",
		// 				errorMessage: errorLog.getErrorMessage(reason)
		// 			};
		// 			defer.reject(reason);
		// 		});
		// 		promise = defer.promise;
		// 	}
		// 	return promise;
		// }

		//获取全国城市列表
		this.getCityList = function(){
			var defer = $q.defer();
			if(cityList){
				defer.resolve(cityList);
			}else{
				getDistrictInfo(0).then(function(data){
					cityList = [];
					if(data.items){
						cityList = data.items;
					}
					defer.resolve(cityList);
				},function(reason){
					var reason = {
						errorCode: "GET_CITY_LIST_ERROR",
						errorMessage: errorLog.getErrorMessage(reason)
					};
					defer.reject(reason);
				});
			}
			return defer.promise;
		}

		//获取某城市区县列表
		this.getDistrictList = function(cityId){
			var defer = $q.defer();
			getDistrictInfo(cityId).then(function(data){
				var districtList = [];
				if(data.items){
					districtList = data.items;
				}
				defer.resolve(districtList);
			},function(reason){
				var reason = {
					errorCode: "GET_DISTRICT_LIST_ERROR",
					errorMessage: errorLog.getErrorMessage(reason)
				};
				defer.reject(reason);
			});
			return defer.promise;
		}

		//id=0代表获取共享所需的城市列表，否则id代表城市ID，获取的是该城市下的区县列表
		function getDistrictInfo(id){
			var defer = $q.defer();
			$http({
				method: 'GET',
				url: basePath + '/data/district/'+id,
			}).then(function(response){
				defer.resolve(response.data);
			},function(reason){
				defer.reject(reason);
			});
			return defer.promise;
		}

		// //将区县名称数组转换为逗号分隔的字符串
		// this.getDistrictsString = function(mydistrict){
		// 	var districtsString = "";
		// 	if(mydistrict.districts){
		// 		for(var i = 0 ; i < mydistrict.districts.length ; i ++){
		// 			if(i == 0){
		// 				districtsString = mydistrict.districts[i];
		// 			}else{
		// 				districtsString = districtsString + ',' + mydistrict.districts[i];
		// 			}
		// 		}
		// 	}
		// 	return districtsString;
		// }

		this.getRecommandCityList = function(){
			return recommandCityList;
		}
	}]);