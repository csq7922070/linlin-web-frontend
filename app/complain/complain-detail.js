angular.module('app.complain').controller('complainDetailCtrl', ['$stateParams', 'errorLog', 'complain', '$scope',
    function ($stateParams, errorLog, complain ,$scope) {
        var vm = this;
        $scope.showLoading = true;

        var id =  $stateParams.id;
        complain.getComplainDetail(id).then(function(data){
            $scope.showLoading = false;
            vm.complain = data;
            if(vm.complain.anonymous == 1){
                vm.complain.mobile = data.mobile.substring(0,3) + '****' +  data.mobile.substring(7,11);
            }
            console.log(vm.complain);
        }, function(reason){
            $scope.showLoading = false;
            alert(errorLog.getErrorMessage(reason));
        });

        vm.confirm = function(id){
            console.log(id);
            var params = {
                id : id,
                state: 2
            }
            complain.getComplainDetailComplete(params).then(function(data){
                $scope.showLoading = false;
                $scope.showSuccess = true;
                vm.complain = data;
                // $scope.onSuccessClose = function() {
                //     $state.go('complain');
                // }
                $scope.repairIconShow = false;
            },function(reason){
                alert(reason.errorCode + reason.errorMessage);
                $scope.showLoading = false;
                $scope.showError = true;
            });
        }
    }
])