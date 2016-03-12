angular.module('app.repair').controller('repairListCtrl', ['$timeout', '$state', 'errorLog','$scope','repair',
    function ($timeout, $state, errorLog,$scope,repair) {

        var vm = this;
        vm.currentPage = 0;
        vm.pageSize = 10;
        vm.repairList = [];
        var params = {};
        $scope.showLoading = true;

        $scope.repairDevices = [
            {id : 1,name : '开换锁',url :  'images/device_01.png'},
            {id : 2,name : '供电照明',url :  'images/device_02.png'},
            {id : 3,name : '抽水马桶',url :  'images/device_03.png'},
            {id : 4,name : '上/下水管道',url :  'images/device_04.png'},
            {id : 5,name : '门窗维修',url :  'images/device_05.png'},
            {id : 6,name : '房屋主体',url :  'images/device_06.png'},
            {id : 7,name : '电梯/门禁',url :  'images/device_07.png'},
            {id : 8,name : '供暖设施',url :  'images/device_08.png'},
            {id : 9,name : '其他',url : 'images/device_09.png'}
        ];
        $scope.currentrepairDevices = [];

        function load(goPage, limit) {
            if (goPage > vm.numberOfPages || vm.currentPage == goPage || goPage < 1 || vm.busy) {
                return;
            } else {
                repair.getRepairList(limit,goPage).then(function(data){
                    $scope.showLoading = false;
                    Array.prototype.push.apply(vm.repairList,data.items);
                    vm.numberOfPages = Math.ceil(data.count / vm.pageSize);
                    vm.currentPage = goPage;
                    vm.busy = false;
                    if(vm.repairList.length == 0){
                        $scope.repairAddShow = true;
                    }
                }, function(reason){
                    $scope.showLoading = false;
                    alert(errorLog.getErrorMessage(reason));
                })
            }
        }
        load(1, vm.pageSize);

        $scope.refreshRepairList = function(){
            load(vm.currentPage+1, vm.pageSize);
        }

        $scope.onRepairDeviceComplete = function(repairDevice){
            console.log(repairDevice);
            repair.repairDevice = repairDevice.name;
            repair.repairDeviceId = repairDevice.id;
            $scope.repairAddShow = true;
        }

        $scope.onRepairAddComplete = function(){
            vm.currentPage = 0;
            vm.repairList = [];
            load(1,8);
        }
    }
]);
