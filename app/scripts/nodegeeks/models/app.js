/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('app').factory('App', function (DS) {

    var App = DS.Model();

    App.define('app', {

        attributes: {

            name: {
                type: 'string'
            },

            logo: {
                type: 'string',
                defaultsTo: '/assets/images/logo.png'
            },

            description: {
                type: 'string'
            },

            domain: {
                type: 'string'
            },

            company: {
                type: 'string'
            },

            version: {
                type: 'float'
            },

            facebookAPI: {
                type: 'string'
            },

            twitterAPI: {
                type: 'string'
            },

            windowsAPI: {
                type: 'string'
            },

            googleAPI: {
                type: 'string'
            },

            facebookUrl: {
                type: 'string'
            },

            twitterUrl: {
                type: 'string'
            },

            windowsUrl: {
                type: 'string'
            },

            googleUrl: {
                type: 'string'
            }

        }


    });

    return App;

});