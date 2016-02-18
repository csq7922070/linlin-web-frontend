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

            $scope.changeCity = function(){
                $scope.showCityList = true;
                address.getCityList().then(function(data){
                    $scope.cityList = data;
                },function(reason){
                    $scope.showCityList = false;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectCityComplete = function(){
                console.log("onSelectCityComplete");
                console.log(addressInfo);
                refreshAddressInfo();
            }

            $scope.changeCommunity = function(){
                $scope.showCommunityList = true;
                address.getCommunityList(addressInfo.city).then(function(data){
                    $scope.communityList = data;
                },function(reason){
                    $scope.showCommunityList = false;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectCommunityComplete = function(){
                console.log("onSelectCommunityComplete");
                console.log(addressInfo);
                refreshAddressInfo();
            }

            $scope.changeBlock = function(){
                $scope.showBlockList = true;
                address.getBlockList(addressInfo.city, addressInfo.community).then(function(data){
                    $scope.blockList = data;
                },function(reason){
                    $scope.showBlockList = false;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectBlockComplete = function(){
                console.log("onSelectBlockComplete");
                console.log(addressInfo);
                refreshAddressInfo();
            }

            $scope.changeUnit = function() {
                if($scope.unit){
                    $scope.showUnitList = true;
                    address.getUnitList(addressInfo.city, addressInfo.community, addressInfo.block).then(function(data){
                        $scope.unitList = data;
                    },function(reason){
                        $scope.showUnitList = false;
                        alert(reason.errorCode+","+reason.errorMessage);
                    });
                }
            }

            $scope.onSelectUnitComplete = function(){
                console.log("onSelectUnitComplete");
                console.log(addressInfo);
                refreshAddressInfo();
            }

            $scope.changeRoom = function() {
                if($scope.room){
                    $scope.showRoomList = true;
                    address.getRoomList(addressInfo.city, addressInfo.community, addressInfo.block, addressInfo.unit).then(function(data){
                        $scope.roomList = data;
                    },function(reason){
                        $scope.showRoomList = false;
                        alert(reason.errorCode+","+reason.errorMessage);
                    });
                }
            }

            $scope.onSelectRoomComplete = function(){
                console.log("onSelectRoomComplete");
                console.log(addressInfo);
                refreshAddressInfo();
            }
            
            $scope.sss = 'ccc'; 

            if(!$scope.unit){
                $scope.sss = 'bgclick'
            }

            if(!$scope.room){
                $scope.ccc = 'bgclick'
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
                    console.log("后台添加地址成功");
                    close();
                }, function (data) {
                    console.log("后台添加地址失败");
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