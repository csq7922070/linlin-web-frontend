//var basePath = "http://localhost:8080/skh";
//var basePath="http://192.168.0.120:8080/skh";
var basePath = "http://mitest.4zlink.com:8080/mifan";
//var basePath = "http://192.168.0.136:8080/skh";
var appId = "wx050cc99d8cec1a73";

angular.module('app.home', []);
angular.module('app.notice', ['resources.notice']);
angular.module('app.repair', ['resources.repair']);
angular.module('app.shop', ['resources.shop']);
angular.module('app.complain', ['resources.complain']);
angular.module('app.address', ['resources.address']);
angular.module('app.payment', ['resources.address', 'resources.payment']);
angular.module('app.location', []);
angular.module('app.user',[]);
angular.module('app.log',[]);
angular.module('app.auth',[]);
angular.module('app.account',[]);

var myApp = angular.module('myApp', ['ui.router', 'angular-carousel', 'app.home', 'app.repair', 'app.notice', 'app.shop', 
    'app.complain', 'app.address', 'app.payment', 'app.location', 'app.user', 'app.log', 'app.auth', 'app.account']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/auto-location");

    $stateProvider
        .state('notice', {
            url: "/notice-list",
            templateUrl: "tpl/notice/notice-list.tpl.html",
            controller: 'noticeListCtrl',
            controllerAs: 'vm'
        })
        .state('notice-detail', {
            url: "/notice/:id",
            templateUrl: "tpl/notice/notice-detail.tpl.html",
            controller: "noticeDetailCtrl",
            controllerAs: 'vm'
        })
        .state('repair', {
            url: "/repair-list",
            templateUrl: "tpl/repair/repair-list.tpl.html",
            controller: 'repairListCtrl',
            controllerAs: 'vm'
        })
        .state('repair-detail', {
            url: "/repair/:id",
            templateUrl: "tpl/repair/repair-detail.tpl.html",
            controller: 'repairDetailCtrl',
            controllerAs: 'vm'
        })
        .state('repair-add', {
            url: "/repair-add",
            templateUrl: "tpl/repair/repair-add.tpl.html", 
            controller: 'repairAddCtrl',
            controllerAs: 'vm'
        })
        .state('complain', {
            url: "/complain-list",
            templateUrl: "tpl/complain/complain-list.tpl.html",
            controller: "complainListCtrl",
            controllerAs: 'vm'
        })
        .state('complain-detail', {
            url: "/complain/:id",
            templateUrl: "tpl/complain/complain-detail.tpl.html",
            controller: "complainDetailCtrl",
            controllerAs: 'vm'
        })
        .state('complain-add', {
            url: "/complain-add",
            templateUrl: "tpl/complain/complain-add.tpl.html",
            controller: "complainAddCtrl",
            controllerAs: 'vm'
        })
        .state('address-edit', {
            url: "/address-edit",
            templateUrl: "tpl/address/address-edit.tpl.html",
            controller: "addressCtrl2",
            controllerAs: 'vm'
                //controllerAs: 'vm'
        })
        .state('address-city', {
            url: "/address-city/",
            templateUrl: "tpl/address/city/city.tpl.html",
            controller: "addressCityCtrl",
            controllerAs: 'vm'
        })
        .state('address-village', {
            url: "/address-village/:city",
            templateUrl: "tpl/address/village/village.tpl.html",
            controller: "addressVillageCtrl",
            controllerAs: 'vm'
        })
        .state('address-block', {
            url: "/address-block/:city/:village",
            templateUrl: "tpl/address/block/block.tpl.html",
            controller: "addressBlockCtrl",
            controllerAs: 'vm'
        })
        .state('address-unit', {
            url: "/address-unit/:city/:village/:block",
            templateUrl: "tpl/address/unit/unit.tpl.html",
            controller: "addressUnitCtrl",
            controllerAs: 'vm'
        })
        .state('address-room', {
            url: "/address-room/:city/:village/:block/:unit",
            templateUrl: "tpl/address/room/room.tpl.html",
            controller: "addressRoomCtrl",
            controllerAs: 'vm'
        })
        .state('address', {
            url: "/address/:city/:village/:id/:block/:unit/:room/:username/:initial",
            templateUrl: "tpl/address/address-edit.tpl.html",
            controller: "addressCtrl",
            controllerAs: 'vm'
        })
        .state('address-list', {
            url: "/address-list",
            templateUrl: "tpl/address/address-list.tpl.html",
            resolve: {
                data: function($state, addresses) {
                    params = {
                        type: 'openid',
                        openid: sessionStorage.getItem("openid")
                    }
                    return addresses.query(params).$promise.then(function(data) {
                        if (data.items.length == 0) {
                            return $state.go("address-edit");
                        } else {
                            return data;
                        }
                    })
                }
            },
            controller: "addressListCtrl",
            controllerAs: 'vm'
        })
        .state('bill', {
            url: "/bill/:village/:block/:unit/:room/:id/:username/:activeId",
            templateUrl: "tpl/payment/bill.tpl.html",
            controller: "billCtrl"
        })
        .state('payment', {
            url: "/payment/:village/:block/:unit/:room/",
            templateUrl: "tpl/payment/payment.tpl.html",
            controller: "paymentCtrl",
            controllerAs: 'vm'
        })
        .state('payment-list', {
            url: "/payment-list/:id",
            templateUrl: "tpl/payment/payment-list.tpl.html",
            controller: "paymentListCtrl"
        })
        .state('home', {
            url: "/home",
            templateUrl: "tpl/home/home.tpl.html",
            controller: "homeCtrl",
            controllerAs: 'vm'
        })
        .state('home.shop-info', {
            url: "/shop-info/:site",
            templateUrl: "tpl/shop/shop-info.tpl.html",
            controller: "shopInfoCtrl",
            controllerAs: 'vm'
        })
        .state('html-error', {
            url: "/html-error",
            templateUrl: "tpl/home/html-error.tpl.html",
            controllerAs: 'vm'
        })
        .state('auto-location', {
            url: "/auto-location",
            templateUrl: "tpl/location/auto-location.tpl.html",
            controller: "autoLocationCtrl",
            controllerAs: 'vm'
        })
        .state('search-location', {
            url: "/search-location",
            templateUrl: "tpl/location/search-location.tpl.html",
            controller: "searchLocationCtrl",
            controllerAs: 'vm'
        })
        .state('login',{
            url: "/login",
            templateUrl: "tpl/account/login/login.tpl.html",
            controller: "loginCtrl",
            controllerAs: "vm"
        })
        .state('nickname',{
            url: "/nickname",
            templateUrl: "tpl/account/nickname/nickname.tpl.html",
            controller: "nicknameCtrl",
            controllerAs: "vm"
        })
        .state('account',{
            url: "/account",
            templateUrl: "tpl/account/account.tpl.html",
            controller: "accountCtrl",
            controllerAs: "vm"
        })
        .state('app-home',{
            url: "/app-home",
            templateUrl: "tpl/home/app-home.tpl.html",
            controller: "appHomeCtrl",
            controllerAs: "vm"
        });
}]).config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
}]).run(['$rootScope', 'auth', function($rootScope, auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //alert("toState:"+toState.name+",toParams:"+toParams.name);
        //auth.startChangeState(event, toState, toParams, fromState, fromParams);
    });
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
        var url = "/" + to.name.replace(".", "/");
        _hmt.push(['_trackPageview', url]);
    });
}]).value(
    'communityInfo',{
        name: null,
        province: null,
        city: null,
        address: null,
        auth: null//该字段用来判断小区是否为合作小区，值为true or false
    }
).value(
    'addressInfo',{
        city: null,
        community: null,
        block: null,
        unit: null,
        room: null
    }
).value(
    'locationInfo', {
        longitude: null,//经度
        latitude: null,//纬度
        accuracy: null//位置精度
    }
).value(
    'locationState',{
        hasLocation: false,
        autoLocationVisited: false
    }
).value(
    'appState', {
        visited: false
    }
).constant(
    'appId', appId
).constant(
    'appType', 'app'//app or weixin
);
angular.module('app.account').controller('accountCtrl', ['$stateParams',
    function ($stateParams) {
        var vm = this;
    }
]);

