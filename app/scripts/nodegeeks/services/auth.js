/**
 * Created by aaronrussell on 11/1/15.
 * @Description:
 */
angular.module('app').service('Auth', function (Profile, $rootScope, Notify) {

    function Auth() {
        this.session = undefined;
        this.init();
    }

    Auth.prototype.init = function () {
        hello.on('auth.login', function(auth) {
            hello(auth.network).api('/me').then(function(response) {
                //todo: check the database if this socialAccount exists if it does log them in using it if it does not then create them a profile based off of that information, use a switch statement to parse the different types of networks.
            });
        });
    };

    Auth.prototype.login = function (login, password) {
        //todo finish
    };

    Auth.prototype.logout = function () {
        var _auth = this;
        $rootScope.session.token = '';
        $rootScope.session.save().then( function() {
            _auth.session = $rootScope.session = undefined;
        }, function(error) {
            alert(error.message);
        });
    };

    Auth.prototype.validate = function (password) {
        //todo finish
    };

    Auth.prototype.recover = function (data) {
        //todo finish
    };

    Auth.prototype.signup = function (data) {
        var _auth = this;
        Profile.create(data).then(function(profile){
            _auth.session = $rootScope.session = profile;
        },function(error) {
            Notify.alert(error.message);
        });
    };

    Auth.prototype.social = function (network) {
        hello(network).login();
    };

    return new Auth;

});