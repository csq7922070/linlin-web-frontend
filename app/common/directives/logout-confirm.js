myApp.directive('logoutConfirm', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            close: '&onClose' 
        },
        templateUrl: 'tpl/common/directives/logout-confirm.tpl.html',
        link: function(scope, element, attrs) {
            scope.ok = function(){
                scope.close({state:true});
            }

            scope.cancel = function(){
                scope.close({state:false});
            }
        }
    }
})