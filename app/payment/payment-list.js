angular.module('app.payment').controller('paymentListCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$filter', 
    'addressInfo','$q','userInfo','errorLog',
    function ($scope, $http, $stateParams, $rootScope, $state, $filter,addressInfo,$q,userInfo,errorLog) {
        userInfo.getOpenId().then(function(data){
            return $http({
                        method: "GET",
                        url: basePath + "/payments/query",
                        params: {
                            queryType: 'openid',
                            openid: data,
                            paymentState: 1,
                            houseId: addressInfo.id
                        }
                    });
        },function(reason){
            return $q.reject(reason);
        }).then(function(data){
            if(data.items.length>0){
                $scope.records = $filter("payListMerge")(data.items);
            }
        },function(reason){
            var reason = {
                errorCode:"GET_PAY_LIST_ERROR",
                errorMessage:errorLog.getErrorMessage(reason)
            };
            alert(errorLog.getErrorMessage(reason));
        });
    }
]);