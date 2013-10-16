/**
 * Application (Sandbox Pattern)
 * @param {(array|string)} mod
 * @param {function} cb
 * @returns {Application}
 * @constructor
 */
var Application = function (mod, cb) {
    'use strict';

    // Transform arguments into array.
    var args = Array.prototype.slice.call(arguments);

    // Getting the last argument, the callback function.
    var callback = args.pop();

    // Modules are passed as an array or as separated parameters.
    var modules = (args[0] && typeof args[0] === 'string') ? args : args[0];

    var module, len, i;

    // Assure calling this function as a constructor.
    if (!(this instanceof Application)) {
        return new Application(modules, callback);
    }

    // Add modules listed in "static" property "Application.module".
    // Passing no "modules" argument or passing "*" means "Load all modules".
    if (!modules || modules[0] === '*') {
        modules = [];

        for (module in Application.modules) {
            if (Application.modules.hasOwnProperty(module)) {
                modules.push(module);
            }
        }
    }

    // Initialise the required modules.
    for (i = 0, len = modules.length; i < len; i += 1) {
        Application.modules[modules[i]](this);
    }

    // Properties
    this.name = 'not specified';
    this.version = 'not specified';

    // Invoking the callback function.
    callback(this);
};

// Augmenting the prototype
/**
 * Prints this.launchMessage to browser's console.
 * @public
 * @returns {string}
 */
Application.prototype.launch = function () {
    'use strict';

    console.log(
        '3 - 2 - 1 ... %s, %s, launched sucessfully!',
        this.name,
        this.version
    );
};

/**
 * Contains the application modules.
 * @private
 * @type {object}
 */
Application.modules = {};
