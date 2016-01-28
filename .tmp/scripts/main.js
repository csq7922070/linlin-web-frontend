//var basePath = "http://localhost:8080/skh";
var basePath = "http://mifan.4zlink.com:8080/mifan";
angular.module('app.home', []);
angular.module('app.notice', ['resources.notice']);
angular.module('app.repair', ['resources.repair']);
angular.module('app.shop', ['resources.shop']);
angular.module('app.complain', ['resources.complain']);
angular.module('app.address', ['resources.address']);
angular.module('app.payment', ['resources.address', 'resources.payment']);

var myApp = angular.module('myApp', ['ui.router', 'angular-carousel', 'app.home', 'app.repair', 'app.notice', 'app.shop', 'app.complain', 'app.address', 'app.payment']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

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
            templateUrl: "tpl/address/address-edit.tpl.html"
                //controllerAs: 'vm'
        })
        .state('address-block', {
            url: "/address-block/",
            templateUrl: "tpl/address/block/block.tpl.html",
            controller: "addressBlockCtrl",
            controllerAs: 'vm'
        })
        .state('address-unit', {
            url: "/address-unit/:block",
            templateUrl: "tpl/address/unit/unit.tpl.html",
            controller: "addressUnitCtrl",
            controllerAs: 'vm'
        })
        .state('address-room', {
            url: "/address-room/:block/:unit",
            templateUrl: "tpl/address/room/room.tpl.html",
            controller: "addressRoomCtrl",
            controllerAs: 'vm'
        })
        .state('address', {
            url: "/address/:id/:block/:unit/:room/:username/:initial",
            templateUrl: "tpl/address/address-edit.tpl.html",
            controller: "addressCtrl",
            controllerAs: 'vm'
        })
        .state('address-list', {
            url: "/address-list",
            templateUrl: "tpl/address/address-list.tpl.html",
            controller: "addressListCtrl",
            controllerAs: 'vm'
        })
        .state('bill', {
            url: "/bill/:block/:unit/:room/:id/:username/:activeId",
            templateUrl: "tpl/payment/bill.tpl.html",
            controller: "billCtrl"
        })
        .state('payment', {
            url: "/payment/:block/:unit/:room/",
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
}]).run(['$rootScope', function($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
        var url = "/" + to.name.replace(".", "/");
        _hmt.push(['_trackPageview', url]);
    });
}]);

