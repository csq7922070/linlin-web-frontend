skhControllers.controller('repairAddCtrl', ['$scope', '$http', '$timeout', '$state', 'repairs', 'curd',
    function($scope, $http, $timeout, $state, repairs, curd) {
        $scope.mask_close = function() {
            $scope.suc_show = false;
        }
        $scope.mask_err_close = function() {
            $scope.err_show = false;
        }
        $scope.submitForm = function() {
            params = $scope.repair;
            curd.save(repairs, params).$promise.then(successcb, errcb);
        }

        function successcb() {
            $scope.suc_show = true;
            $timeout(function() {
                $scope.suc_show = false;
                $state.go("repair");
            }, 3000);
        }

        function errcb() {
            $scope.err_show = true;
            $timeout(function() {
                $scope.err_show = false;
            }, 3000);
        }
    }
]);
