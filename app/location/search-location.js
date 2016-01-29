angular.module('app.location').controller('searchLocationCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
	'$timeout', 'communityInfo',
    function($scope, $http, $stateParams, $rootScope, $state, $location,$timeout, communityInfo) {
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
    			}, 700);
    		}
    	});

    	$scope.changeCommunity = function(community){
    		console.log(community);
    		communityInfo.name = community.name;
    		$state.go('home');
    	}

    	$scope.searchLocationCommunities = [
    		{
    			city: "北京",
    			name: "万科金域华府",
    			address: "京徽高速边500米",
    			title: "北京, 万科金域华府"
    		},
    		{
    			city: "北京",
    			name: "万科金域华府",
    			address: "京徽高速边500米",
    			title: "北京, 万科金域华府"
    		},
    		{
    			city: "北京",
    			name: "万科金域华府",
    			address: "京徽高速边500米",
    			title: "北京, 万科金域华府"
    		}
    	];
    }
]);
