myApp.directive('pagination', function() {
    return {
        restrict: 'E',
        scope: {
            numPages: '=',
            currentPage: '=',
            pageSize: '=',
            goPage: '&'
        },
        templateUrl: 'pagination.tpl.html',
        link: function(scope, element, attrs) {

            scope.isActive = function(page) {
                return scope.currentPage === page;
            }

            scope.hasPre = function() {
                return (scope.currentPage - 1 > 0);
            }

            scope.hasPre2 = function() {
                return (scope.currentPage - 2 > 0);
            }
            scope.hasNext = function() {
                return (scope.currentPage + 1 <= cope.numPages);
            }

            scope.hasNext2 = function() {
                return (scope.currentPage + 2 <= cope.numPages);
            }
        }
    }

})
