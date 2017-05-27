"use strict";

angular.module("myApp").controller("searchCtrl",["dict","$http","$scope",function(dict,$http,$scope){
	$scope.searchName='';
/*	$scope.visible=false;
*/	$scope.search=function(){
		$http.get("data/positionList.json",{
			params:{
				name:$scope.searchName
			}
		}).then(function(resp){
		$scope.posList=resp.data;
	});
	}
	$scope.search();
	$scope.sheet={

	};
	$scope.sheet.visible=false;
	$scope.sheet.list=["1","2","3"];
	$scope.tabId="";
	$scope.tClick=function(id,name){
		$scope.sheet.list=dict[id];
		$scope.sheet.visible=true;
		$scope.tabId=id;
	};
	$scope.tabList=[{
		id:"city",
		name:"城市"
	},{
		id:"salary",
		name:"薪水"
	},{
		id:"scale",
		name:"公司规模"
	}];
	$scope.filterObj={};
    $scope.cClick=function(id,name){
    	if (id) {
    		angular.forEach($scope.tabList,function(item){
    			if ($scope.tabId==item.id) {
    				item.name=name;
    		}
    		$scope.filterObj[$scope.tabId+"Id"]=id;
    	});
    	}else{
    		delete $scope.filterObj[$scope.tabId+"Id"]
    		angular.forEach($scope.tabList,function(item){
    			if ($scope.tabId==item.id) {
					switch(item.id){
    					case "city":item.name="城市";break;
    					case "salary":item.name="薪水";break;
    					case "scale":item.name="公司规模";break;
    					default:
    			}    }
    	});
    		
    	}    	
    }
}]);