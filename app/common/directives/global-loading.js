myApp.directive('globalLoading', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            tip: '=',
            lockClickHide: '='
        },
        templateUrl: 'tpl/common/directives/global-loading.tpl.html',
        link: function(scope, element, attrs) {
            scope.clickLoadingLayer = function(){
                if(!scope.lockClickHide){
                    scope.show = false;
                }
            }
        }
    }

})
