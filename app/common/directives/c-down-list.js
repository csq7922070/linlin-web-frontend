myApp.directive('cDownList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            showName:'@',
            downLists: '=',
            downName: '=',
            currentList: '@', //默认显示
            onComplete: '&'
        },
        templateUrl: 'tpl/common/directives/c-down-list.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout,$scope){
            $scope.downList = false;
            $scope.triangle = 1;
            $scope.taggle_list = function(){
                if($scope.downList){
                    $scope.downList= false;$scope.triangle = 1;
                }else{
                    $scope.downList = true;$scope.triangle = 0
                }
            }
            $scope.chooseList = function(text){
                $scope.currentList = text.name;
                $scope.onComplete({currentList:text});
                $scope.downList = false;
                $scope.triangle = 1
            }
        }
    }
})