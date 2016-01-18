(function () {
    angular.module('app.complain').controller('complainAddCtrl', ['$timeout', '$state', 'complains',
        function ($timeout, $state, complains) {
            var vm = this;
            vm.mask_close = function () {
                vm.suc_show = false;
            }
            vm.mask_err_close = function () {
                vm.err_show = false;
            }
            vm.submitForm = function () {
                vm.complain.openid=sessionStorage.getItem("openid");
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
        }
    ]);
})();
