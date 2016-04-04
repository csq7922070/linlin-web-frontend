(function() {
    angular.module('app.notice').controller('noticeCtrl', ['notices', 'errorLog','address', '$scope','$q','userInfo', 'notice',
        function(notices, errorLog, address, $scope, $q, userInfo, notice) {
            userInfo.init();//微信参数只会在公众号第一个页面传入
            //
            var vm = this;
            vm.currentPage = 0;
            vm.pageSize = 10;
            vm.notices = [];
            $scope.showLoading = true;

            vm.load = function (goPage, limit) {
                if (goPage > vm.numberOfPages || vm.currentPage == goPage || goPage < 1 || vm.busy) {
                    return;
                } else {
                     notice.getNoticeList(limit,goPage).then(function(data){
                        $scope.showLoading = false;
                        Array.prototype.push.apply(vm.notices,data.items);
                        vm.numberOfPages = Math.ceil(data.count / vm.pageSize);
                        vm.currentPage = goPage;
                        vm.busy = false;
                    }, function(reason){
                        $scope.showLoading = false;
                        alert(errorLog.getErrorMessage(reason));
                    })
                }
            }
            vm.load(1, vm.pageSize);
        }
    ]);
})();
