var basePath = "http://mifan.4zlink.com:8080/mifan";
//var basePath = "http://localhost:8080/skh";
//var basePath = "http://192.168.0.117:8080/skh";

var skhControllers = angular.module('skhControllers', ['ui.router']);
var myApp = angular.module('myApp', ['ui.router', 'angular-carousel', 'skhControllers']);

myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('notice', {
            url: "/notice/list",
            templateUrl: "tpl/notice/notice.list.html",
            controller: 'noticeListCtrl'
        })
        .state('notice-detail', {
            url: "/notice/:id",
            templateUrl: "tpl/notice/notice.detail.html",
            controller: "noticeDetailCtrl"
        })
        .state('repair', {
            url: "/repair-list",
            templateUrl: "tpl/repair/repair.list.html",
            controller: 'repairListCtrl'
        })
        .state('repair-detail', {
            url: "/repair/:id",
            templateUrl: "tpl/repair/repair.detail.html",
            controller: 'repairDetailCtrl'
        })
        .state('repair-add', {
            url: "/repair-add",
            templateUrl: "tpl/repair/repair.add.html",
            controller: 'repairAddCtrl'
        })
        .state('complain', {
            url: "/complain-list",
            templateUrl: "tpl/complain/complain.list.html",
            controller: "complainListCtrl"
        })
        .state('complain-detail', {
            url: "/complain/:id",
            templateUrl: "tpl/complain/complain.detail.html",
            controller: "complainDetailCtrl"
        })
        .state('complain-add', {
            url: "/complain-add",
            templateUrl: "tpl/complain/complain.add.html",
            controller: "complainAddCtrl"
        })
        .state('address', {
            url: "/address",
            templateUrl: "tpl/service/address.html"
        })
        .state('address-floor', {
            url: "/address-floor/",
            templateUrl: "tpl/address/block/block.html",
            controller: "addressFloorCtrl"
        })
        .state('address-unit', {
            url: "/address-unit/:floor",
            templateUrl: "tpl/address/unit/unit.html",
            controller: "addressUnitCtrl"
        })
        .state('address-room', {
            url: "/address-room/:floor/:unit",
            templateUrl: "tpl/address/room/room.html",
            controller: "addressRoomCtrl"
        })
        .state('address-final', {
            url: "/address-final/:id/:floor/:unit/:room/:username/:initial",
            templateUrl: "tpl/service/address.html",
            controller: "addressCtrl"
        })
        .state('account', {
            url: "/account/:floor/:unit/:room/:id/:username",
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
            templateUrl: "tpl/home/home.html",
            controller: "homeCtrl"
        })
        .state('home.shop-info', {
            url: "/shop-info/:site",
            templateUrl: "tpl/shop/shop-info.html",
            controller: "shopInfoCtrl"
        })
        .state('owner-address', {
            url: "/owner-address",
            templateUrl: "tpl/service/owner-address.html",
            controller: "ownerCtrl"
        })
        .state('account-record', {
            url: "/account-record/:id",
            templateUrl: "tpl/service/account-record.html",
            controller: "accountRecordCtrl"
        })
        .state('html-error', {
            url: "/html-error",
            templateUrl: "tpl/home/html-error.html"
        });
}]).config(['$httpProvider', function ($httpProvider) {
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
}]).run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
        //console.log('Previous state:' + $rootScope.previousState);
        //console.log('Current state:' + $rootScope.currentState);
        _hmt.push(['_trackPageview', to.name]);
    });
}]);
