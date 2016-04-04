angular.module('app.share').controller('shareCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
    'locationState', 'communityLocation', '$q', 'userInfo', 'errorLog', 'location',
    'address','auth','control','addressInfo','shareTypes','shareInfo','cityList','$filter',
    function($scope, $http, $stateParams, $rootScope, $state, $location, locationState, communityLocation, $q, 
        userInfo,errorLog, location,address,auth,control,addressInfo,shareTypes,shareInfo,cityList,$filter) {
    	//顶部导航条
    	$scope.currentNav = 'getHelp';
    	$scope.nav = function(nav){
    		$scope.currentNav = nav;//'getHelp' or 'makeMoney'
            if(nav=='getHelp'){
                $scope.sortRules = skillSortRules;
            }else if(nav=='makeMoney'){
                $scope.sortRules = requirementSortRules;
            }
    		refresh();
    	}

    	//中间主技能过滤条
    	$scope.primarySkills = shareTypes.getAllPrimarySkills();
    	$scope.selectedSkill = $scope.primarySkills[0];
    	$scope.onSelectPrimarySkill = function(selectedSkill){
            $scope.selectedSkill = selectedSkill;
    		refresh();
    	}

    	//中间过滤、排序栏
        //过滤数据处理
        var filterCity = communityLocation.getLastCity();
        var filterCityName = filterCity?filterCity.name:"";
        $scope.mainFilterCondition = {id:-1};
        $scope.mainFilterCondition.name = "全";
        $scope.mainFilterCondition.name += filterCity?filterCity.name:"市";
        $scope.selectedFilterCondition = $scope.mainFilterCondition;
        cityList.getDistrictList(filterCity.id).then(function(data){
            $scope.filterConditions = $filter("groupMerge")(data);
        },function(reason){
            alert(errorLog.getErrorMessage(reason));
        });
        $scope.onSelectFilterCondition = function(filterCondition){
            console.log(filterCondition);
            $scope.selectedFilterCondition = filterCondition;
            refresh();
        }
        //排序数据处理
        var skillSortRules = shareTypes.getSkillSortRules();
        var requirementSortRules = shareTypes.getRequirementSortRules();
    	$scope.sortRules = skillSortRules;
        var allSortRules = shareTypes.getAllSkillSortRules();
        $scope.mainSortRule = allSortRules[0];
        $scope.selectedSortRule = allSortRules[0];
        $scope.onSelectSortRule = function(sortRule){
            console.log(sortRule);
            $scope.selectedSortRule = sortRule;
            refresh();
        }

    	//刷新列表数据，分页显示
    	var pageIndex = 0;
    	var pageSize = 10;
    	$scope.shareInfoList = [];
    	function refresh(scrolled){
    		var shareType = $scope.currentNav=='getHelp'?'skill':'requirement';//用来判断获取找人帮数据还是去赚钱数据
    		var allArea = $scope.selectedFilterCondition.id == -1;//过滤是根据区县过滤，当过滤项ID=-1时表明全市过滤
            var filterDistrictName = allArea?"":($scope.selectedFilterCondition?$scope.selectedFilterCondition.name:"");//过滤区县名称
            if(!scrolled){
                $scope.shareInfoList = [];
                pageIndex = 0;
            }
    		shareInfo.getShareInfoList(shareType, $scope.selectedSkill.id,allArea,filterCityName,filterDistrictName,$scope.selectedSortRule.id,
    			pageIndex,pageSize).then(function(data){
	    		//console.log(data);
                if(!scrolled){
	    		    $scope.shareInfoList = data;
                }else{
                    $scope.shareInfoList = $scope.shareInfoList.concat(data);
                }
	    	},function(reason){
	    		alert(errorLog.getErrorMessage(reason));
	    	});
    	}
    	//refresh();

    	//滚动列表时动态拉取
    	$scope.onShareListScroll = function(){
            console.log("scrolled...");
    		pageIndex++;
    		refresh(true);
    	}
    	// $scope.uploadImages = [];

        //选择某个技能信息或需求信息后跳转至相应的详情页
        $scope.onSelectShareInfo = function(shareInfo){
            if(shareInfo.shareType == "skill"){
                $state.go("skill-details",{id:shareInfo.id});
            }else if(shareInfo.shareType == "requirement"){
                $state.go("demand-details",{id:shareInfo.id});
            }
        }
    }
]);