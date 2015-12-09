/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('app').factory('Profile', function (DS) {

    var Profile = DS.Model();

    Profile.define('profile', {

        attributes: {

            firstName: {
                type: 'string',
                required: true
            },

            lastName: {
                type: 'string',
                required: true
            },

            username: {
                type: 'string'
            },

            email: {
                type: 'email'
            },

            password: {
                type: 'string'
            },

            token: {
                type: 'string'
            },

            role: {
                type: 'string',
                enum: ['admin', 'moderator', 'billing', 'developer', 'member'],
                defaultsTo: 'member'
            },

            image: {
                type: 'string'
            },

            dob: {
                type: 'date'
            },

            isActive: {
                type: 'boolean',
                defaultsTo: false
            },

            notifications: {
                collection: 'notification'
            },

            conversations: {
                collection: 'conversation'
            },

            socialProfiles: {
                collection: 'social'
            },

            issues: {
                collection: 'issue'
            }

        }

    });

    return Profile;

});