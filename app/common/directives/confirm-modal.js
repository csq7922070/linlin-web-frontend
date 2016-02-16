myApp.directive('confirmModal', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=',
            title: '=',
            tip: '=',
            tipAlign: '=',
            okText: '=',
            cancelText: '=',
            onlyOkButton: '=',
            close: '&onClose' 
        },
        templateUrl: 'tpl/common/directives/confirm-modal.tpl.html',
        link: function(scope, element, attrs) {
            scope.ok = function(){
                scope.close({state:true});
            }

            scope.cancel = function(){
                scope.close({state:false});
            }

            scope.$watch('cancelText', function(newVal, oldVal){
                if(!newVal){
                    scope.cancelText = "取消";
                }
            });

            scope.$watch('okText', function(newVal, oldVal){
                if(!newVal){
                    scope.okText = "确定";
                }
            })
        }
    }
})