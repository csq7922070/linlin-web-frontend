angular.module('resources.skill', ['ngResource']).
factory('shares', ['$resource', function($resource) {
    return $resource(basePath+'/type/:id', {id:'@id'}, {
        query: {
        	params:{'id':'query'},
            method: 'GET',
            isArray: false
        }
    })
}]);