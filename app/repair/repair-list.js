angular.module('app.repair').controller('repairListCtrl', ['$timeout', '$state', 'repairs',
    function ($timeout, $state, repairs) {
        var vm = this;
        vm.currentPage = 0;
        vm.pageSize = 10;
        vm.suc_show = false;
        vm.err_show = false;
        vm.repairs = [];
        var params = {};

        vm.load = function (goPage, limit) {
            if (goPage > vm.numberOfPages || vm.currentPage == goPage || goPage < 1 || vm.busy) {
                return;
            } else {
                params = {
                    offset: limit * (goPage - 1),
                    limit: limit,
                    openid: sessionStorage.getItem("openid"),
                    queryType: 'openid'
                };

                repairs.query(params).$promise.then(function (data) {
                    vm.numberOfPages = Math.ceil(data.count / vm.pageSize);
                    vm.currentPage = goPage;
                    vm.busy = false;
                    Array.prototype.push.apply(vm.repairs, data.items);
                }, function (data) {
                    console.log("err!");
                });
            }
        }

        vm.confirm = function (id) {
            params = {
                id: id,
                state: 3
            };
            repairs.save(params).$promise.then(function () {
                successcb()
            }, function () {
                errcb()
            });
        }

        function successcb() {
            vm.suc_show = true;
            $timeout(function () {
                vm.suc_show = false;
                $state.go("repair", {}, {
                    reload: true
                });
            }, 3000);
        }

        function errcb() {
            vm.err_show = true;
            $timeout(function () {
                vm.err_show = false;
            }, 3000);
        }

        vm.load(1, vm.pageSize);
    }
]);
