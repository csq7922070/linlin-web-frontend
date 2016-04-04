myApp.directive('cBack', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        },
        templateUrl: 'tpl/common/directives/native/c-back.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope, $http, $stateParams, $rootScope, $state, addresses, payments,addressInfo,
            address,errorLog,control,billPay,$filter,mathSvc) {
            $scope.prev = function(){
                history.back();   
            }
        }
    }
})