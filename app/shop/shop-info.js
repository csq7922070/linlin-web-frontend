(function() {
    angular.module('app.shop').controller('shopInfoCtrl', ['$scope',  '$stateParams', '$rootScope', 'shops',
        function($scope, $stateParams, $rootScope, shops) {
            $rootScope.site = $stateParams.site;
            $scope.currentPage = 0;
            $scope.pageSize = 5;
            $scope.shops = [];

            $scope.load = function(goPage, limit) {
                if (goPage > $scope.numberOfPages || $scope.currentPage == goPage || $scope.busy) {
                    return;
                } else if ($rootScope.site != 3) {
                    $scope.busy = true;
                    params = {
                        offset: $scope.pageSize * (goPage - 1),
                        limit: limit == 8 ? limit : $scope.pageSize,
                        type: $stateParams.site - 1
                    }
                    shops.query(params).$promise.then(function(data) {
                        $scope.numberOfPages = Math.ceil(data.count / $scope.pageSize);
                        $scope.currentPage = goPage;
                        $scope.busy = false;
                        $scope.shops.push.apply($scope.shops, data.items);
                    });
                }
            }
            $scope.load(1, 8);
        }
    ]);
})();
