"use strict";

angular.module("myApp").controller("companyCtrl",["$http","$state","$scope",function($http,$state,$scope){
	/*$http.get("data/company.json?id="+$state.params.id).then(function success(resp){
		console.log("company 数据"+resp.data);
		$scope.company=resp.data;
	},function(){
*/
	//})

	$http.get("data/company.json",{
		params:{
			id:$state.params.id
		}
	}).then(function(resp){
		$scope.company=resp.data;
	});
}]);