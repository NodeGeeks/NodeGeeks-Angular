'use strict';

/**
 * @ngdoc function
 * @name app.controller:SetupCtrl
 * @description
 * # ControllerCtrl
 * Controller of the app
 */
angular.module('app')
        .directive('formWizardStep', function() {
            return {
                restrict: 'E',
                templateUrl: 'views/nodegeeks/directives/form-wizard-step.html',
                scope: {
                    title: '@',
                    number: '@',
                    scope: '=scope'
                },
                transclude:true,
                link: function(scope, element, attrs, ctrl, transclude) {
                    scope.$parent.allSteps.push(scope);
                    if (scope.$parent.step == scope.number) {
                        scope.$parent.step = scope;
                    }
                    transclude(scope, function(clone, scope) {
                        angular.element(element[0].getElementsByClassName('sub-elements')[0]).append(clone);
                    });
                }
            };
        });
