angular.module('app.modal')
	.service('modalSvc', ['$q','$http','$timeout', '$location', 'errorLog', '$state',
		'account','address','errorLog','control',
		function($q,$http,$timeout, $location, errorLog, $state,account,address,errorLog,
			control){
			var id = 1;
			var modals = [];//format: [{id,scope}]

			this.addModal = function(modal){
				if(modal&&modal.id===undefined){
					modal.id = id++;
				}
				modals.push(modal);
			}

			this.removeModal = function(modal){
				if(modals&&modal){
					for(var i = 0;i<modals.length;i++){
						if(modals[i].id==modal.id){
							if(modals[i].scope){
								modals[i].scope.show = false;
							}
							modals.splice(i,1);
							break;
						}
					}
				}
			}

			//主要解决在页面回退过程如何关闭页面上方的模态框的问题，页面上的模态框可能不止一个，分多层显示，每次回退只关闭最上层的一个模态框
			this.startChangeState = function(event, toState, toParams, fromState, fromParams){
				// console.log(fromState);
				// console.log(toState);
				if(modals&&modals.length>0){
					var lastIndex = modals.length-1;
					if(modals[lastIndex].scope){
						modals[lastIndex].scope.show = false;//隐藏浮层
					}
					modals.splice(lastIndex,1);//从堆栈中删除浮层
					event.preventDefault();
					//history.forward();
					history.pushState(null,"","");//向浏览器历史记录中补一个状态，以抵消回退导致的当前浏览器状态改变
				}
			}
	}]);