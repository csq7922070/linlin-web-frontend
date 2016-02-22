angular.module('app.account').controller('accountCtrl', ['$stateParams', '$scope',
    function ($stateParams,$scope) {
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
]);
