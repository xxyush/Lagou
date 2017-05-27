"use strict";

angular.module("myApp").directive("appFoot",[function(){
	return{
		restrict:"A",
		repace:true,
		templateUrl:"views/template/foot.html"
	}
}])