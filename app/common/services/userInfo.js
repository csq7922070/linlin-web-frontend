angular.module('app.user')
	.service('userInfo', ['$q','$http','$timeout', '$location', 'errorLog', function($q,$http,$timeout, $location, errorLog){
		var wxParam = null;//此参数是用户进入公众号页面后微信传入的参数，根据此参数再调API获取用户的OpenId
		var openId = null;
		var wxConfigParam = {
			timestamp : null,
			noncestr : null,
			sign : null,
		};
		var tel = null;//用户的手机号

		this.initWxParam = function(){
			if(!wxParam){
				var url = $location.url().substring($location.url().indexOf("?"));
				if(url.indexOf("?code")<0){//此判断是为了在PC浏览器中调试时能够获取测试用的OpenId
					url="";
				}
				if(!url && localStorage.wxParam && localStorage.wxParam.indexOf("?code")>=0){
					url = localStorage.wxParam;
				}
				wxParam = url;
				localStorage.wxParam = wxParam;
			}
		}

		this.getOpenId = function(){
			var defer = $q.defer();
			if (!openId){
				if(!wxParam){
					this.initWxParam();
				}
	            $http({
	                method: "GET",
	                url: basePath + '/users/getopenid' + wxParam
	            }).success(function(data) {
	            	openId = data.openid;
	                //微信配置接口所需参数
	                wxConfigParam.timestamp = data.timestamp;
	                wxConfigParam.noncestr = data.noncestr;
	                wxConfigParam.sign = data.sign;
	                //test
	                sessionStorage.setItem("openid", data.openid);
	                //添加微信支付
	                sessionStorage.setItem("timestamp", data.timestamp);
	                sessionStorage.setItem("noncestr", data.noncestr);
	                sessionStorage.setItem("sign", data.sign);
	                // end test
	                defer.resolve(openId);
	            }).error(function(data) {
	                var reason = {
	    				errorCode: "GET_OPENID_ERROR",
	    				errorMessage: errorLog.getErrorMessage(data)
	    			};
	                defer.reject(reason);
	            });
	        }else{
	        	defer.resolve(openId);
	        }
	        return defer.promise;
		}

		this.getWxConfigParam = function(){
			var defer = $q.defer();
			if(!wxConfigParam.timestamp || !wxConfigParam.noncestr || !wxConfigParam.sign){
				if(!wxParam){
					this.initWxParam();
				}
	            $http({
	                method: "GET",
	                url: basePath + '/users/getopenid' + wxParam
	            }).success(function(data) {
	            	openId = data.openid;
	                //微信配置接口所需参数
	                wxConfigParam.timestamp = data.timestamp;
	                wxConfigParam.noncestr = data.noncestr;
	                wxConfigParam.sign = data.sign;
	                //添加微信支付
	                sessionStorage.setItem("timestamp", data.timestamp);
	                sessionStorage.setItem("noncestr", data.noncestr);
	                sessionStorage.setItem("sign", data.sign);
	                // end test
	                defer.resolve(wxConfigParam);
	            }).error(function(data) {
	                //alert("获取微信配置接口参数失败："+data);
	                var reason = {
	    				errorCode: "GET_WXCP_ERROR",
	    				errorMessage: errorLog.getErrorMessage(data)
	    			};
	                defer.reject(reason);
	            });
			}else{
				defer.resolve(wxConfigParam);
			}
			return defer.promise;
		}

		this.storageLoginInfo = function(tel,nickname,headImgUrl){
			var loginInfo = {
				openId: openId,
				tel: tel,
				nickname: nickname,
				headImgUrl: headImgUrl,
				date: new Date()
			};
			localStorage.loginInfo = JSON.stringify(loginInfo);
		}

		this.getLastLoginInfo = function(){
			var loginInfo = null;
			if(localStorage.loginInfo){
				loginInfo = JSON.parse(localStorage.loginInfo);
			}
			return loginInfo;
		}

		this.storageLogoutInfo = function(){
			if(localStorage.loginInfo){
				localStorage.loginInfo = JSON.stringify(loginInfo);
			}
		}
	}]);