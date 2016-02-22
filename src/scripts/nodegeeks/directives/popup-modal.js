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
                templateUrl: 'views/directives/popup-modal.html',
                scope: {
                    title: '@',
                    cancelText: '@',
                    confirmText: '@',
                    confirmAction: '@',
                    name: '@'
                },
                link: function(scope, element, attrs, ctrl) {

                }
            };
        })
        .directive('openModal', function() {
            return {
                restrict: 'A',
                templateUrl: 'views/directives/popup-modal.html',
                link: function(scope, element, attrs, ctrl) {
                    debugger
                    element.on('click', function(){
                        debugger
                    })
                }
            };
        })
        .service('PopupModal', function(){
            return {
                open: function(modalName){
                    debugger
                },
                close: function() {
                    
                }
            }
        });
