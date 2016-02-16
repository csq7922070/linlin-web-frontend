myApp.directive('headBar', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            title: '@',
            back: '&onBack' 
        },
        templateUrl: 'tpl/common/directives/head-bar.tpl.html',
        link: function(scope, element, attrs) {
        }
    }
})