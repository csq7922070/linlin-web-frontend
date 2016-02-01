angular.module('app.location')
	.service('location', ['$q', function($q){
        this.getLocation = function()
        {
        	var defer = $q.defer();
	        if (navigator.geolocation)
	        {
	        	navigator.geolocation.getCurrentPosition(showPosition, showError);
	        }
		    else{
		        defer.reject("浏览器不支持定位。");
	        }

	        function showPosition(position)
	        {
	        	defer.resolve(position.coords);
			    console.log(position.coords);
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
	        	var errorReason = "";
	          	switch(error.code)
	            {
		            case error.PERMISSION_DENIED:
		                errorReason="User denied the request for Geolocation."
		                break;
		            case error.POSITION_UNAVAILABLE:
		                errorReason="Location information is unavailable."
		                break;
		            case error.TIMEOUT:
		                errorReason="The request to get user location timed out."
		                break;
		            case error.UNKNOWN_ERROR:
		                errorReason="An unknown error occurred."
		                break;
	            }
	            defer.reject(errorReason);
			}
			return defer.promise;
		}
	}]);