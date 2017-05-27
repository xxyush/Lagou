"use strict";

angular.module("myApp").directive("appPositionClass",function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"views/template/positionClass.html",
		scope:{
			company:"="
		},
		link:function(scope){
			
			scope.showPositionList=function(index){
				scope.positionList=scope.company.positionClass[index].positionList;
				scope.isActive=index;
			}
			/*scope.isActive=0;
			scope.positionList=scope.showPositionList(0);*/
			scope.$watch('company', function(newVal){
        		if(newVal) scope.showPositionList(0);
     		 });
		}
	}
});
/*
angular.module("myApp").directive("appPositionClass",function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"views/template/positionClass.html",
	}
});
*/