(function () {
    angular.module('app.complain').controller('complainDetailCtrl', ['$stateParams', 'errorLog', 'complain', '$scope',
        function ($stateParams, errorLog, complain ,$scope) {
            var vm = this;
            $scope.showLoading = true;

            var id =  $stateParams.id;
            complain.getComplainDetail(id).then(function(data){
                $scope.showLoading = false;
                vm.complain = data;
            }, function(reason){
                $scope.showLoading = false;
                alert(errorLog.getErrorMessage(reason));
            })
        }
    ])
})();