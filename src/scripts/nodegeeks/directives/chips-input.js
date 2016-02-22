'use strict';

/**
 * @ngdoc function
 * @name app.controller:SetupCtrl
 * @description
 * # ControllerCtrl
 * Controller of the app
 */
angular.module('nodegeeks-angular')
        .directive('chipsInput', function() {
            return {
                restrict: 'E',
                templateUrl: 'views/directives/chips-input.html',
                scope: {
                    data: '=',
                    model: '=',
                    filterBy: '@'
                },
                link: function(scope, element, attrs, ctrl) {

                }
            };
        });
