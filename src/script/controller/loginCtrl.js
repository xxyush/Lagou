"use strict";

angular.module("myApp").controller("loginCtrl",["$http","$scope","$state","cache",function($http,$scope,$state,cache){
/*	$http.get("data/positionList.json").then(function(resp){
		$scope.lists=resp.data;
	},function(){

	});*/
	$scope.goback=function(){
		window.history.back();
	}
	$scope.submit=function(){
		$http.post("data/login.json",$scope.user).then(function(resp){
			cache.put("id",resp.data.id);
			cache.put("name",resp.data.name);
			cache.put("image",resp.data.image);
			cache.put("desc",resp.data.describle);
			console.log(resp.data);
			$state.go("main");
		})
	}
}]);