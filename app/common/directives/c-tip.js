myApp.directive('cTip', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            type: '@',//success or error
            show: '=',
            tip: '@',
            closeTime: '@',//default 1.5s auto close
            close: '&onClose' 
        },
        templateUrl: 'tpl/common/directives/c-tip.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout){
            if(!$scope.closeTime){
                $scope.closeTime = "1500";
            }
            var closeTime = parseInt($scope.closeTime);
            if($scope.type == "success"){
                $scope.tipImgSrc = "images/right-gray.png";
            }else if($scope.type == "error"){
                $scope.tipImgSrc = "images/search-error.png";
            }

            var timer = null;
            $scope.$watch("show",function(newVal,oldVal){
                if(newVal){
                    if(timer){
                        $timeout.cancel(timer);
                    }
                    timer = $timeout(function(){
                        $scope.show = false;
                        $scope.close();
                    },closeTime);
                }
            });
        }
    }
})