angular.module('app.address')
	.service('address', ['$q','$http','$timeout','errorLog', 'addresses','userInfo',
		function($q,$http,$timeout, errorLog,addresses,userInfo){
			// var defaultAddress = {
			//  id: null,
			//  tag: null,//每个地址都有个标签名
			// 	city: null,
			//  communityId: null,
			// 	community: null,
			// 	block: null,
			// 	unit: null,
			// 	room: null,
			// 	ownerName: null,//房屋所有者姓名
			// 	initial: null//用来对地址进行首字母排序
			// };
			var defaultAddress = null;
			var addressList = null;
			var cityList = null;
			var getAddressListing = false;
			var addressListDefer = null;
			var addressCount = null;
			var defaultAddressDirty = false;

			this.getDefaultAddress = function(){
				var defer = $q.defer();
				if(!defaultAddress || defaultAddressDirty){
					this.getAddressList().then(function(data){
						defaultAddress = getDefaultAddressFromList(data);
						if(defaultAddress){
							defaultAddressDirty = false;
							defer.resolve(defaultAddress);
						}else{
							var errorMessage = data && data.length>0?"未设置默认地址":"暂无地址";
							reason = {
			            		errorCode: "GET_DEFAULT_ADDRESS_ERROR",
			            		errorMessage: errorMessage
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

			this.getDefaultAddressSync = function(){
				if(!defaultAddress || defaultAddressDirty){
					defaultAddress = null;
					for(var i = 0;i<addressList.length;i++){
						var item = addressList[i];
						if(item.active == 0){
							defaultAddress = item;
							break;
						}
					}
				}
				return defaultAddress;
			}

			function getDefaultAddressFromList(addressList){
				var defaultAddress = null;
				for(var i = 0;i<addressList.length;i++){
					var item = addressList[i];
					if(item.active == 0){
						defaultAddress = item;
						break;
					}
				}
				return defaultAddress;
			}

			this.setDefaultAddress = function(address){
				var that = this;
				var defer = $q.defer();
				if(address.active == 0){
					defer.resolve(true);
				}else{
					var params = {
	                    id: address.id,
	                    accountId: userInfo.getAccountId()
	                }
	                addresses.save(params).$promise.then(function (data) {
	                	var defaultAddr = that.getDefaultAddressSync();
	                	if(defaultAddr){
	                		defaultAddr.active = 1;
	                	}
	                    address.active = 0;
	                }, function (reason) {
	                    var reason = {
	                        errorCode:"SET_DEFAULT_ADDRESS_ERROR",
	                        errorMessage: errorLog.getErrorMessage(reason)
	                    };
	                    defer.reject(reason);
	                })
					defaultAddressDirty = true;
				}
				return defer.promise;
			}

			this.addAddress = function(address){
				var defer = $q.defer();
                var params = {
                	tag: address.tag,
                    city: address.city,
                    community: address.community,
                    block: address.block,
                    unit: address.unit,
                    room: address.room,
                    houseId: address.id,
                    initial: address.initial,
                    accountId: userInfo.getAccountId()
                }
                //alert(errorLog.getFullErrorMessage(params));
                addresses.save(params).$promise.then(function (data) {
	                if(!addressList){
						addressList = [];
					}
					if(addressList.length == 0){
						address.active = 0;
					}
					addressList.push(address);
					localStorage.hasAddress = true;
					defer.resolve(true);
                }, function (reason) {
                    reason = {
                        errorCode: "ADD_ADDRESS_ERROR",
                        errorMessage: errorLog.getErrorMessage(reason)
                    };
                    defer.reject(reason);
                });
				return defer.promise;
			}

			this.deleteAddress = function(address){
				var that = this;
				var defer = $q.defer();
				var params = {
                    id: address.id,
                    accountId: userInfo.getAccountId()
                }
                addresses.delete(params).$promise.then(function (data) {
                    var deleteDefault = address.active == 0;
					deleteAddressWithId(address.id);
					if(deleteDefault){
						defaultAddressDirty = true;
						if(addressList&& addressList.length>0){
							that.setDefaultAddress(addressList[0]);
						}
					}
					if(addressList.length == 0){
						localStorage.hasAddress = false;
					}
					defer.resolve(true);
                }, function (reason) {
                    var reason = {
                        errorCode:"DELETE_ADDRESS_ERROR",
                        errorMessage: errorLog.getErrorMessage(reason)
                    };
                    defer.reject(reason);
                });
                return defer.promise;
			}

			function deleteAddressWithId(id){
				for(var i = 0;i<addressList.length;i++){
					var item = addressList[i];
					if(item.id == id){
						addressList.splice(i, 1);
						break;
					}
				}
			}

			this.getAddressList = function(){
				if(!getAddressListing){
					getAddressListing = true;
					addressListDefer = $q.defer();
					if(!addressList){
						addressList = [];
						var params = {
			                type: 'accountId',
			                accountId: userInfo.getAccountId(),
			                openid: userInfo.getOpenIdSync()
			            }
			            addresses.query(params).$promise.then(function(data) {
							if(data.items){
								addressList = data.items;
							}			            	
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

			this.getAddressCount = function(){
				var defer = $q.defer();
				if(!addressCount){
					this.getAddressList().then(function(data){
						addressCount = data.length;
						defer.resolve(addressCount);
					},function(reason){
						reason = {
		            		errorCode: "GET_ADDRESS_COUNT_ERROR",
		            		errorMessage: errorLog.getErrorMessage(reason)
		            	};
						defer.reject(reason);
					});
				}else{
					defer.resolve(addressCount);
				}
				return defer.promise;
			}

			this.getAddressIndex = function(id){
				var result = -1;
				if(addressList){
					angular.forEach(addressList, function(address,index){
						if(address.id==id){
							result = index;
							return false;
						}
					});
				}
				return result;
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

			this.getBlockList = function(city,communityId){
				var defer = $q.defer();
				var blockList = null;
				var params = {
	                type: "block",
	                city:city,
	                communityId:communityId
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

			this.getUnitList = function(city,communityId,block){
				var defer = $q.defer();
				var unitList = null;
				var params = {
	                type:'unit',
	                city:city,
	                communityId:communityId,
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

			this.getRoomList = function(city,communityId,block,unit){
				var defer = $q.defer();
				var roomList = null;
				var params={
	                type:'room',
	                city:city,
	                communityId:communityId,
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
				if((addressList && addressList.length > 0) || localStorage.hasAddress=="true"){
					has = true;
				}
				return has;
			}

			this.existTag = function(tag){
				var defer = $q.defer();
				this.getAddressList().then(function(data){
					var exist = false;
					if(data){
						angular.forEach(data,function(item){
							if(item.tag == tag){
								exist = true;
								return false;
							}
						});
					}
					defer.resolve(exist);
				},function(reason){
					reason = {
	            		errorCode: "EXIST_TAG_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
	                defer.reject(reason);
				});
				return defer.promise;
			}

			this.existAddress = function(id){
				var defer = $q.defer();
				this.getAddressList().then(function(data){
					var exist = false;
					if(data){
						angular.forEach(data,function(item){
							if(item.id == id){
								exist = true;
								return false;
							}
						});
					}
					defer.resolve(exist);
				},function(reason){
					reason = {
	            		errorCode: "EXIST_ADDRESS_ERROR",
	            		errorMessage: errorLog.getErrorMessage(reason)
	            	};
	                defer.reject(reason);
				});
				return defer.promise;
			}
		}
	]);