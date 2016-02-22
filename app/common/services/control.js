angular.module('app.control')
	.service('control', ['$q','$http','$timeout', '$location', 'errorLog', 'communityInfo', 'appState', '$state',
		'appType',
		function($q,$http,$timeout, $location, errorLog, communityInfo, appState, $state,appType){
			this.startChangeState = function(event, toState, toParams, fromState, fromParams){
				var destStateName = toState.name;
				if(appType == "app" && destStateName == "home"){
					event.preventDefault();
					$state.go("home-nav");
				}
			}
	}]);