angular.module('app.address').controller('addressListCtrl', ['$rootScope','$stateParams', '$state', 'addresses',
    function ($rootScope,$stateParams, $state, addresses) {
        var vm = this;
        params = {
            type: 'openid',
            openid: sessionStorage.getItem("openid")
        }
        addresses.query(params).$promise.then(function (data) {
            if (data.items.length!=0) {
                vm.houses = data.items;
                vm.activeId= data.activeId;
            }else if($rootScope.previousState == "home.shop-info"){
                $state.go("address-edit");
            }
        },function(data){
        })

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
angular.module('app.address').controller('addressCtrl', ['$stateParams', 'addresses',
    function ($stateParams, addresses) {
        var vm = this;
        vm.add_newaddress = function () {
            console.log("触发");
            params = {
                community: "阿尔卡迪亚",
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
        console.log("block" + $stateParams.block + " unit" + $stateParams.unit + " room" + $stateParams.room);
        console.log("succees");
        vm.block = $stateParams.block;
        vm.unit = $stateParams.unit;
        vm.room = $stateParams.room;
        //添加业主姓名与id
        vm.username = $stateParams.username;
        vm.id = $stateParams.id;
        console.log("username:" + vm.username + " id:" + vm.id);
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
    angular.module('app.complain').controller('complainDetailCtrl', ['$stateParams', 'complains',
        function ($stateParams, complains) {
            var vm = this;
            params = {
                id: $stateParams.id
            }
            complains.get(params).$promise.then(function(data) {
                vm.complain = data;
            },function(data){
                    console.log("err!");
            })
        }

    ])
})();
angular.module('app.complain').controller('complainListCtrl', ['complains',
    function (complains) {
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
                }, function (data) {
                    console.log("err!");
                })
            }
        }
        vm.load(1, vm.pageSize);
    }
]);
angular.module('app.home').controller('homeCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
    function($scope, $http, $stateParams, $rootScope, $state, $location) {

        var url = $location.url().substring($location.url().indexOf("?"));
        if (url.indexOf("home") != -1) {
            url = "";
        }
        //1.6获取微信用户openid
        if (sessionStorage.getItem("openid") == null) {
            $http({
                method: "GET",
                url: basePath + '/getopenid' + url
            }).success(function(data) {
                sessionStorage.setItem("openid", data.openid);
                //添加微信支付
                sessionStorage.setItem("timestamp", data.timestamp);
                sessionStorage.setItem("noncestr", data.noncestr);
                sessionStorage.setItem("sign", data.sign);
                console.log("获取openid成功");
            }).error(function(data) {
                console.log("获取openid失败");
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

(function() {
    angular.module('app.notice').controller("noticeDetailCtrl", ['$stateParams', 'notices',
        function($stateParams, notices) {
            var vm = this;
            notices.get({
                id: $stateParams.id
            }).$promise.then(function(data) {
                vm.notice = data;
            })
        }
    ]);
})();

(function() {
    angular.module('app.notice').controller('noticeListCtrl', ['notices',
        function(notices) {
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
                    });
                }
            }
            vm.load(1, vm.pageSize);
        }
    ]);
})();

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

angular.module('app.repair').controller('repairListCtrl', ['$timeout', '$state', 'repairs',
    function ($timeout, $state, repairs) {
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
                }, function (data) {
                    console.log("err!");
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

angular.module('app.payment').controller('billCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', 'addresses', 'payments',
    function($scope, $http, $stateParams, $rootScope, $state, addresses, payments) {
        //显示当前页面的业主信息
        $scope.ownerName = $stateParams.username;
        $scope.block = $stateParams.block;
        $scope.unit = $stateParams.unit;
        $scope.room = $stateParams.room;
        $scope.id = $stateParams.id;
        $scope.activeId = $stateParams.activeId;

        var totalCount = 0;

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

angular.module('app.payment').controller('paymentListCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
    function ($scope, $http, $stateParams, $rootScope, $state) {
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
            $scope.records = data.items;
        });
    }
]);
angular.module('app.payment').controller('paymentCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$q',
    function($scope, $http, $stateParams, $rootScope, $state, $q) {
        if($rootScope.wmonth!=null&&$rootScope.wmonth!=""){
            $scope.watermonth=$rootScope.wmonth;
        }
        if($rootScope.emonth!=null&&$rootScope.emonth!=""){
            $scope.elemonth=$rootScope.emonth;
        }
        var tmpwmonth = $rootScope.wmonth.map(_parseInt).sort(compare);
        var tmpemonth = $rootScope.emonth.map(_parseInt).sort(compare);
        var wdate;
        var edate;
        $scope.watmonth = arrange($rootScope.wmonth.map(_parseInt).sort(compare));
        $scope.elmonth = arrange($rootScope.emonth.map(_parseInt).sort(compare));

        if ($scope.watmonth.length > 1) {
            $scope.wyear = (tmpwmonth[0] + "").substr(0, 4);
            if ($scope.watmonth[0].length > 1) {
                if ((tmpwmonth[1] + "").substr(0, 4) == $scope.wyear) {
                    $scope.wmonth = (tmpwmonth[0] + "").substr(4, 2) + "," + (tmpwmonth[1] + "").substr(4, 2) + "月等";
                    wdate = $scope.wyear + "年" + $scope.wmonth;
                } else {
                    wdate = (tmpwmonth[0] + "").substr(0, 4) + "年" + (tmpwmonth[0] + "").substr(4, 2) + "月," + (tmpwmonth[0] + "").substr(0, 4) + "年" + (tmpwmonth[0] + "").substr(4, 2) + "月等";
                }
            } else {
                $scope.wmonth = (tmpwmonth[0] + "").substr(4, 2) + "月";
                wdate = $scope.wyear + "年" + $scope.wmonth;
            }

        } else {
            $scope.wyear = (tmpwmonth[0] + "").substr(0, 4) + "年";
            $scope.wmonth = (tmpwmonth[0] + "").substr(4, 2) + "-" + (tmpwmonth[tmpwmonth.length - 1] + "").substr(4, 2) + "月";
            wdate = $scope.wyear + $scope.wmonth;
        }

        if ($scope.elmonth.length > 1) {
            $scope.eyear = (tmpemonth[0] + "").substr(0, 4);
            if ($scope.elmonth[0].length > 1) {
                if ((tmpemonth[1] + "").substr(0, 4) == $scope.eyear) {
                    $scope.emonth = (tmpemonth[0] + "").substr(4, 2) + "," + (tmpemonth[1] + "").substr(4, 2) + "月等";
                    edate = $scope.eyear + "年" + $scope.emonth;
                } else {
                    edate = (tmpemonth[0] + "").substr(0, 4) + "年" + (tmpemonth[0] + "").substr(4, 2) + "月," + (tmpemonth[0] + "").substr(0, 4) + "年" + (tmpemonth[0] + "").substr(4, 2) + "月等";
                }
            } else {
                $scope.emonth = (tmpemonth[0] + "").substr(4, 2) + "月";
                edate = $scope.eyear + "年" + $scope.emonth;
            }

        } else {
            $scope.eyear = (tmpemonth[0] + "").substr(0, 4) + "年";
            $scope.emonth = (tmpemonth[0] + "").substr(4, 2) + "-" + (tmpemonth[tmpemonth.length - 1] + "").substr(4, 2) + "月";
            edate = $scope.eyear + $scope.emonth;
        }

        $scope.watmonth = wdate;
        $scope.elmonth = edate;

        $scope.block = $stateParams.block;
        $scope.unit = $stateParams.unit;
        $scope.room = $stateParams.room;

        $scope.waterFr = $rootScope.waterFree;
        $scope.eleFr = $rootScope.eleFree;

        $scope.totalFee = $rootScope.waterFree + $rootScope.eleFree;


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
    angular.module('app.shop').controller('shopInfoCtrl', ['$scope',  '$stateParams', '$rootScope', 'shops',
        function($scope, $stateParams, $rootScope, shops) {
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
                    });
                }
            }
            $scope.load(1, 8);
        }
    ]);
})();

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
factory('shops', ['$resource', function($resource) {
    return $resource(basePath+'/shops/:id', {}, {
        query: {
        	params:{'id':'query'},
            method: 'GET',
            isArray: false
        }
    })
}]);
angular.module('app.address').controller('addressBlockCtrl',['$stateParams','addresses',function($stateParams,addresses){
    var vm=this;
    params = {
        type: "block"
    }
    addresses.query(params).$promise.then(function (data) {
        vm.blocks = data.items;
    }, function (data) {
        console.log("err!");
    });
}])
angular.module('app.address').controller('addressRoomCtrl', ['$stateParams', 'addresses',
    function ($stateParams, addresses) {
        var vm = this;
        params={
            type:'room',
            block:$stateParams.block,
            unit:$stateParams.unit
        }
        addresses.query(params).$promise.then(function(data){
            vm.block = $stateParams.block;
            vm.unit = $stateParams.unit;
            vm.rooms = data.items;
        })
    }
])
angular.module('app.address').controller('addressUnitCtrl',['$stateParams','addresses',function($stateParams,addresses){
    var vm=this;
    params = {
        type:'unit',
        block:$stateParams.block
    }
    addresses.query(params).$promise.then(function (data) {
        vm.units = data.items;
        vm.block = $stateParams.block;
    }, function (data) {
        console.log("err!");
    });
}]);