myApp.directive('cLoading', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            translucence: '@',//控制指令背景是否半透明，值为"true"则指令背景半透明，无值或其他值则背景不透明
            tip: '@',
            tipLoading: '@'//可修改圆环内部的文字内容
        },
        templateUrl: 'tpl/common/directives/c-loading.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout){

        }
    }
})