angular.module('resources.notice', ['ngResource']).
factory('notices', ['$resource', function($resource) {
    return $resource(basePath+'/notices/:id', {id:'@id'}, {
        query: {
            method: 'GET',
            isArray: false
        }
    })
}]);