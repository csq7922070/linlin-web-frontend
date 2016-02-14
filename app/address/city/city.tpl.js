angular.module('app.address').controller('addressCityCtrl',['$stateParams','addresses','communityInfo','addressInfo', function($stateParams,addresses,communityInfo, addressInfo){
    var vm=this;
    params = {
        type:'city'
    }
    addresses.query(params).$promise.then(function (data) {
        vm.cities = data.items;
    }, function (data) {
        console.log("err!");
    });
    vm.city = $stateParams.city;
    addressInfo.city = $stateParams.city;
    console.log("addressInfo注入");
    console.log(addressInfo);
}]);