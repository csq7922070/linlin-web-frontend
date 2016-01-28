angular.module('resources.complain', ['ngResource']).
    factory('complains', ['$resource', function($resource) {
        return $resource(basePath+'/complains/:id', {id:'@id'}, {
            query: {
            	params:{'id':'query'},
                method: 'GET',
                isArray: false
            }
        })
    }]);