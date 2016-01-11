/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('nodegeeks-angular').factory('Notification', function (DS) {

    var Notification = DS.Model();

    Notification.define('notification', {

        attributes: {

            subject: {
                type: 'string'
            },

            type: {
                type: 'string'
            },

            typeId: {
                type: 'string'
            },

            timeAgo: function () {
                return 'Earlier';
            },

            routePath: function () {
                switch (this.type) {
                    case 'message':
                        return '/dashboard/inbox/' + this.typeId;
                        break;
                    case 'friend-request':
                        return '/profile/' + this.typeId;
                        break;
                    case 'comment-approval':
                        return '/dashboard/article/' + this.typeId;
                        break;
                    default:
                        return '/dashboard/inbox/notifications';
                        break;
                }
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
