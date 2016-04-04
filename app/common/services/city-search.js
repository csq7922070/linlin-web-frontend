angular.module('app.location')
	.service('citySearch', [function(){
		this.cityList = null;//format: [{initial,items:[cityName,initial,pinyin]}]
		this.searchCity = function(cityName){//cityName可能是汉字也可能是首字母拼音，比如北京：bj
			var result = [];//format: [{initial,items:[cityName,initial,pinyin]}]
			if(this.cityList && cityName){
				for(var i = 0;i<this.cityList.length;i++){
					var cityGroup = this.cityList[i];
					if(cityGroup.items){
						for(var j = 0;j<cityGroup.items.length;j++){
							var city = cityGroup.items[j];
							if(city.name.indexOf(cityName) >= 0 || city.py.indexOf(cityName)>=0){
								addCityToCityGroups(city, result);
							}
						}
					}
				}
			}
			return result;
		}

		// //共享模块城市列表搜索功能
		// this.shareCityList = null;
		// this.searchShareCity = function(cityName){//cityName可能是汉字也可能是首字母拼音，比如北京：bj
		// 	var result = [];//format: [{}]
		// 	if(this.shareCityList && cityName){
		// 		for(var i = 0;i<this.cityList.length;i++){
		// 			var city = this.cityList[i];
		// 			if(city.name.indexOf(cityName) >= 0 || city.py.indexOf(cityName)>=0){
		// 				result.push(city);
		// 			}
		// 		}
		// 	}
		// 	return result;
		// }

		function addCityToCityGroups(city, cityGroups){
			for(var i = 0;i<cityGroups.length;i++){
				var cityGroup = cityGroups[i];
				if(cityGroup.initial == city.initial){
					cityGroup.items.push(city);
				}
			}
			if(i==cityGroups.length){
				var cityGroup = {
					initial: city.initial,
					items:[city]
				};
				cityGroups.push(cityGroup);
			}
		}
	}]);