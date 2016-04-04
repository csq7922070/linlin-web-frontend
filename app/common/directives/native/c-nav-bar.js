myApp.directive('cNavBar', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            title:'@',
            light:'@'//控制导航条是否以浅灰色背景、红色左箭头、黑色标题显示，默认为'false'
        },
        templateUrl: 'tpl/common/directives/native/c-nav-bar.tpl.html',
        link: function($scope, element, attrs) {
            
        },
        controller: function($scope, $http, $stateParams, $rootScope, $state, addresses, payments,addressInfo,
            address,errorLog,control,billPay,$filter,mathSvc,appType) {
            $scope.appType = appType;
            $scope.light = 'false';
            
            $scope.prev = function(){
                history.back();   
            }
        }
    }
})