angular.module('resources.payment', ['ngResource']).
    factory('payments', ['$resource', function($resource) {
        return $resource(basePath+'/payments/:id', {id:'@id'}, {
            query: {
            	params:{'id':'query'},
                method: 'GET',
                isArray: false
            }
        })
    }]);