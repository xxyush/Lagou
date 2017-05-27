"use strict";

angular.module("myApp").controller("mainCtrl",["$http","$scope",function($http,$scope){
	$http.get("data/positionList.json").then(function(resp){
		$scope.lists=resp.data;
	},function(){

	});
}]);