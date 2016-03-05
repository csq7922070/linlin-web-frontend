angular.module('app.pay').controller('payListCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$filter', 
    'addressInfo','$q','userInfo','errorLog','billPay',
    function ($scope, $http, $stateParams, $rootScope, $state, $filter,addressInfo,$q,userInfo,errorLog,billPay) {
        billPay.getPayList().then(function(data){
            $scope.payList = data;
        },function(reason){
            alert(errorLog.getErrorMessage(reason));
        });
    }
]);