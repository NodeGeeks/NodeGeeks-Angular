'use strict';

/**
 * @ngdoc overview
 * @name nodegeeks-angular
 * @description
 * # nodegeeks-angular
 *
 * Main module of the Framework.
 */
angular.module('nodegeeks-angular', [
    'ngSails'
]).config(function ($sailsProvider) {
    $sailsProvider.url = 'http://localhost:1337';
    $sailsProvider.debug = true;
    //todo: add statement that checks if its served up or being built, if serve hit local api, if build --environment
});

'use strict';

/**
 * @ngdoc function
 * @name app.controller:ControllerCtrl
 * @description
 * # ControllerCtrl
 * Controller of the app
 */
angular.module('nodegeeks-angular')
        .controller('NodeGeeksController', function () {

        });

/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('nodegeeks-angular').factory('NodeGeeksModel', function (DS) {

  var NodeGeeksModel = DS.Model();

  NodeGeeksModel.define('nodegeeksmodel', {

    attributes: {}

  });

  return NodeGeeksModel;

});

'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('nodegeeks-angular')
        .controller('AuthCtrl', function ($scope, Auth) {
            $scope.login = Auth.login;
            $scope.signup = Auth.signup;
            $scope.social = Auth.social;
            $scope.recover = Auth.recover;
            $scope.logout = Auth.logout;
            $scope.validate = Auth.validate;

        });

'use strict';

/**
 * @ngdoc function
 * @name app.controller:ControllerCtrl
 * @description
 * # ControllerCtrl
 * Controller of the app
 */
angular.module('nodegeeks-angular')
        .controller('CountdownCtrl', function ($rootScope, $scope, App, $location) {

            //todo create custom countdown logic, use the releaseDate on the app model to get the countdown time.
        });

'use strict';

/**
 * @ngdoc function
 * @name app.controller:SetupCtrl
 * @description
 * # ControllerCtrl
 * Controller of the app
 */
angular.module('nodegeeks-angular')
        .controller('SetupCtrl', function ($rootScope, $scope, App, $location) {

            if ($rootScope.app) $location.path('/');

            $scope.setupApp = function(app) {
                App.create(app).then(function(app){
                    $rootScope.app = app;
                    $location.path('/');
                }, function(error) {
                    alert(error.message);
                });
            };
        });

'use strict';

/**
 * @ngdoc function
 * @name app.controller:SetupCtrl
 * @description
 * # ControllerCtrl
 * Controller of the app
 */
angular.module('nodegeeks-angular')
        .directive('formWizardStepInput', function () {
            return {
                restrict: 'E',
                templateUrl: 'views/nodegeeks/directives/form-wizard-step-input.html',
                scope: {
                    property: '=',
                    label: '@',
                    placeholder: '@',
                    type: '@',
                    col: '@'
                }
            };
        });

'use strict';

/**
 * @ngdoc function
 * @name app.controller:SetupCtrl
 * @description
 * # ControllerCtrl
 * Controller of the app
 */
angular.module('nodegeeks-angular')
        .directive('formWizardStep', function() {
            return {
                restrict: 'E',
                templateUrl: 'views/nodegeeks/directives/form-wizard-step.html',
                scope: {
                    title: '@',
                    number: '@',
                    scope: '=scope'
                },
                transclude:true,
                link: function(scope, element, attrs, ctrl, transclude) {
                    scope.$parent.allSteps.push(scope);
                    if (scope.$parent.step == scope.number) {
                        scope.$parent.step = scope;
                    }
                    transclude(scope, function(clone, scope) {
                        angular.element(element[0].getElementsByClassName('sub-elements')[0]).append(clone);
                    });
                }
            };
        });

'use strict';

/**
 * @ngdoc function
 * @name app.controller:SetupCtrl
 * @description
 * # ControllerCtrl
 * Controller of the app
 */
angular.module('nodegeeks-angular')
        .directive('formWizard', function() {
            return {
                restrict: 'E',
                templateUrl: 'views/nodegeeks/directives/form-wizard.html',
                scope: {
                    action: '=',
                    title: '@',
                    steps: '@'
                },
                transclude: true,
                link: function(scope, element, attrs, ctrl, transclude) {
                    scope.allSteps = [];
                    scope.step = {number: 1};
                    scope.percentage = 1 / scope.steps * 100;
                    scope.next = function(){
                        scope.step.number++;
                        scope.percentage = scope.step.number / scope.steps * 100;
                    };
                    scope.back = function(){
                        scope.step.number--;
                        scope.percentage = scope.step.number / scope.steps * 100;
                    };
                    transclude(scope, function(clone, scope) {
                        angular.element(element[0].getElementsByClassName('tab-content')[0]).append(clone);
                    });
                }
            };
        });

/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('nodegeeks-angular').factory('App', function (DS) {

    var App = DS.Model();

    App.define('app', {

        attributes: {

            name: {
                type: 'string'
            },

            logo: {
                type: 'string',
                defaultsTo: '/assets/images/logo.png'
            },

            description: {
                type: 'string'
            },

            domain: {
                type: 'string'
            },

            company: {
                type: 'string'
            },

            version: {
                type: 'float'
            },

            facebookAPI: {
                type: 'string'
            },

            twitterAPI: {
                type: 'string'
            },

            windowsAPI: {
                type: 'string'
            },

            googleAPI: {
                type: 'string'
            },

            facebookUrl: {
                type: 'string'
            },

            twitterUrl: {
                type: 'string'
            },

            windowsUrl: {
                type: 'string'
            },

            googleUrl: {
                type: 'string'
            }

        }


    });

    return App;

});

/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('nodegeeks-angular').factory('Conversation', function (DS, $filter) {

    var Conversation = DS.Model();

    Conversation.define('conversation', {

        attributes: {

            isUnread: {
                type: 'boolean'
            },

            messages: {
                collection: 'message'
            },

            participants: {
                collection: 'profile'
            },

            lastMessage: function () {
                if (this.messages.length) {
                    var lastMessage = $filter('orderBy')(this.messages, 'createdAt', true)[0];
                    return lastMessage.sender.firstName + " say's: " + lastMessage.content;
                }
            }

        }

    });

    return Conversation;

});

