angular.module('app.address').controller('addressListCtrl', ['$stateParams', '$state','auth','$scope',
	'errorLog','address','control',
    function ($stateParams, $state,auth,$scope,errorLog,address,control) {
        $scope.showAddressList = true;
        $scope.showLoading = true;
        address.getAddressList().then(function(data){
            $scope.showLoading = false;
            $scope.addressList = data;
        },function(reason){
            $scope.showLoading = false;
            alert(errorLog.getErrorMessage(reason));
        });
    }
])