angular.module('app.address').controller('addressCtrl2', ['$stateParams', 'addresses','communityInfo','addressInfo',
    function ($stateParams, addresses,communityInfo,addressInfo) {
        var vm = this;
        vm.city = communityInfo.city;
        vm.village = communityInfo.name;
        addressInfo.city = communityInfo.city;
        addressInfo.community = communityInfo.name;
        console.log("addressInfo注入city与community");
        console.log(addressInfo)
    }
]);

angular.module('app.address').controller('addressListCtrl', ['$rootScope','$stateParams', '$state', 'addresses','data',
    function ($rootScope,$stateParams, $state, addresses,data) {
        var vm = this;
        vm.houses = data.items;
        vm.activeId = data.activeId;

        vm.deleteAddress = function (house) {
            vm.sure_delete = true;
            vm.sure = function () {
                vm.sure_delete = false;
                params = {
                    id: house.id,
                    openid:sessionStorage.getItem("openid")
                }
                addresses.delete(params).$promise.then(function (data) {
                    house.rowState=1;
                }, function (data) {
                })
            }
        };

        vm.cancel = function () {
            vm.sure_delete = false;
        }

        vm.change_flag = function (house) {
            if (house.active == 0) {
                return;
            }
            params = {
                id: house.id,
                openid: sessionStorage.getItem("openid")
            }
            addresses.save(params).$promise.then(function () {
                vm.activeId = house.id;
            }, function (data) {
            })
        }
    }
])
angular.module('app.address').controller('addressCtrl', ['$stateParams', 'addresses','communityInfo',
    function ($stateParams, addresses,communityInfo) {
        var vm = this;
        vm.city = communityInfo.name;
        vm.village = communityInfo.name+1;
        vm.add_newaddress = function () {
            console.log("触发");
            params = {
                // community: "阿尔卡迪亚",
                city: $stateParams.city,
                community: $stateParams.village,
                block: $stateParams.block,
                unit: $stateParams.unit,
                room: $stateParams.room,
                openid: sessionStorage.getItem("openid"),
                houseId: $stateParams.id,
                initial: $stateParams.initial
            }
            addresses.save(params).$promise.then(function (data) {
                console.log("后台添加地址成功");
            }, function (data) {
                console.log("后台添加地址失败");
            });
        }
        console.log("city" + $stateParams.city+ "community" + $stateParams.village + "block" + $stateParams.block + " unit" + $stateParams.unit + " room" + $stateParams.room);
        console.log("succees");
        vm.city = communityInfo.name;
        vm.village = communityInfo.name+1;
        vm.block = $stateParams.block;
        vm.unit = $stateParams.unit;
        vm.room = $stateParams.room;
        //添加业主姓名与id
        vm.username = $stateParams.username;
        vm.id = $stateParams.id;
        console.log("username:" + vm.username + " id:" + vm.id);
        console.log($stateParams);
        console.log($stateParams.village);
        console.log($stateParams.initial);
    }
]);

angular.module('app.complain').controller('complainAddCtrl', ['$timeout', '$state', 'complains',
    function ($timeout, $state, complains) {
        var vm = this;
        vm.mask_close = function () {
            vm.suc_show = false;
        }
        vm.mask_err_close = function () {
            vm.err_show = false;
        }
        vm.submitForm = function () {
            vm.complain.openid = sessionStorage.getItem("openid");
            params = vm.complain;
            complains.save(params).$promise.then(successcb, errcb);
        }
        function successcb() {
            vm.suc_show = true;
            $timeout(function () {
                vm.suc_show = false;
                $state.go("complain");
            }, 3000);
        }

        function errcb() {
            vm.err_show = true;
            $timeout(function () {
                vm.err_show = false;
            }, 3000)
        }
    }
]);

(function () {
    angular.module('app.complain').controller('complainDetailCtrl', ['$stateParams', 'complains','errorLog',
        function ($stateParams, complains, errorLog) {
            var vm = this;
            params = {
                id: $stateParams.id
            }
            complains.get(params).$promise.then(function(data) {
                vm.complain = data;
            },function(reason){
                alert(errorLog.getErrorMessage(reason));
            })
        }

    ])
})();
angular.module('app.complain').controller('complainListCtrl', ['complains', 'errorLog',
    function (complains, errorLog) {
        var vm = this;
        vm.currentPage = 0;
        vm.pageSize = 10;
        var params = {};
        vm.complains = [];
        vm.load = function (goPage, limit) {
            if (goPage > vm.numberOfPages || vm.currentPage == goPage || goPage < 1 || vm.busy) {
                return;
            } else {
                vm.busy = true;
                params = {
                    offset: vm.pageSize * (goPage - 1),
                    limit: vm.pageSize,
                    openid: sessionStorage.getItem("openid"),
                    queryType: 'openid'
                };
                complains.query(params).$promise.then(function (data) {
                    vm.numberOfPages = Math.ceil(data.count / vm.pageSize);
                    vm.currentPage = goPage;
                    vm.busy = false;
                     Array.prototype.push.apply(vm.complains,data.items);
                }, function (reason) {
                    alert(errorLog.getErrorMessage(reason));
                })
            }
        }
        vm.load(1, vm.pageSize);
    }
]);
angular.module('app.home').controller('appHomeCtrl', ['$stateParams',
    function ($stateParams) {
        var vm = this;
    }
]);

angular.module('app.home').controller('homeCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
    'communityInfo', 'locationState', 'communityLocation', '$q', 'userInfo', 'errorLog', 'locationInfo', 'location',
    function($scope, $http, $stateParams, $rootScope, $state, $location, communityInfo, locationState, communityLocation, $q, userInfo,errorLog, locationInfo, location) {
        // // test
        // locationInfo.longitude = 116.30286359442356;
        // locationInfo.latitude = 39.979707375431694;
        // location.storageLocation(locationInfo);
        // // end test
        $scope.refreshCommunityInfo = function(){
            $scope.communityName = communityInfo.name.length >4 ? communityInfo.name.substring(0,3)+"..." : communityInfo.name;
        }
        $scope.refreshCommunityInfo();
        $scope.changeCommunity = function(){
            $state.go('auto-location');
        }

        if(!locationState.hasLocation){
            communityLocation.autoLocationCommunity().then(function(data){
                setCommunity(data);
            },function(reason){
                //首页自动定位失败暂时不做提示
            });
        }

        function setCommunity(data){
            var defer = $q.defer();
            if(!communityLocation.compareCommunity(data)){//检测到2次小区地址不一致
                //需要提示用户是否切换到当前定位地址
                $scope.modalTip = "检测到当前登陆位置为"+data.city+data.areaName+", "+
                    "上次登陆位置为"+data.lastCity+data.lastAreaName+", 是否切换?"
                $scope.tipAlign = "left";
                $scope.okText = "切换";
                $scope.showModal = true;
                $scope.onModalClose = function(state){//state is true or false
                    if(state){
                        communityLocation.changeCommunityHand = true;
                    }
                    defer.resolve(state);
                    $scope.showModal = false;
                }
            }else{
                defer.resolve(true);
            }
            defer.promise.then(function(selectCurrent){//selectCurrent代表是否选择当前自动定位小区为登陆小区
                if(selectCurrent){
                    var cmm = {
                        name:data.areaName,
                        city: data.city,
                        address: data.address,
                        auth: data.state
                    };
                    angular.extend(communityInfo, cmm);
                    $scope.refreshCommunityInfo();
                    communityLocation.storageCommunity(communityInfo);
                    userInfo.getOpenId().then(function(data){
                        var openId = data;
                        communityLocation.changeCommunity(openId, cmm).then(function(data){//保存用户选择的小区信息到服务器
                            //alert("changeCommunity success,openId:"+openId+",cmm:"+errorLog.getErrorMessage(cmm));
                        },function(reason){
                            alert(reason.errorCode +"," +reason.errorMessage);
                        });
                    },function(reason){
                        alert(reason.errorCode + ","+reason.errorMessage);
                    });
                }
                locationState.hasLocation = true;
            });
        }

        $scope.slides7 = [{
            id: 10,
            label: "slide #1",
            img: "images/banner_01.png"
        }, {
            id: 11,
            label: "slide #2",
            img: "images/banner_02.png"
        }, {
            id: 12,
            label: "slide #3",
            img: "images/banner_03.png"
        }];
        $scope.carouselIndex7 = 0;

        $rootScope.site = 1;
        $state.go("home.shop-info", {
            site: 1
        });
    }
]);

