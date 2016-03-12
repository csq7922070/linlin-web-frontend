myApp.directive('cRepairDetail', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            repairDetail: '='
        },
        templateUrl: 'tpl/common/directives/repair/c-repair-detail.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($timeout, $state, errorLog,$scope,repair) {
        }
    }
});