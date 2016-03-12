myApp.directive('cRepairDevice', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onScrolled: '&',
            repairDevices: '=',
            onComplete: '&'
        },
        templateUrl: 'tpl/common/directives/repair/c-repair-device.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($timeout, $state, errorLog,$scope,repair) {
            $scope.repairAdd = function(repairDevice){
                console.log("repairAdd...");
                $scope.onComplete({repairDevice:repairDevice});
                $scope.currentDevice = repairDevice;
                console.log($scope.currentDevice.id);
            }

            var pageSize = 4;
            $scope.currentPage = 1;

            $scope.currentrepairDevices = getSubArray($scope.repairDevices, $scope.currentPage, pageSize);

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

            $scope.leftArrow = function(){
                if($scope.currentPage <=1){
                    return;
                }
                $scope.currentPage--;
                $scope.currentrepairDevices = getSubArray($scope.repairDevices, $scope.currentPage, pageSize);
            }

            $scope.rightArrow = function(){
                if($scope.currentPage >=3){
                    return;
                }
                $scope.currentPage++;
                $scope.currentrepairDevices = getSubArray($scope.repairDevices, $scope.currentPage, pageSize);
            }

            // var repairDeviceList = document.getElementById('repair_device_list');
            // repairDeviceList.style.left = '0px';
            // width_screen=screen.width -40;
            // console.log(width_screen);
            // var a = parseInt(repairDeviceList.style.left);
            // $scope.rightArrow = function(){
            //     a = parseInt(repairDeviceList.style.left);
            //     $('.left_arrow').css('display','inline-block');
            //     if(a >=-width_screen){
            //         a = repairDeviceList.style.left = a-width_screen + 'px';
            //     }
            //     if(parseInt(a) == -width_screen*2){
            //         $('.right_arrow').css('display','none');
            //     }
            // }
            // $scope.leftArrow = function(){
            //     a = parseInt(repairDeviceList.style.left);
            //     $('.right_arrow').css('display','inline-block');
            //     if(a <0){
            //         repairDeviceList.style.left = a+width_screen + 'px';
            //     }
            //     if(a == -width_screen){
            //         $('.left_arrow').css('display','none');
            //     }
            // }
            // if(a == 0){
            //     $('.left_arrow').css('display','none');
            // }
        }
    }
});