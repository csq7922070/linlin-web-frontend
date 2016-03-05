(function() {
    angular.module('app.shop').controller('shopInfoCtrl', ['$scope',  '$stateParams', '$rootScope', 'errorLog', 
        'communityLocation', 'location','shop',
        function($scope, $stateParams, $rootScope, errorLog, communityLocation,location,shop) {
            $scope.site = $stateParams.site;
            if($scope.site == undefined){
                $scope.site = 1;
            }
            var currentPage = 0;
            var pageSize = 10;
            var busy = false;
            $scope.shopList = [];

            function load(pageIndex, pageSize) {
                if (busy) {
                    return;
                }
                var locInfo = location.getLastLocation();
                var longitude = locInfo&&locInfo.longitude ? locInfo.longitude:"";
                var latitude = locInfo&&locInfo.latitude ? locInfo.latitude:"";
                busy = true;
                if(pageIndex == 0){
                    $scope.showLoading = true;
                }
                shop.getShopList(pageIndex, pageSize, $scope.site - 1, longitude, latitude).then(function(data){
                    $scope.showLoading = false;
                    busy = false;
                    currentPage = pageIndex+1;
                    $scope.shopList = $scope.shopList.concat($scope.shopList, data);
                    //console.log($scope.showList);
                },function(reason){
                    busy = false;
                    $scope.showLoading = false;
                    alert(errorLog.getErrorMessage(reason));
                });
            }
            load(currentPage, pageSize);

            $scope.scroll = function(){
                load(currentPage+1, pageSize);
            }

            $scope.$watch('communityLocation.changeCommunityHand', function(newVal, oldVal){
                if(newVal){
                    load(currentPage, pageSize);
                }
            });
        }
    ]);
})();