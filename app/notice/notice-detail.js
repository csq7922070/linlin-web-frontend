(function() {
    angular.module('app.notice').controller("noticeDetailCtrl", ['$stateParams', 'notice', 'errorLog', '$scope',
        function($stateParams, notice, errorLog ,$scope) {
            var vm = this;
            $scope.showLoading = true;
            id = $stateParams.id;
            
            notice.getNoticeDetail(id).then(function(data){
                $scope.showLoading = false;
                vm.notice = data;
            }, function(reason){
                $scope.showLoading = false;
                alert(errorLog.getErrorMessage(reason));
            })
        }
    ]);
})();
