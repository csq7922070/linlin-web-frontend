myApp.directive('cFullImage', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            image:'=',//format:{dataUrl:'....'}
            show:'=',
            onClose:'&'
        },
        templateUrl: 'tpl/common/directives/c-full-image.tpl.html',
        link: function($scope, element, attrs) {
            $scope.fullImage = element[0].querySelector("img");
        },
        controller: function($scope,$timeout){
            $scope.$watch("show",function(newVal,oldVal){
                if(newVal&&$scope.image&&$scope.image.dataUrl){
                    //计算图片和屏幕的宽高，让图片居中显示
                    var image = new Image();
                    image.src = $scope.image.dataUrl;
                    image.onload = function(){
                        var screenRatio = window.screen.width/window.screen.height;
                        var imgRatio = image.width/image.height;
                        if(screenRatio>imgRatio){//图片水平居中
                            $scope.fullImage.style.width="";
                            $scope.fullImage.style.height="100%";
                            var marginLeft = (screenRatio-imgRatio)/2*window.screen.height;
                            $scope.fullImage.style.marginLeft = marginLeft+"px";
                            $scope.fullImage.style.marginTop="";
                        }else if(screenRatio<imgRatio){//图片垂直居中
                            $scope.fullImage.style.width="100%";
                            $scope.fullImage.style.height=""; 
                            var marginTop = (1/screenRatio-1/imgRatio)/2*window.screen.width;
                            $scope.fullImage.style.marginLeft = "";
                            $scope.fullImage.style.marginTop=marginTop+"px";
                        }else{
                            $scope.fullImage.style.width="100%";
                            $scope.fullImage.style.height="100%";
                            $scope.fullImage.style.marginTop = "0px";
                            $scope.fullImage.style.marginLeft = "0px";
                        }
                    }
                }
            });

            $scope.close = function(){
                $scope.show = false;
                $scope.onClose();
            }
        }
    }
})