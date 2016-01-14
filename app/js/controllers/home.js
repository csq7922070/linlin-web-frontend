skhControllers.controller('homeCtrl', ['$scope', '$http', '$stateParams', '$rootScope', '$state', '$location',
        function($scope, $http, $stateParams, $rootScope, $state, $location) {

            var url = $location.url().substring($location.url().indexOf("?"));
            if (url.indexOf("home") != -1) {
                url = "";
            }
            //1.6获取微信用户openid
            if(sessionStorage.getItem("openid")==null){
                $http({
                    method: "GET",
                    url: basePath + '/getopenid' + url
                }).success(function(data) {
                    sessionStorage.setItem("openid", data.openid);

                    console.log("获取openid成功");
                }).error(function(data) {
                    console.log("获取openid失败");
                });
            }

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