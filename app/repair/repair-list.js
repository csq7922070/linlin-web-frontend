skhControllers.controller('repairListCtrl', ['$scope', '$http', '$timeout', '$state', 'repairs', 'curd',
    function($scope, $http, $timeout, $state, repairs, curd) {
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.suc_show = false;
        $scope.err_show = false;
        $scope.repairs = [];
        var params = {};

        $scope.load = function(goPage, limit) {
            if (goPage > $scope.numberOfPages || $scope.currentPage == goPage || goPage < 1 || $scope.busy) {
                return;
            } else {
                params = {
                    offset: limit * (goPage - 1),
                    limit: limit,
                    openid: sessionStorage.getItem("openid"),
                    queryType: 'openid'
                };

                curd.query(repairs, params).$promise.then(function(data) {
                    $scope.numberOfPages = Math.ceil(data.count / $scope.pageSize);
                    $scope.currentPage = goPage;
                    $scope.busy = false;
                    Array.prototype.push.apply($scope.repairs, data.items);
                }, function(data) {
                    console.log("err!");
                });

                // repairStateful.query(params);

                // $scope.$watch("repairStateful.data", function(newVal, oldVal) {
                //     if (newVal != oldVal && newVal != null) {
                //         $scope.repairs = newVal.items;
                //     }
                // });
            }
        }

        $scope.confirm = function(id) {
            params = {
                id: id,
                state : 3
            };

            curd.save(repairs, params).$promise.then(function(data) {
                $scope.suc_show = true;
                $timeout(function() {
                    $scope.suc_show = false;
                    $state.go("repair", {}, {
                        reload: true
                    });
                }, 3000);
            }, function(data) {
                $scope.err_show = true;
                $timeout(function() {
                    $scope.err_show = false;
                }, 3000);
            })
        }

        $scope.load(1, $scope.pageSize);
    }
]);
