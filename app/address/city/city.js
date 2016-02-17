angular.module('app.address').controller('addressCityCtrl',['$stateParams','addresses','communityInfo','addressInfo', 
    'errorLog','$state',
    function($stateParams,addresses,communityInfo, addressInfo,errorLog,$state){
    var vm=this;
    var params = {
        type:'city'
    }
    addresses.query(params).$promise.then(function (data) {
        vm.cities = data.items;
    }, function (data) {
        // console.log("err!");
        alert(errorLog.getErrorMessage(data));
    });
    vm.changeCity = function(city){
        addressInfo.city = city;
        $state.go("address-village");
    }
}]);