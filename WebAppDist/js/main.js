/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************!*\
  !*** ./JavaScripts/main.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _irlib = __webpack_require__(/*! ./../~/irlib/dist/irlib */ 1);
	
	var _irlib2 = _interopRequireDefault(_irlib);
	
	var _App = __webpack_require__(/*! ./App.js */ 2);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _Controller = __webpack_require__(/*! ./Controller.js */ 3);
	
	var _Controller2 = _interopRequireDefault(_Controller);
	
	var _ServiceScanner = __webpack_require__(/*! ./ServiceScanner.js */ 6);
	
	var _ServiceScanner2 = _interopRequireDefault(_ServiceScanner);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by daniel on 22.10.16.
	 */
	
	var sl = new _irlib2.default.ServiceLocator();
	sl.register('app', _App2.default);
	sl.register('controller', _Controller2.default);
	sl.register('serviceScanner', _ServiceScanner2.default);
	
	var app = sl.get('app');
	app.run();

/***/ },
/* 1 */
/*!*******************************!*\
  !*** ./~/irlib/dist/irlib.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by COD on 03.06.15.
	 */
	/*jslint unparam: true */
	/*global window, require, exports */
	
	(function(exports){
	    var IrLib = exports;
	
	(function() {/*    require('config');// */
	
	/**
	 * Created by COD on 03.06.15.
	 */
	IrLib.Config = {};
	
	
	}());
	
	
	(function() {/*    require('core-object');// */
	
	/**
	 * Created by COD on 03.06.15.
	 */
	(function() {/*require('class');// */
	
	/* Simple JavaScript Inheritance
	 * By John Resig http://ejohn.org/
	 * MIT Licensed.
	 *
	 * Edited by Daniel Corn
	 */
	// jshint ignore: start
	// Inspired by base2 and Prototype
	(function(root){
	    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	    //var hasUnderscoreJs = root['_'] && root._['clone'];
	    //var hasJQuery = root['jQuery'] && root.jQuery().jquery;
	    //
	    //var simpleClone = function(source, isDeep) {
	    //    var target = {};
	    //    for (var prop in source) {
	    //        if (!source.hasOwnProperty(prop)) {
	    //            console.log('skip: ' + prop)
	    //            continue;
	    //        }
	    //        if (source[prop] instanceof Date) {
	    //            console.log('copy: Date ' + prop);
	    //            target[prop] = source[prop];
	    //
	    //            continue;
	    //
	    //        }
	    //        if (isDeep && typeof source[prop] === 'object') {
	    //            target[prop] = simpleClone(target[prop], source[prop]);
	    //        } else {
	    //            target[prop] = source[prop];
	    //        }
	    //    }
	    //    return target;
	    //};
	    //var createLocalProperty = function(source) {
	    //    if (!source) {
	    //        return source;
	    //    }
	    //    if (typeof source === 'object') {
	    //        console.log('is object');
	    //        if (hasJQuery) {
	    //            return jQuery.extend({}, source);
	    //        }
	    //        if (hasUnderscoreJs) {
	    //            return _.clone(source)
	    //        }
	    //        return simpleClone(source, false);
	    //    }
	    //    return source;
	    //};
	
	    // The base Class implementation (does nothing)
	    this.Class = function(){};
	
	    // Create a new Class that inherits from this class
	    Class.extend = function(prop) {
	        var _super = this.prototype;
	
	        // Instantiate a base class (but only create the instance,
	        // don't run the init constructor)
	        initializing = true;
	        var prototype = new this();
	        initializing = false;
	
	        // Copy the properties over onto the new prototype
	        for (var name in prop) {
	            //if (typeof prop[name] === 'object') {
	            //    IrLib.Logger.warn(
	            //        'Detected object type prototype member "' + name + '". ' +
	            //        'You should initialize member objects inside init()'
	            //    );
	            //}
	            // Check if we're overwriting an existing function
	            prototype[name] = typeof prop[name] == "function" &&
	            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
	                (function(name, fn){
	                    return function() {
	                        var tmp = this._super;
	
	                        // Add a new ._super() method that is the same method
	                        // but on the super-class
	                        this._super = _super[name];
	
	                        // The method only need to be bound temporarily, so we
	                        // remove it when we're done executing
	                        var ret = fn.apply(this, arguments);
	                        this._super = tmp;
	
	                        return ret;
	                    };
	                })(name, prop[name]) :
	                prop[name];
	                //createLocalProperty(prop[name]);
	                //(typeof prop[name] === 'object' ? simpleClone(prop[name]) : prop[name]);
	        }
	
	        // The dummy class constructor
	        function Class() {
	            // All construction is actually done in the init method
	            if ( !initializing && this.init )
	                this.init.apply(this, arguments);
	        }
	
	        // Populate our constructed prototype object
	        Class.prototype = prototype;
	
	        // Enforce the constructor to be what we expect
	        Class.prototype.constructor = Class;
	
	        // And make this class extendable
	        Class.extend = arguments.callee;
	
	        return Class;
	    };
	})(this);
	
	}());
	
	
	
	IrLib.CoreObject = Class.extend({
	    /**
	     * @type {String}
	     */
	    __guid: null,
	
	    init: function () {
	        this.__guid = IrLib.CoreObject.createGuid();
	    },
	
	    /**
	     * Returns the global unique ID of the object
	     *
	     * @returns {String}
	     */
	    guid: function () {
	        return this.__guid;
	    },
	
	    /**
	     * Defines a new property with the given key and descriptor
	     *
	     * @param {String} key
	     * @param {Object} descriptor
	     * @returns {IrLib.CoreObject}
	     * @see Object.defineProperty()
	     */
	    defineProperty: function (key, descriptor) {
	        if (descriptor.overwrite === false && this[key]) {
	            return this;
	        }
	        Object.defineProperty(this, key, descriptor);
	        return this;
	    },
	
	    /**
	     * Defines new properties form the given properties
	     *
	     * @param {Object} properties
	     * @returns {IrLib.CoreObject}
	     * @see Object.defineProperties()
	     */
	    defineProperties: function (properties) {
	        Object.defineProperties(this, properties);
	        return this;
	    },
	
	    /**
	     * Returns a clone of this object
	     *
	     * @returns {*}
	     */
	    clone: function () {
	        var source = this,
	            _clone = new (source.constructor)();
	        for (var attr in source) {
	            if (source.hasOwnProperty(attr)) {
	                _clone[attr] = source[attr];
	            }
	        }
	        _clone.__guid = IrLib.CoreObject.createGuid();
	        return _clone;
	    },
	
	    /**
	     * Creates a callback function with bound this
	     *
	     * @param {Function|String} method
	     * @returns {Function}
	     */
	    bind: function (method) {
	        var _this = this,
	            impl;
	
	        if (typeof method === 'function') {
	            impl = method;
	        } else if (typeof _this[method] === 'function') {
	            impl = _this[method];
	        } else {
	            throw new IrLib.Error('Argument method must be either a method name or a function');
	        }
	
	        return function () {
	            var __preparedArguments = Array.prototype.slice.call(arguments);
	            __preparedArguments.push(this);
	            return impl.apply(_this, __preparedArguments);
	        };
	    }
	});
	IrLib.CoreObject.__lastGuid = 0;
	IrLib.CoreObject.createGuid = function () {
	    return 'irLib-' + (++IrLib.CoreObject.__lastGuid);
	};
	
	
	}());
	
	
	(function() {/*    require('error\/*');// */
	
	/**
	 * Created by COD on 14.04.15.
	 */
	var _Error = IrLib.Error = function (message, code, userInfo) {
	    this.message = message;
	    this.code = code;
	    this.userInfo = userInfo;
	};
	
	_Error.prototype = Object.create(Error.prototype);
	_Error.prototype = {
	    constructor: _Error,
	    toString: function() {
	        return '[IrLib.Error] ' +
	            (this.code ? '#' + this.code + ':' : '') +
	            this.message;
	    }
	};
	
	
	/**
	 * Created by COD on 14.04.15.
	 */
	IrLib.MissingImplementationError = function (message, code) {
	    this.message = message;
	    this.code = code || 1435238939;
	};
	
	IrLib.MissingImplementationError.prototype = Object.create(Error.prototype);
	IrLib.MissingImplementationError.prototype = {
	    constructor: IrLib.MissingImplementationError,
	    toString: function() {
	        return '[IrLib.MissingImplementationError] ' +
	            (this.code ? '#' + this.code + ':' : '') +
	            this.message;
	    }
	};
	
	/**
	 * Created by COD on 22.03.16.
	 */
	/**
	 * Created by COD on 14.04.15.
	 */
	var _Error = IrLib.TypeError = function (message, code, userInfo) {
	    this.message = message;
	    this.code = code;
	    this.userInfo = userInfo;
	};
	
	_Error.prototype = Object.create(TypeError.prototype);
	_Error.prototype = {
	    constructor: _Error,
	    toString: function() {
	        return '[IrLib.TypeError] ' +
	            (this.code ? '#' + this.code + ':' : '') +
	            this.message;
	    }
	};
	
	
	}());
	
	
	(function() {/*    require('utility\/*');// */
	
	/**
	 * Created by COD on 03.06.15.
	 */
	
	IrLib.Utility = IrLib.Utility || {};
	
	var _GeneralUtility = IrLib.Utility.GeneralUtility = {
	    /**
	     * Returns if the given element is a HTML node
	     *
	     * @param {*} element
	     * @returns {Boolean}
	     */
	    isDomNode: function (element) {
	        return !!(element && element.nodeName);
	    },
	
	    /**
	     * Returns the matching HTML node
	     *
	     * @param {*} element
	     * @returns {HTMLElement}
	     */
	    domNode: function (element) {
	        if (_GeneralUtility.isDomNode(element)) {
	            return element;
	        }
	        if (typeof element === 'string') {
	            return document.querySelector(element);
	        }
	        return null;
	    },
	
	    /**
	     * Tries to transform the given value into an array
	     *
	     * If the value is
	     * - undefined an empty array will be returned
	     * - an array it will be cloned and returned (the elements will not be cloned)
	     * - an object it's values will be returned
	     * - something else a new array will be returned with the value as it's single element
	     *
	     * @param {*} value
	     * @returns {*}
	     */
	    toArray: function (value) {
	        if (typeof value === 'undefined') {
	            return [];
	        }
	        if (Array.isArray(value)) {
	            return value.slice();
	        }
	        if (typeof value === 'object') {
	            var valueCollection = [],
	                keys = Object.keys(value),
	                keysLength = keys.length;
	            for (var i = 0; i < keysLength; i++) {
	                valueCollection.push(value[keys[i]]);
	            }
	            return valueCollection;
	        }
	        return [value];
	    },
	
	    /**
	     * Returns the value for the key path of the given object
	     *
	     * @param {String} keyPath Collection of object keys concatenated with a dot (".")
	     * @param {Object} object Root object to fetch the property
	     * @param {Boolean} [graceful] Do not throw an exception for unresolved key paths
	     * @returns {*}
	     */
	    valueForKeyPathOfObject: function (keyPath, object, graceful) {
	        if (typeof keyPath !== 'string') {
	            throw new TypeError('Key path must be of type string, ' + (typeof keyPath) + ' given');
	        }
	        var keyPathParts = keyPath.split('.'),
	            keyPathPartsLength = keyPathParts.length,
	            currentValue = object,
	            currentKeyPathPart, i;
	
	        for (i = 0; i < keyPathPartsLength; i++) {
	            currentKeyPathPart = keyPathParts[i];
	            if (typeof currentValue !== 'object') {
	                if (!graceful) {
	                    throw new TypeError(
	                        'Can not get key ' + currentKeyPathPart + ' of value of type ' + (typeof currentValue)
	                    );
	                } else {
	                    return undefined;
	                }
	            }
	            currentValue = currentValue[currentKeyPathPart];
	        }
	        return currentValue;
	    },
	
	    /**
	     * Sets the value for the key path of the given object
	     *
	     * @param {*} value New value to set
	     * @param {String} keyPath Collection of object keys concatenated with a dot (".")
	     * @param {Object} object Root object to set the property
	     * @returns {*}
	     */
	    setValueForKeyPathOfObject: function (value, keyPath, object) {
	        if (typeof keyPath !== 'string') {
	            throw new TypeError('Key path must be of type string, ' + (typeof keyPath) + ' given');
	        }
	        var lastIndexOfDot = keyPath.lastIndexOf('.'), keyPathToParent, childKey, parentObject;
	
	        // Only the first level child should be modified
	        if (lastIndexOfDot === -1) {
	            parentObject = object;
	            childKey = keyPath;
	        } else {
	            keyPathToParent = keyPath.substr(0, lastIndexOfDot);
	            childKey = keyPath.substr(lastIndexOfDot + 1);
	
	            parentObject = _GeneralUtility.valueForKeyPathOfObject(keyPathToParent, object);
	        }
	        if (typeof parentObject !== 'object') {
	            throw new TypeError(
	                'Can not set key ' + keyPath + ' of value of type ' + (typeof parentObject)
	            );
	        }
	        parentObject[childKey] = value;
	    },
	
	    /**
	     * Returns if the given value is numeric
	     *
	     * @param {*} value
	     * @returns {boolean}
	     */
	    isNumeric: function (value) {
	        return !isNaN(parseFloat(value)) && isFinite(value);
	    },
	
	    /**
	     * Returns a deep copy of the given object
	     *
	     * @param {*}obj
	     * @param {Number} depth
	     * @returns {*}
	     */
	    clone: function (obj, depth) {
	        var copy;
	        if (arguments.length < 2) {
	            depth = 10;
	        }
	
	        // Handle the 3 simple types, and null or undefined
	        if (null === obj || "object" !== typeof obj) {
	            return obj;
	        }
	
	        // Handle Date
	        if (obj instanceof Date) {
	            copy = new Date();
	            copy.setTime(obj.getTime());
	            return copy;
	        }
	
	        // Handle Array
	        if (obj instanceof Array) {
	            copy = [];
	            for (var i = 0, len = obj.length; i < len; i++) {
	                if (depth - 1 > 0) {
	                    copy[i] = _GeneralUtility.clone(obj[i], depth - 1);
	                } else {
	                    copy[i] = obj[i];
	                }
	            }
	            return copy;
	        }
	
	        // Handle Object
	        copy = {};
	        for (var attr in obj) {
	            if (obj.hasOwnProperty(attr)) {
	                if (depth - 1 > 0) {
	                    copy[attr] = _GeneralUtility.clone(obj[attr], depth - 1);
	                } else {
	                    copy[attr] = obj[attr];
	                }
	            }
	        }
	        return copy;
	    },
	
	    /**
	     * Adds the class to the given element
	     *
	     * @param {*} element HTML node or selector
	     * @param {String} className
	     */
	    addClass: function (element, className) {
	        element = _GeneralUtility.domNode(element);
	        if (element) {
	            if (element.classList) {
	                element.classList.add(className);
	            } else {
	                element.className += ' ' + className;
	            }
	        }
	    }
	};
	
	
	/**
	 * Created by COD on 14.04.15.
	 */
	var ef = function () {
	};
	
	var Logger = IrLib.Logger = (typeof console === 'object' ? console : {});
	
	if (!Logger.log) {
	    Logger.log = ef;
	}
	if (!Logger.debug) {
	    Logger.debug = ef;
	}
	if (!Logger.info) {
	    Logger.info = ef;
	}
	if (!Logger.warn) {
	    Logger.warn = ef;
	}
	if (!Logger.error) {
	    Logger.error = ef;
	}
	
	
	}());
	
	
	(function() {/*    require('components\/*');// */
	
	/**
	 * Created by COD on 03.06.15.
	 */
	
	var GeneralUtility = IrLib.Utility.GeneralUtility;
	var _Error = IrLib.Error;
	
	/**
	 * @implements EventListener
	 */
	IrLib.Controller = IrLib.CoreObject.extend({
	    /**
	     * @type {IrLib.View.Interface|IrLib.View.Template|HTMLElement|String}
	     */
	    _view: null,
	
	    /**
	     * List of all registered events
	     *
	     * @type {String[]}
	     */
	    _registeredEvents: [],
	
	    /**
	     * Initialize the controller
	     *
	     * @param {HTMLElement|String} [view] A dom node or selector
	     */
	    init: function (view) {
	        if (arguments.length > 0) { // Check if the view argument is given
	            this.setView(view);
	        } else if (this.view) { // Check if a view is inherited
	            this.setView(this.view);
	        }
	        this.defineProperty('view', {
	            enumerable: true,
	            get: this.getView,
	            set: this.setView
	        });
	    },
	
	    /**
	     * Handle the DOM event
	     *
	     * @param {Event} event
	     * @returns {*}
	     */
	    handleEvent: function (event) {
	        var controller = this,
	            type = event.type,
	            target = event.target,
	            _events = controller.events,
	            targetsTargetAttribute, imp;
	
	        // Workaround for jsdom based unit tests
	        if (!_events && typeof event.irController === 'object') {
	            controller = event.irController;
	            _events = controller.events;
	        }
	
	        // Check if the data-irlib-target attribute is set
	        if (typeof target.getAttribute === 'function') {
	            targetsTargetAttribute = target.getAttribute('data-irlib-target');
	        }
	
	        // If the data-irlib-target attribute is set look for a matching implementation
	        if (targetsTargetAttribute) {
	            var matchingImpName = Object.keys(_events).filter(function (eventIdentifier) {
	                var eventIdentifierParts = eventIdentifier.split(':');
	
	                return eventIdentifierParts.length > 1 &&
	                    eventIdentifierParts[1] === targetsTargetAttribute && // Matching target attribute
	                    eventIdentifierParts[0] === type // Matching event type
	                    ;
	            });
	
	            if (matchingImpName.length > 0) {
	                imp = _events[matchingImpName[0]];
	            }
	        }
	
	        if (!imp && _events && _events[type]) {
	            imp = _events[type];
	        }
	
	        if (typeof imp === 'function') {
	            return imp.call(controller, event);
	        } else if (imp) {
	            IrLib.Logger.error('Event handler implementation is of type ' + (typeof event));
	            return false;
	        }
	        return true;
	    },
	
	    /**
	     * Sets the view
	     *
	     * @param {IrLib.View.Interface|IrLib.View.Template|HTMLElement|String} view A View object, dom node or selector
	     */
	    setView: function (view) {
	        this._assertView(view);
	        if (typeof view === 'string') { // If the view is a selector
	            this._view = GeneralUtility.domNode(view);
	        } else {
	            this._view = view;
	        }
	    },
	
	    /**
	     * Returns the view
	     *
	     * @returns {IrLib.View.Interface|IrLib.View.Template|HTMLElement|String}
	     */
	    getView: function () {
	        return this._view;
	    },
	
	    /**
	     * Register the Controller as event listener for each event
	     *
	     * @returns {IrLib.Controller}
	     */
	    catchAllViewEvents: function () {
	        var registeredEvents = this._registeredEvents,
	            inline_splitEventIdentifier = this._splitEventIdentifier,
	            _view = this.view,
	            domElement, property;
	        if (_view) {
	            if (_view instanceof IrLib.View.Interface) {
	                domElement = document.createElement('div');
	            } else {
	                domElement = _view;
	            }
	
	            for (property in domElement) {
	                if (property.substr(0, 2) === 'on') {
	                    registeredEvents.push(
	                        inline_splitEventIdentifier(property.substr(2))[0]
	                    );
	                }
	            }
	            this._addListenersForRegisteredEventTypes();
	        } else {
	            IrLib.Logger.warn('Can not catch all events because the view not set');
	        }
	        return this;
	    },
	
	    /**
	     * Register the Controller as event listener for each of the callbacks defined in
	     * the events property
	     *
	     * @returns {IrLib.Controller}
	     */
	    initializeEventListeners: function () {
	        var registeredEvents = this._registeredEvents,
	            inline_splitEventIdentifier = this._splitEventIdentifier,
	            _view = this.view,
	            _eventNames, i;
	        if (_view) {
	            _eventNames = this.eventNames();
	            for (i = 0; i < _eventNames.length; i++) {
	                registeredEvents.push(inline_splitEventIdentifier(_eventNames[i])[0]);
	            }
	            this._addListenersForRegisteredEventTypes();
	        } else {
	            IrLib.Logger.warn('Can not add event listener because the view not set');
	        }
	        return this;
	    },
	
	    /**
	     * Removes the event listeners
	     */
	    removeEventListeners: function () {
	        var registeredEvents = this._registeredEvents,
	            _view = this.view,
	            i;
	        if (_view) {
	            for (i = 0; i < registeredEvents.length; i++) {
	                _view.removeEventListener(registeredEvents[i], this, false);
	            }
	            this._registeredEvents = [];
	        } else {
	            IrLib.Logger.warn('Can not remove event listeners because the view not set');
	        }
	    },
	
	    /**
	     * Returns the event names
	     *
	     * @returns {Array}
	     */
	    eventNames: function () {
	        return Object.keys(this.events);
	    },
	
	    /**
	     * Actually add the event listeners listed in _registeredEvents to the View
	     *
	     * @private
	     */
	    _addListenersForRegisteredEventTypes: function () {
	        var registeredEvents = this._registeredEvents,
	            registeredEventsLength = registeredEvents.length,
	            _view = this.view,
	            i;
	        if (_view) {
	            for (i = 0; i < registeredEventsLength; i++) {
	                _view.addEventListener(registeredEvents[i], this, false);
	            }
	        }
	    },
	
	    /**
	     * Split the given event identifier into it's type and action-target parts
	     *
	     * Example:
	     *  click:my-action => click, my-action
	     *  click:data-attribute-to-match => click, data-attribute-to-match
	     *
	     * @param {String} eventIdentifier
	     * @returns {String[]}
	     * @private
	     */
	    _splitEventIdentifier: function (eventIdentifier) {
	        return eventIdentifier.split ? eventIdentifier.split(':') : eventIdentifier;
	    },
	
	    /**
	     * Tests if the given value is a view
	     *
	     * @param {*} view
	     * @private
	     */
	    _assertView: function (view) {
	        if (!view) {
	            throw new _Error('No view given', 1433355412);
	        }
	
	        var ViewInterface = IrLib.View && IrLib.View.Interface ? IrLib.View.Interface : function () {
	        };
	        if (!GeneralUtility.domNode(view) && !(view instanceof ViewInterface)) {
	            throw new _Error('No view given', 1433355412, view);
	        }
	    },
	
	    /**
	     * Registered event handler methods
	     */
	    events: {}
	});
	
	/**
	 * Created by COD on 25.06.15.
	 */
	var _Error = IrLib.Error;
	IrLib.Dictionary = IrLib.CoreObject.extend({
	    /**
	     * Initialize the Service Locator
	     */
	    init: function (initializationValues) {
	        /**
	         * Initialize the instance with the keys and values from the given object
	         *
	         * @param initializationValues
	         * @returns {IrLib.Dictionary}
	         * @private
	         */
	        var _initWithObject = function (initializationValues) {
	            var keys = Object.keys(initializationValues),
	                keysLength = keys.length,
	                currentKey;
	            for (var i = 0; i < keysLength; i++) {
	                currentKey = keys[i];
	                this[currentKey] = initializationValues[currentKey];
	            }
	        };
	
	        if (arguments.length > 0) {
	            if (typeof initializationValues !== 'object') {
	                throw new _Error(
	                    'Initialization argument has to be of type object, ' + (typeof initializationValues) + ' given',
	                    1435219260
	                );
	            }
	            if (initializationValues === null) {
	                initializationValues = {};
	            }
	            _initWithObject.call(this, initializationValues);
	        }
	        return this;
	    },
	
	    /**
	     * Returns the dictionary's values as array
	     *
	     * @returns {Array}
	     */
	    values: function () {
	        var valueCollection = [],
	            keys = this.keys(),
	            keysLength = keys.length;
	        for (var i = 0; i < keysLength; i++) {
	            valueCollection.push(this[keys[i]]);
	        }
	        return valueCollection;
	    },
	
	    /**
	     * Returns the dictionary's keys as array
	     *
	     * @returns {Array}
	     */
	    keys: function () {
	        return Object.keys(this);
	    },
	
	    /**
	     * Invokes the callback for each key value pair in the Dictionary, passing in the value, key and dictionary
	     *
	     * Callback schema: function(value, key, dictionary) {}
	     *
	     * @param {Function} callback
	     * @param {Object} [thisArg]
	     */
	    forEach: function(callback, thisArg) {
	        this.map(callback, thisArg);
	    },
	
	    /**
	     * Creates a new array with the results of invoking the given callback for each key value pair in the Dictionary.
	     *
	     * Callback schema: function(value, key, dictionary) { return newValue; }
	     *
	     * @param {Function} callback
	     * @param {Object} [thisArg]
	     */
	    map: function(callback, thisArg) {
	        if (typeof callback !== 'function') {
	            throw new TypeError('Argument "callback" is not of type function');
	        }
	        var valueCollection = [],
	            keys = this.keys(),
	            keysLength = keys.length,
	            preparedCallback = callback,
	            currentKey, currentValue;
	
	        if (thisArg) {
	            preparedCallback = callback.bind(thisArg);
	        }
	
	        for (var i = 0; i < keysLength; i++) {
	            currentKey = keys[i];
	            currentValue = this[currentKey];
	            valueCollection.push(preparedCallback(currentValue, currentKey, this));
	        }
	        return valueCollection;
	    }
	});
	
	
	/**
	 * Class representing a file system path
	 * @param {String} path
	 * @constructor
	 */
	IrLib.Path = function (path) {
	    this.absolute = false;
	    if (!path) {
	        this.components = [];
	    }
	    else {
	        if (path.charAt(0) === '/') {
	            this.absolute = true;
	        }
	        this.components = path.split('/').filter(function (item) {
	            return !!item;
	        });
	    }
	};
	
	/**
	 * Returns a string representation of the path
	 *
	 * @returns {string}
	 */
	IrLib.Path.prototype.toString = function () {
	    return (this.absolute ? '/' : '') + this.components.join('/');
	};
	
	/**
	 * Returns if the path is absolute
	 *
	 * @returns {boolean}
	 */
	IrLib.Path.prototype.isAbsolute = function () {
	    return this.absolute;
	};
	
	/**
	 * Returns if the path is relative
	 *
	 * @returns {boolean}
	 */
	IrLib.Path.prototype.isRelative = function () {
	    return !this.absolute;
	};
	
	/**
	 * Created by COD on 03.06.15.
	 */
	var GeneralUtility = IrLib.Utility.GeneralUtility;
	var _Error = IrLib.Error;
	IrLib.ServiceLocator = IrLib.CoreObject.extend({
	    /**
	     * @type {Object}
	     */
	    services: null,
	
	    /**
	     * @type {Object}
	     */
	    serviceFactory: null,
	
	    /**
	     * @type {Number}
	     */
	    recursionLevel: 0,
	
	    /**
	     * Initialize the Service Locator
	     */
	    init: function () {
	        this.services = {};
	        this.serviceFactory = {};
	
	        this.set('serviceLocator', this);
	    },
	
	    /**
	     * Register multiple factory/constructor-identifier combinations
	     *
	     * @param {Object} configuration
	     * @returns {IrLib.ServiceLocator}
	     */
	    registerMultiple: function (configuration) {
	        var identifiers = Object.keys(configuration),
	            identifier, i;
	        for (i = 0; i < identifiers.length; i++) {
	            identifier = identifiers[i];
	            this.register(identifier, configuration[identifier]);
	        }
	        return this;
	    },
	
	    /**
	     * Register the factory/constructor for the given service identifier
	     *
	     * @param {String} identifier
	     * @param {Function} constructor
	     * @returns {IrLib.ServiceLocator}
	     */
	    register: function (identifier, constructor) {
	        this._assertIdentifier(identifier);
	        this._assertFactory(constructor);
	
	        this.serviceFactory[identifier] = constructor;
	        return this;
	    },
	
	    /**
	     * Sets the instance for the given service identifier
	     *
	     * @param {String} identifier
	     * @param {Object} instance
	     * @returns {IrLib.ServiceLocator}
	     */
	    set: function (identifier, instance) {
	        this._assertIdentifier(identifier);
	
	        this.services[identifier] = instance;
	        return this;
	    },
	
	    /**
	     * Returns the instance for the given service identifier
	     *
	     * If a service instance for the given identifier is already registered, it will be returned. If no instance is
	     * found a matching service factory is looked up. If none is found an exception will be thrown
	     *
	     * @param {String} identifier
	     * @returns {Object}
	     */
	    get: function (identifier) {
	        this._assertIdentifier(identifier);
	
	        var instance = this.services[identifier];
	        if (!instance) {
	            instance = this.create(identifier);
	            this.set(identifier, instance);
	        }
	        return instance;
	    },
	
	    /**
	     * Creates a new instance for the given service identifier and will invoke didResolveDependencies if it exists
	     *
	     * @param {String} identifier
	     * @param {*} [additionalArgument]
	     * @returns {Object}
	     */
	    create: function (identifier, additionalArgument) {
	        this._assertIdentifier(identifier);
	
	        var withArgument = arguments.length > 1,
	            instance, _serviceFactoryCallback;
	
	        if (arguments.length > 2) {
	            throw new _Error('Too many arguments');
	        }
	
	        _serviceFactoryCallback = this.serviceFactory[identifier];
	        if (!_serviceFactoryCallback) {
	            throw new _Error('Could not find service with identifier ' + identifier);
	        }
	        if (_serviceFactoryCallback.prototype && _serviceFactoryCallback.prototype.constructor) {
	            instance = this.resolveDependencies(
	                withArgument ? new _serviceFactoryCallback(additionalArgument) : new _serviceFactoryCallback(),
	                _serviceFactoryCallback
	            );
	        } else {
	            instance = withArgument ? _serviceFactoryCallback(additionalArgument) : _serviceFactoryCallback();
	        }
	
	        if (typeof instance.didResolveDependencies === 'function') {
	            instance.didResolveDependencies();
	        }
	
	        return instance;
	    },
	
	    /**
	     * Resolves the dependencies defined in the prototype's "needs" property
	     *
	     * @param {Object} instance
	     * @param {Class} serviceClass
	     * @returns {Object}
	     */
	    resolveDependencies: function (instance, serviceClass) {
	        var dependencies = null;
	
	        if (instance && typeof instance.needs === 'object') {
	            dependencies = instance.needs;
	        }
	        if (serviceClass.needs && typeof serviceClass.needs === 'function') {
	            dependencies = serviceClass.needs();
	        }
	
	        if (dependencies) {
	            var dependenciesLength = dependencies.length,
	                dependency, dependencyProperty, dependencyIdentifier, i;
	
	            if (++this.recursionLevel > 1000) {
	                throw new _Error('Maximum recursion level exceeded', 1434301204);
	            }
	            for (i = 0; i < dependenciesLength; i++) {
	                dependency = dependencies[i].split(':', 2);
	                dependencyIdentifier = dependency[0];
	                dependencyProperty = (dependency[1] || dependencyIdentifier);
	                instance[dependencyProperty] = this.get(dependencyIdentifier);
	            }
	            this.recursionLevel--;
	        }
	        return instance;
	    },
	
	    /**
	     * Tests if the given name is a valid service identifier
	     *
	     * @param {*} identifier
	     * @private
	     */
	    _assertIdentifier: function (identifier) {
	        if (typeof identifier !== 'string') {
	            throw new _Error('Given service name is not of type string', 1433683510);
	        }
	    },
	
	    /**
	     * Tests if the given value is a valid service factory
	     *
	     * @param {*} constructor
	     * @private
	     */
	    _assertFactory: function (constructor) {
	        if (typeof constructor !== 'function') {
	            throw new _Error('Given service constructor is not callable', 1433683511);
	        }
	    }
	});
	
	
	/**
	 * Created by COD on 04.07.14.
	 */
	/**
	 * Object representation of an URL
	 *
	 * @param {String} href
	 * @constructor
	 */
	IrLib.Url = function (href) {
	    /**
	     * Adds the protocol if the URI starts with //
	     *
	     * @param {String} input
	     * @returns String}
	     * @private
	     */
	    this._prepareDoubleStash = function (input) {
	        if (input.substr(0, 2) === '//') {
	            if (typeof window !== 'undefined') {
	                return window.location.protocol + input;
	            }
	            return 'http:' + input;
	        }
	        return input;
	    };
	    if (arguments.length > 0) {
	        var parser = document.createElement('a'),
	            location = typeof window !== 'undefined' ? window.location : {};
	        parser.href = this._prepareDoubleStash('' + href);
	
	        // IrLib.Logger.log(parser.host);
	        // IrLib.Logger.log(parser.hostname);
	        // IrLib.Logger.log(parser.protocol);
	
	        this._protocol = parser.protocol && parser.protocol !== ':' ? parser.protocol : location.protocol;   // => "http:"
	        this._port = parser.port || location.port;           // => "3000"
	        this._hostname = parser.hostname || location.hostname;   // => "example.com"
	        this._host = parser.host || (this._port ? this._hostname + ':' + this._port : this._hostname);           // => "example.com:3000"
	        this.setPathname(parser.pathname || location.pathname);  // => "/pathname/"
	        this.setHash(parser.hash);          // => "#hash"
	        this.setSearch(parser.search);      // => "?search=test"
	    } else {
	        this._protocol = '';
	        this._host = '';
	        this._hostname = '';
	        this._port = '';
	        this._hash = '';
	        this._search = '';
	        this.setPathname('');
	    }
	
	    Object.defineProperties(this, {
	        'host': {
	            get: this.getHost,
	            set: this.setHost
	        },
	        'hostname': {
	            get: this.getHostname,
	            set: this.setHostname
	        },
	        'port': {
	            get: this.getPort,
	            set: this.setPort
	        },
	        'pathname': {
	            get: this.getPathname,
	            set: this.setPathname
	        },
	        'hash': {
	            get: this.getHash,
	            set: this.setHash
	        },
	        'protocol': {
	            get: this.getProtocol,
	            set: this.setProtocol
	        },
	        'search': {
	            get: this.getSearch,
	            set: this.setSearch
	        }
	    });
	};
	
	/**
	 * Returns the current browser URL
	 *
	 * @returns {IrLib.Url}
	 */
	IrLib.Url.current = function () {
	    if (typeof window === 'undefined') {
	        throw new IrLib.TypeError('window not defined in this context');
	    }
	    return new IrLib.Url(window.location.href);
	};
	
	IrLib.Url.prototype = {
	    /**
	     * Returns the host
	     * @returns {String}
	     */
	    getHost: function () {
	        return this._host;
	    },
	
	    /**
	     * Sets the host
	     * @returns {String}
	     */
	    setHost: function (newValue) {
	        var hostDefinitionParts = newValue.split(':');
	        this._host = newValue;
	        this._hostname = hostDefinitionParts[0];
	        this._port = hostDefinitionParts[1];
	    },
	
	    /**
	     * Returns the hostname
	     * @returns {String}
	     */
	    getHostname: function () {
	        return this._hostname;
	    },
	
	    /**
	     * Sets the hostname
	     * @returns {String}
	     */
	    setHostname: function (newValue) {
	        this._hostname = newValue;
	        this._host = newValue + ':' + this._port;
	    },
	
	    /**
	     * Returns the port
	     * @returns {String}
	     */
	    getPort: function () {
	        return this._port;
	    },
	
	    /**
	     * Sets the port
	     * @returns {String}
	     */
	    setPort: function (newValue) {
	        this._port = newValue;
	        this._host = this._hostname + ':' + newValue;
	    },
	
	    /**
	     * Returns the protocol
	     *
	     * @returns {String}
	     */
	    getProtocol: function () {
	        return this._protocol;
	    },
	
	    /**
	     * Sets the protocol
	     *
	     * @param {String} newValue
	     */
	    setProtocol: function (newValue) {
	        this._protocol = newValue;
	    },
	
	    /**
	     * Returns the pathname
	     *
	     * @returns {String}
	     */
	    getPathname: function () {
	        return this._pathname;
	    },
	
	    /**
	     * Sets the pathname
	     *
	     * @param {String} newValue
	     */
	    setPathname: function (newValue) {
	        newValue = '' + newValue;
	        if (!newValue || newValue[0] !== '/') {
	            newValue = '/' + newValue;
	        }
	        this._pathname = newValue;
	    },
	
	    /**
	     * Returns the hash
	     *
	     * @returns {String}
	     */
	    getHash: function () {
	        return this._hash;
	    },
	
	    /**
	     * Sets the hash
	     *
	     * @param {String} newValue
	     */
	    setHash: function (newValue) {
	        newValue = '' + newValue;
	        if (newValue && newValue.charAt(0) !== '#') {
	            newValue = '#' + newValue;
	        }
	        this._hash = newValue;
	    },
	
	    /**
	     * Returns the search
	     *
	     * @returns {String}
	     */
	    getSearch: function () {
	        return this._search;
	    },
	
	    /**
	     * Sets the search
	     *
	     * @param {String} newValue
	     */
	    setSearch: function (newValue) {
	        newValue = '' + newValue;
	        if (newValue && newValue[0] !== '?') {
	            newValue = '?' + newValue;
	        }
	        this._search = newValue;
	    },
	
	    /**
	     * Returns if the URL is local
	     *
	     * @returns {boolean}
	     */
	    isLocal: function () {
	        return window.location.host == this.host;
	    },
	
	    /**
	     * Returns if the URL is equal to the current page
	     *
	     * @param {boolean} [ignoreSearch] If set to TRUE the URL's search/query part will not be compared
	     * @returns {boolean}
	     */
	    isSamePage: function (ignoreSearch) {
	        var pageUrl = IrLib.Url.current();
	        return (
	            pageUrl.host == this.host &&
	            pageUrl._protocol === this._protocol &&
	            pageUrl.pathname === this.pathname &&
	            (ignoreSearch || pageUrl.search === this.search)
	        );
	    },
	
	    /**
	     * Returns if the URL fully matches the current location
	     *
	     * @returns {boolean}
	     */
	    isCurrent: function () {
	        return this.isEqualTo(IrLib.Url.current());
	    },
	
	    /**
	     * Returns if the URL is equal to the given URL
	     *
	     * @param {String|IrLib.Url} url
	     * @returns {boolean}
	     */
	    isEqualTo: function (url) {
	        return ("" + url) == ("" + this);
	    },
	
	    /**
	     * Returns a string representation of the URL object
	     *
	     * @returns {string}
	     */
	    toString: function () {
	        return (this._protocol ? this._protocol + '//' : '') +
	            this.host +
	            this.pathname +
	            this.search +
	            this._hash;
	    }
	};
	
	
	}());
	
	
	(function() {/*    require('view\/interface');// */
	
	}());
	
	
	(function() {/*    require('view\/*');// */
	
	/**
	 * Created by COD on 25.06.15.
	 */
	(function() {/*require('view\/interface');// */
	
	}());
	
	
	(function() {/*require('view\/abstract-variable-view');// */
	
	/**
	 * Created by COD on 25.06.15.
	 */
	(function() {/*require('view\/interface');// */
	
	/**
	 * Created by COD on 25.06.15.
	 */
	
	IrLib.View = IrLib.View || {};
	
	/**
	 * Defines a common interface for Views
	 *
	 * @implements IrLib.View.SubViewInterface
	 * @interface
	 */
	IrLib.View.Interface = IrLib.CoreObject.extend({
	    init: function (template, variables) {
	        this._super();
	    },
	
	    /**
	     * Renders the template
	     *
	     * @return {Node|HTMLElement}
	     * @abstract
	     */
	    render: function () {
	        throw new IrLib.MissingImplementationError('render');
	    },
	
	    /**
	     * Set the variables
	     *
	     * @param {Object|IrLib.Dictionary} data
	     * @return {IrLib.View.Interface}
	     * @abstract
	     */
	    setVariables: function (data) {
	        throw new IrLib.MissingImplementationError('setVariables');
	    },
	
	    /**
	     * Add the variable with the given key and value
	     *
	     * @param {String} key
	     * @param {*} value
	     * @return {IrLib.View.Interface}
	     * @abstract
	     */
	    assignVariable: function (key, value) {
	        throw new IrLib.MissingImplementationError('assignVariable');
	    },
	
	    /**
	     * Appends the View to the given DOM element, while replacing the previously rendered element
	     *
	     * @param {Node|HTMLElement} element
	     * @return {IrLib.View.Interface}
	     * @abstract
	     */
	    appendTo: function (element) {
	        throw new IrLib.MissingImplementationError('appendTo');
	    },
	
	    /**
	     * Removes the element from it's parent
	     *
	     * @returns {IrLib.View.Interface}
	     * @abstract
	     */
	    remove: function () {
	        throw new IrLib.MissingImplementationError('remove');
	    },
	
	    /**
	     * Adds the given event listener to the View
	     *
	     * @param {String} type
	     * @param {EventListener|Function} listener
	     * @param {Boolean} [useCapture]
	     * @abstract
	     */
	    addEventListener: function (type, listener, useCapture) {
	        throw new IrLib.MissingImplementationError('addEventListener');
	    },
	
	    /**
	     * Dispatches an Event at the View, invoking the affected EventListeners in the appropriate order.
	     *
	     * The normal event processing rules (including the capturing and optional bubbling phase) apply to events
	     * dispatched manually with dispatchEvent().
	     *
	     * @param {Event} event
	     * @return {Boolean}
	     * @abstract
	     */
	    dispatchEvent: function (event) {
	        throw new IrLib.MissingImplementationError('dispatchEvent');
	    },
	
	    /**
	     * Returns the string representation of the rendered template
	     *
	     * @returns {String}
	     * @abstract
	     */
	    toString: function () {
	        throw new IrLib.MissingImplementationError('toString');
	    }
	});
	
	
	}());
	
	
	
	/**
	 * An abstract context-aware view
	 *
	 * @implements IrLib.View.VariableViewInterface
	 * @abstract
	 */
	IrLib.View.AbstractVariableView = IrLib.View.Interface.extend({
	    /**
	     * Dictionary of template variables
	     *
	     * @type {IrLib.Dictionary}
	     */
	    _variables: null,
	
	    /**
	     * Dictionary of computed variables
	     *
	     * @type {IrLib.Dictionary}
	     */
	    _computed: null,
	
	    init: function () {
	        this._super();
	
	        if (typeof this.variables === 'object') {
	            this.setVariables(this.variables);
	        } else {
	            this.setVariables({});
	        }
	
	        if (typeof this.computed === 'object') { // Check if a computed variables are inherited
	            this.setComputed(this.computed);
	        }
	
	        this.defineProperties({
	            'variables': {
	                enumerable: true,
	                get: this.getVariables,
	                set: this.setVariables
	            },
	            'computed': {
	                enumerable: true,
	                get: this.getComputed,
	                set: this.setComputed
	            }
	        });
	    },
	
	    /**
	     * @abstract
	     */
	    toString: function () {
	        throw new IrLib.MissingImplementationError('assignVariable');
	    },
	
	    /**
	     * Sets the variables
	     *
	     * @param {Object|IrLib.Dictionary} data
	     * @returns {IrLib.View.Interface}
	     */
	    setVariables: function (data) {
	        if (typeof data !== 'object') {
	            throw new TypeError('Initialization argument has to be of type object, ' + (typeof data) + ' given');
	        }
	        if (data instanceof IrLib.Dictionary) {
	            this._variables = data;
	        } else {
	            this._variables = new IrLib.Dictionary(data);
	        }
	        this._needsRedraw = true;
	        return this;
	    },
	
	    /**
	     * Adds the variable with the given key and value
	     *
	     * @param {String} key
	     * @param {*} value
	     * @returns {IrLib.View.Interface}
	     */
	    assignVariable: function (key, value) {
	        this._variables[key] = value;
	        this._needsRedraw = true;
	        return this;
	    },
	
	    /**
	     * Returns the currently assigned variables
	     *
	     * @returns {IrLib.Dictionary}
	     */
	    getVariables: function () {
	        return this._variables;
	    },
	
	    /**
	     * Sets the registered computed variables
	     *
	     * @param {Object|IrLib.Dictionary} data
	     * @returns {IrLib.View.Interface}
	     */
	    setComputed: function (data) {
	        if (typeof data !== 'object') {
	            throw new TypeError('Initialization argument has to be of type object, ' + (typeof data) + ' given');
	        }
	        if (data instanceof IrLib.Dictionary) {
	            this._computed = data;
	        } else {
	            this._computed = new IrLib.Dictionary(data);
	        }
	        this._needsRedraw = true;
	        return this;
	    },
	
	    /**
	     * Returns the registered computed variables
	     *
	     * @returns {IrLib.Dictionary}
	     */
	    getComputed: function () {
	        return this._computed;
	    }
	});
	
	
	}());
	
	
	
	/**
	 * An abstract context-aware view
	 *
	 * @implements IrLib.View.ContextInterface
	 * @abstract
	 */
	IrLib.View.AbstractContextAwareView = IrLib.View.AbstractVariableView.extend({
	    /**
	     * Views context
	     *
	     * @type {IrLib.View.Interface}
	     */
	    _context: null,
	
	    init: function () {
	        this._super();
	
	        if (typeof this.context !== 'undefined') { // Check if a context is inherited
	            this._context = this.context;
	        }
	
	        this.defineProperty(
	            'context',
	            {
	                enumerable: true,
	                get: this.getContext,
	                set: this.setContext
	            }
	        );
	    },
	
	    /**
	     * Returns the View's context
	     *
	     * @returns {IrLib.View.Interface}
	     */
	    getContext: function () {
	        return this._context;
	    },
	
	    /**
	     * Sets the View's context
	     *
	     * @param {IrLib.View.Interface} context
	     * @returns {IrLib.View.Interface}
	     */
	    setContext: function (context) {
	        this._context = context;
	        return this;
	    }
	});
	
	
	/**
	 * Created by COD on 25.06.15.
	 */
	(function() {/*require('view\/interface');// */
	
	}());
	
	
	
	/**
	 * An abstract view with DOM support
	 *
	 * @implements EventListener
	 * @abstract
	 */
	IrLib.View.AbstractDomView = IrLib.View.AbstractContextAwareView.extend({
	    /**
	     * Tag name for the HTML node that encapsulates the generated nodes
	     *
	     * @type {String}
	     */
	    tagName: 'div',
	
	    /**
	     * Registry of event listeners
	     *
	     * @type {Object}
	     */
	    _eventListeners: null,
	
	    /**
	     * Defines if a redraw is required
	     *
	     * @type {Boolean}
	     */
	    _needsRedraw: true,
	
	    /**
	     * DOM element
	     *
	     * @type {Node|HTMLElement}
	     */
	    _dom: null,
	
	    /**
	     * Last inserted node which should be replaced
	     *
	     * @type {Node}
	     */
	    _lastInsertedNode: null,
	
	    init: function () {
	        var _this = this;
	
	        this._super();
	
	        this._eventListeners = {};
	        if (typeof this.eventListeners === 'object') { // Check if a eventListeners variables are inherited
	            (new IrLib.Dictionary(this.eventListeners)).forEach(function(imp, key) {
	                _this.addEventListener(key, imp);
	            });
	        } else if (typeof this.events === 'object') { // Check if a events variables are inherited
	            (new IrLib.Dictionary(this.events)).forEach(function(imp, key) {
	                _this.addEventListener(key, imp);
	            });
	        }
	
	        this.defineProperty(
	            'needsRedraw',
	            {
	                enumerable: true,
	                get: this.getNeedsRedraw
	            }
	        );
	    },
	
	    /**
	     * Renders the template
	     *
	     * @return {Node|HTMLElement}
	     */
	    render: function () {
	        if (this._needsRedraw) {
	            delete this._dom;
	            var _template = this.template;
	            if (!_template) {
	                throw new ReferenceError('Template not specified');
	            }
	
	            this._dom = this._createDom(this.toString());
	            this._needsRedraw = false;
	        }
	        return this._dom;
	    },
	
	    /**
	     * Returns if a redraw is required
	     *
	     * @returns {Boolean}
	     */
	    getNeedsRedraw: function () {
	        return this._needsRedraw;
	    },
	
	    /**
	     * Returns if the View is in the visible DOM
	     *
	     * @returns {Boolean}
	     */
	    isVisible: function () {
	        var element = this._dom;
	        return !!(element && element.parentNode && document.body.contains(element));
	    },
	
	    /**
	     * Appends the View to the given DOM element, while replacing the previously rendered element
	     *
	     * @param {Node|HTMLElement} element
	     * @returns {IrLib.View.Interface}
	     */
	    appendTo: function (element) {
	        if (!element || typeof element.appendChild !== 'function') {
	            throw new TypeError('Given element is not a valid DOM Node');
	        }
	
	        this.render();
	
	        if (this._lastInsertedNode) {
	            element.replaceChild(this._dom, this._lastInsertedNode);
	        } else {
	            element.appendChild(this._dom);
	        }
	        this._lastInsertedNode = this._dom;
	
	        this.addStoredEventListeners();
	        return this;
	    },
	
	    /**
	     * Reloads the Views output in the DOM
	     *
	     * @param {Boolean} [force]
	     * @returns {IrLib.View.Interface}
	     */
	    reload: function (force) {
	        var lastParent = this._dom ? this._dom.parentNode : (this._lastInsertedNode ? this._lastInsertedNode.parentNode : null);
	        if (!lastParent) {
	            throw new ReferenceError('Can not reload because the view does not seem to be in the DOM');
	        }
	        if (force || this._needsRedraw) {
	            this._needsRedraw = true;
	            this.appendTo(lastParent);
	        }
	        return this;
	    },
	
	    /**
	     * Removes the element from it's parent
	     *
	     * @returns {IrLib.View.Interface}
	     */
	    remove: function () {
	        var lastInsertedNode = this._lastInsertedNode;
	        if (lastInsertedNode && lastInsertedNode.parentNode) {
	            lastInsertedNode.parentNode.removeChild(lastInsertedNode);
	            this._lastInsertedNode = null;
	        }
	        return this;
	    },
	
	    /**
	     * Handle the DOM event
	     *
	     * @param {Event} event
	     */
	    handleEvent: function (event) {
	        var imps = this._eventListeners[event.type],
	            patchedEvent, currentImp, i;
	
	        if (imps) {
	            patchedEvent = this._patchEvent(event);
	            for (i = 0; i < imps.length; i++) {
	                currentImp = imps[i];
	                if (typeof currentImp === 'undefined') {
	                    throw new TypeError('Implementation for event type "' + event.type + '" is undefined');
	                } else if (typeof currentImp === 'function') {
	                    currentImp.call(this, patchedEvent);
	                } else if (currentImp.handleEvent) {
	                    currentImp.handleEvent.call(currentImp, patchedEvent);
	                }
	            }
	        } else {
	            IrLib.Logger.log(event);
	        }
	    },
	
	    /**
	     * Create a patches version of the event and set it's target to the View
	     *
	     * @param {Event} event
	     * @returns {Event}
	     * @private
	     */
	    _patchEvent: function (event) {
	        event.irTarget = this;
	        return event;
	    },
	
	    /**
	     * Adds the given event listener to the View
	     *
	     * @param {String} type
	     * @param {EventListener|Function} listener
	     * @param {Boolean} [useCapture] Currently ignored
	     */
	    addEventListener: function (type, listener, useCapture) {
	        var _eventListeners = this._eventListeners;
	        if (!_eventListeners[type]) {
	            _eventListeners[type] = [listener];
	        }
	
	        if (_eventListeners[type].indexOf(listener) === -1) {
	            _eventListeners[type].push(listener);
	        }
	
	        this._addEventListeners(this.render(), [type]);
	    },
	
	    /**
	     * Add event listeners for each given event types to the element
	     *
	     * @param {HTMLElement} element
	     * @param {String[]} eventTypes
	     * @private
	     */
	    _addEventListeners: function (element, eventTypes) {
	        var eventTypesLength = eventTypes.length,
	            i, type;
	        for (i = 0; i < eventTypesLength; i++) {
	            type = eventTypes[i];
	            element.addEventListener(type, this);
	        }
	    },
	
	    /**
	     * Add the stored event listeners to the DOM Node
	     */
	    addStoredEventListeners: function() {
	        if (!this._dom) {
	            throw new ReferenceError('DOM is not render yet');
	        }
	        this._addEventListeners(this._dom, Object.keys(this._eventListeners));
	    },
	
	    /**
	     * Dispatches an Event at the View, invoking the affected EventListeners in the appropriate order.
	     *
	     * The normal event processing rules (including the capturing and optional bubbling phase) apply to events
	     * dispatched manually with dispatchEvent().
	     *
	     * @param {Event} event
	     * @return {Boolean}
	     */
	    dispatchEvent: function (event) {
	        this.render().dispatchEvent(event);
	    },
	
	    /**
	     * Creates the Document Object Model for the given template string
	     *
	     * @param {String} [template]
	     * @returns {Node|HTMLElement}
	     * @protected
	     */
	    _createDom: function (template) {
	        var root = document.createElement(this.tagName);
	        if (template) {
	            root.innerHTML = template;
	        }
	        return root;
	    },
	
	    /**
	     * Returns a clone of this object
	     *
	     * @returns {*}
	     */
	    clone: function() {
	        var source = this,
	            _clone = new (source.constructor)();
	        for (var attr in source) {
	            if (source.hasOwnProperty(attr)) {
	                if (attr === '_dom' || attr === '_lastInsertedNode' || attr === '_eventListeners') {
	                    continue;
	                }
	                _clone[attr] = source[attr];
	            }
	        }
	        _clone.__guid = IrLib.CoreObject.createGuid();
	        return _clone;
	    }
	});
	
	
	/**
	 * Created by COD on 25.06.15.
	 */
	
	IrLib.View = IrLib.View || {};
	
	/**
	 * Defines a common interface for context aware Views
	 *
	 * @interface
	 */
	IrLib.View.ContextInterface = function () {
	};
	IrLib.View.ContextInterface.prototype.setContext = function () {
	    throw new IrLib.MissingImplementationError('setContext');
	};
	IrLib.View.ContextInterface.prototype.getContext = function () {
	    throw new IrLib.MissingImplementationError('getContext');
	};
	
	
	/**
	 * Created by COD on 25.06.15.
	 */
	(function() {/*require('view\/template');// */
	
	/**
	 * Created by COD on 25.06.15.
	 */
	
	/**
	 * A template based view
	 *
	 * @implements EventListener
	 * @implements IrLib.View.Interface
	 * @implements IrLib.View.ContextInterface
	 * @implements IrLib.View.SubViewInterface
	 */
	IrLib.View.Template = IrLib.View.AbstractDomView.extend({
	    needs: ['serviceLocator'],
	
	    /**
	     * @type {IrLib.ServiceLocator}
	     */
	    serviceLocator: null,
	
	    /**
	     * Template to render
	     *
	     * @type {String}
	     */
	    _template: '',
	
	    /**
	     * Array of parse template blocks
	     *
	     * @type {IrLib.View.Parser.Block[]}
	     */
	    _templateBlocks: null,
	
	    /**
	     * Template parser instance
	     *
	     * @type {IrLib.View.Parser.Interface}
	     */
	    _templateParser: null,
	
	    /**
	     * Stack of last condition results
	     *
	     * @type {Boolean[]}
	     */
	    _lastConditionStateStack: [],
	
	    /**
	     * Registered sub views
	     *
	     * @type {IrLib.Dictionary}
	     */
	    _subviewPlaceholders: null,
	
	    /**
	     * Render the subviews as string
	     * @type {Boolean}
	     */
	    _renderSubviewsAsPlaceholders: false,
	
	    init: function (template, variables) {
	        this._super(template, variables);
	
	        if (arguments.length > 0) { // Check if the template argument is given
	            if (typeof template !== 'string') {
	                throw new TypeError('Argument "template" is not of type string');
	            }
	            this.setTemplate(template);
	        } else if (typeof this.template === 'string') { // Check if a template string is inherited
	            this.setTemplate(this.template.slice(0));
	        }
	
	        this._subviewPlaceholders = new IrLib.Dictionary();
	
	        if (arguments.length > 1) {
	            this.setVariables(variables);
	        }
	
	        this.defineProperties({
	            'template': {
	                enumerable: true,
	                get: this.getTemplate,
	                set: this.setTemplate
	            }
	        });
	    },
	
	    /**
	     * Returns the string representation of the rendered template
	     *
	     * @returns {String}
	     */
	    toString: function () {
	        return this._renderBlocks();
	    },
	
	    /**
	     * Renders the template
	     *
	     * @return {Node|HTMLElement}
	     */
	    render: function () {
	        if (this._needsRedraw) {
	            delete this._dom;
	            var _template = this.template;
	            if (!_template) {
	                throw new ReferenceError('Template not specified');
	            }
	
	            this._renderSubviewsAsPlaceholders = true;
	            this._dom = this._createDom(this.toString());
	            this._renderSubviewsAsPlaceholders = false;
	            this._needsRedraw = false;
	        }
	        return this._dom;
	    },
	
	    /**
	     * Replace the variables inside the given template
	     *
	     * @returns {String}
	     */
	    _renderBlocks: function () {
	        var BlockType = IrLib.View.Parser.BlockType,
	            State = IrLib.View.State,
	            templateBlocks = this.getTemplateBlocks(),
	            templateBlocksLength = templateBlocks.length,
	            inline_escapeHtml = this._escapeHtml,
	            inline_resolveVariable = this._resolveVariable.bind(this),
	            inline_renderExpression = this._renderExpression.bind(this),
	            renderedTemplate = '',
	            currentVariableValue, currentMeta, currentTemplateBlock, index;
	
	        for (index = 0; index < templateBlocksLength; index++) {
	            /** @var {IrLib.View.Parser.Block} currentTemplateBlock */
	            currentTemplateBlock = templateBlocks[index];
	            switch (currentTemplateBlock.type) {
	                case BlockType.VARIABLE:
	                    currentVariableValue = inline_resolveVariable(currentTemplateBlock.content);
	                    currentMeta = currentTemplateBlock.meta;
	                    if (!currentMeta.isSafe) {
	                        currentVariableValue = inline_escapeHtml(currentVariableValue);
	                    }
	
	                    renderedTemplate += currentVariableValue;
	                    break;
	
	                case BlockType.EXPRESSION:
	                    var state = new State(index, templateBlocks);
	                    renderedTemplate += inline_renderExpression(currentTemplateBlock, state);
	                    index = state.index;
	                    break;
	
	                case BlockType.STATIC:
	                /* falls through */
	                default:
	                    renderedTemplate += currentTemplateBlock.content;
	                    break;
	
	            }
	        }
	
	        return renderedTemplate;
	    },
	
	    /**
	     * Renders the expression of the current block
	     *
	     * @param {IrLib.View.Parser.Block} block
	     * @param {IrLib.View.State} state
	     * @returns {String}
	     * @private
	     */
	    _renderExpression: function (block, state) {
	        var ExpressionType = IrLib.View.Parser.ExpressionType,
	            expressionParts = block.content.split(' '),
	            lastConditionStateStack = this._lastConditionStateStack,
	            meta = block.meta,
	            output, view, viewId;
	
	        switch (meta.expressionType) {
	            case ExpressionType.VIEW:
	                view = this._resolveView(expressionParts[1]);
	                view.setContext(this);
	                view.setVariables(this.variables);
	
	                if (this._renderSubviewsAsPlaceholders) {
	                    // TODO: Handle insertion of the same views again
	                    viewId = 'irLibView-' + view.guid();
	                    //console.log(view.guid());
	                    this._subviewPlaceholders[viewId] = view;
	                    output = '<script id="' + viewId + '" type="text/x-placeholder"></script>';
	                } else {
	                    output = view.toString();
	                }
	                break;
	
	            case ExpressionType.ELSE:
	                if (lastConditionStateStack.pop() === true) {
	                    /* Skip forward to the closing block */
	                    state.index++;
	                    this._scanToEndExpression(ExpressionType.CONDITIONAL_START, ExpressionType.CONDITIONAL_END, state);
	                }
	                output = '';
	                break;
	
	            case ExpressionType.CONDITIONAL_START:
	                if (expressionParts.length < 2) {
	                    throw new ReferenceError('Condition missing');
	                }
	                var conditionKey = expressionParts[1],
	                    conditionValue = this._resolveVariable(conditionKey);
	
	                if (this._evaluateConditionValue(conditionValue)) {
	                    /* Continue rendering the next blocks */
	                    lastConditionStateStack.push(true);
	                } else {
	                    /* Skip forward to the closing or else block */
	                    state.index++;
	                    this._scanToEndExpression(ExpressionType.CONDITIONAL_START, ExpressionType.CONDITIONAL_END, state);
	                    lastConditionStateStack.push(false);
	                }
	                output = '';
	                break;
	
	            case ExpressionType.CONDITIONAL_END:
	                output = '';
	                //output = ' eni ';
	                break;
	
	            case ExpressionType.UNKNOWN:
	            /* falls through */
	            default:
	                output = '{%' + block.content + '%}';
	        }
	
	        return output;
	    },
	
	    /**
	     * Evaluate the condition value
	     *
	     * @param {*} conditionValue
	     * @returns {boolean}
	     * @private
	     */
	    _evaluateConditionValue: function (conditionValue) {
	        return (
	            (Array.isArray(conditionValue) && conditionValue.length > 0) ||
	            (typeof conditionValue === 'object' && Object.keys(conditionValue).length > 0) || !!conditionValue
	        );
	    },
	
	    /**
	     * Skip forward to the matching end block
	     *
	     * @param {IrLib.View.Parser.ExpressionType|string} startExpression
	     * @param {IrLib.View.Parser.ExpressionType|string} endExpression
	     * @param {IrLib.View.State} state
	     * @private
	     */
	    _scanToEndExpression: function (startExpression, endExpression, state) {
	        var blockStream = state.blockStream,
	            blockStreamLength = blockStream.length,
	            EXPRESSION = IrLib.View.Parser.BlockType.EXPRESSION,
	            EXPRESSION_TYPE_ELSE = IrLib.View.Parser.ExpressionType.ELSE,
	            nestingDepth = 1,
	            i = state.index,
	            balanced = false,
	            block, expressionType;
	
	        for (; i < blockStreamLength; i++) {
	            /** @type {IrLib.View.Parser.Block} */
	            block = blockStream[i];
	            if (block.type === EXPRESSION) {
	                expressionType = block.meta.expressionType;
	                if (expressionType === startExpression) { // Start of a new if/for
	                    nestingDepth++;
	                } else if (expressionType === endExpression) { // End of the last if/for
	                    nestingDepth--;
	                    if (nestingDepth < 1) {
	                        balanced = true;
	                        break;
	                    }
	                } else if (nestingDepth === 1 && expressionType === EXPRESSION_TYPE_ELSE) { // Matching else was found
	                    balanced = true;
	                    break;
	                }
	            }
	        }
	
	        if (!balanced) {
	            IrLib.Logger.log('Not balanced');
	        }
	        state.index = i;
	    },
	
	    /**
	     * Resolve the variable for the given key path
	     *
	     * @param {String} keyPath
	     * @returns {*}
	     * @private
	     */
	    _resolveVariable: function (keyPath) {
	        var result;
	        try {
	            result = IrLib.Utility.GeneralUtility.valueForKeyPathOfObject(keyPath, this.getVariables(), false);
	            if (typeof result === 'function') {
	                result = result(this);
	            }
	        } catch (error) {
	            if (!(error instanceof TypeError)) {
	                throw error;
	            }
	        }
	
	        if (!result && keyPath.indexOf('.') === -1) { // Key paths for computed variables must NOT contain a dot
	            result = this._resolveAndEvaluateComputed(keyPath);
	        }
	
	        return result !== undefined ? result : '';
	    },
	
	    /**
	     * Resolve the variable for the given key path
	     *
	     * @param {String} key
	     * @returns {*}
	     * @private
	     */
	    _resolveAndEvaluateComputed: function (key) {
	        var _computed = this.computed,
	            registeredComputed;
	        if (!_computed) {
	            return undefined;
	        }
	        registeredComputed = _computed[key];
	        if (typeof registeredComputed === 'function') {
	            return registeredComputed.call(this);
	        }
	        return undefined;
	    },
	
	    /**
	     * Resolve the requested View
	     *
	     * @param {String} viewIdentifier
	     * @returns {IrLib.View.SubViewInterface}
	     * @private
	     */
	    _resolveView: function (viewIdentifier) {
	        var _serviceLocator = this.serviceLocator,
	            view;
	
	        if (!_serviceLocator) {
	            throw new ReferenceError('Service Locator must be set to resolve views for identifier "' + viewIdentifier + '"');
	        }
	        try {
	            view = this.serviceLocator.get(viewIdentifier);
	        } catch (exception) {
	        }
	        if (view instanceof IrLib.View.Interface) {
	            return view;
	        }
	        throw new ReferenceError('No view for identifier "' + viewIdentifier + '"');
	    },
	
	    /**
	     * Escapes the given input
	     *
	     * @param {String} string
	     * @returns {string}
	     * @private
	     */
	    _escapeHtml: function (string) {
	        var entityMap = {
	            '&': '&amp;',
	            '<': '&lt;',
	            '>': '&gt;',
	            '"': '&quot;',
	            "'": '&#39;',
	            '/': '&#x2F;'
	        };
	        return String(string).replace(/[&<>"'\/]/g, function fromEntityMap(s) {
	            return entityMap[s];
	        });
	    },
	
	    ///**
	    // * Renders the actions inside the given template
	    // *
	    // * @param {String} template
	    // * @returns {String}
	    // */
	    //_renderActions: function (template) {
	    //    var actionRegularExpression = /\s\{\{action:([\w\-]*)}}\s/g,
	    //        _document = $(document),
	    //        matches = [], found, i, _this;
	    //
	    //    /**
	    //    * @type {Iresults.Modal}
	    //    * @private
	    //    */
	    //    _this = this;
	    //
	    //    while (found = actionRegularExpression.exec(template)) {
	    //        matches.push({
	    //            expression: found[0],
	    //            action: found[1]
	    //        });
	    //        actionRegularExpression.lastIndex -= found[0].split(':')[1].length;
	    //    }
	    //
	    //    for (i = 0; i < matches.length; i++) {
	    //        var elementId = Iresults.Modal.actionElementIds.length,
	    //            actionDefinition = matches[i],
	    //            actionName = actionDefinition.action,
	    //            expression = actionDefinition.expression,
	    //            elementIdString = 'ir-modal-' + elementId,
	    //            elementIdAttribute = ' id="' + elementIdString + '" ',
	    //            data
	    //            ;
	    //        Iresults.Modal.actionElementIds.push(elementId);
	    //
	    //        data = {
	    //            action: actionName
	    //        };
	    //
	    //        /* Prepare the template */
	    //        template = template.replace(expression, elementIdAttribute);
	    //
	    //        /* Register the click handler */
	    //        _document.on('click', '#' + elementIdString, data, function(event) {
	    //            var actionName = event.data.action,
	    //                imp = _this.controller.actions ? _this.controller.actions[actionName] : _this.controller[actionName];
	    //
	    //            if (!imp) {
	    //                throw new Iresults.ActionError('No implementation for method "' + actionName + '"');
	    //            }
	    //            imp.call(_this.controller, event);
	    //        });
	    //    }
	    //
	    //    return template;
	    //},
	
	    /**
	     * Replace the placeholders for subviews with the actual view instances
	     */
	    replaceSubviewPlaceholders: function () {
	        var _dom = this._dom;
	
	        this._subviewPlaceholders.forEach(function (view, elementId) {
	            var placeholder = _dom.querySelector('#' + elementId);
	
	            //console.log(placeholder, elementId, view.render());
	
	            if (placeholder && placeholder.parentNode) {
	                placeholder.parentNode.replaceChild(view.render(), placeholder);
	                view.addStoredEventListeners();
	            } else {
	                throw new ReferenceError(
	                    'Could not find subview placeholder #' + elementId
	                );
	            }
	        });
	        this._subviewPlaceholders = new IrLib.Dictionary();
	    },
	
	    /**
	     * @inheritDoc
	     */
	    appendTo: function (element) {
	        this._super(element);
	        this.replaceSubviewPlaceholders();
	    },
	
	    /**
	     * Sets the template
	     *
	     * @param {String} template
	     * @returns {IrLib.View.Template}
	     */
	    setTemplate: function (template) {
	        var templateTemporary = template.trim();
	        if (this._isSelector(templateTemporary)) {
	            this._template = this._getTemplateForSelector(templateTemporary);
	        } else {
	            this._template = templateTemporary;
	        }
	        this._needsRedraw = true;
	        this._templateBlocks = null;
	        return this;
	    },
	
	    /**
	     * Returns the template
	     *
	     * @returns {String}
	     */
	    getTemplate: function () {
	        return this._template;
	    },
	
	    /**
	     * Returns the template blocks
	     *
	     * @returns {IrLib.View.Parser.Block[]}
	     */
	    getTemplateBlocks: function () {
	        if (!this._templateBlocks) {
	            var templateParser = this.getTemplateParser();
	            this._templateBlocks = templateParser.parse(this._template);
	        }
	        return this._templateBlocks;
	    },
	
	    /**
	     * Returns if the given value is a selector
	     *
	     * @param {*} value
	     * @returns {boolean}
	     * @private
	     */
	    _isSelector: function (value) {
	        if (typeof value !== 'string') {
	            return false;
	        }
	        if (value.indexOf('<') !== -1 || value.indexOf('{') !== -1) {
	            return false;
	        }
	        var firstChar = value.charAt(0);
	        return firstChar === '#' || firstChar === '.' || /^[a-z]/i.test(firstChar);
	    },
	
	    /**
	     * Returns the template for the given selector
	     *
	     * @param {String} selector
	     * @returns {String}
	     * @private
	     */
	    _getTemplateForSelector: function (selector) {
	        var templateElement = document.querySelector(selector),
	            templateHtml;
	        if (!templateElement) {
	            return null;
	        }
	        templateHtml = templateElement.innerHTML;
	        return templateHtml ? templateHtml.trim() : null;
	    },
	
	    /**
	     * Returns the template parser interface
	     *
	     * @returns {IrLib.View.Parser.Interface}
	     */
	    getTemplateParser: function () {
	        if (!this._templateParser) {
	            this._templateParser = new IrLib.View.Parser.Parser();
	        }
	        return this._templateParser;
	    },
	
	    /**
	     * Returns a clone of this object
	     *
	     * @returns {*}
	     */
	    clone: function () {
	        var _clone = this._super();
	        _clone._subviewPlaceholders = new IrLib.Dictionary();
	        _clone._lastConditionStateStack = [];
	        return _clone;
	    }
	});
	
	
	}());
	
	
	
	/**
	 * A loop based view
	 *
	 * @implements EventListener
	 * @implements IrLib.View.Interface
	 * @implements IrLib.View.ContextInterface
	 * @implements IrLib.View.SubViewInterface
	 */
	IrLib.View.LoopView = IrLib.View.AbstractDomView.extend({
	    needs: ['serviceLocator'],
	
	    /**
	     * @type {IrLib.ServiceLocator}
	     */
	    serviceLocator: null,
	
	    /**
	     * Content to loop over
	     *
	     * @type {Array}
	     */
	    _content: null,
	
	    /**
	     * Template to repeat
	     *
	     * @type {IrLib.View.Interface}
	     */
	    _templateView: null,
	
	    /**
	     * Original template input
	     *
	     * @type {String}
	     */
	    _originalTemplate: '',
	
	    /**
	     * Key to use to access the current iteration value
	     *
	     * @type {String}
	     */
	    _asKey: 'this',
	
	    init: function (template, content, asKey) {
	        this._super();
	        if (template) { // Check if the template argument is given
	            this.setTemplate(template);
	        } else if (typeof this.template === 'string') { // Check if a template string is inherited
	            this.setTemplate(this.template.slice(0));
	        }
	
	        if (content) { // Check if the content is given
	            this.setContent(content);
	        } else if (this.content) { // Check if a content is inherited
	            this.setContent(this.content);
	        }
	
	        if (asKey) { // Check if the as-key is given
	            this._asKey = asKey;
	        } else if (typeof this.asKey === 'string') { // Check if the as-key is inherited
	            this.setAsKey(this.asKey);
	        }
	
	        if (typeof this.context !== 'undefined') { // Check if a context is inherited
	            this._context = this.context;
	        }
	
	        this.defineProperties({
	            'content': {
	                enumerable: true,
	                get: this.getContent,
	                set: this.setContent
	            },
	            'asKey': {
	                enumerable: true,
	                get: this.getAsKey,
	                set: this.setAsKey
	            },
	            'needsRedraw': {
	                enumerable: true,
	                get: this.getNeedsRedraw
	            },
	            'template': {
	                enumerable: true,
	                get: this.getTemplateView,
	                set: this.setTemplate
	            }
	        });
	    },
	
	    /**
	     * Renders the template
	     *
	     * @return {Node|HTMLElement}
	     */
	    render: function () {
	        if (this._needsRedraw) {
	            delete this._dom;
	
	            //this._dom = this._createDom(this.toString());
	
	            var domNode = this._createDom();
	            this._render(domNode);
	            this._dom = domNode;
	
	            this._needsRedraw = false;
	        }
	        return this._dom;
	    },
	
	    /**
	     * Returns the string representation of the rendered template
	     *
	     * @returns {String}
	     */
	    toString: function () {
	        return this._render();
	    },
	
	    /**
	     * Loop over to content, render the template and append to the node (if given)
	     *
	     * @param {Node|HTMLElement} [appendToNode]
	     * @returns {string}
	     * @private
	     */
	    _render: function (appendToNode) {
	        var content = this._content;
	        if (content === null) {
	            throw new ReferenceError('No content defined');
	        }
	
	        var contentLength = content.length,
	            _template = this.getTemplateView(),
	            _asKey = this.getAsKey(),
	            _computed = this._computed,
	            renderedContent = '',
	            templateCopy, currentVariables, scope, i;
	
	        if (!_template) {
	            throw new ReferenceError('Template not specified');
	        }
	
	        _template.setContext(this);
	        if (_computed) {
	            _template.setComputed(_computed);
	        }
	
	        for (i = 0; i < contentLength; i++) {
	            //templateCopy = IrLib.Utility.GeneralUtility.clone(_template, 12);
	            templateCopy = _template.clone();
	
	            currentVariables = content[i];
	            scope = {
	                _meta: {
	                    iteration: i,
	                    first: (i === 0),
	                    last: (i === contentLength)
	                }
	            };
	            scope[_asKey] = currentVariables;
	            templateCopy.setVariables(scope);
	
	            if (appendToNode) {
	                appendToNode.appendChild(templateCopy.render());
	                if (templateCopy instanceof IrLib.View.Template || typeof templateCopy.replaceSubviewPlaceholders === 'function') {
	                    templateCopy.replaceSubviewPlaceholders();
	                }
	            } else {
	                renderedContent += templateCopy.toString();
	            }
	        }
	        return renderedContent;
	    },
	
	    /**
	     * Sets the content to loop over
	     *
	     * @param {Array} content
	     * @returns {IrLib.View.LoopView}
	     */
	    setContent: function (content) {
	        if (!Array.isArray(content)) {
	            throw new TypeError('Argument "content" has to be of type object, ' + (typeof content) + ' given');
	        }
	        this._content = content;
	        this._needsRedraw = true;
	        return this;
	    },
	
	    /**
	     * Returns the content to loop over
	     *
	     * @returns {Array}
	     */
	    getContent: function () {
	        return this._content;
	    },
	
	    /**
	     * Set the variables
	     *
	     * @param {Object|IrLib.Dictionary} data
	     * @return {IrLib.View.Interface}
	     * @abstract
	     */
	    setVariables: function (data) {
	        this._super(data);
	        if (typeof data.content !== 'undefined') {
	            this.setContent(data.content);
	            //    throw new TypeError('Loop View only accepts variables with a property called "content". See setContent()');
	        }
	        return this;
	    },
	
	    /**
	     * Sets the key to use to access the current iteration value
	     *
	     * @param {String} asKey
	     * @returns {IrLib.View.LoopView}
	     */
	    setAsKey: function (asKey) {
	        this._asKey = asKey;
	        return this;
	    },
	
	    /**
	     * Returns the key to use to access the current iteration value
	     *
	     * @returns {String}
	     */
	    getAsKey: function () {
	        return this._asKey;
	    },
	
	    /**
	     * Sets the template
	     *
	     * @param {IrLib.View.Interface|String} template
	     * @returns {IrLib.View.LoopView}
	     */
	    setTemplate: function (template) {
	        if (!(template instanceof IrLib.View.Interface) && typeof template !== 'string') {
	            throw new TypeError('Invalid type for template, ' + (typeof content) + ' given');
	        }
	        this._originalTemplate = template;
	        return this;
	    },
	
	    /**
	     * Returns the template
	     *
	     * @returns {IrLib.View.Interface}
	     */
	    getTemplateView: function () {
	        if (!this._templateView) {
	            this._templateView = this._createTemplateViewFromTemplate();
	        }
	        return this._templateView;
	    },
	
	    /**
	     * Create the actual template view from the input template
	     *
	     * @returns {IrLib.View.Interface}
	     * @private
	     */
	    _createTemplateViewFromTemplate: function () {
	        var _serviceLocator = this.serviceLocator,
	            _originalTemplate = this._originalTemplate,
	            templateView;
	
	        if (typeof _originalTemplate == 'string') {
	            templateView = new IrLib.View.Template(_originalTemplate);
	            if (_serviceLocator) {
	                _serviceLocator.resolveDependencies(templateView, IrLib.View.Template);
	            }
	        } else if (_originalTemplate instanceof IrLib.View.Interface) {
	            templateView = _originalTemplate;
	        } else {
	            throw new TypeError('Invalid type for template, ' + (typeof content) + ' given');
	        }
	
	        return templateView;
	    },
	
	    /**
	     * Returns the View's context
	     *
	     * @returns {IrLib.View.Interface}
	     */
	    getContext: function () {
	        return this._context;
	    },
	
	    /**
	     * Sets the View's context
	     *
	     * @param {IrLib.View.Interface} context
	     * @returns {IrLib.View.Interface}
	     */
	    setContext: function (context) {
	        this._context = context;
	        return this;
	    }
	});
	
	
	/**
	 * Created by COD on 25.06.15.
	 */
	
	IrLib.View = IrLib.View || {};
	
	/**
	 * Current template block information
	 *
	 * @param {Number} index
	 * @param {Block[]} blockStream
	 * @constructor
	 */
	IrLib.View.State = function (index, blockStream) {
	    this.index = index|0;
	    this.blockStream = blockStream;
	};
	
	
	/**
	 * Created by COD on 25.06.15.
	 */
	
	IrLib.View = IrLib.View || {};
	
	/**
	 * Defines the interface for Views that can be used as subview inside another View
	 *
	 * @interface
	 */
	IrLib.View.SubViewInterface = function () {
	};
	
	/**
	 * Returns the string representation of the rendered template
	 *
	 * @returns {String}
	 */
	IrLib.View.SubViewInterface.prototype.toString = function () {
	    throw new IrLib.MissingImplementationError('toString');
	};
	
	
	/**
	 * Created by COD on 25.06.15.
	 */
	
	IrLib.View = IrLib.View || {};
	
	/**
	 * Defines a common interface for Views with variables
	 *
	 * @interface
	 */
	IrLib.View.VariableViewInterface = function () {
	};
	
	
	/**
	 * Sets the variables
	 *
	 * @param {Object|IrLib.Dictionary} data
	 * @returns {IrLib.View.Interface}
	 */
	IrLib.View.VariableViewInterface.prototype.setVariables = function (data) {
	    throw new IrLib.MissingImplementationError('setVariables');
	};
	
	/**
	 * Adds the variable with the given key and value
	 *
	 * @param {String} key
	 * @param {*} value
	 * @returns {IrLib.View.Interface}
	 */
	IrLib.View.VariableViewInterface.prototype.assignVariable = function (key, value) {
	    throw new IrLib.MissingImplementationError('assignVariable');
	};
	
	/**
	 * Returns the currently assigned variables
	 *
	 * @returns {IrLib.Dictionary}
	 */
	IrLib.View.VariableViewInterface.prototype.getVariables = function () {
	    throw new IrLib.MissingImplementationError('getVariables');
	};
	
	
	}());
	
	
	(function() {/*    require('view\/parser\/*');// */
	
	/**
	 * Created by daniel on 05.07.15.
	 */
	IrLib.View.Parser = IrLib.View.Parser || {};
	
	IrLib.View.Parser.BlockType = {
	    STATIC: 'STA',
	    VARIABLE: 'VAR',
	    REPEATING: 'REP',
	    EXPRESSION: 'EXP',
	    CONDITIONAL: 'CON'
	};
	
	
	/**
	 * Created by daniel on 05.07.15.
	 */
	IrLib.View.Parser = IrLib.View.Parser || {};
	
	/**
	 * Definition of a template block
	 *
	 * @param {String} type Block type as one of the BlockType constants
	 * @param {String} content Inner content of the block
	 * @param {Object} [meta] Metadata needed to render this block
	 * @constructor
	 */
	IrLib.View.Parser.Block = function(type, content, meta) {
	    this.type = type;
	    this.content = content;
	    this.meta = meta || {};
	};
	
	
	/**
	 * Created by daniel on 05.07.15.
	 */
	IrLib.View.Parser = IrLib.View.Parser || {};
	
	IrLib.View.Parser.ExpressionType = {
	    UNKNOWN: 'UNK',
	
	    VIEW: 'view',
	
	    REPEATING_START: 'for',
	    REPEATING_END: 'endfor',
	    CONDITIONAL_START: 'if',
	    CONDITIONAL_END: 'endif',
	
	    ELSE: 'else',
	
	    /**
	     * Returns the keyword if it is a valid type, or UNKNOWN otherwise
	     *
	     * @param {String} keyword
	     * @returns {String}
	     */
	    getTypeForKeyword: function(keyword) {
	        return this.isKeyword(keyword) ? keyword : this.UNKNOWN;
	    },
	
	    /**
	     * Returns if the given value is a valid type
	     *
	     * @param {String} keyword
	     * @returns {Boolean}
	     */
	    isKeyword: function(keyword) {
	        if (typeof keyword !== 'string') {
	            return false;
	        }
	        var objectKeys = Object.keys(this),
	            objectKeysLength = objectKeys.length;
	
	
	        for (var i = 0; i < objectKeysLength; i++) {
	            if (this[objectKeys[i]] === keyword) {
	                return true;
	            }
	        }
	        return false;
	    }
	};
	
	
	/**
	 * Created by COD on 25.06.15.
	 */
	
	IrLib.View.Parser = IrLib.View.Parser || {};
	
	/**
	 * Interface for template parsers
	 *
	 * @interface
	 */
	IrLib.View.Parser.Interface = IrLib.CoreObject.extend({
	    /**
	     * Parses the given input string and returns a sequence of Blocks
	     *
	     * @param {String} input
	     * @return {Block[]}
	     */
	    parse: function(input) {
	        throw new IrLib.MissingImplementationError('parse');
	    }
	});
	
	
	/**
	 * Created by COD on 25.06.15.
	 */
	
	/**
	 * @abstract
	 * @type {{}}
	 */
	IrLib.View.Template = IrLib.View.Template || {};
	
	/**
	 * Interface for template parsers
	 *
	 * @interface
	 */
	IrLib.View.Template.ParserInterface = IrLib.CoreObject.extend({
	    /**
	     * Parses the given input string and returns a sequence of Blocks
	     *
	     * @param {String} input
	     * @return {Block[]}
	     */
	    parse: function(input) {
	        throw new IrLib.MissingImplementationError('parse');
	    }
	});
	
	
	/**
	 * Created by COD on 25.06.15.
	 */
	(function() {/*require('view\/parser\/interface');// */
	
	}());
	
	
	
	/**
	 * Template Parser implementation
	 */
	IrLib.View.Parser.Parser = IrLib.View.Parser.Interface.extend({
	    /**
	     * Start of an expression
	     */
	    EXPRESSION_START: '{%',
	
	    /**
	     * End of an expression
	     */
	    EXPRESSION_END: '%}',
	
	    /**
	     * Start character of a block
	     */
	    BLOCK_START_CHAR: '{',
	
	    /**
	     * End character of a block
	     */
	    BLOCK_END_CHAR: '}',
	
	    /**
	     * Number the block start and end characters have to occur to build an un-safe block
	     */
	    BLOCK_DELIMITER_REPEAT_NO_SAFE: 2,
	
	    /**
	     * Number the block start and end characters have to occur to build an safe block
	     */
	    BLOCK_DELIMITER_REPEAT_SAFE: 3,
	
	    /**
	     * Regular expression to match variable blocks
	     */
	    PATTERN_VARIABLE: /^\{{2,3}\s*[a-zA-Z0-9\-_\.]+\s*}{2,3}$/,
	
	    /**
	     * Parses the given input string and returns a sequence of Blocks
	     *
	     * @param {String} input
	     * @return {Block[]}
	     */
	    parse: function (input) {
	        if (typeof input !== 'string') {
	            throw new TypeError('Expected argument "input" to be of type string, ' + (typeof input) + ' given');
	        }
	
	        var tokens = this._tokenize(input);
	        return this._analyze(tokens);
	    },
	
	    /**
	     * Analyzes and classifies the tokens
	     *
	     * @param {String[]} tokens
	     * @return {Block[]}
	     * @private
	     */
	    _analyze: function (tokens) {
	        var Block = IrLib.View.Parser.Block,
	            BlockType = IrLib.View.Parser.BlockType,
	            ExpressionType = IrLib.View.Parser.ExpressionType,
	            _PATTERN_VARIABLE = this.PATTERN_VARIABLE,
	            _BLOCK_START_CHAR = this.BLOCK_START_CHAR,
	            _BLOCK_END_CHAR = this.BLOCK_END_CHAR,
	            _BLOCK_DELIMITER_REPEAT_NO_SAFE = this.BLOCK_DELIMITER_REPEAT_NO_SAFE,
	            _BLOCK_DELIMITER_REPEAT_SAFE = this.BLOCK_DELIMITER_REPEAT_SAFE,
	            _EXPRESSION_START = this.EXPRESSION_START,
	            _EXPRESSION_END = this.EXPRESSION_END,
	            blockStartString = new Array(_BLOCK_DELIMITER_REPEAT_NO_SAFE + 1).join(_BLOCK_START_CHAR),
	            expressionLength = _EXPRESSION_START.length,
	            tokensLength = tokens.length,
	            blocks = [],
	            startsWithBlockStart,
	            currentToken,
	            currentTokenLength,
	            currentContent,
	            i;
	
	        for (i = 0; i < tokensLength; i++) {
	            currentToken = tokens[i];
	            currentTokenLength = currentToken.length;
	
	            // Don't check for brackets for tokens that are too short
	            if (currentTokenLength > 2) {
	                startsWithBlockStart = currentToken.substr(0, 1) === _BLOCK_START_CHAR;
	            } else {
	                startsWithBlockStart = false;
	            }
	
	            if (startsWithBlockStart && currentToken.substr(0, _BLOCK_DELIMITER_REPEAT_NO_SAFE) === blockStartString &&
	                _PATTERN_VARIABLE.test(currentToken)) {
	                currentContent = currentToken.substring(
	                    _BLOCK_DELIMITER_REPEAT_NO_SAFE,
	                    currentTokenLength - _BLOCK_DELIMITER_REPEAT_NO_SAFE
	                );
	
	                var contentFirstCharacterIsBlockStart = currentContent.charAt(0) === _BLOCK_START_CHAR;
	                if (
	                    contentFirstCharacterIsBlockStart &&
	                    (currentContent.charAt(
	                        currentTokenLength - _BLOCK_DELIMITER_REPEAT_NO_SAFE - _BLOCK_DELIMITER_REPEAT_NO_SAFE - 1
	                    ) === _BLOCK_END_CHAR)
	                ) { // Case 1 = safe: {{{varName}}}
	                    blocks[i] = new Block(
	                        BlockType.VARIABLE,
	                        currentToken.substring(_BLOCK_DELIMITER_REPEAT_SAFE, currentTokenLength - _BLOCK_DELIMITER_REPEAT_SAFE).trim(),
	                        {isSafe: true}
	                    );
	                } else if (contentFirstCharacterIsBlockStart) { // Case 2 = invalid: {{varName}
	                    blocks[i] = new Block(BlockType.STATIC, currentToken);
	                } else { // Case 3 = not safe: {{varName}}
	                    blocks[i] = new Block(
	                        BlockType.VARIABLE,
	                        currentContent.trim(),
	                        {isSafe: false}
	                    );
	                }
	
	            } else if (startsWithBlockStart &&
	                currentToken.substr(0, expressionLength) === _EXPRESSION_START &&
	                currentToken.substr(currentTokenLength - expressionLength) == _EXPRESSION_END
	            ) {
	                var expressionType, currentContentTrimmed;
	                currentContent = currentToken.substring(expressionLength, currentTokenLength - expressionLength);
	                currentContentTrimmed = currentContent.trim();
	                if (ExpressionType.isKeyword(currentContentTrimmed)) {
	                    expressionType = currentContentTrimmed;
	                } else if (ExpressionType.isKeyword(currentContentTrimmed.substring(0, currentContentTrimmed.indexOf(' ')))) {
	                    expressionType = currentContentTrimmed.substring(0, currentContentTrimmed.indexOf(' '));
	                } else {
	                    expressionType = ExpressionType.UNKNOWN;
	                }
	                blocks[i] = new Block(BlockType.EXPRESSION, currentContentTrimmed, {
	                    expressionType: expressionType
	                });
	
	
	                /* handle other cases */
	            } else {
	                blocks[i] = new Block(BlockType.STATIC, currentToken);
	            }
	
	            //console.log('TYPE:', blocks[i].type, blocks[i].content);
	        }
	        return blocks;
	    },
	
	    /**
	     * Splits the input into an array of tokens
	     *
	     * @param {String} input
	     * @returns {String[]}
	     * @private
	     */
	    _tokenize: function (input) {
	        var inputLength = input.length,
	            _BLOCK_START_CHAR = this.BLOCK_START_CHAR,
	            _BLOCK_END_CHAR = this.BLOCK_END_CHAR,
	            tokens = [],
	            startCursor = 0,
	            endCursor = 0,
	            currentBlockIndex = 0,
	            i = 0,
	            nextStartCursor,
	            content;
	
	        do {
	            // If the first character is a bracket look for the ending one
	            if (input.charAt(startCursor) === _BLOCK_START_CHAR) {
	                endCursor = input.indexOf(
	                    _BLOCK_END_CHAR,
	                    startCursor
	                );
	                while (input.charAt(endCursor + 1) === _BLOCK_END_CHAR && endCursor < inputLength) {
	                    endCursor++;
	                }
	
	                nextStartCursor = endCursor + 1;
	            } else { // Look for the beginning of the next block
	                nextStartCursor = input.indexOf(_BLOCK_START_CHAR, startCursor + 1);
	                if (nextStartCursor === -1) {
	                    endCursor = inputLength;
	                } else {
	                    endCursor = nextStartCursor - 1;
	                }
	            }
	
	            content = input.substr(startCursor, endCursor - startCursor + 1);
	
	            tokens[currentBlockIndex++] = content;
	
	            if (++i > 100000) {
	                throw new Error('Infinite loop?');
	            }
	            startCursor = nextStartCursor;
	        } while (startCursor !== -1);
	        return tokens;
	    }
	});
	
	
	}());
	
	
	
	})( false? this.IrLib = {}: exports);
	
	// require('additional files')
	


