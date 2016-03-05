angular.module('app.pay')
	.service('billPay', ['$q','$http','$timeout','errorLog', 'addresses','userInfo','payments','$filter',
		function($q,$http,$timeout, errorLog,addresses,userInfo,payments,$filter){
			var payBillInfo = null;

			this.getBillInfo = function(addressId){
				var defer = $q.defer();
				var params = {
	                id: 'query',
	                paymentState: 0,
	                queryType: 'houseId',
	                houseId: addressId
	            };
	            payments.query(params).$promise.then(function(data) {
	            	var billInfo = getFormatBillInfo(data);
	                defer.resolve(billInfo);
	            },function(reason){
	            	reason = {
	                    errorCode:"GET_BILL_LIST_ERROR",
	                    errorMessage:errorLog.getErrorMessage(reason)
	                };
	                defer.reject(reason);
	            });
				return defer.promise;
			}

			function getFormatBillInfo(data){
				var billInfo = {
					propertyFeeList:[],//物业费列表
					carMaintenanceFeeList:[],//车位维护费列表
					carportFeeList:[],//车位费列表
					lifeFeeList:[],//水电费列表
					otherFeeList:[]//物业费、车位维护费、车位费列表
				};	
                if(data.amountList){
                	for (var i = 0; i < data.amountList.length; i++) {
	                	var item = data.amountList[i];
	                	var billItem = angular.copy(item);
	                    if(billItem.type == 0 || billItem.type == 1){//type含义：0，水费、1，电费、2，物业费、3，车位维护费、4，车位费
	                    	for (var j = 0; j < billInfo.lifeFeeList.length; j++) {
		                    	var existBill = billInfo.lifeFeeList[j];
		                        if (existBill.year == billItem.year && existBill.month == billItem.month) {
		                            existBill.items.push(billItem);
		                            break;
		                        }
		                    }
		                    if (j == billInfo.lifeFeeList.length) {
		                        var bill = {
		                            date:item.year + "年" + item.month + "月",
		                            year: item.year,
		                            month: item.month,
		                            items: [billItem]
		                        };
		                        billInfo.lifeFeeList.push(bill);
		                    }
	                    }else if(billItem.type == 2||billItem.type == 3||billItem.type == 4){//物业费、车位维护费、车位费
	                    	billItem.date = billItem.year+"年"+billItem.month+"月"+billItem.day+"日起"+billItem.difference+"个月";
	                    	if(billItem.type == 2){
	                    		billInfo.propertyFeeList.push(billItem);
	                    	}else if(billItem.type == 3){
	                    		billInfo.carMaintenanceFeeList.push(billItem);
	                    	}else if(billItem.type == 4){
	                    		billInfo.carportFeeList.push(billItem);
	                    	}
	                    }
	                }
	                //将物业费、车位维护费、车位费列表按物业费、车为维护费、车位费顺序依次添加到数组otherFeeList中
	                billInfo.otherFeeList = billInfo.otherFeeList.concat(billInfo.propertyFeeList);
	                billInfo.otherFeeList = billInfo.otherFeeList.concat(billInfo.carMaintenanceFeeList);
	                billInfo.otherFeeList = billInfo.otherFeeList.concat(billInfo.carportFeeList);
                }
                return billInfo;
			}

			this.savePayBillInfo = function(billInfo){
				payBillInfo = billInfo;
			}

			this.getPayBillInfo = function(){
				return payBillInfo;
			}

			//dates format:['20153','201510'...]
			this.getMergeDate = function(dates){
				var formatDates = dates.map(_parseInt).sort(compare);
		        var dateSections = getSections(formatDates);
				var result = mergeDate(dateSections, formatDates);
				return result;

				//返回二位数组，比如[21051,20152,201510]返回[[20151,20152],[201510]]
		        function getSections(formatDates) {
		            var current = null;
		            var section = null;
		            var result = [];//二位数组

		            formatDates.forEach(function(item) {
		                if (current == item) {
		                    section.push(item);
		                    current++;
		                    return;
		                }

		                section = [item];
		                current = item + 1;
		                result.push(section);
		            });

		            return result;
		        }

		        function compare(a, b) {
		            return a - b;
		        }

		        function _parseInt() {
		            return parseInt(arguments[0]);
		        }

		        //dateSections是按相邻月分隔的二位数组，formatDates是按时间顺序排序的一维数组
		        function mergeDate(dateSections, formatDates){
		            var year,month;
		            var date;
		            if(dateSections.length > 0){
		                year = (formatDates[0] + "").substr(0, 4);
		                month = (formatDates[0] + "").substr(4, 2);
		                if(formatDates[0] != formatDates[formatDates.length - 1]){
		                     month += "-" + (formatDates[formatDates.length - 1] + "").substr(4, 2);
		                } 
		                date = year + "年" + month + "月";
		            }
		            if (dateSections.length > 1) {
		                if(dateSections[0].len == 1){
		                    var nextYear = dateSections[0][0].substr(0, 4);
		                    if(nextYear == year)
		                        date = date.substr(0, date.length - 1);//同年情况下去掉前一个日期结尾的“月”
		                    date+="、";
		                    if(nextYear == year)
		                        date += getSectionDateTextWithoutYear(dateSections[1]);
		                    else{
		                        date += getSectionDateText(dateSections[1]);
		                    }
		                    if(dateSections.length > 2)
		                        date+="等";
		                } else if(dateSections[0].length > 1){
		                    date+="等";
		                }
		            } 

		            return date;
		        }

		        function getSectionDateText(section){
		            var text = section[0].substr(0,4) + "年" + section[0].substr(4);
		            if(section[0] != section[section.length - 1]){
		                text+= "-" + section[section.length - 1].substr(4);
		            }
		            text+="月";
		            return text;
		        }

		        function getSectionDateTextWithoutYear(section){
		            var text = section[0].substr(4);
		            if(section[0] != section[section.length - 1]){
		                text+= "-" + section[section.length - 1].substr(4);
		            }
		            text+="月";
		            return text;
		        }
			}


			//获取微信支付相关签名参数
			//ids是以','为分隔符的id字符串
	        this.getPaySignParam = function(totalFee, openId, ids, tel){
	            var defer = $q.defer();
	            $http({
	                method: "POST",
	                url: basePath + '/payments',
	                params: {
	                    total_fee: totalFee,
	                    openid: openId,
	                    ids: ids,
	                    phone: tel
	                }
	            })
	            .then(function(response) {
	                if (response.data.return_code == "FAIL") {
	                    var reason = {
	                        errorCode:"GET_PAYMENT_SIGN_PARAM_ERROR",
	                        errorMessage:response.data.return_msg
	                    };
	                    defer.reject(reason);
	                }else{
	                    return defer.resolve(response.data);
	                }
	            },function(response){
	                var reason = {
	                    errorCode:"GET_PAYMENT_SIGN_PARAM_ERROR",
	                    errorMessage:errorLog.getErrorMessage(response.data)
	                };
	                return defer.reject(reason);
	            })
	            return defer.promise;
	        }

	        this.getPayList = function(){
				var defer = $q.defer();
				var openId = userInfo.getOpenIdSync();
				$http({
	                method: "GET",
	                url: basePath + "/payments/query",
	                params: {
	                    queryType: 'openid',
	                    openid: openId,
	                    paymentState: 1
	                }
	            }).then(function(response){
	            	var payList = [];
		            if(response.data.items){
		                payList = $filter("payListMerge")(response.data.items);
		            }
		            defer.resolve(payList);
		        },function(reason){
		            var reason = {
		                errorCode:"GET_PAY_LIST_ERROR",
		                errorMessage:errorLog.getErrorMessage(reason)
		            };
		            defer.reject(reason);
		        });
		        return defer.promise;
			}
		}
	]);