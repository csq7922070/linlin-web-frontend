myApp.directive('cSkillAddress', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            addressType: '=',
            skillAddress: '=',
            onComplete: '&'
        },
        templateUrl: 'tpl/common/directives/share/c-skill-address.tpl.html',
        link: function($scope, element, attrs, cityList) {
            
        },
        controller: function($scope,$timeout,$scope,cityList,modalSvc,$filter,communityLocation){
            var modal = null;
            $scope.$watch("show", function(newVal,oldVal){
                if(newVal){//模态框每次显示时都进行初始化
                    if(!modal){
                        modal = {scope:$scope};
                    }
                    modalSvc.addModal(modal);
                }
            })

            $scope.$watch("show", function(newVal,oldVal){
                angular.forEach($scope.areas, function(item){
                    item.style = false;
                });
            })

            $scope.getAddressPosition = function(){
                
            }
            $scope.retryLocation = function(){
                $scope.locationCity = "定位中";
                communityLocation.autoLocationCommunity().then(function(data){
                    $scope.locationCity = data.city?data.city.name:null;
                    var pid = data.city.id;
                    cityList.getDistrictList(pid).then(function(data){
                        $scope.areas = $filter("groupMerge")(data);
                        console.log($scope.areas);
                        $scope.showSkillAddress = true;
                    })
                },function(reason){
                    $scope.showLocationLoading = false;
                    if(reason && reason.errorCode == "PERMISSION_DENIED"){
                        alert("定位服务未开启, 请在系统设置中开启定位服务");
                    } else{
                        alert(errorLog.getErrorMessage(reason));
                    }
                    $scope.showLocationError = true;
                });
            }
            $scope.areaList = [];
            $scope.city = null;

            $scope.selectCity = function(city){
                console.log('city',city);
                var pid = city.id;
                $scope.city = city.name;
                cityList.getDistrictList(pid).then(function(data){
                    $scope.areas = $filter("groupMerge")(data);
                    console.log($scope.areas);
                    $scope.showSkillAddress = true;
                },function(){

                })
            }
            $scope.selectArea = function(area) {
                console.log(area);
                var areaName = false;
                if($scope.addressType == 1){
                    for(var i = 0 ; i < $scope.areaList.length ; i ++){
                        if($scope.areaList[i] == area.name){
                            console.log('相同' + i);
                            $scope.areaList.splice(i,1);
                            areaName = true;
                            area.style = false;
                        }
                    }
                    if(!areaName){
                        $scope.areaList.push(area.name);
                        area.style = true;
                        $scope.address = area.name;
                    }
                    console.log($scope.areaList);
                }else{
                    $scope.areaList = area.name;
                    console.log($scope.areaList);
                }
            }
            $scope.addressComplete = function(){
                $scope.show = false;
                $scope.city = $scope.city?$scope.city:$scope.locationCity;
                addressList={type:$scope.addressType,city:$scope.city,area:$scope.areaList}
                $scope.onComplete({areaList:addressList});
                $scope.areaList = [];
                modalSvc.removeModal(modal);
            }
        }
    }
})