angular.module('app.address').controller('addressRoomCtrl', ['$stateParams', 'addresses',
    function ($stateParams, addresses) {
        var vm = this;
        params={
            type:'room',
            block:$stateParams.block,
            unit:$stateParams.unit
        }
        addresses.query(params).$promise.then(function(data){
            vm.block = $stateParams.block;
            vm.unit = $stateParams.unit;
            vm.rooms = data.items;
        })
    }
])