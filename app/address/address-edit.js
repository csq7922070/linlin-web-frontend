angular.module('app.address').controller('addressCtrl2', ['$state','$scope', '$stateParams', 'addresses','communityInfo','addressInfo',
    function ($state, $scope, $stateParams, addresses,communityInfo,addressInfo) {
        var vm = this;
        vm.city = communityInfo.city;
        vm.village = communityInfo.name;
        addressInfo.city = communityInfo.city;
        addressInfo.community = communityInfo.name;
        console.log("addressInfo注入city与community");
        console.log(addressInfo);

        $scope.GoaddressUnit = function() {
        	if(vm.unit){
                $state.go('address-unit');
            }
        }

        $scope.GoaddressRoom = function() {
        	if(vm.room){
                $state.go('address-room');
            }
        }
        
        $scope.sss = 'ccc';

        if(!vm.unit){
            $scope.sss = 'bgclick'
        }

        if(!vm.room){
            $scope.ccc = 'bgclick'
        }
    }
]);
