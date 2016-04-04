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
        controller: function ($stateParams,$scope,addresses,addressInfo,address,modalSvc) {
            var modal = null;
            $scope.$watch("show", function(newVal,oldVal){
                if(newVal){
                    if(!modal){
                        modal = {scope:$scope};
                    }
                    modalSvc.addModal(modal);
                }
            });
            $scope.changeCommunity = function(community){
                $scope.showLoading = true;
                addressInfo.communityId = community.id;
                addressInfo.community = community.name;
                $scope.showContent = false;
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

            $scope.$watch("showBlockList", function(newVal,oldVal){
                if(!newVal){
                    $scope.showContent = true;
                }
            });

            $scope.onSelectBlockComplete = function(){
                $scope.showContent = true;
                $scope.show = false;
                modalSvc.removeModal(modal);
                $scope.onComplete();
            }
        }
    }
});