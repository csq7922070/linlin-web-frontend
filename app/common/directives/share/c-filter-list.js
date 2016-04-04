myApp.directive('cFilterList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            main:'=',
            list:'=',
            onSelect:'&'
        },
        templateUrl: 'tpl/common/directives/share/c-filter-list.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope,$timeout,$scope,modalSvc,cityList){
          $scope.expand = function(){
            $scope.expanded = !$scope.expanded;
          }

          $scope.select = function(item){
            $scope.expanded = false;
            $scope.selected = item;
            $scope.onSelect({selected:item});
          }
        }
    }
})