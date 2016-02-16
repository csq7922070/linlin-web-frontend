angular.module('app.home').controller('appHomeCtrl', ['$stateParams','$scope',
    function ($stateParams, $scope) {
    	var currentNav = 'home';
        $scope.nav = function(name){
        	if(name=='account' && currentNav == 'home'){
        		document.querySelector("#flip-container").classList.toggle("flip");
        		currentNav = 'account';
        	}else if(name == 'home' && currentNav == 'account'){
        		document.querySelector("#flip-container").classList.toggle("flip");
        		currentNav = 'home';
        	}
        }
    }
]);
