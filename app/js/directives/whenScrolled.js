myApp.directive('whenScrolled', ['$document', function ($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            $document.bind('scroll', function () {
                var rectObject = raw.getBoundingClientRect();
                if (window.innerHeight >= rectObject.bottom) {
                    scope.$apply(attrs.whenScrolled);
                }
            });
        }
    };
}]);