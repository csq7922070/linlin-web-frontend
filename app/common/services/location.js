angular.module('app.location')
	.service('location', ['$q', 'errorLog', function($q,errorLog){
        this.getLocation = function(){
        	var that = this;
        	var defer = $q.defer();
	        if (navigator.geolocation)
	        {
	        	navigator.geolocation.getCurrentPosition(showPosition, showError);
	        }
		    else{
		        defer.reject({
		        	errorCode: "BROWSER_NOT_SUPPORT",errorMessage: "浏览器不支持定位功能"
		        });
	        }

	        function showPosition(position)
	        {
	        	var locInfo = {
	        		latitude:position.coords.latitude,
	        		longitude:position.coords.longitude,
	        		accuracy:position.coords.accuracy
	        	};
	        	var state = that.storageLocation(locInfo);
	        	if(!state){
	        		alert("定位信息持久化失败");
	        	}
	        	defer.resolve(locInfo);
			    // console.log(position.coords);
			 	// coords.latitude	十进制数的纬度
				// coords.longitude	十进制数的经度
				// coords.accuracy	位置精度
				// coords.altitude	海拔，海平面以上以米计
				// coords.altitudeAccuracy	位置的海拔精度
				// coords.heading	方向，从正北开始以度计
				// coords.speed	速度，以米/每秒计
				// timestamp	响应的日期/时间
	        }

	        function showError(error)
	        {
	        	var reason = {};
	          	switch(error.code)
	            {
		            case error.PERMISSION_DENIED:
		            	reason.errorCode = "PERMISSION_DENIED";
		                reason.errorMessage="用户拒绝定位请求";
		                break;
		            case error.POSITION_UNAVAILABLE:
		            	reason.errorCode = "POSITION_UNAVAILABLE";
		                reason.errorMessage="定位信息不可用";
		                break;
		            case error.TIMEOUT:
		            	reason.errorCode = "TIMEOUT";
		                reason.errorMessage="定位超时";
		                break;
		            case error.UNKNOWN_ERROR:
		            	reason.errorCode = "UNKNOWN_ERROR";
		                reason.errorMessage="未知错误";
		                break;
	            }
	            defer.reject(reason);
			}
			return defer.promise;
		}

		//获取上一次定位信息，此信息通过localStorage持久化存储
		this.getLastLocation = function(){
			var loc = null;
			if(window.localStorage && localStorage.locationInfo){
				loc = JSON.parse(localStorage.locationInfo);
			}
			return loc;
		}

		this.storageLocation = function(locInfo){
			// //test code
			// alert("storageLocation...");
			// alert(errorLog.getFullErrorMessage(locInfo));
			// alert("json.stringify");
			// alert(JSON.stringify(locInfo));
			// //end test
			var state = false;
			if(window.localStorage){
				localStorage.locationInfo = JSON.stringify(locInfo);
				state = true;
			}
			return state;
		}
	}]);