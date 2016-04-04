angular.module('app.share').controller('releaseDemandCtrl', ['$timeout', '$state', 'errorLog','$scope','shareTypes', 'account','userInfo', 'cityList', 'shareRelease',
    function ($timeout, $state, errorLog,$scope, shareTypes, account, userInfo, cityList, shareRelease) {
        $scope.skillImages = [];
        $scope.showDownList = true;
        $scope.showCheckButton = true;
        $scope.showControlNUmber = true;
        $scope.currentSkillClassify = null;
        $scope.currentSkillSum = null;
        $scope.controlNumber = 1;
        $scope.showSkillSecondary = true;
        $scope.texts = shareTypes.getPrimarySkills();
        $scope.sums = shareTypes.getFeeTypesPriceUnit();
        $scope.sexs = shareTypes.getSexTypes();
        $scope.ages = shareTypes.getAgeTypes();
        //获得用户信息
        if(account.hasLogin()){
            var userInfo = userInfo.getLastLoginInfo();
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
        //一级技能
        $scope.getReleaseSkillClassify = function(currentList){
            $scope.currentSkillClassify = null;
            var category = {};
            category.name = currentList.name;
            category.id = currentList.id;
            $scope.currentSkillClassify = category;
            if(currentList.id == 13){
                $scope.showskillOther = true;
                $scope.currentSkillSecondary = {};
                $scope.currentSkillSecondary.id = '13';
                $scope.showSkillSecondary = false;
            }else{
                var category = {};
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
        //二级技能
        $scope.getSkillSeconday = function(currentSkillSecondary){
            console.log(currentSkillSecondary);
            $scope.currentSkillSecondary = currentSkillSecondary;
        }
        //年龄
        $scope.checkSex = function(sex){
            $scope.checkCurrentSex = sex.id;
            console.log(sex);
        }
        //性别
        $scope.checkAge = function(age){
            $scope.checkCurrentAge = age.id;
            console.log(age);
        }
        //服务地址
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

        //需求描述等
        $scope.getReleaseSkillSum = function(currentList){
            console.log(currentList);
            $scope.currentSkillSum = currentList;
        }
        $scope.getControlNumber = function(number){
            $scope.controlNumber = number;
        }
        $scope.imageAdding = function(){
            $scope.imageadding = true;
        }
        $scope.imageAdded = function(){
            $scope.imageadding = false;
        }
        $scope.releaseDemFrom = function() {
            if($scope.imageadding){
                alert('正在上传图片中，请稍后提交');
                return;
            }
            var timeYear = $scope.skillTime.getFullYear();
            var timeMonth = $scope.skillTime.getMonth() + 1;
            var timeDay = $scope.skillTime.getDate();
            time = timeYear + '-' + timeMonth + '-' + timeDay;
            params = {
                category: $scope.currentSkillClassify,
                subCategories: $scope.currentSkillSecondary
            }
            address = {
                city: $scope.addressForme?$scope.addressForme.city:$scope.addressMyservice.city,
                district: $scope.addressForme? $scope.addressForme.area:null,
                detail: $scope.addressForme?$scope.addressForme.detail:null,
                districts: $scope.addressMyservice?$scope.addressMyservice.area:null
            }
            requirement = {
                price : $scope.skillSum,
                priceType: $scope.currentSkillSum.id,
                count: $scope.controlNumber,
                mobile: $scope.skillMobile,
                description: $scope.skillDescribe,
                accountId: userInfo.accountId,
                subscribeDate:time,
                sexType: $scope.checkCurrentSex,
                ageType: $scope.checkCurrentAge
            }
            images =  $scope.skillImages;
            shareRelease.releaseDemand(params,address,requirement,images).then(function(data){
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
