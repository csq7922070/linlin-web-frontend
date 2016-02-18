myApp.directive('cAddressEdit', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: 'tpl/common/directives/address/c-address-edit.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($state, $scope, $stateParams, addresses,communityInfo,addressInfo) {
            var vm = this;
            if(!addressInfo.city){
                addressInfo.city = communityInfo.city;
                addressInfo.community = communityInfo.name;
            }
            vm.city = addressInfo.city;
            vm.village = addressInfo.community;
            vm.block = addressInfo.block;
            vm.unit = addressInfo.unit;
            vm.room = addressInfo.roomInfo ? addressInfo.roomInfo.room : "";
            vm.owner = addressInfo.roomInfo ? addressInfo.roomInfo.ownerName:"";
            vm.roomId = addressInfo.roomInfo ? addressInfo.roomInfo.id:"";

            vm.changeUnit = function() {
                if(vm.unit){
                    $state.go('address-unit');
                }
            }

            vm.changeRoom = function() {
                if(vm.room){
                    $state.go('address-room');
                }
            }
            
            $scope.sss = 'ccc';

            if(!vm.unit){
                $scope.sss = 'bgclick'
            }

            if(!vm.room){
                $scope.ccc = 'bgclick'
            }

            vm.add_newaddress = function () {
                console.log("触发");
                var params = {
                    city: addressInfo.city,
                    community: addressInfo.community,
                    block: addressInfo.block,
                    unit: addressInfo.unit,
                    room: addressInfo.roomInfo.room,
                    houseId: addressInfo.roomInfo.id,
                    initial: addressInfo.roomInfo.initial,
                    openid: sessionStorage.getItem("openid")
                }
                addresses.save(params).$promise.then(function (data) {
                    console.log("后台添加地址成功");
                }, function (data) {
                    console.log("后台添加地址失败");
                });
            }
        }
    }
});