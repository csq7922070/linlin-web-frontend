myApp.directive('cFilterBackground', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            backgroundImage:'='
        },
        templateUrl: 'tpl/common/directives/c-filter-background.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout){

        }
    }
})