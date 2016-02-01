angular.module('app.location').controller('autoLocationCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
	'communityInfo', 'communityLocation', 'location', '$q', 'userInfo',
    function($scope, $http, $stateParams, $rootScope, $state, $location, communityInfo, communityLocation, location, $q, userInfo) {
    	$scope.loadingTip = "定位中...";
    	$scope.loadingShow = true;
    	$scope.lockClickHide = true;

    	$scope.showLocationError = false;

    	$scope.clickSearchField = function(){
    		$state.go('search-location');
    	}

    	$scope.retryLocation = function(){
    		//return communityLocation.locationCommunity(124, 11, 133);
    		console.log("retryLocation...");
    		$scope.showLocationError = false;
    		$scope.loadingTip = "定位中...";
    		$scope.loadingShow = true;
    		var openId = null;
    		userInfo.getOpenId().then(function(data){//openid
    			openId = data;
    			return location.getLocation();
    		},function(reason){
    			reason = "get openid error: " + reason;
    			return $q.reject(reason);
    		}).then(function(data){//location
    			// var s = "openid:"+openId+","+data.longitude+","+data.latitude;
    			// alert(s);
    			return communityLocation.locationCommunity(openId, data.longitude, data.latitude);
    		},function(reason){
    			reason = "get location error: "+reason;
    			return $q.reject(reason);
    			// openId = "o-YfcstQPoTDSPuNHZ44cEof8";
    			// var longitude = 116.303128;
    			// var latitude = 39.979436;
    			// return communityLocation.locationCommunity(openId, longitude, latitude);
    		}).then(function(data){//community
    			$scope.autoLocationCommunities = [{
    				name:data.areaName,
    				city: data.city,
    				address: data.address,
    				title: data.city + ', '+data.areaName
    			}];
    			// for(var i=0;i<data.length;i++){
    			// 	$scope.autoLocationCommunities.push({
    			// 		name : data[i].areaName,
    			// 		city : data[i].city,
    			// 		address : data[i].address,
    			// 		title : data[i].city + ", "+data[i].areaName
    			// 	});
    			// }
    			$scope.loadingShow = false;
    		}, function(reason){
    			alert(reason);
    			$scope.loadingShow = false; 
    			$scope.showLocationError = true;
    		});
    	}

    	$scope.changeCommunity = function(community){
    		console.log(community);
    		communityInfo.name = community.name;
    		communityInfo.city = community.city;
    		communityInfo.address = community.address;
    		$state.go('home');
    	}

    	$scope.autoLocationCommunities = [];

    	$scope.retryLocation();//自动定位页面加载时便开始自动定位小区

    	//test
    	//-------------------------
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
     		//if (sessionStorage.getItem("openid") == null) {
     		// var url = $location.url().substring($location.url().indexOf("?"));
	      //   if (url.indexOf("home") != -1) {
	      //       url = "";
	      //   }
	      //   url="";
     //        $http({
     //            method: "GET",
     //            url: basePath + '/GPS/findSign'
     //        }).success(function(data) {
     //            sessionStorage.setItem("appid", data.appid);
     //            //添加微信支付
     //            sessionStorage.setItem("timestamp", data.timestamp);
     //            sessionStorage.setItem("noncestr", data.noncestr);
     //            sessionStorage.setItem("sign", data.sign);
     //            console.log("获取openid成功");
     //            wx.config({
		   //          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		   //          appId: "wx050cc99d8cec1a73", // 必填，公众号的唯一标识
		   //          timestamp: sessionStorage.getItem("timestamp"), // 必填，生成签名的时间戳
		   //          nonceStr: sessionStorage.getItem("noncestr"), // 必填，生成签名的随机串
		   //          signature: sessionStorage.getItem("sign"), // 必填，签名，见附录1
		   //          jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		   //      });
			  //    wx.ready(function(){
					// wx.getLocation({
					//     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					//     success: function (res) {
					//         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					//         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
					//         var speed = res.speed; // 速度，以米/每秒计
					//         var accuracy = res.accuracy; // 位置精度
					//         alert("weixin location:" + latitude + ","+longitude+",精度："+accuracy);
					//     }
					// });
			  //    });
			  //    // wx.error(function(res){
			  //    // 	alert("wx.error");
			  //    // 	alert(res);
			  //    // });
     //        }).error(function(data) {
     //            console.log("获取openid失败");
     //        });
        //}
            
     	
    	// end test
    	//---------------------------
    }
]);
