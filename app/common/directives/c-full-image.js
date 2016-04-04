myApp.directive('cFullImage', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            image:'=',//format:{dataUrl:'....'}
            show:'=',
            onClose:'&'
        },
        templateUrl: 'tpl/common/directives/c-full-image.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function($scope,$timeout){
            $scope.close = function(){
                $scope.show = false;
                $scope.onClose();
            }
        }
    }
})