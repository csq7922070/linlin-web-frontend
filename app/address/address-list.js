angular.module('app.address').controller('addressListCtrl', ['$rootScope','$stateParams', '$state', 'addresses','data',
    function ($rootScope,$stateParams, $state, addresses,data) {
        var vm = this;
        vm.houses = data.items;
        vm.activeId = data.activeId;

        vm.deleteAddress = function (house) {
            vm.sure_delete = true;
            vm.sure = function () {
                vm.sure_delete = false;
                params = {
                    id: house.id,
                    openid:sessionStorage.getItem("openid")
                }
                addresses.delete(params).$promise.then(function (data) {
                    house.rowState=1;
                }, function (data) {
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