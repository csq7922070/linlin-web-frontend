myApp.directive('cCircleLoading', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            tip:'='
        },
        templateUrl: 'tpl/common/directives/loading/c-circle-loading.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout,$scope){
        }
    }
})