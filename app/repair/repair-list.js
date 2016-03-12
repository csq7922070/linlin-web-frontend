// angular.module('app.repair').controller('repairListCtrl', ['$timeout', '$state', 'errorLog','$scope','repair',
//     function ($timeout, $state, errorLog,$scope,repair) {
//         // var vm = this;
//         // vm.currentPage = 0;
//         // vm.pageSize = 10;
//         // vm.repairs = [];
//         // var params = {};
//         // $scope.showLoading = true;

//         // vm.load = function (goPage, limit) {
//         //     if (goPage > vm.numberOfPages || vm.currentPage == goPage || goPage < 1 || vm.busy) {
//         //         return;
//         //     } else {
//         //         repair.getRepairList(limit,goPage).then(function(data){
//         //             $scope.showLoading = false;
//         //             Array.prototype.push.apply(vm.repairs,data.items);
//         //             vm.numberOfPages = Math.ceil(data.count / vm.pageSize);
//         //             vm.currentPage = goPage;
//         //             vm.busy = false;
//         //         }, function(reason){
//         //             $scope.showLoading = false;
//         //             alert(errorLog.getErrorMessage(reason));
//         //         })
//         //     }
//         // }
//         // vm.load(1, vm.pageSize);
//     }
// ]);
