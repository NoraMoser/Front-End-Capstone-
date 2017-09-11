"use strict";

const app = angular.module("RemoteApp", ["ngRoute"]);

app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/initial.html',
        controller: 'initialCtrl'
    })
    .when('/home1', {
		templateUrl: 'partials/home.html',
        controller: 'homeCtrl'
    })
    .when('/exercises', {
		templateUrl: 'partials/exercise123.html',
        controller: 'exerciseCtrl'
    })
    .when('/graph', {
		templateUrl: 'partials/graph.html',
        controller: 'graphCtrl'
    })
    
	.otherwise('/');
});