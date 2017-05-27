"use strict";
angular.module("myApp").directive("appTab",function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"views/template/tab.html",
		scope:{
			tabClick:"&",
			list:"="
		},
		link:function($scope){
				$scope.click=function(item){
				$scope.selectId=item.id;
				$scope.tabClick(item);
			}
		}

	}
});