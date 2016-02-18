(function() {
    angular.module('app.repair').controller('repairAddCtrl', ['$timeout', '$state', 'repairs','address','$scope',
        function($timeout, $state, repairs, address, $scope) {
            var vm = this;

            vm.mask_close = function() {
                vm.suc_show = false;
            }
            vm.mask_err_close = function() {
                vm.err_show = false;
            }
            vm.submitForm = function() {
                vm.repair.device = $scope.currentDevice.name;
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

            $scope.decives=[{name:'开/换锁'},{name:'供电照明'},{name:'抽水马桶'},{name:'上/下水管道'},{name:'门窗维修'},{name:'房屋主体'},{name:'电梯/门禁'},{name:'供暖设施'},{name:'其他'}];
            $scope.decives.push();
            $scope.currentDevice = $scope.decives[0];

            console.log(address.getDefaultAddress());
            $scope.defaultcommunity = address.getDefaultAddress().community;
            $scope.defaultblock = address.getDefaultAddress().block;
            $scope.defaultunit = address.getDefaultAddress().unit;
            $scope.defaultroom = address.getDefaultAddress().room;
            

        }
    ]);
})();
