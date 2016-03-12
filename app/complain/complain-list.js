// angular.module('app.complain').controller('complainListCtrl', ['errorLog','userInfo', 'complain', '$scope',
//     function (errorLog, userInfo, complain, $scope) {
//         var vm = this;
//         vm.currentPage = 0;
//         vm.pageSize = 10;
//         vm.complains = [];
//         $scope.showLoading = true;

//         vm.load = function (goPage, limit) {
//             if (goPage > vm.numberOfPages || vm.currentPage == goPage || goPage < 1 || vm.busy) {
//                 return;
//             } else {
//                 complain.getComplainList(goPage,limit).then(function(data){
//                     $scope.showLoading = false;
//                     Array.prototype.push.apply(vm.complains,data.items);
//                     vm.numberOfPages = Math.ceil(data.count / vm.pageSize);
//                     vm.currentPage = goPage;
//                     vm.busy = false;
//                 }, function(reason){
//                     $scope.showLoading = false;
//                     alert(errorLog.getErrorMessage(reason));
//                 })
//             }
//         }
//         vm.load(1, vm.pageSize);
//     }
// ]);