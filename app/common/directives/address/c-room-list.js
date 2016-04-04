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
        controller: function ($stateParams,$scope,addresses,addressInfo,modalSvc) {  
            var modal = null;
            $scope.$watch("show", function(newVal,oldVal){
                if(newVal){
                    if(!modal){
                        modal = {scope:$scope};
                    }
                    modalSvc.addModal(modal);
                }
            });

            $scope.changeRoom = function(room){
                addressInfo.id = room.id;
                addressInfo.ownerName = room.ownerName;
                addressInfo.initial = room.initial;
                addressInfo.room = room.room;
                $scope.show = false;
                modalSvc.removeModal(modal);
                $scope.onComplete();
            }
        }
    }
});