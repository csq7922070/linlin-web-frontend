angular.module('app.complain').controller('complainListCtrl', ['errorLog','userInfo', 'complain', '$scope','userInfo',
    function (errorLog, userInfo, complain, $scope,userInfo) {
        userInfo.init();//微信参数只会在公众号第一个页面传入
        //
        var vm = this;
        vm.currentPage = 0;
        vm.pageSize = 10;
        vm.complainList = [];
        $scope.showLoading = true;
        $scope.complainAddShow = false;
        $scope.complainListShow = true;
        function load(goPage, limit) {
            if (goPage > vm.numberOfPages || vm.currentPage == goPage || goPage < 1 || vm.busy) {
                $scope.showLoading = false;
                return;
            } else {
                complain.getComplainList(goPage,limit).then(function(data){
                    $scope.showLoading = false;
                    // Array.prototype.push.apply(vm.complainList,data);
                    vm.complainList = data;
                    var total = complain.getComplainTotal();
                    vm.numberOfPages = Math.ceil(total / vm.pageSize);
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
            // vm.complainList = [];
            console.log('dsfhdas ');
            $scope.showLoading = true;
            load(1, vm.pageSize);
        }

        $scope.complainAdd = function(){
            $scope.complainAddShow = true;
        }

    }
]);