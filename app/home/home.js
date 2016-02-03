angular.module('app.home').controller('homeCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
    'communityInfo', 'locationState', 'communityLocation', '$q',
    function($scope, $http, $stateParams, $rootScope, $state, $location, communityInfo, locationState, communityLocation, $q) {
        $scope.refreshCommunityInfo = function(){
            $scope.communityName = communityInfo.name.length >4 ? communityInfo.name.substring(0,3)+"..." : communityInfo.name;
        }
        $scope.refreshCommunityInfo();
        $scope.changeCommunity = function(){
            $state.go('auto-location');
        }

        if(!locationState.hasLocation){
            communityLocation.autoLocationCommunity().then(function(data){
                setCommunity(data);
            },function(reason){
                //首页自动定位失败暂时不做提示
            });
        }

        function setCommunity(data){
            var defer = $q.defer();
            if(!communityLocation.compareCommunity(data)){//检测到2次小区地址不一致
                //需要提示用户是否切换到当前定位地址
                $scope.modalTip = "检测到当前登陆位置为"+data.city+data.areaName+", "+
                    "上次登陆位置为"+data.lastCity+data.lastAreaName+", 是否切换?"
                $scope.tipAlign = "left";
                $scope.okText = "切换";
                $scope.showModal = true;
                $scope.onModalClose = function(state){//state is true or false
                    defer.resolve(state);
                    $scope.showModal = false;
                }
            }else{
                defer.resolve(true);
            }
            defer.promise.then(function(selectCurrent){//selectCurrent代表是否选择当前自动定位小区为登陆小区
                if(selectCurrent){
                    var cmm = {
                        name:data.areaName,
                        city: data.city,
                        address: data.address
                    };
                    angular.extend(communityInfo, cmm);
                    $scope.refreshCommunityInfo();
                    communityLocation.storageCommunity(communityInfo);
                    userInfo.getOpenId().then(function(data){
                        var openId = data;
                        communityLocation.changeCommunity(openId, cmm).then(function(data){//保存用户选择的小区信息到服务器
                            console.log("changeCommunity success.");
                        },function(reason){
                            alert(reason.errorCode +"," +reason.errorMessage);
                        });
                    },function(reason){
                        alert(reason.errorCode + ","+reason.errorMessage);
                    });
                }
                locationState.hasLocation = true;
            });
        }

        // var url = $location.url().substring($location.url().indexOf("?"));
        // if (url.indexOf("home") != -1) {
        //     url = "";
        // }
        // //1.6获取微信用户openid
        // if (sessionStorage.getItem("openid") == null) {
        //     $http({
        //         method: "GET",
        //         url: basePath + '/getopenid' + url
        //     }).success(function(data) {
        //         sessionStorage.setItem("openid", data.openid);
        //         //添加微信支付
        //         sessionStorage.setItem("timestamp", data.timestamp);
        //         sessionStorage.setItem("noncestr", data.noncestr);
        //         sessionStorage.setItem("sign", data.sign);
        //         console.log("获取openid成功");
        //     }).error(function(data) {
        //         console.log("获取openid失败");
        //     });
        // }

        $scope.slides7 = [{
            id: 10,
            label: "slide #1",
            img: "images/banner_01.png"
        }, {
            id: 11,
            label: "slide #2",
            img: "images/banner_02.png"
        }, {
            id: 12,
            label: "slide #3",
            img: "images/banner_03.png"
        }];
        $scope.carouselIndex7 = 0;

        $rootScope.site = 1;
        $state.go("home.shop-info", {
            site: 1
        });
    }
]);
