angular.module('app.pay').controller('billCtrl', ['$scope', '$http', '$stateParams', '$rootScope', 
    '$state', 'addresses', 'payments','addressInfo','address','errorLog','control','billPay',
    function($scope, $http, $stateParams, $rootScope, $state, addresses, payments,addressInfo,
        address,errorLog,control,billPay) {
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

        // $scope.propertyBillList = [];//物业费账单列表
        // $scope.carMaintenanceBillList = [];//车位维护费账单列表
        // $scope.carportBillList = [];//车位费账单列表
        $scope.lifeBillList = [];//水电费账单列表，以年月为分隔标准
        $scope.otherBillList = [];//物业费、车位维护费、车位费账单列表
        $scope.billItemCount = 0;//全部可选账单数量
        refreshBillList();
        function refreshBillList(){
            $scope.showLoading = true;
            billPay.getBillInfo(addressInfo.id).then(function(data) {
                $scope.showLoading = false;
                // $scope.propertyBillList = angular.copy(data.propertyFeeList);//物业费
                // $scope.carMaintenanceBillList = angular.copy(data.carMaintenanceFeeList);//车位维护费
                // $scope.carportBillList = angular.copy(data.carportFeeList);//车位费
                $scope.lifeBillList = angular.copy(data.lifeFeeList);//水电费
                $scope.otherBillList = angular.copy(data.otherFeeList);//物业费、车位维护费、车位费
                //计算可选总账单数
                // $scope.billItemCount+=$scope.propertyBillList.length;
                // $scope.billItemCount+=$scope.carMaintenanceBillList.length;
                // $scope.billItemCount+=$scope.carportBillList.length;
                $scope.billItemCount+=$scope.otherBillList.length;
                angular.forEach($scope.lifeBillList, function(bill){
                    $scope.billItemCount+=bill.items.length;
                });
            },function(reason){
                $scope.showLoading = false;
                alert(errorLog.getErrorMessage(reason));
            });
        }

        $scope.selectedIds = [];//保存选择的待支付账单的ID
        $scope.totalFee = 0;//已选账单总金额

        //按钮单点
        $scope.changeSelection = function(bill, billItem,selected) {
            if(bill.selectedCount === undefined){
                bill.selectedCount = 0;
            }
            if(selected == undefined){
                billItem.selected = !billItem.selected;
            }else{
                billItem.selected = selected;
            }
            if (billItem.selected) {
                if ($scope.selectedIds.indexOf(billItem.id) == -1) {
                    $scope.selectedIds.push(billItem.id);
                    bill.selectedCount++;
                    $scope.totalFee += billItem.amount;
                }
            } else {
                if ($scope.selectedIds.indexOf(billItem.id) != -1) {
                    var idx = $scope.selectedIds.indexOf(billItem.id);
                    $scope.selectedIds.splice(idx, 1);
                    bill.selectedCount--;
                    $scope.totalFee -= billItem.amount;
                }
            }
            if(selected == undefined){
                bill.selected = bill.selectedCount > 0 && bill.selectedCount == bill.items.length;
                $scope.allSelected = $scope.selectedIds.length>0 && $scope.selectedIds.length==$scope.billItemCount;
            }
        }

        $scope.changeMonthSelection = function(bill,selected) {
            if(selected == undefined){
                bill.selected = !bill.selected;
            }else{
                bill.selected = selected;
            }
            if(bill.items){//处理水电费选择情况
                for (var i = 0; i < bill.items.length; i++) {
                    var billItem = bill.items[i];
                    $scope.changeSelection(bill, billItem, bill.selected);
                }
            }else{//处理物业费、车位维护费、车位费选择情况
                if (bill.selected) {
                    if ($scope.selectedIds.indexOf(bill.id) == -1) {
                        $scope.selectedIds.push(bill.id);
                        $scope.totalFee += bill.amount;
                    }
                } else {
                    if ($scope.selectedIds.indexOf(bill.id) != -1) {
                        var idx = $scope.selectedIds.indexOf(bill.id);
                        $scope.selectedIds.splice(idx, 1);
                        $scope.totalFee -= bill.amount;
                    }
                }
            }
            if(selected == undefined){
                $scope.allSelected = $scope.selectedIds.length>0 && $scope.selectedIds.length==$scope.billItemCount;
            }
        }

        $scope.changeAllSelection = function() {
            $scope.allSelected = !$scope.allSelected;
            angular.forEach($scope.otherBillList, function(bill){
                $scope.changeMonthSelection(bill,$scope.allSelected);
            });
            angular.forEach($scope.lifeBillList, function(bill) {
                $scope.changeMonthSelection(bill,$scope.allSelected);
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
                            waterFee += billItem.amount;
                            wDates.push(billItem.year+""+billItem.month);//as "20153" or "201510"
                        } else if(billItem.type == 1){//电费账单
                            elecFee += billItem.amount;
                            eDates.push(billItem.year+""+billItem.month);
                        }
                    };
                }
            }
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
]);
