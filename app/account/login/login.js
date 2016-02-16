angular.module('app.account').controller('loginCtrl', ['$stateParams', '$scope', '$timeout', '$interval', 'verify',
    function ($stateParams, $scope, $timeout, $interval, verify) {
        $scope.tel = "";
        $scope.authCode = "";

        $scope.sendAuthCode = function(){
            if($scope.tel.length != 11){
                return;
            }
            if(!verify.verifyTel($scope.tel)){
                $scope.telVerifyError = true;
                $timeout(function(){
                    $scope.telVerifyError = false;
                    $("#tel").focus();
                },2000);
                return;
            }
            console.log("sendAuthCode...");
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
        }

        $scope.onBack = function(){
            console.log("onBack...");
        }
    }
]);
