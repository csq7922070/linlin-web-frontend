skhControllers.controller('addressRoomCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
        function($scope, $http, $stateParams, $rootScope, $state) {
            $http({
                method: "GET",
                url: basePath + "/archives/getRoom.do",
                params: {
                    block: $stateParams.block,
                    unit: $stateParams.unit
                }
            }).success(function(data) {
                $scope.block = $stateParams.block;
                $scope.unit = $stateParams.unit;
                $scope.rooms = data.items;
            });
        }
    ]);