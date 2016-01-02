/**
 * Created by aaronrussell on 11/4/15.
 * @Description:
 */
angular.module('nodegeeks-angular').service('LocalStorage', function (DS) {

    return {
        getItem: function (key) {
            var value = localStorage.getItem(key);
            try {
                return JSON.parse(value);
            } catch (err) {
                return value;
            }

        },
        setItem: function (key, value) {
            if (value.constructor == String || value.constructor == Number) {
                return localStorage.setItem(key, value);
            }
            return localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: function (key) {
            return localStorage.removeItem(key);
        }
    }

});
