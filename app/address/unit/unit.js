angular.module('app.address').controller('addressUnitCtrl',['$stateParams','addresses','addressInfo',function($stateParams,addresses,addressInfo){
    var vm=this;
    if($stateParams.block){
        addressInfo.block = $stateParams.block;
    }
    if(!$stateParams.block){
        $stateParams.city = addressInfo.city;
        $stateParams.village = addressInfo.community;
        $stateParams.block = addressInfo.block;
    }
    params = {
        type:'unit',
        city:$stateParams.city,
        community:$stateParams.village,
        block:$stateParams.block
    }
    addresses.query(params).$promise.then(function (data) {
        vm.units = data.items;
        vm.city = addressInfo.city;
        vm.village = addressInfo.community;
        vm.block = addressInfo.block;
    }, function (data) {
        console.log("err!");
    });
    console.log("unit");
    console.log($stateParams);
    console.log("addressInfo注入");
    console.log(addressInfo);
}]);