skhControllers.controller('accountRecordCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
        function($scope, $http, $stateParams, $rootScope, $state) {
            //console.log("成功加载record.html")
            //$scope.id=$stateParams.
            //console.log($stateParams.id);
            //$http({
            //    method: "GET",
            //    url: basePath + "/payment/getAmount.do",
            //    params: {
            //        paymentState: 1,
            //        id: $stateParams.id
            //    }
            //}).success(function (data) {
            //    $scope.records=data;
            //});
            //这里是写好的数据
            $scope.records = {
                    "amountList": [{
                        "id": 4,
                        "year": "2015",
                        "month": 12,
                        "amount": 35.99,
                        "paymentType": "1",
                        "number": "3456°-1246°",
                        "count": "-2210°"
                    }, {
                        "id": 5,
                        "year": "2015",
                        "month": 11,
                        "amount": 4.11,
                        "paymentType": "0",
                        "number": "0m³-3456m³",
                        "count": "3456m³"
                    }],
                    "amountSum": "444.00"
                }
                //console.log($scope.records);console.log($scope.records.amountList[0].amount)
        }
    ]);