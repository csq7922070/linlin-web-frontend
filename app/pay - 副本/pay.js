angular.module('app.pay').controller('payCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$q','addressInfo',
    'userInfo','errorLog','billPay',
    function($scope, $http, $stateParams, $rootScope, $state, $q, addressInfo,userInfo,errorLog,billPay) {
        var payBillInfo = billPay.getPayBillInfo();
        if(payBillInfo){
            $scope.otherBillList = payBillInfo.otherBillList;
            $scope.wDates=payBillInfo.wDates;
            $scope.eDates=payBillInfo.eDates;
            $scope.waterFee = payBillInfo.waterFee;
            $scope.elecFee = payBillInfo.elecFee;
            $scope.totalFee = payBillInfo.totalFee;
            $scope.wBillDate = billPay.getMergeDate(payBillInfo.wDates);
            $scope.eBillDate = billPay.getMergeDate(payBillInfo.eDates);
        }
        
        $scope.community = addressInfo.community;
        $scope.block = addressInfo.block;
        $scope.unit = addressInfo.unit;
        $scope.room = addressInfo.room;

        var loginInfo = userInfo.getLastLoginInfo();
        var openId = userInfo.getOpenIdSync();
        var billIds = payBillInfo.billIds ? payBillInfo.billIds.join(",") : "";
        $scope.pay = function() {
            $scope.showTransparentMask = true;
            $q.all([userInfo.getWxConfigParam(),
                        billPay.getPaySignParam($scope.totalFee, openId, billIds, loginInfo.tel)]).then(function(datas){
                var wxConfigParam = datas[0];
                var paySignParam = datas[1];
                var defer = $q.defer();
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: paySignParam.appid, // 必填，公众号的唯一标识
                    timestamp: wxConfigParam.timestamp, // 必填，生成签名的时间戳
                    nonceStr: wxConfigParam.noncestr, // 必填，生成签名的随机串
                    signature: wxConfigParam.sign, // 必填，签名，见附录1
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function(){
                    wx.chooseWXPay({
                        timestamp: paySignParam.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: paySignParam.nonceStr, // 支付签名随机串，不长于 32 位
                        package: paySignParam.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: paySignParam.sign, // 支付签名
                        success: function(res) {
                            defer.resolve(true);
                        },
                        fail: function(res){
                            var reason = {
                                errorCode:"CHOOSE_WX_PAY_ERROR",
                                errorMessage:errorLog.getErrorMessage(res.errMsg)
                            };
                            defer.reject(reason);
                        }
                    });
                });
                wx.error(function(res){
                    var reason = {
                        errorCode:"WX_CONFIG_ERROR",
                        errorMessage:errorLog.getErrorMessage(res)
                    };
                    defer.reject(reason);
                });
                return defer.promise;
            },function(reason){
                return $q.reject(reason);
            }).then(function(data){
                $state.go('success');
            },function(reason){
                alert(errorLog.getErrorMessage(reason));
                $scope.showTransparentMask = false;
            });
        }
    }
]);
