(function (host) {
  'use strict';

    /*
     * @static @class InheritanceApi
     * Container of inheritance utilities: Extend, Implement and Class
    */

    var InheritanceApi = {

        /*
         * @static @class Utils 
         * Container of utilities needed in all InheritanceApi's modules
        */

        Utils: {

            /*
             * @static @class Prototype
             * Basic Prototype utilities
             */

            Prototype: {

                /*
                 * name: clone
                 * This function clone an object's prototype avoiding the call to its constructor
                 * @param {Object} obj The target prototype
                 * @returns {Object} The clone
                 */
                     
                clone: function(obj) {
                    if( !(obj instanceof Object) ) return obj;
                    var clone = function(){};
                    clone.prototype = obj;
                    return new clone();
                }
            },

            /*
            * name: clone
            * Nice object cloning function from:  
            * http://stackoverflow.com/questions/728360/copying-an-object-in-javascript/728694#728694
            * Cloning function
            * @param {Object} The object to clone
            * @return The clone
            */

            clone: function(obj) {
                var copy;

                switch( typeof obj ) {
                    case "object":
                           if(obj == null) {
                                copy = null;    
                            }
                            else if(obj instanceof Date) { // handle Date
                                copy = new Date();
                                copy.setTime( obj.getTime() );
                            }
                            else if (obj instanceof Array) { // handle Array
                                copy = [];
                                for (var i = 0, len = obj.length; i < len; ++i) {
                                    copy[i] = this.clone( obj[i] );
                                }
                            }
                            else {
                                copy = {};
                                for (var attr in obj) {
                                    /*TODO:if (obj.hasOwnProperty(attr))*/ copy[attr] = this.clone( obj[attr] );
                                }
                            }
                            break;
                    case "boolean": // handle immutable type and default (for example function)
                    case "string":
                    case "number": 
                    default:
                            copy = obj;
                            break;
                }

                return copy;
            },

            /*
            * name: jQuery_extend
            * The extend function from jQuery 1.7.1
            * More informations here: http://api.jquery.com/jQuery.extend/
            */

            jQuery_extend: function() {
                var options, name, src, copy, copyIsArray, clone,
                    target = arguments[0] || {},
                    i = 1,
                    length = arguments.length,
                    deep = false;

                // Handle a deep copy situation
                if ( typeof target === "boolean" ) {
                    deep = target;
                    target = arguments[1] || {};
                    // skip the boolean and the target
                    i = 2;
                }

                // Handle case when target is a string or something (possible in deep copy)
                if ( typeof target !== "object" && typeof target != "function" ) {
                    target = {};
                }

                // extend jQuery itself if only one argument is passed
                if ( length === i ) {
                    target = this;
                    --i;
                }

                for ( ; i < length; i++ ) {
                    // Only deal with non-null/undefined values
                    if ( (options = arguments[ i ]) != null ) {
                        // Extend the base object
                        for ( name in options ) {
                            src = target[ name ];
                            copy = options[ name ];

                            // Prevent never-ending loop
                            if ( target === copy ) {
                                continue;
                            }

                            // Recurse if we're merging plain objects or arrays
                            if ( deep && copy && ( typeof copy == "object") || (copyIsArray = (copy instanceof Array) ) ) {
                                if ( copyIsArray ) {
                                    copyIsArray = false;
                                    clone = src && (src instanceof Array) ? src : [];

                                } else {
                                    clone = src && (typeof src == "object") ? src : {};
                                }

                                // Never move original objects, clone them
                                target[ name ] = this.jQuery_extend( deep, clone, copy );

                            // Don't bring in undefined values
                            } else if ( copy !== undefined ) {
                                target[ name ] = copy;
                            }
                        }
                    }
                }

                // Return the modified object
                return target;
            }
        },
        Extend: null,
        Implement: null,
        Class: null
    };

    host.InheritanceApi = InheritanceApi;

})(window);