/***/ },
/* 2 */
/*!****************************!*\
  !*** ./JavaScripts/App.js ***!
  \****************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by daniel on 22.10.16.
	 */
	var App = function () {
	    function App() {
	        _classCallCheck(this, App);
	
	        /** @type Controller */
	        this.controller = {};
	    }
	
	    _createClass(App, [{
	        key: 'run',
	        value: function run() {
	            this.controller.addEventListeners();
	            this.serviceScanner.findServices(function (serviceUrl) {
	                console.log(serviceUrl);
	            });
	        }
	    }], [{
	        key: 'needs',
	        value: function needs() {
	            return ['controller', 'serviceScanner'];
	        }
	    }]);
	
	    return App;
	}();
	
	exports.default = App;

/***/ },
/* 3 */
/*!***********************************!*\
  !*** ./JavaScripts/Controller.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by daniel on 22.10.16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _underscore = __webpack_require__(/*! ./../~/underscore/underscore */ 4);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _RemoteService = __webpack_require__(/*! ./RemoteService */ 5);
	
	var _RemoteService2 = _interopRequireDefault(_RemoteService);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Controller = function () {
	    function Controller() {
	        _classCallCheck(this, Controller);
	
	        this.controls = _underscore2.default.map(document.querySelectorAll('[data-action]'));
	
	        this.keyMap = {
	            "play-pause": "space",
	            "forward": "right",
	            "back": "left"
	        };
	    }
	
	    _createClass(Controller, [{
	        key: 'addEventListeners',
	        value: function addEventListeners() {
	            var _click = this.click.bind(this);
	
	            this.controls.forEach(function (control) {
	                control.addEventListener('click', function (event) {
	                    _click(event, this);
	                });
	            });
	        }
	    }, {
	        key: 'click',
	        value: function click(event, element) {
	            var _arguments = arguments;
	
	            var action = element.dataset.action;
	            _RemoteService2.default.send(this.keyMap[action], function () {
	                return console.log(_arguments);
	            }, function (request) {
	                var messageOutlet = document.querySelector('[data-outlet="message"]');
	                if (messageOutlet) {
	                    messageOutlet.innerText = 'ERROR: ' + request.statusText;
	                }
	            });
	        }
	    }]);
	
	    return Controller;
	}();
	
	exports.default = Controller;

