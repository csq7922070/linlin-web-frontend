myApp.directive('cComplainList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onScrolled: '&',
            complainList: '='
        },
        templateUrl: 'tpl/common/directives/complain/c-complain-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($timeout, $state, errorLog,$scope,complain) {

        }
    }
});