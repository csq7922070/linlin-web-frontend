angular.module('resources.shop', ['ngResource']).
factory('shops', ['$resource', 'locationInfo', function($resource, locationInfo) {
    return $resource(basePath+'/shops/:id', {}, {
        query: {
        	params:{
        		'id':'query',
        		lon: locationInfo.longitude,
        		lat: locationInfo.latitude
        	},
            method: 'GET',
            isArray: false
        }
    })
}]);