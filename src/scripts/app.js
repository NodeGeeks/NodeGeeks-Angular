'use strict';

/**
 * @ngdoc overview
 * @name nodegeeks-angular
 * @description
 * # nodegeeks-angular
 *
 * Main module of the Framework.
 */
angular.module('nodegeeks-angular', [
    'ngSails'
]).config(function ($sailsProvider) {
    $sailsProvider.url = 'http://localhost:1337';
    $sailsProvider.debug = true;
    //todo: add statement that checks if its served up or being built, if serve hit local api, if build --environment
});
