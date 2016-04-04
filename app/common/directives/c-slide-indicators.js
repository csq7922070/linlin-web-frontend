myApp.directive('cSlideIndicators', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            indicators:'=',
            slideIndex:'=',
            slideInterval:'='
        },
        templateUrl: 'tpl/common/directives/c-slide-indicators.tpl.html',
        link: function($scope, element, attrs) {
        },
        controller: function ($scope, $rootScope,$stateParams, $state, addresses,errorLog,addressInfo,userInfo,address) {
            // $scope.$watch("indicators", function(newVal,oldVal){
            //     if(indicators){
            //         console.log(indicators);
            //     }
            // })
            $scope.slide = function(index){
                $scope.slideIndex = index;
            }
        }
    }
});