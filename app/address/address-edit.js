angular.module('app.address').controller('addressCtrl2', ['$stateParams', 'addresses','communityInfo','addressInfo',
    function ($stateParams, addresses,communityInfo,addressInfo) {
        var vm = this;
        vm.city = communityInfo.city;
        vm.village = communityInfo.name;
        addressInfo.city = communityInfo.city;
        addressInfo.community = communityInfo.name;
        console.log("addressInfo注入city与community");
        console.log(addressInfo)
    }
]);
