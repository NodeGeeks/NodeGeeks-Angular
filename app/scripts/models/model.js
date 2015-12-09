/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('app').factory('ModelXYZ', function ($rootScope) {

    var ModelXYZ = $rootScope.DS.Model();

    ModelXYZ.define('modelxyz', {

        attributes: {
            

        }

    });

    return ModelXYZ;

});