skhControllers.controller('repairDetailCtrl', ['$scope', '$http', '$stateParams', '$timeout',
    function($scope, $http, $stateParams, $timeout) {
        $scope.suc_show = false;
        $scope.err_show = false;

        $http({
            method: "GET",
            url: basePath + "/repair/get.do",
            params: {
                'id': $stateParams.id
            }
        }).success(function(data) {
            $scope.repair = data;
            $scope.repair.confirm = function() {
                $http({
                    method: "POST",
                    url: basePath + "/repair/finish.do",
                    data: {
                        id: $scope.repair.id
                    }
                }).success(function(data) {
                    $scope.suc_show = true;
                    $timeout(function() {
                        $scope.suc_show = false;
                        $scope.success=true;
                    }, 3000)
                }).error(function(data) {
                    $scope.err_show = true;
                    $timeout(function() {
                        $scope.err_show = false;
                    }, 3000)
                })
            }
        });
    }
]);