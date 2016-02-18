myApp.directive('cRoomList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: 'tpl/common/directives/address/c-room-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($stateParams,$scope) {
            var vm = this;
        
            var params={
                type:'room',
                city:addressInfo.city,
                community:addressInfo.community,
                block:addressInfo.block,
                unit:addressInfo.unit?addressInfo.unit:""
            }
            addresses.query(params).$promise.then(function(data){
                vm.rooms = data.items;
            })
            vm.changeRoom = function(room){
                addressInfo.roomInfo = room;
                $state.go("address-edit");
            }
        }
    }
});