(function () {
    angular.module('app.complain').controller('complainDetailCtrl', ['$stateParams', 'complains',
        function ($stateParams, complains) {
            var vm = this;
            params = {
                id: $stateParams.id
            }
            complains.get(params).$promise.then(function(data) {
                vm.complain = data;
            },function(data){
                    console.log("err!");
            })
        }

    ])
})();