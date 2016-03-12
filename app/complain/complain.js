angular.module('app.complain').controller('complainListCtrl', ['errorLog','userInfo', 'complain', '$scope',
    function (errorLog, userInfo, complain, $scope) {
        var vm = this;
        vm.currentPage = 0;
        vm.pageSize = 10;
        vm.complainList = [];
        $scope.showLoading = true;
        $scope.complainAddShow = false;
        $scope.complainListShow = true;
        function load(goPage, limit) {
            if (goPage > vm.numberOfPages || vm.currentPage == goPage || goPage < 1 || vm.busy) {
                return;
            } else {
                complain.getComplainList(goPage,limit).then(function(data){
                    $scope.showLoading = false;
                    Array.prototype.push.apply(vm.complainList,data.items);
                    vm.numberOfPages = Math.ceil(data.count / vm.pageSize);
                    vm.currentPage = goPage;
                    vm.busy = false;
                    if(vm.complainList.length == 0){
                        $scope.complainAddShow = true;
                    }
                }, function(reason){
                    $scope.showLoading = false;
                    alert(errorLog.getErrorMessage(reason));
                })
            }
        }
        load(1, vm.pageSize);

        $scope.refreshComplainList = function(){
            load(vm.currentPage+1, vm.pageSize);
        }

        $scope.onComplainAddComplete = function(){
            vm.currentPage = 0;
            vm.complainList = [];
            load(1,8);
        }

        $scope.complainAdd = function(){
            $scope.complainAddShow = true;
        }

    }
]);