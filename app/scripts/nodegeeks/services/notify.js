/**
 * Created by aaronrussell on 11/4/15.
 * @Description:
 */
angular.module('app').service('Auth', function (Profile, $rootScope) {

    function Notify() {}

    //todo: integrate the angular material notification system

    Notify.prototype.alert = function (message, options) {
        alert(message);
    };

    return Notify;

});