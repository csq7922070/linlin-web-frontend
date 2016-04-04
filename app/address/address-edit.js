angular.module('app.address').controller('addressEditCtrl', ['$stateParams', '$state','auth',
	'$scope','control','addressInfo',
    function ($stateParams, $state,auth,$scope,control,addressInfo) {
    	$scope.showAddressEdit = true;
    	
        $scope.onEditAddressComplete = function(){
            var routeState = control.getRouteState();
            $state.go(routeState.toState.name, routeState.toParams);
        }
    }
])