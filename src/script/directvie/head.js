'use strict';

angular.module("myApp").directive("appHead",['cache',function(cache){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"views/template/head.html",
		link:function($scope){
			$scope.name=cache.get("name");
		}
	}
}])