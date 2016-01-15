skhControllers.controller('addressBlockCtrl', ['$scope', '$http', '$stateParams', '$rootScope',
        function($scope, $http, $stateParams, $rootScope) {
            $http({
                method: "GET",
                url: basePath + "/archives/getBlock.do"
            }).success(function(data) {
                $scope.datas = data;
            });
        }
    ]);