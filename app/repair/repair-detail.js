(function() {
    angular.module('app.repair').controller('repairDetailCtrl', ['$state', '$stateParams', '$timeout', 'repairs',
        function($state, $stateParams, $timeout, repairs) {
            var vm = this;
            vm.suc_show = false;
            vm.err_show = false;

            params = {
                'id': $stateParams.id
            };

            repairs.get(params).$promise.then(function(data) {
                vm.repair = data;
            });

            vm.confirm = function(id) {
                params = {
                    id: id,
                    state: 3
                };

                repairs.save(params).$promise.then(function(data) {
                    vm.repair = data;
                    successcb();
                }, errcb);
                // alert('ok');
            };

            function successcb() {
                // vm.suc_show = true;
                // $timeout(function() {
                //     vm.suc_show = false;
                //     $state.go("repair");
                // }, 3000);
                $scope.showSuccess = true;
                $scope.onSuccessClose = function() {
                    $state.go('repair');
                }
            }

            function errcb() {
                // vm.err_show = true;
                // $timeout(function() {
                //     vm.err_show = false;
                // }, 3000);
                $scope.showError = true;
            }
        }
    ]);
})();
