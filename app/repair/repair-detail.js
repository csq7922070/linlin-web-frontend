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
                $scope.repairIconShow = true;
                $scope.onRpeairIconComplete = function(iconId){
                    params = {
                        id : id,
                        score : iconId,
                        state: 3
                    }
                    // console.log(params);
                    
                    repair.saveRepairDetailComfirm(params).then(function(data){
                       $scope.showLoading = false;
                        vm.repair = data;
                        if(vm.repair.confirmDate == null){
                            vm.repair.confirmDate = vm.repair.finishDate;
                        }
                        $scope.repairIconShow = false;
                        $scope.showSuccess = true;
                        $scope.onSuccessClose = function() {
                            $state.go('repair');
                        }
                        $scope.repairIconShow = false;
                    },function(){
                        $scope.showLoading = true;
                        $scope.showError = true;
                    })
                }
                    
            };            
        }
    ]);
})();
