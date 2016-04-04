(function() {
    angular.module('app.shop').controller('shopInfoCtrl', ['$scope',  '$stateParams', '$rootScope', 'errorLog', 
        'communityLocation', 'location','shop',
        function($scope, $stateParams, $rootScope, errorLog, communityLocation,location,shop) {
            $scope.site = $stateParams.site;
            if($scope.site == undefined){
                $scope.site = 0;
            }
            var currentPage = 1;//从1开始计算
            var pageSize = 10;
            var total = 10000;
            var busy = false;
            $scope.shopList = [];

            function load(pageIndex, pageSize) {
                //console.log("load...");
                if (busy || (pageIndex-1)*pageSize >= total) {//拉取数据查询中或者没有数据可拉取则直接返回
                    return;
                }
                //console.log("load start");
                var locInfo = location.getLastLocation();
                var longitude = locInfo&&locInfo.longitude ? locInfo.longitude:"";
                var latitude = locInfo&&locInfo.latitude ? locInfo.latitude:"";
                busy = true;
                if(pageIndex == 1){
                    $scope.showLoading = true;
                }
                shop.getShopList(pageIndex, pageSize, $scope.site, longitude, latitude).then(function(data){
                    $scope.showLoading = false;
                    busy = false;
                    currentPage = pageIndex;
                    if(data&&data.count!=undefined){
                        total = data.count;
                    }
                    //console.log(total);
                    if(data&&data.items){
                        $scope.shopList = $scope.shopList.concat(data.items);
                    }
                    //console.log($scope.shopList);
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