myApp.directive('cAccount', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: 'tpl/common/directives/c-account.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($stateParams,$scope) {
            $scope.logout = function(){
                $scope.showLogoutConfirm = true;
            }

            $scope.onLogoutConfirmClose = function(state){
                $scope.showLogoutConfirm = false;
                if(state){
                    console.log("logout...");
                }
            }
        }
    }
});