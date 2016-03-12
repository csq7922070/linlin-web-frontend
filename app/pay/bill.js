angular.module('app.pay').controller('billCtrl', ['$scope', '$http', '$stateParams', '$rootScope', 
    '$state', 'addresses', 'payments','addressInfo','address','errorLog','control','billPay','$filter',
    function($scope, $http, $stateParams, $rootScope, $state, addresses, payments,addressInfo,
        address,errorLog,control,billPay,$filter) {
        address.getAddressList().then(function(data){
            $scope.addressList = data;
        },function(reason){
            alert(errorLog.getErrorMessage(reason));
        });

        $scope.onSelectAddress = function(addressId){
            refreshBillList(addressId);
        }

        // $scope.propertyBillList = [];//物业费账单列表
        // $scope.carMaintenanceBillList = [];//车位维护费账单列表
        // $scope.carportBillList = [];//车位费账单列表
        var lifeBillList = [];//水电费账单列表，以年月为分隔标准
        var otherBillList = [];//物业费、车位维护费、车位费账单列表
        var billItemCount = 0;//全部可选账单数量
        
        function refreshBillList(addressId){
            $scope.showBillLoading = true;
            billPay.getBillInfo(addressId).then(function(data) {
                $scope.showBillLoading = false;
                // $scope.propertyBillList = angular.copy(data.propertyFeeList);//物业费
                // $scope.carMaintenanceBillList = angular.copy(data.carMaintenanceFeeList);//车位维护费
                // $scope.carportBillList = angular.copy(data.carportFeeList);//车位费
                lifeBillList = angular.copy(data.lifeFeeList);//水电费
                otherBillList = angular.copy(data.otherFeeList);//物业费、车位维护费、车位费
                //计算可选总账单数
                // $scope.billItemCount+=$scope.propertyBillList.length;
                // $scope.billItemCount+=$scope.carMaintenanceBillList.length;
                // $scope.billItemCount+=$scope.carportBillList.length;
                billItemCount=otherBillList.length;
                angular.forEach(lifeBillList, function(bill){
                    billItemCount+=bill.items.length;
                });
                $scope.billList = {
                    lifeBillList: lifeBillList,
                    otherBillList: otherBillList,
                    billItemCount: billItemCount
                };
            },function(reason){
                $scope.showBillLoading = false;
                alert(errorLog.getErrorMessage(reason));
            });
        }
    }
]);
