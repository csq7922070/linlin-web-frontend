myApp.directive('cDealInfo', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            starLevel:'@',//星级，浮点数,0,0.5,1,1.5...4.5,5
            dealCount:'@'//交易数量
        },
        templateUrl: 'tpl/common/directives/share/c-deal-info.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout,$scope){
            // //test code
            // $scope.dealCount = 124;
            // //end test

            $scope.$watch("starLevel",function(newVal,oldVal){
                if(newVal){
                    var starValue = Math.round(Math.round(Math.round($scope.starLevel*10)/5)/2*10)/10;
                    $scope.starText = (starValue+"").replace(".","_");
                }
            });
        }
    }
})