/***/ },
/* 4 */
/*!************************************!*\
  !*** ./~/underscore/underscore.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;
	
	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.8.3';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };
	
	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };
	
	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };
	
	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };
	
	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }
	
	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };
	
	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);
	
	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }
	
	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
	
	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }
	
	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);
	
	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);
	
	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);
	
	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };
	
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;
	
	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = property;
	
	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
	
	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 5 */
/*!**************************************!*\
  !*** ./JavaScripts/RemoteService.js ***!
  \**************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by daniel on 22.10.16.
	 */
	
	var RemoteService = function () {
	    function RemoteService() {
	        _classCallCheck(this, RemoteService);
	    }
	
	    _createClass(RemoteService, null, [{
	        key: 'send',
	
	        /**
	         *
	         * @param {string} key
	         * @param {function} [onSuccess]
	         * @param {function} [onError]
	         */
	        value: function send(key, onSuccess, onError) {
	            RemoteService._request('/api/' + key + '', 'GET', function (data) {
	                console.log(data);
	                if (onSuccess) {
	                    onSuccess(data, request);
	                }
	            }, function (request) {
	                console.log(request);
	                if (onSuccess) {
	                    onError(request);
	                }
	            });
	        }
	
	        /**
	         *
	         * @param {string} url
	         * @param {string} method
	         * @param {function} success
	         * @param {function} error
	         * @private
	         */
	
	    }, {
	        key: '_request',
	        value: function _request(url, method, success, error) {
	            var request = new XMLHttpRequest();
	            request.open(method, url, true);
	            request.setRequestHeader('Content-Type', 'application/javascript');
	
	            request.onload = function () {
	                if (request.status >= 200 && request.status < 400) {
	                    try {
	                        var data = JSON.parse(request.responseText);
	                        success(data, request);
	                    } catch (exception) {
	                        error(request, {
	                            "exception": exception
	                        });
	                    }
	                } else {
	                    error(request);
	                }
	            };
	
	            request.onerror = function () {
	                console.log('onerror', arguments);
	
	                error(request);
	            };
	
	            request.send();
	        }
	    }]);
	
	    return RemoteService;
	}();
	
	exports.default = RemoteService;

