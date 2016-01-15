skhControllers.controller("noticeDetailCtrl", ['$scope', '$http', '$stateParams',
        function($scope, $http, $stateParams) {
            $http({
                method: "GET",
                url: basePath + "/notice/get.do",
                params: {
                    id: $stateParams.id
                }
            }).success(function(data) {
                $scope.notice = data;
            })
        }
    ]);