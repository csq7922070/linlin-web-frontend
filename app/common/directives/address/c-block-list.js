myApp.directive('cBlockList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onComplete: '&',
            blockList: '='
        },
        templateUrl: 'tpl/common/directives/address/c-block-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($stateParams,$scope,addresses,addressInfo,address) {
            $scope.changeBlock = function(block){
                addressInfo.block = block.block;
                if(block.type == 2){
                    $scope.showUnitList = true;
                    address.getUnitList(addressInfo.city, addressInfo.community, block.block).then(function(data){
                        $scope.unitList = data;
                    },function(reason){
                        $scope.showUnitList = false;
                        alert(reason.errorCode+","+reason.errorMessage);
                    });
                }else if(block.type == 1){
                    addressInfo.unit = "";
                    $scope.showRoomList = true;
                    address.getRoomList(addressInfo.city, addressInfo.community, block.block, addressInfo.unit).then(function(data){
                        $scope.roomList = data;
                    },function(reason){
                        $scope.showRoomList = false;
                        alert(reason.errorCode+","+reason.errorMessage);
                    });
                }else if(block.type == 0){
                    addressInfo.unit = "";
                    addressInfo.room = null;
                    $scope.onComplete();
                }
            }

            $scope.onSelectUnitComplete = function(){
                $scope.onComplete();
            }

            $scope.onSelectRoomComplete = function(){
                $scope.onComplete();
            }
        }
    }
});