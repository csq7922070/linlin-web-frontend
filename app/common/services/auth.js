angular.module('app.auth')
	.service('auth', ['$q','$http','$timeout', '$location', 'errorLog', 'communityInfo', 'appState', '$state',
		'account','address','errorLog',
		function($q,$http,$timeout, $location, errorLog, communityInfo, appState, $state,account,address,errorLog){
			var routeState = null;

			this.startChangeState = function(event, toState, toParams, fromState, fromParams){
				var destStateName = toState.name;
				if(destStateName == "bill" || destStateName == "repair" 
					|| destStateName == "complain" || destStateName == "notice"){
					if(!account.hasLogin()){
						routeState = {
							toState: toState,
							toParams: toParams,
							fromState: fromState,
							fromParams: fromParams
						};
						event.preventDefault();
						$state.go("login");
						return;
					}
					if(!address.hasAddress()){
						routeState = {
							toState: toState,
							toParams: toParams,
							fromState: fromState,
							fromParams: fromParams
						};
						event.preventDefault();
						$state.go("address-edit");
						return;
					}
				}
			}

			this.getRouteState = function(){
				return routeState;
			}
	}]);