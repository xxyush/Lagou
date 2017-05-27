"use strict";
angular.module("myApp").controller("postCtrl",['$http','$scope',function($http,$scope){
	$scope.tabList=[{
		id:"all",
		name:"全部"
	},{
		id:"pass",
		name:"面试邀请"
	},{
		id:"fail",
		name:"不合适"
	}];
	$scope.myPost="";
	$http.get("data/myPost.json").then(function(resp){
		$scope.myPost=resp.data;
		console.log(resp);
	})
	$scope.filterObj={};
	$scope.tClick=function(id,name){
		switch(id){
			case 'all':delete $scope.filterObj.state;break;
			case 'pass':$scope.filterObj.state="1";break;
			case 'fail':$scope.filterObj.state="-1";break;
			default:

		}

	}
}]);