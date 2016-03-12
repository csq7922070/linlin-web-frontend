angular.module('app.address').controller('addressListCtrl', ['$stateParams', '$state','auth','$scope',
	'errorLog','address','control',
    function ($stateParams, $state,auth,$scope,errorLog,address,control) {
        $scope.showLoading = true;
    	$scope.addressListMode = "select";
    	if($stateParams.mode){
    		$scope.addressListMode = $stateParams.mode;//select or browse
    	}
    	$scope.show = true;
        address.getAddressList().then(function(data){
            $scope.showLoading = false;
            $scope.addressList = data;
        },function(reason){
            $scope.showLoading = false;
            $scope.show = false;
            alert(errorLog.getErrorMessage(reason));
        });

        $scope.onSelectAddressComplete = function(){
        	console.log("onSelectAddressComplte");
        	if($scope.addressListMode == "select"){
        		var routeState = control.getRouteState();
        		$state.go(routeState.toState.name, routeState.toParams);
        	}
        }
    }
])