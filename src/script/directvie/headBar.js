"use strict";

angular.module("myApp").directive("appHeaderBar",function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"views/template/headerBar.html",
		scope:{
			text:"@headerText"
		},
		link:function(scope,ele,attr){
			scope.back=function(){
				window.history.back();
			}
		}
	}
});