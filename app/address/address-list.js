skhControllers.controller('addressListCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state',
        function($scope, $http, $stateParams, $rootScope, $state) {
            //获取业主地址信息
            $http({
                method: "GET",
                url: basePath + "/archives/findHouseByOpenid",
                params: {
                    openid: sessionStorage.getItem("openid")
                }
            }).success(function(data) {
                if (data != "") {
                    $scope.houses = data.items;
                    data.items.forEach(function(house) {
                        if (house.active == 0) {
                            $scope.activeId = house.id;
                        }

                        house.deleteAddress = function(a) {
                            //console.log("click")
                            $scope.sure_delete = true;
                            $scope.sure = function() {
                                $scope.sure_delete = false;
                                $http({
                                    method: "POST",
                                    url: basePath + "/archives/delHouse",
                                    data: {
                                        id: house.id
                                    }
                                }).success(function(data) {
                                    $scope.houses.splice(a, 1);
                                    console.log("删除成功")
                                }).error(function(data) {
                                    console.log("删除失败")
                                });
                            }
                            $scope.cancel = function() {
                                $scope.sure_delete = false;
                            }
                        };
                        house.change_flag = function() {
                            if (house.active == 0) {
                                return;
                            }
                            $http({
                                method: "POST",
                                url: basePath + "/archives/updateHouseActive",
                                data: {
                                    id: house.id,
                                    openid: sessionStorage.getItem("openid")
                                }
                            }).success(function(data) {
                                $scope.activeId = house.id;
                                console.log("设置默认地址成功");
                            }).error(function(data) {
                                console.log("设置默认地址失败");
                            });
                        }
                    })
                }

            }).error(function(data) {});
        }
    ]);