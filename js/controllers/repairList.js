skhControllers.controller('repairListCtrl', ['$scope', '$http', '$timeout','$state',
    function($scope, $http, $timeout,$state) {
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.suc_show = false;
        $scope.err_show = false;
        $scope.repairs = [];

        $scope.load = function(goPage, limit) {
            if (goPage > $scope.numberOfPages || $scope.currentPage == goPage || goPage < 1 || $scope.busy) {
                return;
            } else {
                $scope.busy = true;
                $http({
                    method: "GET",
                    url: basePath + "/repair/list.do",
                    params: {
                        offset: $scope.pageSize * (goPage - 1),
                        limit: $scope.pageSize,
                        openid: sessionStorage.getItem("openid")
                    }
                }).success(function(data) {
                    $scope.numberOfPages = Math.ceil(data.count / $scope.pageSize);
                    $scope.currentPage = goPage;
                    $scope.busy = false;
                    data.items.forEach(function(r) {
                        $scope.repairs.push(r);
                        r.confirm = function() {
                            $http({
                                method: "POST",
                                url: basePath + "/repair/finish.do",
                                data: {
                                    id: r.id
                                }
                            }).success(function(data) {
                                $scope.suc_show = true;
                                $timeout(function() {
                                    $scope.suc_show = false;
                                    $state.go("repair",{}, {reload: true});
                                }, 3000);

                                //console.log("id:"+r.id)
                            }).error(function(data) {
                                $scope.err_show = true;
                                $timeout(function() {
                                    $scope.err_show = false;
                                }, 3000);
                            })
                        }
                    })
                });
            }
        }
        $scope.load(1, $scope.pageSize);
    }
]);