myApp.directive('cEmpty', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            tip: '@',
            secondTip: '@'//第二行提示
        },
        templateUrl: 'tpl/common/directives/c-empty.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout){

        }
    }
})