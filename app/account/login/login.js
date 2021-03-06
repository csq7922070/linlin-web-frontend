angular.module('app.account').controller('loginCtrl', ['$stateParams', '$scope', '$timeout', '$interval', 'verify',
    'account', 'errorLog', 'userInfo', '$state', '$location','auth','control',
    function ($stateParams, $scope, $timeout, $interval, verify,account,errorLog,userInfo,$state,$location,
        auth,control) {
        //alert($location.url());
        var lastLoginInfo = userInfo.getLastLoginInfo();
        if(lastLoginInfo&&lastLoginInfo.tel){
            $scope.tel = lastLoginInfo.tel;
        }
        $("#tel").focus();
        $scope.authCode = "";

        // // test code
        // $scope.onTipClose = function(){
        //     console.log("onTipClose");
        // }
        // // end test code
        $scope.sendAuthCode = function(){
            //$scope.showSuccess = true;
            if(!verify.verifyTel($scope.tel) || !verify.supportTel($scope.tel)){
                $scope.verifyTip='请输入正确的手机号码';
                if(!verify.supportTel($scope.tel)){
                    $scope.verifyTip="暂时不支持177、178号段的手机号"
                }
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
                if(!data){
                    $scope.verifyTip = "验证码发送失败";
                    $scope.verifyError = true;
                    $timeout(function(){
                        $scope.verifyError = false;
                        $scope.sendText = "重新发送";
                        $scope.authCodeSending = false;
                        $("#tel").focus();
                    },2000);
                }
            },function(reason){
                alert(errorLog.getErrorMessage(reason));
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
            //$scope.showError = true;
            $scope.verifyTip = "登录中...";
            $scope.verifyError = true;
            account.login($scope.tel, $scope.authCode).then(function(data){
                $scope.verifyError = false;
                if(!data.flag){//登录失败，手机号和验证码不匹配
                    $scope.verifyTip = "请输入正确的验证码";
                    $scope.verifyError = true;
                    $timeout(function(){
                        $scope.verifyError = false;
                        $("#auth-code").focus();
                    },2000);
                }else{
                    //alert(errorLog.getFullErrorMessage(data.account));
                    userInfo.storageLoginInfo($scope.tel,data.account.nickName,data.account.headImgUrl);//保存用户登录信息
                    var routeState = control.getRouteState();
                    $state.go(routeState.toState.name, routeState.toParams);
                }
            }, function(reason){
                $scope.verifyError = false;
                alert(errorLog.getErrorMessage(reason));
            });
        }

        $scope.onBack = function(){
            console.log("onBack...");
        }
    }
]);
