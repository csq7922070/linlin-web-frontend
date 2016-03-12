angular.module('app.address').controller('addressEditCtrl', ['$stateParams', '$state','auth',
	'$scope','control','addressInfo',
    function ($stateParams, $state,auth,$scope,control,addressInfo) {
    	addressInfo.init();
        $scope.onEditAddressComplete = function(){
            var routeState = control.getRouteState();
            $state.go(routeState.toState.name, routeState.toParams);
        }
    }
])