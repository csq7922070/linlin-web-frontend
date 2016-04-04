myApp.directive('cSkillIcons', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            releaseSkills:'='//format:[1,2,3...]
        },
        templateUrl: 'tpl/common/directives/share/c-skill-icons.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope, $http, $stateParams, $rootScope, $state, addresses, payments,addressInfo,
            address,errorLog,control,billPay,$filter,shareTypes,errorLog,shareImage) {
            //当共享信息列表数据刷新时异步查询共享信息中的图片数据
            $scope.releaseSkillIcons = [];//format:['family-education',...]
            $scope.$watch("releaseSkills",function(newVal,oldVal){
                if(newVal&&newVal.length>0){
                    $scope.releaseSkillIcons = [];
                    angular.forEach($scope.releaseSkills,function(item){
                        var iconName = shareTypes.getPrimarySkillIcon(item);
                        $scope.releaseSkillIcons.push(iconName);
                    });
                }
            });
        }
    }
})