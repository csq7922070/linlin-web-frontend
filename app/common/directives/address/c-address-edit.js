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
            addressInfo.init();
            // end init
            var cmmInfo = communityLocation.getLastCommunity();
            //alert(errorLog.getFullErrorMessage(cmmInfo));
            if(!addressInfo.city&& cmmInfo.auth){//将已授权的自动定位的小区城市和小区名赋值给addressInfo
                addressInfo.city = cmmInfo.city;
                addressInfo.communityId = cmmInfo.id;
                addressInfo.community = cmmInfo.name;
            }
            
            function refreshAddressInfo(){
                $scope.city = addressInfo.city;
                $scope.community = addressInfo.community;
                $scope.blockType = addressInfo.blockType;
                $scope.block = addressInfo.block;
                $scope.unit = addressInfo.unit;
                $scope.room = addressInfo.room;
                $scope.ownerName = addressInfo.ownerName;
            }
            refreshAddressInfo();

            $scope.changeCity = function(){
                $scope.showLoading = true;
                $scope.showContent = false;
                $scope.showCityList = true;
                address.getCityList().then(function(data){
                    $scope.showLoading = false;
                    $scope.cityList = data;
                },function(reason){
                    $scope.showLoading = false;
                    $scope.showCityList = false;
                    $scope.showContent = true;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectCityComplete = function(){
                // console.log("onSelectCityComplete");
                // console.log(addressInfo);
                $scope.showContent = true;
                refreshAddressInfo();
            }

            $scope.changeCommunity = function(){
                if(!$scope.city){
                    return;
                }
                $scope.showLoading = true;
                $scope.showContent = false;
                $scope.showCommunityList = true;
                address.getCommunityList(addressInfo.city).then(function(data){
                    $scope.showLoading = fasle;
                    $scope.communityList = data;
                },function(reason){
                    $scope.showLoading = false;
                    $scope.showCommunityList = false;
                    $scope.showContent = true;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectCommunityComplete = function(){
                // console.log("onSelectCommunityComplete");
                // console.log(addressInfo);
                $scope.showContent = true;
                refreshAddressInfo();
            }

            $scope.changeBlock = function(){
                if(!$scope.community){
                    return;
                }
                $scope.showLoading = true;
                $scope.showContent = false;
                $scope.showBlockList = true;
                address.getBlockList(addressInfo.city, addressInfo.communityId).then(function(data){
                    $scope.showLoading = false;
                    $scope.blockList = data;
                },function(reason){
                    $scope.showLoading = false;
                    $scope.showBlockList = false;
                    $scope.showContent = true;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectBlockComplete = function(){
                // console.log("onSelectBlockComplete");
                // console.log(addressInfo);
                $scope.showContent = true;
                refreshAddressInfo();
            }

            $scope.changeUnit = function() {
                if(!$scope.block||$scope.blockType!=2){
                    return;
                }
                $scope.showLoading = true;
                $scope.showContent = false;
                $scope.showUnitList = true;
                address.getUnitList(addressInfo.city, addressInfo.communityId, addressInfo.block).then(function(data){
                    $scope.showLoading = false;
                    $scope.unitList = data;
                },function(reason){
                    $scope.showLoading = false;
                    $scope.showUnitList = false;
                    $scope.showContent = true;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectUnitComplete = function(){
                // console.log("onSelectUnitComplete");
                // console.log(addressInfo);
                $scope.showContent = true;
                refreshAddressInfo();
            }

            $scope.changeRoom = function() {
                if(!$scope.block||$scope.blockType==0||($scope.blockType==2&&!$scope.unit)){
                    return;
                }
                $scope.showLoading = true;
                $scope.showContent = false;
                $scope.showRoomList = true;
                address.getRoomList(addressInfo.city, addressInfo.communityId, addressInfo.block, addressInfo.unit).then(function(data){
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
                // console.log("onSelectRoomComplete");
                // console.log(addressInfo);
                $scope.showContent = true;
                refreshAddressInfo();
            }
            

            $scope.addAddress = function () {
                var newAddress = addressInfo.getSelectedAddress();
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