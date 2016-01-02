/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('nodegeeks-angular').factory('Issue', function (DS) {

    var Issue = DS.Model();

    Issue.define('issue', {

        attributes: {

            profile: {
                model: 'Profile'
            },

            description: {
                type: 'string'
            },

            status: {
                type: 'string',
                enum: ['closed', 'open', 'resolved']
            },

            messages: {
                collection: 'Message'
            }
        }

    });

    return Issue;

});
