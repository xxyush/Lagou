"use strict";
angular.module("myApp").controller("meCtrl",['$http','$scope',"$state",'cache',function($http,$scope,$state,cache){
     $scope.isLogin=!!cache.get("name");
     $scope.message="职场没有过客";

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
     $scope.goPost=function(){
          $scope.isLogin=!!cache.get("name");
          if ($scope.isLogin) {
            $state.go("post");   
          }else{
             $state.go("login");  
          }
        
     }
       $scope.goFavorite=function(){
          $scope.isLogin=!!cache.get("name");
          if ($scope.isLogin) {
            $state.go("favorite");   
          }else{
             $state.go("login");  
          }
        
     }

     $scope.resume=function(){
      $scope.isLogin=!!cache.get("name");
      if ($scope.isLogin) {
        $state.go("resume");
      }else{
        $state.go("login");
      }
    }

     }]);