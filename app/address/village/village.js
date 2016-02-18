angular.module('app.address').controller('addressVillageCtrl',
    ['$stateParams','addresses','communityInfo','addressInfo','errorLog','$state',
    function($stateParams,addresses,communityInfo, addressInfo,errorLog,$state){
        var vm=this;
        var params = {
            type:'community',
            city:addressInfo.city
        }
        addresses.query(params).$promise.then(function (data) {
            vm.villages = data.items;
        }, function (data) {
            // console.log("err!");
            alert(errorLog.getErrorMessage(data));
        });
        vm.changeVillage = function(village){
            addressInfo.community = village;
            $state.go("address-block");
        }
}]);