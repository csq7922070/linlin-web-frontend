myApp.directive('cSlideAddress', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            onSelect: '&',
            addressList: '='
        },
        templateUrl: 'tpl/common/directives/c-slide-address.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($scope, $rootScope,$stateParams, $state, addresses,errorLog,addressInfo,userInfo,address) {
            var pageSize = 5;
            $scope.currentPage = 1;
            $scope.$watch("addressList", function(newVal,oldVal){
                if(newVal&&newVal.length>0){
                    updateCurrentAddressList();
                    $scope.selectAddress($scope.currentAddress);
                }
            });

            function updateCurrentAddressList(deleted){
                $scope.maxPage = Math.ceil($scope.addressList.length/pageSize);//
                if($scope.currentPage>$scope.maxPage&&$scope.currentPage!=1){
                    $scope.currentPage--;
                }
                $scope.currentAddressList = getSubArray($scope.addressList, $scope.currentPage, pageSize);
                if($scope.currentAddress==undefined&&$scope.currentAddressList.length>0){
                    var defaultAddress = address.getDefaultAddressSync();
                    if(defaultAddress){
                        $scope.currentAddress = defaultAddress;
                    }else{
                        $scope.currentAddress = $scope.currentAddressList[0];
                    }
                }
                if(deleted){
                    if($scope.currentAddressList.length>0){
                        $scope.selectAddress($scope.currentAddressList[0]);
                    }else{
                        $scope.selectAddress();
                    }
                }
            }

            function getSubArray(array, page, size){
                var subArray = [];
                var index = (page-1)*size;
                var maxIndex = page*size-1;
                if(array){
                    for(var i = index;i<array.length&&i<=maxIndex;i++){ 
                        subArray.push(array[i]);
                    }
                }
                return subArray;
            }

            $scope.prevPage = function(){
                if($scope.currentPage <=1){
                    return;
                }
                $scope.currentPage--;
                $scope.currentAddressList = getSubArray($scope.addressList, $scope.currentPage, pageSize);
            }

            $scope.nextPage = function(){
                if($scope.currentPage >=$scope.maxPage){
                    return;
                }
                $scope.currentPage++;
                $scope.currentAddressList = getSubArray($scope.addressList, $scope.currentPage, pageSize);
            }

            $scope.deleteAddress = function (addr) {
                $scope.showDeleteConfirm = true;
                $scope.delete = function () {
                    $scope.showDeleteConfirm = false;
                    address.deleteAddress(addr).then(function (data) {
                        updateCurrentAddressList(true);
                    }, function (reason) {
                        alert(errorLog.getErrorMessage(reason));
                    })
                }
            };
 
            $scope.cancel = function () {
                $scope.showDeleteConfirm = false;
            }

            $scope.setDefaultAddress = function (addr) {
                address.setDefaultAddress(addr).then(function(data){

                },function(reason){
                    alert(errorLog.getErrorMessage(reason));
                });
            }

            $scope.selectAddress = function(addr){
                $scope.currentAddress = addr;
                updateShortAddress(addr);
                addressInfo.selectAddress(addr);
                var id = null;
                if(addr){
                    id = addr.id;
                }
                $scope.onSelect({addressId:id});
            }

            function updateShortAddress(addr){
                if(addr){
                    $scope.shortAddress = addr.block;
                    if(addr.unit){
                        $scope.shortAddress+="-"+addr.unit;
                    }
                    if(addr.room){
                        $scope.shortAddress+="-"+addr.room;
                    }
                }else{
                    $scope.shortAddress = "";
                }
            }

            $scope.addAddress = function(){
                //$scope.showContent = false;
                addressInfo.init();
                $scope.showAddressEdit = true;
            }

            $scope.onEditAddressComplete = function(){
                //$scope.showContent = true;
                updateCurrentAddressList();
                $scope.selectAddress(addressInfo.getSelectedAddress());
            }
        }
    }
});