angular.module('app.address').controller('addressBlockCtrl',
    ['$stateParams','addresses', 'addressInfo','$state',
    function($stateParams,addresses,addressInfo,$state){
    var vm = this;
    var params = {
        type: "block",
        city:addressInfo.city,
        community:addressInfo.community
    }
    addresses.query(params).$promise.then(function (data) {
        vm.blocks = data.items;
    }, function (data) {
        console.log("err!");
    });

    vm.changeBlock = function(block){
        addressInfo.block = block.block;
        if(block.type == 2){
            $state.go("address-unit");
        }else if(block.type == 1){
            addressInfo.unit = "";
            $state.go("address-room");
        }else if(block.type == 0){
            addressInfo.unit = "";
            addressInfo.room = null;
            $state.go("address-edit");
        }
    }
}])