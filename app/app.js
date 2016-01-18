var basePath = "http://mifan.4zlink.com:8080/mifan";
// var basePath = "http://localhost:8080/skh";
// var basePath = "http://192.168.0.117:8080/skh";

var skhControllers = angular.module('skhControllers', []);

angular.module('app.home', []);
angular.module('app.notice', ['resources.notice']);
angular.module('app.repair', ['resources.repair']);
angular.module('app.shop', ['resources.shop']);
angular.module('app.complain', ['resources.complain']);

var myApp = angular.module('myApp', ['ui.router', 'angular-carousel', 'app.home', 'app.repair', 'app.notice', 'app.shop', 'skhControllers']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('notice', {
            url: "/notice-list",
            templateUrl: "tpl/notice/notice-list.tpl.html",
            controller: 'noticeListCtrl',
            controllerAs:'vm'
        })
        .state('notice-detail', {
            url: "/notice/:id",
            templateUrl: "tpl/notice/notice-detail.tpl.html",
            controller: "noticeDetailCtrl",
            controllerAs:'vm'
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
            controller: "complainListCtrl"
        })
        .state('complain-detail', {
            url: "/complain/:id",
            templateUrl: "tpl/complain/complain-detail.tpl.html",
            controller: "complainDetailCtrl"
        })
        .state('complain-add', {
            url: "/complain-add",
            templateUrl: "tpl/complain/complain-add.tpl.html",
            controller: "complainAddCtrl"
        })
        .state('address-edit', {
            url: "/address-edit",
            templateUrl: "tpl/address/address-edit.tpl.html"
        })
        .state('address-block', {
            url: "/address-block/",
            templateUrl: "tpl/address/block/block.tpl.html",
            controller: "addressBlockCtrl"
        })
        .state('address-unit', {
            url: "/address-unit/:block",
            templateUrl: "tpl/address/unit/unit.tpl.html",
            controller: "addressUnitCtrl"
        })
        .state('address-room', {
            url: "/address-room/:block/:unit",
            templateUrl: "tpl/address/room/room.tpl.html",
            controller: "addressRoomCtrl"
        })
        .state('address', {
            url: "/address/:id/:block/:unit/:room/:username/:initial",
            templateUrl: "tpl/address/address-edit.tpl.html",
            controller: "addressCtrl"
        })
        .state('address-list', {
            url: "/address-list",
            templateUrl: "tpl/address/address-list.tpl.html",
            controller: "addressListCtrl"
        })
        .state('bill', {
            url: "/bill/:block/:unit/:room/:id/:username",
            templateUrl: "tpl/payment/bill.tpl.html",
            controller: "billCtrl"
        })
        .state('payment', {
            url: "/payment",
            templateUrl: "tpl/payment/payment.tpl.html",
            controller: "paymentCtrl"
        })
        .state('payment-list', {
            url: "/payment-list/:id",
            templateUrl: "tpl/payment/payment-list.tpl.html",
            controller: "paymentListCtrl"
        })
        .state('home', {
            url: "/home",
            templateUrl: "tpl/home/home.tpl.html",
            controller: "homeCtrl"
        })
        .state('home.shop-info', {
            url: "/shop-info/:site",
            templateUrl: "tpl/shop/shop-info.tpl.html",
            controller: "shopInfoCtrl"
        })
        .state('html-error', {
            url: "/html-error",
            templateUrl: "tpl/home/html-error.tpl.html"
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
}]).run(['$rootScope', function($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
        //console.log('Previous state:' + $rootScope.previousState);
        //console.log('Current state:' + $rootScope.currentState);
        _hmt.push(['_trackPageview', to.name]);
    });
}]);
