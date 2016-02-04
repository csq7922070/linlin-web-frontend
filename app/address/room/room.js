angular.module('app.address').controller('addressRoomCtrl', ['$stateParams', 'addresses',
    function ($stateParams, addresses) {
        var vm = this;
        params={
            type:'room',
            // city:$stateParams.city,
            // village:$stateParams.village,
            block:$stateParams.block,
            unit:$stateParams.unit
        }
        addresses.query(params).$promise.then(function(data){
            // vm.city = $stateParams.city
            // vm.village = $stateParams.village
            vm.block = $stateParams.block;
            vm.unit = $stateParams.unit;
            vm.rooms = data.items;
        })
    }
])