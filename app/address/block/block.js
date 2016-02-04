angular.module('app.address').controller('addressBlockCtrl',['$stateParams','addresses',function($stateParams,addresses){
    var vm=this;
    params = {
        type: "block",
        // city:$stateParams.city,
        // village:$stateParams.village
    }
    addresses.query(params).$promise.then(function (data) {
        vm.blocks = data.items;
        // vm.city = $stateParams.city
        // vm.village = $stateParams.village
    }, function (data) {
        console.log("err!");
    });
}])