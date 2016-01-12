skhControllers.controller('addressRoomCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
        function($scope, $http, $stateParams, $rootScope, $state) {
            $http({
                method: "GET",
                url: basePath + "/archives/getRoom.do",
                params: {
                    floor: $stateParams.floor,
                    unit: $stateParams.unit
                }
            }).success(function(data) {
                $scope.floor = $stateParams.floor;
                $scope.unit = $stateParams.unit;
                $scope.rooms = data.items;
            });
        }
    ]);