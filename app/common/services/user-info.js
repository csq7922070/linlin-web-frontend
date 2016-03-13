angular.module('app.user')
	.service('userInfo', ['$q','$http','$timeout', '$location', 'errorLog',
		function($q,$http,$timeout, $location, errorLog){
		var wxParam = null;//此参数是用户进入公众号页面后微信传入的参数，根据此参数再调API获取用户的OpenId，此参数是微信动态生成的，不可持久化到本地
		var openId = null;//可持久化到本地
		// var wxConfigParam = {
		// 	timestamp : null,
		// 	noncestr : null,
		// 	sign : null,
		// };
		var wxConfigParam = null;//object type，服务器动态生成，不可持久化到本地
		var tel = null;//用户的手机号

		this.initWxParam = function(){
			if(!wxParam){
				var url = $location.url().substring($location.url().indexOf("?"));
				if(url.indexOf("?code")==0){//微信传给页面的参数以?code开头
					wxParam = url;
				}else if(localStorage.debug=="true"){//此判断是为了在PC浏览器中调试时能够获取测试用的OpenId
					wxParam="";//获取到的测试openId将为124
				}
			}
		}

		this.init = function(){
			if(!wxParam){
				this.initWxParam();
				this.getOpenIdWxConfigParam();
			}
		}

		this.getOpenId = function(){
			var defer = $q.defer();
			if (!openId){
				if(localStorage.openId){
					openId = localStorage.openId;
					defer.resolve(openId);
				}else{
					this.getOpenIdWxConfigParam().then(function(data){
		                defer.resolve(openId);
					},function(reason){
						var reason = {
		    				errorCode: "GET_OPENID_ERROR",
		    				errorMessage: errorLog.getErrorMessage(reason)
		    			};
		                defer.reject(reason);
					});
				}
	        }else{
	        	defer.resolve(openId);
	        }
	        return defer.promise;
		}

		this.getOpenIdSync = function(){
			if(!openId){
				openId = localStorage.openId;
			}
			return openId;
		}

		this.getWxConfigParam = function(){
			var defer = $q.defer();
			if(!wxConfigParam){
				this.getOpenIdWxConfigParam().then(function(data){
	                defer.resolve(wxConfigParam);
				},function(reason){
					var reason = {
	    				errorCode: "GET_WXCP_ERROR",
	    				errorMessage: errorLog.getErrorMessage(reason)
	    			};
	                defer.reject(reason);
				});
			}else{
				defer.resolve(wxConfigParam);
			}
			return defer.promise;
		}

		// this.getWxConfigParamSync = function(){
		// 	return wxConfigParam;
		// }

		this.getOpenIdWxConfigParam = function(){
			var defer = $q.defer();
			if(!wxParam){
				this.initWxParam();
			}
			if(!wxParam&&localStorage.debug!="true"){
				var reason = {
    				errorCode: "GET_OPENID_WX_CONFIG_PARAM_ERROR",
    				errorMessage: "wxParam is null or empty string"
    			};
                defer.reject(reason);
			}else{
				$http({
	                method: "GET",
	                url: basePath + '/users/getopenid' + wxParam
	            }).success(function(data) {
	            	openId = data.openid;
					localStorage.openId = openId;
	                //微信配置接口所需参数
	                wxConfigParam = {
	                	timestamp : data.timestamp,
	                	noncestr : data.noncestr,
	                	sign : data.sign
	                };
	                defer.resolve(data);
	            }).error(function(reason) {
	                var reason = {
	    				errorCode: "GET_OPENID_CALL_ERROR",
	    				errorMessage: errorLog.getErrorMessage(reason)
	    			};
	                defer.reject(reason);
	            });
        	}
		    return defer.promise; 
		}

		this.storageLoginInfo = function(tel,nickName,headImgUrl){
			var loginInfo = {
				openId: openId,
				tel: tel,
				nickName: nickName,
				headImgUrl: headImgUrl,
				login: true,
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
			localStorage.openId = "";//注销登录时从localStorage中清空openId
			if(localStorage.loginInfo){
				var loginInfo = JSON.parse(localStorage.loginInfo);
				loginInfo.login = false;
				localStorage.loginInfo = JSON.stringify(loginInfo);
			}
		}
	}]);