angular.module('app.address').controller('addressUnitCtrl',['$stateParams','addresses',function($stateParams,addresses){
    var vm=this;
    params = {
        type:'unit',
        block:$stateParams.block
    }
    addresses.query(params).$promise.then(function (data) {
        vm.units = data.items;
        vm.block = $stateParams.block;
    }, function (data) {
        console.log("err!");
    });
}])