angular.module('app.address').controller('addressListCtrl', ['$stateParams', '$state', 'addresses',
    function ($stateParams, $state, addresses) {
        var vm = this;
        params = {
            type: 'openid',
            openid: sessionStorage.getItem("openid")
        }
        addresses.query(params).$promise.then(function (data) {
            console.log("获取业主信息成功");
            if (data != "") {
                vm.houses = data.items;
                //    if (house.active == 0) {
                //        vm.activeId = house.id;
                //    }
                    vm.deleteAddress = function (id) {
                        //console.log("click")
                        vm.sure_delete = true;
                        vm.sure = function () {
                            vm.sure_delete = false;
                            params = {
                                id: id
                            }
                            addresses.delete(params).$promise.then(function (data) {
                                //vm.houses.splice(a, 1);
                                console.log("删除成功")
                            }, function (data) {
                                console.log("删除失败")
                            })
                        }
                        vm.cancel = function () {
                            vm.sure_delete = false;
                        }
                    };
                    vm.change_flag = function (id) {
                        //if (house.active == 0) {
                        //    return;
                        //}
                        console.log("改变功能")
                        params = {
                            id: id,
                            openid: sessionStorage.getItem("openid")
                        }
                        addresses.save(params).$promise.then(function () {
                            vm.activeId = id;
                            console.log("设置默认地址成功");
                        }, function (data) {
                            console.log("设置默认地址失败");
                        })
                    }
            }

        },function(data){
            console.log("获取业主信息失败")
        })
    }
])