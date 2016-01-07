var skhControllers = angular.module('skhControllers', ['ui.router']);

skhControllers.controller('noticeListCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http({
            method: "GET",
            url: basePath + '/notice/list.do',
            params: {
                offset: '0'
            }
        }).success(function (data) {
            $scope.notices = data.items;
        });
    }
]).controller("noticeDetailCtrl", ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
        $http({
            method: "GET",
            url: basePath + "/notice/get.do",
            params: {
                id: $stateParams.id
            }
        }).success(function (data) {
            $scope.notice = data;
        })
    }
]).controller('repairListCtrl', ['$scope', '$http', '$timeout',
    function ($scope, $http, $timeout) {
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.suc_show = false;
        $scope.err_show = false;
        $scope.repairs = [];

        $scope.load = function (goPage, limit) {
            if (goPage > $scope.numberOfPages || $scope.currentPage == goPage || goPage < 1 || $scope.busy) {
                return;
            } else {
                $scope.busy = true;
                $http({
                    method: "GET",
                    url: basePath + "/repair/list.do",
                    params: {
                        offset: $scope.pageSize * (goPage - 1),
                        limit: $scope.pageSize
                    }
                }).success(function (data) {
                    $scope.numberOfPages = Math.ceil(data.count / $scope.pageSize);
                    $scope.currentPage = goPage;
                    $scope.busy = false;
                    data.items.forEach(function (r) {
                        $scope.repairs.push(r);
                        r.confirm = function () {
                            $http({
                                method: "POST",
                                url: basePath + "/repair/confirm.do",
                                data: {
                                    id: r.id
                                }
                            }).success(function (data) {
                                $scope.suc_show = true;
                                $timeout(function () {
                                    $scope.suc_show = false;
                                }, 3000)
                            }).error(function (data) {
                                $scope.err_show = true;
                                $timeout(function () {
                                    $scope.err_show = false;
                                }, 3000)
                            })
                        }
                    })
                });
            }
        }

        $scope.load(1, $scope.pageSize);
    }
]).controller('repairDetailCtrl', ['$scope', '$http', '$stateParams', '$timeout',
    function ($scope, $http, $stateParams, $timeout) {
        $scope.suc_show = false;
        $scope.err_show = false;

        $http({
            method: "GET",
            url: basePath + "/repair/get.do",
            params: {
                'id': $stateParams.id
            }
        }).success(function (data) {
            $scope.repair = data;
            $scope.repair.confirm = function () {
                $http({
                    method: "POST",
                    url: basePath + "/repair/confirm.do",
                    data: {
                        id: $scope.repair.id
                    }
                }).success(function (data) {
                    $scope.suc_show = true;
                    $timeout(function () {
                        $scope.suc_show = false;
                    }, 3000)
                }).error(function (data) {
                    $scope.err_show = true;
                    $timeout(function () {
                        $scope.err_show = false;
                    }, 3000)
                })
            }
        });
    }
]).controller('repairAddCtrl', ['$scope', '$http', '$timeout',
    function ($scope, $http, $timeout) {
        $scope.submitForm = function () {
            $http({
                method: "POST",
                url: basePath + "/repair/add.do",
                data: {
                    'device': $scope.device,
                    'remark': $scope.remark,
                    'mobile': $scope.mobile,
                    'unit': $scope.unit,
                    'roomNo': $scope.roomNo,
                    'floor': $scope.floor
                }
            }).success(function (data) {
                $scope.suc_show = true;
                $timeout(function () {
                    $scope.suc_show = false;
                }, 3000)
            }).error(function (data) {
                $scope.err_show = true;
                $timeout(function () {
                    $scope.err_show = false;
                }, 3000)
            })
        }
    }
]).controller('complainListCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http({
            method: "GET",
            url: basePath + "/complain/list.do",
            params: {
                offset: '0',
                limit: 1000
            }
        }).success(function (data) {
            $scope.complains = data.items;
        });
    }
]).controller('complainDetailCtrl', ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
        $http({
            method: "GET",
            url: basePath + "/complain/get.do",
            params: {
                id: $stateParams.id
            }
        }).success(function (data) {
            $scope.complain = data;
        });
    }
]).controller('complainAddCtrl', ['$scope', '$http', '$timeout',
    function ($scope, $http, $timeout) {
        $scope.suc_show = false;
        $scope.err_show = false;
        $scope.submitForm = function () {
            $http({
                method: "POST",
                url: basePath + "/complain/add.do",
                data: {
                    title: $scope.title,
                    mobile: $scope.mobile,
                    content: $scope.content
                }
            }).success(function (data) {
                $scope.suc_show = true;
                $timeout(function () {
                    $scope.suc_show = false;
                }, 3000)
            }).error(function (data) {
                $scope.err_show = true;
                $timeout(function () {
                    $scope.err_show = false;
                }, 3000)
            })
        }

    }
]).controller('addressCtrl', ['$scope', '$http', '$stateParams', '$rootScope',
        function($scope, $http, $stateParams, $rootScope) {

            if ($stateParams.id) {
                //用户
                $rootScope.ownerName = $stateParams.user;
                $rootScope.room = $stateParams.id;
            }
        }
    ]).controller('addressFloorCtrl', ['$scope', '$http', '$stateParams', '$rootScope',
        function($scope, $http, $stateParams, $rootScope) {

            $rootScope.floor=null;
            $rootScope.unit=null;
            $rootScope.room=null;

            $http({
                method: "GET",
                url: basePath + "/archives/getFloor.do"
            }).success(function(data) {
                $scope.floors = data;
            });
        }
    ]).controller('addressUnitCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
        function($scope, $http, $stateParams, $rootScope, $state) {
            if($rootScope.previousState == "address" ||($scope.type == 3 && $rootScope.previousState == "address-room")){
                $state.go("address-floor");
                return;
            }

            $rootScope.unit=null;
            $rootScope.room=null;

            $http({
                method: "GET",
                url: basePath + "/archives/getUnit.do",
                params: {
                    floor: $stateParams.id
                }
            }).success(function(data) {
                $scope.units = data.items;
                $rootScope.floor = $stateParams.id;
                $rootScope.type = data.type;
                if (data.type == 0) {
                    $rootScope.ownerName = data.ownerName;
                    $state.go("address");
                }

                else if (data.type == 3) {
                    $scope.rooms = data.items;
                    $state.go("address-room");
                }
            });
        }
    ]).controller('addressRoomCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
        function($scope, $http, $stateParams, $rootScope, $state) {
            $rootScope.room=null;
            if($rootScope.previousState == "address"){
                $state.go("address-unit");
                return;
            }
            if ($scope.type == 3) {
                $rootScope.room = $stateParams.id;
            }

            $http({
                method: "GET",
                url: basePath + "/archives/getRoom.do",
                params: {
                    floor: $rootScope.floor,
                    unit: $stateParams.id
                }
            }).success(function(data) {
                console.log(data.ownerName);
                $rootScope.unit = $stateParams.id;
                $scope.rooms = data.items;

            });
        if ($scope.type == 3) {
            $rootScope.room = $stateParams.id;
        }

        $http({
            method: "GET",
            url: basePath + "/archives/getRoom.do",
            params: {
                floor: $rootScope.floor,
                unit: $stateParams.id
            }
        }).success(function (data) {
            console.log(data.ownerName);
            $rootScope.unit = $stateParams.id;
            $scope.nrooms = data.items;

        });
    }
]).controller('accountCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
    function ($scope, $http, $stateParams, $rootScope, $state) {
        $http({
            method: "GET",
            url: basePath + "/payment/getAmount.do"
            //params: {
            //    floor: $rootScope.floor,
            //    unit: $rootScope.unit,
            //    room: $rootScope.room
            //}
        }).success(function (data) {
                $scope.floor = $rootScope.floor;
                $scope.unit = $rootScope.unit;
                $scope.room = $rootScope.room;
                $scope.ownerName = $rootScope.ownName;

                $scope.freeShow = false;
                var list = data.amountList;

                //模拟数据house
                var house = [];

                var ret = {};
                ret.datas = new Array();

                for (var i = 0; i < list.length; i++) {
                    var yearmonth = list[i].year + "年" + list[i].month + "月";
                    var ele = {};
                    ele.id = list[i].id;
                    ele.type = list[i].paymentType;
                    ele.amount = list[i].amount;
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

                $scope.selectAll = function () {

                }

                $scope.selected = [];

                $scope.total = 0;

                //               单点
                $scope.update = function (ele) {
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

                    var wf = 0;
                    var ef = 0;
                    var wmonth = [];
                    var emonth = [];
                    var v2 = $scope.selected;

                    var v3 = list;
                    for (var i = 0; i < v3.length; i++) {
                        for (var j = 0; j < v2.length; j++) {
                            if (v3[i].id == (v2[j])) {
                                if (v3[i].paymentType == 0) {
                                    wf += v3[i].amount;
                                    wmonth.push(v3[i].month)
                                } else {
                                    ef += v3[i].amount;
                                    emonth.push(v3[i].month)
                                }
                            }
                            ;
                        }
                    }
                    $rootScope.waterFree = wf;
                    $rootScope.eleFree = ef;
                    $rootScope.wmonth = wmonth;
                    $rootScope.emonth = emonth;
                }

                $scope.updateYearmonth = function (yearmonth, selected) {
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

                    var wf = 0;
                    var ef = 0;
                    var v2 = $scope.selected;

                    var wmonth = [];
                    var emonth = [];

                    var v3 = list;
                    for (var i = 0; i < v3.length; i++) {
                        for (var j = 0; j < v2.length; j++) {
                            if (v3[i].id == (v2[j])) {
                                if (v3[i].paymentType == 0) {
                                    wf += v3[i].amount;
                                    wmonth.push(v3[i].month)
                                } else {
                                    ef += v3[i].amount;
                                    emonth.push(v3[i].month)
                                }
                            }
                            ;
                        }
                    }
                    $rootScope.waterFree = wf;
                    $rootScope.eleFree = ef;
                    $rootScope.wmonth = wmonth;
                    $rootScope.emonth = emonth;
                }

                $scope.updateAll = function (sel) {
                    angular.forEach($scope.payments, function (payment) {
                        payment.selected = sel;
                        angular.forEach(payment.eles, function (ele) {
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

                    var v3 = list;
                    for (var i = 0; i < v3.length; i++) {
                        for (var j = 0; j < v2.length; j++) {
                            if (v3[i].id == (v2[j])) {
                                if (v3[i].paymentType == 0) {
                                    wf += v3[i].amount;
                                    wmonth.push(v3[i].month)
                                } else {
                                    ef += v3[i].amount;
                                    emonth.push(v3[i].month)
                                }

                            }
                            ;
                        }
                    }
                    $rootScope.waterFree = wf;
                    $rootScope.eleFree = ef;
                    $rootScope.wmonth = wmonth;
                    $rootScope.emonth = emonth;
                }
                // var i = 0;
                // $scope.flg_src = "images/flag_01.png";
                // $scope.toggle = function() {
                //     i++;
                //    if (i % 2 == 0) {
                //        $scope.flg_src = "images/flag_01.png";

                //   } else {
                //      $scope.flg_src = "images/flag_02.png";
                //  }
                //}

            }
        );

    }
]).controller('paymentCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
    function ($scope, $http, $stateParams, $rootScope, $state) {
        $http({
            method: "GET",
            url: basePath + "/archives/getRoom.do",
            params: {}
        }).success(function (data) {

        });
        $scope.watmonth_f = $rootScope.wmonth.sort();
        $scope.watmonth = $scope.watmonth_f.join(",");
        $scope.elmonth_f = $rootScope.emonth.sort();
        $scope.elmonth = $scope.elmonth_f.join(",");

        //按数字大小排序有bug，1月，11月，7月
        //$scope.watmonth_f = $rootScope.wmonth;
        //$scope.watmonth = $scope.watmonth_f.sort();
        //$scope.watmonth.join(',');
        //$scope.elmonth_f = $rootScope.emonth;
        ////console.log($scope.elmonth_f);
        //$scope.elmonth = $scope.elmonth_f.sort();
        //$scope.elmonth.join(',');


        $scope.floor = $rootScope.floor;
        $scope.unit = $rootScope.unit;
        $scope.room = $rootScope.room;

        $scope.waterFr = $rootScope.waterFree;
        $scope.eleFr = $rootScope.eleFree;

        var j = 0;
        $scope.flg_src = "images/right_1.png";
        $scope.toggle = function () {
            j++;
            if (j % 2 == 0) {
                $scope.flg_src = "images/right_1.png";

            } else {
                $scope.flg_src = "images/right.png";
            }
        }
    }
])
    .controller('homeCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
        function ($scope, $http, $stateParams, $rootScope, $state, $location) {
            //1.6获取微信用户openid
            $http({
                method: "GET",
                url: basePath + '/getopenid' + $location.url().substring($location.url().indexOf("?"))
            }).success(function (data) {
                //sessionStorage.setItem("openId", data.openId);
                //sessionStorage.setItem("accessToken", data.accessToken);
                console.log("succees");

            }).error(function (data) {

            });


            $scope.slides7 = [{
                id: 10,
                label: "slide #10",
                img: "http://lorempixel.com/450/300/sports/0"
            }, {
                id: 11,
                label: "slide #11",
                img: "http://lorempixel.com/450/300/people/1"
            }, {
                id: 12,
                label: "slide #12",
                img: "http://lorempixel.com/450/300/people/2"
            }];
            //判断请求1月5日
            //console.log($location);
            $scope.getInto = function () {
                //console.log($location);
                //$http({
                //    method: "GET",
                //    url: basePath + '/archives/getAddress',
                //    params: {
                //        //offset: '0'
                //    }
                //}).success(function(data) {
                var data = new Object();
                data.type = 1;
                if (data.type == 1) {
                    $state.go("address");
                } else {
                    $state.go("account");
                }
                //});
            }

            //自定义全局数组，存储地址

            //$rootScope.mydata=[{
            //    "username":"鲍庆鑫",
            //    "useraddress":"鹤岗",
            //    "type":"1"
            //},{
            //    "username":"高佳鹏",
            //    "useraddress":"双鸭山",
            //    "type":"0"
            //},{
            //    "username":"周杰伦",
            //    "useraddress":"台湾",
            //    "type":"0"
            //},{
            //    "username":"啦啦啦",
            //    "useraddress":"呜呜",
            //    "type":"0"
            //}];


            $scope.carouselIndex7 = 0;

            $rootScope.site = 1;
            $state.go("home.shop-info", {
                site: 1
            });


        }
    ])
    .controller('shopInfoCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
        function ($scope, $http, $stateParams, $rootScope, $state) {
            $rootScope.site = $stateParams.site;
            $scope.currentPage = 0;
            $scope.pageSize = 5;
            $scope.shops = [];

            $scope.load = function (goPage, limit) {
                if (goPage > $scope.numberOfPages || $scope.currentPage == goPage || goPage < 1 || $scope.busy) {
                    return;
                } else if ($rootScope.site != 3) {
                    $scope.busy = true;
                    $http({
                        method: "GET",
                        url: basePath + "/getBusiness.do",
                        params: {
                            offset: $scope.pageSize * (goPage - 1),
                            limit: limit == 8 ? limit : $scope.pageSize,
                            type: $stateParams.site - 1
                        }
                    }).success(function (data) {
                        $scope.numberOfPages = Math.ceil(data.count / $scope.pageSize);
                        $scope.currentPage = goPage;
                        $scope.busy = false;
                        $scope.shops.push.apply($scope.shops, data.items);
                    }).error(function (data) {
                        //console.log("server error!");
                    });
                }
            }

            $scope.load(1, 8);
        }
    ]).controller('ownerCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
        function ($scope, $http, $stateParams, $rootScope, $state) {
            //var i = 0;
            //$scope.flg_src = "images/flag_01.png";
            //$scope.toggle = function () {
            //    i++;
            //    if (i % 2 == 0) {
            //        $scope.flg_src = "images/flag_01.png";
            //
            //    }
            //    else {
            //        $scope.flg_src = "images/flag_02.png";
            //    }
            //}
            //$scope.flag = true;
            $scope.mydatas = [{
                "username": "鲍庆鑫",
                "useraddress": "鹤岗",
                "type": "1",
                "id": "1"
            }, {
                "username": "高佳鹏",
                "useraddress": "双鸭山",
                "type": "0",
                "id": "2"
            }, {
                "username": "周杰伦",
                "useraddress": "台湾",
                "type": "0",
                "id": "31"
            }, {
                "username": "啦啦啦",
                "useraddress": "呜呜",
                "type": "0",
                "id": "4"
            }];
            $scope.change_flag = function (a) {
                alert(a);
            }
            $scope.deleteAddress = function (a) {
                $scope.sure_delete = true;
                $scope.sure = function () {
                    $scope.sure_delete = false;
                    //$http({
                    //    method: "GET",
                    //    url: basePath + "/getBusiness.do",
                    //    params: {
                    //       XX:XX
                    //    }
                    //}).success(function (data) {
                    //    $scope.mydatas.splice(a,1);
                    //}).error(function (data) {
                    //
                    //});
                    $scope.mydatas.splice(a, 1);
                }
                $scope.cancel = function () {
                    $scope.sure_delete = false;
                }

            }
            $scope.add_address = function () {
                $scope.mydatas.push({"username": "鲍庆鑫", "useraddress": "鹤岗", "type": "1"});
            }
            //$scope.persons=$rootScope.mydata;
        }
    ]).controller('accountRecordCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
        function ($scope, $http, $stateParams, $rootScope, $state) {
            //var i = 0;
            //$scope.flg_src = "images/flag_01.png";
            //$scope.toggle = function () {
            //    i++;
            //    if (i % 2 == 0) {
            //        $scope.flg_src = "images/flag_01.png";
            //
            //    }
            //    else {
            //        $scope.flg_src = "images/flag_02.png";
            //    }
            //}
            //$scope.flag=true;
            $scope.mydata = [{
                "money": 100.00,
                "address": "鹤岗",
                "type": "1",
                "id": "1",
                "date": "2015-11"
            }, {
                "money": 20.03,
                "address": "双鸭山",
                "type": "1",
                "id": "2",
                "date": "2015-9"
            }, {
                "money": 5.02,
                "address": "台湾",
                "type": "0",
                "id": "3",
                "date": "2015-12"
            }, {
                "money": 32.11,
                "address": "呜呜",
                "type": "0",
                "id": "4",
                "date": "2015-5"
            }];
        }
    ])
//自定义过滤器 截取字符串长度
skhControllers.filter('cut', function () {
    return function (value, wordwise, max, tail) {
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
})
