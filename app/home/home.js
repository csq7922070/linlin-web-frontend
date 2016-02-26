angular.module('app.home').controller('homeCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
    'locationState', 'communityLocation', '$q', 'userInfo', 'errorLog', 'location',
    'address','auth','control','addressInfo',
    function($scope, $http, $stateParams, $rootScope, $state, $location, locationState, communityLocation, $q, 
        userInfo,errorLog, location,address,auth,control,addressInfo) {
        var cmmInfo = communityLocation.getLastCommunity();
        if(!cmmInfo.name){
            $state.go('auto-location');
            return;
        }
        function refreshCommunityInfo(){
            $scope.communityName = cmmInfo.name.length >4 ? cmmInfo.name.substring(0,3)+"..." : cmmInfo.name;
        }
        refreshCommunityInfo();

        $scope.changeCommunity = function(){
            $state.go('auto-location');
        }

        if(!locationState.hasLocation){
            communityLocation.autoLocationCommunity().then(function(data){
                //alert(errorLog.getErrorMessage(data));
                setCommunity(data);
            },function(reason){
                //首页自动定位失败暂时不做提示
                //alert(reason.errorCode + ","+reason.errorMessage);
            });
        }
        // var data = {areaName:"1",lastAreaName:"2",city:"bj",lastCity:'bj',address:'address1',lastAddress:'address2',type:'false'};
        // setCommunity(data);

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
                    if(state){
                        communityLocation.changeCommunityHand = true;
                    }
                    defer.resolve(state);
                    $scope.showModal = false;
                }
            }else{
                defer.resolve(true);
            }
            defer.promise.then(function(selectCurrent){//selectCurrent代表是否选择当前自动定位小区为登陆小区
                if(selectCurrent){
                    var cmmInfo = {
                        id: data.id,
                        name:data.areaName,
                        city: data.city,
                        address: data.address,
                        auth: data.state
                    };
                    refreshCommunityInfo();
                    userInfo.getOpenId().then(function(data){
                        var openId = data;
                        communityLocation.changeCommunity(openId, cmmInfo).then(function(data){//保存用户选择的小区信息到服务器
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

        $scope.pay = function(){
            addressInfo.id = null;
            $state.go('bill');
        }
    }
]);
