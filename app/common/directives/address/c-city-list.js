myApp.directive('cCityList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: 'tpl/common/directives/address/c-city-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($stateParams,$scope) {
            var vm=this;
            var params = {
                type:'city'
            }
            addresses.query(params).$promise.then(function (data) {
                vm.cities = data.items;
            }, function (data) {
                // console.log("err!");
                alert(errorLog.getErrorMessage(data));
            });
            vm.changeCity = function(city){
                addressInfo.city = city;
                $state.go("address-village");
            }
        }
    }
});