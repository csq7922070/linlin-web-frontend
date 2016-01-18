angular.module('resources.shop', ['ngResource']).
factory('shops', ['$resource', function($resource) {
    return $resource(basePath+'/shops', {}, {
        query: {
            method: 'GET',
            isArray: false
        }
    })
}]);