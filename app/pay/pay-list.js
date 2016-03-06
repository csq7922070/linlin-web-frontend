angular.module('app.pay').controller('payListCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$filter', 
    'addressInfo','$q','userInfo','errorLog','billPay',
    function ($scope, $http, $stateParams, $rootScope, $state, $filter,addressInfo,$q,userInfo,errorLog,billPay) {
    	$scope.showLoading = true;
        billPay.getPayList().then(function(data){
        	$scope.showLoading = false;
            $scope.payList = data;
        },function(reason){
        	$scope.showLoading = false;
            alert(errorLog.getErrorMessage(reason));
        });
    }
]);