angular.module('app.account').controller('usCtrl', ['$stateParams', '$scope','account','errorLog',
    'userInfo','address','$state','account',
    function ($stateParams,$scope,account,errorLog,userInfo,address,$state,account) {
        $scope.showLogout = account.hasLogin();

        $scope.logout = function(){
            $scope.showLogoutConfirm = true;
        }

        $scope.onLogoutConfirmClose = function(state){
            $scope.showLogoutConfirm = false;
            if(state){
                account.logout();
                $state.go('account');
            }
        }
    }
]);
