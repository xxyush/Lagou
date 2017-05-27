"use strict";
angular.module("myApp").controller("configCtrl",['$http','$scope','$state',"cache",function($http,$scope,$state,cache){
/*	$http.get("data/myFavorite.json").then(function(resp){
	   $scope.list=resp.data;
	});*/
	  $scope.isLogin=!!cache.get("name");
     if (cache.get('name')) {
     	   $scope.name=cache.get('name');
     	   $scope.image=cache.get('image');
     	   $scope.id=cache.get('id');
             $scope.message=cache.get('desc');
           
     }
    $scope.logout=function(){
     	cache.remove("id");
     	cache.remove("name");
     	cache.remove("image");
     	$state.go("main");
     }

     $scope.login=function(){
     	$state.go("login");
     }
	}]);