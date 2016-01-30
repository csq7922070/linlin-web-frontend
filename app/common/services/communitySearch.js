angular.module('app.location')
	.service('communitySearch', [function(){
		this.cmmList = null;

		this.searchCommunity = function(communityName){
			console.log("searchCommunity...");
			var result = [];
			if(this.cmmList){
				if(communityName){
					result = this.cmmList;
				}
			}
			return result;
		}
	}]);