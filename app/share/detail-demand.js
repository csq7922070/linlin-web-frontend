angular.module('app.share').controller('releaseDemandDetailCtrl', ['$timeout', '$state', 'errorLog','$scope','shareRelease','account','userInfo','shareTypes','modalSvc','$stateParams','shareImage','$filter',
    function ($timeout, $state, errorLog,$scope,shareRelease,account,userInfo,shareTypes,modalSvc,$stateParams,shareImage,$filter) {
        var releseId = $stateParams.id;//发布技能或需求的ID
        $scope.releseId = releseId;
        $scope.detailCollect = 0;
        $scope.addressType = 1;
        $scope.showDetailBox = true;
        $scope.shareImages = [];

        $scope.$watch("showAcceptOrder", function(newVal,oldVal){
            if($scope.showAcceptOrder == true){
                return
            }else{
                $scope.showDetailBox = true;
            }
        });

        //收藏
        $scope.changeCollect = function() {
            if($scope.detailCollect == 0){
                $scope.detailCollect = 1;
            }else{
                $scope.detailCollect = 0;
            }
            console.log($scope.detailCollect);
        }
        //返回上一页
        $scope.prev = function() {
            history.back();
        }
        $scope.showLoading = true;
        shareRelease.getDemandDetail(releseId).then(function(data){
            $scope.showLoading = false;
            $scope.data = $filter("shareInfo")(data.items);
            $scope.backgroundImage = $scope.data.account.headImgUrl;
            var id = $scope.data.id;
            $scope.showImagesLoading = true;
            shareImage.getImages(id).then(function(data) {
                $scope.showImagesLoading = false;
                $scope.shareImages = data;
            },function(reason){
                $scope.showImagesLoading = false;
                alert(errorLog.getErrorMessage(reason));
            });
            $scope.releaseSkills = $scope.data.account.icons;
            angular.forEach(shareTypes.getPrimarySkills(), function(item){
                if(item.id==$scope.data.category.id){
                    $scope.categoryImg = item.icon;
                    return false;
                }
            });
        },function(reason){
            $scope.showLoading = false;
            alert(errorLog.getErrorMessage(reason));
        });
        //我要接单
        $scope.getOrder = function(type){
            $state.go('order-demand',{releseId:releseId})
        }

        $scope.goMyHomePage = function(){
            $state.go('share-personal',{accountId:$scope.data.account.id});
        }
    }
]);
