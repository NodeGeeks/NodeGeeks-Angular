/**
 * Created by aaronrussell on 11/1/15.
 * @Description:
 */
angular.module('nodegeeks-angular').service('Auth', function (Profile, $rootScope, Notify, $sails, LocalStorage, $q, $location) {

    this.loginRedirect = '/dashboard';
    this.logoutRedirect = '/';
    $rootScope.session = undefined;

    hello.on('auth.login', function (auth) {
        hello(auth.network).api('/me').then(function (response) {
            //todo: check the database if this socialAccount exists if it does log them in using it if it does not then create them a profile based off of that information, use a switch statement to parse the different types of networks.
        });
    });

    this.login = function (login, password) {
        var _auth = this;
        return $q(function (resolve, reject) {
            $sails.request({
                method: 'post',
                url: '/login',
                data: {login: login, password: password}
            }, function (profile) {
                if (profile.code == 403 || profile.code == 404) return Notify.alert(profile.message);
                if (!profile.isActivated) return Notify.alert('You need to activate your account before logging in.');
                $location.url(_auth.loginRedirect);
                var profileRecord = Profile.Record(profile);
                $rootScope.session = profileRecord;
                $rootScope.$apply();
                LocalStorage.setItem('session', {id: profile.id, token: profile.token, email: profile.email, username: profile.username});
                resolve(profileRecord);
            }, function (error) {
                console.error(error);
                reject(error);
            });
        });
    };

    this.logout = function () {
        var _auth = this;
        return $q(function (resolve, reject) {
            $rootScope.session.token = '';
            $rootScope.session.save().then(function () {
                $location.url(_auth.logoutRedirect);
                $rootScope.session = undefined;
                LocalStorage.removeItem('session');
                resolve();
            }, function (error) {
                console.error(error);
                reject(error);
            });
        });
    };

    this.validate = function (profile) {
        return $q(function (resolve, reject) {
            $sails.request({
                method: 'post',
                url: '/validate',
                data: {id: profile.id, token: profile.token}
            }, function (profile) {
                var profileRecord = Profile.Record(profile);
                $rootScope.session = profileRecord;
                $rootScope.$apply();
                LocalStorage.setItem('session', {id: profile.id, token: profile.token, email: profile.email, username: profile.username});
                resolve(profileRecord);
            }, function (error) {
                console.error(error);
                reject(error);
            });
        });
    };

    this.verify = function (password) {
        this.login(($rootScope.session.email || $rootScope.session.username), password)
    };

    this.recover = function (email) {
        $sails.request({
            method: 'get',
            url: '/recoverPassword',
            data: {email: email}
        }, function () {
            Notify.alert('A password reset link has been emailed to the email associated with your account.');
        }, function (error) {
            console.error(error);
        });
    };

    this.reset = function (id, password, hash) {
        var _auth = this;
        return $q(function (resolve, reject) {
            $sails.request({
                method: 'post',
                url: '/resetPassword',
                data: {id: id, password: password, hash: hash}
            }, function (profile) {
                $location.url(_auth.loginRedirect);
                var profileRecord = Profile.Record(profile);
                $rootScope.session = profileRecord;
                LocalStorage.setItem('session', {id: profile.id, token: profile.token, email: profile.email, username: profile.username});
                resolve(profileRecord);
            }, function (error) {
                console.error(error);
                reject(error);
            });
        });
    };

    this.signup = function (data) {
        return $q(function (resolve, reject) {
            Profile.create(data).then(function (profile) {
                Notify.alert('Activation email has been sent, check your email and active your account before logging in.');
                resolve(Profile.Record(profile));
            }, function (error) {
                console.error(error);
                reject(error);
            });
        });
    };

    this.social = function (network) {
        hello(network).login();
    };

    return this;

});