angular.module('app.location').controller('autoLocationCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
	'communityInfo', 'communityLocation', 'location', '$q', 'userInfo', 'locationInfo', 'errorLog', 'locationState', 'appState',
    function($scope, $http, $stateParams, $rootScope, $state, $location, communityInfo, communityLocation, location, $q, userInfo, 
    	locationInfo,errorLog,locationState, appState) {
    	appState.visited = true;
    	
    	userInfo.initWxParam();//微信参数只会在公众号登录页传入，目前自动定位页面是公众号登录页
    	var locInfo = location.getLastLocation();
    	if(locInfo){
    		angular.extend(locationInfo, locInfo);
    	}
    	var cmmInfo = communityLocation.getLastCommunity();
    	if(!locationState.autoLocationVisited && cmmInfo){
    		angular.extend(communityInfo, cmmInfo);
    		locationState.autoLocationVisited = true;
    		$state.go('home');
    		return;
    	}

    	$scope.clickSearchField = function(){
    		locationState.autoLocationVisited = true;
    		$state.go('search-location');
    	}


        console.log(communityInfo.name+ ' 11');

    	//openId = "o-YfcstQPoTDSPuNHZ44cEof8";
    	$scope.retryLocation = function(){
    		$scope.showLocationError = false;
    		$scope.loadingTip = "定位中...";
    		$scope.loadingShow = true;
    		communityLocation.autoLocationCommunity().then(function(data){
    			setCommunity(data);
    		},function(reason){
    			if(reason && reason.errorCode == "PERMISSION_DENIED"){//用户拒绝了定位请求，提示打开定位功能
    				$scope.modalTitle = "定位服务未开启";
    				$scope.modalTip = "请在系统设置中开启定位服务";
    				$scope.tipAlign = "center";
    				$scope.okText = "确定";
    				$scope.onlyOkButton = true;
    				$scope.showModal = true;
    				$scope.onModalClose = function(state){//state on is true
    					$scope.modalTitle = "";
    					$scope.onlyOkButton = false;
						$scope.showModal = false;
					}
    			}else{
    				alert(reason.errorCode + "," + reason.errorMessage);
    			}
    			$scope.loadingShow = false; 
    			$scope.showLocationError = true;
    		});
    	}

    	function setCommunity(data){
    		var defer = $q.defer();
			$scope.loadingShow = false;
			if(!locationState.autoLocationVisited && !communityLocation.compareCommunity(data)){//首次登陆定位且检测到2次小区地址不一致
				//需要提示用户是否切换到当前定位地址
				$scope.modalTip = "检测到当前登陆位置为"+data.city+data.areaName+", "+
					"上次登陆位置为"+data.lastCity+data.lastAreaName+", 是否切换?"
				$scope.tipAlign = "left";
				$scope.okText = "切换";
				$scope.showModal = true;
				$scope.onModalClose = function(state){//state is true or false
					defer.resolve(state);
					$scope.showModal = false;
				}
			}else{
				defer.resolve(true);
			}
			defer.promise.then(function(selectCurrent){//selectCurrent代表是否选择当前自动定位小区为登陆小区
				if(selectCurrent){
					setCurrentCommunity(data);
				}else{
					setLastCommunity(data);
				}
				if(!locationState.autoLocationVisited && $scope.autoLocationCommunities.length > 0){
					$scope.changeCommunity($scope.autoLocationCommunities[0]);
				}
			});
    	}

    	function setLastCommunity(data){
    		$scope.autoLocationCommunities = [{
				name:data.lastAreaName,
				city: data.lastCity,
				address: data.lastAddress,
				title: data.lastCity + ', '+data.lastAreaName,
				auth: data.lastState
			}];
    	}

    	function setCurrentCommunity(data){
			$scope.autoLocationCommunities = [{
				name:data.areaName,
				city: data.city,
				address: data.address,
				title: data.city + ', '+data.areaName,
				auth: data.state
			}];
    	}

    	$scope.changeCommunity = function(community){
    		angular.extend(communityInfo, community);
    		communityLocation.storageCommunity(communityInfo);
			var openId = null;
			userInfo.getOpenId().then(function(data){
				openId = data;
				communityLocation.changeCommunity(openId, community).then(function(data){//保存用户选择的小区信息到服务器
	    			console.log("changeCommunity success.");
	    		},function(reason){
	    			alert(reason.errorCode +"," +reason.errorMessage);
	    		});
			},function(reason){
				alert(reason.errorCode +"," +reason.errorMessage);
			});
    		locationState.hasLocation = true;
    		locationState.autoLocationVisited = true;
    		$state.go('home');
    	}

    	$scope.autoLocationCommunities = [];

    	$scope.retryLocation();//自动定位页面加载时便开始自动定位小区
    }
]);

angular.module('app.location').controller('searchLocationCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
	'$timeout', 'communityInfo', 'communityList', 'communitySearch', 'locationInfo', 'errorLog','userInfo','communityLocation', 'locationState',
    function($scope, $http, $stateParams, $rootScope, $state, $location,$timeout, communityInfo, communityList, communitySearch, locationInfo,errorLog,userInfo,communityLocation, locationState) {  	
    	$scope.loadingTip = "数据加载中...";
    	$scope.loadingShow = false;
    	$scope.lockClickHide = true;

    	var cmmList = null;
    	communityList.getCommunityList(communityInfo.city)
    		.then(function(data){
    			//alert("cmmList.length: "+data.length);
    			cmmList = data;
    			communitySearch.cmmList = cmmList;
    			$scope.loadingShow = false;
    			$scope.focus = true;
    			//$("#community-search-field").focus();
    			//$("#community-search-field").trigger("focus");
    		},function(reason){
    			$scope.loadingShow = false;
    			reason = "数据加载失败: "+errorLog.getErrorMessage(reason);
    			alert(reason);
    		});

    	console.log(communityInfo);
    	$scope.changeCommunity = function(community){
    		console.log(community);
    	}

    	$scope.showInexistenceTip = false;

    	var changePromise = null;
    	$scope.$watch("communityName", function(newVal, oldVal){
    		if(newVal != oldVal){
    			if(changePromise){
    				$timeout.cancel(changePromise);
    			}
    			changePromise = $timeout(function(){
    				console.log("change...");
    				$scope.showInexistenceTip = false;
    				$scope.searchLocationCommunities = communitySearch.searchCommunity($scope.communityName);
    				if($scope.communityName && $scope.searchLocationCommunities.length == 0){
    					$scope.showInexistenceTip = true;
    				}
    				//console.log($scope.searchLocationCommunities);
    			}, 700);
    		}
    	});

    	$scope.changeCommunity = function(community){
    		console.log(community);
    		angular.extend(communityInfo, community);
    		communityLocation.storageCommunity(communityInfo);
    		var openId = null;
			userInfo.getOpenId().then(function(data){
				openId = data;
				communityLocation.changeCommunity(openId, community).then(function(data){//保存用户选择的小区信息到服务器
	    			console.log("changeCommunity success.");
	    		},function(reason){
	    			alert(reason.errorCode +"," +reason.errorMessage);
	    		});
			},function(reason){
				alert(reason.errorCode +"," +reason.errorMessage);
			});
    		locationState.hasLocation = true;
    		$state.go('home');
    	}

    	$scope.searchLocationCommunities = [];

    	$scope.clearSearchField = function(){
    		$scope.communityName = "";
    	}
    }
]);

(function() {
    angular.module('app.notice').controller("noticeDetailCtrl", ['$stateParams', 'notices', 'errorLog',
        function($stateParams, notices, errorLog) {
            var vm = this;
            notices.get({
                id: $stateParams.id
            }).$promise.then(function(data) {
                vm.notice = data;
            }, function(reason){
                alert(errorLog.getErrorMessage(reason));
            })
        }
    ]);
})();

