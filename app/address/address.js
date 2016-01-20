angular.module('app.address').controller('addressCtrl', ['$stateParams', 'addresses',
    function ($stateParams, addresses) {
        var vm = this;
        vm.add_newaddress = function () {
            console.log("触发")
            params = {
                community: "阿尔卡迪亚",
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
        console.log("block" + $stateParams.block + " unit" + $stateParams.unit + " room" + $stateParams.room);
        console.log("succees");
        vm.block = $stateParams.block;
        vm.unit = $stateParams.unit;
        vm.room = $stateParams.room;
        //添加业主姓名与id
        vm.username = $stateParams.username;
        vm.id = $stateParams.id;
        console.log("username:" + vm.username + " id:" + vm.id);
        console.log($stateParams.initial);
    }
]);
