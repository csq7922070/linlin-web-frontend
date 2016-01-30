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

        $scope.block = $stateParams.block;
        $scope.unit = $stateParams.unit;
        $scope.room = $stateParams.room;

        $scope.waterFr = $rootScope.waterFree;
        $scope.eleFr = $rootScope.eleFree;

        $scope.totalFee = $rootScope.waterFree + $rootScope.eleFree;


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
                    alert(data.appid);
                    wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.appid, // 必填，公众号的唯一标识
                        timestamp: sessionStorage.getItem("timestamp"), // 必填，生成签名的时间戳
                        nonceStr: sessionStorage.getItem("noncestr"), // 必填，生成签名的随机串
                        signature: sessionStorage.getItem("sign"), // 必填，签名，见附录1
                        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    // //wx.ready(function(){
                    //     wx.getLocation({
                    //         type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    //         success: function (res) {
                    //             var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    //             var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    //             var speed = res.speed; // 速度，以米/每秒计
                    //             var accuracy = res.accuracy; // 位置精度
                    //             alert("weixin location:" + latitude + ","+longitude+",精度："+accuracy);
                    //         }
                    //     });
                    // // });
                    // wx.ready(function(){
                    //     wx.getLocation({
                    //         type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    //         success: function (res) {
                    //             var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    //             var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    //             var speed = res.speed; // 速度，以米/每秒计
                    //             var accuracy = res.accuracy; // 位置精度
                    //             alert("weixin location:" + latitude + ","+longitude+",精度："+accuracy);
                    //         }
                    //     });
                    //  });
                    wx.error(function(res){
                        alert("wx.error");
                        alert(res);
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