(function() {
    angular.module('app.notice').controller('noticeListCtrl', ['notices', 'errorLog',
        function(notices, errorLog) {
            var vm = this;
            vm.currentPage = 0;
            vm.pageSize = 10;
            vm.notices = [];
            vm.load = function(goPage, limit) {
                if (goPage > vm.numberOfPages || vm.currentPage == goPage || goPage < 1 || vm.busy) {
                    return;
                } else {
                    vm.busy = true;
                    params = {
                        offset: vm.pageSize * (goPage - 1),
                        limit: vm.pageSize,
                        openid: sessionStorage.getItem("openid")
                    }
                    notices.query(params).$promise.then(function(data) {
                        vm.numberOfPages = Math.ceil(data.count / vm.pageSize);
                        vm.currentPage = goPage;
                        vm.busy = false;
                         Array.prototype.push.apply(vm.notices,data.items);
                    }, function(reason){
                        alert(errorLog.getErrorMessage(reason));
                    });
                }
            }
            vm.load(1, vm.pageSize);
        }
    ]);
})();

angular.module('app.payment').controller('billCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', 'addresses', 'payments',
    function($scope, $http, $stateParams, $rootScope, $state, addresses, payments) {
        //显示当前页面的业主信息
        $scope.ownerName = $stateParams.username;
        $scope.block = $stateParams.block;
        $scope.village = $stateParams.village;
        $scope.unit = $stateParams.unit;
        $scope.room = $stateParams.room;
        $scope.id = $stateParams.id;
        $scope.activeId = $stateParams.activeId;

        var totalCount = 0;

        console.log($stateParams);
        console.log($stateParams.village);

        $scope.change_flag = function() {
            if ($scope.id == $scope.activeId) {
                return;
            }
            addresses.save({
                id: $stateParams.id,
                openid: sessionStorage.getItem("openid")
            }).$promise.then(function() {
                $scope.activeId = $stateParams.id;
            });
        }
        params = {
            id: 'query',
            paymentState: 0,
            queryType: 'houseId',
            houseId: $stateParams.id
        };

        payments.query(params).$promise.then(function(data) {
            if (data.amountList.length != 0) {
                $scope.freeShow = false;
                var list = data.amountList;
                var ret = {};
                ret.datas = new Array();

                for (var i = 0; i < list.length; i++) {
                    totalCount++;
                    var yearmonth = list[i].year + "年" + list[i].month + "月";
                    var ele = {};
                    ele.id = list[i].id;
                    ele.type = list[i].type;
                    ele.amount = list[i].amount;
                    ele.yearmonth = yearmonth;

                    ele.number = list[i].number;
                    ele.count = list[i].count;

                    if (ret.datas.length > 0) {
                        for (var j = 0; j < ret.datas.length; j++) {
                            if (ret.datas[j].yearmonth == yearmonth) {
                                ret.datas[j].eles.push(ele);
                                break;
                            }
                        }

                        if (j == ret.datas.length) {
                            var data = {};
                            data.yearmonth = yearmonth;
                            data.eles = new Array();
                            data.eles.push(ele);
                            ret.datas.push(data);
                        }

                    } else {
                        var data = {};
                        data.yearmonth = yearmonth;
                        data.eles = new Array();
                        data.eles.push(ele);
                        ret.datas.push(data);
                    }
                }
                $scope.payments = ret.datas;
                $scope.selectAll = function() {}
                $scope.selected = [];
                $scope.total = 0;

                //按钮单点
                $scope.update = function(ele) {
                    if (ele.selected) {
                        if ($scope.selected.indexOf(ele.id) == -1) {
                            $scope.selected.push(ele.id);
                            $scope.total += ele.amount;
                        }
                    } else {
                        if ($scope.selected.indexOf(ele.id) != -1) {
                            var idx = $scope.selected.indexOf(ele.id);
                            $scope.selected.splice(idx, 1);
                            $scope.total -= ele.amount;
                        }
                    }

                    for (var k = 0; k < $scope.payments.length; k++) {
                        if ($scope.payments[k].yearmonth == ele.yearmonth) {
                            var c = 0;
                            $scope.payments[k].eles.forEach(function(e) {
                                if (e.selected)
                                    c++;
                            });
                            if (c == $scope.payments[k].eles.length) {
                                $scope.payments[k].selected = true;
                            }else{
                                  $scope.payments[k].selected = false;
                            }
                            break;
                        }
                    }

                    if($scope.selected.length==totalCount){
                        $scope.sel=true;
                    }
                    else{
                        $scope.sel=false;
                    }

                    var wf = 0;
                    var ef = 0;
                    var wmonth = [];
                    var emonth = [];
                    var v2 = $scope.selected;
                    console.log(v2)
                    var v3 = list;
                    for (var i = 0; i < v3.length; i++) {
                        for (var j = 0; j < v2.length; j++) {
                            if (v3[i].id == (v2[j])) {
                                if (v3[i].type == 0) {
                                    wf += v3[i].amount;
                                    wmonth.push(v3[i].year+v3[i].month);
                                } else {
                                    ef += v3[i].amount;
                                    emonth.push(v3[i].year+v3[i].month);
                                }
                            };
                        }
                    }
                    $rootScope.waterFree = wf;
                    $rootScope.eleFree = ef;
                    $rootScope.wmonth = wmonth;
                    $rootScope.emonth = emonth;
                    $rootScope.ids = $scope.selected.join(",");
                    console.log($rootScope.ids)
                }

                $scope.updateYearmonth = function(yearmonth, selected) {
                    for (var i = 0; i < $scope.payments.length; i++) {
                        if ($scope.payments[i].yearmonth == yearmonth) {
                            for (var j = 0; j < $scope.payments[i].eles.length; j++) {
                                var ele = $scope.payments[i].eles[j];
                                if (selected) {
                                    if ($scope.selected.indexOf(ele.id) == -1) {
                                        $scope.selected.push(ele.id);
                                        $scope.total += ele.amount;
                                        ele.selected = true;
                                    }
                                } else {
                                    if ($scope.selected.indexOf(ele.id) != -1) {
                                        var idx = $scope.selected.indexOf(ele.id);
                                        $scope.selected.splice(idx, 1);
                                        $scope.total -= ele.amount;
                                        ele.selected = false;
                                    }
                                }
                            }
                            break;
                        }
                    }

                    if($scope.selected.length==totalCount){
                        $scope.sel=true;
                    }
                    else{
                        $scope.sel=false;
                    }

                    var wf = 0;
                    var ef = 0;
                    var v2 = $scope.selected;
                    console.log(v2)
                    var wmonth = [];
                    var emonth = [];

                    var v3 = list;
                    for (var i = 0; i < v3.length; i++) {
                        for (var j = 0; j < v2.length; j++) {
                            if (v3[i].id == (v2[j])) {
                                if (v3[i].type == 0) {
                                    wf += v3[i].amount;
                                    wmonth.push(v3[i].year+v3[i].month);
                                } else {
                                    ef += v3[i].amount;
                                    emonth.push(v3[i].year+v3[i].month);
                                }
                            };
                        }
                    }
                    $rootScope.waterFree = wf;
                    $rootScope.eleFree = ef;
                    $rootScope.wmonth = wmonth;
                    $rootScope.emonth = emonth;
                    $rootScope.ids = $scope.selected.join(",");
                    console.log($rootScope.ids)
                }

                $scope.updateAll = function(sel) {
                    angular.forEach($scope.payments, function(payment) {
                        payment.selected = sel;
                        angular.forEach(payment.eles, function(ele) {
                            if (sel) {
                                if ($scope.selected.indexOf(ele.id) == -1) {
                                    $scope.selected.push(ele.id);
                                    $scope.total += ele.amount;
                                    ele.selected = true;
                                }
                            } else {
                                if ($scope.selected.indexOf(ele.id) != -1) {
                                    var idx = $scope.selected.indexOf(ele.id);
                                    $scope.selected.splice(idx, 1);
                                    $scope.total -= ele.amount;
                                    ele.selected = false;
                                }
                            }
                        })
                    })

                    var wf = 0;
                    var ef = 0;
                    var v2 = $scope.selected;
                    var wmonth = [];
                    var emonth = [];
                    console.log(v2)
                    var v3 = list;
                    for (var i = 0; i < v3.length; i++) {
                        for (var j = 0; j < v2.length; j++) {
                            if (v3[i].id == (v2[j])) {
                                if (v3[i].type == 0) {
                                    wf += v3[i].amount;
                                    wmonth.push(v3[i].year+v3[i].month);
                                } else {
                                    ef += v3[i].amount;
                                    emonth.push(v3[i].year+v3[i].month);
                                }
                            };
                        }
                    }
                    $rootScope.waterFree = wf;
                    $rootScope.eleFree = ef;
                    $rootScope.wmonth = wmonth;
                    $rootScope.emonth = emonth;
                    $rootScope.ids = $scope.selected.join(",");
                    console.log($rootScope.ids)
                }
            }
        })
    }
]);

