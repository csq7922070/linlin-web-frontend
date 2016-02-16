angular.module('app.address').controller('addressCtrl', ['$state','$scope', '$stateParams', 'addresses','communityInfo',
    function ($state,$scope,$stateParams, addresses,communityInfo) {
        var vm = this;
        vm.city = communityInfo.name;
        vm.village = communityInfo.name+1;
        vm.add_newaddress = function () {
            console.log("触发");
            params = {
                // community: "阿尔卡迪亚",
                city: $stateParams.city,
                community: $stateParams.village,
                block: $stateParams.block,
                unit: $stateParams.unit,
                room: $stateParams.room,
                openid: sessionStorage.getItem("openid"),
                houseId: $stateParams.id,
                initial: $stateParams.initial
            }
            addresses.save(params).$promise.then(function (data) {
                console.log("后台添加地址成功");
            }, function (data) {
                console.log("后台添加地址失败");
            });
        }
        console.log("city" + $stateParams.city+ "community" + $stateParams.village + "block" + $stateParams.block + " unit" + $stateParams.unit + " room" + $stateParams.room);
        console.log("succees");
        vm.city = $stateParams.city;
        vm.village = $stateParams.village;
        vm.block = $stateParams.block;
        vm.unit = $stateParams.unit;
        vm.room = $stateParams.room;
        //添加业主姓名与id
        vm.username = $stateParams.username;
        vm.id = $stateParams.id;
        console.log("username:" + vm.username + " id:" + vm.id);
        console.log($stateParams);
        console.log($stateParams.village);
        console.log($stateParams.initial);

        $scope.sss = 'ccc';

        $scope.GoaddressUnit = function() {
            if(vm.unit){
                $state.go('address-unit');
            }else{
                // $scope.sss = 'bgclick'
            }
        }

        $scope.GoaddressRoom = function() {
            if(vm.room){
                $state.go('address-room');
            }
        }
        
        if(!vm.unit){
            $scope.sss = 'bgclick'
        }

        if(!vm.room){
            $scope.ccc = 'bgclick'
        }
    }
]);
