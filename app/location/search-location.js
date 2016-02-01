angular.module('app.location').controller('searchLocationCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
	'$timeout', 'communityInfo', 'communityList', 'communitySearch',
    function($scope, $http, $stateParams, $rootScope, $state, $location,$timeout, communityInfo, communityList, communitySearch) {
    	$scope.loadingTip = "数据加载中...";
    	$scope.loadingShow = true;
    	$scope.lockClickHide = true;

    	var cmmList = null;
    	communityList.getCommunityList('廊坊')
    		.then(function(data){
    			cmmList = data;
    			communitySearch.cmmList = cmmList;
    			$scope.loadingShow = false;
    		},function(reason){
    			console.log(reason);
    			$scope.loadingTip = "数据加载失败";
    			$scope.lockClickHide = false;
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
    		$state.go('home');
    	}

    	$scope.searchLocationCommunities = [];

    	$scope.clearSearchField = function(){
    		$scope.communityName = "";
    	}
    }
]);
