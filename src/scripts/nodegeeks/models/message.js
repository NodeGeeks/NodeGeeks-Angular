/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('nodegeeks-angular').factory('Message', function (DS) {

    var Message = DS.Model();

    Message.define('message', {

        attributes: {

            sender: {
                model: 'profile'
            },

            content: {
                type: 'string'
            },

            attachments: {
                collection: 'fileObj'
            },

            conversation: {
                model: 'conversation'
            },

            createdAt: {
                type: 'string',
            },

            timeAgo: function () {
                return '11 seconds ago'
            },

            shortContent: function() {
                if (this.content.length > 49) {
                    return this.content;
                }
                return this.content.substring(0, 50) + '...'
            }

        }

    });

    return Message;

});
