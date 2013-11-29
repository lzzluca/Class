/**
 * function Extend
 * This class implements the Extend keyword: here prototypal inheritance happens.
 * The this object is assumed to be a function in here.
 * A class can extend only one other class.
 * @param {Function || Object} superObj The super class || the super class's prototype
 *
 * @example:
 * var sup = function(){},
 *     sub = function(){};
 * sub = Extend.apply(sub, [sup]);
 * (new sub()).constructor == sub; // false
 * (new sub()).constructor == sup; // true
 * (new sub()) instanceof sub; // true
 * (new sub()) instanceof sup; // true
 */

(function(host) {
  'use strict';

  var XD = host.InheritanceApi;

  var Extend = function(superObj) {

    if ( typeof superObj === "function" ) {
      superObj = (superObj && superObj.prototype) || {};
    }
    else if ( typeof superObj === null || typeof superObj !== "object" ) {
      superObj = {};
    }

    // prototypal inheritance: this is important to inherit the super's constructor.

    var prototype = XD.Utils.Prototype.clone(superObj);

    // properties from the sub prototype

    for (var prop in this.prototype) {

        // objects merging

      if ( typeof prototype[prop] == "object" && typeof this.prototype[prop] == "object" ) {
        XD.Utils.jQuery_extend(true, prototype[prop], this.prototype[prop]);
      }
      else {
        prototype[prop] = this.prototype[prop];
      }

    }

    // here the properties as function are wrapped to set the caller property (when the sub methods is overriding the super's)

    var val;
    for (var prop in superObj) {

      val = prototype[prop];

      if ( typeof val === "function" && typeof this.prototype[prop] === "function" ) {
                prototype[prop] = (function(originalFn, lprop) {
                    return function () {
                        var ret;
                        this.$caller = lprop;
                        ret = originalFn.apply( this, arguments );
                        this.$caller = undefined;
                        return ret;
                    }
                })( val, prop );
      }
    }
  
    prototype.$parent = superObj.constructor;

    this.prototype = prototype;
  };

  XD.Extend = Extend;

})(window);
