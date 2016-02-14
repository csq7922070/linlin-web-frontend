angular.module('app.address').controller('addressRoomCtrl', ['$stateParams','addresses','addressInfo',function ($stateParams, addresses,addressInfo) {
        var vm = this;
        
        if($stateParams.unit){
            addressInfo.unit = $stateParams.unit;
        }
        if($stateParams.block){
            addressInfo.block = $stateParams.block;
        }
        if(addressInfo.unit){
            $stateParams.city = addressInfo.city;
            $stateParams.village = addressInfo.community;
            $stateParams.block = addressInfo.block;
            $stateParams.unit = addressInfo.unit;
        }
        if(addressInfo.unit == null){
            $stateParams.city = addressInfo.city;
            $stateParams.village = addressInfo.community;
            $stateParams.block = addressInfo.block;
        }
        params={
            type:'room',
            city:$stateParams.city,
            community:$stateParams.village,
            block:$stateParams.block,
            unit:$stateParams.unit
        }
        addresses.query(params).$promise.then(function(data){
            vm.city = addressInfo.city
            vm.village = addressInfo.community;
            vm.block = addressInfo.block;
            vm.unit = addressInfo.unit;
            vm.rooms = data.items;
        })
        console.log(22);
        console.log($stateParams);
        console.log("addressInfo注入");
        console.log(addressInfo);
    }
])