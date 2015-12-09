/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('app').factory('Notification', function (DS) {

    var Notification = DS.Model();

    Notification.define('notification', {

        attributes: {

            subject: {
                type: 'string'
            },

            type: {
                type: 'string'
            },

            content: {
                type: 'string'
            },

            isUnread: {
                type: 'boolean',
                defaultsTo: true
            },

            profile: {
                model: 'Profile'
            }

        }

    });

    return Notification;

});