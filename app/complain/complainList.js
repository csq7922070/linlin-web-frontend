skhControllers.controller('complainListCtrl', ['$scope', '$http',
        function($scope, $http) {
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.load = function(goPage, limit) {
                if (goPage > $scope.numberOfPages || $scope.currentPage == goPage || goPage < 1 || $scope.busy) {
                    return;
                } else {
                    $scope.busy = true;
                    $http({
                        method: "GET",
                        url: basePath + '/complain/getByOpenid',
                        params: {
                            offset: $scope.pageSize * (goPage - 1),
                            limit: $scope.pageSize,
                            openid: sessionStorage.getItem("openid")
                        }
                    }).success(function(data) {
                        $scope.numberOfPages = Math.ceil(data.count / $scope.pageSize);
                        $scope.currentPage = goPage;
                        $scope.busy = false;
                        $scope.complains = data.items;
                    });
                }
            }
            $scope.load(1, $scope.pageSize);
        }
    ]);