angular.module('app.location')
	.service('communitySearch', [function(){
		this.cmmList = null;
		var max = 10;
		this.searchCommunity = function(communityName){
			console.log("searchCommunity...");
			var result = [];
			if(this.cmmList && communityName){
				for(var i = 0;i<this.cmmList.length;i++){
					var item = this.cmmList[i];
					if(item.name.indexOf(communityName) >= 0){
						item.title = item.city + ", " + item.name;
						result.push(item);
					}
					if(result.length >= max){
						break;
					}
				}
			}
			return result;
		}
	}]);