myApp.directive('cAddressList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onComplete: '&',
            addressList: '='
        },
        templateUrl: 'tpl/common/directives/address/c-address-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($scope, $rootScope,$stateParams, $state, addresses,errorLog,addressInfo) {
            $scope.deleteAddress = function (house) {
                $scope.sure_delete = true;
                $scope.sure = function () {
                    $scope.sure_delete = false;
                    var params = {
                        id: house.id,
                        openid:sessionStorage.getItem("openid")
                    }
                    addresses.delete(params).$promise.then(function (data) {
                        house.rowState=1;
                    }, function (data) {
                    })
                }
            };

            $scope.cancel = function () {
                $scope.sure_delete = false;
            }

            $scope.setDefaultAddress = function (house) {
                if (house.active == 0) {
                    return;
                }
                var params = {
                    id: house.id,
                    openid: sessionStorage.getItem("openid")
                }
                addresses.save(params).$promise.then(function () {
                    clearAllDefaultTag();
                    house.active = 0;
                }, function (data) {
                })
            }

            function clearAllDefaultTag(){
                for(var i = 0;i<$scope.addressList.length;i++){
                    var item = $scope.addressList[i];
                    item.active = 1;
                }
            }

            $scope.selectAddress = function(house){
                addressInfo.city = house.city;
                addressInfo.community = house.community;
                addressInfo.block = house.block;
                addressInfo.unit = house.unit;
                addressInfo.roomInfo = {
                    id:house.id,
                    room:house.room,
                    ownerName:house.ownerName,
                    initial: house.initial                    
                };
                $scope.show = false;
                $scope.onComplete();
            }

            $scope.addAddress = function(){
                $scope.showAddressEdit = true;
            }

            $scope.onEditAddressComplete = function(){
                console.log("onEditAddressComplete");
            }
        }
    }
});