angular.module('app.bill').controller('billCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state','addresses','payments',
        function($scope, $http, $stateParams, $rootScope, $state,addresses,payments) {
            //显示当前页面的业主信息
            $scope.ownerName = $stateParams.username;
            $scope.block = $stateParams.block;
            $scope.unit = $stateParams.unit;
            $scope.room = $stateParams.room;
            $scope.id = $stateParams.id;
            $scope.activeId = $stateParams.activeId;

            $scope.change_flag=function(){
                if($scope.id == $scope.activeId ){
                    return;
                }
                addresses.save({id:$stateParams.id,openid: sessionStorage.getItem("openid")}).$promise.then(function(){
                    $scope.activeId=$stateParams.id;
                });
            }

            params = {
                id:'query',
                paymentState: 0,
                queryType:'houseId',
                houseId: $stateParams.id
            };

            payments.query(params).$promise.then(function(data) {
                if (data.amountList != 0) {
                    $scope.freeShow = false;
                    var list = data.amountList;
                    var ret = {};
                    ret.datas = new Array();

                    for (var i = 0; i < list.length; i++) {
                        var yearmonth = list[i].year + "年" + list[i].month + "月";
                        var ele = {};
                        ele.id = list[i].id;
                        ele.type = list[i].type;
                        ele.amount = list[i].amount;

                        ele.number=list[i].number;
                        ele.count=list[i].count;

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
                                        wmonth.push(v3[i].month)
                                    } else {
                                        ef += v3[i].amount;
                                        emonth.push(v3[i].month)
                                    }
                                };
                            }
                        }
                        $rootScope.waterFree = wf;
                        $rootScope.eleFree = ef;
                        $rootScope.wmonth = wmonth;
                        $rootScope.emonth = emonth;
                        $rootScope.ids=$scope.selected.join(",");
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
                                        wmonth.push(v3[i].month)
                                    } else {
                                        ef += v3[i].amount;
                                        emonth.push(v3[i].month)
                                    }
                                };
                            }
                        }
                        $rootScope.waterFree = wf;
                        $rootScope.eleFree = ef;
                        $rootScope.wmonth = wmonth;
                        $rootScope.emonth = emonth;
                        $rootScope.ids=$scope.selected.join(",");
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
                                        wmonth.push(v3[i].month)
                                    } else {
                                        ef += v3[i].amount;
                                        emonth.push(v3[i].month)
                                    }
                                };
                            }
                        }
                        $rootScope.waterFree = wf;
                        $rootScope.eleFree = ef;
                        $rootScope.wmonth = wmonth;
                        $rootScope.emonth = emonth;
                        $rootScope.ids=$scope.selected.join(",");
                        console.log($rootScope.ids)
                    }
                }
            })
        }
    ]);