angular.module('app.payment').controller('paymentListCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$filter', 
    function ($scope, $http, $stateParams, $rootScope, $state, $filter) {
        $scope.id = $stateParams.id;
        $http({
            method: "GET",
            url: basePath + "/payments/query",
            params: {
                queryType: 'openid',
                openid: sessionStorage.getItem("openid"),
                paymentState: 1,
                houseId: $stateParams.id
            }
        }).success(function (data) {
            if(data.items.length!=0){
                $scope.records = $filter("payListMerge")(data.items);
            }
        });
    }
]);
angular.module('app.payment').controller('paymentCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$q','addressInfo',
    function($scope, $http, $stateParams, $rootScope, $state, $q, addressInfo) {
        if($rootScope.wmonth!=null&&$rootScope.wmonth!=""){
            $scope.watermonth=$rootScope.wmonth;
        }
        if($rootScope.emonth!=null&&$rootScope.emonth!=""){
            $scope.elemonth=$rootScope.emonth;
        }
        var tmpwmonth = $rootScope.wmonth.map(_parseInt).sort(compare);
        var tmpemonth = $rootScope.emonth.map(_parseInt).sort(compare);
        var wmonthSections = arrange(tmpwmonth);
        var emonthSections = arrange(tmpemonth);

        $scope.watmonth = getMergeDate(wmonthSections, tmpwmonth);
        $scope.elmonth = getMergeDate(emonthSections, tmpemonth);

        function arrange(array) {
            var t;
            var ta;
            var r = [];

            array.forEach(function(v) {
                if (t === v) {
                    ta.push(t);
                    t++;
                    return;
                }

                ta = [v];
                t = v + 1;
                r.push(ta);
            });

            return r;
        }

        function compare(a, b) {
            return a - b;
        }

        function _parseInt() {
            return parseInt(arguments[0]);
        }

        //monthSections是按相邻月分段的二位数组，tmpmonth是按时间排序的一维数组
        function getMergeDate(monthSections, tmpmonth){
            var year,month;
            var date;
            if(monthSections.length > 0){
                year = (tmpmonth[0] + "").substr(0, 4);
                month = (tmpmonth[0] + "").substr(4, 2);
                if(tmpmonth[0] != tmpmonth[tmpmonth.length - 1]){
                     month += "-" + (tmpmonth[tmpmonth.length - 1] + "").substr(4, 2);
                } 
                date = year + "年" + month + "月";
            }
            if (monthSections.length > 1) {
                if(monthSections[0].len == 1){
                    var nextYear = monthSections[0][0].substr(0, 4);
                    if(nextYear == year)
                        date = date.substr(0, date.length - 1);//同年情况下去掉前一个日期结尾的“月”
                    date+="、";
                    if(nextYear == year)
                        date += getSectionDateTextWithoutYear(monthSections[1]);
                    else{
                        date += getSectionDateText(monthSections[1]);
                    }
                    if(monthSections.length > 2)
                        date+="等";
                } else if(monthSections[0].length > 1){
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
        console.log($stateParams);
        
        $scope.community = $stateParams.village;
        $scope.block = $stateParams.block;
        $scope.unit = $stateParams.unit;
        $scope.room = $stateParams.room;

        $scope.waterFr = $rootScope.waterFree;
        $scope.eleFr = $rootScope.eleFree;

        $scope.totalFee = $rootScope.waterFree + $rootScope.eleFree;


        $scope.money_payment = function() {
            console.log("支付功能开始");
            $http({
                    method: "POST",
                    url: basePath + '/payments',
                    params: {
                        total_fee: $scope.totalFee,
                        openid: sessionStorage.getItem("openid"),
                        ids: $rootScope.ids
                    }
                }).error(function(response, status, headers, config) {
                    self.error = "连接错误!";
                })
                .then(function(response) {
                    if (response.data.return_code == "FAIL") {
                        self.error = response.data.return_msg;
                        return $q.reject();
                    }
                    return $q.resolve({
                        appid: response.data.appid,
                        prepay_id: response.data.prepay_id,
                        timestamp: response.data.timestamp,
                        nonceStr: response.data.nonceStr,
                        paySign: response.data.sign
                    });
                })
                .then(function(data) {
                    var deferred = $q.defer();
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.appid, // 必填，公众号的唯一标识
                        timestamp: sessionStorage.getItem("timestamp"), // 必填，生成签名的时间戳
                        nonceStr: sessionStorage.getItem("noncestr"), // 必填，生成签名的随机串
                        signature: sessionStorage.getItem("sign"), // 必填，签名，见附录1
                        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.chooseWXPay({
                        timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: data.paySign, // 支付签名
                        success: function(res) {
                            // 支付成功后的回调函数
                            console.log('successfully paid', res);
                            deferred.resolve('success');
                        }
                    });

                    return deferred.promise;
                })
                .then(function() {
                    // call $state to confirm page
                    $state.go('success');
                    return $q.resolve(true);
                });

        }

    }
]);

(function() {
    angular.module('app.repair').controller('repairAddCtrl', ['$timeout', '$state', 'repairs',
        function($timeout, $state, repairs) {
            var vm = this;

            vm.mask_close = function() {
                vm.suc_show = false;
            }
            vm.mask_err_close = function() {
                vm.err_show = false;
            }
            vm.submitForm = function() {
                vm.repair.openid=sessionStorage.getItem("openid");
                params = vm.repair;
                repairs.save(params).$promise.then(successcb, errcb);
            }

            function successcb() {
                vm.suc_show = true;
                $timeout(function() {
                    vm.suc_show = false;
                    $state.go("repair");
                }, 3000);
            }

            function errcb() {
                vm.err_show = true;
                $timeout(function() {
                    vm.err_show = false;
                }, 3000);
            }
        }
    ]);
})();

(function() {
    angular.module('app.repair').controller('repairDetailCtrl', ['$state', '$stateParams', '$timeout', 'repairs',
        function($state, $stateParams, $timeout, repairs) {
            var vm = this;
            vm.suc_show = false;
            vm.err_show = false;

            params = {
                'id': $stateParams.id
            };

            repairs.get(params).$promise.then(function(data) {
                vm.repair = data;
            });

            vm.confirm = function(id) {
                params = {
                    id: id,
                    state: 3
                };

                repairs.save(params).$promise.then(function(data) {
                    vm.repair = data;
                    successcb();
                }, errcb);
            };

            function successcb() {
                vm.suc_show = true;
                $timeout(function() {
                    vm.suc_show = false;
                    $state.go("repair");
                }, 3000);
            }

            function errcb() {
                vm.err_show = true;
                $timeout(function() {
                    vm.err_show = false;
                }, 3000);
            }
        }
    ]);
})();

angular.module('app.repair').controller('repairListCtrl', ['$timeout', '$state', 'repairs','errorLog',
    function ($timeout, $state, repairs,errorLog) {
        var vm = this;
        vm.currentPage = 0;
        vm.pageSize = 10;
        vm.suc_show = false;
        vm.err_show = false;
        vm.repairs = [];
        var params = {};

        vm.load = function (goPage, limit) {
            if (goPage > vm.numberOfPages || vm.currentPage == goPage || goPage < 1 || vm.busy) {
                return;
            } else {
                params = {
                    offset: limit * (goPage - 1),
                    limit: limit,
                    openid: sessionStorage.getItem("openid"),
                    queryType: 'openid'
                };

                repairs.query(params).$promise.then(function (data) {
                    vm.numberOfPages = Math.ceil(data.count / vm.pageSize);
                    vm.currentPage = goPage;
                    vm.busy = false;
                    Array.prototype.push.apply(vm.repairs, data.items);
                }, function (reason) {
                    alert(errorLog.getErrorMessage(reason));
                });
            }
        }

        vm.confirm = function (id) {
            params = {
                id: id,
                state: 3
            };
            repairs.save(params).$promise.then(function () {
                successcb()
            }, function () {
                errcb()
            });
        }

        function successcb() {
            vm.suc_show = true;
            $timeout(function () {
                vm.suc_show = false;
                $state.go("repair", {}, {
                    reload: true
                });
            }, 3000);
        }

        function errcb() {
            vm.err_show = true;
            $timeout(function () {
                vm.err_show = false;
            }, 3000);
        }

        vm.load(1, vm.pageSize);
    }
]);

(function() {
    angular.module('app.shop').controller('shopInfoCtrl', ['$scope',  '$stateParams', '$rootScope', 'shops', 'errorLog', 'communityLocation',
        function($scope, $stateParams, $rootScope, shops, errorLog, communityLocation) {
            $rootScope.site = $stateParams.site;
            $scope.currentPage = 0;
            $scope.pageSize = 5;
            $scope.shops = [];

            $scope.load = function(goPage, limit) {
                if (goPage > $scope.numberOfPages || $scope.currentPage == goPage || $scope.busy) {
                    return;
                } else if ($rootScope.site != 3) {
                    $scope.busy = true;
                    params = {
                        offset: $scope.pageSize * (goPage - 1),
                        limit: limit == 8 ? limit : $scope.pageSize,
                        type: $stateParams.site - 1
                    }
                    shops.query(params).$promise.then(function(data) {
                        $scope.numberOfPages = Math.ceil(data.count / $scope.pageSize);
                        $scope.currentPage = goPage;
                        $scope.busy = false;
                        $scope.shops.push.apply($scope.shops, data.items);
                    },function(reason){
                        alert(errorLog.getErrorMessage(reason));
                    });
                }
            }
            $scope.load(1, 8);

            $scope.$watch('communityLocation.changeCommunityHand', function(newVal, oldVal){
                if(newVal){
                    $scope.load(1, 8);
                }
            });
        }
    ]);
})();

angular.module('app.account').controller('loginCtrl', ['$stateParams', '$scope', '$timeout', '$interval',
    function ($stateParams, $scope, $timeout, $interval) {
        $scope.tel = "";
        $scope.authCode = "";

        $scope.sendAuthCode = function(){
            if($scope.tel.length != 11){
                return;
            }
            if(!verifyTel($scope.tel)){
                $scope.telVerifyError = true;
                $timeout(function(){
                    $scope.telVerifyError = false;
                    $("#tel").focus();
                },2000);
                return;
            }
            console.log("sendAuthCode...");
            $scope.authCodeSending = true;
            resendCountDown().then(function(){//倒计时结束
                $scope.authCodeSending = false;
            });
        }

        //开始验证码重发60s倒计时
        function resendCountDown(){
            var remainTime = 60;
            $scope.resendTime = remainTime + "s";
            var timer = $interval(function(){
                remainTime--;
                $scope.resendTime = remainTime + "s";
            }, 1000, 59);
            return timer;
        }

        $scope.login = function(){
            if($scope.authCode.length != 4){
                return;
            }
            console.log("login...");
        }

        function verifyTel(tel){
            var result = true;
            if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(tel)){
              result = false;
            }
            return result;
        }
    }
]);

angular.module('app.account').controller('nicknameCtrl', ['$stateParams',
    function ($stateParams) {
        var vm = this;
    }
]);

angular.module('app.address').controller('addressBlockCtrl',
    ['$stateParams','addresses', 'addressInfo',function($stateParams,addresses,addressInfo){
    var vm=this;
    if($stateParams.village){
        addressInfo.community = $stateParams.village;
    }
    if(!$stateParams.village){
        $stateParams.city = addressInfo.city;
        $stateParams.village = addressInfo.community;
        addressInfo.unit = null;
    }
    params = {
        type: "block",
        city:$stateParams.city,
        community:$stateParams.village
    }
    addresses.query(params).$promise.then(function (data) {
        vm.blocks = data.items;
        vm.city = addressInfo.city;
        vm.village = addressInfo.community;
    }, function (data) {
        console.log("err!");
    });
    console.log("village");
    console.log($stateParams);
    console.log("addressInfo注入");
    console.log(addressInfo);
}])
angular.module('app.address').controller('addressCityCtrl',['$stateParams','addresses','communityInfo','addressInfo', function($stateParams,addresses,communityInfo, addressInfo){
    var vm=this;
    params = {
        type:'city'
    }
    addresses.query(params).$promise.then(function (data) {
        vm.cities = data.items;
    }, function (data) {
        console.log("err!");
    });
    vm.city = $stateParams.city;
    addressInfo.city = $stateParams.city;
    console.log("addressInfo注入");
    console.log(addressInfo);
}]);
angular.module('app.address').controller('addressUnitCtrl',['$stateParams','addresses','addressInfo',function($stateParams,addresses,addressInfo){
    var vm=this;
    if($stateParams.block){
        addressInfo.block = $stateParams.block;
    }
    if(!$stateParams.block){
        $stateParams.city = addressInfo.city;
        $stateParams.village = addressInfo.community;
        $stateParams.block = addressInfo.block;
    }
    params = {
        type:'unit',
        city:$stateParams.city,
        community:$stateParams.village,
        block:$stateParams.block
    }
    addresses.query(params).$promise.then(function (data) {
        vm.units = data.items;
        vm.city = addressInfo.city;
        vm.village = addressInfo.community;
        vm.block = addressInfo.block;
    }, function (data) {
        console.log("err!");
    });
    console.log("unit");
    console.log($stateParams);
    console.log("addressInfo注入");
    console.log(addressInfo);
}]);
angular.module('app.address').controller('addressRoomCtrl', ['$stateParams','addresses','addressInfo',function ($stateParams, addresses,addressInfo) {
        var vm = this;
        
        if($stateParams.unit){
            addressInfo.unit = $stateParams.unit;
        }
        if($stateParams.block){
            addressInfo.block = $stateParams.block;
        }
        if(addressInfo.unit){
            $stateParams.city = addressInfo.city;
            $stateParams.village = addressInfo.community;
            $stateParams.block = addressInfo.block;
            $stateParams.unit = addressInfo.unit;
        }
        if(addressInfo.unit == null){
            $stateParams.city = addressInfo.city;
            $stateParams.village = addressInfo.community;
            $stateParams.block = addressInfo.block;
        }
        params={
            type:'room',
            city:$stateParams.city,
            community:$stateParams.village,
            block:$stateParams.block,
            unit:$stateParams.unit
        }
        addresses.query(params).$promise.then(function(data){
            vm.city = addressInfo.city
            vm.village = addressInfo.community;
            vm.block = addressInfo.block;
            vm.unit = addressInfo.unit;
            vm.rooms = data.items;
        })
        console.log(22);
        console.log($stateParams);
        console.log("addressInfo注入");
        console.log(addressInfo);
    }
])
angular.module('app.address').controller('addressVillageCtrl',
    ['$stateParams','addresses','communityInfo','addressInfo',
    function($stateParams,addresses,communityInfo, addressInfo){
    var vm=this;
    params = {
        type:'community',
        city:addressInfo.city
    }
    if($stateParams.city){
        addressInfo.city = $stateParams.city;
    }
    addressInfo.village = $stateParams.village;
    addresses.query(params).$promise.then(function (data) {
        vm.villages = data.items;
        vm.city = $stateParams.city
    }, function (data) {
        console.log("err!");
    });
    console.log("addressInfo注入");
    console.log(addressInfo);
}]);
myApp.directive('cFocus', function() {
    return {
        restrict: 'A',
        scope: {
            focus: '=',
        },
        link: function(scope, element, attrs) {
            scope.$watch('focus', function(newVal, oldVal){
                if(newVal){
                    element[0].focus();
                }
            });
        }
    }
})
myApp.directive('confirmModal', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            title: '=',
            tip: '=',
            tipAlign: '=',
            okText: '=',
            cancelText: '=',
            onlyOkButton: '=',
            close: '&onClose' 
        },
        templateUrl: 'tpl/common/directives/confirm-modal.tpl.html',
        link: function(scope, element, attrs) {
            scope.ok = function(){
                scope.close({state:true});
            }

            scope.cancel = function(){
                scope.close({state:false});
            }

            scope.$watch('cancelText', function(newVal, oldVal){
                if(!newVal){
                    scope.cancelText = "取消";
                }
            });

            scope.$watch('okText', function(newVal, oldVal){
                if(!newVal){
                    scope.okText = "确定";
                }
            })
        }
    }

})
myApp.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});
myApp.directive('globalLoading', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            tip: '=',
            lockClickHide: '='
        },
        templateUrl: 'tpl/common/directives/global-loading.tpl.html',
        link: function(scope, element, attrs) {
            scope.clickLoadingLayer = function(){
                if(!scope.lockClickHide){
                    scope.show = false;
                }
            }
        }
    }

})

