angular.module('app.address').controller('addressEditCtrl', ['$stateParams', '$state','auth','$scope','control',
    function ($stateParams, $state,auth,$scope,control) {
        $scope.onEditAddressComplete = function(){
            var routeState = control.getRouteState();
            $state.go(routeState.toState.name, routeState.toParams);
        }
    }
])