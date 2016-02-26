angular.module('app.location').controller('autoLocationCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
	'communityInfo', 'communityLocation', 'location', '$q', 'userInfo', 'errorLog', 'locationState',
    'appType',
    function($scope, $http, $stateParams, $rootScope, $state, $location, communityInfo, communityLocation, location, $q, userInfo, 
        errorLog,locationState,appType) {
        userInfo.initWxParam();//微信参数只会在公众号第一个页面传入
        //alert($location.url());
    	var locInfo = location.getLastLocation();
        var cmmInfo = communityLocation.getLastCommunity();
    	if(!locationState.autoLocationVisited && cmmInfo){
    		angular.extend(communityInfo, cmmInfo);
    		locationState.autoLocationVisited = true;
    		$state.go('home');
    		return;
    	}

    	$scope.clickSearchField = function(){
    		locationState.autoLocationVisited = true;
    		$state.go('search-location');
    	}


        console.log(communityInfo.name+ ' 11');

    	//openId = "o-YfcstQPoTDSPuNHZ44cEof8";
    	$scope.retryLocation = function(){
    		$scope.showLocationError = false;
    		$scope.loadingTip = "定位中...";
    		$scope.loadingShow = true;
    		communityLocation.autoLocationCommunity().then(function(data){
    			setCommunity(data);
    		},function(reason){
    			if(reason && reason.errorCode == "PERMISSION_DENIED"){//用户拒绝了定位请求，提示打开定位功能
    				$scope.modalTitle = "定位服务未开启";
    				$scope.modalTip = "请在系统设置中开启定位服务";
    				$scope.tipAlign = "center";
    				$scope.okText = "确定";
    				$scope.onlyOkButton = true;
    				$scope.showModal = true;
    				$scope.onModalClose = function(state){//state on is true
    					$scope.modalTitle = "";
    					$scope.onlyOkButton = false;
						$scope.showModal = false;
					}
    			}else{
    				alert(reason.errorCode + "," + reason.errorMessage);
    			}
    			$scope.loadingShow = false; 
    			$scope.showLocationError = true;
    		});
    	}

    	function setCommunity(data){
    		var defer = $q.defer();
			$scope.loadingShow = false;
			if(!locationState.autoLocationVisited && !communityLocation.compareCommunity(data)){//首次登陆定位且检测到2次小区地址不一致
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
					setCurrentCommunity(data);
				}else{
					setLastCommunity(data);
				}
				if(!locationState.autoLocationVisited && $scope.autoLocationCommunities.length > 0){
					$scope.changeCommunity($scope.autoLocationCommunities[0]);
				}
			});
    	}

    	function setLastCommunity(data){
    		$scope.autoLocationCommunities = [{
				name:data.lastAreaName,
				city: data.lastCity,
				address: data.lastAddress,
				title: data.lastCity + ', '+data.lastAreaName,
				auth: data.lastState
			}];
    	}

    	function setCurrentCommunity(data){
			$scope.autoLocationCommunities = [{
				name:data.areaName,
				city: data.city,
				address: data.address,
				title: data.city + ', '+data.areaName,
				auth: data.state
			}];
    	}

    	$scope.changeCommunity = function(community){
    		angular.extend(communityInfo, community);
    		communityLocation.storageCommunity(communityInfo);
			var openId = null;
			userInfo.getOpenId().then(function(data){
				openId = data;
				communityLocation.changeCommunity(openId, community).then(function(data){//保存用户选择的小区信息到服务器
	    			console.log("changeCommunity success.");
	    		},function(reason){
	    			alert(reason.errorCode +"," +reason.errorMessage);
	    		});
			},function(reason){
				alert(reason.errorCode +"," +reason.errorMessage);
			});
    		locationState.hasLocation = true;
    		locationState.autoLocationVisited = true;
    		$state.go('home');
    	}

    	$scope.autoLocationCommunities = [];

    	$scope.retryLocation();//自动定位页面加载时便开始自动定位小区
    }
]);
