skhControllers.controller('complainAddCtrl', ['$scope', '$http', '$timeout', '$state',
    function($scope, $http, $timeout, $state) {
        $scope.suc_show = false;
        $scope.err_show = false;
        $scope.submitForm = function() {
            $http({
                method: "POST",
                url: basePath + "/complain/add.do",
                data: {
                    title: $scope.title,
                    mobile: $scope.mobile,
                    content: $scope.content,
                    openid: sessionStorage.getItem("openid")
                }
            }).success(function(data) {
                $scope.suc_show = true;
                $timeout(function() {
                    $scope.suc_show = false;
                    $state.go("complain");
                }, 3000)
            }).error(function(data) {
                $scope.err_show = true;
                $timeout(function() {
                    $scope.err_show = false;
                }, 3000)
            })
        }

    }
]);