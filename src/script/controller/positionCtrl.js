"use strict";

angular.module("myApp").controller("positionCtrl",["$log","$scope","$q","$state","$http","cache",function($log,$scope,$q,$state,$http,cache){
	$scope.isLogin=!!cache.get("name");
	$scope.isActive=true;
	$scope.message="";

function getPosition(){
	var def=$q.defer();
	$http.get("data/position.json",{
		params:
		{
			id:$state.params.id
		}
	}).then(function success(resp) {
		$scope.pos=resp.data;
		def.resolve(resp.data);
		console.log(resp.data);

		if (!!resp.data.posted) {
			$scope.message="已投递";
		}else{
			if ($scope.isLogin) {
				$scope.message="去投递";
			}else{
				$scope.message="去登入";

			}
		}
	},function(err){
		def.reject(err);
	});

	return def.promise;
}
function getCompany(id){
	$http.get("data/company.json",{
		params:{
			id:id
		}
	}).then(function(resp){
		$scope.company=resp.data;
	});
}
getPosition().then(function(obj){
	getCompany(obj.companyId);
});

$scope.go=function(){
	if($scope.message!=="已投递"){
		if ($scope.isLogin) {
			$http.post("data/handle.json",{
				id:$scope.pos.id
			}).then(function(resp){
				$log.info(resp);
				$scope.message="已投递";
			});
		}else{
			$state.go("login");
		}
	}
}

$scope.favorite=function(){
	
}
}]);