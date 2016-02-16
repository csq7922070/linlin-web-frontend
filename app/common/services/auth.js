angular.module('app.auth')
	.service('auth', ['$q','$http','$timeout', '$location', 'errorLog', 'communityInfo', 'appState', '$state',
		function($q,$http,$timeout, $location, errorLog, communityInfo, appState, $state){
			this.startChangeState = function(event, toState, toParams, fromState, fromParams){
				var destStateName = toState.name;
				if(!appState.visited && destStateName != "auto-location"){
					event.preventDefault();
					$state.go('auto-location');
					return;
				}
				if(!communityInfo.auth && destStateName == "address-list"){
					alert("好可惜，您所在的小区还没有开通此项服务哦~");
					event.preventDefault();
				}
			}
	}]);