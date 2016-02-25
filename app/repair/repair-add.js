(function() {
    angular.module('app.repair').controller('repairAddCtrl', ['userInfo', '$timeout', '$http', '$state', 'repairs','address','$scope','addressInfo',
        function(userInfo, $timeout, $http, $state, repairs, address, $scope, addressInfo) {
            var vm = this;

            vm.mask_close = function() {
                vm.suc_show = false;
            }
            vm.mask_err_close = function() {
                vm.err_show = false;
            }
            // vm.submitForm = function() {
            //     params = {
            //         device : $scope.currentDevice.name,
            //         houseId : $scope.defaulthouseId,
            //         mobile : $scope.defaultmobile,
            //         openid : userInfo.getOpenIdSync(),
            //         remark : $scope.defaultremark
            //     }
            //     repairs.save(params).$promise.then(successcb, errcb);
            // }
            $scope.repairSubmit = function() {
                if($scope.currentDevice.name == '请选择报修设备'){
                    // alert('请选择报修设备'); 
                    $scope.repairerroer = '请选择报修设备';
                    $scope.showError = true;
                }else{
                    params = {
                        device : $scope.currentDevice.name,
                        houseId : $scope.defaulthouseId,
                        mobile : $scope.defaultmobile,
                        openid : userInfo.getOpenIdSync(),
                        remark : $scope.defaultremark
                    }
                    repairs.save(params).$promise.then(successcb, errcb);
                }
            }
            


            var loginInfo = userInfo.getLastLoginInfo();
            $scope.defaultmobile = loginInfo.tel;

            function successcb() {
                // vm.suc_show = true;
                // $timeout(function() {
                //     vm.suc_show = false;
                //     $state.go("repair");
                // }, 3000);
                $scope.showSuccess = true;
                $scope.onSuccessClose = function() {
                    $state.go('repair');
                }
            }

            function errcb() {
                // vm.err_show = true;
                // $timeout(function() {
                //     vm.err_show = false;
                // }, 3000);
                $scope.repairerroer = '提交失败！';      
                $scope.showError = true;
            }

            $scope.decives=[{name:'请选择报修设备'},{name:'开/换锁'},{name:'供电照明'},{name:'抽水马桶'},{name:'上/下水管道'},{name:'门窗维修'},{name:'房屋主体'},{name:'电梯/门禁'},{name:'供暖设施'},{name:'其他'}];
            $scope.decives.push();
            $scope.currentDevice = $scope.decives[0];

            console.log($scope.currentDevice.name);

            if($scope.currentDevice.name == '请选择报修设备'){
                console.log('23232');
                console.log($scope.currentDevice.required);
                $scope.currentDevice.required = true;
            }

            address.getDefaultAddress().then(function(data){
                console.log('111');
                console.log(data);
                $scope.defaultcity = data.city;
                $scope.defaultcommunity = data.community;
                $scope.defaulthouseId = data.id;
                $scope.defaultblock = data.block;
                $scope.defaultunit = data.unit;
                $scope.defaultroom = data.room;
            },function(reason){
                alert(reason.errorCode+","+reason.errorMessage);
            });
            $scope.changeAddress = function(){
                $scope.show = false;
                $scope.showAddressList = true;
                address.getAddressList().then(function(data){
                    $scope.addressList = data;
                    console.log($scope.addressList);
                },function(reason){
                    $scope.showAddressList = false;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectAddressComplete = function(){
                $scope.show = true;
                console.log("onSelectAddressComplte");
                console.log(addressInfo);
                $scope.defaultcity = addressInfo.city;
                $scope.defaultcommunity = addressInfo.community;
                $scope.defaulthouseId = addressInfo.id;
                $scope.defaultblock = addressInfo.block;
                $scope.defaultunit = addressInfo.unit;
                $scope.defaultroom = addressInfo.room;
            }
        }
    ]);
})();
