angular.module('app.payment').controller('paymentCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$q','addressInfo',
    'userInfo','errorLog',
    function($scope, $http, $stateParams, $rootScope, $state, $q, addressInfo,userInfo,errorLog) {
        if($rootScope.wmonth!=null&&$rootScope.wmonth!=""){
            $scope.watermonth=$rootScope.wmonth;
        }
        if($rootScope.emonth!=null&&$rootScope.emonth!=""){
            $scope.elemonth=$rootScope.emonth;
        }
        var tmpwmonth = $rootScope.wmonth.map(_parseInt).sort(compare);
        var tmpemonth = $rootScope.emonth.map(_parseInt).sort(compare);
        var wmonthSections = arrange(tmpwmonth);
        var emonthSections = arrange(tmpemonth);

        $scope.watmonth = getMergeDate(wmonthSections, tmpwmonth);
        $scope.elmonth = getMergeDate(emonthSections, tmpemonth);

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

        //monthSections是按相邻月分段的二位数组，tmpmonth是按时间排序的一维数组
        function getMergeDate(monthSections, tmpmonth){
            var year,month;
            var date;
            if(monthSections.length > 0){
                year = (tmpmonth[0] + "").substr(0, 4);
                month = (tmpmonth[0] + "").substr(4, 2);
                if(tmpmonth[0] != tmpmonth[tmpmonth.length - 1]){
                     month += "-" + (tmpmonth[tmpmonth.length - 1] + "").substr(4, 2);
                } 
                date = year + "年" + month + "月";
            }
            if (monthSections.length > 1) {
                if(monthSections[0].len == 1){
                    var nextYear = monthSections[0][0].substr(0, 4);
                    if(nextYear == year)
                        date = date.substr(0, date.length - 1);//同年情况下去掉前一个日期结尾的“月”
                    date+="、";
                    if(nextYear == year)
                        date += getSectionDateTextWithoutYear(monthSections[1]);
                    else{
                        date += getSectionDateText(monthSections[1]);
                    }
                    if(monthSections.length > 2)
                        date+="等";
                } else if(monthSections[0].length > 1){
                    date+="等";
                }
            } 

            return date;
        }

        function getSectionDateText(section){
            var text = section[0].substr(0,4) + "年" + section[0].substr(4);
            if(section[0] != section[section.length - 1]){
                text+= "-" + section[section.length - 1].substr(4);
            }
            text+="月";
            return text;
        }

        function getSectionDateTextWithoutYear(section){
            var text = section[0].substr(4);
            if(section[0] != section[section.length - 1]){
                text+= "-" + section[section.length - 1].substr(4);
            }
            text+="月";
            return text;
        }
        // console.log($stateParams);
        
        $scope.community = addressInfo.community;
        $scope.block = addressInfo.block;
        $scope.unit = addressInfo.unit;
        $scope.room = addressInfo.room;

        $scope.waterFr = $rootScope.waterFree;
        $scope.eleFr = $rootScope.eleFree;

        $scope.totalFee = $rootScope.waterFree + $rootScope.eleFree;
        var loginInfo = userInfo.getLastLoginInfo();
        var openId = null;
        var wxConfigParam = null;
        $scope.money_payment = function() {
            console.log("支付功能开始");
            $q.all([userInfo.getOpenId(),userInfo.getWxConfigParam()]).then(function(datas){
                openId = datas[0];
                wxConfigParam = datas[1];
                return getPaySignParam($scope.totalFee, openId, $rootScope.ids, loginInfo.tel);
            },function(reason){
                return $q.reject(reason);
            }).then(function(data){// pay data
                var defer = $q.defer();
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appid, // 必填，公众号的唯一标识
                    timestamp: wxConfigParam.timestamp, // 必填，生成签名的时间戳
                    nonceStr: wxConfigParam.noncestr, // 必填，生成签名的随机串
                    signature: wxConfigParam.sign, // 必填，签名，见附录1
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function(){
                    wx.chooseWXPay({
                        timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: data.sign, // 支付签名
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
            });
        }

        //获取微信支付相关签名参数
        function getPaySignParam(totalFee, openId, ids, tel){
            var defer = $q.defer();
            $http({
                method: "POST",
                url: basePath + '/payments',
                params: {
                    total_fee: totalFee,
                    openid: openId,
                    ids: ids,
                    phone: tel
                }
            })
            .then(function(response) {
                if (response.data.return_code == "FAIL") {
                    var reason = {
                        errorCode:"PAYMENT_ERROR",
                        errorMessage:response.data.return_msg
                    };
                    defer.reject(reason);
                }else{
                    return defer.resolve(response.data);
                }
            },function(response){
                var reason = {
                    errorCode:"PAYMENT_ERROR",
                    errorMessage:errorLog.getErrorMessage(response.data)
                };
                return defer.reject(reason);
            })
            return defer.promise;
        }
    }
]);
