angular.module('app.user')
	.service('userInfo', ['$q','$http','$timeout', '$location', 'errorLog', function($q,$http,$timeout, $location, errorLog){
		var wxParam = null;//此参数是用户进入公众号页面后微信传入的参数，根据此参数再调API获取用户的OpenId
		var openId = null;
		// var wxConfigParam = {
		// 	timestamp : null,
		// 	noncestr : null,
		// 	sign : null,
		// };
		var wxConfigParam = null;//object type
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
				if(localStorage.openId){
					openId = localStorage.openId;
					defer.resolve(openId);
				}else{
					if(!wxParam){
						this.initWxParam();
					}
					getOpenIdWxConfigParam().then(function(data){
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
			return openId;
		}

		this.getWxConfigParam = function(){
			var defer = $q.defer();
			if(!wxConfigParam){
				if(!wxParam){
					this.initWxParam();
				}
				getOpenIdWxConfigParam().then(function(data){
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

		function getOpenIdWxConfigParam(){
			var defer = $q.defer();
			if(!wxParam){
				alert("wxParam is null or empty string.");
			}
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
    				errorCode: "GETOPENID_CALL_ERROR",
    				errorMessage: errorLog.getErrorMessage(reason)
    			};
                defer.reject(reason);
            });
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
			localStorage.wxParam = "";
			localStorage.openId = "";//注销登录时从localStorage中清空wxParam和openId
			if(localStorage.loginInfo){
				var loginInfo = JSON.parse(localStorage.loginInfo);
				loginInfo.login = false;
				localStorage.loginInfo = JSON.stringify(loginInfo);
			}
		}
	}]);