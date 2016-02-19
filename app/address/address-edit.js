angular.module('app.address').controller('addressEditCtrl', ['$stateParams', '$state','auth','$scope',
    function ($stateParams, $state,auth,$scope) {
        $scope.onEditAddressComplete = function(){
            console.log("onEditAddressComplete");
            var routeState = auth.getRouteState();
            console.log("addressEdit go:");
            console.log(routeState.toState);
            $state.go(routeState.toState.name, routeState.toParams);
        }
    }
])