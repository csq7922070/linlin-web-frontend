angular.module('app.control')
	.service('control', ['$q','$http','$timeout', '$location', 'errorLog', 'communityInfo', 'appState', '$state',
		'appType',
		function($q,$http,$timeout, $location, errorLog, communityInfo, appState, $state,appType){
			var routeState = null;

			this.startChangeState = function(event, toState, toParams, fromState, fromParams){
				var destStateName = toState.name;
				if(appType == "app" && destStateName == "home"){
					event.preventDefault();
					$state.go("home-nav");
				}
			}

			this.storageRouteState = function(state){
				routeState = state;
			}

			this.getRouteState = function(){
				return routeState;
			}
	}]);