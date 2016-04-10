(function(){
	"use strict";
	google.charts.load('current', {'packages':['corechart']});
	angular.module('gulm',['ui.router', "gulm.controllers","gulm.services"])
	.config(function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/home');

		$stateProvider
		.state('home', {
	    url: '/home',
	    templateUrl: 'templates/home.html',
	  })
		.state('user', {
	    url: '/user/:username',
	    templateUrl: 'templates/user.html',
			controller: "userController"
	  })
	});

}())