/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('nodegeeks-angular').factory('FileObj', function (DS) {

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

/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('nodegeeks-angular').factory('Message', function (DS) {

    var Message = DS.Model();

    Message.define('message', {

        attributes: {

            sender: {
                model: 'profile'
            },

            content: {
                type: 'string'
            },

            attachments: {
                collection: 'fileObj'
            },

            conversation: {
                model: 'conversation'
            },

            createdAt: {
                type: 'string',
            },

            timeAgo: function () {
                return '11 seconds ago'
            },

            shortContent: function() {
                if (this.content.length > 49) {
                    return this.content;
                }
                return this.content.substring(0, 50) + '...'
            }

        }

    });

    return Message;

});

/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('nodegeeks-angular').factory('Notification', function (DS) {

    var Notification = DS.Model();

    Notification.define('notification', {

        attributes: {

            subject: {
                type: 'string'
            },

            type: {
                type: 'string'
            },

            typeId: {
                type: 'string'
            },

            timeAgo: function () {
                return 'Earlier';
            },

            routePath: function () {
                switch (this.type) {
                    case 'message':
                        return '/dashboard/inbox/' + this.typeId;
                        break;
                    case 'friend-request':
                        return '/profile/' + this.typeId;
                        break;
                    case 'comment-approval':
                        return '/dashboard/article/' + this.typeId;
                        break;
                    default:
                        return '/dashboard/inbox/notifications';
                        break;
                }
            },

            content: {
                type: 'string'
            },

            isUnread: {
                type: 'boolean',
                defaultsTo: true
            },

            profile: {
                model: 'Profile'
            }

        }

    });

    return Notification;

});

/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('nodegeeks-angular').factory('Profile', function (DS) {

    var Profile = DS.Model();

    Profile.define('profile', {

        attributes: {

            firstName: {
                type: 'string',
                required: true
            },

            lastName: {
                type: 'string',
                required: true
            },

            name: function(){
                return this.firstName + ' ' + this.lastName;
            },

            username: {
                type: 'string'
            },

            email: {
                type: 'email'
            },

            password: {
                type: 'string'
            },

            token: {
                type: 'string'
            },

            role: {
                type: 'string',
                enum: ['admin', 'moderator', 'billing', 'developer', 'member'],
                defaultsTo: 'member'
            },

            image: {
                type: 'string'
            },

            dob: {
                type: 'date'
            },

            isActivated: {
                type: 'boolean',
                defaultsTo: false
            },

            notifications: {
                collection: 'notification'
            },

            unreadNotifications: function () {
                return this.notifications.filter(function(notification) {
                    return notification.isUnread;
                });
            },

            unreadConversations: function () {
                return this.conversations.filter(function(conversation) {
                    return conversation.isUnread;
                });
            },

            conversations: {
                collection: 'conversation'
            },

            socialProfiles: {
                collection: 'social'
            },

            issues: {
                collection: 'issue'
            }

        }

    });

    return Profile;

});

/**
 * Created by aaronrussell on 10/30/15.
 * @Description: Model is a wrapper object used to create models that tie in with the NodeGeeks-Sails backend API
 * First the model initiating the Model wrapper
 */
angular.module('nodegeeks-angular').factory('Social', function (DS) {

    var Social = DS.Model();

    Social.define('social', {

        attributes: {

            network: {
                type: 'string'
            },

            profile: {
                model: 'Profile'
            }

        }

    });

    return Social;

});

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

//todo: move all of these into there own javascript file later on

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};


/**
 * Created by aaronrussell on 10/30/15.
 * @Description: DS is a data library used to quickly connect to sailsjs using sockets with ajax fallback. It supports creating Model Instances that are useful when creating data driven applications and has a local database that cache's all requests.
 * First the model initiating the Model wrapper
 */
angular.module('nodegeeks-angular').service('DS', function ($http, $q, $sails, $injector) {

    //todo: look into getting this DS.init method to look inside a folder labels models and then create a ModelObject for each file with the modelName being the file name
    //todo: add support for not just sailsjs but regular socket.io and ajax fallback

    /**
     * @method: DS
     * @description: The DS (DataStore) is responsible for containing all of the applications data that has been
     *              retrieved from the database
     * @returns: returns the DS object which contains all the applications Models, and even a local database
     * @example:
     *      var datastore  = new DS();
     */
    function DS() {
        this.database = {};
        this._models = [];
    }

    /**
     * @method: Model
     * @description: This is the DS.Model object that contains all of the required methods to tie in with sailsjs, just
     *              simply `define` the model in a factory and copy and paste the sails attributes object. See demo app
     *              for more details.
     * @returns: returns the defined model wrapped in a DS.Model object
     * @example:
     *      var Profile = new DS.Model();
     *      Profile.define('profile', {
     *          attributes: {
     *              firstName: {
     *                  type: 'string',
     *                  required: true
     *              }
     *          }
     *      });
     *      return Profile;,
     */
    DS.prototype.Model = function () {

        var _DS = this;

        function Model() {
            this.modelName = undefined; // name of the Model (should match the table name in the database)
            this.attributes = {}; // holds all of the properties & methods that are used in this Model
            this._watch = false; // if set to true every model pulled from the database will be watched and automatically will pull data directly from the database.
        }

        /**
         * @method: Record
         * @description: Used to wrap each record retrieved from the database, giving each record access to extra methods
         * @params: recordData - data of the record that was pulled from the local/remote database
         * @returns: returns the recordData param wrapped in the DS.Model.Record object
         * @example:
         *      DS.Model.Record({id: '189289b821bbys98sca879b', firstName: 'Aaron', lastName: 'Russell', age: 25});
         */
        Model.prototype.Record = function (recordData) {

            var _model = this;

            if (_DS.database[_model.modelName][recordData.id]) {
                return _DS.database[_model.modelName][recordData.id];
            }

            function Record() {
                var _record = this;

                Object.defineProperty(this, '_model', {
                    writable: false,
                    value: _model,
                    enumerable: false,
                    configurable: false
                });
                Object.defineProperty(this, 'isDirty', {
                    writable: true,
                    value: false,
                    enumerable: false,
                    configurable: true
                });
                for (var property in _model.attributes) {
                    if (typeof _model.attributes[property] == 'function') {
                        Object.defineProperty(this, property, {
                            //writable: false,
                            get: _model.attributes[property],
                            enumerable: false,
                            configurable: false
                        });
                    } else if (_model.attributes[property] && _model.attributes[property].model) {
                        var propertyModel = null;
                        _DS._models.forEach(function (model) {
                            if (model.modelName == _model.attributes[property].model) {
                                propertyModel = model;
                            }
                        });
                        if (!propertyModel) {
                            var hasModelService = $injector.has(_model.attributes[property].model.capitalize());
                            if (!hasModelService) {
                                return console.error({
                                    message: 'The `' + _model.attributes[property].model + '` model service you are attempting to use does not exist.',
                                    code: 'NO_MODEL_FOUND'
                                });
                            }
                            propertyModel = $injector.get(_model.attributes[property].model.capitalize());
                        }

                        var BelongsToProperty = function () {
                            var _this = this;
                            Object.defineProperty(this, '_model', {
                                writable: false,
                                value: propertyModel,
                                enumerable: false,
                                configurable: false
                            });
                            Object.defineProperty(this, '_property', {
                                writable: false,
                                value: property,
                                enumerable: false,
                                configurable: false
                            });
                            if (recordData[this._property] && recordData[this._property].constructor == Object) {
                                return angular.extend(_this, _this._model.Record(recordData[this._property]));
                            } else  if (recordData[this._property]) {
                                _this.id = recordData[this._property];
                                _this.get().then(function (belongsTo) {
                                    return angular.extend(_this, belongsTo);
                                });
                            }
                        };

                        BelongsToProperty.prototype = Object.create(Object.prototype);

                        BelongsToProperty.prototype.get = function () {
                            var _this = this;
                            return $q(function (resolve, reject) {
                                return _this._model.findOne(_this.id).then(function (belongsTo) {
                                    resolve(_this._model.Record(belongsTo));
                                });
                            });
                        };

                        Object.defineProperty(this, property, {
                            writable: true,
                            value: new BelongsToProperty,
                            enumerable: true,
                            configurable: true
                        });


                    } else if (_model.attributes[property] && _model.attributes[property].collection) {
                        var propertyModel = null;
                        _DS._models.forEach(function (model) {
                            if (model.modelName == _model.attributes[property].collection) {
                                propertyModel = model;
                            }
                        });
                        if (!propertyModel) {
                            var hasModelService = $injector.has(_model.attributes[property].collection.capitalize());
                            if (!hasModelService) {
                                return console.error({
                                    message: 'The `' + _model.attributes[property].collection + '` model service you are attempting to use does not exist.',
                                    code: 'NO_MODEL_FOUND'
                                });
                            }
                            propertyModel = $injector.get(_model.attributes[property].collection.capitalize());
                        }
                        var HasManyProperty = function () {
                            var _this = this;
                            Object.defineProperty(this, '_model', {
                                writable: false,
                                value: propertyModel,
                                enumerable: false,
                                configurable: false
                            });
                            Object.defineProperty(this, '_property', {
                                writable: false,
                                value: property,
                                enumerable: false,
                                configurable: false
                            });
                            if (recordData[this._property] && recordData[this._property].length) {
                                recordData[this._property].forEach(function (value) {
                                    if (value.constructor == Object) {
                                        return _this.push(_this._model.Record(value))
                                    } else {
                                        return _model.findOne(value).then(function (value) {
                                            _this.push(_this._model.Record(value))
                                        });
                                    }
                                });
                            }
                        };

                        HasManyProperty.prototype = Object.create(Array.prototype);

                        HasManyProperty.prototype.remove = function (val) {
                            var _this = this;
                            return $q(function (resolve, reject) {
                                //todo: eventually we need to clean this up, maybe by creating individual functions for each of the types of post requests we need to send, for example `createAndAddRelationship` and `addRelationship`
                                if (val.constructor == Array) {
                                    return console.error({
                                        message: 'You passed an `array`, only objects, strings and integer datatypes allowed.',
                                        code: 'INVALID_DATATYPE'
                                    })
                                } else if (val.constructor == Object) {
                                    //if we have a val.id then the records already been created in the database, so lets just add it.
                                    if (val.id) {
                                        $sails.request({
                                            method: 'delete',
                                            url: '/' + _model.modelName + '/' + _record.id + '/' + _this._property + '/' + val.id
                                        }, function (remoteRecord) {
                                            if (remoteRecord.error) {
                                                return reject(remoteRecord);
                                            }
                                            _this.forEach(function (that) {
                                                if (that.id == val.id) {
                                                    var i = _this.indexOf(val);
                                                    _this.splice(i, 1);
                                                }
                                            });
                                            return resolve(_this._model.Record(remoteRecord));
                                        }, function (error) {
                                            console.error(error);
                                            return reject(error);
                                        });
                                    } else {
                                        return reject({
                                            error: 'No `id` was found for the relationship record you passed',
                                            code: 'MISSING_ID'
                                        })
                                    }
                                } else {
                                    $sails.request({
                                        method: 'delete',
                                        url: '/' + _model.modelName + '/' + _record.id + '/' + _this._property + '/' + val
                                    }, function (remoteRecord) {
                                        if (remoteRecord.error) {
                                            return reject(remoteRecord);
                                        }
                                        _this.forEach(function (that) {
                                            if (that.id == val) {
                                                var i = _this.indexOf(val);
                                                _this.splice(i, 1);
                                            }
                                        });
                                        return resolve(_this._model.Record(remoteRecord));
                                    }, function (error) {
                                        console.error(error);
                                        return reject(error);
                                    });
                                }
                            });
                        };

                        HasManyProperty.prototype.add = function (val) {
                            var _this = this;
                            return $q(function (resolve, reject) {
                                //todo: eventually we need to clean this up, maybe by creating individual functions for each of the types of post requests we need to send, for example `createAndAddRelationship` and `addRelationship`
                                if (val.constructor == Array) {
                                    return console.error({
                                        message: 'You passed an `array`, only objects, strings and integer datatypes allowed.',
                                        code: 'INVALID_DATATYPE'
                                    });
                                } else if (val.constructor == Object) {
                                    //if we have a val.id then the records already been created in the database, so lets just add it.
                                    if (val.id) {
                                        $sails.request({
                                            method: 'post',
                                            url: '/' + _model.modelName + '/' + _record.id + '/' + _this._property + '/' + val.id
                                        }, function (remoteRecord) {
                                            if (remoteRecord.error) {
                                                return reject(remoteRecord);
                                            }
                                            var i = remoteRecord[_this._property].indexOf(val);
                                            var wrappedRecord = _this._model.Record(remoteRecord[_this._property][i]);
                                            _this.push(wrappedRecord);
                                            return resolve(wrappedRecord);
                                        }, function (error) {
                                            console.error(error);
                                            return reject(error);
                                        });
                                    } else {
                                        //if the val.id does not exists we assume its a new records they are wanting to create and we create it for them. then use the id from the created record to add the relationship
                                        _this._model.create(val).then(function (createdRecord) {
                                            $sails.request({
                                                method: 'post',
                                                url: '/' + _model.modelName + '/' + _record.id + '/' + _this._property + '/' + createdRecord.id
                                            }, function (remoteRecord) {
                                                if (remoteRecord.error) {
                                                    return reject(remoteRecord);
                                                }
                                                var wrappedRecord = null;
                                                remoteRecord[_this._property].forEach(function (_remoteRecord) {
                                                    if (_remoteRecord.id == createdRecord.id) wrappedRecord = _this._model.Record(_remoteRecord);
                                                });
                                                _this.push(wrappedRecord);
                                                return resolve(wrappedRecord);
                                            }, function (error) {
                                                console.error(error);
                                                return reject(error);
                                            });
                                        }, function (error) {
                                            console.error(error);
                                        });
                                    }
                                } else {
                                    $sails.request({
                                        method: 'post',
                                        url: '/' + _model.modelName + '/' + _record.id + '/' + _this._property + '/' + val
                                    }, function (remoteRecord) {
                                        if (remoteRecord.error) {
                                            return reject(remoteRecord);
                                        }
                                        var i = remoteRecord[_this._property].indexOf(val);
                                        var wrappedRecord = _this._model.Record(remoteRecord[_this._property][i]);
                                        _this.push(wrappedRecord);
                                        return resolve(wrappedRecord);
                                    }, function (error) {
                                        console.error(error);
                                        return reject(error);
                                    });
                                }
                            });
                        };

                        HasManyProperty.prototype.get = function () {
                            var hasManyArray = this;
                            return $q(function (resolve, reject) {
                                hasManyArray.forEach(function (record, index) {
                                    record.retrieve().then(function (newRecord) {
                                        hasManyArray[index] = newRecord;
                                    }, function () {
                                    });
                                    if (index == hasManyArray.length - 1) {
                                        return resolve(hasManyArray);
                                    }
                                });
                            });
                        };

                        Object.defineProperty(this, property, {
                            writable: true,
                            value: new HasManyProperty,
                            enumerable: true,
                            configurable: true
                        });

                    } else {
                        Object.defineProperty(this, property, {
                            writable: true,
                            value: recordData[property],
                            enumerable: true,
                            configurable: true
                        });
                    }
                }

            };

            /**
             * @method: destroy
             * @description: Destroys the record in database both remotely and locally, then deletes itself (itself being
             *              the DS.Model.Record)
             * @returns: returns the deleted object
             * @example:
             *      profile.destroy().then(function(response){
             *          console.log(response.firstName + ' ' + response.lastName + 'has been deleted');
             *      }, function(error){ console.log('error deleting record')} );
             */
            Record.prototype.destroy = function () {
                var _record = this;
                return $q(function (resolve, reject) {
                    _record._model.delete(_record.id).then(function (response) {
                        _DS.database[_model.modelName].removeItem(response.id);
                        return resolve(response)
                    }, function (error) {
                        console.error(error);
                        return reject(error)
                    });
                });
            };

            /**
             * @method: retrieve
             * @description: Retrieves the remote record from the database.
             * @returns: returns the remote record
             * @example:
             *      profile.retrieve().then(function(response){
             *          console.log(response.firstName + ' ' + response.lastName + 'has been retrieved');
             *      }, function(error){ console.log('error retrieving record')} );
             */
            Record.prototype.retrieve = function () {
                var _record = this;
                return $q(function (resolve, reject) {
                    _record._model.findOne(_record.id).then(function (response) {
                        _DS.database[_model.modelName][recordData.id] = response;
                        return resolve(response);
                    }, function (error) {
                        console.error(error);
                        return reject(error);
                    });
                });
            };

            /**
             * @method: save
             * @description: Saves the record to the database
             * @returns: returns the record that was saved
             * @example: profile.save().then(function(profile) {console.log(profile)});
             */
            Record.prototype.save = function (key, value) {
                var _record = this;
                var _data = {};

                for (var property in this) {
                    if (this.hasOwnProperty(property)) {
                        if (typeof this[property] !== 'function' && property !== '__proto__' && property !== 'isDirty' && property !== 'updatedAt' && property !== '_model' && property !== '_data' && property !== 'id') {
                            _data[property] = this[property];
                        }
                    }
                }

                return $q(function (resolve, reject) {
                    _model.update(_record.id, _data).then(function (record) {
                        return resolve(record);
                    });
                });
            };

            var record = new Record;
            return record;
        };

        /**
         * @method: define
         * @description: Used to define a model and creates the database model instance to hold all this models data.
         * @params: modelName - name of the model
         *          modelClass- object containing the models properties
         * @returns: does not return anything
         * @example: DS.Model.define('profile', {firstName: 'Aaron', lastName: 'Russell', age: 25});
         */
        Model.prototype.define = function (modelName, modelClass) {
            var _model = this;
            this.modelName = modelName;
            angular.extend(this, modelClass);
            this.attributes.id = null;
            //create the local database table using the localForage instances
            _DS.database[modelName] = {};
            $sails.on(modelName, function (message) {
                var modelName = _model.modelName;
                console.log(message);
            });
            _DS._models.push(this);
        };

        /**
         * @method: create
         * @description: Creates a new record in the database, uses the Model.Model
         * @params: obj - object containing the models values to be created create
         * @returns: single record object of the created model
         * @example: Profile.create({firstName: 'Aaron', lastName: 'Russell', age: 25}).then(function(err, profile){ console.log(profile) });
         */
        Model.prototype.create = function (record) {
            var _model = this;
            return $q(function (resolve, reject) {
                /** BEGIN VALIDATION **/
                for (var classKey in _model.attributes) {
                    if (_model.attributes.hasOwnProperty(classKey)) {
                        //check to see if there is a value, if there is there is no need to check if it has a defaultsTo value or is required.
                        if (!record[classKey]) {
                            if (_model.attributes[classKey] && _model.attributes[classKey].defaultsTo) {
                                //if there is a defaultsTo value then we force the record to have that value
                                record[classKey] = _model.attributes[classKey].defaultsTo;
                            }
                            if (_model.attributes[classKey] && _model.attributes[classKey].required) {
                                //if the attribute is required then we reject the promise because one of the attributes in invalid now
                                return reject({message: '`' + classKey + '` is a required attribute'});
                            }
                        }
                    }
                }
                for (var key in record) {
                    if (record.hasOwnProperty(key)) {
                        //we check to make sure its not a hasMany or belongsTo, if not proceed
                        if (_model.attributes[key] && !_model.attributes[key].collection && !_model.attributes[key].model) {
                            //first check if its an email because there is no email typeof, maybe in the future when making the switch to ES6 using class based Constructors we can utilize `instanceof`
                            if (_model.attributes[key].type == 'email') {
                                //some edge casing for validating email address's
                                var emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                                if (!emailRegex.test(record[key])) {
                                    //reject the create promise since there is an invalid attribute
                                    return reject({message: '`' + key + '` needs to be a valid email'});
                                }
                            } else {
                                if (typeof record[key] !== _model.attributes[key].type) {
                                    //reject the create promise since there is an invalid attribute
                                    return reject({message: 'the value of ' + key + ' must be a ' + _model.attributes[key].type + ' datatype'});
                                }
                            }
                        } else {
                            //if its a hasMany we check if its an array then check all the values using .every() to determine if they are all strings.
                            if (_model.attributes[key] && _model.attributes[key].collection && record[key].length) {
                                //todo: finish
                            }
                            //if its a belongsTo we check its a string/integer to validate that its a id
                            if (_model.attributes[key] && _model.attributes[key].model && (typeof record[key] == 'string' || typeof record[key] == 'number')) {
                                //todo: finish
                            }
                        }
                    }
                }
                /** END VALIDATION **/
                $sails.request({
                    method: 'post',
                    url: '/' + _model.modelName,
                    data: record
                }, function (remoteRecord) {
                    if (remoteRecord.error) {
                        var parsedError = {};
                        //custom parse method, will probably change someday if sails updates there error behavior handling
                        if (remoteRecord.error == 'E_VALIDATION') {
                            for (var property in remoteRecord.invalidAttributes) {
                                if (remoteRecord.invalidAttributes.hasOwnProperty(property)) {
                                    parsedError.message = remoteRecord.invalidAttributes[property][0].message;
                                    parsedError.code = 'UNIQUE';
                                    console.error(parsedError);
                                    return reject(parsedError);
                                }
                            }
                        }
                        return reject(remoteRecord);
                    }
                    if (remoteRecord.id) {
                        var wrappedRecord = _model.Record(remoteRecord);
                        _DS.database[_model.modelName][remoteRecord.id] = wrappedRecord;
                        return resolve(wrappedRecord);
                    }
                }, function (error) {
                    console.error(error);
                    return reject(error);
                });
            });
        };

        /**
         * @method: findOne
         * @description: Finds one record by the given id
         * @params: id - id of the record that is being requested
         * @returns: single record object
         * @example: Profile.findOne('1489ydb019297381bd8991').then(function(err, record){ console.log(record) });
         */
        Model.prototype.findOne = function (id) {
            var _model = this;
            return $q(function (resolve, reject) {
                if (!id) {
                    var error = {
                        message: 'Must pass the `id` parameter to the `findOne` method',
                        code: 'MISSING_PARAM'
                    };
                    console.error(error);
                    return reject(error);
                }
                $sails.request({
                    method: 'get',
                    url: '/' + _model.modelName + '/' + id
                }, function (remoteRecord) {
                    if (typeof remoteRecord == 'string') return reject({message: remoteRecord});
                    var wrappedRecord = _model.Record(remoteRecord);
                    _DS.database[_model.modelName][remoteRecord.id] =  wrappedRecord;
                    if (remoteRecord) return resolve(wrappedRecord);
                }, function (error) {
                    console.error(error);
                    return reject(error);
                });
            });
        };

        /**
         * @method: findAll
         * @description: Finds all records for the given model.
         * @params: limit - used to set a limit for the findAll request (integer only value)
         * @returns: array of records
         * @example: Profile.findAll().then(function(err, profiles){ console.log(profiles) });
         */
        Model.prototype.findAll = function (limit) {
            var _model = this;
            var limitString = '';
            return $q(function (resolve, reject) {
                if (limit) {
                    if (typeof limit !== 'number') {
                        return reject({message: 'must pass an integer', code: 'INVALID_PARAM_PASSED'});
                    }
                    limitString = '?limit=' + limit;
                }
                $sails.request({
                    method: 'get',
                    url: '/' + _model.modelName + limitString
                }, function (remoteRecords) {
                    if (remoteRecords.length) {
                        var wrappedRemoteRecords = [];
                        remoteRecords.forEach(function (remoteRecord) {
                            var wrappedRecord = _model.Record(remoteRecord);
                            _DS.database[_model.modelName][remoteRecord.id] = wrappedRecord;
                            wrappedRemoteRecords.push(wrappedRecord);
                        });
                        return resolve(wrappedRemoteRecords);
                    } else {
                        return reject({message: 'No records found for `' + _model.modelName + '`', code: 'NO_RECORDS'});
                    }
                });
            });
        };

        /**
         * @method: query
         * @description: Queries the database for multiple records by the given query criteria
         * @params: query - object containing the query criteria
         * @returns: array of results
         * @example: Profile.query({firstName: 'Aaron'}).then(function(err, records){ console.log(records) });
         */
        Model.prototype.query = function (query) {
            var _model = this;
            var queryString = '';
            var multiple = false;
            for (var key in query) {
                if (query.hasOwnProperty(key)) {
                    if (!multiple) {
                        queryString = queryString + key + '=' + query[key];
                        multiple = true;
                    } else {
                        queryString = queryString + '&' + key + '=' + query[key];
                    }
                }
            }
            return $q(function (resolve, reject) {
                $sails.request({
                    method: 'get',
                    url: '/' + _model.modelName + '?' + queryString
                }, function (remoteRecords) {
                    if (remoteRecords.length) {
                        var wrappedRemoteRecords = [];
                        remoteRecords.forEach(function (remoteRecord) {
                            var wrappedRecord = _model.Record(remoteRecord);
                            _DS.database[_model.modelName][remoteRecord.id] = wrappedRecord;
                            wrappedRemoteRecords.push(wrappedRecord);
                        });
                        return resolve(wrappedRemoteRecords);
                    } else {
                        return reject({message: 'No records found for `' + _model.modelName + '`', code: 'NO_RECORDS'});
                    }
                });
            });
        };

        /**
         * @method: delete
         * @description: Destroys a record with the given ID
         * @params: id - id of the record that is being deleted
         * @returns: single object containing deleted record
         * @example: Profile.delete('1489ydb019297381bd8991').then(function(err, record){ console.log(record) });
         */
        Model.prototype.delete = function (id) {
            var _model = this;
            return $q(function (resolve, reject) {
                $sails.request({
                    method: 'delete',
                    url: '/' + _model.modelName + '/' + id
                }, function (remoteRecord) {
                    delete _DS.database[_model.modelName][remoteRecord.id];
                    if (remoteRecord) return resolve(remoteRecord);
                }, function (error) {
                    console.error(error);
                    return reject(error);
                });
            });
        };

        /**
         * @method: update
         * @description: Updates the record
         * @params: id - id of the record that is being updated
         *          updateObj - the values that will be updated
         * @returns: the updated record
         * @example: Profile.update('1489ydb019297381bd8991', {firstName: 'Joe', lastName: 'Dirt'}).then(function(err, profile){ console.log(profile) });
         */
        Model.prototype.update = function (id, updateObj) {
            var _model = this;
            return $q(function (resolve, reject) {
                $sails.request({
                    method: 'put',
                    data: updateObj,
                    url: '/' + _model.modelName + '/' + id
                }, function (remoteRecord) {
                    var wrappedRecord = _model.Record(remoteRecord);
                    _DS.database[_model.modelName][remoteRecord.id] = wrappedRecord;
                    if (remoteRecord) return resolve(wrappedRecord);
                }, function (error) {
                    console.error(error);
                    return reject(error);
                });
            });
        };

        return new Model;
    };

    return new DS;
});

/**
 * Created by aaronrussell on 11/4/15.
 * @Description:
 */
angular.module('nodegeeks-angular').service('LocalStorage', function () {

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
        },
        removeItem: function(key) {
            return localStorage.removeItem(key);
        }
    }

});

/**
 * Created by aaronrussell on 11/4/15.
 * @Description:
 */
angular.module('nodegeeks-angular').service('Notify', function (Profile, $rootScope) {

    function Notify() {}

    //todo: integrate the angular material notification system

    Notify.prototype.alert = function (message, options) {
        alert(message);
    };

    return new Notify;

});

/**
 * Created by aaronrussell on 11/4/15.
 * @Description:
 */
angular.module('nodegeeks-angular').factory('settings', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout4'
    };

    $rootScope.settings = settings;

    return settings;
});


/**
 * sails.io.js
 * ------------------------------------------------------------------------
 * JavaScript Client (SDK) for communicating with Sails.
 *
 * Note that this script is completely optional, but it is handy if you're
 * using WebSockets from the browser to talk to your Sails server.
 *
 * For tips and documentation, visit:
 * http://sailsjs.org/#!documentation/reference/BrowserSDK/BrowserSDK.html
 * ------------------------------------------------------------------------
 *
 * This file allows you to send and receive socket.io messages to & from Sails
 * by simulating a REST client interface on top of socket.io. It models its API
 * after the $.ajax pattern from jQuery you might already be familiar with.
 *
 * So if you're switching from using AJAX to sockets, instead of:
 *    `$.post( url, [data], [cb] )`
 *
 * You would use:
 *    `socket.post( url, [data], [cb] )`
 */


