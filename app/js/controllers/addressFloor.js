skhControllers.controller('addressFloorCtrl', ['$scope', '$http', '$stateParams', '$rootScope',
        function($scope, $http, $stateParams, $rootScope) {
            $http({
                method: "GET",
                url: basePath + "/archives/getFloor.do"
            }).success(function(data) {
                $scope.datas = data;
            });
        }
    ]);