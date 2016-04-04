angular.module('app.share').controller('orderSkillCtrl', ['errorLog','$timeout','$scope','shareRelease','account','userInfo','shareTypes','modalSvc','$stateParams','shareImage',
    function (errorLog,$timeout,$scope,shareRelease,account,userInfo,shareTypes,modalSvc,$stateParams,shareImage) {
        var releseId = $stateParams.releseId;//发布技能或需求的ID
        $scope.releseId = releseId;
        $scope.shareImages = [];
        $scope.showAcceptOrder = true;
        $scope.showShareTip = true;

        shareRelease.getSkillDetail(releseId).then(function(data){
            $scope.showLoading = false;
            $scope.data = data.items;
        },function(reason){
            $scope.showLoading = false;
            alert(errorLog.getErrorMessage(reason));
        });
    }
]);
