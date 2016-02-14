angular.module('app.address').controller('addressVillageCtrl',
    ['$stateParams','addresses','communityInfo','addressInfo',
    function($stateParams,addresses,communityInfo, addressInfo){
    var vm=this;
    params = {
        type:'community',
        city:addressInfo.city
    }
    if($stateParams.city){
        addressInfo.city = $stateParams.city;
    }
    addressInfo.village = $stateParams.village;
    addresses.query(params).$promise.then(function (data) {
        vm.villages = data.items;
        vm.city = $stateParams.city
    }, function (data) {
        console.log("err!");
    });
    console.log("addressInfo注入");
    console.log(addressInfo);
}]);