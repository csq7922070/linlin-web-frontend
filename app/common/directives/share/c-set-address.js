myApp.directive('cSetMyAddress', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            addressType: '=',
            onComplete:'&'
        },
        templateUrl: 'tpl/common/directives/share/c-set-address.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout,$scope,modalSvc,cityList){
          var modal = null;
          $scope.$watch("show", function(newVal,oldVal){
              if(newVal){//模态框每次显示时都进行初始化
                  if(!modal){
                      modal = {scope:$scope};
                  }
                  modalSvc.addModal(modal);
              }
          })

           $scope.changeMyAddress = function(){
            console.log($scope.addressType);
            cityList.getCityList().then(function(data){
                $scope.skillAddress = data;
                $scope.showSkillAddress = true;
            })
           }
           $scope.getMyArea = function(areaList){
            $scope.areaList = areaList;
           }
           $scope.saveMyAddress = function() {
            var myAddress = {};
            myAddress.detail = $scope.detailedAddress;
            myAddress.city = $scope.areaList.city;
            myAddress.area = $scope.areaList.area;
            // console.log(myAddress);
            $scope.onComplete({myAddress:myAddress});
            $scope.show = false;
            modalSvc.removeModal(modal);
           }
        }
    }
})