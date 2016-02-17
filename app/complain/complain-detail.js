(function () {
    angular.module('app.complain').controller('complainDetailCtrl', ['$stateParams', 'complains','errorLog',
        function ($stateParams, complains, errorLog) {
            var vm = this;
            params = {
                id: $stateParams.id
            }
            complains.get(params).$promise.then(function(data) {
                vm.complain = data;
            },function(reason){
                alert(errorLog.getErrorMessage(reason));
            })
        }

    ])
})();