myApp.directive('cRepairList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onScrolled: '&',
            repairList: '='
        },
        templateUrl: 'tpl/common/directives/repair/c-repair-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($timeout, $state, errorLog,$scope,repair) {

        }
    }
});