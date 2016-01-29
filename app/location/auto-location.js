angular.module('app.location').controller('autoLocationCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
	'communityInfo',
    function($scope, $http, $stateParams, $rootScope, $state, $location, communityInfo) {
    	$scope.clickSearchField = function(){
    		$state.go('search-location');
    	}

    	$scope.retryLocation = function(){
    		console.log("retryLocation...");
    	}

    	$scope.changeCommunity = function(community){
    		console.log(community);
    		communityInfo.name = community.name;
    		$state.go('home');
    	}

    	$scope.autoLocationCommunities = [
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

    	// //test
    	// //-------------------------
    	// var x=document.getElementById("auto-location-container");
     //      function getLocation()
     //      {
     //        //alert("start");
     //      if (navigator.geolocation)
     //        {
     //            //alert("start getCurrentPosition");
     //        navigator.geolocation.getCurrentPosition(showPosition, showError);
     //        }
     //          else{
     //            //alert("not supported by this browser");
     //            x.innerHTML="Geolocation is not supported by this browser.";}
     //          }
     //      function showPosition(position)
     //      {
     //        //alert("showPosition...");
     //      x.innerHTML="Latitude: " + position.coords.latitude +
     //      "<br />Longitude: " + position.coords.longitude+
     //      "<br />accuracy: " + position.coords.accuracy;
     //      }
     //      function showError(error)
     //      {
     //        //alert("showError");
     //      switch(error.code)
     //        {
     //        case error.PERMISSION_DENIED:
     //          x.innerHTML="User denied the request for Geolocation."
     //          break;
     //        case error.POSITION_UNAVAILABLE:
     //          x.innerHTML="Location information is unavailable."
     //          break;
     //        case error.TIMEOUT:
     //          x.innerHTML="The request to get user location timed out."
     //          break;
     //        case error.UNKNOWN_ERROR:
     //          x.innerHTML="An unknown error occurred."
     //          break;
     //        }
     //      }

     //      getLocation();
    	// // end test
    	// //---------------------------
    }
]);
