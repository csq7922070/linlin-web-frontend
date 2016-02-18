angular.module('app.address').controller('addressUnitCtrl',['$stateParams','addresses','addressInfo','$state',
    function($stateParams,addresses,addressInfo,$state){
        var vm=this;
        var params = {
            type:'unit',
            city:addressInfo.city,
            community:addressInfo.community,
            block:addressInfo.block
        }
        addresses.query(params).$promise.then(function (data) {
            vm.units = data.items;
        }, function (data) {
            console.log("err!");
        });
        vm.changeUnit = function(unit){
            addressInfo.unit = unit;
            $state.go("address-room");
        }
}]);