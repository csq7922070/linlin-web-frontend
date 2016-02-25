(function() {
    angular.module('app.notice').controller('noticeListCtrl', ['notices', 'errorLog','address', '$scope','$q','userInfo', 
        function(notices, errorLog, address, $scope, $q, userInfo) {
            var vm = this;
            vm.currentPage = 0;
            vm.pageSize = 10;
            vm.notices = [];

            var defaultcommunityId;
            var defaultDefer = $q.defer();
            
            address.getDefaultAddress().then(function(data){
                defaultcommunityId = data.communityId;
                console.log('ssss');
                console.log(data);
                console.log(defaultcommunityId);
                defaultDefer.resolve(data.communityId);
                if(defaultcommunityId == null){
                    alert('defaultcommunityId == null');
                }
            },function(reason){
                alert(reason.errorCode+","+reason.errorMessage);
            });

            defaultDefer.promise.then(function(data){
                vm.load(1, vm.pageSize);
            },function(reason){
                console.log(reason);
            });
            
            vm.load = function(goPage, limit) {
                if (goPage > vm.numberOfPages || vm.currentPage == goPage || goPage < 1 || vm.busy) {
                    return;
                } else {
                    vm.busy = true;
                    params = {
                        offset: vm.pageSize * (goPage - 1),
                        limit: vm.pageSize,
                        openid: userInfo.getOpenIdSync(),
                        communityId:defaultcommunityId
                    }
                    notices.query(params).$promise.then(function(data) {
                        vm.numberOfPages = Math.ceil(data.count / vm.pageSize);
                        vm.currentPage = goPage;
                        vm.busy = false;
                        console.log('vm');
                        console.log(vm.notices.length);
                         Array.prototype.push.apply(vm.notices,data.items);
                    }, function(reason){
                        alert(errorLog.getErrorMessage(reason));
                    });
                }
            }
            vm.load(1, vm.pageSize);
        }
    ]);
})();
