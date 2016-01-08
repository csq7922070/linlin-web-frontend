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
                        limit: $scope.pageSize,
                        openid: sessionStorage.getItem("openId")
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
                    'floor': $scope.floor,
                    'openid': sessionStorage.getItem("openId")
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
                limit: 1000,
                openid: sessionStorage.getItem("openId")
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
                    content: $scope.content,
                    openid: sessionStorage.getItem("openId")
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
    function ($scope, $http, $stateParams, $rootScope) {
        //添加地址
        $scope.add_newaddress = function () {
            //自定义传参数
            //$rootScope.mydata.push({"username": $rootScope.floor, "useraddress":121212, "type": "1","id":4});

            //1.8向后台添加地址
            $http({
                method: "POST",
                url: basePath + "/archives/addHouse",
                data: {
                    court: "阿尔卡迪亚",
                    floor: $stateParams.floor,
                    unit: $stateParams.unit,
                    roomNo: $stateParams.room,
                    openid: sessionStorage.getItem("openId"),
                    id: $stateParams.id,
                    initial: $stateParams.initial
                }
            }).success(function (data) {
                console.log("后台添加地址成功");
            }).error(function (data) {
                console.log("后台添加地址成功");
            })
        }
        console.log("floor" + $stateParams.floor + " unit" + $stateParams.unit + " room" + $stateParams.room);
        console.log("succees");
        $scope.floor = $stateParams.floor;
        $scope.unit = $stateParams.unit;
        $scope.room = $stateParams.room;
        //添加业主姓名与id
        $scope.username = $stateParams.username;
        $scope.id = $stateParams.id;
        console.log("username:" + $scope.username + " id:" + $scope.id)
        console.log($stateParams.initial);
    }
]).controller('addressFloorCtrl', ['$scope', '$http', '$stateParams', '$rootScope',
    function ($scope, $http, $stateParams, $rootScope) {
        $http({
            method: "GET",
            url: basePath + "/archives/getFloor.do"
        }).success(function (data) {
            //sessionStorage.setItem("openId", 123);
            //console.log("获取sessionStorage");
            $scope.datas = data;
        });
    }
]).controller('addressUnitCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
    function ($scope, $http, $stateParams, $rootScope, $state) {
        $http({
            method: "GET",
            url: basePath + "/archives/getUnit.do",
            params: {
                floor: $stateParams.floor
            }
        }).success(function (data) {
            $scope.units = data.items;
            $scope.floor = $stateParams.floor;
        });
    }
]).controller('addressRoomCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
    function ($scope, $http, $stateParams, $rootScope, $state) {
        $http({
            method: "GET",
            url: basePath + "/archives/getRoom.do",
            params: {
                floor: $stateParams.floor,
                unit: $stateParams.unit
            }
        }).success(function (data) {
            $scope.floor = $stateParams.floor;
            $scope.unit = $stateParams.unit;
            $scope.rooms = data.items;
        });
    }
]).controller('accountCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
    function ($scope, $http, $stateParams, $rootScope, $state) {
        //显示当前页面的业主信息

        if ($stateParams.username != "") {
            $scope.ownerName = $stateParams.username;
        }
        else {
            $scope.ownerName = $
        }
        $scope.floor = $stateParams.floor;
        $scope.unit = $stateParams.unit;
        $scope.room = $stateParams.room;
        $scope.id = $stateParams.id;
        //获取水电费等数据
        $http({
            method: "GET",
            url: basePath + "/payment/getAmount.do",
            params: {
                paymentState: 0,
                id: $stateParams.id
            }
        }).success(function (data) {
            //$scope.floor = $rootScope.floor;
            //$scope.unit = $rootScope.unit;
            //$scope.room = $rootScope.room;
            //$scope.ownerName = $rootScope.ownName;

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

        });
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
                sessionStorage.setItem("openId", data.openid);
                console.log("获取openid成功");
            }).error(function (data) {
                console.log("获取openid失败");
            });


            $scope.slides7 = [{
                id: 10,
                label: "slide #1",
                //img: "http://lorempixel.com/450/300/sports/0"
                img: "images/banner_01.png"
            }, {
                id: 11,
                label: "slide #2",
                //img: "http://lorempixel.com/450/300/people/1"
                img: "images/banner_02.png"
            }, {
                id: 12,
                label: "slide #3",
                img: "http://lorempixel.com/450/300/people/2"
            }];
            $scope.carouselIndex7 = 0;

            $scope.getInto = function () {
                //向后台传openid
                $http({
                    method: "GET",
                    url: basePath + "/archives/getAddress",
                    //openid:sessionStorage.getItem("openid")
                    params: {
                        openid: sessionStorage.getItem("openId")
                    }
                    //openid:123
                }).success(function (data) {
                    if (data.type == 1) {
                        console.log("默认地址type=1");

                        $state.go("account", {
                            floor: data.items.floor,
                            unit: data.items.unit,
                            room: data.items.roomNo,
                            id: data.items.id,
                            username: data.items.owners[0].ownerName
                        });
                    }
                    else if (data.type == 0) {
                        console.log("默认地址type=0");

                        ///account/:floor/:unit/:room/:id/:username
                        $state.go("address", {
                            //floor:
                        });
                    }
                    //console.log("向后台传openid成功");
                }).error(function (data) {
                    console.log("向后台传openid失败");
                });
            }

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
            //获取业主地址信息
            $http({
                method: "GET",
                url: basePath + "/archives/findHouseByOpenid",
                params: {
                    openid: sessionStorage.getItem("openId")
                }
            }).success(function (data) {
                $scope.houses = data.items;
                data.items.forEach(function (house) {
                    house.deleteAddress = function (a) {
                        //console.log("click")
                        $scope.sure_delete = true;
                        $scope.sure = function () {
                            $scope.sure_delete = false;
                            $http({
                                method: "POST",
                                url: basePath + "/archives/delHouse",
                                data: {
                                    id: house.id
                                }
                            }).success(function (data) {
                                $scope.houses.splice(a, 1);

                                console.log("删除成功")
                            }).error(function (data) {
                                console.log("删除失败")
                            });
                        }

                    };
                    house.change_flag = function (b) {
                        //$scope.sure=function(){
                        //$scope.sure_delete = false;
                        $http({
                            method: "POST",
                            url: basePath + "/archives/updateHouseActive",
                            data: {
                                id: house.id,
                                openid: sessionStorage.getItem("openId")
                            }
                        }).success(function (data) {
                            //$scope.houses.splice(a,1);
                            $scope.id = house.id;
                            console.log("设置默认地址成功");
                        }).error(function (data) {
                            console.log("设置默认地址失败");
                        });
                        //}
                    }
                    //house.activate=function(){
                    //
                    //}
                })
            }).error(function (data) {

            });

            //$scope.mydatas=$rootScope.mydata;
            //console.log($rootScope.mydata)

            //$scope.change_flag = function(a) {
            //    // alert(a);
            //}
            //$scope.deleteAddress = function(a) {
            //    $scope.sure_delete = true;
            //    $scope.sure = function() {
            //        $scope.sure_delete = false;
            //        $http({
            //            method: "GET",
            //            url: basePath + "/archives/delHouse",
            //            params: {
            //               id:XX
            //            }
            //        }).success(function (data) {
            //            $scope.mydatas.splice(a,1);
            //        }).error(function (data) {
            //
            //        });
            //        //$scope.mydatas.splice(a, 1);
            //        console.log("执行删除,没有数据")
            //    }
            //    $scope.cancel = function() {
            //        $scope.sure_delete = false;
            //    }
            //
            //}
            $scope.add_address = function () {
                //$scope.mydatas.push({"username": "打豆豆", "useraddress": "方法", "type": "1"});
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
