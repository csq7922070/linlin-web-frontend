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
                $scope.showLoading = true;
                addressInfo.city = city;
                $scope.showContent = false;
                $scope.showCommunityList = true;
                address.getCommunityList(city).then(function(data){
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
                $scope.showContent = true;
                $scope.show = false;
                $scope.onComplete();
            }
        }
    }
});