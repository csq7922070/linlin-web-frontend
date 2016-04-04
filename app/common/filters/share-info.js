angular.module('app.share').filter('shareInfo', function(shareTypes) {
    function format(item){
        var newItem = angular.copy(item);
        //以下格式化为了页面显示
        if(newItem.category){//新增技能文本属性
            newItem.skillText = newItem.category.name;//格式："家教 - 英语 数学"
            if(newItem.category.children&&newItem.category.children.length>0){
                newItem.skillText+=" -";
                angular.forEach(newItem.category.children, function(secondarySkill){
                    newItem.skillText+=" "+secondarySkill.name;
                });
            }
        }
        if(newItem.priceType!=undefined){
            var feeType = shareTypes.getFeeType(newItem.priceType);
            newItem.priceUnitText = feeType?feeType.priceUnit:"";//新增价格单位文本属性
            newItem.countUnitText = feeType?feeType.countUnit:"";//新增价格计数单位文本属性
        }
        // if(newItem.average!=undefined){//新增星级文本属性
        //     newItem.starText = newItem.average<=0?"0":(
        //         newItem.average<1?"0_5":(
        //             newItem.average<1.5?"1":(
        //                 newItem.average<2?"1_5":(
        //                     newItem.average<2.5?"2":(
        //                         newItem.average<3?"2_5":(
        //                             newItem.average<3.5?"3":(
        //                                 newItem.average<4?"3_5":(
        //                                     newItem.average<4.5?"4":(
        //                                         newItem.average<5?"4_5":"5")))))))))
        // }
        if(newItem.sexType!=undefined){
            var sexType = shareTypes.getSexType(newItem.sexType);
            newItem.sexText = sexType?sexType.name:"";//新增性别文本属性
        }
        if(newItem.ageType!=undefined){
            var ageType = shareTypes.getAgeType(newItem.ageType);
            newItem.ageText = ageType?ageType.name:"";//新增年龄文本属性
        }
        //end 页面显示格式化处理
        return newItem;
    }

    return function(input) {
        var result = null;
        if(angular.isArray(input)){
            angular.forEach(input,function(item){
                var formatItem = format(item);
                result.push(formatItem);
            });
        }else if(input){
            result = format(input);
        }
        return result;
    };
});