(function() {
    angular.module('app.notice').controller('noticeListCtrl', ['notices',
        function(notices) {
            var vm = this;
            vm.currentPage = 0;
            vm.pageSize = 10;
            vm.notices = [];
            vm.load = function(goPage, limit) {
                if (goPage > vm.numberOfPages || vm.currentPage == goPage || goPage < 1 || vm.busy) {
                    return;
                } else {
                    vm.busy = true;
                    params = {
                        offset: vm.pageSize * (goPage - 1),
                        limit: vm.pageSize,
                        openid: sessionStorage.getItem("openid")
                    }
                    notices.query(params).$promise.then(function(data) {
                        vm.numberOfPages = Math.ceil(data.count / vm.pageSize);
                        vm.currentPage = goPage;
                        vm.busy = false;
                         Array.prototype.push.apply(vm.notices,data.items);
                    });
                }
            }
            vm.load(1, vm.pageSize);
        }
    ]);
})();
