/**
 * Created by aaronrussell on 11/4/15.
 * @Description:
 */
angular.module('app').service('LocalStorage', function () {

    return {
        getItem: function(key) {
            var value = localStorage.getItem(key);
            var parsedValue = JSON.parse(value);
            if (parsedValue) return parsedValue;
            return value;

        },
        setItem: function(key, value) {
            if (value.constructor == Object || value.constructor == Array) {
                return localStorage.setItem(key, JSON.stringify(value));
            }
            if (value.constructor == Function) {
                return console.error('Cannot set a function as a value');
            }
            return localStorage.setItem(key, value);
        }
    }

});