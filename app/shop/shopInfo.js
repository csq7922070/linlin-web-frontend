
skhControllers.controller('shopInfoCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
        function($scope, $http, $stateParams, $rootScope, $state) {
            $rootScope.site = $stateParams.site;
            $scope.currentPage = 0;
            $scope.pageSize = 5;
            $scope.shops = [];

            $scope.load = function(goPage, limit) {
                if (goPage > $scope.numberOfPages || $scope.currentPage == goPage || goPage < 1 || $scope.busy) {
                    return;
                } else if ($rootScope.site != 3) {
                    $scope.busy = true;
                    $http({
                        method: "GET",
                        url: basePath + "/getBusiness.do",
                        params: {
                            offset: $scope.pageSize * (goPage - 1),
                            limit: limit == 8 ? limit : $scope.pageSize,
                            type: $stateParams.site - 1
                        }
                    }).success(function(data) {
                        $scope.numberOfPages = Math.ceil(data.count / $scope.pageSize);
                        $scope.currentPage = goPage;
                        $scope.busy = false;
                        $scope.shops.push.apply($scope.shops, data.items);
                    }).error(function(data) {
                        //console.log("server error!");
                    });
                }
            }
            
            $scope.load(1, 8);
        }
    ]);