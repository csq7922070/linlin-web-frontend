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
            $scope.pageSize = 5;
            // $scope.currentPage = 1;
            $scope.$watch("addressList", function(newVal,oldVal){
                $scope.slidelIndex = 0;
                if(newVal&&newVal.length>0){
                    updateCurrentAddress();
                    //updateCurrentAddressList();
                    //$scope.selectAddress($scope.currentAddress);
                }
            });

            function updateCurrentAddress(){
                if(addAddress){
                    $scope.currentAddress = addressInfo.getSelectedAddress();
                }else{
                    var defaultAddress = address.getDefaultAddressSync();
                    if(defaultAddress){
                        $scope.currentAddress = defaultAddress;
                    }else if($scope.addressList&&$scope.addressList.length>0){
                        $scope.currentAddress = $scope.addressList[0];
                    }else{
                        $scope.currentAddress = null;
                    }
                }
                if($scope.currentAddress){
                    var index = address.getAddressIndex($scope.currentAddress.id);
                    $scope.slidelIndex = Math.floor(index/$scope.pageSize)*$scope.pageSize;
                }else{
                    $scope.slidelIndex = 0;
                }
            
                $scope.selectAddress($scope.currentAddress);
            }

            // function updateCurrentAddressList(type){//type is "add" or "delete"
            //     $scope.maxPage = Math.ceil($scope.addressList.length/pageSize);//
            //     if($scope.currentPage>$scope.maxPage&&$scope.currentPage>1){//删除了地址
            //         $scope.currentPage--;
            //     }
            //     if(type=="add"&&$scope.currentPage<$scope.maxPage){//添加了地址
            //         $scope.currentPage++;
            //     }
            //     $scope.currentAddressList = getSubArray($scope.addressList, $scope.currentPage, pageSize);
            //     if(!$scope.currentAddress&&$scope.currentAddressList.length>0){
            //         var defaultAddress = address.getDefaultAddressSync();
            //         if(defaultAddress){
            //             $scope.currentAddress = defaultAddress;
            //         }else{
            //             $scope.currentAddress = $scope.currentAddressList[0];
            //         }
            //     }
            //     if(type=="delete"&&deleteCurrent){//删除了当前地址
            //         if($scope.currentAddressList.length>0){
            //             $scope.selectAddress($scope.currentAddressList[0]);
            //         }else{
            //             $scope.selectAddress(null);
            //         }
            //     }
            //     if(type=="add"){
            //         $scope.selectAddress(addressInfo.getSelectedAddress());
            //     }
            // }

            // function getSubArray(array, page, size){
            //     var subArray = [];
            //     var index = (page-1)*size;
            //     var maxIndex = page*size-1;
            //     if(array){
            //         for(var i = index;i<array.length&&i<=maxIndex;i++){ 
            //             subArray.push(array[i]);
            //         }
            //     }
            //     return subArray;
            // }

            $scope.prevPage = function(){
                $scope.slideIndex-=$scope.pageSize;
                if($scope.slideIndex < 0){
                    $scope.slideIndex = 0;
                }
            }

            $scope.nextPage = function(){
                if($scope.slideIndex+$scope.pageSize<$scope.addressList.length){
                    $scope.slideIndex+=$scope.pageSize;
                }
            }

            $scope.deleteAddress = function (addr) {
                $scope.showDeleteConfirm = true;
                $scope.delete = function () {
                    $scope.showDeleteConfirm = false;
                    //deleteCurrent = $scope.currentAddress.id == addr.id;
                    address.deleteAddress(addr).then(function (data) {
                        updateCurrentAddress();
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

            var addAddress = false;
            $scope.onEditAddressComplete = function(){
                //$scope.showContent = true;
                addAddress = true;
                updateCurrentAddress();
                addAddress = false;
            }
        }
    }
});