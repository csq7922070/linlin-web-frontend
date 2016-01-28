angular.module('resources.shop', ['ngResource']).
factory('shops', ['$resource', function($resource) {
    return $resource(basePath+'/shops/:id', {}, {
        query: {
        	params:{'id':'query'},
            method: 'GET',
            isArray: false
        }
    })
}]);