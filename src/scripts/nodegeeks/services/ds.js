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
                                        var filteredRecord = remoteRecord[_this._property].filter(function(singleRecord){return singleRecord.id == val})[0];
                                        var wrappedRecord = _this._model.Record(filteredRecord);
                                        _this.push(wrappedRecord);
                                        return resolve(_record);
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
                                $sails.request({
                                    method: 'get',
                                    url: '/' + _model.modelName + '/' + _record.id + '/' + hasManyArray._property
                                }, function (remoteRecords) {
                                    if (!remoteRecords) return resolve(hasManyArray);
                                    hasManyArray.splice(0,hasManyArray.length);
                                    remoteRecords.forEach(function(remoteRecord){
                                        hasManyArray.push(hasManyArray._model.Record(remoteRecord));
                                    });
                                    return resolve(hasManyArray);
                                }, function (error) {
                                    console.error(error);
                                    return reject(error);
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
         * @method: extend
         * @description: Used to extend a model and creates the database model instance to hold all this models data.
         * @params: modelName - name of the model
         *          modelClass- object containing the models properties
         * @returns: does not return anything
         * @example: DS.Model.extend('profile', attributes: {fullName: function(){return this.firstName + ' ' + this.lastName}});
         */
        Model.prototype.extend = function (modelClass) {
            var _model = this;
            return angular.extend(_model, modelClass);
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
