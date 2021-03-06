(function(){
	"use strict";
	google.charts.load('current', {'packages':['corechart']});



	var Routes = function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/home');

		$stateProvider
		.state('home', {
	    url: '/home',
	    templateUrl: 'templates/home.html'
	  })
		.state('user', {
	    url: '/user/{username}',
	    templateUrl: 'templates/user.html',
			controller: "userController"
	  })
		.state('battle', {
	    url: '/battle/{username1}/{username2}',
	    templateUrl: 'templates/battle.html',
			controller: "battleController"
	  });
	};

	Routes.$inject = ['$stateProvider','$urlRouterProvider'];

	angular.module('gulm',['ui.router', "gulm.controllers","gulm.services", "gulm.battle.controllers"])
	.config(Routes);

}());
