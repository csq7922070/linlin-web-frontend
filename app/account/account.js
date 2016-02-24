angular.module('app.account').controller('accountCtrl', ['$stateParams', '$scope','account','errorLog',
    'userInfo','address','control','$state',
    function ($stateParams,$scope,account,errorLog,userInfo,address,control,$state) {
        $scope.headImgBorder = "images/head-img-border.png";
        $scope.nickName = "登录/注册";
        $scope.addressTip = "";

        if(account.hasLogin()){
            var loginInfo = userInfo.getLastLoginInfo();
            if(loginInfo.headImgUrl){
                $scope.headImgBorder = "images/head-img-border-empty.png";
                $scope.headImgUrl = loginInfo.headImgUrl;
            }
            $scope.nickName = loginInfo.nickName;
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

        $scope.login = function(){
            if(!account.hasLogin()){
                var routeState = {
                    toState:{
                        name:"account"
                    }
                };
                control.storageRouteState(routeState);
                $state.go("login");
            }
        }

        $scope.browseAddress = function(){
            if(!account.hasLogin()){
                var routeState = {
                    toState:{
                        name:"address-list"
                    },
                    toParams:{
                        mode:"browse"
                    }
                }
                control.storageRouteState(routeState);
                $state.go("login");
            }else{
                $state.go("address-list",{mode:"browse"});
            }
        }
    }
]);
