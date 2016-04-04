myApp.directive('cSkillSecondary', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            skillOthers: '=',
            skillPid:'=',
            onComplete: '&'
        },
        templateUrl: 'tpl/common/directives/share/c-skill-secondary.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout,$scope){
            // $scope.subCategories = [];
            skillOtherT = false;
            var oldSkillPid = null;
            $scope.chooseSecondarySkill = function(skillOther){
                if(oldSkillPid != $scope.skillPid){
                    $scope.subCategories = [];
                }
                skillOtherT = false;
                for(var i = 0 ; i < $scope.subCategories.length ; i ++){
                    if($scope.subCategories[i].name == skillOther.name){
                        console.log('相同');
                        $scope.subCategories.splice(i,1);
                        skillOtherT = true;
                        skillOther.style = false;
                    }
                }
                if(!skillOtherT){
                    var subCategorie = {};
                    subCategorie.id = skillOther.id;
                    subCategorie.name = skillOther.name;
                    subCategorie.parentid = skillOther.parentid;
                    $scope.subCategories.push(subCategorie);
                    skillOther.style = true;
                    oldSkillPid = $scope.skillPid;
                }
                $scope.onComplete({checkCurrentSecondary:$scope.subCategories});
            }
        }
    }
})