/***/ },
/* 6 */
/*!***************************************!*\
  !*** ./JavaScripts/ServiceScanner.js ***!
  \***************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by daniel on 06.12.16.
	 */
	
	var EF = function EF() {};
	
	var ServiceScanner = function () {
	    function ServiceScanner() {
	        _classCallCheck(this, ServiceScanner);
	    }
	
	    _createClass(ServiceScanner, [{
	        key: 'findServices',
	        value: function findServices(serviceAvailable) {
	            var location = window && window.location;
	            var hostname = location.hostname;
	
	            if (/^[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}$/.test(hostname)) {
	                var ipParts = hostname.split('.');
	
	                var lastIpPart = ipParts.pop();
	
	                // this._testIps(serviceAvailable, ipParts, ServiceScanner._range(20, 30), location.port, location.protocol);
	                this._testIps(serviceAvailable, ipParts, [lastIpPart], location.port, location.protocol);
	                // this._testIps(serviceAvailable, ipParts, ServiceScanner._range(1, 255), location.port, location.protocol);
	            }
	        }
	    }, {
	        key: '_testIps',
	        value: function _testIps(serviceAvailable, ipParts, range, port, scheme) {
	            range.forEach(function (ip) {
	                var ipElements = ipParts.slice();
	                ipElements.push(ip);
	
	                this._testIp(serviceAvailable, ipElements, port, scheme);
	                this._testIp(serviceAvailable, ipElements, '8181', scheme);
	            }.bind(this));
	        }
	    }, {
	        key: '_testIp',
	        value: function _testIp(serviceAvailable, ipParts, port, scheme) {
	            var url = scheme + '//' + ipParts.join('.') + ':' + port + '/info';
	
	            this._ajax('GET', url, serviceAvailable);
	        }
	    }, {
	        key: '_ajax',
	        value: function _ajax(method, url) {
	            var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EF;
	            var error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : EF;
	
	            var request = new XMLHttpRequest();
	            request.open(method, url, true);
	            request.setRequestHeader('Content-Type', 'application/javascript');
	
	            request.onload = function () {
	                if (request.status >= 200 && request.status < 400) {
	                    try {
	                        var data = JSON.parse(request.responseText);
	                        success(url, data, request);
	                    } catch (exception) {
	                        error(request, {
	                            "exception": exception
	                        });
	                    }
	                } else {
	                    error(request);
	                }
	            };
	
	            request.onerror = function () {
	                error(request);
	            };
	
	            request.send();
	
	            setTimeout(function () {
	                request.abort();
	                error(request);
	            }, 4000);
	        }
	    }], [{
	        key: '_range',
	        value: function _range(start, stop, step) {
	            if (typeof stop == 'undefined') {
	                // one param defined
	                stop = start;
	                start = 0;
	            }
	
	            if (typeof step == 'undefined') {
	                step = 1;
	            }
	
	            if (step > 0 && start >= stop || step < 0 && start <= stop) {
	                return [];
	            }
	
	            var result = [];
	            for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
	                result.push(i);
	            }
	
	            return result;
	        }
	    }]);
	
	    return ServiceScanner;
	}();
	
	exports.default = ServiceScanner;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map