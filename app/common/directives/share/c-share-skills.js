myApp.directive('cShareSkills', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            skills:'=',
            onSelect:'&'
        },
        templateUrl: 'tpl/common/directives/share/c-share-skills.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope, $http, $stateParams, $rootScope, $state, addresses, payments,addressInfo,
            address,errorLog,control,billPay,$filter) {
            $scope.pageSize = 4;
            $scope.slideIndex = 0;
            $scope.slideIndicators = [];
            $scope.$watch('skills', function(newVal,oldVal){
                $scope.slideIndicators = [];
                if($scope.skills&& $scope.skills.length>0){
                    $scope.selectSkill($scope.skills[0]);//init select
                    for(var i = 0;i<$scope.skills.length;i+=$scope.pageSize){
                        $scope.slideIndicators.push(i);
                    }
                }
            });

            $scope.selectSkill = function(skill){
                $scope.currentSkill = skill;
                $scope.onSelect({selectedSkill:skill});
            }
        }
    }
})