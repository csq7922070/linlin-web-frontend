(function() {
    angular.module('app.notice').controller("noticeDetailCtrl", ['$stateParams', 'notices', 'errorLog',
        function($stateParams, notices, errorLog) {
            var vm = this;
            notices.get({
                id: $stateParams.id
            }).$promise.then(function(data) {
                vm.notice = data;
            }, function(reason){
                alert(errorLog.getErrorMessage(reason));
            })
        }
    ]);
})();
