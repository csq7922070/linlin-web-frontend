angular.module('app.home').controller('homeCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
    'communityInfo',
    function($scope, $http, $stateParams, $rootScope, $state, $location, communityInfo) {
        $scope.communityName = communityInfo.name.length >4 ? communityInfo.name.substring(0,3)+"..." : communityInfo.name;
        $scope.changeCommunity = function(){
            $state.go('auto-location');
        }

        // var url = $location.url().substring($location.url().indexOf("?"));
        // if (url.indexOf("home") != -1) {
        //     url = "";
        // }
        // //1.6获取微信用户openid
        // if (sessionStorage.getItem("openid") == null) {
        //     $http({
        //         method: "GET",
        //         url: basePath + '/getopenid' + url
        //     }).success(function(data) {
        //         sessionStorage.setItem("openid", data.openid);
        //         //添加微信支付
        //         sessionStorage.setItem("timestamp", data.timestamp);
        //         sessionStorage.setItem("noncestr", data.noncestr);
        //         sessionStorage.setItem("sign", data.sign);
        //         console.log("获取openid成功");
        //     }).error(function(data) {
        //         console.log("获取openid失败");
        //     });
        // }

        $scope.slides7 = [{
            id: 10,
            label: "slide #1",
            img: "images/banner_01.png"
        }, {
            id: 11,
            label: "slide #2",
            img: "images/banner_02.png"
        }, {
            id: 12,
            label: "slide #3",
            img: "images/banner_03.png"
        }];
        $scope.carouselIndex7 = 0;

        $rootScope.site = 1;
        $state.go("home.shop-info", {
            site: 1
        });
    }
]);
