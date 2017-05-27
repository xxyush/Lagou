'use strict';

myApp.config(["$stateProvider", '$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url: '/main',
		templateUrl: 'views/main.html',
		controller: 'mainCtrl'
	}).state("position",{
		url:"/position/:id",
		templateUrl:"views/position.html",
		controller:"positionCtrl"
	}).state("company",{
		url:"/company/:id",
		templateUrl:"views/company.html",
		controller:"companyCtrl"
	}).state("search",{
		url:"/search",
		templateUrl:"views/search.html",
		controller:"searchCtrl"
	}).state("me",{
		url:"/me",
		templateUrl:"views/me.html",
		controller:"meCtrl"
	}).state("login",{
		url:"/login",
		templateUrl:"views/login.html",
		controller:"loginCtrl"
	}).state("register",{
		url:"/register",
		templateUrl:"views/register.html",
		controller:"registerCtrl"
	}).state("post",{
		url:"/post",
		templateUrl:"views/post.html",
		controller:"postCtrl"
	}).state("favorite",{
		url:"/favorite",
		templateUrl:"views/favorite.html",
		controller:"favoriteCtrl"
	}).state("config",{
		url:"/config",
		templateUrl:"views/config.html",
		controller:"configCtrl"
	}).state("feedback",{
		url:"/feedback",
		templateUrl:"views/feedback.html",
		controller:"feedbackCtrl"
	}).state("resume",{
		url:"/resume",
		templateUrl:"views/resume.html",
		controller:"resumeCtrl"
	})
	 $urlRouterProvider.otherwise('main');
	
}])
