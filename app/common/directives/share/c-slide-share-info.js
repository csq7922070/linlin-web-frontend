myApp.directive('cSlideShareInfo', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            shareInfoList:'='
        },
        templateUrl: 'tpl/common/directives/share/c-slide-share-info.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope, $http, $stateParams, $rootScope, $state, addresses, payments,addressInfo,
            address,errorLog,control,billPay,$filter,shareTypes,errorLog,shareImage) {
            $scope.slideIndex = 0;

            //当共享信息列表数据刷新时异步查询共享信息中的图片数据
            $scope.$watch("shareInfoList",function(newVal,oldVal){
                if(newVal&&newVal.length>0){
                    //var testId = "6c69c745-b72c-4b3b-a761-ac535d484912";//"ec99f342-b5a4-46ca-bb58-eb1fdeaa2ef8";
                    angular.forEach($scope.shareInfoList,function(shareInfo){
                        console.log("load image...");
                        console.log("id:"+shareInfo.id);
                        shareInfo.showImagesLoading = true;
                        shareImage.getImages(shareInfo.id).then(function(data) {
                            shareInfo.showImagesLoading = false;
                            shareInfo.images = data;
                        },function(reason){
                            shareInfo.showImagesLoading = false;
                            alert(errorLog.getErrorMessage(reason));
                        });
                    });
                }
            });

            $scope.onSelectImage = function(img){
                $scope.fullImage = img;
                $scope.showFullImage = true;
            }
        }
    }
})