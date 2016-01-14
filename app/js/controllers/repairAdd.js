skhControllers.controller('repairAddCtrl', ['$scope', '$http', '$timeout', '$state',
        function($scope, $http, $timeout, $state) {
            $scope.mask_close=function(){
                $scope.suc_show = false;
            }
            $scope.mask_err_close=function(){
                $scope.err_show = false;
            }
            $scope.submitForm = function() {
                $http({
                    method: "POST",
                    url: basePath + "/repair/add.do",
                    data: {
                        'device': $scope.device,
                        'remark': $scope.remark,
                        'mobile': $scope.mobile,
                        'unit': $scope.unit,
                        'roomNo': $scope.roomNo,
                        'floor': $scope.floor,
                        'openid': sessionStorage.getItem("openid")
                    }
                }).success(function(data) {
                    $scope.suc_show = true;
                    $timeout(function() {
                        $scope.suc_show = false;
                        $state.go("repair");
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