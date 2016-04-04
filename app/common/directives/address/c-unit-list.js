myApp.directive('cUnitList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onComplete: '&',
            unitList: '='
        },
        templateUrl: 'tpl/common/directives/address/c-unit-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($stateParams,$scope,addresses,addressInfo,address,modalSvc) {
            var modal = null;
            $scope.$watch("show", function(newVal,oldVal){
                if(newVal){
                    if(!modal){
                        modal = {scope:$scope};
                    }
                    modalSvc.addModal(modal);
                }
            });

            $scope.changeUnit = function(unit){
                $scope.showLoading = true;
                addressInfo.unit = unit;
                $scope.showContent = false;
                $scope.showRoomList = true;
                address.getRoomList(addressInfo.city, addressInfo.communityId, addressInfo.block, unit).then(function(data){
                    $scope.showLoading = false;
                    $scope.roomList = data;
                },function(reason){
                    $scope.showLoading = false;
                    $scope.showRoomList = false;
                    $scope.showContent = true;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.$watch("showRoomList", function(newVal,oldVal){
                if(!newVal){
                    $scope.showContent = true;
                }
            });

            $scope.onSelectRoomComplete = function(){
                $scope.showContent = true;
                $scope.show = false;
                modalSvc.removeModal(modal);
                $scope.onComplete();
            }
        }
    }
});