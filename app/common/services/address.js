angular.module('app.address')
	.service('address', ['$q','$http','$timeout','errorLog', 'addresses',
		function($q,$http,$timeout, errorLog,addresses){
			// var defaultAddress = {
			// 	city: null,
			// 	community: null,
			// 	block: null,
			// 	unit: null,
			// 	room: null,
			//  roomId: null,
			// 	owner: null,//房屋所有者姓名
			// 	ownerStar: null//所有者姓名加*处理
			// };
			var defaultAddress = null;
			var addressList = null;
			var cityList = null;
			var getAddressListing = false;
			var addressListDefer = null;

			this.getDefaultAddress = function(){
				var defer = $q.defer();
				if(!defaultAddress){
					this.getAddressList().then(function(data){
						defaultAddress = getDefaultAddressFromList(data);
						if(defaultAddress){
							defer.resolve(defaultAddress);
						}else{
							reason = {
			            		errorCode: "GET_DEFAULT_ADDRESS_ERROR",
			            		errorMessage: "暂无地址或未设置默认地址"
			            	};
							defer.reject(reason);
						}
					},function(reason){
						reason = {
		            		errorCode: "GET_DEFAULT_ADDRESS_ERROR",
		            		errorMessage: errorLog.getErrorMessage(reason)
		            	};
						defer.reject(reason);
					});
				}else{
					defer.resolve(defaultAddress);
				}
				return defer.promise;
			}

			function getDefaultAddressFromList(addressList){
				var defaultAddress = null;
				for(var i = 0;i<addressList.length;i++){
					var item = addressList[i];
					if(item.active == 0){
						defaultAddress = {
							city: item.city,
							community: item.community,
							block: item.block,
							unit: item.unit,
							room: item.room,
							roomId: item.id,
							ownerStar: item.ownerName
						};
						break;
					}
				}
				return defaultAddress;
			}

			this.addAddress = function(addressInfo){
				if(!addressList){
					addressList = [];
				}
				var newAddress = {
					city:addressInfo.city,
					community:addressInfo.community,
					block:addressInfo.block,
					unit:addressInfo.unit,
					room: addressInfo.roomInfo.room,
					roomId: addressInfo.roomInfo.id,
					ownerStar: addressInfo.roomInfo.ownerName};
				if(addressList.length == 0){
					newAddress.active = 0;
				}
				addressList.push(newAddress);
				localStorage.hasAddress = true;
			}

			this.getAddressList = function(){
				if(!getAddressListing){
					getAddressListing = true;
					addressListDefer = $q.defer();
					if(!addressList){
						addressList = [];
						var params = {
			                type: 'openid',
			                openid: sessionStorage.getItem("openid")
			            }
			            addresses.query(params).$promise.then(function(data) {
			            	addressList = data.items;
			            	if(addressList && addressList.length > 0){
			                	localStorage.hasAddress = true;
			                }else{
			                	localStorage.hasAddress = false;
	                		}
			            	addressListDefer.resolve(addressList);
			            	getAddressListing = false;
			            },function(reason){
			            	reason = {
			            		errorCode: "GET_ADDRESS_LIST_ERROR",
			            		errorMessage: errorLog.getErrorMessage(reason)
			            	};
			                addressListDefer.reject(reason);
			                getAddressListing = false;
			            });
					}else{
						addressListDefer.resolve(addressList);
						getAddressListing = false;
					}
				}
				return addressListDefer.promise;
			}

			this.getCityList = function(){
				var defer = $q.defer();
				if(!cityList){
					var params = {
		                type:'city'
		            }
		            addresses.query(params).$promise.then(function (data) {
		                cityList = data.items;
		                defer.resolve(cityList);
		            }, function (reason) {
		                reason = {
		            		errorCode: "GET_CITY_LIST_ERROR",
		            		errorMessage: errorLog.getErrorMessage(reason)
		            	};
		                defer.reject(reason);
		            });
		        }else{
		        	defer.resolve(cityList);
		        }
				return defer.promise;
			}

			this.getCommunityList = function(city){
				var defer = $q.defer();
				var communityList= null;
				var params = {
	                type:'community',
	                city:city
	            }
	            addresses.query(params).$promise.then(function (data) {
	                communityList = data.items;
	                defer.resolve(communityList);
	            }, function (reason) {
	                reason = {
	            		errorCode: "GET_COMMUNITY_LIST_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
	                defer.reject(reason);
	            });
				return defer.promise;
			}

			this.getBlockList = function(city,community){
				var defer = $q.defer();
				var blockList = null;
				var params = {
	                type: "block",
	                city:city,
	                community:community
	            }
	            addresses.query(params).$promise.then(function (data) {
	                blockList = data.items;
	                defer.resolve(blockList);
	            }, function (reason) {
	                reason = {
	            		errorCode: "GET_BLOCK_LIST_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
	                defer.reject(reason);
	            });
				return defer.promise;
			}

			this.getUnitList = function(city,community,block){
				var defer = $q.defer();
				var unitList = null;
				var params = {
	                type:'unit',
	                city:city,
	                community:community,
	                block:block
	            }
	            addresses.query(params).$promise.then(function (data) {
	                unitList = data.items;
	                defer.resolve(unitList);
	            }, function (reason) {
	                reason = {
	            		errorCode: "GET_UNIT_LIST_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
	                defer.reject(reason);
	            });
				return defer.promise;
			}

			this.getRoomList = function(city,community,block,unit){
				var defer = $q.defer();
				var roomList = null;
				var params={
	                type:'room',
	                city:city,
	                community:community,
	                block:block,
	                unit:unit?unit:""
	            }
	            addresses.query(params).$promise.then(function(data){
	                roomList = data.items;
	                defer.resolve(roomList);
	            },function(reason){
	            	reason = {
	            		errorCode: "GET_ROOM_LIST_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
	                defer.reject(reason);
	            });
				return defer.promise;
			}

			this.hasAddress = function(){
				var has = false;
				if((addressList && addressList.length > 0) || localStorage.hasAddress){
					has = true;
				}
				return has;
			}
		}
	]);