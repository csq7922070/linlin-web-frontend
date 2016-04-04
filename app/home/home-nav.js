angular.module('app.home').controller('homeNavCtrl', ['$stateParams','$scope','$state',
    function ($stateParams, $scope,$state) {
        $scope.navIndex = 0;
        if($stateParams.index!=""){
            $scope.navIndex = $stateParams.index;
        }
        $scope.nav = function(index){
            $scope.navIndex = index;
            $state.go('home-nav',{index:$scope.navIndex});
        }
        $state.go('home-nav.nav');
    }
]);
