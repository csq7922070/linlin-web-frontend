angular.module('app.location').controller('locationCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
    'communityLocation', 'location', '$q', 'userInfo', 'errorLog', 'locationState','cityList','citySearch',
    'appType','$timeout',
    function($scope, $http, $stateParams, $rootScope, $state, $location, communityLocation, location, $q, userInfo, 
        errorLog,locationState,cityList,citySearch,appType,$timeout) {
        userInfo.init();//微信参数只会在公众号第一个页面传入
        //判断是否需要直接跳转至首页
        var city = communityLocation.getLastCity();
        if(!locationState.locationVisited && city){
            locationState.locationVisited = true;
            $state.go('home');
            return;
        }

        //加载城市列表数据
        $scope.showLoading = true;
        var cities = null;
        cityList.getCityList().then(function(data){//data format:[{initial,items:[cityName,initial,pinyin]}]
            $scope.showLoading = false;
            $scope.cities = citySearch.cityList = cities = data;
            //$scope.focus = true;
        },function(reason){
            $scope.showLoading = false;
            alert(reason.errorCode +"," +reason.errorMessage);
        });

        //处理搜索逻辑
        $scope.cities = [];
        $scope.showInexistenceTip = false;
        var changePromise = null;
        $scope.$watch("cityName", function(newVal, oldVal){
            if(newVal != oldVal){
                if(changePromise){ 
                    $timeout.cancel(changePromise);
                }
                changePromise = $timeout(function(){
                    $scope.showInexistenceTip = false;
                    $scope.cities = citySearch.searchCity($scope.cityName);
                    if($scope.cityName && $scope.cities.length == 0){
                        $scope.showInexistenceTip = true;
                    }else if(!$scope.cityName){
                        $scope.cities = cities;
                    }
                }, 700);
            }
        });

        //修改当前城市，可以是定位城市、推荐城市、城市列表中的城市
        $scope.changeCity = function(city){//city type:string
            var openId = null;
            userInfo.getOpenId().then(function(data){
                openId = data;
                communityLocation.changeCity(openId, city).then(function(data){//保存用户选择的城市信息到服务器
                    locationState.hasLocation = true;
                    locationState.locationVisited = true;
                    $state.go('home');
                },function(reason){
                    alert(reason.errorCode +"," +reason.errorMessage);
                });
            },function(reason){
                alert(reason.errorCode +"," +reason.errorMessage);
            });
        }

        $scope.clearSearchField = function(){
            $scope.cityName = "";
        }

        //自动定位逻辑
        //openId = "o-YfcstQPoTDSPuNHZ44cEof8";
        $scope.retryLocation = function(){
            $scope.showLocationLoading = true;
            $scope.showLocationError = false;
            communityLocation.autoLocationCommunity().then(function(data){
                $scope.showLocationLoading = false;
                // alert(errorLog.getFullErrorMessage(data));
                $scope.locationCity = data.city;
                if(!locationState.locationVisited && $scope.locationCity){
                    $scope.changeCity($scope.locationCity);
                }
            },function(reason){
                $scope.showLocationLoading = false;
        //      if(reason && reason.errorCode == "PERMISSION_DENIED"){//用户拒绝了定位请求，提示打开定位功能
        //          $scope.modalTitle = "定位服务未开启";
        //          $scope.modalTip = "请在系统设置中开启定位服务";
        //          $scope.tipAlign = "center";
        //          $scope.okText = "确定";
        //          $scope.onlyOkButton = true;
        //          $scope.showModal = true;
        //          $scope.onModalClose = function(state){//state on is true
        //              $scope.modalTitle = "";
        //              $scope.onlyOkButton = false;
                    //  $scope.showModal = false;
                    // }
        //      }else{
        //          alert(reason.errorCode + "," + reason.errorMessage);
        //      }
                if(reason && reason.errorCode == "PERMISSION_DENIED"){
                    alert("定位服务未开启, 请在系统设置中开启定位服务");
                } else{
                    alert(errorLog.getErrorMessage(reason));
                }
                $scope.showLocationError = true;
            });
        }

        $scope.retryLocation();//页面加载时便开始自动定位城市
    }
]);