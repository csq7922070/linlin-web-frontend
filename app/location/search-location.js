angular.module('app.location').controller('searchLocationCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
	'$timeout', 'communityInfo', 'communityList', 'communitySearch', 'locationInfo', 'errorLog','userInfo','communityLocation',
    function($scope, $http, $stateParams, $rootScope, $state, $location,$timeout, communityInfo, communityList, communitySearch, locationInfo,errorLog,userInfo,communityLocation) {  	
    	$scope.loadingTip = "数据加载中...";
    	$scope.loadingShow = false;
    	$scope.lockClickHide = true;

    	var openId = null;
		userInfo.getOpenId().then(function(data){
			openId = data;
		});

    	var cmmList = null;
    	communityList.getCommunityList(communityInfo.city)
    		.then(function(data){
    			//alert("cmmList.length: "+data.length);
    			cmmList = data;
    			communitySearch.cmmList = cmmList;
    			$scope.loadingShow = false;
    			$scope.focus = true;
    			//$("#community-search-field").focus();
    			//$("#community-search-field").trigger("focus");
    		},function(reason){
    			$scope.loadingShow = false;
    			reason = "数据加载失败: "+errorLog.getErrorMessage(reason);
    			alert(reason);
    		});

    	console.log(communityInfo);
    	$scope.changeCommunity = function(community){
    		console.log(community);
    	}

    	$scope.showInexistenceTip = false;

    	var changePromise = null;
    	$scope.$watch("communityName", function(newVal, oldVal){
    		if(newVal != oldVal){
    			if(changePromise){
    				$timeout.cancel(changePromise);
    			}
    			changePromise = $timeout(function(){
    				console.log("change...");
    				$scope.showInexistenceTip = false;
    				$scope.searchLocationCommunities = communitySearch.searchCommunity($scope.communityName);
    				if($scope.communityName && $scope.searchLocationCommunities.length == 0){
    					$scope.showInexistenceTip = true;
    				}
    				//console.log($scope.searchLocationCommunities);
    			}, 700);
    		}
    	});

    	$scope.changeCommunity = function(community){
    		console.log(community);
    		communityInfo.name = community.name;
    		communityInfo.city = community.city;
    		communityInfo.address = community.address;
    		locationInfo.locationCount++;
    		communityLocation.changeCommunity(openId, community).then(function(data){//保存用户选择的小区信息到服务器
    			console.log("communityLocation.changeCommunity success.");
    		},function(reason){
    			alert("communityLocation.changeCommunity error: "+errorLog.getErrorMessage(reason));
    		});
    		$state.go('home');
    	}

    	$scope.searchLocationCommunities = [];

    	$scope.clearSearchField = function(){
    		$scope.communityName = "";
    	}
    }
]);
