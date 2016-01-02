'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('nodegeeks-angular')
        .controller('AuthCtrl', function ($scope, Auth) {
            $scope.login = Auth.login;
            $scope.signup = Auth.signup;
            $scope.social = Auth.social;
            $scope.recover = Auth.recover;
            $scope.logout = Auth.logout;
            $scope.validate = Auth.validate;

        });
