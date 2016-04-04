myApp.directive('cCheckButton', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            checkButton: '=',
            currentCheckButton: '@', //默认显示可替换文字
            onComplete: '&',
        },
        templateUrl: 'tpl/common/directives/c-check-button.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout,$scope){
            $scope.switchCheck = function(){
                if($scope.checkButton == 1){
                    $scope.checkButton = 0;
                }else{
                    $scope.checkButton = 1;
                }
                console.log($scope.checkButton);
            }
        }
    }
})