angular.module('app.address').controller('addressListCtrl', ['$stateParams', '$state','auth','$scope',
    'address',
    function ($stateParams, $state,auth,$scope,address) {
        address.getAddressList().then(function(data){
            $scope.addressList = data;
        },function(reason){
            alert(reason.errorCode+","+reason.errorMessage);
        });

        $scope.onSelectAddressComplete = function(){
            $state.go($stateParams.toStateName);
            console.log("onSelectAddressComplte");
        }
    }
])