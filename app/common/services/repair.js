angular.module('services.repairs', ['services.curd', 'resources.repairs']).
service("repairStateful", ['curd', 'repair', function(curd, repair) {
    this.data = {};
    this.query = function(params) {
        curd.query(repair, params).$promise.then(function(data) {
            this.data = data;
        }, function(data) {
            console.log("err!");
        })
    }
}]);
