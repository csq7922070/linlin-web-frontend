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
                   vm.houses.forEach(function(h){
                       if(h.active==0){
                           vm.activeId= h.id;
                       }
                   })
            }
        },function(data){
            console.log("获取业主信息失败")
        })

        vm.deleteAddress = function (house) {
            vm.sure_delete = true;
            vm.sure = function () {
                vm.sure_delete = false;
                params = {
                    id: house.id
                }
                addresses.delete(params).$promise.then(function (data) {
                    console.log("删除成功")
                    house.rowState=1;
                }, function (data) {
                    console.log("删除失败")
                })
            }
        };

        vm.cancel = function () {
            vm.sure_delete = false;
        }

        vm.change_flag = function (house) {
            if (house.active == 0) {
                return;
            }
            params = {
                id: house.id,
                openid: sessionStorage.getItem("openid")
            }
            addresses.save(params).$promise.then(function () {
                vm.activeId = house.id;
            }, function (data) {
            })
        }
    }
])