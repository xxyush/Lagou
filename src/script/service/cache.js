/*"use strict";

angualr.module("myApp").service("cache",["$cookies",function($cookies){

	this.put=functuon(key,value){
		$cookies.put(key,value)
	}
	this.get=function(key){
		return $cookies.get(key);
	};
	this.remove=function(key){
	return $cookies.remove(key);
	};
}]);*/


'use strict';
angular.module('myApp').service('cache', ['$cookies', function($cookies){
    this.put = function(key, value){
      $cookies.put(key, value);
    };
    this.get = function(key) {
      return $cookies.get(key);
    };
    this.remove = function(key) {
      $cookies.remove(key);
    };
}]);
