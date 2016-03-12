myApp.directive('cComplainReply', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            complainReply: '=',
            onComplete: '&'
        },
        templateUrl: 'tpl/common/directives/complain/c-complain-detail-reply.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($scope,$timeout, $state, errorLog,$scope,complain) {
            $scope.complainReplyOut = function() {
                var newReply = $scope.newReply;
                console.log(newReply);
                $scope.onComplete({newReply:newReply});
            }
        }
    }
});