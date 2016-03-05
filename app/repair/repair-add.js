(function() {
    angular.module('app.repair').controller('repairAddCtrl', ['userInfo', '$timeout', '$http', '$state', 'address','$scope','addressInfo', 'repair',
        function(userInfo, $timeout, $http, $state, address, $scope, addressInfo, repair) {
            var vm = this;

            $scope.decives=[{name:'请选择报修设备'},{name:'开/换锁'},{name:'供电照明'},{name:'抽水马桶'},{name:'上/下水管道'},{name:'门窗维修'},{name:'房屋主体'},{name:'电梯/门禁'},{name:'供暖设施'},{name:'其他'}];
            $scope.currentDevice = $scope.decives[0];

            var loginInfo = userInfo.getLastLoginInfo();
            $scope.mobile = loginInfo.tel;

            $scope.repairSubmit = function() {
                if($scope.currentDevice.name == '请选择报修设备'){
                    $scope.repairErroer = '请选择报修设备';
                    $scope.showError = true;
                }else{
                    var params = {
                        device : $scope.currentDevice.name,
                        houseId : $scope.address.id,
                        openid : userInfo.getOpenIdSync(),
                        mobile : $scope.mobile,
                        remark : $scope.remark
                    }

                    repair.saveRepairAdd(params).then(function(data){
                        $scope.showSuccess = true;
                        $scope.onSuccessClose = function() {
                            $state.go('repair');
                        }
                    },function(){
                        $scope.repairErroer = '提交失败！';      
                        $scope.showError = true;
                    });
                }
            }

            address.getDefaultAddress().then(function(data){
                $scope.address = data;
            },function(reason){
                alert(reason.errorCode+","+reason.errorMessage);
            });

            $scope.changeAddress = function(){
                $scope.show = false;
                $scope.showAddressList = true;
                address.getAddressList().then(function(data){
                    $scope.addressList = data;
                },function(reason){
                    $scope.showAddressList = false;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectAddressComplete = function(){
                $scope.show = true;
                $scope.address = addressInfo;
            }
        }
    ]);
})();
