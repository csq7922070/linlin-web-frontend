myApp.directive('cRepairIcon', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            repairIcon: '=',
            onComplete: '&'
        },
        templateUrl: 'tpl/common/directives/repair/c-repair-icon.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($timeout, $state, errorLog,$scope,repair) {
            $scope.iconId = 0;
            $scope.starLevel = function(iconId) {
                $scope.iconId = iconId;
            }
            $scope.repairIconOk = function(iconId){
                console.log("repaidId...");
                $scope.onComplete({iconId:iconId});
            }
        }
    }
});