myApp.directive('pagination', function() {
    return {
        restrict: 'E',
        scope: {
            numPages: '=',
            currentPage: '=',
            pageSize: '=',
            goPage: '&'
        },
        templateUrl: 'pagination.tpl.html',
        link: function(scope, element, attrs) {

            scope.isActive = function(page) {
                return scope.currentPage === page;
            }

            scope.hasPre = function() {
                return (scope.currentPage - 1 > 0);
            }

            scope.hasPre2 = function() {
                return (scope.currentPage - 2 > 0);
            }
            scope.hasNext = function() {
                return (scope.currentPage + 1 <= cope.numPages);
            }

            scope.hasNext2 = function() {
                return (scope.currentPage + 2 <= cope.numPages);
            }
        }
    }

})

myApp.directive('whenScrolled', ['$document', function ($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            $document.bind('scroll', function () {
                var rectObject = raw.getBoundingClientRect();
                if (window.innerHeight >= rectObject.bottom) {
                    scope.$apply(attrs.whenScrolled);
                }
            });
        }
    };
}]);
angular.module('myApp').filter('cut', function() {
    return function(value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }
        return value + (tail || '...');
    };
});
angular.module('myApp').filter('payListMerge', function() {
    return function(input) {
        var result = [];//新增属性waterDates,elecDates,waterDateText,elecDateText
        for(var i = 0;i<input.length;i++){
            var item = input[i];
            var find = false;
            for(var j = 0;j<result.length;j++){
                var temp = result[j];
                if(item.payDate == temp.payDate && item.ownerName == temp.ownerName){
                    find = true;
                    break;
                }
            }
            if(find){
                temp.amount+=item.amount;
                if(item.type == "0"){
                    temp.waterDates.push({year: parseInt(item.year),month: parseInt(item.month)});
                }else{// is "1"
                    temp.elecDates.push({year: parseInt(item.year),month: parseInt(item.month)});
                }
            }else{
                var newItem = angular.copy(item);
                newItem.waterDates = [];
                newItem.elecDates = [];
                if(item.type == "0"){
                    newItem.waterDates.push({year: parseInt(item.year),month: parseInt(item.month)});
                }else{// is "1"
                    newItem.elecDates.push({year: parseInt(item.year),month: parseInt(item.month)});
                }
                result.push(newItem);
            }
        }
        //对数组result中每个元素中的水费和电费日期分别进行合并处理，比如2015年2月、2015年3月合并为2015年2-3月
        //2015年2月，2015年3月，2015年5月合并为2015年2、3月等
        //2015年12月、2016年1月合并为2015年12月、2016年1月
        for(var i = 0;i<result.length;i++){
            var item = result[i];
            //将item对象的属性waterDates和elecDates2个数组按照年月进行升序排序处理
            item.waterDates.sort(compareDate);
            item.elecDates.sort(compareDate);

            item.waterDateText = getDateText(item.waterDates);
            item.elecDateText = getDateText(item.elecDates);
        }

        function compareDate(prev, next){
            if(prev.year < next.year || (prev.year == next.year && prev.month < next.month)){
                return -1;
            }else if(prev.year == next.year && prev.month == next.month){
                return 0;
            }else{
                return 1;
            }
        }

        function getDateText(dates){
            var sections = getDateSections(dates);
            var text = "";
            if(sections.length > 0){
                text = sections[0].dateText;
            }
            if(sections.length > 1){
                if(sections[0].length == 1){
                    if(sections[1].sy == sections[0].ey)
                        text = text.substr(0, text.length - 1);//同年情况下去掉前一个日期结尾的“月”
                    text+="、";
                    if(sections[1].sy == sections[0].ey)
                        text += sections[1].dateTextWithoutYear;
                    else{
                        text += sections[1].dateText;
                    }
                    if(sections.length > 2)
                        text+="等";
                }else if(sections[0].length > 1){
                    text+="等";
                }
            }
            
            return text;
        }

        function getDateSections(dates){
            var sections = [];
            if(dates.length > 0){
                sections.push({sy:dates[0].year,sm:dates[0].month,ey:dates[0].year,em:dates[0].month,length:1});
            }
            var prev = sections.length > 0 ? sections[0] : null;
            for(var i = 1;i<dates.length;i++){
                if(prev.ey == dates[i].year && prev.em == dates[i].month - 1){
                    prev.em = dates[i].month;
                    prev.length++;
                }else{
                    prev = dates[i];
                    sections.push({sy:prev.year,sm:prev.month,ey:prev.year,em:prev.month,length:1});
                }
            }
            for(var i = 0;i<sections.length;i++){
                sections[i].dateText = getSectionDateText(sections[i]);
                sections[i].dateTextWithoutYear = getSectionDateTextWithoutYear(sections[i]);
            }
            return sections;
        }

        function getSectionDateText(section){
            var text = "";
            if(section.length == 1){
                text = section.sy +"年"+section.sm+"月";
            }else if(section.length > 1){
                text = section.sy +"年"+section.sm+"-" + section.em + "月";
            }
            return text;
        }

        function getSectionDateTextWithoutYear(section){
            var text = "";
            if(section.length == 1){
                text = section.sm+"月";
            }else if(section.length > 1){
                text = section.sm+"-" + section.em + "月";
            }
            return text;
        }

        return result;
    };
});
angular.module('app.auth')
	.service('auth', ['$q','$http','$timeout', '$location', 'errorLog', 'communityInfo', 'appState', '$state',
		function($q,$http,$timeout, $location, errorLog, communityInfo, appState, $state){
		this.startChangeState = function(event, toState, toParams, fromState, fromParams){
			var destStateName = toState.name;
			if(!appState.visited && destStateName != "auto-location"){
				event.preventDefault();
				$state.go('auto-location');
				return;
			}
			if(!communityInfo.auth && destStateName == "address-list"){
				alert("好可惜，您所在的小区还没有开通此项服务哦~");
				event.preventDefault();
			}
		}
	}]);
