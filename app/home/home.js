angular.module('app.home').controller('homeCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
    'locationState', 'communityLocation', '$q', 'userInfo', 'errorLog', 'location',
    'address','auth','control','addressInfo',
    function($scope, $http, $stateParams, $rootScope, $state, $location, locationState, communityLocation, $q, 
        userInfo,errorLog, location,address,auth,control,addressInfo) {
        //处理首页中的当前城市信息
        var city = communityLocation.getLastCity();
        if(!city){
            $state.go('location');
            return;
        }
        function refreshCityInfo(){
            $scope.city = city.length >4 ? city.substring(0,3)+"..." : city;
        }
        refreshCityInfo();

        //跳至定位页面
        $scope.changeCity = function(){
            $state.go('location');
        }

        //判断首页中是否需要自动定位
        if(!locationState.hasLocation){
            communityLocation.autoLocationCommunity().then(function(data){
                setCity(data);
            },function(reason){
                //首页自动定位失败暂时不做提示
                //alert(reason.errorCode + ","+reason.errorMessage);
            });
        }

        //处理定位成功后的逻辑
        function setCity(data){
            var defer = $q.defer();
            if(!communityLocation.compareCity(data)){//检测到2次城市不一致
                //需要提示用户是否切换到当前定位地址
                $scope.modalTip = "检测到当前登陆位置为"+data.city+", "+
                    "上次登陆位置为"+data.lastCity+", 是否切换?"
                $scope.tipAlign = "left";
                $scope.okText = "切换";
                $scope.showModal = true;
                $scope.onModalClose = function(state){//state is true or false
                    if(state){
                        communityLocation.changeCommunityHand = true;
                    }
                    defer.resolve(state);
                    $scope.showModal = false;
                }
            }else{
                defer.resolve(true);
            }
            defer.promise.then(function(selectCurrent){//selectCurrent代表是否选择当前自动定位城市为登陆城市
                if(selectCurrent){
                    city = data.city;
                    refreshCityInfo();
                    userInfo.getOpenId().then(function(data){
                        var openId = data;
                        communityLocation.changeCity(openId, city).then(function(data){//保存用户选择的城市信息到服务器
                            //alert("changeCommunity success,openId:"+openId+",cmmInfo:"+errorLog.getErrorMessage(cmmInfo));
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

        //首页轮播图配置数据
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

        //加载首页下方的附近商户信息页面
        $state.go("home.shop-info", {
            site: 0
        });
    }
]);