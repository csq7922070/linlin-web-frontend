myApp.directive('cRepairAdd', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onScrolled: '&',
            repairAdd: '=',
            onComplete: '&'
        },
        templateUrl: 'tpl/common/directives/repair/c-repair-add.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function (userInfo, $timeout, $http, $state, address, $scope, addressInfo, repair) {

            var loginInfo = userInfo.getLastLoginInfo();
            $scope.mobile = loginInfo.tel;

            $scope.repairSubmit = function() {
                if(repair.repairDevice == null){
                   repair.repairDeviceId = 1;
                   repair.repairDevice = '开换锁';
                }
                var params = {
                    imgTag : repair.repairDeviceId,
                    device : repair.repairDevice,
                    houseId : $scope.address.id,
                    accountId : userInfo.getAccountId(),
                    mobile : $scope.mobile,
                    remark : $scope.remark
                }
                console.log(params);           

                repair.saveRepairAdd(params).then(function(data){
                    $scope.showSuccess = true;
                    $scope.remark = null;
                    $scope.onSuccessClose = function() {
                        $scope.show = false;
                        $scope.onComplete();
                    }
                },function(){
                    $scope.showError = true;
                });
            }

            $scope.repairConcel = function() {
                $scope.show = false;
            }

            address.getDefaultAddress().then(function(data){
                $scope.address = data;
            },function(reason){
                alert(reason.errorCode+","+reason.errorMessage);
            });

            $scope.changeAddress = function(){
                $scope.showAddressList = true;
                address.getAddressList().then(function(data){
                    $scope.addressList = data;
                },function(reason){
                    $scope.showAddressList = false;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectAddressComplete = function(){
                $scope.address = addressInfo;
            }

        }
    }
});