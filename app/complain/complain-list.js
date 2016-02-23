angular.module('app.complain').controller('complainListCtrl', ['complains', 'errorLog','userInfo', 
    function (complains, errorLog,userInfo) {
        var vm = this;
        vm.currentPage = 0;
        vm.pageSize = 10;
        var params = {};
        vm.complains = [];
        vm.load = function (goPage, limit) {
            if (goPage > vm.numberOfPages || vm.currentPage == goPage || goPage < 1 || vm.busy) {
                return;
            } else {
                vm.busy = true;
                params = {
                    offset: vm.pageSize * (goPage - 1),
                    limit: vm.pageSize,
                    openid: userInfo.getOpenIdSync(),
                    queryType: 'openid'
                };
                complains.query(params).$promise.then(function (data) {
                    vm.numberOfPages = Math.ceil(data.count / vm.pageSize);
                    vm.currentPage = goPage;
                    vm.busy = false;
                     Array.prototype.push.apply(vm.complains,data.items);
                }, function (reason) {
                    alert(errorLog.getErrorMessage(reason));
                })
            }
        }
        vm.load(1, vm.pageSize);
    }
]);