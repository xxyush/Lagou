"use strict";

angular.module("myApp").directive("appHeadFirst",[function(){
	return{
		restrict:"A",
		repace:true,
		templateUrl:"views/template/headFirst.html"
	}
}])