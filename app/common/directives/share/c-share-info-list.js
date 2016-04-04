myApp.directive('cShareInfoList', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            shareInfoList:'=',
            onSelect:'&'
        },
        templateUrl: 'tpl/common/directives/share/c-share-info-list.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope, $http, $stateParams, $rootScope, $state, addresses, payments,addressInfo,
            address,errorLog,control,billPay,$filter,shareTypes) {
            $scope.select = function(shareInfo){
                $scope.onSelect({shareInfo:shareInfo}); 
            }
        }
    }
})