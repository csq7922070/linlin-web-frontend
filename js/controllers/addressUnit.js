skhControllers.controller('addressUnitCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
        function($scope, $http, $stateParams, $rootScope, $state) {
            $http({
                method: "GET",
                url: basePath + "/archives/getUnit.do",
                params: {
                    floor: $stateParams.floor
                }
            }).success(function(data) {
                $scope.units = data.items;
                $scope.floor = $stateParams.floor;
            });
        }
    ]);