angular.module('app.payment').controller('paymentCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$q',
    function($scope, $http, $stateParams, $rootScope, $state, $q) {
        if($rootScope.wmonth!=null&&$rootScope.wmonth!=""){
            $scope.watermonth=$rootScope.wmonth;
        }
        if($rootScope.emonth!=null&&$rootScope.emonth!=""){
            $scope.elemonth=$rootScope.emonth;
        }
        var tmpwmonth = $rootScope.wmonth.map(_parseInt).sort(compare);
        var tmpemonth = $rootScope.emonth.map(_parseInt).sort(compare);
        var wdate;
        var edate;
        $scope.watmonth = arrange(tmpwmonth);
        $scope.elmonth = arrange(tmpemonth);

        if ($scope.watmonth.length > 1) {
            $scope.wyear = (tmpwmonth[0] + "").substr(0, 4);
            if ($scope.watmonth[0].length > 1) {
                if ((tmpwmonth[1] + "").substr(0, 4) == $scope.wyear) {
                    $scope.wmonth = (tmpwmonth[0] + "").substr(4, 2) + "," + (tmpwmonth[1] + "").substr(4, 2) + "月等";
                    wdate = $scope.wyear + "年" + $scope.wmonth;
                } else {
                    wdate = (tmpwmonth[0] + "").substr(0, 4) + "年" + (tmpwmonth[0] + "").substr(4, 2) + "月," + (tmpwmonth[0] + "").substr(0, 4) + "年" + (tmpwmonth[0] + "").substr(4, 2) + "月等";
                }
            } else {
                $scope.wmonth = (tmpwmonth[0] + "").substr(4, 2) + "月";
                wdate = $scope.wyear + "年" + $scope.wmonth;
            }

        } else {
            $scope.wyear = (tmpwmonth[0] + "").substr(0, 4) + "年";
            $scope.wmonth = (tmpwmonth[0] + "").substr(4, 2);
            if(tmpwmonth[0] != tmpwmonth[tmpwmonth.length - 1]){
                 $scope.wmonth += "-" + (tmpwmonth[tmpwmonth.length - 1] + "").substr(4, 2)
            } 
            $scope.wmonth += "月";
            wdate = $scope.wyear + $scope.wmonth;
        }

        if ($scope.elmonth.length > 1) {
            $scope.eyear = (tmpemonth[0] + "").substr(0, 4);
            if ($scope.elmonth[0].length > 1) {
                if ((tmpemonth[1] + "").substr(0, 4) == $scope.eyear) {
                    $scope.emonth = (tmpemonth[0] + "").substr(4, 2) + "," + (tmpemonth[1] + "").substr(4, 2) + "月等";
                    edate = $scope.eyear + "年" + $scope.emonth;
                } else {
                    edate = (tmpemonth[0] + "").substr(0, 4) + "年" + (tmpemonth[0] + "").substr(4, 2) + "月," + (tmpemonth[0] + "").substr(0, 4) + "年" + (tmpemonth[0] + "").substr(4, 2) + "月等";
                }
            } else {
                $scope.emonth = (tmpemonth[0] + "").substr(4, 2) + "月";
                edate = $scope.eyear + "年" + $scope.emonth;
            }

        } else {
            $scope.eyear = (tmpemonth[0] + "").substr(0, 4) + "年";
            $scope.emonth = (tmpemonth[0] + "").substr(4, 2);
            if(tmpemonth[0] != tmpemonth[tmpemonth.length - 1]){
                 $scope.emonth += "-" + (tmpemonth[tmpemonth.length - 1] + "").substr(4, 2)
            } 
            $scope.emonth += "月";
            edate = $scope.eyear + $scope.emonth;
        }

        $scope.watmonth = wdate;
        $scope.elmonth = edate;

        $scope.block = $stateParams.block;
        $scope.unit = $stateParams.unit;
        $scope.room = $stateParams.room;

        $scope.waterFr = $rootScope.waterFree;
        $scope.eleFr = $rootScope.eleFree;

        $scope.totalFee = $rootScope.waterFree + $rootScope.eleFree;


        function arrange(array) {
            var t;
            var ta;
            var r = [];

            array.forEach(function(v) {
                if (t === v) {
                    ta.push(t);
                    t++;
                    return;
                }

                ta = [v];
                t = v + 1;
                r.push(ta);
            });

            return r;
        }

        function compare(a, b) {
            return a - b;
        }

        function _parseInt() {
            return parseInt(arguments[0]);
        }

        $scope.money_payment = function() {
            console.log("支付功能开始");
            $http({
                    method: "POST",
                    url: basePath + '/payments',
                    params: {
                        total_fee: $scope.totalFee,
                        openid: sessionStorage.getItem("openid"),
                        ids: $rootScope.ids
                    }
                }).error(function(response, status, headers, config) {
                    self.error = "连接错误!";
                })
                .then(function(response) {
                    if (response.data.return_code == "FAIL") {
                        self.error = response.data.return_msg;
                        return $q.reject();
                    }
                    return $q.resolve({
                        appid: response.data.appid,
                        prepay_id: response.data.prepay_id,
                        timestamp: response.data.timestamp,
                        nonceStr: response.data.nonceStr,
                        paySign: response.data.sign
                    });
                })
                .then(function(data) {
                    var deferred = $q.defer();
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.appid, // 必填，公众号的唯一标识
                        timestamp: sessionStorage.getItem("timestamp"), // 必填，生成签名的时间戳
                        nonceStr: sessionStorage.getItem("noncestr"), // 必填，生成签名的随机串
                        signature: sessionStorage.getItem("sign"), // 必填，签名，见附录1
                        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.chooseWXPay({
                        timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: data.paySign, // 支付签名
                        success: function(res) {
                            // 支付成功后的回调函数
                            console.log('successfully paid', res);
                            deferred.resolve('success');
                        }
                    });
                    return deferred.promise;
                })
                .then(function() {
                    // call $state to confirm page
                    $state.go('success');
                    return $q.resolve(true);
                });

        }

    }
]);
