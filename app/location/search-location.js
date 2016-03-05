angular.module('app.location').controller('searchLocationCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
    '$timeout', 'communityList', 'communitySearch', 'errorLog','userInfo','communityLocation', 'locationState',
    function($scope, $http, $stateParams, $rootScope, $state, $location,$timeout, communityList, communitySearch,errorLog,userInfo,communityLocation, locationState) {      
        $scope.showLoading = true;
        var cmmList = null;
        var cmmInfo = communityLocation.getLastCommunity();
        var city = cmmInfo&& cmmInfo.city ? cmmInfo.city:"";
        communityList.getCommunityList(city).then(function(data){
            $scope.showLoading = false;
            cmmList = data;
            communitySearch.cmmList = cmmList;
            $scope.focus = true;
            //$("#community-search-field").focus();
            //$("#community-search-field").trigger("focus");
        },function(reason){
            $scope.showLoading = false;
            alert(reason.errorCode +"," +reason.errorMessage);
        });

        $scope.showInexistenceTip = false;

        var changePromise = null;
        $scope.$watch("communityName", function(newVal, oldVal){
            if(newVal != oldVal){
                if(changePromise){ 
                    $timeout.cancel(changePromise);
                }
                changePromise = $timeout(function(){
                    $scope.showInexistenceTip = false;
                    $scope.searchLocationCommunities = communitySearch.searchCommunity($scope.communityName);
                    if($scope.communityName && $scope.searchLocationCommunities.length == 0){
                        $scope.showInexistenceTip = true;
                    }
                }, 700);
            }
        });

        $scope.changeCommunity = function(community){
            var openId = null;
            userInfo.getOpenId().then(function(data){
                openId = data;
                communityLocation.changeCommunity(openId, community).then(function(data){//保存用户选择的小区信息到服务器
                    locationState.hasLocation = true;
                    $state.go('home');
                },function(reason){
                    alert(reason.errorCode +"," +reason.errorMessage);
                });
            },function(reason){
                alert(reason.errorCode +"," +reason.errorMessage);
            });
        }

        $scope.searchLocationCommunities = [];

        $scope.clearSearchField = function(){
            $scope.communityName = "";
        }
    }
]);