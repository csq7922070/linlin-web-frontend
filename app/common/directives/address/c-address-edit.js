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
            var city = communityLocation.getLastCity();
            //alert(errorLog.getFullErrorMessage(cmmInfo));
            if(!addressInfo.city){//将自动定位的城市赋值给addressInfo
                addressInfo.city = city;
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

            $scope.tags = [{
                name:'我家'
            },{
                name:'公司',
            },{
                name:'父母',
            },{
                name: '朋友',
            },{
                name:'房东',
            },{
                name:'其它'
            }];
            $scope.tag = $scope.tags[0];

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
                    $scope.showLoading = false;
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
            
            //添加地址，添加地址前会进行地址标签和地址的重复检测提示
            $scope.addAddress = function () {
                if($scope.tag&&$scope.tag.name!='其它'){
                    addressInfo.tag = $scope.tag.name;
                }else{
                    addressInfo.tag = $scope.tagName;
                }
                var newAddress = addressInfo.getSelectedAddress();
                $q.all([address.existTag(newAddress.tag),
                        address.existAddress(newAddress.id)]).then(function(datas){
                    if(datas[0]){//地址标签已存在
                        alert("地址标签"+newAddress.tag+"已存在，请选择其它标签");
                        return;
                    }
                    if(datas[1]){//地址已存在
                        alert("地址已存在，请不要重复添加");
                        return;
                    }
                    address.addAddress(newAddress).then(function(data){
                        close();
                    },function(reason){
                        alert(errorLog.getErrorMessage(reason));
                    });
                },function(reason){
                    alert(errorLog.getErrorMessage(reason));
                });
            }

            function close(){
                $scope.show = false;
                $scope.onComplete();
            }
        }
    }
});