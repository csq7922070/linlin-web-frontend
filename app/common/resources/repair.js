angular.module('resources.repair', ['ngResource']).
factory('repairs', ['$resource', function($resource) {
    return $resource(basePath+'/repairs/:id', {id:'@id'}, {
        query: {
        	params:{'id':'query'},
            method: 'GET',
            isArray: false
        }
    })
}]);