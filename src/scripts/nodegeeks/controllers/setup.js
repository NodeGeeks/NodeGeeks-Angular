'use strict';

/**
 * @ngdoc function
 * @name app.controller:SetupCtrl
 * @description
 * # ControllerCtrl
 * Controller of the app
 */
angular.module('nodegeeks-angular')
        .controller('SetupCtrl', function ($rootScope, $scope, App, $location) {

            if ($rootScope.app) $location.path('/');

            $scope.setupApp = function(app) {
                App.create(app).then(function(app){
                    $rootScope.app = app;
                    $location.path('/');
                }, function(error) {
                    alert(error.message);
                });
            };
        });
