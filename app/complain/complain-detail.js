(function () {
    angular.module('app.complain').controller('complainDetailCtrl', ['$stateParams', 'complains',
        function ($stateParams, complains) {
            params = {
                id: $stateParams.id
            }
            complains.get(params).$promise.then(function(data) {
                vm.repair = data;
            },function(data){
                    console.log("err!");
            })
        }

    ])
})