"use strict";
angular.module("myApp").directive("appSheet",function(){
	return{
		restrict:"A",
		replace:true,
		scope:{
			visible:"=",
			list:"=",
			select:"&"
		
		},
		templateUrl:"views/template/sheet.html",
		link:function(scope){	
		    
		}

	}
});