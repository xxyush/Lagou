"use strict";
angular.module("myApp").config(["$provide",function($provide){
	$provide.decorator("$http",["$delegate","$q",function($delegate,$q){
		$delegate.post=function(url,data,config){
			var def=$q.defer();
			$delegate.get(url).then(function(resp){
				def.resolve(resp);
			},function(error){
				def.reject(error);
			});
			return {
				then:function(scb,ecb){
					def.promise.then(scb,ecb);
				}
			}
		};
		return $delegate;
	}])
}])