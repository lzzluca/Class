/**
 * function Implement
 * This function implements the Implement keyword; here inheritance is by copying members on the prototype.
 * The this object is assumed to be a function or its prototype in here.
 * There is no limit to the number of classes implemented.
 * @param {Function || Object} superObj The class || the class's prototype to be implemented
 *
 * @example:
 * var sup = function(){},
 *     sub = function(){};
 * sup.prototype.iAmAMethod = function(){};
 * sub = Implement.apply(sub, [sup]);
 * (new sub()).constructor == sub; // false
 * (new sub()).constructor == sup; // false
 * (new sub()) instanceof sub; // false
 * (new sub()) instanceof sup; // false
 * typeof sub.iAmAMethod // "function"
*/


(function (host) {
  'use strict';

  var XD = host.InheritanceApi;

  var Implement = function (superObj) {

    if ( typeof superObj != "object" ) {
      superObj = (superObj && superObj.prototype) || {};
    }
    else if ( typeof superObj == null ) {
      superObj = {};
    }

    var this_proto = this.prototype || this;

    for (var prop in superObj) {
      if ( typeof this_proto[prop] == "undefined" ) {
        this_proto[prop] = superObj[prop];
      }
      else if ( typeof this_proto[prop] == "object" && typeof superObj[prop] == "object" ) {
        // FIXME this is wrong: if the object is a DOM element, you shouldn't clone it!
        XD.Utils.jQuery_extend(true, this_proto[prop], superObj[prop]);
      }
    }

  };

  XD.Implement = Implement;
})(window);
