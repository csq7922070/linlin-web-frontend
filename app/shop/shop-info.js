(function() {
    angular.module('app.shop').controller('shopInfoCtrl', ['$scope',  '$stateParams', '$rootScope', 'shops', 'errorLog', 
        'communityLocation', 'locationInfo',
        function($scope, $stateParams, $rootScope, shops, errorLog, communityLocation,locationInfo) {
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
                        type: $stateParams.site - 1,
                        lon: locationInfo.longitude,
                        lat: locationInfo.latitude
                    }
                    shops.query(params).$promise.then(function(data) {
                        $scope.numberOfPages = Math.ceil(data.count / $scope.pageSize);
                        $scope.currentPage = goPage;
                        $scope.busy = false;
                        $scope.shops.push.apply($scope.shops, data.items);
                    },function(reason){
                        alert(errorLog.getErrorMessage(reason));
                    });
                }
            }
            $scope.load(1, 8);

            $scope.$watch('communityLocation.changeCommunityHand', function(newVal, oldVal){
                if(newVal){
                    $scope.load(1, 8);
                }
            });
        }
    ]);
})();
