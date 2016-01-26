(function() {
    angular.module('app.notice').controller("noticeDetailCtrl", ['$stateParams', 'notices',
        function($stateParams, notices) {
            var vm = this;
            notices.get({
                id: $stateParams.id
            }).$promise.then(function(data) {
                vm.notice = data;
            })
        }
    ]);
})();
