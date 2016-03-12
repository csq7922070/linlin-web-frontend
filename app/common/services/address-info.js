angular.module('app.address')
	.service('addressInfo', ['$q','$http','$timeout','errorLog', 'addresses','userInfo',
		function($q,$http,$timeout, errorLog,addresses,userInfo){
			this.id = null;
			this.tag = null;
			this.city = null;
			this.communityId = null;
			this.community = null;
			this.block = null;
			this.blockType = null;//0代表无单元和房间号，1代表有房间号无单元号，2代表有单元号和房间号
			this.unit = null;
			this.room = null;
			this.ownerName = null;//房屋地址所有者姓名加*
			this.initial = null;//地址首字母，排序用的字段
			
			this.init = function(){
				this.id = null;
				this.tag = null;
				this.city = null;
				this.communityId = null;
				this.community = null;
				this.block = null;
				this.blockType = null;
				this.unit = null;
				this.room = null;
				this.ownerName = null;
				this.initial = null;
			}

			this.selectAddress = function(addr){
				if(addr){
					this.id = addr.id;
					this.tag = addr.tag;
					this.city = addr.city;
					this.communityId = addr.communityId;
					this.community = addr.community;
					this.block = addr.block;
					this.blockType = addr.blockType;
					this.unit = addr.unit;
					this.room = addr.room;
					this.ownerName = addr.ownerName;
					this.initial = addr.initial;
				}
			}

			this.getSelectedAddress = function(){
				var addr = {
					id: this.id,
					tag: this.tag,
					city: this.city,
					communityId: this.communityId,
					community: this.community,
					block: this.block,
					blockType: this.blockType,
					unit: this.unit,
					room: this.room,
					ownerName: this.ownerName,
					initial: this.initial
				};
				return addr;
			}
		}
	]);