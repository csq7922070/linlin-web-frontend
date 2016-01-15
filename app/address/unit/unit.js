skhControllers.controller('addressUnitCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
        function($scope, $http, $stateParams, $rootScope, $state) {
            $http({
                method: "GET",
                url: basePath + "/archives/getUnit.do",
                params: {
                    block: $stateParams.block
                }
            }).success(function(data) {
                $scope.units = data.items;
                $scope.block = $stateParams.block;
            });
        }
    ]);