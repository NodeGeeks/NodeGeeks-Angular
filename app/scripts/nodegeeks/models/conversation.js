/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('app').factory('Conversation', function (DS, $filter) {

    var Conversation = DS.Model();

    Conversation.define('conversation', {

        attributes: {

            messages: {
                collection: 'message'
            },

            participants: {
                collection: 'profile'
            },

            lastMessage: function() {
                if (this.messages.length) {
                    var lastMessage = $filter('orderBy')(this.messages, 'createdAt', true)[0];
                    return lastMessage.sender.firstName + " say's: " + lastMessage.content;
                }
            }

        }

    });

    return Conversation;

});