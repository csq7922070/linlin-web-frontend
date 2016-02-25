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
                if(vm.repair.confirmDate == null){
                    vm.repair.confirmDate = vm.repair.finishDate;
                }
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
            };



            function successcb() {
                $scope.showSuccess = true;
                $scope.onSuccessClose = function() {
                    $state.go('repair');
                }
            }

            function errcb() {
                $scope.showError = true;
            }
        }
    ]);
})();
