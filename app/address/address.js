skhControllers.controller('addressCtrl', ['$scope', '$http', '$stateParams', '$rootScope',
        function($scope, $http, $stateParams, $rootScope) {
            //添加地址
            $scope.add_newaddress = function() {

                //1.8向后台添加地址
                $http({
                    method: "POST",
                    url: basePath + "/archives/addHouse",
                    data: {
                        court: "阿尔卡迪亚",
                        block: $stateParams.block,
                        unit: $stateParams.unit,
                        roomNo: $stateParams.room,
                        openid: sessionStorage.getItem("openid"),
                        id: $stateParams.id,
                        initial: $stateParams.initial
                    }
                }).success(function(data) {
                    console.log("后台添加地址成功");
                }).error(function(data) {
                    console.log("后台添加地址成功");
                })
            }
            console.log("block" + $stateParams.block + " unit" + $stateParams.unit + " room" + $stateParams.room);
            console.log("succees");
            $scope.block = $stateParams.block;
            $scope.unit = $stateParams.unit;
            $scope.room = $stateParams.room;
            //添加业主姓名与id
            $scope.username = $stateParams.username;
            $scope.id = $stateParams.id;
            console.log("username:" + $scope.username + " id:" + $scope.id)
            console.log($stateParams.initial);
        }
    ]);