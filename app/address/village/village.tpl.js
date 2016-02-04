angular.module('app.address').controller('addressVillageCtrl',['$stateParams','addresses','communityInfo',function($stateParams,addresses,communityInfo){
    var vm=this;
    // params = {
    //     type:'village',
    //     city:$stateParams.city
    // }
    // addresses.query(params).$promise.then(function (data) {
    //     vm.village = data.items;
    //     vm.city = $stateParams.city
    // }, function (data) {
    //     console.log("err!");
    // });
    vm.city = communityInfo.name;
    console.log(vm.city + '22' + communityInfo.name);
}]);