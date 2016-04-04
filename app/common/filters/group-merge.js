angular.module('myApp').filter('groupMerge', function(shareTypes) {
    return function(input) {//input format:[{initial,items:[{},{}]}]
        var result = null;//format:[{},{}]
        if(input){
            result = [];
            angular.forEach(input, function(group){
                if(group.items){
                    angular.forEach(group.items,function(item){
                        result.push(item);
                    });
                }
            });
        }
        return result;
    };
});