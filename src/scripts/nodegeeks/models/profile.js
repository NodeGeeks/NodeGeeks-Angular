/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('nodegeeks-angular').factory('Profile', function (DS) {

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

            name: function(){
                return this.firstName + ' ' + this.lastName;
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

            isActivated: {
                type: 'boolean',
                defaultsTo: false
            },

            notifications: {
                collection: 'notification'
            },

            unreadNotifications: function () {
                return this.notifications.filter(function(notification) {
                    return notification.isUnread;
                });
            },

            unreadConversations: function () {
                return this.conversations.filter(function(conversation) {
                    return conversation.isUnread;
                });
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
