myApp.directive('cTransparentMask', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
        },
        templateUrl: 'tpl/common/directives/c-transparent-mask.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout){
        }
    }
})