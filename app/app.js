//var basePath = "http://localhost:8080/skh";
//var basePath="http://192.168.0.120:8080/skh";
var basePath = "http://mitest.4zlink.com:8080/mifan";
//var basePath = "http://192.168.0.136:8080/skh";
var appId = "wx050cc99d8cec1a73";

angular.module('app.home', []);
angular.module('app.notice', ['resources.notice']);
angular.module('app.repair', ['resources.repair']);
angular.module('app.shop', ['resources.shop']);
angular.module('app.complain', ['resources.complain']);
angular.module('app.address', ['resources.address']);
angular.module('app.payment', ['resources.address', 'resources.payment']);
angular.module('app.location', []);
angular.module('app.user',[]);
angular.module('app.log',[]);
angular.module('app.auth',[]);
angular.module('app.account',[]);
angular.module('app.verify',[]);
angular.module('app.control',[]);

var myApp = angular.module('myApp', ['ui.router', 'angular-carousel', 'app.home', 'app.repair', 'app.notice', 'app.shop', 
    'app.complain', 'app.address', 'app.payment', 'app.location', 'app.user', 'app.log', 'app.auth', 'app.account', 'app.verify',
    'app.control']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/auto-location");

    $stateProvider
        .state('notice', {
            url: "/notice-list",
            templateUrl: "tpl/notice/notice-list.tpl.html",
            controller: 'noticeListCtrl',
            controllerAs: 'vm'
        })
        .state('notice-detail', {
            url: "/notice/:id",
            templateUrl: "tpl/notice/notice-detail.tpl.html",
            controller: "noticeDetailCtrl",
            controllerAs: 'vm'
        })
        .state('repair', {
            url: "/repair-list",
            templateUrl: "tpl/repair/repair-list.tpl.html",
            controller: 'repairListCtrl',
            controllerAs: 'vm'
        })
        .state('repair-detail', {
            url: "/repair/:id",
            templateUrl: "tpl/repair/repair-detail.tpl.html",
            controller: 'repairDetailCtrl',
            controllerAs: 'vm'
        })
        .state('repair-add', {
            url: "/repair-add",
            templateUrl: "tpl/repair/repair-add.tpl.html", 
            controller: 'repairAddCtrl',
            controllerAs: 'vm'
        })
        .state('complain', {
            url: "/complain-list",
            templateUrl: "tpl/complain/complain-list.tpl.html",
            controller: "complainListCtrl",
            controllerAs: 'vm'
        })
        .state('complain-detail', {
            url: "/complain/:id",
            templateUrl: "tpl/complain/complain-detail.tpl.html",
            controller: "complainDetailCtrl",
            controllerAs: 'vm'
        })
        .state('complain-add', {
            url: "/complain-add",
            templateUrl: "tpl/complain/complain-add.tpl.html",
            controller: "complainAddCtrl",
            controllerAs: 'vm'
        })
        .state('address-edit', {
            url: "/address-edit",
            templateUrl: "tpl/address/address-edit.tpl.html",
            controller: "addressEditCtrl",
            controllerAs: 'vm'
        })
        .state('address-city', {
            url: "/address-city/",
            templateUrl: "tpl/address/city/city.tpl.html",
            controller: "addressCityCtrl",
            controllerAs: 'vm'
        })
        .state('address-village', {
            url: "/address-village/",
            templateUrl: "tpl/address/village/village.tpl.html",
            controller: "addressVillageCtrl",
            controllerAs: 'vm'
        })
        .state('address-block', {
            url: "/address-block/",
            templateUrl: "tpl/address/block/block.tpl.html",
            controller: "addressBlockCtrl",
            controllerAs: 'vm'
        })
        .state('address-unit', {
            url: "/address-unit/",
            templateUrl: "tpl/address/unit/unit.tpl.html",
            controller: "addressUnitCtrl",
            controllerAs: 'vm'
        })
        .state('address-room', {
            url: "/address-room/",
            templateUrl: "tpl/address/room/room.tpl.html",
            controller: "addressRoomCtrl",
            controllerAs: 'vm'
        })
        .state('bill', {
            url: "/bill/",
            templateUrl: "tpl/payment/bill.tpl.html",
            controller: "billCtrl"
        })
        .state('payment', {
            url: "/payment/",
            templateUrl: "tpl/payment/payment.tpl.html",
            controller: "paymentCtrl",
            controllerAs: 'vm'
        })
        .state('payment-list', {
            url: "/payment-list",
            templateUrl: "tpl/payment/payment-list.tpl.html",
            controller: "paymentListCtrl"
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
        .state('auto-location', {
            url: "/auto-location",
            templateUrl: "tpl/location/auto-location.tpl.html",
            controller: "autoLocationCtrl",
            controllerAs: 'vm'
        })
        .state('search-location', {
            url: "/search-location",
            templateUrl: "tpl/location/search-location.tpl.html",
            controller: "searchLocationCtrl",
            controllerAs: 'vm'
        })
        .state('login',{
            url: "/login/:toState",
            templateUrl: "tpl/account/login/login.tpl.html",
            controller: "loginCtrl",
            controllerAs: "vm"
        })
        .state('nickname',{
            url: "/nickname",
            templateUrl: "tpl/account/nickname/nickname.tpl.html",
            controller: "nicknameCtrl",
            controllerAs: "vm"
        })
        .state('account',{
            url: "/account",
            templateUrl: "tpl/account/account.tpl.html",
            controller: "accountCtrl",
            controllerAs: "vm"
        })
        .state('home-nav',{
            url: "/home-nav",
            templateUrl: "tpl/home/home-nav.tpl.html",
            controller: "homeNavCtrl",
            controllerAs: "vm"//,
            // views:{
            //     "home":{
            //         templateUrl:"tpl/home/native-home.tpl.html",
            //         controller: "nativeHomeCtrl",
            //         controllerAs: "vm"
            //     },
            //     "account":{
            //         templateUrl:"tpl/account/account.tpl.html",
            //         controller: "accountCtrl",
            //         controllerAs: "vm"
            //     }
            // }
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
}]).run(['$rootScope', 'auth', 'control', function($rootScope, auth, control) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        control.startChangeState(event, toState, toParams, fromState, fromParams);//为了兼容app和微信公众号的首页不一致问题
        auth.startChangeState(event, toState, toParams, fromState, fromParams);
    });
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
        var url = "/" + to.name.replace(".", "/");
        _hmt.push(['_trackPageview', url]);
    });
}]).value(
    'communityInfo',{
        name: null,
        province: null,
        city: null,
        district: null,
        street: null,
        steetNumber: null,
        address: null,//这是完整的地址
        auth: null//该字段用来判断小区是否为合作小区，值为true or false
    }
).value(
    'addressInfo',{
        city: null,
        community: null,
        block: null,
        unit: null,
        roomInfo: null// object type
    }
).value(
    'locationInfo', {
        longitude: null,//经度
        latitude: null,//纬度
        accuracy: null//位置精度
    }
).value(
    'locationState',{
        hasLocation: false,
        autoLocationVisited: false
    }
).value(
    'appState', {
        visited: false
    }
).constant(
    'appId', appId
).constant(
    'appType', 'app'//app or weixin
);