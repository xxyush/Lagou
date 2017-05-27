"use strict";
angular.module("myApp").controller("feedbackCtrl",['$http','$scope',function($http,$scope){
	$http.get("data/feedbackType.json").then(function(resp){
	   $scope.sgttype=resp.data;
	});
	$scope.feedback={}
	$scope.selectType="s1";
	$scope.click=function(item){
		$scope.selectType=item.id;
	    $scope.feedback.id=item.id;
	}



	$scope.submit=function(){
		$http.post("data/feedback.json",$scope.feedback).then(function(resp){
			console.log(resp.data);
		});
	}

}]);