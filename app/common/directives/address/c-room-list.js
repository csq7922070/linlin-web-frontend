myApp.directive('cRoomList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onComplete: '&',
            roomList: '='
        },
        templateUrl: 'tpl/common/directives/address/c-room-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($stateParams,$scope,addresses,addressInfo) {   
            $scope.changeRoom = function(room){
                addressInfo.roomInfo = room;
                $scope.show = false;
                $scope.onComplete();
            }
        }
    }
});