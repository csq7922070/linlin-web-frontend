angular.module('app.address').controller('addressRoomCtrl', ['$stateParams','addresses','addressInfo','$state',
    function ($stateParams, addresses,addressInfo,$state) {
        var vm = this;
        
        var params={
            type:'room',
            city:addressInfo.city,
            community:addressInfo.community,
            block:addressInfo.block,
            unit:addressInfo.unit?addressInfo.unit:""
        }
        addresses.query(params).$promise.then(function(data){
            vm.rooms = data.items;
        })
        vm.changeRoom = function(room){
            addressInfo.roomInfo = room;
            $state.go("address-edit");
        }
    }
])