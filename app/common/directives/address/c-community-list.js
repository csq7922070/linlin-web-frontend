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
                addressInfo.community = community;
                $scope.showBlockList = true;
                address.getBlockList(addressInfo.city, community).then(function(data){
                    $scope.blockList = data;
                },function(reason){
                    $scope.showBlockList = false;
                    alert(reason.errorCode+","+reason.errorMessage);
                });
            }

            $scope.onSelectBlockComplete = function(){
                $scope.show = false;
                $scope.onComplete();
            }
        }
    }
});