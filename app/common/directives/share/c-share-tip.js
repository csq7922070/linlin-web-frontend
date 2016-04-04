myApp.directive('cShareTip', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            tipText: '@', //默认显示可替换文字
            close: '&onClose' 
        },
        templateUrl: 'tpl/common/directives/share/c-share-tip.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout,$scope){
            if(!$scope.closeTime){
                $scope.closeTime = "1500";
            }
            var closeTime = parseInt($scope.closeTime);
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