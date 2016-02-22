angular.module('app.account').controller('accountCtrl', ['$stateParams', '$scope','account','errorLog',
    'userInfo','address',
    function ($stateParams,$scope,account,errorLog,userInfo,address) {
        $scope.headImgBorder = "images/head-img-border.png";
        $scope.nickname = "登录/注册";
        $scope.addressTip = "";

        if(account.hasLogin()){
            var loginInfo = userInfo.getLastLoginInfo();
            $scope.headImgBorder = "images/head-img-border-empty.png";
            $scope.headImgUrl = loginInfo.headImgUrl;
            $scope.nickname = loginInfo.nickname;
            address.getAddressCount().then(function(data){
                if(data>0){
                    $scope.addressTip = "已关联"+data+"套房屋";
                }else{
                    $scope.addressTip = "请关联房屋";
                }
            },function(reason){
                alert(errorLog.getErrorMessage(reason));
            });
        }
    }
]);
