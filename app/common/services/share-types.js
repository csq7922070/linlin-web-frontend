angular.module('app.share')
	.service('shareTypes', ['$q','$http','$timeout','errorLog', 'addresses','userInfo',
		function($q,$http,$timeout, errorLog,addresses,userInfo){
			//一级技能
			var primarySkills = [
				{id:1,name:'家教',icon:'family-education'},
				{id:2,name:'相亲',icon:'blind-date'},
				{id:3,name:'跑腿',icon:'errand'},
				{id:4,name:'答疑',icon:'answer'},
				{id:5,name:'保洁',icon:'clean-up'},
				{id:6,name:'宠物代养',icon:'pet-care'},
				{id:7,name:'美甲',icon:'nail-decoration'},
				{id:8,name:'按摩',icon:'knead'},
				{id:9,name:'维修',icon:'repair'},
				{id:10,name:'化妆',icon:'make-up'},
				{id:11,name:'共享卡',icon:'share-card'},
				{id:12,name:'陪逛街',icon:'accompany-shopping'},
				{id:13,name:'其它',icon:'other'}];

			//二级技能，格式：secondarySkills[index] = [{id,name}]
			//index代表二级技能对应的一级技能的ID
			var secondarySkills = [];

			var feeTypes = [
				{id:0,priceUnit:'元/次',countUnit:'次'},
				{id:1,priceUnit:'元/小时',countUnit:'小时'},
				{id:2,priceUnit:'元/天',countUnit:'天'},
				{id:3,priceUnit:'元/月',countUnit:'月'}];

			var sexTypes = [
				{id:-1,name:'不限'},
				{id:0,name:'男'},
				{id:1,name:'女'}];

			var ageTypes = [
				{id:-1,name:'不限'},
				{id:0,name:'25以下'},
				{id:1,name:'25-35'},
				{id:2,name:'35-45'},
				{id:3,name:'45以上'}];

			var skillSortRules = [
				{id:1,name:'离我最近'},
				{id:2,name:'人气最高'},
				{id:3,name:'评价最好'},
				{id:4,name:'最新发布'},
				{id:5,name:'价格最低'},
				{id:6,name:'价格最高'}
			];

			var requirementSortRules = [
				{id:1,name:'离我最近'},
				{id:4,name:'最新发布'},
				{id:5,name:'价格最低'},
				{id:6,name:'价格最高'}
			];

			this.getPrimarySkills = function(){
				return primarySkills;
			}

			this.getAllPrimarySkills = function(){
				var allPrimarySkills = angular.copy(this.getPrimarySkills());
				allPrimarySkills.unshift({id:-1,name:'全部',icon:'all'});
				return allPrimarySkills;
			}

			//primaryId是一级技能的ID，返回该一级技能下的所有二级技能
			this.getSecondarySkills = function(primaryId){
				var defer = $q.defer();
				if(!secondarySkills[primaryId]){//send http
					$http({
						method: "GET",
						url: basePath + '/data/category/'+primaryId
					}).success(function(data){
						secondarySkills[primaryId] = data;
						defer.resolve(secondarySkills[primaryId]);
					}).error(function(reason){
						var reason = {
							errorCode: "GET_SECONDARY_SKILLS_ERROR",
							errorMessage: errorLog.getErrorMessage(reason)
						};
						defer.reject(reason);
					});
				}else{
					defer.resolve(secondarySkills[primaryId]);
				}
				return defer.promise;
			}

			this.getFeeTypesPriceUnit = function(){
				var result = angular.copy(feeTypes);
				angular.forEach(result,function(item){
					item.name = item.priceUnit;
				})
				return result;
			}

			this.getFeeTypes = function(){
				return feeTypes;
			}

			this.getFeeType = function(id){
				var result = null;
				angular.forEach(feeTypes, function(item){
					if(item.id==id){
						result = item;
						return false;
					}
				});
				return result;
			}

			this.getSexTypes = function(){
				return sexTypes;
			}

			this.getAgeTypes = function(){
				return ageTypes;
			}

			this.getSkillSortRules = function(){
				return skillSortRules;
			}

			this.getRequirementSortRules = function(){
				return requirementSortRules;
			}

			this.getAllSkillSortRules = function(){
				var allSortRules = angular.copy(this.getSkillSortRules());
				allSortRules.unshift({id:-1,name:"默认排序"});
				return allSortRules;
			}

			//获取一级技能对应的图标名称
			this.getPrimarySkillIcon = function(id){
				var iconName = null;
				var allPrimarySkills = this.getAllPrimarySkills();
				angular.forEach(allPrimarySkills,function(item){
					if(item.id==id){
						iconName = item.icon;
						return false;
					}
				});
				return iconName;
			}

			this.getSexType = function(id){
				var result = null;
				angular.forEach(sexTypes, function(item){
					if(item.id==id){
						result = item;
						return false;
					}
				});
				return result;
			}

			this.getAgeType = function(id){
				var result = null;
				angular.forEach(ageTypes, function(item){
					if(item.id==id){
						result = item;
						return false;
					}
				});
				return result;
			}
		}
	]);