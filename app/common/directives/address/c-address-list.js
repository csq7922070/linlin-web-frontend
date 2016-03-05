myApp.directive('cAddressList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onComplete: '&',
            addressList: '=',
            mode:'='//browse or select mode
        },
        templateUrl: 'tpl/common/directives/address/c-address-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($scope, $rootScope,$stateParams, $state, addresses,errorLog,addressInfo,userInfo,address) {
            $scope.$watch("addressList", function(newVal,oldVal){
                // console.log("directive addressList update:");
                // console.log($scope.addressList);
            });

            $scope.deleteAddress = function (addr) {
                $scope.showDeleteConfirm = true;
                $scope.delete = function () {
                    $scope.showDeleteConfirm = false;
                    address.deleteAddress(addr).then(function (data) {
                    }, function (reason) {
                        alert(errorLog.getErrorMessage(reason));
                    })
                }
            };

            $scope.cancel = function () {
                $scope.showDeleteConfirm = false;
            }

            $scope.setDefaultAddress = function (addr) {
                address.setDefaultAddress(addr).then(function(data){

                },function(reason){
                    alert(errorLog.getErrorMessage(reason));
                });
            }

            $scope.selectAddress = function(addr){
                if($scope.mode != "select"){
                    return;
                }
                addressInfo.selectAddress(addr);
                $scope.show = false;
                $scope.onComplete();
            }

            $scope.addAddress = function(){
                $scope.showContent = false;
                $scope.showAddressEdit = true;
            }

            $scope.onEditAddressComplete = function(){
                // console.log("onEditAddressComplete");
                $scope.showContent = true;
                if($scope.mode == "select"){
                    $scope.show = false;
                    $scope.onComplete();
                }
            }

            if($scope.addressList && $scope.addressList.length == 0){
                $scope.addAddress();
            }
        }
    }
});