myApp.directive('cCityList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onComplete: '&',
            cityList: '='
        },
        templateUrl: 'tpl/common/directives/address/c-city-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($stateParams,$scope,addresses,addressInfo,address) {
            $scope.changeCity = function(city){
                addressInfo.city = city;
                $scope.showCommunityList = true;
                address.getCommunityList(city).then(function(data){
                    $scope.communityList = data;
                },function(reason){
                    $scope.showCommunityList = false;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectCommunityComplete = function(){
                $scope.show = false;
                $scope.onComplete();
            }
        }
    }
});