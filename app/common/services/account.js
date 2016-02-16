angular.module('app.account')
	.service('account', ['$q','$http','$timeout','errorLog',
		function($q,$http,$timeout, errorLog){
			this.getAuthCode = function(tel){
				var defer = $q.defer();
				$timeout(function(){
					defer.resolve("1001");
				},1000);
				return defer.promise;
			}
	}]);