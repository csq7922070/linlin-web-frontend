angular.module('app.complain').directive('cComplainDetail', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            complainDetail: '=',
            onComplete: '&'
        },
        templateUrl: 'tpl/common/directives/complain/c-complain-detail.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($scope,$timeout, $state, errorLog,$scope,complain,$stateParams) {
            $scope.complainReplyShow = false;
            $scope.complainReply = function() {
                console.log($stateParams.id);
                $scope.complainReplyShow = true;
            }
            $scope.onComplainReply = function(newReply){
                params = {
                    id: $stateParams.id,
                    reply: newReply,
                    state: 1,
                    type: 1
                };
                console.log(params);
                complain.saveComplainReply(params).then(function(data) {
                    $scope.complainReplyShow = false;
                    $scope.complainDetail = data.replys;
                    console.log($scope.complainDetailreply);
                }, function() {
                    $scope.msg = '回复失败';
                });
            }
        }
    }
});