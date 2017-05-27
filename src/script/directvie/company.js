"use strict";

angular.module("myApp").directive("appCompany", function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"views/template/company.html",
		scope:{
			company:"="
		},
		link:function(scope){
			//console.log(scope.company);
     	}
	};
});