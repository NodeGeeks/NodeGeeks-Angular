'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngSails',
    'door3.css'
]).config(function ($routeProvider, $sailsProvider, $locationProvider) {
    $sailsProvider.url = 'http://localhost:1337';
    $routeProvider
            .when('/login', {
                templateUrl: 'views/nodegeeks/login.html',
                controller: 'AuthCtrl'
            })
            .when('/signup', {
                templateUrl: 'views/nodegeeks/signup.html',
                controller: 'AuthCtrl'
            })
            .when('/recover', {
                templateUrl: 'views/nodegeeks/recover.html',
                controller: 'AuthCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'views/nodegeeks/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/setup', {
                templateUrl: 'views/nodegeeks/setup.html',
                controller: 'SetupCtrl'
            })
            .when('/', {
                templateUrl: 'views/nodegeeks/landing.html',
                controller: 'CountdownCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
}).run(function ($rootScope, App) {
            App.findAll(1).then(function(apps){
                $rootScope.app = apps[0];
            });
            $rootScope.session = {};
        }
);
