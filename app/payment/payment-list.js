angular.module('app.payment').controller('paymentListCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$filter', 
    function ($scope, $http, $stateParams, $rootScope, $state, $filter) {
        $scope.id = $stateParams.id;
        $http({
            method: "GET",
            url: basePath + "/payments/query",
            params: {
                queryType: 'openid',
                openid: sessionStorage.getItem("openid"),
                paymentState: 1,
                houseId: $stateParams.id
            }
        }).success(function (data) {
            if(data.items.length!=0){
                $scope.records = $filter("payListMerge")(data.items);
            }
        });
    }
]);