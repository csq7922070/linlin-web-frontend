angular.module('app.address').controller('addressCityCtrl',['$stateParams','addresses','communityInfo',function($stateParams,addresses,communityInfo){
    var vm=this;
    // params = {
    //     type:'city',
    // }
    // addresses.query(params).$promise.then(function (data) {
    //     vm.city = data.items;
    // }, function (data) {
    //     console.log("err!");
    // });
    vm.city = communityInfo.name;
    console.log(vm.city + '22' + communityInfo.name);
}]);