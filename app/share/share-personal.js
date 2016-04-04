angular.module('app.share').controller('sharePersonalCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
    'locationState', 'communityLocation', '$q', 'userInfo', 'errorLog', 'location',
    'address','auth','control','addressInfo','shareTypes','shareInfo','shareImage','sharePersonal',
    function($scope, $http, $stateParams, $rootScope, $state, $location, locationState, communityLocation, $q, 
        userInfo,errorLog, location,address,auth,control,addressInfo,shareTypes,shareInfo,shareImage,sharePersonal) {
        var accountId = $stateParams.accountId;
        //test code
        if(!accountId){
            var loginInfo = userInfo.getLastLoginInfo();
            accountId = loginInfo.accountId;
        }
        // end test
        //获取个人基本信息，包括发布的所有信息的一级分类
        sharePersonal.getSharePersonal(accountId).then(function(data){
            if(data){
                $scope.name = data.nickName;
                $scope.sex = data.sex;
                $scope.age = data.age;
                $scope.headImgUrl = data.headImgUrl;
                $scope.backgroundImage = data.headImgUrl;
                $scope.releaseSkills = data.icons;
                //$scope.releaseSkills.push(3);
            }
        },function(reason){
            alert(errorLog.getErrorMessage(reason));
        });

        //发布的技能信息
        var skillPageIndex = 0;
        var skillPageSize = 10;
        $scope.skillInfoList = [];
        shareInfo.getPersonalShareInfoList(accountId,'skill',skillPageIndex,skillPageSize).then(function(data){
            console.log(data);
            $scope.skillInfoList = $scope.skillInfoList.concat(data);
        },function(reason){
            alert(errorLog.getErrorMessage(reason));
        });
        //发布的需求信息
        var requirementPageIndex = 0;
        var requirementPageSize = 10;
        $scope.requirementInfoList = [];
        shareInfo.getPersonalShareInfoList(accountId,'requirement',requirementPageIndex,requirementPageSize).then(function(data){
            console.log(data);
            $scope.requirementInfoList = $scope.requirementInfoList.concat(data);
        },function(reason){
            alert(errorLog.getErrorMessage(reason));
        });
        //$scope.backgroundImage = loginInfo.headImgUrl;
    	// $scope.uploadImages = [];
        // $scope.shareImages = [{dataUrl:"images/banner_01.png"}];
    }
]);