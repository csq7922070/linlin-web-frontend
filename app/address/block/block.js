angular.module('app.address').controller('addressBlockCtrl',['$stateParams','addresses',function($stateParams,addresses){
    var vm=this;
    params = {
        type: "block"
    }
    addresses.query(params).$promise.then(function (data) {
        vm.blocks = data.items;
    }, function (data) {
        console.log("err!");
    });
}])