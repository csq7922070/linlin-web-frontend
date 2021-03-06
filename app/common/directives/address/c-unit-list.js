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
        controller: function ($stateParams,$scope,addresses,addressInfo,address) {
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

            $scope.onSelectRoomComplete = function(){
                $scope.showContent = true;
                $scope.show = false;
                $scope.onComplete();
            }
        }
    }
});