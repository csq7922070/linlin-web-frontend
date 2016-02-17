angular.module('app.address').controller('addressVillageCtrl',
    ['$stateParams','addresses','communityInfo','addressInfo',
    function($stateParams,addresses,communityInfo, addressInfo){
    var vm=this;
    if($stateParams.city){
        addressInfo.city = $stateParams.city;
    }
    addressInfo.village = $stateParams.village;
    params = {
        type:'community',
        city:addressInfo.city
    }
    addresses.query(params).$promise.then(function (data) {
        vm.villages = data.items;
        vm.city = $stateParams.city
    }, function (data) {
        // console.log("err!");
        alert(errorLog.getErrorMessage(data));
    });
    console.log("addressInfo注入");
    console.log(addressInfo);
}]);