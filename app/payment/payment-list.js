skhControllers.controller('paymentListCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
    function ($scope, $http, $stateParams, $rootScope, $state) {
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
            $scope.records = data.items;
        });
    }
]);