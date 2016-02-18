angular.module('app.payment').controller('paymentListCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$filter', 
    'addressInfo',
    function ($scope, $http, $stateParams, $rootScope, $state, $filter,addressInfo) {
        $scope.id = addressInfo.roomInfo.id;
        $http({
            method: "GET",
            url: basePath + "/payments/query",
            params: {
                queryType: 'openid',
                openid: sessionStorage.getItem("openid"),
                paymentState: 1,
                houseId: addressInfo.roomInfo.id
            }
        }).success(function (data) {
            if(data.items.length!=0){
                $scope.records = $filter("payListMerge")(data.items);
            }
        });
    }
]);