angular.module('app.location')
	.service('communityList', ['$q','$http','$timeout', function($q,$http,$timeout){
		var cmmList = null;
		this.getCommunityList = function(cityName){
			var promise = null;
			if(cmmList){
				promise = $q.when(cmmList);
			}else{
				var defer = $q.defer();
				$http({
					method: "GET",
					url: basePath + '/GPS/findArea',
					params: {
						city: cityName
					}
				}).success(function(data){
					cmmList = data.items;
					defer.resolve(cmmList);
				}).error(function(data){
					defer.reject(data);
				});
				promise = defer.promise;
			}
			return promise;
		}
	}]);
angular.module('app.location')
	.service('communityLocation', ['$q', '$timeout', '$http', 'errorLog', 'userInfo','locationInfo', 'location',
		function($q, $timeout, $http, errorLog, userInfo, locationInfo, location){
		this.changeCommunityHand = false;
		
		//根据经纬度定位小区
		function locationCommunity(openId, longitude, latitude){// longitude经度，latitude维度
			var defer = $q.defer();
			$http({
				method: 'GET',
				url: basePath + '/GPS/',
				params: {
					openid: openId,
					lon: longitude,
					lat: latitude
				}
			}).success(function(data){
				defer.resolve(data);
			}).error(function(data){
				var reason = {
					errorCode: "LOCATION_COMMUNITY_ERROR",
					errorMessage: errorLog.getErrorMessage(data)
				};
				defer.reject(reason);
			});
			return defer.promise;
		}

		//自动定位小区，先定位经纬度，然后调用接口查询小区信息
		this.autoLocationCommunity = function(){
			var defer = $q.defer();
			var openId = null;
    		userInfo.getOpenId().then(function(data){//openid
    			openId = data;
    			return location.getLocation();
    		},function(reason){
    			return $q.reject(reason);
    		}).then(function(data){//location
    			//alert("long:"+data.longitude+",lat:"+data.latitude);
    			locationInfo.longitude = data.longitude;
    			locationInfo.latitude = data.latitude;
    			locationInfo.accuracy = data.accuracy;
    			location.storageLocation(locationInfo);
    			return locationCommunity(openId, data.longitude, data.latitude);
    		},function(reason){
    			return $q.reject(reason);
    		}).then(function(data){//community
    			defer.resolve(data);
    		}, function(reason){
    			defer.reject(reason);
    		});
			return defer.promise;
		}

		this.changeCommunity = function(openId, cmmInfo){
			var defer = $q.defer();
			$http({
				method: 'POST',
				url: basePath + '/GPS/save',
				data:{
					openid: openId,
					name: cmmInfo.name,
					city: cmmInfo.city,
					address: cmmInfo.address
				}
			}).success(function(data){
				defer.resolve(data);
			}).error(function(data){
				var reason = {
					errorCode: "CHANGE_COMMUNITY_ERROR",
					errorMessage: errorLog.getErrorMessage(data)
				};
				defer.reject(reason);
			});
			return defer.promise;
		}

		//判断2次小区定位是否一致，如果上次定位不存在，直接返回true
		// data:{type,areaName,city,address,lastAreaName,lastCity,lastAddress}
		this.compareCommunity = function(data){
			var result = true;
			if(data.type == "false" && 
				(data.areaName != data.lastAreaName || data.city != data.lastCity || data.address != data.lastAddress)){
				result = false;
			}
			//result = false;
			return result;
		}

		//获取上一次使用的小区信息，此信息通过localStorage持久化存储
		this.getLastCommunity = function(){
			var cmm = null;
			if(window.localStorage && localStorage.communityInfo){
				cmm = JSON.parse(localStorage.communityInfo);
			}
			return cmm;
		}

		this.storageCommunity = function(cmmInfo){
			var state = false;
			if(window.localStorage){
				localStorage.communityInfo = JSON.stringify(cmmInfo);
				state = true;
			}
			return state;
		}
	}]);
