angular.module('app.account').controller('loginCtrl', ['$stateParams', '$scope', '$timeout', '$interval', 'verify',
    'account', 'errorLog',
    function ($stateParams, $scope, $timeout, $interval, verify,account,errorLog) {
        $scope.tel = "";
        $scope.authCode = "";
        var authCode = "";

        $scope.sendAuthCode = function(){
            if($scope.tel.length != 11){
                return;
            }
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
            account.getAuthCode($scope.tel).then(function(data){
                authCode = data;
                console.log("authCode: "+data);
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
            if($scope.authCode.length != 4){
                return;
            }
            console.log("login...");
            if($scope.authCode != authCode){
                $scope.verifyTip = "请输入正确的验证码";
                $scope.verifyError = true;
                $timeout(function(){
                    $scope.verifyError = false;
                    $("#auth-code").focus();
                },2000);
                return;
            }
        }

        $scope.onBack = function(){
            console.log("onBack...");
        }
    }
]);
