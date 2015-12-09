'use strict';

/**
 * @ngdoc function
 * @name app.controller:SetupCtrl
 * @description
 * # ControllerCtrl
 * Controller of the app
 */
angular.module('app')
        .directive('formWizard', function() {
            return {
                restrict: 'E',
                templateUrl: 'views/nodegeeks/directives/form-wizard.html',
                scope: {
                    action: '=',
                    title: '@',
                    steps: '@'
                },
                transclude: true,
                link: function(scope, element, attrs, ctrl, transclude) {
                    scope.allSteps = [];
                    scope.step = {number: 1};
                    scope.percentage = 1 / scope.steps * 100;
                    scope.next = function(){
                        scope.step.number++;
                        scope.percentage = scope.step.number / scope.steps * 100;
                    };
                    scope.back = function(){
                        scope.step.number--;
                        scope.percentage = scope.step.number / scope.steps * 100;
                    };
                    transclude(scope, function(clone, scope) {
                        angular.element(element[0].getElementsByClassName('tab-content')[0]).append(clone);
                    });
                }
            };
        });
