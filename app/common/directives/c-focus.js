myApp.directive('cFocus', function() {
    return {
        restrict: 'A',
        scope: {
            focus: '=',
        },
        link: function(scope, element, attrs) {
            scope.$watch('focus', function(newVal, oldVal){
                if(newVal){
                    element[0].focus();
                }
            });
        }
    }
})