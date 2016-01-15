angular.module('services.curd', []).
service("curd", [function() {
    this.query = function(resource, params) {
        return resource.query(params);
    }

    this.get = function(resource, params) {
        return resource.get(params);
    }

    this.save = function(resource, params) {
        return resource.save(params);
    }
}]);