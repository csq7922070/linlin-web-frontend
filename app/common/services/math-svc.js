angular.module('app.math')
	.service('mathSvc', ['$q','$http','$timeout', '$location', 'errorLog',
		function($q,$http,$timeout, $location, errorLog){
		//计算a,b的和，a,b可以是数字也可以是代表数字的字符串，返回的和是字符串
		//a,b都是代表含有2位固定小数的数字
		this.add = function(a,b){
			var n1 = this.getHundredfold(a);
			var n2 = this.getHundredfold(b);
			var sum = n1+n2;
			sum = sum+"";
			var sumArr = sum.split('');
			if(sumArr.length>2){
				sumArr[sumArr.length-3]+=".";
			}else if(sumArr.length==2){
				sumArr.unshift("0.");
			}else if(sumArr.length==1){
				sumArr.unshift("0.0");
			}
			sum = sumArr.join('');
			return sum;
		}

		//计算a,b的差，a,b可以是数字也可以是代表数字的字符串，返回的差是字符串
		//a,b都是代表含有2位固定小数的数字
		this.minus = function(a,b){
			var n1 = this.getHundredfold(a);
			var n2 = this.getHundredfold(b);
			var minus = n1-n2;
			minus = minus+"";
			var minusArr = minus.split('');
			if(minusArr.length>2){
				minusArr[minusArr.length-3]+=".";
			}else if(minusArr.length==2){
				minusArr.unshift("0.");
			}else if(minusArr.length==1){
				minusArr.unshift("0.0");
			}
			minus = minusArr.join(''); 
			return minus;
		}

		//获取数字或代表数字的字符串n的百倍数字
		this.getHundredfold = function(n){
			var result = 0;
			if(angular.isNumber(n)){
				result = Math.round(n*100);
			}else if(angular.isString(n)){
				var index = n.indexOf(".");
				if(index>=0){
					n = n.replace(".","");
					result = parseInt(n); 
				}else{
					result = 100*parseInt(n); 
				}
			}
			return result;
		}
	}]);