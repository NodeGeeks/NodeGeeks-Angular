/**
 * Created by aaronrussell on 11/1/15.
 * @Description:
 */
angular.module('app').service('Auth', function (Profile, $rootScope, Notify, $sails) {

    function Auth() {
        this.session = undefined;
        hello.on('auth.login', function(auth) {
            hello(auth.network).api('/me').then(function(response) {
                //todo: check the database if this socialAccount exists if it does log them in using it if it does not then create them a profile based off of that information, use a switch statement to parse the different types of networks.
            });
        });
    }

    Auth.prototype.login = function (login, password) {
        var _auth = this;
        $sails.request({
            method: 'post',
            url: '/login',
            data: {login: login, password: password}
        }, function (profile) {
            _auth.session = $rootScope.session = Profile.Record(profile);
        }, function (error) {
            alert(error.message);
        });
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

    Auth.prototype.validate = function (profile) {
        var _auth = this;
        $sails.request({
            method: 'post',
            url: '/validate',
            data: {id: profile.id, token: profile.token}
        }, function (profile) {
            _auth.session = $rootScope.session = Profile.Record(profile);
        }, function (error) {
            alert(error.message);
        });
    };

    Auth.prototype.verify = function (password) {
        this.login(this.session.email, password)
    };

    Auth.prototype.reset = function (id, hash, password) {
        $sails.request({
            method: 'post',
            url: '/resetPassword',
            data: {id: id, hash: hash, password: password}
        }, function (profile) {
            _auth.session = $rootScope.session = Profile.Record(profile);
        }, function (error) {
            alert(error.message);
        });
    };

    Auth.prototype.recover = function (email) {
        $sails.request({
            method: 'get',
            url: '/recoverPassword',
            data: {email: email}
        }, function (response) {
            alert(response.code);
        }, function (error) {
            alert(error.message);
        });
    };

    Auth.prototype.signup = function (data) {
        var _auth = this;
        Profile.create(data).then(function(profile) {
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