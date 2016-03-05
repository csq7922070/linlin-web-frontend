(function() {
    angular.module('app.repair').controller('repairDetailCtrl', ['$state', '$stateParams', '$timeout', 'repair', '$scope',
        function($state, $stateParams, $timeout, repair, $scope) {
            var vm = this;
            var id =  $stateParams.id;
            $scope.showLoading = true;

            repair.getRepairDetail(id).then(function(data){
                $scope.showLoading = false;
                vm.repair = data;
                if(vm.repair.confirmDate == null){
                    vm.repair.confirmDate = vm.repair.finishDate;
                }
            }, function(reason){
                $scope.showLoading = false;
                alert(errorLog.getErrorMessage(reason));
            })

            vm.confirm = function(id) {
                $scope.showLoading = true;
                repair.saveRepairDetailComfirm(id).then(function(data){
                   $scope.showLoading = false;
                    vm.repair = data;
                    if(vm.repair.confirmDate == null){
                        vm.repair.confirmDate = vm.repair.finishDate;
                    }
                    $scope.showSuccess = true;
                    $scope.onSuccessClose = function() {
                        $state.go('repair');
                    }
                },function(){
                    $scope.showLoading = true;
                    $scope.showError = true;
                })
            };            
        }
    ]);
})();
