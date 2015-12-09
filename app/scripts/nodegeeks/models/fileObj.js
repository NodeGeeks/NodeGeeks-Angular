/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('app').factory('FileObj', function (DS) {

    var FileObj = DS.Model();

    FileObj.define('fileObj', {

        attributes: {

            path: {
                type: 'string'
            },

            mime: {
                type: 'string'
            },

            size: {
                type: 'integer'
            }
        }

    });

    return FileObj;

});