skhControllers.controller('complainDetailCtrl', ['$scope', '$http', '$stateParams',
        function($scope, $http, $stateParams) {
            $http({
                method: "GET",
                url: basePath + "/complain/get.do",
                params: {
                    id: $stateParams.id
                }
            }).success(function(data) {
                $scope.complain = data;
            });
        }
    ]);