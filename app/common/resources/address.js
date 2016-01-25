angular.module('resources.address', ['ngResource']).
    factory('addresses', ['$resource', function($resource) {
        return $resource(basePath+'/houses/:id', {id:'@id'}, {
            query: {
            	params:{'id':'query'},
                method: 'GET',
                isArray: false
            }
        })
    }]);