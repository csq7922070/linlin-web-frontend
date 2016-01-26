angular.module('app.address').controller('addressListCtrl', ['$rootScope','$stateParams', '$state', 'addresses',
    function ($rootScope,$stateParams, $state, addresses) {
        var vm = this;
        params = {
            type: 'openid',
            openid: sessionStorage.getItem("openid")
        }
        addresses.query(params).$promise.then(function (data) {
            if (data.items.length!=0) {
                vm.houses = data.items;
                vm.activeId= data.activeId;
            }else if($rootScope.previousState == "home.shop-info"){
                $state.go("address-edit");
            }
        },function(data){
        })

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