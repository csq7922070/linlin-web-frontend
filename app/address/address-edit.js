angular.module('app.address').controller('addressEditCtrl', ['$stateParams', '$state','auth','$scope','control',
    function ($stateParams, $state,auth,$scope,control) {
        $scope.onEditAddressComplete = function(){
            console.log("onEditAddressComplete");
            var routeState = control.getRouteState();
            console.log("addressEdit go:");
            console.log(routeState.toState);
            $state.go(routeState.toState.name, routeState.toParams);
        }
    }
])