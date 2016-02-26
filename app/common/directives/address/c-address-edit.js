myApp.directive('cAddressEdit', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onComplete: '&'
        },
        templateUrl: 'tpl/common/directives/address/c-address-edit.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($state, $scope, $stateParams, addresses,communityLocation,addressInfo,address,errorLog,
            userInfo,$q) {
            // init addressInfo
            addressInfo.id = null;
            addressInfo.city = null
            addressInfo.communityId = null;
            addressInfo.community = null;
            addressInfo.block = null;
            addressInfo.unit = null;
            addressInfo.room = null;
            addressInfo.ownerName = null;
            addressInfo.initial = null;
            // end init
            var cmmInfo = communityLocation.getLastCommunity();
            if(!addressInfo.city && cmmInfo.auth){//将已授权的自动定位的小区城市和小区名赋值给addressInfo
                addressInfo.city = cmmInfo.city;
                addressInfo.communityId = cmmInfo.id;
                addressInfo.community = cmmInfo.name;
            }
            
            function refreshAddressInfo(){
                $scope.city = addressInfo.city;
                $scope.community = addressInfo.community;
                $scope.block = addressInfo.block;
                $scope.unit = addressInfo.unit;
                $scope.room = addressInfo.room;
                $scope.ownerName = addressInfo.ownerName;
            }
            refreshAddressInfo();

            $scope.changeCity = function(){
                $scope.showContent = false;
                $scope.showCityList = true;
                address.getCityList().then(function(data){
                    $scope.cityList = data;
                },function(reason){
                    $scope.showCityList = false;
                    $scope.showContent = true;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectCityComplete = function(){
                console.log("onSelectCityComplete");
                console.log(addressInfo);
                $scope.showContent = true;
                refreshAddressInfo();
            }

            $scope.changeCommunity = function(){
                if(!city){
                    return;
                }
                $scope.showContent = false;
                $scope.showCommunityList = true;
                address.getCommunityList(addressInfo.city).then(function(data){
                    console.log(data);
                    $scope.communityList = data;
                },function(reason){
                    $scope.showCommunityList = false;
                    $scope.showContent = true;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectCommunityComplete = function(){
                console.log("onSelectCommunityComplete");
                console.log(addressInfo);
                $scope.showContent = true;
                refreshAddressInfo();
                changebgstate();
            }

            $scope.changeBlock = function(){
                if(!community){
                    return;
                }
                $scope.showContent = false;
                $scope.showBlockList = true;
                address.getBlockList(addressInfo.city, addressInfo.communityId).then(function(data){
                    $scope.blockList = data;
                },function(reason){
                    $scope.showBlockList = false;
                    $scope.showContent = true;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectBlockComplete = function(){
                console.log("onSelectBlockComplete");
                console.log(addressInfo);
                $scope.showContent = true;
                refreshAddressInfo();
                changebgstate();
            }

            $scope.changeUnit = function() {
                if(!block||blockType!=2){
                    return;
                }
                if($scope.unit){
                    $scope.showContent = false;
                    $scope.showUnitList = true;
                    address.getUnitList(addressInfo.city, addressInfo.community, addressInfo.block).then(function(data){
                        $scope.unitList = data;
                    },function(reason){
                        $scope.showUnitList = false;
                        $scope.showContent = true;
                        alert(reason.errorCode+","+reason.errorMessage);
                    });
                }
            }

            $scope.onSelectUnitComplete = function(){
                console.log("onSelectUnitComplete");
                console.log(addressInfo);
                $scope.showContent = true;
                refreshAddressInfo();
                changebgstate();
            }

            $scope.changeRoom = function() {
                if(!block||blockType==0||(blockType==2&&!unit)){
                    return;
                }
                if($scope.room){
                    $scope.showContent = false;
                    $scope.showRoomList = true;
                    address.getRoomList(addressInfo.city, addressInfo.community, addressInfo.block, addressInfo.unit).then(function(data){
                        $scope.roomList = data;
                    },function(reason){
                        $scope.showRoomList = false;
                        $scope.showContent = true;
                        alert(reason.errorCode+","+reason.errorMessage);
                    });
                }
            }

            $scope.onSelectRoomComplete = function(){
                console.log("onSelectRoomComplete");
                console.log(addressInfo);
                $scope.showContent = true;
                refreshAddressInfo();
                changebgstate();
            }
            

            $scope.addAddress = function () {
                var newAddress = angular.copy(addressInfo);
                address.addAddress(newAddress).then(function(data){
                    close();
                },function(reason){
                    alert(errorLog.getErrorMessage(reason));
                    close();
                });
            }

            function close(){
                $scope.show = false;
                $scope.onComplete();
            }
        }
    }
});