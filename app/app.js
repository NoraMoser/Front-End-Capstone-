"use strict";

const app = angular.module("RemoteApp", ["ngRoute", "chart.js"]);

let isAuth = (userFactory) => new Promise ( (resolve, reject) => {
    console.log("userFactory is", userFactory);
    userFactory.isAuthenticated()
    .then( (userExists) => {
      if(userExists){
        console.log("Authenticated, go ahead");
        resolve();
      }else {
        console.log("Authentication reject, GO AWAY");
        reject();
      }
    });
  });

app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/initial.html',
        controller: 'initialCtrl'
    })
    .when('/home1', {
		templateUrl: 'partials/home.html',
        controller: 'homeCtrl',
        resolve: {isAuth}        
    })
    .when('/exercises', {
		templateUrl: 'partials/exercise1.html',
        controller: 'exerciseCtrl',
        resolve: {isAuth}        
    })
    .when('/graph', {
		templateUrl: 'partials/graph.html',
        controller: 'graphCtrl',
        resolve: {isAuth}        
    })
    .when('/notes/:id', {
        templateUrl: 'partials/notespage.html',
        controller: 'editCtrl',
        resolve: {isAuth}
    })
    .when('/exercise2/:id', {
        templateUrl: 'partials/exercise2.html',
        controller: 'editCtrl',
        resolve: {isAuth}
    })
    .when('/exercise3/:id', {
        templateUrl: 'partials/exercise3.html',
        controller: 'editCtrl',
        resolve: {isAuth}
    })
    
    .otherwise('/');
});
    app.run(($location, FBCreds) => {
        let creds = FBCreds;
        let authConfig = {
            apiKey: creds.apiKey,
            authDomain: creds.authDomain,
            databaseURL: creds.databaseURL
        };
    
        firebase.initializeApp(authConfig);
    });
    
    app.run(function($rootScope) {
        $rootScope.showSearch = false;
});