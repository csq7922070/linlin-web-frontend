//var basePath = "http://localhost:8080/skh";
//var basePath="http://192.168.0.103:8080/mifan";
var basePath = "http://101.200.75.137:8080/mifan";

angular.module('app.home', []);
angular.module('app.notice', ['resources.notice']);
angular.module('app.repair', ['resources.repair']);
angular.module('app.shop', ['resources.shop']);
angular.module('app.complain', ['resources.complain']);
angular.module('app.address', ['resources.address']);
angular.module('app.pay', ['resources.address', 'resources.pay']);
angular.module('app.location', []);
angular.module('app.user',[]);
angular.module('app.log',[]); 
angular.module('app.auth',[]);
angular.module('app.account',[]);
angular.module('app.verify',[]);
angular.module('app.control',[]);
angular.module('app.modal',[]);
angular.module('app.share',['resources.skill']);
angular.module('app.math',[]);

var myApp = angular.module('myApp', ['ui.router', 'angular-carousel', 'app.home', 'app.repair', 'app.notice', 'app.shop', 
    'app.complain', 'app.address', 'app.pay', 'app.location', 'app.user', 'app.log', 'app.auth', 'app.account', 'app.verify',
    'app.control','app.modal','app.share','app.math']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/location");

    $stateProvider
        .state('notice', {
            url: "/notice",
            templateUrl: "tpl/notice/notice.tpl.html",
            controller: 'noticeCtrl',
            controllerAs: 'vm'
        })
        .state('notice-detail', {
            url: "/notice-detail/:id",
            templateUrl: "tpl/notice/notice-detail.tpl.html",
            controller: "noticeDetailCtrl",
            controllerAs: 'vm'
        })
        .state('repair', {
            url: "/repair",
            templateUrl: "tpl/repair/repair.tpl.html",
            controller: 'repairListCtrl',
            controllerAs: 'vm'
        })
        .state('repair-detail', {
            url: "/repair/:id",
            templateUrl: "tpl/repair/repair-detail.tpl.html",
            controller: 'repairDetailCtrl',
            controllerAs: 'vm'
        })
        .state('complain', {
            url: "/complain",
            templateUrl: "tpl/complain/complain.tpl.html",
            controller: "complainListCtrl",
            controllerAs: 'vm'
        })
        .state('complain-detail', {
            url: "/complain/:id",
            templateUrl: "tpl/complain/complain-detail.tpl.html",
            controller: "complainDetailCtrl",
            controllerAs: 'vm'
        })
        .state('address-list', {
            url: "/address-list/:mode",
            templateUrl: "tpl/address/address-list.tpl.html",
            controller: "addressListCtrl",
            controllerAs: 'vm'
        })
        .state('address-edit', {
            url: "/address-edit",
            templateUrl: "tpl/address/address-edit.tpl.html",
            controller: "addressEditCtrl",
            controllerAs: 'vm'
        })
        .state('bill', {
            url: "/bill",
            templateUrl: "tpl/pay/bill.tpl.html",
            controller: "billCtrl"
        })
        .state('pay', {
            url: "/pay",
            templateUrl: "tpl/pay/pay.tpl.html",
            controller: "payCtrl",
            controllerAs: 'vm'
        })
        .state('pay-list', {
            url: "/pay-list",
            templateUrl: "tpl/pay/pay-list.tpl.html",
            controller: "payListCtrl"
        })
        .state('home', {
            url: "/home",
            templateUrl: "tpl/home/home.tpl.html",
            controller: "homeCtrl",
            controllerAs: 'vm'
        })
        .state('home.shop-info', {
            url: "/shop-info/:site",
            templateUrl: "tpl/shop/shop-info.tpl.html",
            controller: "shopInfoCtrl",
            controllerAs: 'vm'
        })
        .state('html-error', {
            url: "/html-error",
            templateUrl: "tpl/home/html-error.tpl.html",
            controllerAs: 'vm'
        })
        .state('location', {
            url: "/location",
            templateUrl: "tpl/location/location.tpl.html",
            controller: "locationCtrl",
            controllerAs: 'vm'
        })
        .state('login',{
            url: "/login",
            templateUrl: "tpl/account/login/login.tpl.html",
            controller: "loginCtrl",
            controllerAs: "vm"
        })
        .state('nick-name',{
            url: "/nick-name",
            templateUrl: "tpl/account/nickName/nick-name.tpl.html",
            controller: "nickNameCtrl",
            controllerAs: "vm"
        })
        .state('account',{
            url: "/account",
            templateUrl: "tpl/account/account.tpl.html",
            controller: "accountCtrl",
            controllerAs: "vm"
        })
        .state('us',{
            url: "/us",
            templateUrl: "tpl/account/us/us.tpl.html",
            controller: "usCtrl",
            controllerAs: "vm"
        })
        .state('user-agreement',{
            url: "/user-agreement",
            templateUrl: "tpl/account/userAgreement/user-agreement.tpl.html",
            controller: "userAgreementCtrl",
            controllerAs: "vm"
        })
        .state('disclaimer',{
            url: "/disclaimer",
            templateUrl: "tpl/account/disclaimer/disclaimer.tpl.html",
            controller: "disclaimerCtrl",
            controllerAs: "vm"
        })
        .state('share-personal',{
            url: "/share-personal/:accountId",
            templateUrl: "tpl/share/share-personal.tpl.html",
            controller: "sharePersonalCtrl",
            controllerAs: "vm"
        })
        .state('home-nav',{
            url: "/home-nav/:index",
            templateUrl: "tpl/home/home-nav.tpl.html",
            controller: "homeNavCtrl",
            controllerAs: "vm"
        })
        .state('release-skill',{
            url: "/release-skill",
            templateUrl: "tpl/share/release-skill.tpl.html",            
            controller: "releaseSkillCtrl",
        })
        .state('release-demand',{
            url: "/release-demand",
            templateUrl: "tpl/share/release-demand.tpl.html",            
            controller: "releaseDemandCtrl",
        })
        .state('skill-details',{
            url: "/skill-details/:id",
            templateUrl: "tpl/share/detail-skill.tpl.html",            
            controller: "releaseSkillDetailCtrl",
        })
        .state('demand-details',{
            url: "/demand-details/:id",
            templateUrl: "tpl/share/detail-demand.tpl.html",            
            controller: "releaseDemandDetailCtrl",
        })
        .state('order-skill',{
            url: "/order-skill/:releseId",
            templateUrl: "tpl/share/order-skill.tpl.html",            
            controller: "orderSkillCtrl",
        })
        .state('order-demand',{
            url: "/order-demand/:releseId",
            templateUrl: "tpl/share/order-demand.tpl.html",            
            controller: "orderDemandCtrl",
        })
        .state('home-nav.nav',{
            views:{
                "home":{
                    templateUrl:"tpl/home/native-home.tpl.html",
                    controller: "nativeHomeCtrl",
                    controllerAs: "vm"
                },
                "share":{
                    templateUrl:"tpl/share/share.tpl.html",
                    controller: "shareCtrl",
                    controllerAs: "vm"
                },
                "account":{
                    templateUrl:"tpl/account/account.tpl.html",
                    controller: "accountCtrl", 
                    controllerAs: "vm"
                }
            }
        });
}]).config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
}]).run(['$rootScope', 'auth', 'control','modalSvc', function($rootScope, auth, control,modalSvc) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        control.startChangeState(event, toState, toParams, fromState, fromParams);//为了兼容app和微信公众号的首页不一致问题
        //在页面跳转前检测需要用户登录以及绑定地址的页面用户是否完成了登录和地址绑定
        //否则跳转到登录页面或者添加地址页面
        auth.startChangeState(event, toState, toParams, fromState, fromParams);
        //检测页面中是否有模态框显示，有阻止页面跳转，关闭最上层模态框
        modalSvc.startChangeState(event, toState, toParams, fromState, fromParams);
    });
}]).value('locationState',{ 
        hasLocation: false,
        locationVisited: false
    }
).constant(
    'appType', 'app'//app or weixin
);