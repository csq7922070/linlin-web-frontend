angular.module('app.auth')
	.service('auth', ['$q','$http','$timeout', '$location', 'errorLog', '$state',
		'account','address','errorLog','control',
		function($q,$http,$timeout, $location, errorLog, $state,account,address,errorLog,
			control){
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
						control.storageRouteState(routeState);
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
						control.storageRouteState(routeState);
						event.preventDefault();
						$state.go("address-edit");
						return;
					}
				}
			}
	}]);