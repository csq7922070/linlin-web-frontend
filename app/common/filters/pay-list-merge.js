angular.module('myApp').filter('payListMerge', function() {
    return function(input) {
        var result = [];//新增属性waterDates,elecDates,waterDateText,elecDateText
        for(var i = 0;i<input.length;i++){
            var item = input[i];
            var find = false;
            for(var j = 0;j<result.length;j++){
                var temp = result[j];
                if(item.payDate == temp.payDate && item.ownerName == temp.ownerName){
                    find = true;
                    break;
                }
            }
            if(find){
                temp.amount+=item.amount;
                if(item.type == "0"){
                    temp.waterDates.push({year: parseInt(item.year),month: parseInt(item.month)});
                }else{// is "1"
                    temp.elecDates.push({year: parseInt(item.year),month: parseInt(item.month)});
                }
            }else{
                var newItem = angular.copy(item);
                newItem.waterDates = [];
                newItem.elecDates = [];
                if(item.type == "0"){
                    newItem.waterDates.push({year: parseInt(item.year),month: parseInt(item.month)});
                }else{// is "1"
                    newItem.elecDates.push({year: parseInt(item.year),month: parseInt(item.month)});
                }
                result.push(newItem);
            }
        }
        //对数组result中每个元素中的水费和电费日期分别进行合并处理，比如2015年2月、2015年3月合并为2015年2-3月
        //2015年2月，2015年3月，2015年5月合并为2015年2、3月等
        //2015年12月、2016年1月合并为2015年12月、2016年1月
        for(var i = 0;i<result.length;i++){
            var item = result[i];
            //将item对象的属性waterDates和elecDates2个数组按照年月进行升序排序处理
            item.waterDates.sort(compareDate);
            item.elecDates.sort(compareDate);

            item.waterDateText = getDateText(item.waterDates);
            item.elecDateText = getDateText(item.elecDates);
        }

        function compareDate(prev, next){
            if(prev.year < next.year || (prev.year == next.year && prev.month < next.month)){
                return -1;
            }else if(prev.year == next.year && prev.month == next.month){
                return 0;
            }else{
                return 1;
            }
        }

        function getDateText(dates){
            var sections = getDateSections(dates);
            var text = "";
            if(sections.length > 0){
                text = sections[0].dateText;
            }
            if(sections.length > 1){
                if(sections[0].length == 1){
                    if(sections[1].sy == sections[0].ey)
                        text = text.substr(0, text.length - 1);//同年情况下去掉前一个日期结尾的“月”
                    text+="、";
                    if(sections[1].sy == sections[0].ey)
                        text += sections[1].dateTextWithoutYear;
                    else{
                        text += sections[1].dateText;
                    }
                    if(sections.length > 2)
                        text+="等";
                }else if(sections[0].length > 1){
                    text+="等";
                }
            }
            
            return text;
        }

        function getDateSections(dates){
            var sections = [];
            if(dates.length > 0){
                sections.push({sy:dates[0].year,sm:dates[0].month,ey:dates[0].year,em:dates[0].month,length:1});
            }
            var prev = sections.length > 0 ? sections[0] : null;
            for(var i = 1;i<dates.length;i++){
                if(prev.ey == dates[i].year && prev.em == dates[i].month - 1){
                    prev.em = dates[i].month;
                    prev.length++;
                }else{
                    prev = dates[i];
                    sections.push({sy:prev.year,sm:prev.month,ey:prev.year,em:prev.month,length:1});
                }
            }
            for(var i = 0;i<sections.length;i++){
                sections[i].dateText = getSectionDateText(sections[i]);
                sections[i].dateTextWithoutYear = getSectionDateTextWithoutYear(sections[i]);
            }
            return sections;
        }

        function getSectionDateText(section){
            var text = "";
            if(section.length == 1){
                text = section.sy +"年"+section.sm+"月";
            }else if(section.length > 1){
                text = section.sy +"年"+section.sm+"-" + section.em + "月";
            }
            return text;
        }

        function getSectionDateTextWithoutYear(section){
            var text = "";
            if(section.length == 1){
                text = section.sm+"月";
            }else if(section.length > 1){
                text = section.sm+"-" + section.em + "月";
            }
            return text;
        }

        return result;
    };
});