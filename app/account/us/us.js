angular.module('app.account').controller('usCtrl', ['$stateParams', '$scope','account','errorLog',
    'userInfo','address',
    function ($stateParams,$scope,account,errorLog,userInfo,address) {
        $scope.logout = function(){
            $scope.showLogoutConfirm = true;
        }

        $scope.onLogoutConfirmClose = function(state){
            $scope.showLogoutConfirm = false;
            if(state){
                console.log("logout...");
                account.logout();
            }
        }
    }
]);
