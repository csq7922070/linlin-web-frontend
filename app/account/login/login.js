angular.module('app.account').controller('loginCtrl', ['$stateParams', '$scope', '$timeout', '$interval', 'verify',
    'account', 'errorLog', 'userInfo', '$state', 'appState', '$location','auth',
    function ($stateParams, $scope, $timeout, $interval, verify,account,errorLog,userInfo,$state,appState,$location,
        auth) {
        //alert($location.url());
        var lastLoginInfo = userInfo.getLastLoginInfo();
        $scope.tel = lastLoginInfo ? lastLoginInfo.tel: "";
        $("#tel").focus();
        $scope.authCode = "";

        $scope.sendAuthCode = function(){
            if(!verify.verifyTel($scope.tel)){
                $scope.verifyTip='请输入正确的手机号码';
                $scope.verifyError = true;
                $timeout(function(){
                    $scope.verifyError = false;
                    $("#tel").focus();
                },2000);
                return;
            }
            console.log("sendAuthCode...");
            $scope.disableAuthCode = false;
            account.sendAuthCode($scope.tel).then(function(data){
                console.log("sendAuthCode: " +data);
            },function(reason){
                alert(reason.errorCode +","+reason.errorMessage);
            });
            $timeout(function(){
                $("#auth-code").focus();
            },300);
            $scope.authCodeSending = true;
            resendCountDown().then(function(){//倒计时结束
                $scope.sendText = "重新发送";
                $scope.authCodeSending = false;
            });
        }

        //开始验证码重发60s倒计时
        function resendCountDown(){
            var remainTime = 60;
            $scope.resendTime = remainTime + "s";
            var timer = $interval(function(){
                remainTime--;
                $scope.resendTime = remainTime + "s";
            }, 1000, 59);
            return timer;
        }

        $scope.login = function(){
            console.log("login...");
            $scope.verifyTip = "登录中...";
            $scope.verifyError = true;
            account.login($scope.tel, $scope.authCode).then(function(data){
                $scope.verifyError = false;
                if(!data){//登录失败，手机号和验证码不匹配
                    $scope.verifyTip = "请输入正确的验证码";
                    $scope.verifyError = true;
                    $timeout(function(){
                        $scope.verifyError = false;
                        $("#auth-code").focus();
                    },2000);
                }else{
                    userInfo.storageLoginInfo($scope.tel);//保存用户登录手机号
                    var routeState = auth.getRouteState();
                    console.log("login go:");
                    console.log(routeState.toState);
                    $state.go(routeState.toState.name, routeState.toParams);
                }
            }, function(reason){
                $scope.verifyError = false;
                alert(reason.errorCode +","+reason.errorMessage);
            });
        }

        $scope.onBack = function(){
            console.log("onBack...");
        }
    }
]);
