angular.module('resources.repairs', ['ngResource']).
factory('repairs', ['$resource', function($resource) {
    return $resource(basePath+'/repairs/:id', {id:'@id'}, {
        query: {
            method: 'GET',
            isArray: false
        }
    })
}]);