/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('app').factory('Social', function (DS) {

    var Social = DS.Model();

    Social.define('social', {

        attributes: {

            network: {
                type: 'string'
            },

            profile: {
                model: 'Profile'
            }

        }

    });

    return Social;

});