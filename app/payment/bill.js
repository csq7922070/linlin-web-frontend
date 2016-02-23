angular.module('app.payment').controller('billCtrl', ['$scope', '$http', '$stateParams', '$rootScope', 
    '$state', 'addresses', 'payments','addressInfo','address','errorLog','control',
    function($scope, $http, $stateParams, $rootScope, $state, addresses, payments,addressInfo,
        address,errorLog,control) {
        if(!addressInfo.id){
            var routeState = { 
                toState:{
                    name: "bill"
                }
            };
            control.storageRouteState(routeState);
            $state.go("address-list");
            return;
        }
        refreshBill();

        var totalCount = 0;
        var list = null;
        function refreshBill(){
            var params = {
                id: 'query',
                paymentState: 0,
                queryType: 'houseId',
                houseId: addressInfo.id
            };

            payments.query(params).$promise.then(function(data) {
                if (data.amountList.length != 0) {
                    $scope.freeShow = false;
                    list = data.amountList;
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
                }
            });
        }

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
            $scope.sel = !sel;
            sel = $scope.sel;
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
]);