(function() {

  // Save the URL that this script was fetched from for use below.
  // (skip this if this SDK is being used outside of the DOM, i.e. in a Node process)
  var urlThisScriptWasFetchedFrom = (function() {
    if (
      typeof window !== 'object' ||
      typeof window.document !== 'object' ||
      typeof window.document.getElementsByTagName !== 'function'
    ) {
      return '';
    }

    // Return the URL of the last script loaded (i.e. this one)
    // (this must run before nextTick; see http://stackoverflow.com/a/2976714/486547)
    var allScriptsCurrentlyInDOM = window.document.getElementsByTagName('script');
    var thisScript = allScriptsCurrentlyInDOM[allScriptsCurrentlyInDOM.length - 1];
    return thisScript.src;
  })();

  // Constants
  var CONNECTION_METADATA_PARAMS = {
    version: '__sails_io_sdk_version',
    platform: '__sails_io_sdk_platform',
    language: '__sails_io_sdk_language'
  };

  // Current version of this SDK (sailsDK?!?!) and other metadata
  // that will be sent along w/ the initial connection request.
  var SDK_INFO = {
    version: '0.11.0', // TODO: pull this automatically from package.json during build.
    platform: typeof module === 'undefined' ? 'browser' : 'node',
    language: 'javascript'
  };
  SDK_INFO.versionString =
    CONNECTION_METADATA_PARAMS.version + '=' + SDK_INFO.version + '&' +
    CONNECTION_METADATA_PARAMS.platform + '=' + SDK_INFO.platform + '&' +
    CONNECTION_METADATA_PARAMS.language + '=' + SDK_INFO.language;


  // In case you're wrapping the socket.io client to prevent pollution of the
  // global namespace, you can pass in your own `io` to replace the global one.
  // But we still grab access to the global one if it's available here:
  var _io = (typeof io !== 'undefined') ? io : null;

  /**
   * Augment the `io` object passed in with methods for talking and listening
   * to one or more Sails backend(s).  Automatically connects a socket and
   * exposes it on `io.socket`.  If a socket tries to make requests before it
   * is connected, the sails.io.js client will queue it up.
   *
   * @param {SocketIO} io
   */

  function SailsIOClient(io) {

    // Prefer the passed-in `io` instance, but also use the global one if we've got it.
    if (!io) {
      io = _io;
    }


    // If the socket.io client is not available, none of this will work.
    if (!io) throw new Error('`sails.io.js` requires a socket.io client, but `io` was not passed in.');



    //////////////////////////////////////////////////////////////
    /////                              ///////////////////////////
    ///// PRIVATE METHODS/CONSTRUCTORS ///////////////////////////
    /////                              ///////////////////////////
    //////////////////////////////////////////////////////////////


    /**
     * A little logger for this library to use internally.
     * Basically just a wrapper around `console.log` with
     * support for feature-detection.
     *
     * @api private
     * @factory
     */
    function LoggerFactory(options) {
      options = options || {
        prefix: true
      };

      // If `console.log` is not accessible, `log` is a noop.
      if (
        typeof console !== 'object' ||
        typeof console.log !== 'function' ||
        typeof console.log.bind !== 'function'
      ) {
        return function noop() {};
      }

      return function log() {
        var args = Array.prototype.slice.call(arguments);

        // All logs are disabled when `io.sails.environment = 'production'`.
        if (io.sails.environment === 'production') return;

        // Add prefix to log messages (unless disabled)
        var PREFIX = '';
        if (options.prefix) {
          args.unshift(PREFIX);
        }

        // Call wrapped logger
        console.log
          .bind(console)
          .apply(this, args);
      };
    }

    // Create a private logger instance
    var consolog = LoggerFactory();
    consolog.noPrefix = LoggerFactory({
      prefix: false
    });



    /**
     * What is the `requestQueue`?
     * 
     * The request queue is used to simplify app-level connection logic--
     * i.e. so you don't have to wait for the socket to be connected
     * to start trying to  synchronize data.
     * 
     * @api private
     * @param  {SailsSocket}  socket
     */

    function runRequestQueue (socket) {
      var queue = socket.requestQueue;

      if (!queue) return;
      for (var i in queue) {

        // Double-check that `queue[i]` will not
        // inadvertently discover extra properties attached to the Object
        // and/or Array prototype by other libraries/frameworks/tools.
        // (e.g. Ember does this. See https://github.com/balderdashy/sails.io.js/pull/5)
        var isSafeToDereference = ({}).hasOwnProperty.call(queue, i);
        if (isSafeToDereference) {
          // Emit the request.
          _emitFrom(socket, queue[i]);
        }
      }

      // Now empty the queue to remove it as a source of additional complexity.
      queue = null;
    }



    /**
     * Send a JSONP request.
     * 
     * @param  {Object}   opts [optional]
     * @param  {Function} cb
     * @return {XMLHttpRequest}
     */

    function jsonp(opts, cb) {
      opts = opts || {};

      if (typeof window === 'undefined') {
        // TODO: refactor node usage to live in here
        return cb();
      }

      var scriptEl = document.createElement('script');
      window._sailsIoJSConnect = function(response) {
        scriptEl.parentNode.removeChild(scriptEl);
        
        cb(response);
      };
      scriptEl.src = opts.url;
      document.getElementsByTagName('head')[0].appendChild(scriptEl);

    }



    /**
     * The JWR (JSON WebSocket Response) received from a Sails server.
     *
     * @api public
     * @param  {Object}  responseCtx
     *         => :body
     *         => :statusCode
     *         => :headers
     * 
     * @constructor
     */

    function JWR(responseCtx) {
      this.body = responseCtx.body || {};
      this.headers = responseCtx.headers || {};
      this.statusCode = responseCtx.statusCode || 200;
      if (this.statusCode < 200 || this.statusCode >= 400) {
        this.error = this.body || this.statusCode;
      }
    }
    JWR.prototype.toString = function() {
      return '[ResponseFromSails]' + '  -- ' +
        'Status: ' + this.statusCode + '  -- ' +
        'Headers: ' + this.headers + '  -- ' +
        'Body: ' + this.body;
    };
    JWR.prototype.toPOJO = function() {
      return {
        body: this.body,
        headers: this.headers,
        statusCode: this.statusCode
      };
    };
    JWR.prototype.pipe = function() {
      // TODO: look at substack's stuff
      return new Error('Client-side streaming support not implemented yet.');
    };


    /**
     * @api private
     * @param  {SailsSocket} socket  [description]
     * @param  {Object} requestCtx [description]
     */

    function _emitFrom(socket, requestCtx) {

      if (!socket._raw) {
        throw new Error('Failed to emit from socket- raw SIO socket is missing.');
      }

      // Since callback is embedded in requestCtx,
      // retrieve it and delete the key before continuing.
      var cb = requestCtx.cb;
      delete requestCtx.cb;

      // Name of the appropriate socket.io listener on the server
      // ( === the request method or "verb", e.g. 'get', 'post', 'put', etc. )
      var sailsEndpoint = requestCtx.method;

      socket._raw.emit(sailsEndpoint, requestCtx, function serverResponded(responseCtx) {

        // Send back (emulatedHTTPBody, jsonWebSocketResponse)
        if (cb) {
          cb(responseCtx.body, new JWR(responseCtx));
        }
      });
    }

    //////////////////////////////////////////////////////////////
    ///// </PRIVATE METHODS/CONSTRUCTORS> ////////////////////////
    //////////////////////////////////////////////////////////////



    // Version note:
    // 
    // `io.SocketNamespace.prototype` doesn't exist in sio 1.0.
    // 
    // Rather than adding methods to the prototype for the Socket instance that is returned
    // when the browser connects with `io.connect()`, we create our own constructor, `SailsSocket`.
    // This makes our solution more future-proof and helps us work better w/ the Socket.io team
    // when changes are rolled out in the future.  To get a `SailsSocket`, you can run:
    // ```
    // io.sails.connect();
    // ```



    /**
     * SailsSocket
     * 
     * A wrapper for an underlying Socket instance that communicates directly
     * to the Socket.io server running inside of Sails.
     *
     * If no `socket` option is provied, SailsSocket will function as a mock. It will queue socket
     * requests and event handler bindings, replaying them when the raw underlying socket actually
     * connects. This is handy when we don't necessarily have the valid configuration to know
     * WHICH SERVER to talk to yet, etc.  It is also used by `io.socket` for your convenience.
     * 
     * @constructor
     */
    
    function SailsSocket (opts){
      var self = this;
      opts = opts||{};

      // Absorb opts
      self.useCORSRouteToGetCookie = opts.useCORSRouteToGetCookie;
      self.url = opts.url;
      self.multiplex = opts.multiplex;
      self.transports = opts.transports;

      // Set up "eventQueue" to hold event handlers which have not been set on the actual raw socket yet.
      self.eventQueue = {};

      // Listen for special `parseError` event sent from sockets hook on the backend
      // if an error occurs but a valid callback was not received from the client
      // (i.e. so the server had no other way to send back the error information)
      self.on('sails:parseError', function (err){
        consolog('Sails encountered an error parsing a socket message sent from this client, and did not have access to a callback function to respond with.');
        consolog('Error details:',err);
      });

      // TODO:
      // Listen for a special private message on any connected that allows the server
      // to set the environment (giving us 100% certainty that we guessed right)
      // However, note that the `console.log`s called before and after connection
      // are still forced to rely on our existing heuristics (to disable, tack #production
      // onto the URL used to fetch this file.)
    }


    /**
     * Start connecting this socket.
     * 
     * @api private
     */
    SailsSocket.prototype._connect = function (){
      var self = this;

      // Apply `io.sails` config as defaults
      // (now that at least one tick has elapsed)
      self.useCORSRouteToGetCookie = self.useCORSRouteToGetCookie||io.sails.useCORSRouteToGetCookie;
      self.url = self.url||io.sails.url;
      self.transports = self.transports || io.sails.transports;

      // Ensure URL has no trailing slash
      self.url = self.url ? self.url.replace(/(\/)$/, '') : undefined;

      // Mix the current SDK version into the query string in
      // the connection request to the server:
      if (typeof self.query !== 'string') self.query = SDK_INFO.versionString;
      else self.query += '&' + SDK_INFO.versionString;

      // Determine whether this is a cross-origin socket by examining the
      // hostname and port on the `window.location` object.
      var isXOrigin = (function (){

        // If `window` doesn't exist (i.e. being used from node.js), then it's
        // always "cross-domain".
        if (typeof window === 'undefined' || typeof window.location === 'undefined') {
          return false;
        }

        // If `self.url` (aka "target") is falsy, then we don't need to worry about it.
        if (typeof self.url !== 'string') { return false; }
        
        // Get information about the "target" (`self.url`)
        var targetProtocol = (function (){
          try {
            targetProtocol = self.url.match(/^([a-z]+:\/\/)/i)[1].toLowerCase();
          }
          catch (e) {}
          targetProtocol = targetProtocol || 'http://';
          return targetProtocol;
        })();
        var isTargetSSL = !!self.url.match('^https');
        var targetPort = (function (){
          try {
            return self.url.match(/^[a-z]+:\/\/[^:]*:([0-9]*)/i)[1];
          }
          catch (e){}
          return isTargetSSL ? '443' : '80';
        })();
        var targetAfterProtocol = self.url.replace(/^([a-z]+:\/\/)/i, '');


        // If target protocol is different than the actual protocol,
        // then we'll consider this cross-origin.
        if (targetProtocol.replace(/[:\/]/g, '') !== window.location.protocol.replace(/[:\/]/g,'')) {
          return true;
        }


        // If target hostname is different than actual hostname, we'll consider this cross-origin.
        var hasSameHostname = targetAfterProtocol.search(window.location.hostname) === 0;
        if (!hasSameHostname) {
          return true;
        }

        // If no actual port is explicitly set on the `window.location` object,
        // we'll assume either 80 or 443.
        var isLocationSSL = window.location.protocol.match(/https/i);
        var locationPort = (window.location.port+'') || (isLocationSSL ? '443' : '80');

        // Finally, if ports don't match, we'll consider this cross-origin.
        if (targetPort !== locationPort) {
          return true;
        }

        // Otherwise, it's the same origin.
        return false;

      })();


      // Prepare to start connecting the socket
      (function selfInvoking (cb){

        // If this is an attempt at a cross-origin or cross-port
        // socket connection, send a JSONP request first to ensure
        // that a valid cookie is available.  This can be disabled
        // by setting `io.sails.useCORSRouteToGetCookie` to false.
        // 
        // Otherwise, skip the stuff below.
        if (!(self.useCORSRouteToGetCookie && isXOrigin)) {
          return cb();
        }

        // Figure out the x-origin CORS route
        // (Sails provides a default)
        var xOriginCookieURL = self.url;
        if (typeof self.useCORSRouteToGetCookie === 'string') {
          xOriginCookieURL += self.useCORSRouteToGetCookie;
        }
        else {
          xOriginCookieURL += '/__getcookie';
        }


        // Make the AJAX request (CORS)
        if (typeof window !== 'undefined') {
          jsonp({
            url: xOriginCookieURL,
            method: 'GET'
          }, cb);
          return;
        }

        // If there's no `window` object, we must be running in Node.js
        // so just require the request module and send the HTTP request that
        // way.
        var mikealsReq = require('request');
        mikealsReq.get(xOriginCookieURL, function(err, httpResponse, body) {
          if (err) {
            consolog(
              'Failed to connect socket (failed to get cookie)',
              'Error:', err
            );
            return;
          }
          cb();
        });

      })(function goAheadAndActuallyConnect() {

        // Now that we're ready to connect, create a raw underlying Socket
        // using Socket.io and save it as `_raw` (this will start it connecting)
        self._raw = io(self.url, self);

        // Replay event bindings from the eager socket
        self.replay();


        /**
         * 'connect' event is triggered when the socket establishes a connection
         *  successfully.
         */
        self.on('connect', function socketConnected() {

          consolog.noPrefix(
            '\n' +
            '\n' +
            // '    |>    ' + '\n' +
            // '  \\___/  '+️
            // '\n'+
             '  |>    Now connected to Sails.' + '\n' +
            '\\___/   For help, see: http://bit.ly/1DmTvgK' + '\n' +
             '        (using '+io.sails.sdk.platform+' SDK @v'+io.sails.sdk.version+')'+ '\n' +
            '\n'+
            '\n'+
            // '\n'+
            ''
            // ' ⚓︎ (development mode)'
            // 'e.g. to send a GET request to Sails via WebSockets, run:'+ '\n' +
            // '`io.socket.get("/foo", function serverRespondedWith (body, jwr) { console.log(body); })`'+ '\n' +
          );
        });
        
        self.on('disconnect', function() {
          self.connectionLostTimestamp = (new Date()).getTime();
          consolog('====================================');
          consolog('Socket was disconnected from Sails.');
          consolog('Usually, this is due to one of the following reasons:' + '\n' +
            ' -> the server ' + (self.url ? self.url + ' ' : '') + 'was taken down' + '\n' +
            ' -> your browser lost internet connectivity');
          consolog('====================================');
        });

        self.on('reconnecting', function(numAttempts) {
          consolog(
            '\n'+
            '        Socket is trying to reconnect to Sails...\n'+
            '_-|>_-  (attempt #' + numAttempts + ')'+'\n'+
            '\n'
          );
        });
      
        self.on('reconnect', function(transport, numAttempts) {
          var msSinceConnectionLost = ((new Date()).getTime() - self.connectionLostTimestamp);
          var numSecsOffline = (msSinceConnectionLost / 1000);
          consolog(
            '\n'+
             '  |>    Socket reconnected successfully after'+'\n'+
            '\\___/   being offline for ~' + numSecsOffline + ' seconds.'+'\n'+
            '\n'
          );
        });
      
        // 'error' event is triggered if connection can not be established.
        // (usually because of a failed authorization, which is in turn
        // usually due to a missing or invalid cookie)
        self.on('error', function failedToConnect(err) {

          // TODO:
          // handle failed connections due to failed authorization
          // in a smarter way (probably can listen for a different event)

          // A bug in Socket.io 0.9.x causes `connect_failed`
          // and `reconnect_failed` not to fire.
          // Check out the discussion in github issues for details:
          // https://github.com/LearnBoost/socket.io/issues/652
          // io.socket.on('connect_failed', function () {
          //  consolog('io.socket emitted `connect_failed`');
          // });
          // io.socket.on('reconnect_failed', function () {
          //  consolog('io.socket emitted `reconnect_failed`');
          // });

          consolog(
            'Failed to connect socket (probably due to failed authorization on server)',
            'Error:', err
          );
        });
      });

    };


    /**
     * Disconnect the underlying socket.
     *
     * @api public
     */
    SailsSocket.prototype.disconnect = function (){
      if (!this._raw) {
        throw new Error('Cannot disconnect- socket is already disconnected');
      }
      return this._raw.disconnect();
    };



    /**
     * isConnected
     *
     * @api private
     * @return {Boolean} whether the socket is connected and able to
     *                           communicate w/ the server.
     */

    SailsSocket.prototype.isConnected = function () {
      if (!this._raw) {
        return false;
      }

      return !!this._raw.connected;
    };



    /**
     * [replay description]
     * @return {[type]} [description]
     */
    SailsSocket.prototype.replay = function (){
      var self = this;

      // Pass events and a reference to the request queue
      // off to the self._raw for consumption
      for (var evName in self.eventQueue) {
        for (var i in self.eventQueue[evName]) {
          self._raw.on(evName, self.eventQueue[evName][i]);
        }
      }

      // Bind a one-time function to run the request queue
      // when the self._raw connects.
      if ( !self.isConnected() ) {
        var alreadyRanRequestQueue = false;
        self._raw.on('connect', function whenRawSocketConnects() {
          if (alreadyRanRequestQueue) return;
          runRequestQueue(self);
          alreadyRanRequestQueue = true;
        });
      }
      // Or run it immediately if self._raw is already connected
      else {
        runRequestQueue(self);
      }

      return self;
    };


    /**
     * Chainable method to bind an event to the socket.
     * 
     * @param  {String}   evName [event name]
     * @param  {Function} fn     [event handler function]
     * @return {SailsSocket}
     */
    SailsSocket.prototype.on = function (evName, fn){

      // Bind the event to the raw underlying socket if possible.
      if (this._raw) {
        this._raw.on(evName, fn);
        return this;
      }

      // Otherwise queue the event binding.
      if (!this.eventQueue[evName]) {
        this.eventQueue[evName] = [fn];
      }
      else {
        this.eventQueue[evName].push(fn);
      }

      return this;
    };

    /**
     * Chainable method to unbind an event from the socket.
     * 
     * @param  {String}   evName [event name]
     * @param  {Function} fn     [event handler function]
     * @return {SailsSocket}
     */
    SailsSocket.prototype.off = function (evName, fn){

      // Bind the event to the raw underlying socket if possible.
      if (this._raw) {
        this._raw.off(evName, fn);
        return this;
      }

      // Otherwise queue the event binding.
      if (this.eventQueue[evName] && this.eventQueue[evName].indexOf(fn) > -1) {
        this.eventQueue[evName].splice(this.eventQueue[evName].indexOf(fn), 1);
      }

      return this;
    };


    /**
     * Chainable method to unbind all events from the socket.
     * 
     * @return {SailsSocket}
     */
    SailsSocket.prototype.removeAllListeners = function (){

      // Bind the event to the raw underlying socket if possible.
      if (this._raw) {
        this._raw.removeAllListeners();
        return this;
      }

      // Otherwise queue the event binding.
      this.eventQueue = {};
      
      return this;
    };

    /**
     * Simulate a GET request to sails
     * e.g.
     *    `socket.get('/user/3', Stats.populate)`
     *
     * @api public
     * @param {String} url    ::    destination URL
     * @param {Object} params ::    parameters to send with the request [optional]
     * @param {Function} cb   ::    callback function to call when finished [optional]
     */

    SailsSocket.prototype.get = function(url, data, cb) {

      // `data` is optional
      if (typeof data === 'function') {
        cb = data;
        data = {};
      }

      return this.request({
        method: 'get',
        params: data,
        url: url
      }, cb);
    };



    /**
     * Simulate a POST request to sails
     * e.g.
     *    `socket.post('/event', newMeeting, $spinner.hide)`
     *
     * @api public
     * @param {String} url    ::    destination URL
     * @param {Object} params ::    parameters to send with the request [optional]
     * @param {Function} cb   ::    callback function to call when finished [optional]
     */

    SailsSocket.prototype.post = function(url, data, cb) {

      // `data` is optional
      if (typeof data === 'function') {
        cb = data;
        data = {};
      }

      return this.request({
        method: 'post',
        data: data,
        url: url
      }, cb);
    };



    /**
     * Simulate a PUT request to sails
     * e.g.
     *    `socket.post('/event/3', changedFields, $spinner.hide)`
     *
     * @api public
     * @param {String} url    ::    destination URL
     * @param {Object} params ::    parameters to send with the request [optional]
     * @param {Function} cb   ::    callback function to call when finished [optional]
     */

    SailsSocket.prototype.put = function(url, data, cb) {

      // `data` is optional
      if (typeof data === 'function') {
        cb = data;
        data = {};
      }

      return this.request({
        method: 'put',
        params: data,
        url: url
      }, cb);
    };



    /**
     * Simulate a DELETE request to sails
     * e.g.
     *    `socket.delete('/event', $spinner.hide)`
     *
     * @api public
     * @param {String} url    ::    destination URL
     * @param {Object} params ::    parameters to send with the request [optional]
     * @param {Function} cb   ::    callback function to call when finished [optional]
     */

    SailsSocket.prototype['delete'] = function(url, data, cb) {

      // `data` is optional
      if (typeof data === 'function') {
        cb = data;
        data = {};
      }

      return this.request({
        method: 'delete',
        params: data,
        url: url
      }, cb);
    };



    /**
     * Simulate an HTTP request to sails
     * e.g.
     * ```
     * socket.request({
     *   url:'/user',
     *   params: {},
     *   method: 'POST',
     *   headers: {}
     * }, function (responseBody, JWR) {
     *   // ...
     * });
     * ```
     *
     * @api public
     * @option {String} url    ::    destination URL
     * @option {Object} params ::    parameters to send with the request [optional]
     * @option {Object} headers::    headers to send with the request [optional]
     * @option {Function} cb   ::    callback function to call when finished [optional]
     * @option {String} method ::    HTTP request method [optional]
     */

    SailsSocket.prototype.request = function(options, cb) {

      var usage =
      'Usage:\n'+
      'socket.request( options, [fnToCallWhenComplete] )\n\n'+
      'options.url :: e.g. "/foo/bar"'+'\n'+
      'options.method :: e.g. "get", "post", "put", or "delete", etc.'+'\n'+
      'options.params :: e.g. { emailAddress: "mike@sailsjs.org" }'+'\n'+
      'options.headers :: e.g. { "x-my-custom-header": "some string" }';
      // Old usage:
      // var usage = 'Usage:\n socket.'+(options.method||'request')+'('+
      //   ' destinationURL, [dataToSend], [fnToCallWhenComplete] )';


      // Validate options and callback
      if (typeof options !== 'object' || typeof options.url !== 'string') {
        throw new Error('Invalid or missing URL!\n' + usage);
      }
      if (options.method && typeof options.method !== 'string') {
        throw new Error('Invalid `method` provided (should be a string like "post" or "put")\n' + usage);
      }
      if (options.headers && typeof options.headers !== 'object') {
        throw new Error('Invalid `headers` provided (should be an object with string values)\n' + usage);
      }
      if (options.params && typeof options.params !== 'object') {
        throw new Error('Invalid `params` provided (should be an object with string values)\n' + usage);
      }
      if (cb && typeof cb !== 'function') {
        throw new Error('Invalid callback function!\n' + usage);
      }
      

      // Build a simulated request object
      // (and sanitize/marshal options along the way)
      var requestCtx = {

        method: options.method.toLowerCase() || 'get',

        headers: options.headers || {},

        data: options.params || options.data || {},

        // Remove trailing slashes and spaces to make packets smaller.
        url: options.url.replace(/^(.+)\/*\s*$/, '$1'),

        cb: cb
      };

      // If this socket is not connected yet, queue up this request
      // instead of sending it.
      // (so it can be replayed when the socket comes online.)
      if ( ! this.isConnected() ) {

        // If no queue array exists for this socket yet, create it.
        this.requestQueue = this.requestQueue || [];
        this.requestQueue.push(requestCtx);
        return;
      }


      // Otherwise, our socket is ok!
      // Send the request.
      _emitFrom(this, requestCtx);
    };



    /**
     * Socket.prototype._request
     *
     * Simulate HTTP over Socket.io.
     *
     * @api private
     * @param  {[type]}   options [description]
     * @param  {Function} cb      [description]
     */
    SailsSocket.prototype._request = function(options, cb) {
      throw new Error('`_request()` was a private API deprecated as of v0.11 of the sails.io.js client. Use `.request()` instead.');
    };



    // Set a `sails` object that may be used for configuration before the
    // first socket connects (i.e. to prevent auto-connect)
    io.sails = {

      // Whether to automatically connect a socket and save it as `io.socket`.
      autoConnect: true,

      // The route (path) to hit to get a x-origin (CORS) cookie
      // (or true to use the default: '/__getcookie')
      useCORSRouteToGetCookie: true,

      // The environment we're running in.
      // (logs are not displayed when this is set to 'production')
      // 
      // Defaults to development unless this script was fetched from a URL
      // that ends in `*.min.js` or '#production' (may also be manually overridden.)
      // 
      environment: urlThisScriptWasFetchedFrom.match(/(\#production|\.min\.js)/g) ? 'production' : 'development',

      // The version of this sails.io.js client SDK
      sdk: SDK_INFO,

      // Transports to use when communicating with the server, in the order they will be tried
      transports: ['polling', 'websocket']
    };



    /**
     * Add `io.sails.connect` function as a wrapper for the built-in `io()` aka `io.connect()`
     * method, returning a SailsSocket. This special function respects the configured io.sails
     * connection URL, as well as sending other identifying information (most importantly, the
     * current version of this SDK).
     *
     * @param  {String} url  [optional]
     * @param  {Object} opts [optional]
     * @return {Socket}
     */
    io.sails.connect = function(url, opts) {
      opts = opts || {};

      // If explicit connection url is specified, save it to options
      opts.url = url || opts.url || undefined;

      // Instantiate and return a new SailsSocket- and try to connect immediately.
      var socket = new SailsSocket(opts);
      socket._connect();
      return socket;
    };



    // io.socket
    // 
    // The eager instance of Socket which will automatically try to connect
    // using the host that this js file was served from.
    // 
    // This can be disabled or configured by setting properties on `io.sails.*` within the
    // first cycle of the event loop.
    // 

    
    // Build `io.socket` so it exists
    // (this does not start the connection process)
    io.socket = new SailsSocket();

    // In the mean time, this eager socket will be queue events bound by the user
    // before the first cycle of the event loop (using `.on()`), which will later
    // be rebound on the raw underlying socket.

    // If configured to do so, start auto-connecting after the first cycle of the event loop
    // has completed (to allow time for this behavior to be configured/disabled
    // by specifying properties on `io.sails`)
    setTimeout(function() {

      // If autoConnect is disabled, delete the eager socket (io.socket) and bail out.
      if (!io.sails.autoConnect) {
        delete io.socket;
        return;
      }

      // consolog('Eagerly auto-connecting socket to Sails... (requests will be queued in the mean-time)');
      io.socket._connect();


    }, 0); // </setTimeout>


    // Return the `io` object.
    return io;
  }


  // Add CommonJS support to allow this client SDK to be used from Node.js.
  if (typeof module === 'object' && typeof module.exports !== 'undefined') {
    module.exports = SailsIOClient;
    return SailsIOClient;
  }
  else if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define([], function() {
        return SailsIOClient;
      });
  }
  else {
    // Otherwise, try to instantiate the client:
    // In case you're wrapping the socket.io client to prevent pollution of the
    // global namespace, you can replace the global `io` with your own `io` here:
    return SailsIOClient();
  }
  
})();

(function (angular, io) {
'use strict'/*global angular */
angular.module('ngSails', ['ng']);

/*global angular, io */
(function(angular, io) {
    'use strict';
    if(io.sails){
      io.sails.autoConnect = false;
    }

    // copied from angular
    function parseHeaders(headers) {
        var parsed = {},
            key, val, i;
        if (!headers) return parsed;
        angular.forEach(headers.split('\n'), function(line) {
            i = line.indexOf(':');
            key = lowercase(trim(line.substr(0, i)));
            val = trim(line.substr(i + 1));
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        });

        return parsed;
    }

    function trim(value) {
        return angular.isString(value) ? value.trim() : value;
    }

    function isPromiseLike (obj){
        return obj && angular.isFunction(obj.then);
    }

    // copied from angular
    function headersGetter(headers) {
        var headersObj = angular.isObject(headers) ? headers : undefined;
        return function(name) {
            if (!headersObj) headersObj = parseHeaders(headers);
            if (name) {
                var value = headersObj[lowercase(name)];
                if (value === void 0) {
                    value = null;
                }
                return value;
            }
            return headersObj;
        };
    }

    angular.module('ngSails').provider('$sails', function() {
        var provider = this;

        this.httpVerbs = ['get', 'post', 'put', 'delete'];

        this.eventNames = ['on', 'off'];

        this.url = undefined;

        this.urlPrefix = '';

        this.config = {
            transports: ['websocket', 'polling'],
            useCORSRouteToGetCookie: false
        };

        this.debug = false;

        // like https://docs.angularjs.org/api/ng/service/$http#interceptors
        // but with sails.io arguments
        var interceptorFactories = this.interceptors = [
            /*function($injectables) {
                return {
                    request: function(config) {},
                    response: function(response) {},
                    requestError: function(rejection) {},
                    responseError: function(rejection) {}
                };
            }*/
        ];

        /*@ngInject*/
        this.$get = ["$q", "$injector", "$rootScope", "$log", "$timeout", function($q, $injector, $rootScope, $log, $timeout) {
            var socket = (io.sails && io.sails.connect || io.connect)(provider.url, provider.config);

            socket.connect = function(opts){
                if(!socket.isConnected()){
                    var _opts = opts||{};
                    _opts = angular.extend({},provider.config,opts);

                    // These are the options sails.io.js actually sets when making the connection.
                    socket.useCORSRouteToGetCookie = _opts.useCORSRouteToGetCookie;
                    socket.url = _opts.url || provider.url;
                    socket.multiplex = _opts.multiplex;

                    socket._connect();
                }
                return socket;
            };

            // TODO: separate out interceptors into its own file (and provider?).
            // build interceptor chain
            var reversedInterceptors = [];
            angular.forEach(interceptorFactories, function(interceptorFactory) {
                reversedInterceptors.unshift(
                    angular.isString(interceptorFactory) ?
                    $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory)
                );
            });

            // Send the request using the socket
            function serverRequest(config) {
                var defer = $q.defer();
                if (provider.debug) $log.info('$sails ' + config.method + ' ' + config.url, config.data || '');

                if (config.timeout > 0) {
                    $timeout(timeoutRequest, config.timeout);
                } else if (isPromiseLike(config.timeout)) {
                    config.timeout.then(timeoutRequest);
                }

                socket['legacy_' + config.method.toLowerCase()](config.url, config.data, serverResponse);

                function timeoutRequest(){
                    serverResponse(null);
                }

                function serverResponse(result, jwr) {

                    if (!jwr) {
                        jwr = {
                            body: result,
                            headers: result.headers || {},
                            statusCode: result.statusCode || result.status || 0,
                            error: (function() {
                                if (this.statusCode < 200 || this.statusCode >= 400) {
                                    return this.body || this.statusCode;
                                }
                            })()
                        };
                    }

                    jwr.data = jwr.body; // $http compat
                    jwr.status = jwr.statusCode; // $http compat
                    jwr.socket = socket;
                    jwr.url = config.url;
                    jwr.method = config.method;
                    jwr.config = config.config;
                    if (jwr.error) {
                        if (provider.debug) $log.warn('$sails response ' + jwr.statusCode + ' ' + config.url, jwr);
                        defer.reject(jwr);
                    } else {
                        if (provider.debug) $log.info('$sails response ' + config.url, jwr);
                        defer.resolve(jwr);
                    }
                }

                return defer.promise;
            }

            function promisify(methodName) {
                socket['legacy_' + methodName] = socket[methodName];

                socket[methodName] = function(url, data, config) {

                    var chain = [serverRequest, undefined];

                    //TODO: more compatible with $http methods and config

                    var promise = $q.when({
                        url: provider.urlPrefix + url,
                        data: data,
                        socket: socket,
                        config: config || {},
                        method: methodName.toUpperCase()
                    });

                    // apply interceptors
                    angular.forEach(reversedInterceptors, function(interceptor) {
                        if (interceptor.request || interceptor.requestError) {
                            chain.unshift(interceptor.request, interceptor.requestError);
                        }
                        if (interceptor.response || interceptor.responseError) {
                            chain.push(interceptor.response, interceptor.responseError);
                        }
                    });

                    while (chain.length) {
                        var thenFn = chain.shift();
                        var rejectFn = chain.shift();

                        promise = promise.then(thenFn, rejectFn);
                    }

                    // be $http compatible
                    promise.success = function(fn) {
                        promise.then(function(jwr) {
                            fn(jwr.body, jwr.statusCode, headersGetter(jwr.headers), jwr);
                        });
                        return promise;
                    };
                    promise.error = function(fn) {
                        promise.then(null, function(jwr) {
                            fn(jwr.body, jwr.statusCode, headersGetter(jwr.headers), jwr);
                        });
                        return promise;
                    };

                    return promise;
                };
            }

            function wrapEvent(eventName) {
                if(socket[eventName] || socket._raw && socket._raw[eventName]) {
                    socket['legacy_' + eventName] = socket[eventName] || socket._raw[eventName];
                    socket[eventName] = function(event, cb) {
                    	var wrapEventFn = null;
                        if (eventName == 'off') {
                            return socket['legacy_' + eventName](event, cb);
                        }else if (cb !== null && angular.isFunction(cb)) {
                            socket['legacy_' + eventName](event, wrapEventFn = function(result) {
                                $rootScope.$evalAsync(cb.bind(socket, result));
                            });
                        }
                        return wrapEventFn;
                    };
                }
            }

            // sails.io.js doesn't have `once`, need to access it through `._raw`
            socket.once = function(event, cb){
              if (cb !== null && angular.isFunction(cb)) {
                if(socket._raw){
                  socket._raw.once(event, function(result) {
                      $rootScope.$evalAsync(cb.bind(socket, result));
                  });
                }
              }
            };

            angular.forEach(provider.httpVerbs, promisify);
            angular.forEach(provider.eventNames, wrapEvent);


            /**
             * Update a model on sails pushes
             * @param {String} name       Sails model name
             * @param {Array} models      Array with model objects
             */
            socket.$modelUpdater = function(name, models) {

                var update = function(message) {

                    $rootScope.$evalAsync(function(){
                        var i;

                        switch (message.verb) {

                            case "created":
                                // create new model item
                                models.push(message.data);
                                break;

                            case "updated":
                                var obj;
                                for (i = 0; i < models.length; i++) {
                                    if (models[i].id === message.id) {
                                        obj = models[i];
                                        break;
                                    }
                                }

                                // cant update if the angular-model does not have the item and the
                                // sails message does not give us the previous record
                                if (!obj && !message.previous) return;

                                if (!obj) {
                                    // sails has given us the previous record, create it in our model
                                    obj = message.previous;
                                    models.push(obj);
                                }

                                // update the model item
                                angular.extend(obj, message.data);
                                break;

                            case "destroyed":
                                for (i = 0; i < models.length; i++) {
                                    if (models[i].id === message.id) {
                                        models.splice(i, 1);
                                        break;
                                    }
                                }
                                break;
                        }
                    });
                };

                socket.legacy_on(name, update);

                return function(){
                    socket.legacy_off(name, update);
                };
            };

            return socket;
        }];
        this.$get.$inject = ["$q", "$injector", "$rootScope", "$log", "$timeout"];
    });
}(angular, io));
}(angular, io));
/*! hellojs v1.9.8 | (c) 2012-2015 Andrew Dodson | MIT https://adodson.com/hello.js/LICENSE */
// ES5 Object.create
if (!Object.create) {

	// Shim, Object create
	// A shim for Object.create(), it adds a prototype to a new object
	Object.create = (function() {

		function F() {}

		return function(o) {

			if (arguments.length != 1) {
				throw new Error('Object.create implementation only accepts one parameter.');
			}

			F.prototype = o;
			return new F();
		};

	})();

}

// ES5 Object.keys
if (!Object.keys) {
	Object.keys = function(o, k, r) {
		r = [];
		for (k in o) {
			if (r.hasOwnProperty.call(o, k))
				r.push(k);
		}

		return r;
	};
}

// ES5 [].indexOf
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(s) {

		for (var j = 0; j < this.length; j++) {
			if (this[j] === s) {
				return j;
			}
		}

		return -1;
	};
}

// ES5 [].forEach
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(fun/*, thisArg*/) {

		if (this === void 0 || this === null) {
			throw new TypeError();
		}

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== 'function') {
			throw new TypeError();
		}

		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t) {
				fun.call(thisArg, t[i], i, t);
			}
		}

		return this;
	};
}

