angular.module('app.share').controller('orderDemandCtrl', ['errorLog', '$timeout','$scope','shareRelease','$stateParams',
    function (errorLog,$timeout,$scope,shareRelease,$stateParams) {
        var releseId = $stateParams.releseId;//发布技能或需求的ID
        $scope.releseId = releseId;
        $scope.shareImages = [];
        $scope.showAcceptOrder = true;

        shareRelease.getDemandDetail(releseId).then(function(data){
            $scope.showLoading = false;
            $scope.data = data.items;
        },function(reason){
            $scope.showLoading = false;
            alert(errorLog.getErrorMessage(reason));
        });
    }
]);
