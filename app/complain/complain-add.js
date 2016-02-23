angular.module('app.complain').controller('complainAddCtrl', ['$timeout', '$state', 'complains', 'address', 'addressInfo', '$scope',
    function ($timeout, $state, complains, address, addressInfo, $scope) {
        var vm = this;
        vm.mask_close = function () {
            vm.suc_show = false;
        }
        vm.mask_err_close = function () {
            vm.err_show = false;
        }
        vm.submitForm = function () {
            vm.complain.communityId = addressInfo.communityId;
            vm.complain.openid = sessionStorage.getItem("openid");
            params = vm.complain;
            complains.save(params).$promise.then(successcb, errcb);
        }
        function successcb() {
            vm.suc_show = true;
            $timeout(function () {
                vm.suc_show = false;
                $state.go("complain");
            }, 3000);
        }

        function errcb() {
            vm.err_show = true;
            $timeout(function () {
                vm.err_show = false;
            }, 3000)
        }

        address.getDefaultAddress().then(function(data){
            console.log(data);
            $scope.defaultcity = data.city;
            $scope.defaultcommunity = data.community;
        },function(reason){
            alert(reason.errorCode+","+reason.errorMessage);
        });
        $scope.changeaddress = function(){
            $scope.show = false;
            $scope.showAddressList = true;
            address.getAddressList().then(function(data){
                $scope.addressList = data;
                console.log($scope.addressList);
            },function(reason){
                $scope.showAddressList = false;
                alert(reason.errorCode+","+reason.errorMessage);
            });
        }

        $scope.onSelectAddressComplete = function(){
            $scope.show = true;
            console.log("onSelectAddressComplte");
            console.log(addressInfo);
            $scope.defaultcommunity = addressInfo.community;
            console.log(addressInfo.communityId);
        }
    }
]);
