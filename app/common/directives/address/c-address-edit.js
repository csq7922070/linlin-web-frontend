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
        controller: function ($state, $scope, $stateParams, addresses,communityInfo,addressInfo,address,errorLog) {
            if(!addressInfo.city){
                addressInfo.city = communityInfo.city;
                addressInfo.community = communityInfo.name;
            }
            function refreshAddressInfo(){
                $scope.city = addressInfo.city;
                $scope.village = addressInfo.community;
                $scope.block = addressInfo.block;
                $scope.unit = addressInfo.unit;
                $scope.room = addressInfo.roomInfo ? addressInfo.roomInfo.room : "";
                $scope.owner = addressInfo.roomInfo ? addressInfo.roomInfo.ownerName:"";
                $scope.roomId = addressInfo.roomInfo ? addressInfo.roomInfo.id:"";
            }
            refreshAddressInfo();

            function changebgstate() {
                $scope.ccc = 'ccc';
                $scope.sss = 'ccc'; 

                if(!$scope.unit){
                    $scope.sss = 'bgclick'
                }

                if(!$scope.room){
                    $scope.ccc = 'bgclick'
                }
            }
            changebgstate();

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
                changebgstate();
            }

            $scope.changeCommunity = function(){
                $scope.showContent = false;
                $scope.showCommunityList = true;
                address.getCommunityList(addressInfo.city).then(function(data){
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
                $scope.showContent = false;
                $scope.showBlockList = true;
                address.getBlockList(addressInfo.city, addressInfo.community).then(function(data){
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
                console.log("触发");
                var params = {
                    city: addressInfo.city,
                    community: addressInfo.community,
                    block: addressInfo.block,
                    unit: addressInfo.unit,
                    room: addressInfo.roomInfo.room,
                    houseId: addressInfo.roomInfo.id,
                    initial: addressInfo.roomInfo.initial,
                    openid: sessionStorage.getItem("openid")
                }
                addresses.save(params).$promise.then(function (data) {
                    address.addAddress(addressInfo);
                    close();
                }, function (reason) {
                    reason = {
                        errorCode: "ADD_ADDRESS_ERROR",
                        errorMessage: errorLog.getErrorMessage(reason)
                    };
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