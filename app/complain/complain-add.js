// angular.module('app.complain').controller('complainAddCtrl', ['$timeout', '$state', 'address', 'addressInfo', '$scope','userInfo', 'complain',
//     function ($timeout, $state, address, addressInfo, $scope, userInfo, complain) {
//         var vm = this;
//         var loginInfo = userInfo.getLastLoginInfo();
//         $scope.defaultMobile = loginInfo.tel;

//         vm.submitForm = function () {
//             var params = {
//                 communityId : $scope.address.communityId,
//                 openid : userInfo.getOpenIdSync(),
//                 mobile : $scope.defaultMobile,
//                 title : $scope.title,
//                 content : $scope.content
//             }
//             complain.saveComplainAdd(params).then(function(data){
//                 $scope.showSuccess = true;
//                 $scope.onSuccessClose = function() {
//                     $state.go('complain');
//                 }
//             },function(){    
//                 $scope.showError = true;
//             });
//         }
        
//         address.getDefaultAddress().then(function(data){
//             // console.log(data);
//             $scope.address = data;
//         },function(reason){
//             alert(reason.errorCode+","+reason.errorMessage);
//         });
//         $scope.changeAddress = function(){
//             $scope.show = false;
//             $scope.showAddressList = true;
//             address.getAddressList().then(function(data){
//                 $scope.addressList = data;
//             },function(reason){
//                 $scope.showAddressList = false;
//                 alert(reason.errorCode+","+reason.errorMessage);
//             });
//         }
//         $scope.onSelectAddressComplete = function(){
//             $scope.show = true;
//             $scope.address = addressInfo;
//         }
//     }
// ]);
