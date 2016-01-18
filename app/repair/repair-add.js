(function() {
    angular.module('app.repair').controller('repairAddCtrl', ['$timeout', '$state', 'repairs',
        function($timeout, $state, repairs) {
            var vm = this;

            vm.mask_close = function() {
                vm.suc_show = false;
            }
            vm.mask_err_close = function() {
                vm.err_show = false;
            }
            vm.submitForm = function() {
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
        }
    ]);
})();
