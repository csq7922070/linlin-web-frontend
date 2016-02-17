angular.module('app.address').controller('addressEditCtrl', ['$state','$scope', '$stateParams', 'addresses','communityInfo','addressInfo',
    function ($state, $scope, $stateParams, addresses,communityInfo,addressInfo) {
        var vm = this;
        if(!addressInfo.city){
            addressInfo.city = communityInfo.city;
            addressInfo.community = communityInfo.name;
        }
        vm.city = addressInfo.city;
        vm.village = addressInfo.community;
        vm.block = addressInfo.block;
        vm.unit = addressInfo.unit;
        vm.room = addressInfo.room ? addressInfo.room.room : "";
        vm.owner = addressInfo.room ? addressInfo.room.ownerName:"";
        vm.roomId = addressInfo.room ? addressInfo.room.id:"";

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
                room: addressInfo.room.room,
                houseId: addressInfo.room.id,
                initial: addressInfo.room.initial,
                openid: sessionStorage.getItem("openid")
            }
            addresses.save(params).$promise.then(function (data) {
                console.log("后台添加地址成功");
            }, function (data) {
                console.log("后台添加地址失败");
            });
        }
    }
]);
