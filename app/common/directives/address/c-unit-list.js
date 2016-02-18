myApp.directive('cUnitList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: 'tpl/common/directives/address/c-unit-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($stateParams,$scope) {
            var vm=this;
            var params = {
                type:'unit',
                city:addressInfo.city,
                community:addressInfo.community,
                block:addressInfo.block
            }
            addresses.query(params).$promise.then(function (data) {
                vm.units = data.items;
            }, function (data) {
                console.log("err!");
            });
            vm.changeUnit = function(unit){
                addressInfo.unit = unit;
                $state.go("address-room");
            }
        }
    }
});