angular.module('app.location')
	.service('communitySearch', [function(){
		this.cmmList = null;
		var max = 10;
		this.searchCommunity = function(communityName){
			console.log("searchCommunity...");
			var result = [];
			if(this.cmmList && communityName){
				for(var i = 0;i<this.cmmList.length;i++){
					var item = this.cmmList[i];
					if(item.name.indexOf(communityName) >= 0){
						item.title = item.city + ", " + item.name;
						item.auth = item.state;
						result.push(item);
					}
					if(result.length >= max){
						break;
					}
				}
			}
			return result;
		}
	}]);
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
	}]);
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
		        defer.reject({
		        	errorCode: "BROWSER_NOT_SUPPORT",errorMessage: "浏览器不支持定位功能"
		        });
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
	        	var reason = {};
	          	switch(error.code)
	            {
		            case error.PERMISSION_DENIED:
		            	reason.errorCode = "PERMISSION_DENIED";
		                reason.errorMessage="用户拒绝定位请求";
		                break;
		            case error.POSITION_UNAVAILABLE:
		            	reason.errorCode = "POSITION_UNAVAILABLE";
		                reason.errorMessage="定位信息不可用";
		                break;
		            case error.TIMEOUT:
		            	reason.errorCode = "TIMEOUT";
		                reason.errorMessage="定位超时";
		                break;
		            case error.UNKNOWN_ERROR:
		            	reason.errorCode = "UNKNOWN_ERROR";
		                reason.errorMessage="未知错误";
		                break;
	            }
	            defer.reject(reason);
			}
			return defer.promise;
		}

		//获取上一次定位信息，此信息通过localStorage持久化存储
		this.getLastLocation = function(){
			var loc = null;
			if(window.localStorage && localStorage.locationInfo){
				loc = JSON.parse(localStorage.locationInfo);
			}
			return loc;
		}

		this.storageLocation = function(locInfo){
			var state = false;
			if(window.localStorage){
				localStorage.locationInfo = JSON.stringify(locInfo);
				state = true;
			}
			return state;
		}
	}]);
angular.module('app.user')
	.service('userInfo', ['$q','$http','$timeout', '$location', 'errorLog', function($q,$http,$timeout, $location, errorLog){
		var wxParam = null;//此参数是用户进入公众号页面后微信传入的参数，根据此参数再调API获取用户的OpenId
		var openId = null;
		var wxConfigParam = {
			timestamp : null,
			noncestr : null,
			sign : null,
		};

		this.initWxParam = function(){
			if(!wxParam){
				var url = $location.url().substring($location.url().indexOf("?"));
				if(url.indexOf("auto-location")>=0 || url.indexOf("home") >= 0){//此判断是为了在PC浏览器中调试时能够获取测试用的OpenId
					url="";
				}
				if(!url && localStorage.wxParam && localStorage.wxParam != "undefined"){
					url = localStorage.wxParam;
				}
				wxParam = url;
				localStorage.wxParam = wxParam;
			}
		}

		this.getOpenId = function(){
			var defer = $q.defer();
			if (!openId){
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
	}]);
angular.module('resources.address', ['ngResource']).
    factory('addresses', ['$resource', function($resource) {
        return $resource(basePath+'/houses/:id', {id:'@id'}, {
            query: {
            	params:{'id':'query'},
                method: 'GET',
                isArray: false
            }
        })
    }]);
angular.module('resources.complain', ['ngResource']).
    factory('complains', ['$resource', function($resource) {
        return $resource(basePath+'/complains/:id', {id:'@id'}, {
            query: {
            	params:{'id':'query'},
                method: 'GET',
                isArray: false
            }
        })
    }]);
angular.module('resources.notice', ['ngResource']).
factory('notices', ['$resource', function($resource) {
    return $resource(basePath+'/notices/:id', {id:'@id'}, {
        query: {
        	params:{'id':'query'},
            method: 'GET',
            isArray: false
        }
    })
}]);
angular.module('resources.payment', ['ngResource']).
    factory('payments', ['$resource', function($resource) {
        return $resource(basePath+'/payments/:id', {id:'@id'}, {
            query: {
            	params:{'id':'query'},
                method: 'GET',
                isArray: false
            }
        })
    }]);
angular.module('resources.repair', ['ngResource']).
factory('repairs', ['$resource', function($resource) {
    return $resource(basePath+'/repairs/:id', {id:'@id'}, {
        query: {
        	params:{'id':'query'},
            method: 'GET',
            isArray: false
        }
    })
}]);
angular.module('resources.shop', ['ngResource']).
factory('shops', ['$resource', 'locationInfo', function($resource, locationInfo) {
    return $resource(basePath+'/shops/:id', {}, {
        query: {
        	params:{
        		'id':'query',
        		lon: locationInfo.longitude,
        		lat: locationInfo.latitude
        	},
            method: 'GET',
            isArray: false
        }
    })
}]);