myApp.directive('cAddressList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onComplete: '&',
            addressList: '=',
            mode:'@',//browse or select mode，默认是select
            isModal:'@'//"true" or "false"代表该指令是否在页面上以模态指令状态显示，默认值为"true"
        },
        templateUrl: 'tpl/common/directives/address/c-address-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($scope, $rootScope,$stateParams, $state, addresses,errorLog,addressInfo,userInfo,address,modalSvc) {
            $scope.mode = "select";
            $scope.isModal = "true";

            var modal = null;
            $scope.$watch("show", function(newVal,oldVal){
                if(newVal){
                    if($scope.isModal=="true"){
                        if(!modal){
                            modal = {scope:$scope};
                        }
                        modalSvc.addModal(modal);
                    }
                }
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
                if($scope.isModal=="true"){
                    modalSvc.removeModal(modal);
                }
                $scope.onComplete();
            }

            $scope.addAddress = function(){
                $scope.showContent = false;
                $scope.showAddressEdit = true;
            }

            $scope.$watch("showAddressEdit", function(newVal,oldVal){
                if(!newVal){
                    $scope.showContent = true;
                }
            });

            $scope.onEditAddressComplete = function(){
                // console.log("onEditAddressComplete");
                $scope.showContent = true;
                if($scope.mode == "select"){
                    var selected = addressInfo.getSelectedAddress();
                    $scope.selectAddress(selected);
                }
            }

            if($scope.addressList && $scope.addressList.length == 0){
                $scope.addAddress();
            }
        }
    }
});