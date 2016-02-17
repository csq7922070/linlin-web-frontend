angular.module('app.home').controller('nativeHomeCtrl', ['$stateParams','$scope',
    function ($stateParams, $scope) {
        // -------------------------------------------------------------------------------
        // 导航控制
    	$scope.currentNav = 'home';
        $scope.nav = function(name){
        	if(name=='account' && $scope.currentNav == 'home'){
        		document.querySelector("#flip-container").classList.toggle("flip");
        		$scope.currentNav = 'account';
        	}else if(name == 'home' && $scope.currentNav == 'account'){
        		document.querySelector("#flip-container").classList.toggle("flip");
        		$scope.currentNav = 'home';
        	}
        }
        // end 导航控制
        // ----------------------------------------------------------------------------------
    }
]);
