myApp.directive('cBill', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            showLoading: '=',
            billList: '='
        },
        templateUrl: 'tpl/common/directives/c-bill.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope, $http, $stateParams, $rootScope, $state, addresses, payments,addressInfo,
            address,errorLog,control,billPay,$filter,mathSvc) {
            $scope.selectedIds = [];//保存选择的待支付账单的ID
            $scope.totalFee = 0;//已选账单总金额   
            $scope.$watch("billList", function(newVal,oldVal){
                if($scope.billList){
                    $scope.lifeBillList = $scope.billList.lifeBillList;
                    $scope.otherBillList = $scope.billList.otherBillList;
                    $scope.billItemCount = $scope.billList.billItemCount;
                    $scope.selectedIds = [];//保存选择的待支付账单的ID
                    $scope.totalFee = 0;//已选账单总金额    
                    $scope.allSelected = false;    
                }
            })

            $scope.changeSelection = function(bill, billItem) {
                billItem.selected = !billItem.selected;
                var billItemSelected = billItem.selected;
                var type = billItem.type;
                angular.forEach($scope.lifeBillList, function(bill){
                    angular.forEach(bill.items, function(billItem){
                        if(billItem.type==type){
                            updateSelection(bill, billItem, billItemSelected);
                        }
                    });
                    bill.selected = bill.selectedCount > 0 && bill.selectedCount == bill.items.length;
                })
                $scope.allSelected = $scope.selectedIds.length>0 && $scope.selectedIds.length==$scope.billItemCount;
            }

            function updateSelection(bill, billItem, selected){
                if(bill.selectedCount === undefined){
                    bill.selectedCount = 0;
                }
                billItem.selected = selected;
                if (billItem.selected) {
                    if ($scope.selectedIds.indexOf(billItem.id) == -1) {
                        $scope.selectedIds.push(billItem.id);
                        bill.selectedCount++;
                        $scope.totalFee = mathSvc.add($scope.totalFee,billItem.amount);
                        // $scope.totalFee += billItem.amount;
                        // $scope.totalFee = Math.round($scope.totalFee*100)/100;
                    }
                } else {
                    if ($scope.selectedIds.indexOf(billItem.id) != -1) {
                        var idx = $scope.selectedIds.indexOf(billItem.id);
                        $scope.selectedIds.splice(idx, 1);
                        bill.selectedCount--;
                        $scope.totalFee = mathSvc.minus($scope.totalFee,billItem.amount);
                        // $scope.totalFee -= billItem.amount;
                        // $scope.totalFee = Math.round($scope.totalFee*100)/100;
                    }
                }
            }

            $scope.changeMonthSelection = function(bill) {
                bill.selected = !bill.selected;
                var billSelected = bill.selected;
                var type = bill.type;
                var bills = [];
                if(bill.items){
                    bills = $scope.lifeBillList;
                }else{
                    angular.forEach($scope.otherBillList,function(bill){
                        if(bill.type==type){
                            bills.push(bill);
                        }
                    })
                }
                angular.forEach(bills, function(bill){
                    updateMonthSelection(bill, billSelected);
                })
                $scope.allSelected = $scope.selectedIds.length>0 && $scope.selectedIds.length==$scope.billItemCount;
            }

            function updateMonthSelection(bill, selected){
                bill.selected = selected;
                if(bill.items){//处理水电费选择情况
                    for (var i = 0; i < bill.items.length; i++) {
                        var billItem = bill.items[i];
                        updateSelection(bill, billItem, bill.selected);
                    }
                }else{//处理物业费、车位维护费、车位费选择情况
                    if (bill.selected) {
                        if ($scope.selectedIds.indexOf(bill.id) == -1) {
                            $scope.selectedIds.push(bill.id);
                            $scope.totalFee = mathSvc.add($scope.totalFee,bill.amount);
                            // $scope.totalFee += bill.amount;
                            // $scope.totalFee = Math.round($scope.totalFee*100)/100;
                        }
                    } else {
                        if ($scope.selectedIds.indexOf(bill.id) != -1) {
                            var idx = $scope.selectedIds.indexOf(bill.id);
                            $scope.selectedIds.splice(idx, 1);
                            $scope.totalFee = mathSvc.minus($scope.totalFee,bill.amount);
                            // $scope.totalFee -= bill.amount;
                            // $scope.totalFee = Math.round($scope.totalFee*100)/100;
                        }
                    }
                }
            }

            $scope.changeAllSelection = function() {
                $scope.allSelected = !$scope.allSelected;
                angular.forEach($scope.otherBillList, function(bill){
                    updateMonthSelection(bill,$scope.allSelected);
                });
                angular.forEach($scope.lifeBillList, function(bill) {
                    updateMonthSelection(bill,$scope.allSelected);
                });
            }

            $scope.checkOut = function(){
                var waterFee = 0;
                var elecFee = 0;
                var wDates = [];//['20151','201510']
                var eDates = [];
                var otherBillList = [];//保存选择的物业费、车位维护费、车位费账单信息
                // var propertyBillList = [];
                // var carMaintenanceBillList = [];
                // var carportBillList = [];
                //统计所选水电费账单的日期，水费账单日期存到wDates中，电费账单日期存到eDates
                for (var i = 0; i < $scope.lifeBillList.length; i++) {
                    var bill = $scope.lifeBillList[i];
                    for (var j = 0; j < bill.items.length; j++) {
                        var billItem = bill.items[j];
                        if (billItem.selected) {
                            if (billItem.type == 0) {//水费账单
                                waterFee = mathSvc.add(waterFee,billItem.amount);
                                //waterFee += billItem.amount;
                                wDates.push(billItem.year+""+billItem.month);//as "20153" or "201510"
                            } else if(billItem.type == 1){//电费账单
                                elecFee = mathSvc.add(elecFee,billItem.amount);
                                //elecFee += billItem.amount;
                                eDates.push(billItem.year+""+billItem.month);
                            }
                        };
                    }
                }
                // waterFee = Math.round(waterFee*100)/100;
                // elecFee = Math.round(elecFee*100)/100;
                //统计所选物业费、车位维护费、车位费账单
                angular.forEach($scope.otherBillList,function(bill){
                    if(bill.selected){
                        otherBillList.push(bill);
                    }
                });
                var payBillInfo = {
                    otherBillList: otherBillList,
                    waterFee: waterFee,
                    elecFee: elecFee,
                    wDates: wDates,//[20153,20154,201510...]
                    eDates: eDates,
                    billIds: $scope.selectedIds,
                    totalFee: $scope.totalFee
                };
                billPay.savePayBillInfo(payBillInfo);
                $state.go("pay");
            }
        }
    }
})