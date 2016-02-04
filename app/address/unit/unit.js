angular.module('app.address').controller('addressUnitCtrl',['$stateParams','addresses',function($stateParams,addresses){
    var vm=this;
    params = {
        type:'unit',
        // city:$stateParams.city,
        // village:$stateParams.village,
        block:$stateParams.block
    }
    addresses.query(params).$promise.then(function (data) {
        vm.units = data.items;
        // vm.city = $stateParams.city
        // vm.village = $stateParams.village
        vm.block = $stateParams.block;
    }, function (data) {
        console.log("err!");
    });
}]);