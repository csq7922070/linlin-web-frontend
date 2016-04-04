myApp.directive('cAcceptOrder', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            acceptOrder:'=',
            priceType:'=',
            orderId:'=',
            orderType:'=',
            onComplete: '&'
        },
        templateUrl: 'tpl/common/directives/share/c-accept-order.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout,$scope,modalSvc,shareTypes,shareOrder,account,userInfo,$state){
            $scope.showControlNUmber = true;
            $scope.controlNumber = 1;
            $scope.addressType = 0;
            var modal = null;
            $scope.$watch("showSetAddress", function(newVal,oldVal){
                if($scope.showSetAddress == true){
                    return
                }else{
                    $scope.showOrderBox = true;
                }
            });

            $scope.changeAddress = function(type){
                $scope.addressType = type;
                console.log('type',$scope.addressType);
            }
            //获得用户信息
            if(account.hasLogin()){
                accountId = userInfo.getLastLoginInfo().accountId;
                console.log('accountId');
                console.log(accountId);
            }

            $scope.getControlNumber = function(number){
                $scope.controlNumber = number;
                console.log($scope.controlNumber);
                $scope.totalCost = $scope.acceptOrder.price * $scope.controlNumber;
            }

            $scope.$watch("acceptOrder", function(newVal,oldVal){
                if(newVal){//模态框每次显示时都进行初始化
                    $scope.totalCost = $scope.acceptOrder.price * $scope.acceptOrder.count;
                }
            });
            
            //服务地址
            $scope.setSkillAddress = function(type){
                $scope.addressType = type;
                $scope.showSetAddress = true;
                $scope.showOrderBox = false;
            }
            $scope.getMyAddress = function(myAddress){
                $scope.addressForme = myAddress;
                if($scope.addressType == 2){
                    $scope.addressType = 1;
                }
            }

            $scope.getSkillOrder = function(orderType){
                console.log(orderType);
                console.log($scope.addressType);
                var timeYear = $scope.acceptTime.getFullYear();
                var timeMonth = $scope.acceptTime.getMonth() + 1;
                var timeDay = $scope.acceptTime.getDate();
                time = timeYear + '-' + timeMonth + '-' + timeDay;
                if($scope.addressType == 1){
                    address = $scope.addressForme.city + '-' + $scope.addressForme.area + '-' + $scope.addressForme.detail;
                }else{
                    address = $scope.acceptOrder.address.city + '-' + $scope.acceptOrder.address.detail;
                }
                if($scope.orderType == 1){
                    count = $scope.controlNumber;
                }else{
                    count = $scope.acceptOrder.count;
                }
                params = {
                    type:orderType,
                    realmId:$scope.orderId,
                    subscribeDate: time,
                    count: count,
                    amount: $scope.acceptOrder.price,
                    mobile: $scope.mobile,
                    content: $scope.message,
                    accountId: accountId,
                    address: address,
                    addressType: $scope.addressType
                }
                console.log(params);
                $scope.shareTipText="订单提交中,请稍后";
                $scope.showShareTip = true;
                shareOrder.submitOrder(params).then(function(data){
                    $scope.shareTipText="订单已发出,等待对方确认!";
                    $scope.showShareTip = true;
                    $scope.onSuccessClose = function() {
                        modalSvc.removeModal(modal);
                        $state.go('home-nav',{index:1});
                    }
                },function(renson){
                    $scope.shareTipText="订单提交失败!";
                    $scope.showShareTip = true;
                })
            }
        }
    }
})