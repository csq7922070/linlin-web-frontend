//var basePath="http://192.168.0.128:8080/skh";
var basePath="http://123.56.162.201/skh";
//var basePath="http://192.168.0.119:8080/skh";

var myApp = angular.module('myApp', ['ui.router', 'angular-carousel', 'skhControllers']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('notice', {
            url: "/notice/list",
            templateUrl: "tpl/notice/notice.list.htm",
            controller: 'noticeListCtrl'
        })
        .state('notice-detail', {
            url: "/notice/:id",
            templateUrl: "tpl/notice/notice.detail.htm",
            controller: "noticeDetailCtrl"
        })
        .state('repair', {
            url: "/repair-list",
            templateUrl: "tpl/repair/repair.list.htm",
            controller: 'repairListCtrl'
        })
        .state('repair-detail', {
            url: "/repair/:id",
            templateUrl: "tpl/repair/repair.detail.htm",
            controller: 'repairDetailCtrl'
        })
        .state('repair-add', {
            url: "/repair-add",
            templateUrl: "tpl/repair/repair.add.htm",
            controller: 'repairAddCtrl'
        })
        .state('complain', {
            url: "/complain-list",
            templateUrl: "tpl/complain/complain.list.htm",
            controller: "complainListCtrl"
        })
        .state('complain-detail', {
            url: "/complain/:id",
            templateUrl: "tpl/complain/complain.detail.htm",
            controller: "complainDetailCtrl"
        })
        .state('complain-add', {
            url: "/complain-add",
            templateUrl: "tpl/complain/complain.add.htm",
            controller: "complainAddCtrl"
        })
        .state('address', {
            url: "/address",
            templateUrl: "tpl/service/address.html"
        })
        .state('address-floor', {
            url: "/address-floor/",
            templateUrl: "tpl/service/address-floor.html",
            controller: "addressFloorCtrl"
        })
        .state('address-unit', {
            url: "/address-unit/:floor",
            templateUrl: "tpl/service/address-unit.html",
            controller: "addressUnitCtrl"
        })
        .state('address-room', {
            url: "/address-room/:floor/:unit",
            templateUrl: "tpl/service/address-room.html",
            controller: "addressRoomCtrl"
        })
         .state('address-final', {
            url: "/address-final/:floor/:unit/:room",
            templateUrl: "tpl/service/address.html",
            controller: "addressCtrl"
        })
        .state('account', {
            url: "/account/:floor/:unit/:room",
            templateUrl: "tpl/service/account.html",
            controller: "accountCtrl"
        })
        .state('payment', {
            url: "/payment",
            templateUrl: "tpl/service/payment.html",
            controller: "paymentCtrl"
        })
        .state('home', {
            url: "/home",
            templateUrl: "tpl/index/home.html",
            controller: "homeCtrl"
        })
        .state('home.shop-info', {
            url: "/shop-info/:site",
            templateUrl: "tpl/index/shop-info.html",
            controller: "shopInfoCtrl"
        })
        .state('owner-address', {
            url: "/owner-address",
            templateUrl: "tpl/service/owner-address.html",
            controller: "ownerCtrl"
        })
        .state('account-record', {
            url: "/account-record",
            templateUrl: "tpl/service/account-record.html",
            controller: "accountRecordCtrl"
        })

    ;
}).config(function ($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
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
}).run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
        console.log('Previous state:' + $rootScope.previousState);
        console.log('Current state:' + $rootScope.currentState);
    });
}]);
