angular.module('app.address').controller('addressBlockCtrl',
    ['$stateParams','addresses', 'addressInfo',function($stateParams,addresses,addressInfo){
    var vm=this;
    if($stateParams.village){
        addressInfo.community = $stateParams.village;
    }
    if(!$stateParams.village){
        $stateParams.city = addressInfo.city;
        $stateParams.village = addressInfo.community;
        addressInfo.unit = null;
    }
    params = {
        type: "block",
        city:$stateParams.city,
        community:$stateParams.village
    }
    addresses.query(params).$promise.then(function (data) {
        vm.blocks = data.items;
        vm.city = addressInfo.city;
        vm.village = addressInfo.community;
    }, function (data) {
        console.log("err!");
    });
    console.log("village");
    console.log($stateParams);
    console.log("addressInfo注入");
    console.log(addressInfo);
}])