// ES5 [].filter
if (!Array.prototype.filter) {
	Array.prototype.filter = function(fun, thisArg) {

		var a = [];
		this.forEach(function(val, i, t) {
			if (fun.call(thisArg || void 0, val, i, t)) {
				a.push(val);
			}
		});

		return a;
	};
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

	Array.prototype.map = function(fun, thisArg) {

		var a = [];
		this.forEach(function(val, i, t) {
			a.push(fun.call(thisArg || void 0, val, i, t));
		});

		return a;
	};
}

// ES5 isArray
if (!Array.isArray) {

	// Function Array.isArray
	Array.isArray = function(o) {
		return Object.prototype.toString.call(o) === '[object Array]';
	};

}

// Test for location.assign
if (typeof window === 'object' && typeof window.location === 'object' && !window.location.assign) {

	window.location.assign = function(url) {
		window.location = url;
	};

}

// Test for Function.bind
if (!Function.prototype.bind) {

	// MDN
	// Polyfill IE8, does not support native Function.bind
	Function.prototype.bind = function(b) {

		if (typeof this !== 'function') {
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		function C() {}

		var a = [].slice;
		var f = a.call(arguments, 1);
		var _this = this;
		var D = function() {
			return _this.apply(this instanceof C ? this : b || window, f.concat(a.call(arguments)));
		};

		C.prototype = this.prototype;
		D.prototype = new C();

		return D;
	};

}

/**
 * @hello.js
 *
 * HelloJS is a client side Javascript SDK for making OAuth2 logins and subsequent REST calls.
 *
 * @author Andrew Dodson
 * @website https://adodson.com/hello.js/
 *
 * @copyright Andrew Dodson, 2012 - 2015
 * @license MIT: You are free to use and modify this code for any use, on the condition that this copyright notice remains.
 */

var hello = function(name) {
	return hello.use(name);
};

hello.utils = {

	// Extend the first object with the properties and methods of the second
	extend: function(r /*, a[, b[, ...]] */) {

		// Get the arguments as an array but ommit the initial item
		Array.prototype.slice.call(arguments, 1).forEach(function(a) {
			if (r instanceof Object && a instanceof Object && r !== a) {
				for (var x in a) {
					r[x] = hello.utils.extend(r[x], a[x]);
				}
			}
			else {
				r = a;
			}
		});

		return r;
	}
};

// Core library
hello.utils.extend(hello, {

	settings: {

		// OAuth2 authentication defaults
		redirect_uri: window.location.href.split('#')[0],
		response_type: 'token',
		display: 'popup',
		state: '',

		// OAuth1 shim
		// The path to the OAuth1 server for signing user requests
		// Want to recreate your own? Checkout https://github.com/MrSwitch/node-oauth-shim
		oauth_proxy: 'https://auth-server.herokuapp.com/proxy',

		// API timeout in milliseconds
		timeout: 20000,

		// Popup Options
		popup: {
			resizable: 1,
			scrollbars: 1,
			width: 500,
			height: 550
		},

		// Default service / network
		default_service: null,

		// Force authentication
		// When hello.login is fired.
		// (null): ignore current session expiry and continue with login
		// (true): ignore current session expiry and continue with login, ask for user to reauthenticate
		// (false): if the current session looks good for the request scopes return the current session.
		force: null,

		// Page URL
		// When 'display=page' this property defines where the users page should end up after redirect_uri
		// Ths could be problematic if the redirect_uri is indeed the final place,
		// Typically this circumvents the problem of the redirect_url being a dumb relay page.
		page_uri: window.location.href
	},

	// Service configuration objects
	services: {},

	// Use
	// Define a new instance of the HelloJS library with a default service
	use: function(service) {

		// Create self, which inherits from its parent
		var self = Object.create(this);

		// Inherit the prototype from its parent
		self.settings = Object.create(this.settings);

		// Define the default service
		if (service) {
			self.settings.default_service = service;
		}

		// Create an instance of Events
		self.utils.Event.call(self);

		return self;
	},

	// Initialize
	// Define the client_ids for the endpoint services
	// @param object o, contains a key value pair, service => clientId
	// @param object opts, contains a key value pair of options used for defining the authentication defaults
	// @param number timeout, timeout in seconds
	init: function(services, options) {

		var utils = this.utils;

		if (!services) {
			return this.services;
		}

		// Define provider credentials
		// Reformat the ID field
		for (var x in services) {if (services.hasOwnProperty(x)) {
			if (typeof (services[x]) !== 'object') {
				services[x] = {id: services[x]};
			}
		}}

		// Merge services if there already exists some
		utils.extend(this.services, services);

		// Format the incoming
		for (x in this.services) {
			if (this.services.hasOwnProperty(x)) {
				this.services[x].scope = this.services[x].scope || {};
			}
		}

		//
		// Update the default settings with this one.
		if (options) {
			utils.extend(this.settings, options);

			// Do this immediatly incase the browser changes the current path.
			if ('redirect_uri' in options) {
				this.settings.redirect_uri = utils.url(options.redirect_uri).href;
			}
		}

		return this;
	},

	// Login
	// Using the endpoint
	// @param network stringify       name to connect to
	// @param options object    (optional)  {display mode, is either none|popup(default)|page, scope: email,birthday,publish, .. }
	// @param callback  function  (optional)  fired on signin
	login: function() {

		// Create an object which inherits its parent as the prototype and constructs a new event chain.
		var _this = this;
		var utils = _this.utils;
		var error = utils.error;
		var promise = utils.Promise();

		// Get parameters
		var p = utils.args({network: 's', options: 'o', callback: 'f'}, arguments);

		// Local vars
		var url;

		// Get all the custom options and store to be appended to the querystring
		var qs = utils.diffKey(p.options, _this.settings);

		// Merge/override options with app defaults
		var opts = p.options = utils.merge(_this.settings, p.options || {});

		// Merge/override options with app defaults
		opts.popup = utils.merge(_this.settings.popup, p.options.popup || {});

		// Network
		p.network = p.network || _this.settings.default_service;

		// Bind callback to both reject and fulfill states
		promise.proxy.then(p.callback, p.callback);

		// Trigger an event on the global listener
		function emit(s, value) {
			hello.emit(s, value);
		}

		promise.proxy.then(emit.bind(this, 'auth.login auth'), emit.bind(this, 'auth.failed auth'));

		// Is our service valid?
		if (typeof (p.network) !== 'string' || !(p.network in _this.services)) {
			// Trigger the default login.
			// Ahh we dont have one.
			return promise.reject(error('invalid_network', 'The provided network was not recognized'));
		}

		var provider = _this.services[p.network];

		// Create a global listener to capture events triggered out of scope
		var callbackId = utils.globalEvent(function(str) {

			// The responseHandler returns a string, lets save this locally
			var obj;

			if (str) {
				obj = JSON.parse(str);
			}
			else {
				obj = error('cancelled', 'The authentication was not completed');
			}

			// Handle these response using the local
			// Trigger on the parent
			if (!obj.error) {

				// Save on the parent window the new credentials
				// This fixes an IE10 bug i think... atleast it does for me.
				utils.store(obj.network, obj);

				// Fulfill a successful login
				promise.fulfill({
					network: obj.network,
					authResponse: obj
				});
			}
			else {
				// Reject a successful login
				promise.reject(obj);
			}
		});

		var redirectUri = utils.url(opts.redirect_uri).href;

		// May be a space-delimited list of multiple, complementary types
		var responseType = provider.oauth.response_type || opts.response_type;

		// Fallback to token if the module hasn't defined a grant url
		if (/\bcode\b/.test(responseType) && !provider.oauth.grant) {
			responseType = responseType.replace(/\bcode\b/, 'token');
		}

		// Query string parameters, we may pass our own arguments to form the querystring
		p.qs = utils.merge(qs, {
			client_id: encodeURIComponent(provider.id),
			response_type: encodeURIComponent(responseType),
			redirect_uri: encodeURIComponent(redirectUri),
			display: opts.display,
			scope: 'basic',
			state: {
				client_id: provider.id,
				network: p.network,
				display: opts.display,
				callback: callbackId,
				state: opts.state,
				redirect_uri: redirectUri
			}
		});

		// Get current session for merging scopes, and for quick auth response
		var session = utils.store(p.network);

		// Scopes (authentication permisions)
		// Ensure this is a string - IE has a problem moving Arrays between windows
		// Append the setup scope
		var SCOPE_SPLIT = /[,\s]+/;
		var scope = (opts.scope || '').toString() + ',' + p.qs.scope;

		// Append scopes from a previous session.
		// This helps keep app credentials constant,
		// Avoiding having to keep tabs on what scopes are authorized
		if (session && 'scope' in session && session.scope instanceof String) {
			scope += ',' + session.scope;
		}

		// Convert scope to an Array
		// - easier to manipulate
		scope = scope.split(SCOPE_SPLIT);

		// Format remove duplicates and empty values
		scope = utils.unique(scope).filter(filterEmpty);

		// Save the the scopes to the state with the names that they were requested with.
		p.qs.state.scope = scope.join(',');

		// Map scopes to the providers naming convention
		scope = scope.map(function(item) {
			// Does this have a mapping?
			if (item in provider.scope) {
				return provider.scope[item];
			}
			else {
				// Loop through all services and determine whether the scope is generic
				for (var x in _this.services) {
					var serviceScopes = _this.services[x].scope;
					if (serviceScopes && item in serviceScopes) {
						// Found an instance of this scope, so lets not assume its special
						return '';
					}
				}

				// This is a unique scope to this service so lets in it.
				return item;
			}

		});

		// Stringify and Arrayify so that double mapped scopes are given the chance to be formatted
		scope = scope.join(',').split(SCOPE_SPLIT);

		// Again...
		// Format remove duplicates and empty values
		scope = utils.unique(scope).filter(filterEmpty);

		// Join with the expected scope delimiter into a string
		p.qs.scope = scope.join(provider.scope_delim || ',');

		// Is the user already signed in with the appropriate scopes, valid access_token?
		if (opts.force === false) {

			if (session && 'access_token' in session && session.access_token && 'expires' in session && session.expires > ((new Date()).getTime() / 1e3)) {
				// What is different about the scopes in the session vs the scopes in the new login?
				var diff = utils.diff((session.scope || '').split(SCOPE_SPLIT), (p.qs.state.scope || '').split(SCOPE_SPLIT));
				if (diff.length === 0) {

					// OK trigger the callback
					promise.fulfill({
						unchanged: true,
						network: p.network,
						authResponse: session
					});

					// Nothing has changed
					return promise;
				}
			}
		}

		// Page URL
		if (opts.display === 'page' && opts.page_uri) {
			// Add a page location, place to endup after session has authenticated
			p.qs.state.page_uri = utils.url(opts.page_uri).href;
		}

		// Bespoke
		// Override login querystrings from auth_options
		if ('login' in provider && typeof (provider.login) === 'function') {
			// Format the paramaters according to the providers formatting function
			provider.login(p);
		}

		// Add OAuth to state
		// Where the service is going to take advantage of the oauth_proxy
		if (!/\btoken\b/.test(responseType) ||
		parseInt(provider.oauth.version, 10) < 2 ||
		(opts.display === 'none' && provider.oauth.grant && session && session.refresh_token)) {

			// Add the oauth endpoints
			p.qs.state.oauth = provider.oauth;

			// Add the proxy url
			p.qs.state.oauth_proxy = opts.oauth_proxy;

		}

		// Convert state to a string
		p.qs.state = encodeURIComponent(JSON.stringify(p.qs.state));

		// URL
		if (parseInt(provider.oauth.version, 10) === 1) {

			// Turn the request to the OAuth Proxy for 3-legged auth
			url = utils.qs(opts.oauth_proxy, p.qs, encodeFunction);
		}

		// Refresh token
		else if (opts.display === 'none' && provider.oauth.grant && session && session.refresh_token) {

			// Add the refresh_token to the request
			p.qs.refresh_token = session.refresh_token;

			// Define the request path
			url = utils.qs(opts.oauth_proxy, p.qs, encodeFunction);
		}
		else {
			url = utils.qs(provider.oauth.auth, p.qs, encodeFunction);
		}

		// Execute
		// Trigger how we want self displayed
		if (opts.display === 'none') {
			// Sign-in in the background, iframe
			utils.iframe(url, redirectUri);
		}

		// Triggering popup?
		else if (opts.display === 'popup') {

			var popup = utils.popup(url, redirectUri, opts.popup);

			var timer = setInterval(function() {
				if (!popup || popup.closed) {
					clearInterval(timer);
					if (!promise.state) {

						var response = error('cancelled', 'Login has been cancelled');

						if (!popup) {
							response = error('blocked', 'Popup was blocked');
						}

						response.network = p.network;

						promise.reject(response);
					}
				}
			}, 100);
		}

		else {
			window.location = url;
		}

		return promise.proxy;

		function encodeFunction(s) {return s;}

		function filterEmpty(s) {return !!s;}
	},

	// Remove any data associated with a given service
	// @param string name of the service
	// @param function callback
	logout: function() {

		var _this = this;
		var utils = _this.utils;
		var error = utils.error;

		// Create a new promise
		var promise = utils.Promise();

		var p = utils.args({name:'s', options: 'o', callback: 'f'}, arguments);

		p.options = p.options || {};

		// Add callback to events
		promise.proxy.then(p.callback, p.callback);

		// Trigger an event on the global listener
		function emit(s, value) {
			hello.emit(s, value);
		}

		promise.proxy.then(emit.bind(this, 'auth.logout auth'), emit.bind(this, 'error'));

		// Network
		p.name = p.name || this.settings.default_service;
		p.authResponse = utils.store(p.name);

		if (p.name && !(p.name in _this.services)) {

			promise.reject(error('invalid_network', 'The network was unrecognized'));

		}
		else if (p.name && p.authResponse) {

			// Define the callback
			var callback = function(opts) {

				// Remove from the store
				utils.store(p.name, '');

				// Emit events by default
				promise.fulfill(hello.utils.merge({network:p.name}, opts || {}));
			};

			// Run an async operation to remove the users session
			var _opts = {};
			if (p.options.force) {
				var logout = _this.services[p.name].logout;
				if (logout) {
					// Convert logout to URL string,
					// If no string is returned, then this function will handle the logout async style
					if (typeof (logout) === 'function') {
						logout = logout(callback, p);
					}

					// If logout is a string then assume URL and open in iframe.
					if (typeof (logout) === 'string') {
						utils.iframe(logout);
						_opts.force = null;
						_opts.message = 'Logout success on providers site was indeterminate';
					}
					else if (logout === undefined) {
						// The callback function will handle the response.
						return promise.proxy;
					}
				}
			}

			// Remove local credentials
			callback(_opts);
		}
		else {
			promise.reject(error('invalid_session', 'There was no session to remove'));
		}

		return promise.proxy;
	},

	// Returns all the sessions that are subscribed too
	// @param string optional, name of the service to get information about.
	getAuthResponse: function(service) {

		// If the service doesn't exist
		service = service || this.settings.default_service;

		if (!service || !(service in this.services)) {
			return null;
		}

		return this.utils.store(service) || null;
	},

	// Events: placeholder for the events
	events: {}
});

// Core utilities
hello.utils.extend(hello.utils, {

	// Error
	error: function(code, message) {
		return {
			error: {
				code: code,
				message: message
			}
		};
	},

	// Append the querystring to a url
	// @param string url
	// @param object parameters
	qs: function(url, params, formatFunction) {

		if (params) {

			// Set default formatting function
			formatFunction = formatFunction || encodeURIComponent;

			// Override the items in the URL which already exist
			for (var x in params) {
				var str = '([\\?\\&])' + x + '=[^\\&]*';
				var reg = new RegExp(str);
				if (url.match(reg)) {
					url = url.replace(reg, '$1' + x + '=' + formatFunction(params[x]));
					delete params[x];
				}
			}
		}

		if (!this.isEmpty(params)) {
			return url + (url.indexOf('?') > -1 ? '&' : '?') + this.param(params, formatFunction);
		}

		return url;
	},

	// Param
	// Explode/encode the parameters of an URL string/object
	// @param string s, string to decode
	param: function(s, formatFunction) {
		var b;
		var a = {};
		var m;

		if (typeof (s) === 'string') {

			formatFunction = formatFunction || decodeURIComponent;

			m = s.replace(/^[\#\?]/, '').match(/([^=\/\&]+)=([^\&]+)/g);
			if (m) {
				for (var i = 0; i < m.length; i++) {
					b = m[i].match(/([^=]+)=(.*)/);
					a[b[1]] = formatFunction(b[2]);
				}
			}

			return a;
		}
		else {

			formatFunction = formatFunction || encodeURIComponent;

			var o = s;

			a = [];

			for (var x in o) {if (o.hasOwnProperty(x)) {
				if (o.hasOwnProperty(x)) {
					a.push([x, o[x] === '?' ? '?' : formatFunction(o[x])].join('='));
				}
			}}

			return a.join('&');
		}
	},

	// Local storage facade
	store: (function() {

		var a = ['localStorage', 'sessionStorage'];
		var i = -1;
		var prefix = 'test';

		// Set LocalStorage
		var localStorage;

		while (a[++i]) {
			try {
				// In Chrome with cookies blocked, calling localStorage throws an error
				localStorage = window[a[i]];
				localStorage.setItem(prefix + i, i);
				localStorage.removeItem(prefix + i);
				break;
			}
			catch (e) {
				localStorage = null;
			}
		}

		if (!localStorage) {

			var cache = null;

			localStorage = {
				getItem: function(prop) {
					prop = prop + '=';
					var m = document.cookie.split(';');
					for (var i = 0; i < m.length; i++) {
						var _m = m[i].replace(/(^\s+|\s+$)/, '');
						if (_m && _m.indexOf(prop) === 0) {
							return _m.substr(prop.length);
						}
					}

					return cache;
				},

				setItem: function(prop, value) {
					cache = value;
					document.cookie = prop + '=' + value;
				}
			};

			// Fill the cache up
			cache = localStorage.getItem('hello');
		}

		function get() {
			var json = {};
			try {
				json = JSON.parse(localStorage.getItem('hello')) || {};
			}
			catch (e) {}

			return json;
		}

		function set(json) {
			localStorage.setItem('hello', JSON.stringify(json));
		}

		// Check if the browser support local storage
		return function(name, value, days) {

			// Local storage
			var json = get();

			if (name && value === undefined) {
				return json[name] || null;
			}
			else if (name && value === null) {
				try {
					delete json[name];
				}
				catch (e) {
					json[name] = null;
				}
			}
			else if (name) {
				json[name] = value;
			}
			else {
				return json;
			}

			set(json);

			return json || null;
		};

	})(),

	// Create and Append new DOM elements
	// @param node string
	// @param attr object literal
	// @param dom/string
	append: function(node, attr, target) {

		var n = typeof (node) === 'string' ? document.createElement(node) : node;

		if (typeof (attr) === 'object') {
			if ('tagName' in attr) {
				target = attr;
			}
			else {
				for (var x in attr) {if (attr.hasOwnProperty(x)) {
					if (typeof (attr[x]) === 'object') {
						for (var y in attr[x]) {if (attr[x].hasOwnProperty(y)) {
							n[x][y] = attr[x][y];
						}}
					}
					else if (x === 'html') {
						n.innerHTML = attr[x];
					}

					// IE doesn't like us setting methods with setAttribute
					else if (!/^on/.test(x)) {
						n.setAttribute(x, attr[x]);
					}
					else {
						n[x] = attr[x];
					}
				}}
			}
		}

		if (target === 'body') {
			(function self() {
				if (document.body) {
					document.body.appendChild(n);
				}
				else {
					setTimeout(self, 16);
				}
			})();
		}
		else if (typeof (target) === 'object') {
			target.appendChild(n);
		}
		else if (typeof (target) === 'string') {
			document.getElementsByTagName(target)[0].appendChild(n);
		}

		return n;
	},

	// An easy way to create a hidden iframe
	// @param string src
	iframe: function(src) {
		this.append('iframe', {src: src, style: {position:'absolute', left: '-1000px', bottom: 0, height: '1px', width: '1px'}}, 'body');
	},

	// Recursive merge two objects into one, second parameter overides the first
	// @param a array
	merge: function(/* Args: a, b, c, .. n */) {
		var args = Array.prototype.slice.call(arguments);
		args.unshift({});
		return this.extend.apply(null, args);
	},

	// Makes it easier to assign parameters, where some are optional
	// @param o object
	// @param a arguments
	args: function(o, args) {

		var p = {};
		var i = 0;
		var t = null;
		var x = null;

		// 'x' is the first key in the list of object parameters
		for (x in o) {if (o.hasOwnProperty(x)) {
			break;
		}}

		// Passing in hash object of arguments?
		// Where the first argument can't be an object
		if ((args.length === 1) && (typeof (args[0]) === 'object') && o[x] != 'o!') {

			// Could this object still belong to a property?
			// Check the object keys if they match any of the property keys
			for (x in args[0]) {if (o.hasOwnProperty(x)) {
				// Does this key exist in the property list?
				if (x in o) {
					// Yes this key does exist so its most likely this function has been invoked with an object parameter
					// Return first argument as the hash of all arguments
					return args[0];
				}
			}}
		}

		// Else loop through and account for the missing ones.
		for (x in o) {if (o.hasOwnProperty(x)) {

			t = typeof (args[i]);

			if ((typeof (o[x]) === 'function' && o[x].test(args[i])) || (typeof (o[x]) === 'string' && (
			(o[x].indexOf('s') > -1 && t === 'string') ||
			(o[x].indexOf('o') > -1 && t === 'object') ||
			(o[x].indexOf('i') > -1 && t === 'number') ||
			(o[x].indexOf('a') > -1 && t === 'object') ||
			(o[x].indexOf('f') > -1 && t === 'function')
			))
			) {
				p[x] = args[i++];
			}

			else if (typeof (o[x]) === 'string' && o[x].indexOf('!') > -1) {
				return false;
			}
		}}

		return p;
	},

	// Returns a URL instance
	url: function(path) {

		// If the path is empty
		if (!path) {
			return window.location;
		}

		// Chrome and FireFox support new URL() to extract URL objects
		else if (window.URL && URL instanceof Function && URL.length !== 0) {
			return new URL(path, window.location);
		}

		// Ugly shim, it works!
		else {
			var a = document.createElement('a');
			a.href = path;
			return a.cloneNode(false);
		}
	},

	diff: function(a, b) {
		return b.filter(function(item) {
			return a.indexOf(item) === -1;
		});
	},

	// Get the different hash of properties unique to `a`, and not in `b`
	diffKey: function(a, b) {
		if (a || !b) {
			var r = {};
			for (var x in a) {
				// Does the property not exist?
				if (!(x in b)) {
					r[x] = a[x];
				}
			}

			return r;
		}

		return a;
	},

	// Unique
	// Remove duplicate and null values from an array
	// @param a array
	unique: function(a) {
		if (!Array.isArray(a)) { return []; }

		return a.filter(function(item, index) {
			// Is this the first location of item
			return a.indexOf(item) === index;
		});
	},

	isEmpty: function(obj) {

		// Scalar
		if (!obj)
			return true;

		// Array
		if (Array.isArray(obj)) {
			return !obj.length;
		}
		else if (typeof (obj) === 'object') {
			// Object
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					return false;
				}
			}
		}

		return true;
	},

	//jscs:disable

	/*!
	 **  Thenable -- Embeddable Minimum Strictly-Compliant Promises/A+ 1.1.1 Thenable
	 **  Copyright (c) 2013-2014 Ralf S. Engelschall <http://engelschall.com>
	 **  Licensed under The MIT License <http://opensource.org/licenses/MIT>
	 **  Source-Code distributed on <http://github.com/rse/thenable>
	 */
	Promise: (function(){
		/*  promise states [Promises/A+ 2.1]  */
		var STATE_PENDING   = 0;                                         /*  [Promises/A+ 2.1.1]  */
		var STATE_FULFILLED = 1;                                         /*  [Promises/A+ 2.1.2]  */
		var STATE_REJECTED  = 2;                                         /*  [Promises/A+ 2.1.3]  */

		/*  promise object constructor  */
		var api = function (executor) {
			/*  optionally support non-constructor/plain-function call  */
			if (!(this instanceof api))
				return new api(executor);

			/*  initialize object  */
			this.id           = "Thenable/1.0.6";
			this.state        = STATE_PENDING; /*  initial state  */
			this.fulfillValue = undefined;     /*  initial value  */     /*  [Promises/A+ 1.3, 2.1.2.2]  */
			this.rejectReason = undefined;     /*  initial reason */     /*  [Promises/A+ 1.5, 2.1.3.2]  */
			this.onFulfilled  = [];            /*  initial handlers  */
			this.onRejected   = [];            /*  initial handlers  */

			/*  provide optional information-hiding proxy  */
			this.proxy = {
				then: this.then.bind(this)
			};

			/*  support optional executor function  */
			if (typeof executor === "function")
				executor.call(this, this.fulfill.bind(this), this.reject.bind(this));
		};

		/*  promise API methods  */
		api.prototype = {
			/*  promise resolving methods  */
			fulfill: function (value) { return deliver(this, STATE_FULFILLED, "fulfillValue", value); },
			reject:  function (value) { return deliver(this, STATE_REJECTED,  "rejectReason", value); },

			/*  "The then Method" [Promises/A+ 1.1, 1.2, 2.2]  */
			then: function (onFulfilled, onRejected) {
				var curr = this;
				var next = new api();                                    /*  [Promises/A+ 2.2.7]  */
				curr.onFulfilled.push(
					resolver(onFulfilled, next, "fulfill"));             /*  [Promises/A+ 2.2.2/2.2.6]  */
				curr.onRejected.push(
					resolver(onRejected,  next, "reject" ));             /*  [Promises/A+ 2.2.3/2.2.6]  */
				execute(curr);
				return next.proxy;                                       /*  [Promises/A+ 2.2.7, 3.3]  */
			}
		};

		/*  deliver an action  */
		var deliver = function (curr, state, name, value) {
			if (curr.state === STATE_PENDING) {
				curr.state = state;                                      /*  [Promises/A+ 2.1.2.1, 2.1.3.1]  */
				curr[name] = value;                                      /*  [Promises/A+ 2.1.2.2, 2.1.3.2]  */
				execute(curr);
			}
			return curr;
		};

		/*  execute all handlers  */
		var execute = function (curr) {
			if (curr.state === STATE_FULFILLED)
				execute_handlers(curr, "onFulfilled", curr.fulfillValue);
			else if (curr.state === STATE_REJECTED)
				execute_handlers(curr, "onRejected",  curr.rejectReason);
		};

		/*  execute particular set of handlers  */
		var execute_handlers = function (curr, name, value) {
			/* global process: true */
			/* global setImmediate: true */
			/* global setTimeout: true */

			/*  short-circuit processing  */
			if (curr[name].length === 0)
				return;

			/*  iterate over all handlers, exactly once  */
			var handlers = curr[name];
			curr[name] = [];                                             /*  [Promises/A+ 2.2.2.3, 2.2.3.3]  */
			var func = function () {
				for (var i = 0; i < handlers.length; i++)
					handlers[i](value);                                  /*  [Promises/A+ 2.2.5]  */
			};

			/*  execute procedure asynchronously  */                     /*  [Promises/A+ 2.2.4, 3.1]  */
			if (typeof process === "object" && typeof process.nextTick === "function")
				process.nextTick(func);
			else if (typeof setImmediate === "function")
				setImmediate(func);
			else
				setTimeout(func, 0);
		};

		/*  generate a resolver function  */
		var resolver = function (cb, next, method) {
			return function (value) {
				if (typeof cb !== "function")                            /*  [Promises/A+ 2.2.1, 2.2.7.3, 2.2.7.4]  */
					next[method].call(next, value);                      /*  [Promises/A+ 2.2.7.3, 2.2.7.4]  */
				else {
					var result;
					try { result = cb(value); }                          /*  [Promises/A+ 2.2.2.1, 2.2.3.1, 2.2.5, 3.2]  */
					catch (e) {
						next.reject(e);                                  /*  [Promises/A+ 2.2.7.2]  */
						return;
					}
					resolve(next, result);                               /*  [Promises/A+ 2.2.7.1]  */
				}
			};
		};

		/*  "Promise Resolution Procedure"  */                           /*  [Promises/A+ 2.3]  */
		var resolve = function (promise, x) {
			/*  sanity check arguments  */                               /*  [Promises/A+ 2.3.1]  */
			if (promise === x || promise.proxy === x) {
				promise.reject(new TypeError("cannot resolve promise with itself"));
				return;
			}

			/*  surgically check for a "then" method
				(mainly to just call the "getter" of "then" only once)  */
			var then;
			if ((typeof x === "object" && x !== null) || typeof x === "function") {
				try { then = x.then; }                                   /*  [Promises/A+ 2.3.3.1, 3.5]  */
				catch (e) {
					promise.reject(e);                                   /*  [Promises/A+ 2.3.3.2]  */
					return;
				}
			}

			/*  handle own Thenables    [Promises/A+ 2.3.2]
				and similar "thenables" [Promises/A+ 2.3.3]  */
			if (typeof then === "function") {
				var resolved = false;
				try {
					/*  call retrieved "then" method */                  /*  [Promises/A+ 2.3.3.3]  */
					then.call(x,
						/*  resolvePromise  */                           /*  [Promises/A+ 2.3.3.3.1]  */
						function (y) {
							if (resolved) return; resolved = true;       /*  [Promises/A+ 2.3.3.3.3]  */
							if (y === x)                                 /*  [Promises/A+ 3.6]  */
								promise.reject(new TypeError("circular thenable chain"));
							else
								resolve(promise, y);
						},

						/*  rejectPromise  */                            /*  [Promises/A+ 2.3.3.3.2]  */
						function (r) {
							if (resolved) return; resolved = true;       /*  [Promises/A+ 2.3.3.3.3]  */
							promise.reject(r);
						}
					);
				}
				catch (e) {
					if (!resolved)                                       /*  [Promises/A+ 2.3.3.3.3]  */
						promise.reject(e);                               /*  [Promises/A+ 2.3.3.3.4]  */
				}
				return;
			}

			/*  handle other values  */
			promise.fulfill(x);                                          /*  [Promises/A+ 2.3.4, 2.3.3.4]  */
		};

		/*  export API  */
		return api;
	})(),

	//jscs:enable

	// Event
	// A contructor superclass for adding event menthods, on, off, emit.
	Event: function() {

		var separator = /[\s\,]+/;

		// If this doesn't support getPrototype then we can't get prototype.events of the parent
		// So lets get the current instance events, and add those to a parent property
		this.parent = {
			events: this.events,
			findEvents: this.findEvents,
			parent: this.parent,
			utils: this.utils
		};

		this.events = {};

		// On, subscribe to events
		// @param evt   string
		// @param callback  function
		this.on = function(evt, callback) {

			if (callback && typeof (callback) === 'function') {
				var a = evt.split(separator);
				for (var i = 0; i < a.length; i++) {

					// Has this event already been fired on this instance?
					this.events[a[i]] = [callback].concat(this.events[a[i]] || []);
				}
			}

			return this;
		};

		// Off, unsubscribe to events
		// @param evt   string
		// @param callback  function
		this.off = function(evt, callback) {

			this.findEvents(evt, function(name, index) {
				if (!callback || this.events[name][index] === callback) {
					this.events[name][index] = null;
				}
			});

			return this;
		};

		// Emit
		// Triggers any subscribed events
		this.emit = function(evt /*, data, ... */) {

			// Get arguments as an Array, knock off the first one
			var args = Array.prototype.slice.call(arguments, 1);
			args.push(evt);

			// Handler
			var handler = function(name, index) {

				// Replace the last property with the event name
				args[args.length - 1] = (name === '*' ? evt : name);

				// Trigger
				this.events[name][index].apply(this, args);
			};

			// Find the callbacks which match the condition and call
			var _this = this;
			while (_this && _this.findEvents) {

				// Find events which match
				_this.findEvents(evt + ',*', handler);
				_this = _this.parent;
			}

			return this;
		};

		//
		// Easy functions
		this.emitAfter = function() {
			var _this = this;
			var args = arguments;
			setTimeout(function() {
				_this.emit.apply(_this, args);
			}, 0);

			return this;
		};

		this.findEvents = function(evt, callback) {

			var a = evt.split(separator);

			for (var name in this.events) {if (this.events.hasOwnProperty(name)) {

				if (a.indexOf(name) > -1) {

					for (var i = 0; i < this.events[name].length; i++) {

						// Does the event handler exist?
						if (this.events[name][i]) {
							// Emit on the local instance of this
							callback.call(this, name, i);
						}
					}
				}
			}}
		};

		return this;
	},

	// Global Events
	// Attach the callback to the window object
	// Return its unique reference
	globalEvent: function(callback, guid) {
		// If the guid has not been supplied then create a new one.
		guid = guid || '_hellojs_' + parseInt(Math.random() * 1e12, 10).toString(36);

		// Define the callback function
		window[guid] = function() {
			// Trigger the callback
			try {
				if (callback.apply(this, arguments)) {
					delete window[guid];
				}
			}
			catch (e) {
				console.error(e);
			}
		};

		return guid;
	},

	// Trigger a clientside popup
	// This has been augmented to support PhoneGap
	popup: function(url, redirectUri, options) {

		var documentElement = document.documentElement;

		// Multi Screen Popup Positioning (http://stackoverflow.com/a/16861050)
		// Credit: http://www.xtf.dk/2011/08/center-new-popup-window-even-on.html
		// Fixes dual-screen position                         Most browsers      Firefox

		if (options.height) {
			var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
			var height = screen.height || window.innerHeight || documentElement.clientHeight;
			options.top = parseInt((height - options.height) / 2, 10) + dualScreenTop;
		}

		if (options.width) {
			var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
			var width = screen.width || window.innerWidth || documentElement.clientWidth;
			options.left = parseInt((width - options.width) / 2, 10) + dualScreenLeft;
		}

		// Convert options into an array
		var optionsArray = [];
		Object.keys(options).forEach(function(name) {
			var value = options[name];
			optionsArray.push(name + (value !== null ? '=' + value : ''));
		});

		// Create a function for reopening the popup, and assigning events to the new popup object
		// This is a fix whereby triggering the
		var open = function(url) {

			// Trigger callback
			var popup = window.open(
				url,
				'_blank',
				optionsArray.join(',')
			);

			// PhoneGap support
			// Add an event listener to listen to the change in the popup windows URL
			// This must appear before popup.focus();
			try {
				if (popup && popup.addEventListener) {

					// Get the origin of the redirect URI

					var a = hello.utils.url(redirectUri);
					var redirectUriOrigin = a.origin || (a.protocol + '//' + a.hostname);

					// Listen to changes in the InAppBrowser window

					popup.addEventListener('loadstart', function(e) {

						var url = e.url;

						// Is this the path, as given by the redirectUri?
						// Check the new URL agains the redirectUriOrigin.
						// According to #63 a user could click 'cancel' in some dialog boxes ....
						// The popup redirects to another page with the same origin, yet we still wish it to close.

						if (url.indexOf(redirectUriOrigin) !== 0) {
							return;
						}

						// Split appart the URL
						var a = hello.utils.url(url);

						// We dont have window operations on the popup so lets create some
						// The location can be augmented in to a location object like so...

						var _popup = {
							location: {
								// Change the location of the popup
								assign: function(location) {

									// Unfourtunatly an app is may not change the location of a InAppBrowser window.
									// So to shim this, just open a new one.

									popup.addEventListener('exit', function() {

										// For some reason its failing to close the window if a new window opens too soon.

										setTimeout(function() {
											open(location);
										}, 1000);
									});
								},

								search: a.search,
								hash: a.hash,
								href: a.href
							},
							close: function() {
								if (popup.close) {
									popup.close();
								}
							}
						};

						// Then this URL contains information which HelloJS must process
						// URL string
						// Window - any action such as window relocation goes here
						// Opener - the parent window which opened this, aka this script

						hello.utils.responseHandler(_popup, window);

						// Always close the popup regardless of whether the hello.utils.responseHandler detects a state parameter or not in the querystring.
						// Such situations might arise such as those in #63

						_popup.close();

					});
				}
			}
			catch (e) {}

			if (popup && popup.focus) {
				popup.focus();
			}

			return popup;
		};

		// Call the open() function with the initial path
		//
		// OAuth redirect, fixes URI fragments from being lost in Safari
		// (URI Fragments within 302 Location URI are lost over HTTPS)
		// Loading the redirect.html before triggering the OAuth Flow seems to fix it.
		//
		// Firefox  decodes URL fragments when calling location.hash.
		//  - This is bad if the value contains break points which are escaped
		//  - Hence the url must be encoded twice as it contains breakpoints.
		if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
			url = redirectUri + '#oauth_redirect=' + encodeURIComponent(encodeURIComponent(url));
		}

		return open(url);
	},

	// OAuth and API response handler
	responseHandler: function(window, parent) {

		var _this = this;
		var p;
		var location = window.location;

		// Is this an auth relay message which needs to call the proxy?
		p = _this.param(location.search);

		// OAuth2 or OAuth1 server response?
		if (p && p.state && (p.code || p.oauth_token)) {

			var state = JSON.parse(p.state);

			// Add this path as the redirect_uri
			p.redirect_uri = state.redirect_uri || location.href.replace(/[\?\#].*$/, '');

			// Redirect to the host
			var path = state.oauth_proxy + '?' + _this.param(p);

			location.assign(path);

			return;
		}

		// Save session, from redirected authentication
		// #access_token has come in?
		//
		// FACEBOOK is returning auth errors within as a query_string... thats a stickler for consistency.
		// SoundCloud is the state in the querystring and the token in the hashtag, so we'll mix the two together

		p = _this.merge(_this.param(location.search || ''), _this.param(location.hash || ''));

		// If p.state
		if (p && 'state' in p) {

			// Remove any addition information
			// E.g. p.state = 'facebook.page';
			try {
				var a = JSON.parse(p.state);
				_this.extend(p, a);
			}
			catch (e) {
				console.error('Could not decode state parameter');
			}

			// Access_token?
			if (('access_token' in p && p.access_token) && p.network) {

				if (!p.expires_in || parseInt(p.expires_in, 10) === 0) {
					// If p.expires_in is unset, set to 0
					p.expires_in = 0;
				}

				p.expires_in = parseInt(p.expires_in, 10);
				p.expires = ((new Date()).getTime() / 1e3) + (p.expires_in || (60 * 60 * 24 * 365));

				// Lets use the "state" to assign it to one of our networks
				authCallback(p, window, parent);
			}

			// Error=?
			// &error_description=?
			// &state=?
			else if (('error' in p && p.error) && p.network) {

				p.error = {
					code: p.error,
					message: p.error_message || p.error_description
				};

				// Let the state handler handle it
				authCallback(p, window, parent);
			}

			// API call, or a cancelled login
			// Result is serialized JSON string
			else if (p.callback && p.callback in parent) {

				// Trigger a function in the parent
				var res = 'result' in p && p.result ? JSON.parse(p.result) : false;

				// Trigger the callback on the parent
				parent[p.callback](res);
				closeWindow();
			}

			// If this page is still open
			if (p.page_uri) {
				location.assign(p.page_uri);
			}
		}

		// OAuth redirect, fixes URI fragments from being lost in Safari
		// (URI Fragments within 302 Location URI are lost over HTTPS)
		// Loading the redirect.html before triggering the OAuth Flow seems to fix it.
		else if ('oauth_redirect' in p) {

			location.assign(decodeURIComponent(p.oauth_redirect));
			return;
		}

		// Trigger a callback to authenticate
		function authCallback(obj, window, parent) {

			var cb = obj.callback;
			var network = obj.network;

			// Trigger the callback on the parent
			_this.store(network, obj);

			// If this is a page request it has no parent or opener window to handle callbacks
			if (('display' in obj) && obj.display === 'page') {
				return;
			}

			// Remove from session object
			if (parent && cb && cb in parent) {

				try {
					delete obj.callback;
				}
				catch (e) {}

				// Update store
				_this.store(network, obj);

				// Call the globalEvent function on the parent
				// It's safer to pass back a string to the parent,
				// Rather than an object/array (better for IE8)
				var str = JSON.stringify(obj);

				try {
					parent[cb](str);
				}
				catch (e) {
					// Error thrown whilst executing parent callback
				}
			}

			closeWindow();
		}

		function closeWindow() {

			// Close this current window
			try {
				window.close();
			}
			catch (e) {}

			// IOS bug wont let us close a popup if still loading
			if (window.addEventListener) {
				window.addEventListener('load', function() {
					window.close();
				});
			}
		}
	}
});

// Events

// Extend the hello object with its own event instance
hello.utils.Event.call(hello);

/////////////////////////////////////
//
// Save any access token that is in the current page URL
// Handle any response solicited through iframe hash tag following an API request
//
/////////////////////////////////////

hello.utils.responseHandler(window, window.opener || window.parent);

///////////////////////////////////
// Monitoring session state
// Check for session changes
///////////////////////////////////

(function(hello) {

	// Monitor for a change in state and fire
	var oldSessions = {};

	// Hash of expired tokens
	var expired = {};

	// Listen to other triggers to Auth events, use these to update this
	hello.on('auth.login, auth.logout', function(auth) {
		if (auth && typeof (auth) === 'object' && auth.network) {
			oldSessions[auth.network] = hello.utils.store(auth.network) || {};
		}
	});

	(function self() {

		var CURRENT_TIME = ((new Date()).getTime() / 1e3);
		var emit = function(eventName) {
			hello.emit('auth.' + eventName, {
				network: name,
				authResponse: session
			});
		};

		// Loop through the services
		for (var name in hello.services) {if (hello.services.hasOwnProperty(name)) {

			if (!hello.services[name].id) {
				// We haven't attached an ID so dont listen.
				continue;
			}

			// Get session
			var session = hello.utils.store(name) || {};
			var provider = hello.services[name];
			var oldSess = oldSessions[name] || {};

			// Listen for globalEvents that did not get triggered from the child
			if (session && 'callback' in session) {

				// To do remove from session object...
				var cb = session.callback;
				try {
					delete session.callback;
				}
				catch (e) {}

				// Update store
				// Removing the callback
				hello.utils.store(name, session);

				// Emit global events
				try {
					window[cb](session);
				}
				catch (e) {}
			}

			// Refresh token
			if (session && ('expires' in session) && session.expires < CURRENT_TIME) {

				// If auto refresh is possible
				// Either the browser supports
				var refresh = provider.refresh || session.refresh_token;

				// Has the refresh been run recently?
				if (refresh && (!(name in expired) || expired[name] < CURRENT_TIME)) {
					// Try to resignin
					hello.emit('notice', name + ' has expired trying to resignin');
					hello.login(name, {display: 'none', force: false});

					// Update expired, every 10 minutes
					expired[name] = CURRENT_TIME + 600;
				}

				// Does this provider not support refresh
				else if (!refresh && !(name in expired)) {
					// Label the event
					emit('expired');
					expired[name] = true;
				}

				// If session has expired then we dont want to store its value until it can be established that its been updated
				continue;
			}

			// Has session changed?
			else if (oldSess.access_token === session.access_token &&
			oldSess.expires === session.expires) {
				continue;
			}

			// Access_token has been removed
			else if (!session.access_token && oldSess.access_token) {
				emit('logout');
			}

			// Access_token has been created
			else if (session.access_token && !oldSess.access_token) {
				emit('login');
			}

			// Access_token has been updated
			else if (session.expires !== oldSess.expires) {
				emit('update');
			}

			// Updated stored session
			oldSessions[name] = session;

			// Remove the expired flags
			if (name in expired) {
				delete expired[name];
			}
		}}

		// Check error events
		setTimeout(self, 1000);
	})();

})(hello);

// EOF CORE lib
//////////////////////////////////

/////////////////////////////////////////
// API
// @param path    string
// @param query   object (optional)
// @param method  string (optional)
// @param data    object (optional)
// @param timeout integer (optional)
// @param callback  function (optional)

hello.api = function() {

	// Shorthand
	var _this = this;
	var utils = _this.utils;
	var error = utils.error;

	// Construct a new Promise object
	var promise = utils.Promise();

	// Arguments
	var p = utils.args({path: 's!', query: 'o', method: 's', data: 'o', timeout: 'i', callback: 'f'}, arguments);

	// Method
	p.method = (p.method || 'get').toLowerCase();

	// Headers
	p.headers = p.headers || {};

	// Query
	p.query = p.query || {};

	// If get, put all parameters into query
	if (p.method === 'get' || p.method === 'delete') {
		utils.extend(p.query, p.data);
		p.data = {};
	}

	var data = p.data = p.data || {};

	// Completed event callback
	promise.then(p.callback, p.callback);

	// Remove the network from path, e.g. facebook:/me/friends
	// Results in { network : facebook, path : me/friends }
	if (!p.path) {
		return promise.reject(error('invalid_path', 'Missing the path parameter from the request'));
	}

	p.path = p.path.replace(/^\/+/, '');
	var a = (p.path.split(/[\/\:]/, 2) || [])[0].toLowerCase();

	if (a in _this.services) {
		p.network = a;
		var reg = new RegExp('^' + a + ':?\/?');
		p.path = p.path.replace(reg, '');
	}

	// Network & Provider
	// Define the network that this request is made for
	p.network = _this.settings.default_service = p.network || _this.settings.default_service;
	var o = _this.services[p.network];

	// INVALID
	// Is there no service by the given network name?
	if (!o) {
		return promise.reject(error('invalid_network', 'Could not match the service requested: ' + p.network));
	}

	// PATH
	// As long as the path isn't flagged as unavaiable, e.g. path == false

	if (!(!(p.method in o) || !(p.path in o[p.method]) || o[p.method][p.path] !== false)) {
		return promise.reject(error('invalid_path', 'The provided path is not available on the selected network'));
	}

	// PROXY
	// OAuth1 calls always need a proxy

	if (!p.oauth_proxy) {
		p.oauth_proxy = _this.settings.oauth_proxy;
	}

	if (!('proxy' in p)) {
		p.proxy = p.oauth_proxy && o.oauth && parseInt(o.oauth.version, 10) === 1;
	}

	// TIMEOUT
	// Adopt timeout from global settings by default

	if (!('timeout' in p)) {
		p.timeout = _this.settings.timeout;
	}

	// Format response
	// Whether to run the raw response through post processing.
	if (!('formatResponse' in p)) {
		p.formatResponse = true;
	}

	// Get the current session
	// Append the access_token to the query
	p.authResponse = _this.getAuthResponse(p.network);
	if (p.authResponse && p.authResponse.access_token) {
		p.query.access_token = p.authResponse.access_token;
	}

	var url = p.path;
	var m;

	// Store the query as options
	// This is used to populate the request object before the data is augmented by the prewrap handlers.
	p.options = utils.clone(p.query);

	// Clone the data object
	// Prevent this script overwriting the data of the incoming object.
	// Ensure that everytime we run an iteration the callbacks haven't removed some data
	p.data = utils.clone(data);

	// URL Mapping
	// Is there a map for the given URL?
	var actions = o[{'delete': 'del'}[p.method] || p.method] || {};

	// Extrapolate the QueryString
	// Provide a clean path
	// Move the querystring into the data
	if (p.method === 'get') {

		var query = url.split(/[\?#]/)[1];
		if (query) {
			utils.extend(p.query, utils.param(query));

			// Remove the query part from the URL
			url = url.replace(/\?.*?(#|$)/, '$1');
		}
	}

	// Is the hash fragment defined
	if ((m = url.match(/#(.+)/, ''))) {
		url = url.split('#')[0];
		p.path = m[1];
	}
	else if (url in actions) {
		p.path = url;
		url = actions[url];
	}
	else if ('default' in actions) {
		url = actions['default'];
	}

	// Redirect Handler
	// This defines for the Form+Iframe+Hash hack where to return the results too.
	p.redirect_uri = _this.settings.redirect_uri;

	// Define FormatHandler
	// The request can be procesed in a multitude of ways
	// Here's the options - depending on the browser and endpoint
	p.xhr = o.xhr;
	p.jsonp = o.jsonp;
	p.form = o.form;

	// Make request
	if (typeof (url) === 'function') {
		// Does self have its own callback?
		url(p, getPath);
	}
	else {
		// Else the URL is a string
		getPath(url);
	}

	return promise.proxy;

	// If url needs a base
	// Wrap everything in
	function getPath(url) {

		// Format the string if it needs it
		url = url.replace(/\@\{([a-z\_\-]+)(\|.*?)?\}/gi, function(m, key, defaults) {
			var val = defaults ? defaults.replace(/^\|/, '') : '';
			if (key in p.query) {
				val = p.query[key];
				delete p.query[key];
			}
			else if (p.data && key in p.data) {
				val = p.data[key];
				delete p.data[key];
			}
			else if (!defaults) {
				promise.reject(error('missing_attribute', 'The attribute ' + key + ' is missing from the request'));
			}

			return val;
		});

		// Add base
		if (!url.match(/^https?:\/\//)) {
			url = o.base + url;
		}

		// Define the request URL
		p.url = url;

		// Make the HTTP request with the curated request object
		// CALLBACK HANDLER
		// @ response object
		// @ statusCode integer if available
		utils.request(p, function(r, headers) {

			// Is this a raw response?
			if (!p.formatResponse) {
				// Bad request? error statusCode or otherwise contains an error response vis JSONP?
				if (typeof headers === 'object' ? (headers.statusCode >= 400) : (typeof r === 'object' && 'error' in r)) {
					promise.reject(r);
				}
				else {
					promise.fulfill(r);
				}

				return;
			}

			// Should this be an object
			if (r === true) {
				r = {success:true};
			}
			else if (!r) {
				r = {};
			}

			// The delete callback needs a better response
			if (p.method === 'delete') {
				r = (!r || utils.isEmpty(r)) ? {success:true} : r;
			}

			// FORMAT RESPONSE?
			// Does self request have a corresponding formatter
			if (o.wrap && ((p.path in o.wrap) || ('default' in o.wrap))) {
				var wrap = (p.path in o.wrap ? p.path : 'default');
				var time = (new Date()).getTime();

				// FORMAT RESPONSE
				var b = o.wrap[wrap](r, headers, p);

				// Has the response been utterly overwritten?
				// Typically self augments the existing object.. but for those rare occassions
				if (b) {
					r = b;
				}
			}

			// Is there a next_page defined in the response?
			if (r && 'paging' in r && r.paging.next) {

				// Add the relative path if it is missing from the paging/next path
				if (r.paging.next[0] === '?') {
					r.paging.next = p.path + r.paging.next;
				}

				// The relative path has been defined, lets markup the handler in the HashFragment
				else {
					r.paging.next += '#' + p.path;
				}
			}

			// Dispatch to listeners
			// Emit events which pertain to the formatted response
			if (!r || 'error' in r) {
				promise.reject(r);
			}
			else {
				promise.fulfill(r);
			}
		});
	}
};

// API utilities
hello.utils.extend(hello.utils, {

	// Make an HTTP request
	request: function(p, callback) {

		var _this = this;
		var error = _this.error;

		// This has to go through a POST request
		if (!_this.isEmpty(p.data) && !('FileList' in window) && _this.hasBinary(p.data)) {

			// Disable XHR and JSONP
			p.xhr = false;
			p.jsonp = false;
		}

		// Check if the browser and service support CORS
		var cors = this.request_cors(function() {
			// If it does then run this...
			return ((p.xhr === undefined) || (p.xhr && (typeof (p.xhr) !== 'function' || p.xhr(p, p.query))));
		});

		if (cors) {

			formatUrl(p, function(url) {

				var x = _this.xhr(p.method, url, p.headers, p.data, callback);
				x.onprogress = p.onprogress || null;

				// Windows Phone does not support xhr.upload, see #74
				// Feature detect
				if (x.upload && p.onuploadprogress) {
					x.upload.onprogress = p.onuploadprogress;
				}

			});

			return;
		}

		// Clone the query object
		// Each request modifies the query object and needs to be tared after each one.
		var _query = p.query;

		p.query = _this.clone(p.query);

		// Assign a new callbackID
		p.callbackID = _this.globalEvent();

		// JSONP
		if (p.jsonp !== false) {

			// Clone the query object
			p.query.callback = p.callbackID;

			// If the JSONP is a function then run it
			if (typeof (p.jsonp) === 'function') {
				p.jsonp(p, p.query);
			}

			// Lets use JSONP if the method is 'get'
			if (p.method === 'get') {

				formatUrl(p, function(url) {
					_this.jsonp(url, callback, p.callbackID, p.timeout);
				});

				return;
			}
			else {
				// It's not compatible reset query
				p.query = _query;
			}

		}

		// Otherwise we're on to the old school, iframe hacks and JSONP
		if (p.form !== false) {

			// Add some additional query parameters to the URL
			// We're pretty stuffed if the endpoint doesn't like these
			p.query.redirect_uri = p.redirect_uri;
			p.query.state = JSON.stringify({callback:p.callbackID});

			var opts;

			if (typeof (p.form) === 'function') {

				// Format the request
				opts = p.form(p, p.query);
			}

			if (p.method === 'post' && opts !== false) {

				formatUrl(p, function(url) {
					_this.post(url, p.data, opts, callback, p.callbackID, p.timeout);
				});

				return;
			}
		}

		// None of the methods were successful throw an error
		callback(error('invalid_request', 'There was no mechanism for handling this request'));

		return;

		// Format URL
		// Constructs the request URL, optionally wraps the URL through a call to a proxy server
		// Returns the formatted URL
		function formatUrl(p, callback) {

			// Are we signing the request?
			var sign;

			// OAuth1
			// Remove the token from the query before signing
			if (p.authResponse && p.authResponse.oauth && parseInt(p.authResponse.oauth.version, 10) === 1) {

				// OAUTH SIGNING PROXY
				sign = p.query.access_token;

				// Remove the access_token
				delete p.query.access_token;

				// Enfore use of Proxy
				p.proxy = true;
			}

			// POST body to querystring
			if (p.data && (p.method === 'get' || p.method === 'delete')) {
				// Attach the p.data to the querystring.
				_this.extend(p.query, p.data);
				p.data = null;
			}

			// Construct the path
			var path = _this.qs(p.url, p.query);

			// Proxy the request through a server
			// Used for signing OAuth1
			// And circumventing services without Access-Control Headers
			if (p.proxy) {
				// Use the proxy as a path
				path = _this.qs(p.oauth_proxy, {
					path: path,
					access_token: sign || '',

					// This will prompt the request to be signed as though it is OAuth1
					then: p.proxy_response_type || (p.method.toLowerCase() === 'get' ? 'redirect' : 'proxy'),
					method: p.method.toLowerCase(),
					suppress_response_codes: true
				});
			}

			callback(path);
		}
	},

	// Test whether the browser supports the CORS response
	request_cors: function(callback) {
		return 'withCredentials' in new XMLHttpRequest() && callback();
	},

	// Return the type of DOM object
	domInstance: function(type, data) {
		var test = 'HTML' + (type || '').replace(
			/^[a-z]/,
			function(m) {
				return m.toUpperCase();
			}

		) + 'Element';

		if (!data) {
			return false;
		}

		if (window[test]) {
			return data instanceof window[test];
		}
		else if (window.Element) {
			return data instanceof window.Element && (!type || (data.tagName && data.tagName.toLowerCase() === type));
		}
		else {
			return (!(data instanceof Object || data instanceof Array || data instanceof String || data instanceof Number) && data.tagName && data.tagName.toLowerCase() === type);
		}
	},

	// Create a clone of an object
	clone: function(obj) {
		// Does not clone DOM elements, nor Binary data, e.g. Blobs, Filelists
		if (obj === null || typeof (obj) !== 'object' || obj instanceof Date || 'nodeName' in obj || this.isBinary(obj)) {
			return obj;
		}

		if (Array.isArray(obj)) {
			// Clone each item in the array
			return obj.map(this.clone.bind(this));
		}

		// But does clone everything else.
		var clone = {};
		for (var x in obj) {
			clone[x] = this.clone(obj[x]);
		}

		return clone;
	},

	// XHR: uses CORS to make requests
	xhr: function(method, url, headers, data, callback) {

		var r = new XMLHttpRequest();
		var error = this.error;

		// Binary?
		var binary = false;
		if (method === 'blob') {
			binary = method;
			method = 'GET';
		}

		method = method.toUpperCase();

		// Xhr.responseType 'json' is not supported in any of the vendors yet.
		r.onload = function(e) {
			var json = r.response;
			try {
				json = JSON.parse(r.responseText);
			}
			catch (_e) {
				if (r.status === 401) {
					json = error('access_denied', r.statusText);
				}
			}

			var headers = headersToJSON(r.getAllResponseHeaders());
			headers.statusCode = r.status;

			callback(json || (method === 'GET' ? error('empty_response', 'Could not get resource') : {}), headers);
		};

		r.onerror = function(e) {
			var json = r.responseText;
			try {
				json = JSON.parse(r.responseText);
			}
			catch (_e) {}

			callback(json || error('access_denied', 'Could not get resource'));
		};

		var x;

		// Should we add the query to the URL?
		if (method === 'GET' || method === 'DELETE') {
			data = null;
		}
		else if (data && typeof (data) !== 'string' && !(data instanceof FormData) && !(data instanceof File) && !(data instanceof Blob)) {
			// Loop through and add formData
			var f = new FormData();
			for (x in data) if (data.hasOwnProperty(x)) {
				if (data[x] instanceof HTMLInputElement) {
					if ('files' in data[x] && data[x].files.length > 0) {
						f.append(x, data[x].files[0]);
					}
				}
				else if (data[x] instanceof Blob) {
					f.append(x, data[x], data.name);
				}
				else {
					f.append(x, data[x]);
				}
			}

			data = f;
		}

		// Open the path, async
		r.open(method, url, true);

		if (binary) {
			if ('responseType' in r) {
				r.responseType = binary;
			}
			else {
				r.overrideMimeType('text/plain; charset=x-user-defined');
			}
		}

		// Set any bespoke headers
		if (headers) {
			for (x in headers) {
				r.setRequestHeader(x, headers[x]);
			}
		}

		r.send(data);

		return r;

		// Headers are returned as a string
		function headersToJSON(s) {
			var r = {};
			var reg = /([a-z\-]+):\s?(.*);?/gi;
			var m;
			while ((m = reg.exec(s))) {
				r[m[1]] = m[2];
			}

			return r;
		}
	},

	// JSONP
	// Injects a script tag into the DOM to be executed and appends a callback function to the window object
	// @param string/function pathFunc either a string of the URL or a callback function pathFunc(querystringhash, continueFunc);
	// @param function callback a function to call on completion;
	jsonp: function(url, callback, callbackID, timeout) {

		var _this = this;
		var error = _this.error;

		// Change the name of the callback
		var bool = 0;
		var head = document.getElementsByTagName('head')[0];
		var operaFix;
		var result = error('server_error', 'server_error');
		var cb = function() {
			if (!(bool++)) {
				window.setTimeout(function() {
					callback(result);
					head.removeChild(script);
				}, 0);
			}

		};

		// Add callback to the window object
		callbackID = _this.globalEvent(function(json) {
			result = json;
			return true;

			// Mark callback as done
		}, callbackID);

		// The URL is a function for some cases and as such
		// Determine its value with a callback containing the new parameters of this function.
		url = url.replace(new RegExp('=\\?(&|$)'), '=' + callbackID + '$1');

		// Build script tag
		var script = _this.append('script', {
			id: callbackID,
			name: callbackID,
			src: url,
			async: true,
			onload: cb,
			onerror: cb,
			onreadystatechange: function() {
				if (/loaded|complete/i.test(this.readyState)) {
					cb();
				}
			}
		});

		// Opera fix error
		// Problem: If an error occurs with script loading Opera fails to trigger the script.onerror handler we specified
		//
		// Fix:
		// By setting the request to synchronous we can trigger the error handler when all else fails.
		// This action will be ignored if we've already called the callback handler "cb" with a successful onload event
		if (window.navigator.userAgent.toLowerCase().indexOf('opera') > -1) {
			operaFix = _this.append('script', {
				text: 'document.getElementById(\'' + callbackID + '\').onerror();'
			});
			script.async = false;
		}

		// Add timeout
		if (timeout) {
			window.setTimeout(function() {
				result = error('timeout', 'timeout');
				cb();
			}, timeout);
		}

		// TODO: add fix for IE,
		// However: unable recreate the bug of firing off the onreadystatechange before the script content has been executed and the value of "result" has been defined.
		// Inject script tag into the head element
		head.appendChild(script);

		// Append Opera Fix to run after our script
		if (operaFix) {
			head.appendChild(operaFix);
		}
	},

	// Post
	// Send information to a remote location using the post mechanism
	// @param string uri path
	// @param object data, key value data to send
	// @param function callback, function to execute in response
	post: function(url, data, options, callback, callbackID, timeout) {

		var _this = this;
		var error = _this.error;
		var doc = document;

		// This hack needs a form
		var form = null;
		var reenableAfterSubmit = [];
		var newform;
		var i = 0;
		var x = null;
		var bool = 0;
		var cb = function(r) {
			if (!(bool++)) {
				callback(r);
			}
		};

		// What is the name of the callback to contain
		// We'll also use this to name the iframe
		_this.globalEvent(cb, callbackID);

		// Build the iframe window
		var win;
		try {
			// IE7 hack, only lets us define the name here, not later.
			win = doc.createElement('<iframe name="' + callbackID + '">');
		}
		catch (e) {
			win = doc.createElement('iframe');
		}

		win.name = callbackID;
		win.id = callbackID;
		win.style.display = 'none';

		// Override callback mechanism. Triggger a response onload/onerror
		if (options && options.callbackonload) {
			// Onload is being fired twice
			win.onload = function() {
				cb({
					response: 'posted',
					message: 'Content was posted'
				});
			};
		}

		if (timeout) {
			setTimeout(function() {
				cb(error('timeout', 'The post operation timed out'));
			}, timeout);
		}

		doc.body.appendChild(win);

		// If we are just posting a single item
		if (_this.domInstance('form', data)) {
			// Get the parent form
			form = data.form;

			// Loop through and disable all of its siblings
			for (i = 0; i < form.elements.length; i++) {
				if (form.elements[i] !== data) {
					form.elements[i].setAttribute('disabled', true);
				}
			}

			// Move the focus to the form
			data = form;
		}

		// Posting a form
		if (_this.domInstance('form', data)) {
			// This is a form element
			form = data;

			// Does this form need to be a multipart form?
			for (i = 0; i < form.elements.length; i++) {
				if (!form.elements[i].disabled && form.elements[i].type === 'file') {
					form.encoding = form.enctype = 'multipart/form-data';
					form.elements[i].setAttribute('name', 'file');
				}
			}
		}
		else {
			// Its not a form element,
			// Therefore it must be a JSON object of Key=>Value or Key=>Element
			// If anyone of those values are a input type=file we shall shall insert its siblings into the form for which it belongs.
			for (x in data) if (data.hasOwnProperty(x)) {
				// Is this an input Element?
				if (_this.domInstance('input', data[x]) && data[x].type === 'file') {
					form = data[x].form;
					form.encoding = form.enctype = 'multipart/form-data';
				}
			}

			// Do If there is no defined form element, lets create one.
			if (!form) {
				// Build form
				form = doc.createElement('form');
				doc.body.appendChild(form);
				newform = form;
			}

			var input;

			// Add elements to the form if they dont exist
			for (x in data) if (data.hasOwnProperty(x)) {

				// Is this an element?
				var el = (_this.domInstance('input', data[x]) || _this.domInstance('textArea', data[x]) || _this.domInstance('select', data[x]));

				// Is this not an input element, or one that exists outside the form.
				if (!el || data[x].form !== form) {

					// Does an element have the same name?
					var inputs = form.elements[x];
					if (input) {
						// Remove it.
						if (!(inputs instanceof NodeList)) {
							inputs = [inputs];
						}

						for (i = 0; i < inputs.length; i++) {
							inputs[i].parentNode.removeChild(inputs[i]);
						}

					}

					// Create an input element
					input = doc.createElement('input');
					input.setAttribute('type', 'hidden');
					input.setAttribute('name', x);

					// Does it have a value attribute?
					if (el) {
						input.value = data[x].value;
					}
					else if (_this.domInstance(null, data[x])) {
						input.value = data[x].innerHTML || data[x].innerText;
					}
					else {
						input.value = data[x];
					}

					form.appendChild(input);
				}

				// It is an element, which exists within the form, but the name is wrong
				else if (el && data[x].name !== x) {
					data[x].setAttribute('name', x);
					data[x].name = x;
				}
			}

			// Disable elements from within the form if they weren't specified
			for (i = 0; i < form.elements.length; i++) {

				input = form.elements[i];

				// Does the same name and value exist in the parent
				if (!(input.name in data) && input.getAttribute('disabled') !== true) {
					// Disable
					input.setAttribute('disabled', true);

					// Add re-enable to callback
					reenableAfterSubmit.push(input);
				}
			}
		}

		// Set the target of the form
		form.setAttribute('method', 'POST');
		form.setAttribute('target', callbackID);
		form.target = callbackID;

		// Update the form URL
		form.setAttribute('action', url);

		// Submit the form
		// Some reason this needs to be offset from the current window execution
		setTimeout(function() {
			form.submit();

			setTimeout(function() {
				try {
					// Remove the iframe from the page.
					//win.parentNode.removeChild(win);
					// Remove the form
					if (newform) {
						newform.parentNode.removeChild(newform);
					}
				}
				catch (e) {
					try {
						console.error('HelloJS: could not remove iframe');
					}
					catch (ee) {}
				}

				// Reenable the disabled form
				for (var i = 0; i < reenableAfterSubmit.length; i++) {
					if (reenableAfterSubmit[i]) {
						reenableAfterSubmit[i].setAttribute('disabled', false);
						reenableAfterSubmit[i].disabled = false;
					}
				}
			}, 0);
		}, 100);
	},

	// Some of the providers require that only multipart is used with non-binary forms.
	// This function checks whether the form contains binary data
	hasBinary: function(data) {
		for (var x in data) if (data.hasOwnProperty(x)) {
			if (this.isBinary(data[x])) {
				return true;
			}
		}

		return false;
	},

	// Determines if a variable Either Is or like a FormInput has the value of a Blob

	isBinary: function(data) {

		return data instanceof Object && (
		(this.domInstance('input', data) && data.type === 'file') ||
		('FileList' in window && data instanceof window.FileList) ||
		('File' in window && data instanceof window.File) ||
		('Blob' in window && data instanceof window.Blob));

	},

	// Convert Data-URI to Blob string
	toBlob: function(dataURI) {
		var reg = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i;
		var m = dataURI.match(reg);
		if (!m) {
			return dataURI;
		}

		var binary = atob(dataURI.replace(reg, ''));
		var array = [];
		for (var i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}

		return new Blob([new Uint8Array(array)], {type: m[1]});
	}

});

// EXTRA: Convert FormElement to JSON for POSTing
// Wrappers to add additional functionality to existing functions
(function(hello) {

	// Copy original function
	var api = hello.api;
	var utils = hello.utils;

	utils.extend(utils, {

		// DataToJSON
		// This takes a FormElement|NodeList|InputElement|MixedObjects and convers the data object to JSON.
		dataToJSON: function(p) {

			var _this = this;
			var w = window;
			var data = p.data;

			// Is data a form object
			if (_this.domInstance('form', data)) {
				data = _this.nodeListToJSON(data.elements);
			}
			else if ('NodeList' in w && data instanceof NodeList) {
				data = _this.nodeListToJSON(data);
			}
			else if (_this.domInstance('input', data)) {
				data = _this.nodeListToJSON([data]);
			}

			// Is data a blob, File, FileList?
			if (('File' in w && data instanceof w.File) ||
				('Blob' in w && data instanceof w.Blob) ||
				('FileList' in w && data instanceof w.FileList)) {
				data = {file: data};
			}

			// Loop through data if it's not form data it must now be a JSON object
			if (!('FormData' in w && data instanceof w.FormData)) {

				for (var x in data) if (data.hasOwnProperty(x)) {

					if ('FileList' in w && data[x] instanceof w.FileList) {
						if (data[x].length === 1) {
							data[x] = data[x][0];
						}
					}
					else if (_this.domInstance('input', data[x]) && data[x].type === 'file') {
						continue;
					}
					else if (_this.domInstance('input', data[x]) ||
						_this.domInstance('select', data[x]) ||
						_this.domInstance('textArea', data[x])) {
						data[x] = data[x].value;
					}
					else if (_this.domInstance(null, data[x])) {
						data[x] = data[x].innerHTML || data[x].innerText;
					}
				}
			}

			p.data = data;
			return data;
		},

		// NodeListToJSON
		// Given a list of elements extrapolate their values and return as a json object
		nodeListToJSON: function(nodelist) {

			var json = {};

			// Create a data string
			for (var i = 0; i < nodelist.length; i++) {

				var input = nodelist[i];

				// If the name of the input is empty or diabled, dont add it.
				if (input.disabled || !input.name) {
					continue;
				}

				// Is this a file, does the browser not support 'files' and 'FormData'?
				if (input.type === 'file') {
					json[input.name] = input;
				}
				else {
					json[input.name] = input.value || input.innerHTML;
				}
			}

			return json;
		}
	});

	// Replace it
	hello.api = function() {

		// Get arguments
		var p = utils.args({path: 's!', method: 's', data:'o', timeout: 'i', callback: 'f'}, arguments);

		// Change for into a data object
		if (p.data) {
			utils.dataToJSON(p);
		}

		return api.call(this, p);
	};

})(hello);

// Script to support ChromeApps
// This overides the hello.utils.popup method to support chrome.identity.launchWebAuthFlow
// See https://developer.chrome.com/apps/app_identity#non

// Is this a chrome app?

if (typeof chrome === 'object' && typeof chrome.identity === 'object' && chrome.identity.launchWebAuthFlow) {

	(function() {

		// Swap the popup method
		hello.utils.popup = function(url) {

			return _open(url, true);

		};

		// Swap the hidden iframe method
		hello.utils.iframe = function(url) {

			_open(url, false);

		};

		// Swap the request_cors method
		hello.utils.request_cors = function(callback) {

			callback();

			// Always run as CORS

			return true;
		};

		// Swap the storage method
		var _cache = {};
		chrome.storage.local.get('hello', function(r) {
			// Update the cache
			_cache = r.hello || {};
		});

		hello.utils.store = function(name, value) {

			// Get all
			if (arguments.length === 0) {
				return _cache;
			}

			// Get
			if (arguments.length === 1) {
				return _cache[name] || null;
			}

			// Set
			if (value) {
				_cache[name] = value;
				chrome.storage.local.set({hello: _cache});
				return value;
			}

			// Delete
			if (value === null) {
				delete _cache[name];
				chrome.storage.local.set({hello: _cache});
				return null;
			}
		};

		// Open function
		function _open(url, interactive) {

			// Launch
			var ref = {
				closed: false
			};

			// Launch the webAuthFlow
			chrome.identity.launchWebAuthFlow({
				url: url,
				interactive: interactive
			}, function(responseUrl) {

				// Did the user cancel this prematurely
				if (responseUrl === undefined) {
					ref.closed = true;
					return;
				}

				// Split appart the URL
				var a = hello.utils.url(responseUrl);

				// The location can be augmented in to a location object like so...
				// We dont have window operations on the popup so lets create some
				var _popup = {
					location: {

						// Change the location of the popup
						assign: function(url) {

							// If there is a secondary reassign
							// In the case of OAuth1
							// Trigger this in non-interactive mode.
							_open(url, false);
						},

						search: a.search,
						hash: a.hash,
						href: a.href
					},
					close: function() {}
				};

				// Then this URL contains information which HelloJS must process
				// URL string
				// Window - any action such as window relocation goes here
				// Opener - the parent window which opened this, aka this script

				hello.utils.responseHandler(_popup, window);
			});

			// Return the reference
			return ref;
		}

	})();
}

// Phonegap override for hello.phonegap.js
(function() {

	// Is this a phonegap implementation?
	if (!(/^file:\/{3}[^\/]/.test(window.location.href) && window.cordova)) {
		// Cordova is not included.
		return;
	}

	// Augment the hidden iframe method
	hello.utils.iframe = function(url, redirectUri) {
		hello.utils.popup(url, redirectUri, {hidden: 'yes'});
	};
})();

// Register as anonymous AMD module
if (typeof define === 'function' && define.amd) {
	define(function() {
		return hello;
	});
}

// CommonJS module for browserify
if (typeof module === 'object' && module.exports) {
	module.exports = hello;
}
