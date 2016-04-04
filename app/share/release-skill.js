angular.module('app.share').controller('releaseSkillCtrl', ['$timeout', '$state', 'errorLog','$scope','account','userInfo','shareTypes','modalSvc', 'cityList', 'shareRelease',
    function ($timeout, $state, errorLog,$scope,account,userInfo,shareTypes,modalSvc, cityList, shareRelease) {
        $scope.skillImages = [];
        $scope.showDownList = true;
        $scope.showCheckButton = true;
        $scope.showSkillSecondary = true;
        $scope.showImages = true;
        $scope.haveAddress = false;
        $scope.haveMydistrict = false;
        $scope.texts = shareTypes.getPrimarySkills();
        $scope.sums = shareTypes.getFeeTypesPriceUnit();

        //获得用户信息
        if(account.hasLogin()){
            var userInfo = userInfo.getLastLoginInfo();
            $scope.userName = userInfo.nickName;
            $scope.userImg = userInfo.headImgUrl;
        }
        $scope.$watch("showSetAddress", function(newVal,oldVal){
            if($scope.showSetAddress == true){
                return
            }else{
                $scope.showReleasebox = true;
            }
        });
        $scope.$watch("showSkillAddress", function(newVal,oldVal){
            if($scope.showSkillAddress == true){
                return
            }else{
                $scope.showReleasebox = true;
            }
        });
        $scope.getReleaseSkillClassify = function(currentList){
            $scope.currentSkillClassify = null;
            if(currentList.id == 13){
                $scope.showskillOther = true;
                $scope.currentSkillSecondary = {};
                $scope.currentSkillSecondary.id = '13';
                $scope.showSkillSecondary = false;
            }else{
                var category = {};
                category.name = currentList.name;
                category.id = currentList.id;
                $scope.currentSkillClassify = category;
                $scope.pid = currentList.id;
                shareTypes.getSecondarySkills($scope.pid).then(function(data){
                    $scope.showskillOther = false;
                    $scope.skillSecondaryList = data;
                    $scope.showSkillSecondary = true;
                },function(reason){
                    alert(errorLog.getErrorMessage(reason));
                });
            }
        }
        $scope.getSkillSeconday = function(currentSkillSecondary){
            console.log(currentSkillSecondary);
            $scope.currentSkillSecondary = currentSkillSecondary;
        }

        $scope.getReleaseSkillSum = function(currentList){
            $scope.currentSkillSum = currentList.id;
        }

        //选择服务地点
        $scope.setSkillAddress = function(type){
            $scope.addressType = type;
            if($scope.addressType == 1){
                cityList.getCityList().then(function(data){
                    $scope.skillAddress = data;
                    $scope.showSkillAddress = true;
                })
            }else{
                $scope.showSetAddress = true;
            }
            $scope.showReleasebox = false;
        }
        $scope.getMyAddress = function(myAddress){
            $scope.addressForme = myAddress;
        }  
        $scope.getAddress = function(areaList){
            $scope.addressMyservice = areaList;
        }
        $scope.imageAdding = function(){
            $scope.imageadding = true;
        }
        $scope.imageAdded = function(){
            $scope.imageadding = false;
        }

        $scope.releaseSubFrom = function() {
            if($scope.imageadding){
                alert('正在上传图片中，请稍后提交');
                return;
            }
            address = {
                city: $scope.addressForme?$scope.addressForme.city:$scope.addressMyservice.city,
                district: $scope.addressForme? $scope.addressForme.area:null,
                detail: $scope.addressForme?$scope.addressForme.detail:null,
                districts: $scope.addressMyservice?$scope.addressMyservice.area:null
            }
            offer = {
                price : $scope.skillSum,
                mobile: $scope.skillMobile,
                description: $scope.skillDescribe,
                priceType: $scope.currentSkillSum,
                accountId: userInfo.accountId
            }
            params = {
                category: $scope.currentSkillClassify,
                subCategories: $scope.currentSkillSecondary
            }
            images =  $scope.skillImages;
            shareRelease.releaseSkill(params,address,offer,images).then(function(data){
                $scope.showSuccess = true;
                $scope.onSuccessClose = function() {
                    $state.go('home-nav',{index:1});
                }
            },function(reason){
                $scope.showError = true;
                alert(errorLog.getErrorMessage(reason));
            });
        }
    }
]);
