myApp.directive('cCommunityList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            onComplete: '&',
            communityList:'='
        },
        templateUrl: 'tpl/common/directives/address/c-community-list.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($stateParams,$scope,addresses,addressInfo,address) {
            $scope.changeCommunity = function(community){
                $scope.showLoading = true;
                addressInfo.communityId = community.id;
                addressInfo.community = community.name;
                //$scope.showContent = false;
                $scope.showBlockList = true;
                address.getBlockList(addressInfo.city, community.id).then(function(data){
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
                //$scope.showContent = true;
                $scope.show = false;
                $scope.onComplete();
            }
        }
    }
});