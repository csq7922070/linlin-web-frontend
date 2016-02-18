myApp.directive('cCommunityList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: 'tpl/common/directives/address/c-community-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($stateParams,$scope) {
            var vm=this;
            var params = {
                type:'community',
                city:addressInfo.city
            }
            addresses.query(params).$promise.then(function (data) {
                vm.villages = data.items;
            }, function (data) {
                // console.log("err!");
                alert(errorLog.getErrorMessage(data));
            });
            vm.changeVillage = function(village){
                addressInfo.community = village;
                $state.go("address-block");
            }
        }
    }
});