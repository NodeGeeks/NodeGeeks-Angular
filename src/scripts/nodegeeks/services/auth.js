/**
 * Created by aaronrussell on 11/1/15.
 * @Description:
 */
angular.module('nodegeeks-angular').service('Auth', function (Profile, $rootScope, Notify, $sails, LocalStorage, $q, $location) {

    $rootScope.loginRedirect = '/dashboard';
    $rootScope.logoutRedirect = '/';

    function Auth() {
        this.session = undefined;
        hello.on('auth.login', function (auth) {
            hello(auth.network).api('/me').then(function (response) {
                //todo: check the database if this socialAccount exists if it does log them in using it if it does not then create them a profile based off of that information, use a switch statement to parse the different types of networks.
            });
        });
    }

    Auth.prototype.login = function (login, password) {
        var _auth = this;
        return $q(function (resolve, reject) {
            $sails.request({
                method: 'post',
                url: '/login',
                data: {login: login, password: password}
            }, function (profile) {
                if (profile.code == 403 || profile.code == 404) return Notify.alert(profile.message);
                if (!profile.isActivated) return Notify.alert('You need to activate your account before logging in.');
                LocalStorage.setItem('session', profile);
                _auth.session = $rootScope.session = Profile.Record(profile);
                $location.url($rootScope.loginRedirect);
                resolve(_auth.session);
            }, function (error) {
                reject(error);
            });
        });
    };

    Auth.prototype.logout = function () {
        var _auth = this;
        return $q(function (resolve, reject) {

            _auth.session.token = '';
            _auth.session.save().then(function () {
                _auth.session = $rootScope.session = undefined;
                LocalStorage.removeItem('session');
                $location.url($rootScope.logoutRedirect);
                resolve();
            }, function (error) {
                reject();
                Notify.alert(error.message);
            });
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
            $rootScope.$apply();
        }, function (error) {
            Notify.alert(error.message);
        });
    };

    Auth.prototype.verify = function (password) {
        this.login((this.session.email || this.session.username), password)
    };

    Auth.prototype.reset = function (id, hash, password) {
        $sails.request({
            method: 'post',
            url: '/resetPassword',
            data: {id: id, hash: hash, password: password}
        }, function (profile) {
            _auth.session = $rootScope.session = Profile.Record(profile);
            $rootScope.$apply();
        }, function (error) {
            Notify.alert(error.message);
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
            Notify.alert(error.message);
        });
    };

    Auth.prototype.reset = function (id, password, hash) {
        return $q(function (resolve, reject) {

            $sails.request({
                method: 'post',
                url: '/resetPassword',
                data: {id: id, password: password, hash: hash}
            }, function (response) {
                alert(response.code);
                resolve()
            }, function (error) {
                reject();
                Notify.alert(error.message);
            });
        });
    };

    Auth.prototype.signup = function (data) {
        return $q(function (resolve, reject) {
            Profile.create(data).then(function (profile) {
                Notify.alert('Activation email has been sent, check your email and active your account before logging in.')
                resolve(Profile.Record(profile));
            }, function (error) {
                reject();
                Notify.alert(error.message);
            });
        });
    };

    Auth.prototype.social = function (network) {
        hello(network).login();
    };

    return new Auth;

});
