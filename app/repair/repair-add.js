(function() {
    angular.module('app.repair').controller('repairAddCtrl', ['$timeout', '$state', '$http', 'repairs','address','$scope','addressInfo',
        function($timeout, $http, $state, repairs, address, $scope, addressInfo) {
            var vm = this;

            vm.mask_close = function() {
                vm.suc_show = false;
            }
            vm.mask_err_close = function() {
                vm.err_show = false;
            }
            vm.submitForm = function() {
                vm.repair.device = $scope.currentDevice.name;
                vm.repair.communityId = $scope.defaultcommunityId;
                vm.repair.block = $scope.defaultblock;
                vm.repair.unit = $scope.defaultunit;
                vm.repair.room = $scope.defaultroom;
                vm.repair.openid=sessionStorage.getItem("openid");
                params = vm.repair;
                repairs.save(params).$promise.then(successcb, errcb);
            }

            function successcb() {
                vm.suc_show = true;
                $timeout(function() {
                    vm.suc_show = false;
                    $state.go("repair");
                }, 3000);
            }

            function errcb() {
                vm.err_show = true;
                $timeout(function() {
                    vm.err_show = false;
                }, 3000);
            }

            $scope.decives=[{name:'请选择报修设备'},{name:'开/换锁'},{name:'供电照明'},{name:'抽水马桶'},{name:'上/下水管道'},{name:'门窗维修'},{name:'房屋主体'},{name:'电梯/门禁'},{name:'供暖设施'},{name:'其他'}];
            $scope.decives.push();
            $scope.currentDevice = $scope.decives[0];

            address.getDefaultAddress().then(function(data){
                console.log('111');
                console.log(data);
                $scope.defaultcity = data.city;
                $scope.defaultcommunity = data.community;
                $scope.defaultcommunityId = data.communityId;
                $scope.defaultblock = data.block;
                $scope.defaultunit = data.unit;
                $scope.defaultroom = data.room;
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
                $scope.defaultcity = addressInfo.city;
                $scope.defaultcommunity = addressInfo.community;
                $scope.defaultcommunityId = addressInfo.communityId;
                $scope.defaultblock = addressInfo.block;
                $scope.defaultunit = addressInfo.unit;
                $scope.defaultroom = addressInfo.room;
            }
        }
    ]);
})();
