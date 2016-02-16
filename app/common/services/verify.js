angular.module('app.verify')
	.service('verify', [
		function(){
			this.verifyTel = function(tel){//判断手机号是否符合格式要求
	            var result = true;
	            if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(tel)){
	              result = false;
	            }
	            return result;
	        }
	}]);