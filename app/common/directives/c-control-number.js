myApp.directive('cControlNumber', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            controlNumber: '=',
            // currentList: '@', //默认显示
            onComplete: '&'
        },
        templateUrl: 'tpl/common/directives/c-control-number.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout,$scope){
            $scope.number = 1;
            $scope.changeControlNumber = function(a) {
                if($scope.number == 1 && a<0)
                    return;
                $scope.number  = $scope.number + a;
                var number = $scope.number;
                $scope.onComplete({number:number});
            }
        }
    }
})