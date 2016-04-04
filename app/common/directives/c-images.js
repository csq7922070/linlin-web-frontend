myApp.directive('cImages', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            images:'=',//format:[{dataUrl},{}],
            onComplete : '&',//以后会废弃的回调函数
            onAdd:'&',//添加图片时的回调函数
            onAddComplete:'&',//添加图片成功后的回调函数
            onAddError:'&',//添加图片失败时的回调函数
            mode:'@',//'add' or 'browse',default 'add'
            onSelect:'&',//在点击单个图片时发生
            disableFullImage:'@',//禁用全屏图片功能，默认为false不禁用
            showLoading:'='
        },
        templateUrl: 'tpl/common/directives/c-images.tpl.html',
        link: function($scope, element, attrs) {
            var fileUpload = element[0].querySelector("input[type='file']");
            fileUpload.onchange = function(){
                if(fileUpload.files.length>0){
                    $scope.addImage(fileUpload.files);
                }
            }
        },
        controller: function($scope,$timeout){
            $scope.mode = "add";
            $scope.disableFullImage = "false";

            $scope.addImage = function(files){
                if(files&&files.length>0){
                    $scope.showLoading = true;
                    $scope.onAdd();
                    var addCompleteCount = 0;
                    for(var i = 0;i<files.length;i++){
                        var item = files[i];
                        var reader = new FileReader();
                        reader.readAsDataURL(item);
                        reader.onload = function(e){
                            $scope.$apply(function(){
                                $scope.images.push({dataUrl:e.target.result}); 
                            });
                            $scope.onComplete({images:$scope.images});//以后会删除
                            addCompleteCount++;
                            if(addCompleteCount==files.length){
                                hideLoading();
                                $scope.onAddComplete();
                            }
                        }
                        reader.onerror = function(e){
                            console.log(e);
                            hideLoading();
                            $scope.onAddError({e:e});
                        }
                    };
                }
            }

            function hideLoading(){
                $scope.$apply(function(){
                    $scope.showLoading = false;
                });
            }

            $scope.deleteImage = function(img){
                if($scope.images){
                    for(var i = 0;i<$scope.images.length;i++){
                        var item = $scope.images[i];
                        if(item == img){
                            $scope.images.splice(i,1);
                            break;
                        }
                    }
                }
            }

            $scope.select = function(img){
                if($scope.disableFullImage=="true"){
                    $scope.onSelect({img:img});
                }else{
                    $scope.fullImage = img;
                    $scope.showFullImage = true;
                }
            }
        }
    }
})