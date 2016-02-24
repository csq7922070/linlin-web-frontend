angular.module('app.account').controller('usCtrl', ['$stateParams', '$scope','account','errorLog',
    'userInfo','address','$state',
    function ($stateParams,$scope,account,errorLog,userInfo,address,$state) {
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
