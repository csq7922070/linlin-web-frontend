angular.module('app.log')
	.service('errorLog', ['$q','$http','$timeout', function($q,$http,$timeout){
		this.getErrorMessage = function(error){
			var message = "";
			if(typeof(error) == "object" && error){
				for(var i in error){
					message+=error[i]+",";
				}
				message = message.substr(0, message.length - 1);
			}else{
				message += error;
			}
			return message;
		}

		this.getFullErrorMessage = function(error){
			var message = "";
			if(typeof(error) == "object" && error){
				for(var i in error){
					message+=i+"="+error[i]+",";
				}
				message = message.substr(0, message.length - 1);
			}else{
				message += error;
			}
			return message;
		}
	}]);