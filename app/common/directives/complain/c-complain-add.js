myApp.directive('cComplainAdd', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onScrolled: '&',
            complainAdd: '=',
            onComplete: '&'
        },
        templateUrl: 'tpl/common/directives/complain/c-complain-add.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($timeout, $state, address, addressInfo, $scope, userInfo, complain) {
            var vm = this;
            $scope.anonymous = 0;
            var loginInfo = userInfo.getLastLoginInfo();
            var mobile = $scope.defaultMobile = loginInfo.tel;

            $scope.complainSubmit = function () {
                $scope.defaultMobile = mobile;
                var params = {
                    anonymous : $scope.anonymous,
                    communityId : $scope.address.communityId,
                    accountId : userInfo.getAccountId(),
                    mobile : $scope.defaultMobile,
                    title : $scope.title,
                    content : $scope.content
                }
                // console.log(params);
                complain.saveComplainAdd(params).then(function(data){
                    $scope.showSuccess = true;
                    $scope.title = null;
                    $scope.content = null;
                     $scope.anonymous = 0;
                    $scope.onSuccessClose = function() {
                        // $state.go('complain');
                        $scope.show = false;
                        $scope.onComplete();
                    }
                },function(){    
                    $scope.showError = true;
                });
            }

            $scope.anonymousChecked = function() {

                if($scope.anonymous == 0){
                    $scope.anonymous = 1;
                    mobile = $scope.defaultMobile;
                    $scope.defaultMobile = $scope.defaultMobile.substring(0,3) + '****' +  $scope.defaultMobile.substring(7,11);
                }else{
                    $scope.anonymous = 0;
                    $scope.defaultMobile = mobile;
                }
            }
            
            address.getDefaultAddress().then(function(data){
                $scope.address = data;
            },function(reason){
                alert(reason.errorCode+","+reason.errorMessage);
            });
            $scope.changeAddress = function(){
                // $scope.show = false;
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
    }
});