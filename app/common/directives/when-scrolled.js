myApp.directive('whenScrolled', ['$document', function ($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            $document.bind('scroll', function () {
                var rectObject = raw.getBoundingClientRect();
                // console.log(window.innerHeight);
                // console.log(rectObject.bottom);
                if (window.innerHeight >= rectObject.bottom) {
                    // console.log("whenScrolled...");
                    // console.log(raw);
                    scope.$apply(attrs.whenScrolled);
                }
            });
        }
    };
}]);