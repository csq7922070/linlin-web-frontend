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
                console.log("changeBlock...");
                addressInfo.blockType = block.type;
                addressInfo.block = block.block;
                $scope.showContent = false;
                if(block.type == 2){
                    $scope.showUnitList = true;
                    address.getUnitList(addressInfo.city, addressInfo.community, block.block).then(function(data){
                        $scope.unitList = data;
                    },function(reason){
                        $scope.showUnitList = false;
                        $scope.showContent = true;
                        alert(reason.errorCode+","+reason.errorMessage);
                    });
                }else if(block.type == 1){
                    addressInfo.unit = "";
                    $scope.showRoomList = true;
                    address.getRoomList(addressInfo.city, addressInfo.community, block.block, addressInfo.unit).then(function(data){
                        $scope.roomList = data;
                    },function(reason){
                        $scope.showRoomList = false;
                        $scope.showContent = true;
                        alert(reason.errorCode+","+reason.errorMessage);
                    });
                }else if(block.type == 0){
                    addressInfo.id = block.id;
                    addressInfo.ownerName = block.ownerName;
                    addressInfo.initial = block.initial;
                    addressInfo.unit = "";
                    addressInfo.room = "";
                    close();
                }
            }

            $scope.onSelectUnitComplete = function(){
                console.log("onSelectUnitComplete");
                close();
            }

            $scope.onSelectRoomComplete = function(){
                console.log("onSelectRoomComplete");
                close();
            }

            function close(){
                $scope.showContent = true;
                $scope.show = false;
                $scope.onComplete();
            }
        }
    }
});