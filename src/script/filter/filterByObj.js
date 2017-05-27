"use strict";
angular.module("myApp").filter("filterByObj",[function(){
	return function(list,obj){

	/*	console.log("list");
		console.log(list);

		console.log("obj");
		console.log(obj);*/


		var result=[];
		angular.forEach(list,function(item){
			var isEqual=true;
			for(var e in obj){
				if (item[e]!==obj[e]) {
					isEqual=false;
				}
			}
			if (isEqual) {
				result.push(item);
			}
		});
/*	console.log("result");
		console.log(result);*/
		return result;
	}
}])