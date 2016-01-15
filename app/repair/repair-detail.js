skhControllers.controller('repairDetailCtrl', ['$scope', '$http', '$state', '$stateParams', '$timeout', 'repairs', 'curd',
    function($scope, $http, $state, $stateParams, $timeout, repairs, curd) {
        $scope.suc_show = false;
        $scope.err_show = false;

        params = {
            'id': $stateParams.id
        };

        curd.get(repairs, params).$promise.then(function(data) {
            $scope.repair = data;
        })

        $scope.confirm = function(id) {
            params = {
                id: id,
                state: 3
            };

            curd.save(repairs, params).$promise.then(function(data) {
                $scope.repair = data;
                successcb();
            }, errcb)
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
