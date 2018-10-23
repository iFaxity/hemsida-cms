// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../../node_modules/vue/dist/vue.runtime.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Vue.js v2.5.17
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // these helpers produces better vm code in JS engines due to their
// explicitness and function inlining

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value e.g. [object Object]
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if a attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether the object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/**
 * Return same value
 */


var identity = function (_) {
  return _;
};
/**
 * Generate a static keys string from compiler modules.
 */

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = /[^\w.$]/;

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = '__proto__' in {}; // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge; // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if ("development" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.


Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }

  Dep.target = _target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;

  if (!getter && arguments.length === 2) {
    val = obj[key];
  }

  var setter = property && property.set;
  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if ("development" !== 'production' && customSetter) {
        customSetter();
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if ("development" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if ("development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characters and the hyphen, ' + 'and must start with a letter.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if ("development" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];

      if (typeof def === 'function') {
        dirs[key] = {
          bind: def,
          update: def
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if ("development" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;

  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }

  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if ("development" !== 'production' && // skip validation for weex recycle-list child component props
  !(false && isObject(value) && '@binding' in value)) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn("Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ') + ", got " + toRawType(value) + ".", vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}
/*  */


function handleError(err, vm, info) {
  if (vm) {
    var cur = vm;

    while (cur = cur.$parent) {
      var hooks = cur.$options.errorCaptured;

      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;

            if (capture) {
              return;
            }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }

  globalHandleError(err, vm, info);
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("development" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */

/* globals MessageChannel */


var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).


var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false; // Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.

/* istanbul ignore if */

if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) || // PhantomJS
MessageChannel.toString() === '[object MessageChannelConstructor]')) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;

  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
} // Determine microtask defer implementation.

/* istanbul ignore next, $flow-disable-line */


if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  microTimerFunc = function () {
    p.then(flushCallbacks); // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}
/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */


function withMacroTask(fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res;
  });
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;

    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if ("development" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';

      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if ("development" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments);
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, vm) {
  var name, def, cur, old, event;

  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */

    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }

      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if ("development" !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor, context) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender();
      }
    });
    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject("development" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    }

    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;

      while (i$1--) {
        cb = cbs[i$1];

        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break;
        }
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if ("development" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);

      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, "event handler for \"" + event + "\"");
        }
      }
    }

    return vm;
  };
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  var slots = {};

  if (!children) {
    return slots;
  }

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}

function resolveScopedSlots(fns, // see flow/vnode
res) {
  res = res || {};

  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }

  return res;
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;

    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }

    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      , vm.$options._parentElm, vm.$options._refElm); // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)

      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    activeInstance = prevActiveInstance; // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if ("development" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, null, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("development" !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren


  var hasChildren = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  parentVnode.data.scopedSlots || // has new scoped slots
  vm.$scopedSlots !== emptyObject // has old scoped slots
  );
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("development" !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, hook + " hook");
      }
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if ("development" !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$1 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$1; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "development" !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = function () {};

      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var this$1 = this;
  var i = this.deps.length;

  while (i--) {
    var dep = this$1.deps[i];

    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var this$1 = this;
  var i = this.deps.length;

  while (i--) {
    this$1.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if ("development" !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if ("development" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("development" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
    sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
  }

  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if ("development" !== 'production') {
      if (methods[key] == null) {
        warn("Method \"" + key + "\" has an undefined value in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if ("development" !== 'production') {
    dataDef.set = function (newData) {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      cb.call(vm, watcher.value);
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("development" !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject).filter(function (key) {
      /* istanbul ignore next */
      return Object.getOwnPropertyDescriptor(inject, key).enumerable;
    }) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("development" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);

    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }

  if (isDef(ret)) {
    ret._isVList = true;
  }

  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name]; // warn duplicate slot usage

    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn("Duplicate presence of slot \"" + name + "\" found in the same render tree " + "- this will likely cause render errors.", this);
      }

      slotNodes._rendered = true;
    }

    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    return resolveSlots(children, parent);
  }; // support for compiled functional template


  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */
// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.
// Updates the state of the component to weex native render engine.

/*  */
// https://github.com/Hanks10100/weex-native-directive/tree/master/component
// listening on native callback

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating, parentElm, refElm) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if ("development" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory); // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component

  /* istanbul ignore if */

  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent, // activeInstance in lifecycle state
parentElm, refElm) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});

  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if ("development" !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode; // reset _rendered flag on slots for duplicate slot check

    if ("development" !== 'production') {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ("development" !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if ("development" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }

  return modified;
}

function dedupe(latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];

    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }

    return res;
  } else {
    return latest;
  }
}

function Vue(options) {
  if ("development" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
  /*  */

};

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if ("development" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;
  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.5.17';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove() {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove.listeners = listeners;
    return remove;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if ("development" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        , parentElm, refElm);
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("development" !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if ("development" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if ("development" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("development" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm$1, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
  /*  */

};

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
  /*  */

  /*  */
  // add a raw attr (use this in preTransforms)
  // note: this only removes the attr from the Array (attrsList) so that it
  // doesn't get processed by processAttrs.
  // By default it does NOT remove it from the map (attrsMap) because the map is
  // needed during codegen.

  /*  */

  /**
   * Cross-platform code generation for component v-model
   */

  /**
   * Cross-platform codegen helper for generating v-model value assignment code.
   */

  /*  */
  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.

};
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.

function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler(handler, event, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
}

function add$1(event, handler, once$$1, capture, passive) {
  handler = withMacroTask(handler);

  if (once$$1) {
    handler = createOnceHandler(handler, event, capture);
  }

  target$1.addEventListener(event, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(event, handler, capture, _target) {
  (_target || target$1).removeEventListener(event, handler._withTask || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
  /*  */

};

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false;
    }

    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
  /*  */

};
var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
  /*  */

  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */

};

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def) {
  if (!def) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def === 'object') {
    var res = {};

    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }

    extend(res, def);
    return res;
  } else if (typeof def === 'string') {
    return autoCssTransition(def);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}

function toMs(s) {
  return Number(s.slice(0, -1)) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
  /*  */
  // Provides transition support for a single element/component.
  // supports transition mode (out-in / in-out)

};
var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(function (c) {
      return c.tag || isAsyncPlaceholder(c);
    });
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(function (d) {
      return d.name === 'show';
    })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
  /*  */
  // Provides transition support for list items.
  // supports move transitions using the FLIP technique.
  // Because the vdom's children update algorithm is "unstable" - i.e.
  // it doesn't guarantee the relative positioning of removed elements,
  // we force transition-group to update its children into two passes:
  // in the first pass, we remove all nodes that need to be removed,
  // triggering their leaving transition; in the second pass, we insert/move
  // into the final desired state. This way in the second pass removed
  // nodes will remain where they should be.

};
var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("development" !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  beforeUpdate: function beforeUpdate() {
    // force removing pass
    this.__patch__(this._vnode, this.kept, false, // hydrating
    true // removeOnly (!important, avoids unnecessary moves)
    );

    this._vnode = this.kept;
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
  /*  */
  // install platform specific utils

};
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("development" !== 'production' && "development" !== 'test' && isChrome) {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if ("development" !== 'production' && "development" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
/*  */


var _default = Vue;
exports.default = _default;
},{}],"../../node_modules/vue-router/dist/vue-router.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */

/*  */
function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-router] " + message);
  }
}

function warn(condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn("[vue-router] " + message);
  }
}

function isError(err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1;
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render(_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;
    data.routerView = true; // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots

    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {}); // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.

    var depth = 0;
    var inactive = false;

    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }

      if (parent._inactive) {
        inactive = true;
      }

      parent = parent.$parent;
    }

    data.routerViewDepth = depth; // render previous view if the tree is inactive and kept-alive

    if (inactive) {
      return h(cache[name], data, children);
    }

    var matched = route.matched[depth]; // render empty node if no matched route

    if (!matched) {
      cache[name] = null;
      return h();
    }

    var component = cache[name] = matched.components[name]; // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks

    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];

      if (val && current !== vm || !val && current === vm) {
        matched.instances[name] = val;
      }
    } // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;

    (data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    }; // resolve props


    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);

    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass); // pass non-declared props as attrs

      var attrs = data.attrs = data.attrs || {};

      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children);
  }
};

function resolveProps(route, config) {
  switch (typeof config) {
    case 'undefined':
      return;

    case 'object':
      return config;

    case 'function':
      return config(route);

    case 'boolean':
      return config ? route.params : undefined;

    default:
      if ("development" !== 'production') {
        warn(false, "props in \"" + route.path + "\" is a " + typeof config + ", " + "expecting an object, function or boolean.");
      }

  }
}

function extend(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }

  return to;
}
/*  */


var encodeReserveRE = /[!'()*]/g;

var encodeReserveReplacer = function (c) {
  return '%' + c.charCodeAt(0).toString(16);
};

var commaRE = /%2C/g; // fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas

var encode = function (str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent;

function resolveQuery(query, extraQuery, _parseQuery) {
  if (extraQuery === void 0) extraQuery = {};
  var parse = _parseQuery || parseQuery;
  var parsedQuery;

  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }

  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }

  return parsedQuery;
}

function parseQuery(query) {
  var res = {};
  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });
  return res;
}

function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }

        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?" + res : '';
}
/*  */


var trailingSlashRE = /\/?$/;

function createRoute(record, location, redirectedFrom, router) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;
  var query = location.query || {};

  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || record && record.name,
    meta: record && record.meta || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };

  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }

  return Object.freeze(route);
}

function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (value && typeof value === 'object') {
    var res = {};

    for (var key in value) {
      res[key] = clone(value[key]);
    }

    return res;
  } else {
    return value;
  }
} // the starting route that represents the initial state


var START = createRoute(null, {
  path: '/'
});

function formatMatch(record) {
  var res = [];

  while (record) {
    res.unshift(record);
    record = record.parent;
  }

  return res;
}

function getFullPath(ref, _stringifyQuery) {
  var path = ref.path;
  var query = ref.query;
  if (query === void 0) query = {};
  var hash = ref.hash;
  if (hash === void 0) hash = '';
  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash;
}

function isSameRoute(a, b) {
  if (b === START) {
    return a === b;
  } else if (!b) {
    return false;
  } else if (a.path && b.path) {
    return a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') && a.hash === b.hash && isObjectEqual(a.query, b.query);
  } else if (a.name && b.name) {
    return a.name === b.name && a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params);
  } else {
    return false;
  }
}

function isObjectEqual(a, b) {
  if (a === void 0) a = {};
  if (b === void 0) b = {}; // handle null value #1566

  if (!a || !b) {
    return a === b;
  }

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key]; // check nested equality

    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal);
    }

    return String(aVal) === String(bVal);
  });
}

function isIncludedRoute(current, target) {
  return current.path.replace(trailingSlashRE, '/').indexOf(target.path.replace(trailingSlashRE, '/')) === 0 && (!target.hash || current.hash === target.hash) && queryIncludes(current.query, target.query);
}

function queryIncludes(current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false;
    }
  }

  return true;
}
/*  */
// work around weird flow bug


var toTypes = [String, Object];
var eventTypes = [String, Array];
var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render(h) {
    var this$1 = this;
    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;
    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass; // Support global empty active class

    var activeClassFallback = globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null ? 'router-link-exact-active' : globalExactActiveClass;
    var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
    var compareTarget = location.path ? createRoute(null, location, null, router) : route;
    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = {
      click: guardEvent
    };

    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = {
        href: href
      };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);

      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default);
  }
};

function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return;
  } // don't redirect when preventDefault called


  if (e.defaultPrevented) {
    return;
  } // don't redirect on right click


  if (e.button !== undefined && e.button !== 0) {
    return;
  } // don't redirect if `target="_blank"`


  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');

    if (/\b_blank\b/i.test(target)) {
      return;
    }
  } // this may be a Weex event which doesn't have this method


  if (e.preventDefault) {
    e.preventDefault();
  }

  return true;
}

function findAnchor(children) {
  if (children) {
    var child;

    for (var i = 0; i < children.length; i++) {
      child = children[i];

      if (child.tag === 'a') {
        return child;
      }

      if (child.children && (child = findAnchor(child.children))) {
        return child;
      }
    }
  }
}

var _Vue;

function install(Vue) {
  if (install.installed && _Vue === Vue) {
    return;
  }

  install.installed = true;
  _Vue = Vue;

  var isDef = function (v) {
    return v !== undefined;
  };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;

    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;

        this._router.init(this);

        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this;
      }

      registerInstance(this, this);
    },
    destroyed: function destroyed() {
      registerInstance(this);
    }
  });
  Object.defineProperty(Vue.prototype, '$router', {
    get: function get() {
      return this._routerRoot._router;
    }
  });
  Object.defineProperty(Vue.prototype, '$route', {
    get: function get() {
      return this._routerRoot._route;
    }
  });
  Vue.component('router-view', View);
  Vue.component('router-link', Link);
  var strats = Vue.config.optionMergeStrategies; // use the same hook merging strategy for route hooks

  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}
/*  */


var inBrowser = typeof window !== 'undefined';
/*  */

function resolvePath(relative, base, append) {
  var firstChar = relative.charAt(0);

  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  var stack = base.split('/'); // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)

  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  } // resolve relative path


  var segments = relative.replace(/^\//, '').split('/');

  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];

    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  } // ensure leading slash


  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}

function parsePath(path) {
  var hash = '';
  var query = '';
  var hashIndex = path.indexOf('#');

  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');

  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  };
}

function cleanPath(path) {
  return path.replace(/\/\//g, '/');
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};
/**
 * Expose `pathToRegexp`.
 */


var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */

var PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */

function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length; // Ignore already escaped sequences.

    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7]; // Push the current path onto the tokens.

    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  } // Match any characters still remaining.


  if (index < str.length) {
    path += str.substr(index);
  } // If the path exists, push it onto the end.


  if (path) {
    tokens.push(path);
  }

  return tokens;
}
/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */


function compile(str, options) {
  return tokensToFunction(parse(str, options));
}
/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */


function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */


function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Expose a method for transforming tokens into the path function.
 */


function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length); // Compile all the patterns before compilation.

  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}
/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */


function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */


function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}
/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */


function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */


function flags(options) {
  return options.sensitive ? '' : 'i';
}
/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */


function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}
/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
  return attachKeys(regexp, keys);
}
/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */


function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};
  var strict = options.strict;
  var end = options.end !== false;
  var route = ''; // Iterate over the tokens and create our regexp string.

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';
      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter; // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".

  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */


function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path,
    /** @type {!Array} */
    keys);
  }

  if (isarray(path)) {
    return arrayToRegexp(
    /** @type {!Array} */
    path,
    /** @type {!Array} */
    keys, options);
  }

  return stringToRegexp(
  /** @type {string} */
  path,
  /** @type {!Array} */
  keys, options);
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;
/*  */
// $flow-disable-line

var regexpCompileCache = Object.create(null);

function fillParams(path, params, routeMsg) {
  try {
    var filler = regexpCompileCache[path] || (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, {
      pretty: true
    });
  } catch (e) {
    if ("development" !== 'production') {
      warn(false, "missing param for " + routeMsg + ": " + e.message);
    }

    return '';
  }
}
/*  */


function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || []; // $flow-disable-line

  var pathMap = oldPathMap || Object.create(null); // $flow-disable-line

  var nameMap = oldNameMap || Object.create(null);
  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  }); // ensure wildcard routes are always at the end

  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  };
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  var path = route.path;
  var name = route.name;

  if ("development" !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(typeof route.component !== 'string', "route config \"component\" for path: " + String(path || name) + " cannot be a " + "string id. Use an actual component instead.");
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || {
      default: route.component
    },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.components ? route.props : {
      default: route.props
    }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if ("development" !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) {
        return /^\/?$/.test(child.path);
      })) {
        warn(false, "Named Route '" + route.name + "' has a default child route. " + "When navigating to this named route (:to=\"{name: '" + route.name + "'\"), " + "the default child route will not be rendered. Remove the name from " + "this route and use the name of the default child route for named " + "links instead.");
      }
    }

    route.children.forEach(function (child) {
      var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(false, "Duplicate named routes definition: " + "{ name: \"" + name + "\", path: \"" + record.path + "\" }");
    }
  }
}

function compileRouteRegex(path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);

  if ("development" !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], "Duplicate param keys in route with path: \"" + path + "\"");
      keys[key.name] = true;
    });
  }

  return regex;
}

function normalizePath(path, parent, strict) {
  if (!strict) {
    path = path.replace(/\/$/, '');
  }

  if (path[0] === '/') {
    return path;
  }

  if (parent == null) {
    return path;
  }

  return cleanPath(parent.path + "/" + path);
}
/*  */


function normalizeLocation(raw, current, append, router) {
  var next = typeof raw === 'string' ? {
    path: raw
  } : raw; // named target

  if (next.name || next._normalized) {
    return next;
  } // relative params


  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);

    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, "path " + current.path);
    } else if ("development" !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }

    return next;
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = current && current.path || '/';
  var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;
  var query = resolveQuery(parsedPath.query, next.query, router && router.options.parseQuery);
  var hash = next.hash || parsedPath.hash;

  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  };
}

function assign(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }

  return a;
}
/*  */


function createMatcher(routes, router) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match(raw, currentRoute, redirectedFrom) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];

      if ("development" !== 'production') {
        warn(record, "Route with name '" + name + "' does not exist");
      }

      if (!record) {
        return _createRoute(null, location);
      }

      var paramNames = record.regex.keys.filter(function (key) {
        return !key.optional;
      }).map(function (key) {
        return key.name;
      });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, "named route \"" + name + "\"");
        return _createRoute(record, location, redirectedFrom);
      }
    } else if (location.path) {
      location.params = {};

      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];

        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom);
        }
      }
    } // no match


    return _createRoute(null, location);
  }

  function redirect(record, location) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function' ? originalRedirect(createRoute(record, location, null, router)) : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = {
        path: redirect
      };
    }

    if (!redirect || typeof redirect !== 'object') {
      if ("development" !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }

      return _createRoute(null, location);
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];

      if ("development" !== 'production') {
        assert(targetRecord, "redirect failed: named route \"" + name + "\" not found.");
      }

      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location);
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record); // 2. resolve params

      var resolvedPath = fillParams(rawPath, params, "redirect route with path \"" + rawPath + "\""); // 3. rematch with existing query and hash

      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location);
    } else {
      if ("development" !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }

      return _createRoute(null, location);
    }
  }

  function alias(record, location, matchAs) {
    var aliasedPath = fillParams(matchAs, location.params, "aliased route with path \"" + matchAs + "\"");
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });

    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location);
    }

    return _createRoute(null, location);
  }

  function _createRoute(record, location, redirectedFrom) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location);
    }

    if (record && record.matchAs) {
      return alias(record, location, record.matchAs);
    }

    return createRoute(record, location, redirectedFrom, router);
  }

  return {
    match: match,
    addRoutes: addRoutes
  };
}

function matchRoute(regex, path, params) {
  var m = path.match(regex);

  if (!m) {
    return false;
  } else if (!params) {
    return true;
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];

    if (key) {
      params[key.name] = val;
    }
  }

  return true;
}

function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true);
}
/*  */


var positionStore = Object.create(null);

function setupScroll() {
  // Fix for #1585 for Firefox
  window.history.replaceState({
    key: getStateKey()
  }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();

    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll(router, to, from, isPop) {
  if (!router.app) {
    return;
  }

  var behavior = router.options.scrollBehavior;

  if (!behavior) {
    return;
  }

  if ("development" !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  } // wait until re-render finishes before scrolling


  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return;
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition(shouldScroll, position);
      }).catch(function (err) {
        if ("development" !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition() {
  var key = getStateKey();

  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition() {
  var key = getStateKey();

  if (key) {
    return positionStore[key];
  }
}

function getElementPosition(el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  };
}

function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y);
}

function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  };
}

function normalizeOffset(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  };
}

function isNumber(v) {
  return typeof v === 'number';
}

function scrollToPosition(shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';

  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);

    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}
/*  */


var supportsPushState = inBrowser && function () {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }

  return window.history && 'pushState' in window.history;
}(); // use User Timing api (if present) for more accurate key precision


var Time = inBrowser && window.performance && window.performance.now ? window.performance : Date;

var _key = genKey();

function genKey() {
  return Time.now().toFixed(3);
}

function getStateKey() {
  return _key;
}

function setStateKey(key) {
  _key = key;
}

function pushState(url, replace) {
  saveScrollPosition(); // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls

  var history = window.history;

  try {
    if (replace) {
      history.replaceState({
        key: _key
      }, '', url);
    } else {
      _key = genKey();
      history.pushState({
        key: _key
      }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState(url) {
  pushState(url, true);
}
/*  */


function runQueue(queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };

  step(0);
}
/*  */


function resolveAsyncComponents(matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;
    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;
        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          } // save resolved on async factory in case it's used elsewhere


          def.resolved = typeof resolvedDef === 'function' ? resolvedDef : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;

          if (pending <= 0) {
            next();
          }
        });
        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);

          if (!error) {
            error = isError(reason) ? reason : new Error(msg);
            next(error);
          }
        });
        var res;

        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }

        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;

            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) {
      next();
    }
  };
}

function flatMapComponents(matched, fn) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key);
    });
  }));
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

var hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === 'Module';
} // in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.


function once(fn) {
  var called = false;
  return function () {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    if (called) {
      return;
    }

    called = true;
    return fn.apply(this, args);
  };
}
/*  */


var History = function History(router, base) {
  this.router = router;
  this.base = normalizeBase(base); // start with a route object that stands for "nowhere"

  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen(cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady(cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);

    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError(errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1 = this;
  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL(); // fire ready cbs once

    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }

    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) {
        cb(err);
      });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
  var this$1 = this;
  var current = this.current;

  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }

    onAbort && onAbort(err);
  };

  if (isSameRoute(route, current) && // in the case the route map has been dynamically appended to
  route.matched.length === current.matched.length) {
    this.ensureURL();
    return abort();
  }

  var ref = resolveQueue(this.current.matched, route.matched);
  var updated = ref.updated;
  var deactivated = ref.deactivated;
  var activated = ref.activated;
  var queue = [].concat( // in-component leave guards
  extractLeaveGuards(deactivated), // global before hooks
  this.router.beforeHooks, // in-component update hooks
  extractUpdateHooks(updated), // in-config enter guards
  activated.map(function (m) {
    return m.beforeEnter;
  }), // async components
  resolveAsyncComponents(activated));
  this.pending = route;

  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort();
    }

    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (typeof to === 'string' || typeof to === 'object' && (typeof to.path === 'string' || typeof to.name === 'string')) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();

          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];

    var isValid = function () {
      return this$1.current === route;
    }; // wait until async components are resolved before
    // extracting in-component enter guards


    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort();
      }

      this$1.pending = null;
      onComplete(route);

      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute(route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase(base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl && baseEl.getAttribute('href') || '/'; // strip full URL origin

      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  } // make sure there's the starting slash


  if (base.charAt(0) !== '/') {
    base = '/' + base;
  } // remove trailing slash


  return base.replace(/\/$/, '');
}

function resolveQueue(current, next) {
  var i;
  var max = Math.max(current.length, next.length);

  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break;
    }
  }

  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  };
}

function extractGuards(records, name, bind, reverse) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);

    if (guard) {
      return Array.isArray(guard) ? guard.map(function (guard) {
        return bind(guard, instance, match, key);
      }) : bind(guard, instance, match, key);
    }
  });
  return flatten(reverse ? guards.reverse() : guards);
}

function extractGuard(def, key) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }

  return def.options[key];
}

function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true);
}

function extractUpdateHooks(updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard);
}

function bindGuard(guard, instance) {
  if (instance) {
    return function boundRouteGuard() {
      return guard.apply(instance, arguments);
    };
  }
}

function extractEnterGuards(activated, cbs, isValid) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid);
  });
}

function bindEnterGuard(guard, match, key, cbs, isValid) {
  return function routeEnterGuard(to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);

      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    });
  };
}

function poll(cb, // somehow flow cannot infer this is a function
instances, key, isValid) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}
/*  */


var HTML5History = function (History$$1) {
  function HTML5History(router, base) {
    var this$1 = this;
    History$$1.call(this, router, base);
    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current; // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.

      var location = getLocation(this$1.base);

      if (this$1.current === START && location === initLocation) {
        return;
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if (History$$1) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create(History$$1 && History$$1.prototype);
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go(n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL(push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base);
  };

  return HTML5History;
}(History);

function getLocation(base) {
  var path = window.location.pathname;

  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }

  return (path || '/') + window.location.search + window.location.hash;
}
/*  */


var HashHistory = function (History$$1) {
  function HashHistory(router, base, fallback) {
    History$$1.call(this, router, base); // check history fallback deeplinking

    if (fallback && checkFallback(this.base)) {
      return;
    }

    ensureSlash();
  }

  if (History$$1) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  HashHistory.prototype.constructor = HashHistory; // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early

  HashHistory.prototype.setupListeners = function setupListeners() {
    var this$1 = this;
    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;

      if (!ensureSlash()) {
        return;
      }

      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }

        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go(n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL(push) {
    var current = this.current.fullPath;

    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash();
  };

  return HashHistory;
}(History);

function checkFallback(base) {
  var location = getLocation(base);

  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true;
  }
}

function ensureSlash() {
  var path = getHash();

  if (path.charAt(0) === '/') {
    return true;
  }

  replaceHash('/' + path);
  return false;
}

function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1);
}

function getUrl(path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return base + "#" + path;
}

function pushHash(path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash(path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}
/*  */


var AbstractHistory = function (History$$1) {
  function AbstractHistory(router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if (History$$1) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;
    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;
    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go(n) {
    var this$1 = this;
    var targetIndex = this.index + n;

    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return;
    }

    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/';
  };

  AbstractHistory.prototype.ensureURL = function ensureURL() {// noop
  };

  return AbstractHistory;
}(History);
/*  */


var VueRouter = function VueRouter(options) {
  if (options === void 0) options = {};
  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);
  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;

  if (this.fallback) {
    mode = 'hash';
  }

  if (!inBrowser) {
    mode = 'abstract';
  }

  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break;

    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break;

    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break;

    default:
      if ("development" !== 'production') {
        assert(false, "invalid mode: " + mode);
      }

  }
};

var prototypeAccessors = {
  currentRoute: {
    configurable: true
  }
};

VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom);
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current;
};

VueRouter.prototype.init = function init(app
/* Vue component instance */
) {
  var this$1 = this;
  "development" !== 'production' && assert(install.installed, "not installed. Make sure to call `Vue.use(VueRouter)` " + "before creating root instance.");
  this.apps.push(app); // main app already initialized.

  if (this.app) {
    return;
  }

  this.app = app;
  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };

    history.transitionTo(history.getCurrentLocation(), setupHashListener, setupHashListener);
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
};

VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
  return registerHook(this.resolveHooks, fn);
};

VueRouter.prototype.afterEach = function afterEach(fn) {
  return registerHook(this.afterHooks, fn);
};

VueRouter.prototype.onReady = function onReady(cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError(errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go(n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back() {
  this.go(-1);
};

VueRouter.prototype.forward = function forward() {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
  var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;

  if (!route) {
    return [];
  }

  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key];
    });
  }));
};

VueRouter.prototype.resolve = function resolve(to, current, append) {
  var location = normalizeLocation(to, current || this.history.current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  };
};

VueRouter.prototype.addRoutes = function addRoutes(routes) {
  this.matcher.addRoutes(routes);

  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties(VueRouter.prototype, prototypeAccessors);

function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);

    if (i > -1) {
      list.splice(i, 1);
    }
  };
}

function createHref(base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path;
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

var _default = VueRouter;
exports.default = _default;
},{}],"../../node_modules/vue-mdc-web/dist/vue-mdc-web.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
var script = {
  name: 'MDCApp',
  props: {
    flip: Boolean,
    // flips the drawer & toolbar slot
    drawerHideMobile: Boolean,
    alignStart: Boolean
  },
  computed: {
    navSlot() {
      return this.flip ? 'drawer' : 'nav';
    },

    contentSlot() {
      return this.flip ? 'nav' : 'drawer';
    },

    cssClasses() {
      return {
        'mdc-app--flipped': this.flip,
        'mdc-app--align-start': this.alignStart,
        'mdc-app--drawer-hide-mobile': this.drawerHideMobile
      };
    },

    contentCssClasses() {
      return this.alignStart && 'mdc-app__content--align-start';
    }

  },
  methods: {}
};
/* script */

const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-app mdc-typography",
    class: _vm.cssClasses
  }, [_vm._t(_vm.navSlot), _c("div", {
    staticClass: "mdc-app__content",
    class: _vm.contentCssClasses
  }, [_vm._t(_vm.contentSlot), _vm._t("default")], 2)], 2);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* component normalizer */

function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\app\\App.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCApp = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

function install(Vue, register) {
  register(MDCApp);
}

var App =
/*#__PURE__*/
Object.freeze({
  MDCApp: MDCApp,
  install: install
});
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template A
 */

class MDCFoundation {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    // Classes extending MDCFoundation should implement this method to return an object which exports every
    // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
    return {};
  }
  /** @return enum{strings} */


  static get strings() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
    return {};
  }
  /** @return enum{numbers} */


  static get numbers() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
    return {};
  }
  /** @return {!Object} */


  static get defaultAdapter() {
    // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
    // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
    // validation.
    return {};
  }
  /**
   * @param {A=} adapter
   */


  constructor(adapter = {}) {
    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  init() {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  }

  destroy() {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  }

}
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
};
const strings = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
};
const numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 225,
  // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
  FG_DEACTIVATION_MS: 150,
  // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
  TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices

};
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
 * @private {boolean|undefined}
 */

let supportsCssVariables_;
/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */

let supportsPassive_;
/**
 * @param {!Window} windowObj
 * @return {boolean}
 */

function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  const document = windowObj.document;
  const node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node); // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397

  const computedStyle = windowObj.getComputedStyle(node);
  const hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  node.remove();
  return hasPseudoVarBug;
}
/**
 * @param {!Window} windowObj
 * @param {boolean=} forceRefresh
 * @return {boolean|undefined}
 */


function supportsCssVariables(windowObj, forceRefresh = false) {
  let supportsCssVariables = supportsCssVariables_;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables;
  }

  const supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';

  if (!supportsFunctionPresent) {
    return;
  }

  const explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes'); // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari

  const weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables = false;
  }

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVariables;
  }

  return supportsCssVariables;
} //

/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */


function applyPassive(globalObj = window, forceRefresh = false) {
  if (supportsPassive_ === undefined || forceRefresh) {
    let isSupported = false;

    try {
      globalObj.document.addEventListener('test', null, {
        get passive() {
          isSupported = true;
        }

      });
    } catch (e) {}

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? {
    passive: true
  } : false;
}
/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */


function getMatchesProperty(HTMLElementPrototype) {
  return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(p => p in HTMLElementPrototype).pop();
}
/**
 * @param {!Event} ev
 * @param {{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {{x: number, y: number}}
 */


function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  const {
    x,
    y
  } = pageOffset;
  const documentX = x + clientRect.left;
  const documentY = y + clientRect.top;
  let normalizedX;
  let normalizedY; // Determine touch point relative to the ripple container.

  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return {
    x: normalizedX,
    y: normalizedY
  };
}
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Activation events registered on the root element of each instance for activation


const ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown']; // Deactivation events registered on documentElement when a pointer-related down event occurs

const POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup']; // Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations

/** @type {!Array<!EventTarget>} */

let activatedTargets = [];
/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */

class MDCRippleFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses;
  }

  static get strings() {
    return strings;
  }

  static get numbers() {
    return numbers;
  }

  static get defaultAdapter() {
    return {
      browserSupportsCssVars: () =>
      /* boolean - cached */
      {},
      isUnbounded: () =>
      /* boolean */
      {},
      isSurfaceActive: () =>
      /* boolean */
      {},
      isSurfaceDisabled: () =>
      /* boolean */
      {},
      addClass: () =>
      /* className: string */
      {},
      removeClass: () =>
      /* className: string */
      {},
      containsEventTarget: () =>
      /* target: !EventTarget */
      {},
      registerInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      deregisterInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      registerDocumentInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      deregisterDocumentInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      registerResizeHandler: () =>
      /* handler: EventListener */
      {},
      deregisterResizeHandler: () =>
      /* handler: EventListener */
      {},
      updateCssVariable: () =>
      /* varName: string, value: string */
      {},
      computeBoundingRect: () =>
      /* ClientRect */
      {},
      getWindowPageOffset: () =>
      /* {x: number, y: number} */
      {}
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCRippleFoundation.defaultAdapter, adapter));
    /** @private {number} */

    this.layoutFrame_ = 0;
    /** @private {!ClientRect} */

    this.frame_ =
    /** @type {!ClientRect} */
    {
      width: 0,
      height: 0
    };
    /** @private {!ActivationStateType} */

    this.activationState_ = this.defaultActivationState_();
    /** @private {number} */

    this.initialSize_ = 0;
    /** @private {number} */

    this.maxRadius_ = 0;
    /** @private {function(!Event)} */

    this.activateHandler_ = e => this.activate_(e);
    /** @private {function(!Event)} */


    this.deactivateHandler_ = e => this.deactivate_(e);
    /** @private {function(?Event=)} */


    this.focusHandler_ = () => requestAnimationFrame(() => this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED));
    /** @private {function(?Event=)} */


    this.blurHandler_ = () => requestAnimationFrame(() => this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED));
    /** @private {!Function} */


    this.resizeHandler_ = () => this.layout();
    /** @private {{left: number, top:number}} */


    this.unboundedCoords_ = {
      left: 0,
      top: 0
    };
    /** @private {number} */

    this.fgScale_ = 0;
    /** @private {number} */

    this.activationTimer_ = 0;
    /** @private {number} */

    this.fgDeactivationRemovalTimer_ = 0;
    /** @private {boolean} */

    this.activationAnimationHasEnded_ = false;
    /** @private {!Function} */

    this.activationTimerCallback_ = () => {
      this.activationAnimationHasEnded_ = true;
      this.runDeactivationUXLogicIfReady_();
    };
    /** @private {?Event} */


    this.previousActivationEvent_ = null;
  }
  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   * @return {boolean}
   * @private
   */


  isSupported_() {
    return this.adapter_.browserSupportsCssVars();
  }
  /**
   * @return {!ActivationStateType}
   */


  defaultActivationState_() {
    return {
      isActivated: false,
      hasDeactivationUXRun: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
      activationEvent: null,
      isProgrammatic: false
    };
  }

  init() {
    if (!this.isSupported_()) {
      return;
    }

    this.registerRootHandlers_();
    const {
      ROOT,
      UNBOUNDED
    } = MDCRippleFoundation.cssClasses;
    requestAnimationFrame(() => {
      this.adapter_.addClass(ROOT);

      if (this.adapter_.isUnbounded()) {
        this.adapter_.addClass(UNBOUNDED); // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple

        this.layoutInternal_();
      }
    });
  }

  destroy() {
    if (!this.isSupported_()) {
      return;
    }

    if (this.activationTimer_) {
      clearTimeout(this.activationTimer_);
      this.activationTimer_ = 0;
      const {
        FG_ACTIVATION
      } = MDCRippleFoundation.cssClasses;
      this.adapter_.removeClass(FG_ACTIVATION);
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
    const {
      ROOT,
      UNBOUNDED
    } = MDCRippleFoundation.cssClasses;
    requestAnimationFrame(() => {
      this.adapter_.removeClass(ROOT);
      this.adapter_.removeClass(UNBOUNDED);
      this.removeCssVars_();
    });
  }
  /** @private */


  registerRootHandlers_() {
    ACTIVATION_EVENT_TYPES.forEach(type => {
      this.adapter_.registerInteractionHandler(type, this.activateHandler_);
    });
    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.registerResizeHandler(this.resizeHandler_);
    }
  }
  /**
   * @param {!Event} e
   * @private
   */


  registerDeactivationHandlers_(e) {
    if (e.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(type => {
        this.adapter_.registerDocumentInteractionHandler(type, this.deactivateHandler_);
      });
    }
  }
  /** @private */


  deregisterRootHandlers_() {
    ACTIVATION_EVENT_TYPES.forEach(type => {
      this.adapter_.deregisterInteractionHandler(type, this.activateHandler_);
    });
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  }
  /** @private */


  deregisterDeactivationHandlers_() {
    this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(type => {
      this.adapter_.deregisterDocumentInteractionHandler(type, this.deactivateHandler_);
    });
  }
  /** @private */


  removeCssVars_() {
    const {
      strings: strings$$1
    } = MDCRippleFoundation;
    Object.keys(strings$$1).forEach(k => {
      if (k.indexOf('VAR_') === 0) {
        this.adapter_.updateCssVariable(strings$$1[k], null);
      }
    });
  }
  /**
   * @param {?Event} e
   * @private
   */


  activate_(e) {
    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    const activationState = this.activationState_;

    if (activationState.isActivated) {
      return;
    } // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction


    const previousActivationEvent = this.previousActivationEvent_;
    const isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;

    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === null;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';
    const hasActivatedChild = e && activatedTargets.length > 0 && activatedTargets.some(target => this.adapter_.containsEventTarget(target));

    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (e) {
      activatedTargets.push(
      /** @type {!EventTarget} */
      e.target);
      this.registerDeactivationHandlers_(e);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(e);

    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(() => {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive && (e.key === ' ' || e.keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = this.checkElementMadeActive_(e);

        if (activationState.wasElementMadeActive) {
          this.animateActivation_();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        this.activationState_ = this.defaultActivationState_();
      }
    });
  }
  /**
   * @param {?Event} e
   * @private
   */


  checkElementMadeActive_(e) {
    return e && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
  }
  /**
   * @param {?Event=} event Optional event containing position information.
   */


  activate(event = null) {
    this.activate_(event);
  }
  /** @private */


  animateActivation_() {
    const {
      VAR_FG_TRANSLATE_START,
      VAR_FG_TRANSLATE_END
    } = MDCRippleFoundation.strings;
    const {
      FG_DEACTIVATION,
      FG_ACTIVATION
    } = MDCRippleFoundation.cssClasses;
    const {
      DEACTIVATION_TIMEOUT_MS
    } = MDCRippleFoundation.numbers;
    this.layoutInternal_();
    let translateStart = '';
    let translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      const {
        startPoint,
        endPoint
      } = this.getFgTranslationCoordinates_();
      translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd); // Cancel any ongoing activation/deactivation animations

    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION); // Force layout in order to re-trigger the animation.

    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(() => this.activationTimerCallback_(), DEACTIVATION_TIMEOUT_MS);
  }
  /**
   * @private
   * @return {{startPoint: PointType, endPoint: PointType}}
   */


  getFgTranslationCoordinates_() {
    const {
      activationEvent,
      wasActivatedByPointer
    } = this.activationState_;
    let startPoint;

    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(
      /** @type {!Event} */
      activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    } // Center the element around the start point.


    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };
    const endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };
    return {
      startPoint,
      endPoint
    };
  }
  /** @private */


  runDeactivationUXLogicIfReady_() {
    // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.
    const {
      FG_DEACTIVATION
    } = MDCRippleFoundation.cssClasses;
    const {
      hasDeactivationUXRun,
      isActivated
    } = this.activationState_;
    const activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(() => {
        this.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers.FG_DEACTIVATION_MS);
    }
  }
  /** @private */


  rmBoundedActivationClasses_() {
    const {
      FG_ACTIVATION
    } = MDCRippleFoundation.cssClasses;
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  }

  resetActivationState_() {
    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_(); // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.

    setTimeout(() => this.previousActivationEvent_ = null, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  }
  /**
   * @param {?Event} e
   * @private
   */


  deactivate_(e) {
    const activationState = this.activationState_; // This can happen in scenarios such as when you have a keyup event that blurs the element.

    if (!activationState.isActivated) {
      return;
    }

    const state =
    /** @type {!ActivationStateType} */
    Object.assign({}, activationState);

    if (activationState.isProgrammatic) {
      const evtObject = null;
      requestAnimationFrame(() => this.animateDeactivation_(evtObject, state));
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(() => {
        this.activationState_.hasDeactivationUXRun = true;
        this.animateDeactivation_(e, state);
        this.resetActivationState_();
      });
    }
  }
  /**
   * @param {?Event=} event Optional event containing position information.
   */


  deactivate(event = null) {
    this.deactivate_(event);
  }
  /**
   * @param {Event} e
   * @param {!ActivationStateType} options
   * @private
   */


  animateDeactivation_(e, {
    wasActivatedByPointer,
    wasElementMadeActive
  }) {
    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  }

  layout() {
    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }

    this.layoutFrame_ = requestAnimationFrame(() => {
      this.layoutInternal_();
      this.layoutFrame_ = 0;
    });
  }
  /** @private */


  layoutInternal_() {
    this.frame_ = this.adapter_.computeBoundingRect();
    const maxDim = Math.max(this.frame_.height, this.frame_.width); // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.

    const getBoundedRadius = () => {
      const hypotenuse = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius(); // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform

    this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;
    this.updateLayoutCssVars_();
  }
  /** @private */


  updateLayoutCssVars_() {
    const {
      VAR_FG_SIZE,
      VAR_LEFT,
      VAR_TOP,
      VAR_FG_SCALE
    } = MDCRippleFoundation.strings;
    this.adapter_.updateCssVariable(VAR_FG_SIZE, `${this.initialSize_}px`);
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };
      this.adapter_.updateCssVariable(VAR_LEFT, `${this.unboundedCoords_.left}px`);
      this.adapter_.updateCssVariable(VAR_TOP, `${this.unboundedCoords_.top}px`);
    }
  }
  /** @param {boolean} unbounded */


  setUnbounded(unbounded) {
    const {
      UNBOUNDED
    } = MDCRippleFoundation.cssClasses;

    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  }

}

const matches = getMatchesProperty(HTMLElement.prototype);
const supportsCssVars = supportsCssVariables(window);

function createRipple(vm, adapter, {
  unbounded
}) {
  const {
    $el
  } = vm;
  const {
    documentElement
  } = document;
  const rippleAdapter = {
    browserSupportsCssVars() {
      return supportsCssVars;
    },

    computeBoundingRect() {
      return $el.getBoundingClientRect();
    },

    getWindowPageOffset() {
      return {
        x: window.pageXOffset,
        y: window.pageYOffset
      };
    },

    isSurfaceActive() {
      return $el[matches](':active');
    },

    isSurfaceDisabled() {
      return !!this.disabled;
    },

    isUnbounded() {
      return !!unbounded;
    },

    updateCssVariable(name, value) {
      return $el.style.setProperty(name, value);
    },

    addClass(className) {
      $el.classList.add(className);
    },

    removeClass(className) {
      $el.classList.remove(className);
    },

    // Handlers
    registerInteractionHandler(eventType, handler) {
      $el.addEventListener(eventType, handler, applyPassive());
    },

    deregisterInteractionHandler(eventType, handler) {
      $el.removeEventListener(eventType, handler, applyPassive());
    },

    registerDocumentInteractionHandler(evtType, handler) {
      documentElement.addEventListener(evtType, handler, applyPassive());
    },

    deregisterDocumentInteractionHandler(evtType, handler) {
      documentElement.removeEventListener(evtType, handler, applyPassive());
    },

    registerResizeHandler(handler) {
      window.addEventListener('resize', handler);
    },

    deregisterResizeHandler(handler) {
      window.removeEventListener('resize', handler);
    }

  };

  if (adapter != null && typeof adapter === 'object') {
    Object.assign(rippleAdapter, adapter);
  } // Bind all function to the VueComponent


  Object.keys(rippleAdapter).forEach(key => {
    const fn = rippleAdapter[key];
    rippleAdapter[key] = fn.bind(vm);
  });
  return new MDCRippleFoundation(rippleAdapter);
}

function getSize(el) {
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  };
}

function isSizeEqual(size1, size2) {
  return size1.width === size2.width && size1.height === size2.height;
}

function Ripple(adapter = null, opts = {}) {
  return {
    data() {
      return {
        _ripple: null,
        _rippleBounds: null
      };
    },

    beforeMount() {
      if (opts.surface) {
        if (this.$vnode.data.staticClass) {
          this.$vnode.data.staticClass += ' mdc-ripple-surface';
        } else {
          this.$vnode.data.staticClass = 'mdc-ripple-surface';
        } // Add unbounded attribute to element


        if (opts.unbounded) {
          if (this.$vnode.data.attrs) {
            this.$vnode.data.attrs = {};
          }

          this.$vnode.data.attrs['data-mdc-ripple-is-unbounded'] = true;
        }
      }
    },

    mounted() {
      this._ripple = createRipple(this, adapter, opts);

      this._ripple.init();

      this._rippleBounds = getSize(this.$el);
    },

    updated() {
      const newSize = getSize(this.$el); // When a components size changes then update the ripple

      if (isSizeEqual(this._rippleBounds, newSize)) {
        this._ripple.layout();

        this._rippleBounds = newSize;
      }
    },

    beforeDestroy() {
      this._ripple.destroy();
    }

  };
} //


var script$1 = {
  name: 'MDCButton',
  mixins: [Ripple()],
  props: {
    icon: String,
    raised: Boolean,
    unelevated: Boolean,
    outlined: Boolean,
    dense: Boolean,
    compact: Boolean,
    disabled: Boolean,
    link: String
  },
  computed: {
    cssClasses() {
      return {
        'mdc-button--raised': this.raised,
        'mdc-button--unelevated': this.unelevated,
        'mdc-button--outlined': this.outlined,
        'mdc-button--dense': this.dense,
        'mdc-button--compact': this.compact
      };
    }

  }
};
/* script */

const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.link ? "a" : "button", _vm._g({
    tag: "component",
    staticClass: "mdc-button",
    class: _vm.cssClasses,
    attrs: {
      href: _vm.link,
      disabled: _vm.disabled
    }
  }, _vm.$listeners), [_vm.icon ? _c("i", {
    staticClass: "material-icons mdc-button__icon"
  }, [_vm._v(_vm._s(_vm.icon))]) : _vm._e(), _vm._t("default")], 2);
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* component normalizer */

function __vue_normalize__$1(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\button\\Button.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCButton = __vue_normalize__$1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, undefined, undefined);

function install$1(Vue, register) {
  register(MDCButton);
}

var Button =
/*#__PURE__*/
Object.freeze({
  MDCButton: MDCButton,
  install: install$1
}); //
//
//
//
//

var script$2 = {
  name: 'MDCCard',
  props: {
    outlined: Boolean
  },
  computed: {
    cssClasses() {
      return this.outlined && 'mdc-card--outlined';
    }

  }
};
/* script */

const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-card",
    class: _vm.cssClasses
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;
/* style */

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* component normalizer */

function __vue_normalize__$2(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\card\\Card.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCCard = __vue_normalize__$2({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, undefined, undefined); //
//
//
//
//
//
//
//
//


var script$3 = {
  name: 'MDCCardActions',
  props: {
    fullBleed: Boolean
  },
  computed: {
    cssClasses() {
      return this.fullBleed && 'mdc-card__actions--full-bleed';
    },

    hasButtons() {
      return !!this.$slots.button;
    },

    hasIcons() {
      return !!this.$slots.icon;
    }

  },

  beforeMount() {
    const addClass = ({
      data
    }, className) => {
      if (data.staticClass) {
        data.staticClass += ` ${className}`;
      } else {
        data.staticClass = className;
      }
    };

    this.$slots.button && this.$slots.button.forEach(button => addClass(button, 'mdc-card__action mdc-card__action--button'));
    this.$slots.icon && this.$slots.icon.forEach(icon => addClass(icon, 'mdc-card__action mdc-card__action--icon'));
  }

};
/* script */

const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-card__actions",
    class: _vm.cssClasses
  }, [_vm._t("default"), _vm.hasButtons ? _c("div", {
    staticClass: "mdc-card__action-buttons"
  }, [_vm._t("button")], 2) : _vm._e(), _vm.hasIcons ? _c("div", {
    staticClass: "mdc-card__action-icons"
  }, [_vm._t("icon")], 2) : _vm._e()], 2);
};

var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;
/* style */

const __vue_inject_styles__$3 = undefined;
/* scoped */

const __vue_scope_id__$3 = undefined;
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* component normalizer */

function __vue_normalize__$3(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\card\\CardActions.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCCardActions = __vue_normalize__$3({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, undefined, undefined); //


var script$4 = {
  name: 'MDCIcon',
  mixins: [Ripple(null, {
    unbounded: true,
    surface: true
  })],
  props: {
    icon: {
      type: String,
      required: true
    },
    name: String,
    label: String,
    tag: {
      type: String,
      default: 'i'
    },
    ripple: Boolean,
    button: Boolean
  },
  computed: {
    cssClasses() {
      return !!this.name && `mdc-${this.name}__icon`;
    }

  },

  mounted() {
    if (!this.ripple) {
      this._ripple.destroy();
    }
  }

};
/* script */

const __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, {
    tag: "component",
    staticClass: "material-icons",
    class: _vm.cssClasses,
    attrs: {
      tabindex: _vm.button && "0",
      role: _vm.button && "button",
      "aria-hidden": !_vm.button && "true",
      "aria-label": _vm.label,
      title: "label"
    }
  }, [_vm._v(_vm._s(_vm.icon))]);
};

var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;
/* style */

const __vue_inject_styles__$4 = undefined;
/* scoped */

const __vue_scope_id__$4 = undefined;
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* component normalizer */

function __vue_normalize__$4(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\icon\\Icon.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCIcon = __vue_normalize__$4({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, undefined, undefined); //


var script$5 = {
  name: 'MDCCardIcon',
  components: {
    MdcIcon: MDCIcon
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    label: String
  }
};
/* script */

const __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("mdc-icon", {
    attrs: {
      button: "button",
      ripple: "ripple",
      icon: _vm.icon,
      label: _vm.label
    }
  }, [_vm._v(_vm._s(_vm.icon))]);
};

var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;
/* style */

const __vue_inject_styles__$5 = undefined;
/* scoped */

const __vue_scope_id__$5 = undefined;
/* module identifier */

const __vue_module_identifier__$5 = undefined;
/* functional template */

const __vue_is_functional_template__$5 = false;
/* component normalizer */

function __vue_normalize__$5(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\card\\CardIcon.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCCardIcon = __vue_normalize__$5({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, undefined, undefined); //
//
//
//
//
//


var script$6 = {
  name: 'MDCCardMedia',
  props: {
    square: Boolean,
    image: String
  },
  computed: {
    cssStyles() {
      return this.image && `background-image: url(${this.image});`;
    },

    cssClasses() {
      return this.square ? 'mdc-card__media--square' : 'mdc-card__media--16-9';
    },

    hasContent() {
      return !!this.$slots.default;
    }

  }
};
/* script */

const __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-card__media",
    class: _vm.cssClasses,
    style: _vm.cssStyles
  }, [_vm.hasContent ? _c("div", {
    staticClass: "mdc-card__media-content"
  }, [_vm._t("default")], 2) : _vm._e()]);
};

var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;
/* style */

const __vue_inject_styles__$6 = undefined;
/* scoped */

const __vue_scope_id__$6 = undefined;
/* module identifier */

const __vue_module_identifier__$6 = undefined;
/* functional template */

const __vue_is_functional_template__$6 = false;
/* component normalizer */

function __vue_normalize__$6(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\card\\CardMedia.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCCardMedia = __vue_normalize__$6({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, undefined, undefined);

function install$2(Vue, register) {
  register(MDCCard, MDCCardActions, MDCCardIcon, MDCCardMedia);
}

var Card =
/*#__PURE__*/
Object.freeze({
  MDCCard: MDCCard,
  MDCCardActions: MDCCardActions,
  MDCCardIcon: MDCCardIcon,
  MDCCardMedia: MDCCardMedia,
  install: install$2
});
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @const {Object<string, !VendorPropertyMapType>} */

const eventTypeMap = {
  'animationstart': {
    noPrefix: 'animationstart',
    webkitPrefix: 'webkitAnimationStart',
    styleProperty: 'animation'
  },
  'animationend': {
    noPrefix: 'animationend',
    webkitPrefix: 'webkitAnimationEnd',
    styleProperty: 'animation'
  },
  'animationiteration': {
    noPrefix: 'animationiteration',
    webkitPrefix: 'webkitAnimationIteration',
    styleProperty: 'animation'
  },
  'transitionend': {
    noPrefix: 'transitionend',
    webkitPrefix: 'webkitTransitionEnd',
    styleProperty: 'transition'
  }
};
/** @const {Object<string, !VendorPropertyMapType>} */

const cssPropertyMap = {
  'animation': {
    noPrefix: 'animation',
    webkitPrefix: '-webkit-animation'
  },
  'transform': {
    noPrefix: 'transform',
    webkitPrefix: '-webkit-transform'
  },
  'transition': {
    noPrefix: 'transition',
    webkitPrefix: '-webkit-transition'
  }
};
/**
 * @param {!Object} windowObj
 * @return {boolean}
 */

function hasProperShape(windowObj) {
  return windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function';
}
/**
 * @param {string} eventType
 * @return {boolean}
 */


function eventFoundInMaps(eventType) {
  return eventType in eventTypeMap || eventType in cssPropertyMap;
}
/**
 * @param {string} eventType
 * @param {!Object<string, !VendorPropertyMapType>} map
 * @param {!Element} el
 * @return {string}
 */


function getJavaScriptEventName(eventType, map, el) {
  return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
}
/**
 * Helper function to determine browser prefix for CSS3 animation events
 * and property names.
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */


function getAnimationName(windowObj, eventType) {
  if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
    return eventType;
  }

  const map =
  /** @type {!Object<string, !VendorPropertyMapType>} */
  eventType in eventTypeMap ? eventTypeMap : cssPropertyMap;
  const el = windowObj['document']['createElement']('div');
  let eventName = '';

  if (map === eventTypeMap) {
    eventName = getJavaScriptEventName(eventType, map, el);
  } else {
    eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  return eventName;
} // Public functions to access getAnimationName() for JavaScript events or CSS
// property names.


const transformStyleProperties = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'MSTransform'];
/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */

function getCorrectEventName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * @record
 */


class RippleCapableSurface {}
/** @protected {!Element} */


RippleCapableSurface.prototype.root_;
/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */

RippleCapableSurface.prototype.unbounded;
/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */

RippleCapableSurface.prototype.disabled;
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @const {string} */

const ROOT = 'mdc-checkbox';
/** @enum {string} */

const cssClasses$1 = {
  UPGRADED: 'mdc-checkbox--upgraded',
  CHECKED: 'mdc-checkbox--checked',
  INDETERMINATE: 'mdc-checkbox--indeterminate',
  DISABLED: 'mdc-checkbox--disabled',
  ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
  ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
  ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
  ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
  ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
  ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked'
};
/** @enum {string} */

const strings$1 = {
  NATIVE_CONTROL_SELECTOR: `.${ROOT}__native-control`,
  TRANSITION_STATE_INIT: 'init',
  TRANSITION_STATE_CHECKED: 'checked',
  TRANSITION_STATE_UNCHECKED: 'unchecked',
  TRANSITION_STATE_INDETERMINATE: 'indeterminate',
  ARIA_CHECKED_ATTR: 'aria-checked',
  ARIA_CHECKED_INDETERMINATE_VALUE: 'mixed'
};
/** @enum {number} */

const numbers$1 = {
  ANIM_END_LATCH_MS: 250
};
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @const {!Array<string>} */

const CB_PROTO_PROPS = ['checked', 'indeterminate'];
/**
 * @extends {MDCFoundation<!MDCCheckboxAdapter>}
 */

class MDCCheckboxFoundation extends MDCFoundation {
  /** @return enum {cssClasses} */
  static get cssClasses() {
    return cssClasses$1;
  }
  /** @return enum {strings} */


  static get strings() {
    return strings$1;
  }
  /** @return enum {numbers} */


  static get numbers() {
    return numbers$1;
  }
  /** @return {!MDCCheckboxAdapter} */


  static get defaultAdapter() {
    return (
      /** @type {!MDCCheckboxAdapter} */
      {
        addClass: () =>
        /* className: string */
        {},
        removeClass: () =>
        /* className: string */
        {},
        setNativeControlAttr: () =>
        /* attr: string, value: string */
        {},
        removeNativeControlAttr: () =>
        /* attr: string */
        {},
        registerAnimationEndHandler: () =>
        /* handler: EventListener */
        {},
        deregisterAnimationEndHandler: () =>
        /* handler: EventListener */
        {},
        registerChangeHandler: () =>
        /* handler: EventListener */
        {},
        deregisterChangeHandler: () =>
        /* handler: EventListener */
        {},
        getNativeControl: () =>
        /* !MDCSelectionControlState */
        {},
        forceLayout: () => {},
        isAttachedToDOM: () =>
        /* boolean */
        {}
      }
    );
  }

  constructor(adapter) {
    super(Object.assign(MDCCheckboxFoundation.defaultAdapter, adapter));
    /** @private {string} */

    this.currentCheckState_ = strings$1.TRANSITION_STATE_INIT;
    /** @private {string} */

    this.currentAnimationClass_ = '';
    /** @private {number} */

    this.animEndLatchTimer_ = 0;

    this.animEndHandler_ =
    /** @private {!EventListener} */
    () => this.handleAnimationEnd();

    this.changeHandler_ =
    /** @private {!EventListener} */
    () => this.handleChange();
  }

  init() {
    this.currentCheckState_ = this.determineCheckState_(this.getNativeControl_());
    this.updateAriaChecked_();
    this.adapter_.addClass(cssClasses$1.UPGRADED);
    this.adapter_.registerChangeHandler(this.changeHandler_);
    this.installPropertyChangeHooks_();
  }

  destroy() {
    this.adapter_.deregisterChangeHandler(this.changeHandler_);
    this.uninstallPropertyChangeHooks_();
  }
  /** @return {boolean} */


  isChecked() {
    return this.getNativeControl_().checked;
  }
  /** @param {boolean} checked */


  setChecked(checked) {
    this.getNativeControl_().checked = checked;
  }
  /** @return {boolean} */


  isIndeterminate() {
    return this.getNativeControl_().indeterminate;
  }
  /** @param {boolean} indeterminate */


  setIndeterminate(indeterminate) {
    this.getNativeControl_().indeterminate = indeterminate;
  }
  /** @return {boolean} */


  isDisabled() {
    return this.getNativeControl_().disabled;
  }
  /** @param {boolean} disabled */


  setDisabled(disabled) {
    this.getNativeControl_().disabled = disabled;

    if (disabled) {
      this.adapter_.addClass(cssClasses$1.DISABLED);
    } else {
      this.adapter_.removeClass(cssClasses$1.DISABLED);
    }
  }
  /** @return {?string} */


  getValue() {
    return this.getNativeControl_().value;
  }
  /** @param {?string} value */


  setValue(value) {
    this.getNativeControl_().value = value;
  }
  /**
   * Handles the animationend event for the checkbox
   */


  handleAnimationEnd() {
    clearTimeout(this.animEndLatchTimer_);
    this.animEndLatchTimer_ = setTimeout(() => {
      this.adapter_.removeClass(this.currentAnimationClass_);
      this.adapter_.deregisterAnimationEndHandler(this.animEndHandler_);
    }, numbers$1.ANIM_END_LATCH_MS);
  }
  /**
   * Handles the change event for the checkbox
   */


  handleChange() {
    this.transitionCheckState_();
  }
  /** @private */


  installPropertyChangeHooks_() {
    const nativeCb = this.getNativeControl_();
    const cbProto = Object.getPrototypeOf(nativeCb);
    CB_PROTO_PROPS.forEach(controlState => {
      const desc = Object.getOwnPropertyDescriptor(cbProto, controlState); // We have to check for this descriptor, since some browsers (Safari) don't support its return.
      // See: https://bugs.webkit.org/show_bug.cgi?id=49739

      if (validDescriptor(desc)) {
        const nativeCbDesc =
        /** @type {!ObjectPropertyDescriptor} */
        {
          get: desc.get,
          set: state => {
            desc.set.call(nativeCb, state);
            this.transitionCheckState_();
          },
          configurable: desc.configurable,
          enumerable: desc.enumerable
        };
        Object.defineProperty(nativeCb, controlState, nativeCbDesc);
      }
    });
  }
  /** @private */


  uninstallPropertyChangeHooks_() {
    const nativeCb = this.getNativeControl_();
    const cbProto = Object.getPrototypeOf(nativeCb);
    CB_PROTO_PROPS.forEach(controlState => {
      const desc =
      /** @type {!ObjectPropertyDescriptor} */
      Object.getOwnPropertyDescriptor(cbProto, controlState);

      if (validDescriptor(desc)) {
        Object.defineProperty(nativeCb, controlState, desc);
      }
    });
  }
  /** @private */


  transitionCheckState_() {
    const nativeCb = this.adapter_.getNativeControl();

    if (!nativeCb) {
      return;
    }

    const oldState = this.currentCheckState_;
    const newState = this.determineCheckState_(nativeCb);

    if (oldState === newState) {
      return;
    }

    this.updateAriaChecked_(); // Check to ensure that there isn't a previously existing animation class, in case for example
    // the user interacted with the checkbox before the animation was finished.

    if (this.currentAnimationClass_.length > 0) {
      clearTimeout(this.animEndLatchTimer_);
      this.adapter_.forceLayout();
      this.adapter_.removeClass(this.currentAnimationClass_);
    }

    this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
    this.currentCheckState_ = newState; // Check for parentNode so that animations are only run when the element is attached
    // to the DOM.

    if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
      this.adapter_.addClass(this.currentAnimationClass_);
      this.adapter_.registerAnimationEndHandler(this.animEndHandler_);
    }
  }
  /**
   * @param {!MDCSelectionControlState} nativeCb
   * @return {string}
   * @private
   */


  determineCheckState_(nativeCb) {
    const {
      TRANSITION_STATE_INDETERMINATE,
      TRANSITION_STATE_CHECKED,
      TRANSITION_STATE_UNCHECKED
    } = strings$1;

    if (nativeCb.indeterminate) {
      return TRANSITION_STATE_INDETERMINATE;
    }

    return nativeCb.checked ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
  }
  /**
   * @param {string} oldState
   * @param {string} newState
   * @return {string}
   */


  getTransitionAnimationClass_(oldState, newState) {
    const {
      TRANSITION_STATE_INIT,
      TRANSITION_STATE_CHECKED,
      TRANSITION_STATE_UNCHECKED
    } = strings$1;
    const {
      ANIM_UNCHECKED_CHECKED,
      ANIM_UNCHECKED_INDETERMINATE,
      ANIM_CHECKED_UNCHECKED,
      ANIM_CHECKED_INDETERMINATE,
      ANIM_INDETERMINATE_CHECKED,
      ANIM_INDETERMINATE_UNCHECKED
    } = MDCCheckboxFoundation.cssClasses;

    switch (oldState) {
      case TRANSITION_STATE_INIT:
        if (newState === TRANSITION_STATE_UNCHECKED) {
          return '';
        }

      // fallthrough

      case TRANSITION_STATE_UNCHECKED:
        return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;

      case TRANSITION_STATE_CHECKED:
        return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
      // TRANSITION_STATE_INDETERMINATE

      default:
        return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
    }
  }

  updateAriaChecked_() {
    // Ensure aria-checked is set to mixed if checkbox is in indeterminate state.
    if (this.isIndeterminate()) {
      this.adapter_.setNativeControlAttr(strings$1.ARIA_CHECKED_ATTR, strings$1.ARIA_CHECKED_INDETERMINATE_VALUE);
    } else {
      this.adapter_.removeNativeControlAttr(strings$1.ARIA_CHECKED_ATTR);
    }
  }
  /**
   * @return {!MDCSelectionControlState}
   * @private
   */


  getNativeControl_() {
    return this.adapter_.getNativeControl() || {
      checked: false,
      indeterminate: false,
      disabled: false,
      value: null
    };
  }

}
/**
 * @param {ObjectPropertyDescriptor|undefined} inputPropDesc
 * @return {boolean}
 */


function validDescriptor(inputPropDesc) {
  return !!inputPropDesc && typeof inputPropDesc.set === 'function';
}
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Handles v-model values from type [Array, String, Boolean, Number]
 * @param {Array | String | Boolean | Number} model - Model value from v-model.
 * @param {String | Boolean | Number} primitivevalue - Value used in model to check if it is needed to be set or not.
 */


function handleModel(model, primitiveValue, {
  checked,
  value
}) {
  let newModel = Array.isArray(model) ? Array.from(model) : model;

  if (Array.isArray(model)) {
    const index = newModel.indexOf(value); // Used to force a value if not an array. Used in only ChipSet v-model.

    const isChecked = typeof checked == 'boolean' ? checked : index >= 0;

    if (isChecked) {
      newModel.splice(index, 1);
    } else {
      newModel.push(value);
    }
  } else {
    newModel = primitiveValue;
  }

  return newModel;
} // Basically taken from material-components-web repo under component.js


function emitCustomEvent(el, type, data, shouldBubble = false) {
  let evt;

  if (typeof CustomEvent === 'function') {
    evt = new CustomEvent(type, {
      detail: data,
      bubbles: shouldBubble
    });
  } else {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(type, shouldBubble, false, data);
  }

  el.dispatchEvent(evt);
} //


const animationEnd = getCorrectEventName(window, 'animationend');
const rippleAdapter = {
  isSurfaceActive() {
    return this.$refs.input[matches](':active');
  },

  registerInteractionHandler(typeName, handler) {
    this.$refs.input.addEventListener(typeName, handler);
  },

  deregisterInteractionHandler(typeName, handler) {
    this.$refs.input.removeEventListener(typeName, handler);
  }

};
var script$7 = {
  name: 'MDCCheckbox',
  mixins: [Ripple(rippleAdapter, {
    unbounded: true
  })],
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: [Boolean, Array],
    disabled: Boolean,
    indeterminate: Boolean,
    value: [String, Number, Boolean]
  },
  watch: {
    checked(value) {
      this.$_syncChecked(value);
    },

    disabled(value) {
      this.foundation.setDisabled(value);
    },

    indeterminate(value) {
      this.foundation.setIndeterminate(value);
    }

  },

  mounted() {
    const {
      $el
    } = this;
    const {
      input
    } = this.$refs; // Initialize the foundation

    this.foundation = new MDCCheckboxFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      setNativeControlAttr: (attr, value) => input.setAttribute(attr, value),
      removeNativeControlAttr: attr => input.removeAttribute(attr),
      registerAnimationEndHandler: handler => $el.removeEventListener(animationEnd, handler),
      deregisterAnimationEndHandler: handler => $el.removeEventListener(animationEnd, handler),
      registerChangeHandler: handler => input.addEventListener('change', handler),
      deregisterChangeHandler: handler => input.removeEventListener('change', handler),
      getNativeControl: () => input,
      forceLayout: () => this.$forceUpdate(),
      isAttachedToDOM: () => !!$el.parentNode
    });
    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
    this.foundation.setIndeterminate(this.indeterminate); // Check for initial checked

    this.$_syncChecked(this.checked);
  },

  beforeDestroy() {
    this.foundation.destroy();
  },

  methods: {
    $_syncChecked(checked) {
      if (Array.isArray(checked)) {
        checked = checked.includes(this.value);
      }

      this.foundation.setChecked(checked);
    },

    onChange(e) {
      const {
        value
      } = this;
      const {
        checked
      } = e.target;
      this.$emit('update:indeterminate', this.foundation.isIndeterminate());
      const newValue = handleModel(this.checked, checked, {
        checked,
        value
      });
      this.$emit('change', newValue);
      /*if(Array.isArray(this.checked)) {
        checked = this.checked;
        if(checked) {
          checked.push(this.value);
        } else {
          checked.splice(arr.indexOf(this.value), 1);
        }
      } else if(this.value) {
        checked = this.value;
      }
       this.$emit('change', checked);*/
    }

  }
};
/* script */

const __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-checkbox"
  }, [_c("input", _vm._b({
    ref: "input",
    staticClass: "mdc-checkbox__native-control",
    attrs: {
      type: "checkbox"
    },
    domProps: {
      value: _vm.value
    },
    on: {
      change: _vm.onChange
    }
  }, "input", _vm.$attrs, false)), _c("div", {
    staticClass: "mdc-checkbox__background"
  }, [_c("svg", {
    staticClass: "mdc-checkbox__checkmark",
    attrs: {
      viewBox: "0 0 24 24"
    }
  }, [_c("path", {
    staticClass: "mdc-checkbox__checkmark-path",
    attrs: {
      fill: "none",
      stroke: "white",
      d: "M1.73,12.91 8.1,19.28 22.79,4.59"
    }
  })]), _c("div", {
    staticClass: "mdc-checkbox__mixedmark"
  })])]);
};

var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;
/* style */

const __vue_inject_styles__$7 = undefined;
/* scoped */

const __vue_scope_id__$7 = undefined;
/* module identifier */

const __vue_module_identifier__$7 = undefined;
/* functional template */

const __vue_is_functional_template__$7 = false;
/* component normalizer */

function __vue_normalize__$7(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\checkbox\\Checkbox.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCCheckbox$1 = __vue_normalize__$7({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, undefined, undefined);

function install$3(Vue, register) {
  register(MDCCheckbox$1);
}

var Checkbox =
/*#__PURE__*/
Object.freeze({
  MDCCheckbox: MDCCheckbox$1,
  install: install$3
});
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */

const strings$2 = {
  ENTRY_ANIMATION_NAME: 'mdc-chip-entry',
  INTERACTION_EVENT: 'MDCChip:interaction',
  TRAILING_ICON_INTERACTION_EVENT: 'MDCChip:trailingIconInteraction',
  REMOVAL_EVENT: 'MDCChip:removal',
  CHECKMARK_SELECTOR: '.mdc-chip__checkmark',
  LEADING_ICON_SELECTOR: '.mdc-chip__icon--leading',
  TRAILING_ICON_SELECTOR: '.mdc-chip__icon--trailing'
};
/** @enum {string} */

const cssClasses$2 = {
  CHECKMARK: 'mdc-chip__checkmark',
  CHIP: 'mdc-chip',
  CHIP_EXIT: 'mdc-chip--exit',
  HIDDEN_LEADING_ICON: 'mdc-chip__icon--leading-hidden',
  LEADING_ICON: 'mdc-chip__icon--leading',
  TRAILING_ICON: 'mdc-chip__icon--trailing',
  SELECTED: 'mdc-chip--selected',
  TEXT: 'mdc-chip__text'
};
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCChipAdapter>}
 * @final
 */

class MDCChipFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get strings() {
    return strings$2;
  }
  /** @return enum {string} */


  static get cssClasses() {
    return cssClasses$2;
  }
  /**
   * {@see MDCChipAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCChipAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCChipAdapter} */
      {
        addClass: () => {},
        removeClass: () => {},
        hasClass: () => {},
        addClassToLeadingIcon: () => {},
        removeClassFromLeadingIcon: () => {},
        eventTargetHasClass: () => {},
        registerEventHandler: () => {},
        deregisterEventHandler: () => {},
        registerTrailingIconInteractionHandler: () => {},
        deregisterTrailingIconInteractionHandler: () => {},
        notifyInteraction: () => {},
        notifyTrailingIconInteraction: () => {},
        notifyRemoval: () => {},
        getComputedStyleValue: () => {},
        setStyleProperty: () => {}
      }
    );
  }
  /**
   * @param {!MDCChipAdapter} adapter
   */


  constructor(adapter) {
    super(Object.assign(MDCChipFoundation.defaultAdapter, adapter));
    /** @private {function(!Event): undefined} */

    this.interactionHandler_ = evt => this.handleInteraction_(evt);
    /** @private {function(!Event): undefined} */


    this.transitionEndHandler_ = evt => this.handleTransitionEnd_(evt);
    /** @private {function(!Event): undefined} */


    this.trailingIconInteractionHandler_ = evt => this.handleTrailingIconInteraction_(evt);
  }

  init() {
    ['click', 'keydown'].forEach(evtType => {
      this.adapter_.registerEventHandler(evtType, this.interactionHandler_);
    });
    this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
    ['click', 'keydown', 'touchstart', 'pointerdown', 'mousedown'].forEach(evtType => {
      this.adapter_.registerTrailingIconInteractionHandler(evtType, this.trailingIconInteractionHandler_);
    });
  }

  destroy() {
    ['click', 'keydown'].forEach(evtType => {
      this.adapter_.deregisterEventHandler(evtType, this.interactionHandler_);
    });
    this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
    ['click', 'keydown', 'touchstart', 'pointerdown', 'mousedown'].forEach(evtType => {
      this.adapter_.deregisterTrailingIconInteractionHandler(evtType, this.trailingIconInteractionHandler_);
    });
  }
  /**
   * @return {boolean}
   */


  isSelected() {
    return this.adapter_.hasClass(cssClasses$2.SELECTED);
  }
  /**
   * @param {boolean} selected
   */


  setSelected(selected) {
    if (selected) {
      this.adapter_.addClass(cssClasses$2.SELECTED);
    } else {
      this.adapter_.removeClass(cssClasses$2.SELECTED);
    }
  }
  /**
   * Handles an interaction event on the root element.
   * @param {!Event} evt
   */


  handleInteraction_(evt) {
    if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
      this.adapter_.notifyInteraction();
    }
  }
  /**
   * Handles a transition end event on the root element.
   * @param {!Event} evt
   */


  handleTransitionEnd_(evt) {
    // Handle transition end event on the chip when it is about to be removed.
    if (this.adapter_.eventTargetHasClass(
    /** @type {!EventTarget} */
    evt.target, cssClasses$2.CHIP_EXIT)) {
      if (evt.propertyName === 'width') {
        this.adapter_.notifyRemoval();
      } else if (evt.propertyName === 'opacity') {
        // See: https://css-tricks.com/using-css-transitions-auto-dimensions/#article-header-id-5
        const chipWidth = this.adapter_.getComputedStyleValue('width'); // On the next frame (once we get the computed width), explicitly set the chip's width
        // to its current pixel width, so we aren't transitioning out of 'auto'.

        requestAnimationFrame(() => {
          this.adapter_.setStyleProperty('width', chipWidth); // To mitigate jitter, start transitioning padding and margin before width.

          this.adapter_.setStyleProperty('padding', '0');
          this.adapter_.setStyleProperty('margin', '0'); // On the next frame (once width is explicitly set), transition width to 0.

          requestAnimationFrame(() => {
            this.adapter_.setStyleProperty('width', '0');
          });
        });
      }

      return;
    } // Handle a transition end event on the leading icon or checkmark, since the transition end event bubbles.


    if (evt.propertyName !== 'opacity') {
      return;
    }

    if (this.adapter_.eventTargetHasClass(
    /** @type {!EventTarget} */
    evt.target, cssClasses$2.LEADING_ICON) && this.adapter_.hasClass(cssClasses$2.SELECTED)) {
      this.adapter_.addClassToLeadingIcon(cssClasses$2.HIDDEN_LEADING_ICON);
    } else if (this.adapter_.eventTargetHasClass(
    /** @type {!EventTarget} */
    evt.target, cssClasses$2.CHECKMARK) && !this.adapter_.hasClass(cssClasses$2.SELECTED)) {
      this.adapter_.removeClassFromLeadingIcon(cssClasses$2.HIDDEN_LEADING_ICON);
    }
  }
  /**
   * Handles an interaction event on the trailing icon element. This is used to
   * prevent the ripple from activating on interaction with the trailing icon.
   * @param {!Event} evt
   */


  handleTrailingIconInteraction_(evt) {
    evt.stopPropagation();

    if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
      this.adapter_.notifyTrailingIconInteraction();
      this.adapter_.addClass(cssClasses$2.CHIP_EXIT);
    }
  }

}
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */


const strings$3 = {
  CHIP_SELECTOR: '.mdc-chip'
};
/** @enum {string} */

const cssClasses$3 = {
  CHOICE: 'mdc-chip-set--choice',
  FILTER: 'mdc-chip-set--filter'
};
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCChipSetAdapter>}
 * @final
 */

class MDCChipSetFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get strings() {
    return strings$3;
  }
  /** @return enum {string} */


  static get cssClasses() {
    return cssClasses$3;
  }
  /**
   * {@see MDCChipSetAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCChipSetAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCChipSetAdapter} */
      {
        hasClass: () => {},
        registerInteractionHandler: () => {},
        deregisterInteractionHandler: () => {},
        appendChip: () => {},
        removeChip: () => {}
      }
    );
  }
  /**
   * @param {!MDCChipSetAdapter} adapter
   */


  constructor(adapter) {
    super(Object.assign(MDCChipSetFoundation.defaultAdapter, adapter));
    /**
     * The selected chips in the set. Only used for choice chip set or filter chip set.
     * @private {!Array<!MDCChipFoundation>}
     */

    this.selectedChips_ = [];
    /** @private {function(!Event): undefined} */

    this.chipInteractionHandler_ = evt => this.handleChipInteraction_(evt);
    /** @private {function(!Event): undefined} */


    this.chipRemovalHandler_ = evt => this.handleChipRemoval_(evt);
  }

  init() {
    this.adapter_.registerInteractionHandler(MDCChipFoundation.strings.INTERACTION_EVENT, this.chipInteractionHandler_);
    this.adapter_.registerInteractionHandler(MDCChipFoundation.strings.REMOVAL_EVENT, this.chipRemovalHandler_);
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler(MDCChipFoundation.strings.INTERACTION_EVENT, this.chipInteractionHandler_);
    this.adapter_.deregisterInteractionHandler(MDCChipFoundation.strings.REMOVAL_EVENT, this.chipRemovalHandler_);
  }
  /**
   * Returns a new chip element with the given text, leading icon, and trailing icon,
   * added to the root chip set element.
   * @param {string} text
   * @param {?Element} leadingIcon
   * @param {?Element} trailingIcon
   * @return {!Element}
   */


  addChip(text, leadingIcon, trailingIcon) {
    const chipEl = this.adapter_.appendChip(text, leadingIcon, trailingIcon);
    return chipEl;
  }
  /**
   * Selects the given chip. Deselects all other chips if the chip set is of the choice variant.
   * @param {!MDCChipFoundation} chipFoundation
   */


  select(chipFoundation) {
    if (this.adapter_.hasClass(cssClasses$3.CHOICE)) {
      this.deselectAll_();
    }

    chipFoundation.setSelected(true);
    this.selectedChips_.push(chipFoundation);
  }
  /**
   * Deselects the given chip.
   * @param {!MDCChipFoundation} chipFoundation
   */


  deselect(chipFoundation) {
    const index = this.selectedChips_.indexOf(chipFoundation);

    if (index >= 0) {
      this.selectedChips_.splice(index, 1);
    }

    chipFoundation.setSelected(false);
  }
  /** Deselects all selected chips. */


  deselectAll_() {
    this.selectedChips_.forEach(chipFoundation => {
      chipFoundation.setSelected(false);
    });
    this.selectedChips_.length = 0;
  }
  /**
   * Handles a chip interaction event
   * @param {!Event} evt
   * @private
   */


  handleChipInteraction_(evt) {
    const chipFoundation = evt.detail.chip.foundation;

    if (this.adapter_.hasClass(cssClasses$3.CHOICE) || this.adapter_.hasClass(cssClasses$3.FILTER)) {
      if (chipFoundation.isSelected()) {
        this.deselect(chipFoundation);
      } else {
        this.select(chipFoundation);
      }
    }
  }
  /**
   * Handles the event when a chip is removed.
   * @param {!Event} evt
   * @private
   */


  handleChipRemoval_(evt) {
    const {
      chip
    } = evt.detail;
    this.deselect(chip.foundation);
    this.adapter_.removeChip(chip);
  }

}
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//


var script$8 = {
  name: 'MDCChip',
  mixins: [Ripple()],
  components: {
    MdcIcon: MDCIcon
  },
  inject: ['MDCChipSet'],
  props: {
    text: {
      type: String,
      required: true
    },
    value: String,
    leadingIcon: String,
    trailingIcon: String
  },
  computed: {
    filter() {
      return this.MDCChipSet.filter;
    }

  },

  mounted() {
    const {
      $el
    } = this;
    const styles = window.getComputedStyle($el);
    const {
      INTERACTION_EVENT,
      REMOVAL_EVENT
    } = MDCChipFoundation.strings;
    this.foundation = new MDCChipFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      addClassToLeadingIcon: className => {
        const {
          leadingIcon
        } = this.$refs;
        leadingIcon && leadingIcon.$el.classList.add(className);
      },
      removeClassFromLeadingIcon: className => {
        const {
          leadingIcon
        } = this.$refs;
        leadingIcon && leadingIcon.$el.classList.remove(className);
      },
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      registerEventHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterEventHandler: (type, handler) => $el.removeEventListener(type, handler),
      registerTrailingIconInteractionHandler: (type, handler) => {
        const {
          trailingIcon
        } = this.$refs;
        trailingIcon && trailingIcon.addEventListener(type, handler);
      },
      deregisterTrailingIconInteractionHandler: (type, handler) => {
        const {
          trailingIcon
        } = this.$refs;
        trailingIcon && trailingIcon.removeEventListener(type, handler);
      },
      notifyInteraction: () => {
        const {
          filter,
          choice,
          select,
          deselect
        } = this.MDCChipSet; // Select for the v-model

        if (filter || choice) {
          const value = this.value || this.text;

          if (this.foundation.isSelected()) {
            deselect(value);
          } else {
            select(value);
          }
        } // Emit both native event and vue event


        emitCustomEvent(this.$el, INTERACTION_EVENT, {
          chip: this
        }, true);
        this.$emit('click');
      },
      notifyTrailingIconInteraction: () => this.emit('icon'),
      notifyRemoval: () => {
        emitCustomEvent(this.$el, REMOVAL_EVENT, {
          chip: this
        }, true);
      },
      getComputedStyleValue: prop => styles.getPropertyValue(prop),
      setStyleProperty: (prop, value) => $el.style.setProperty(prop, value)
    });
    this.foundation.init();
  },

  beforeDestroy() {
    this.foundation.destroy();
  }

};
/* script */

const __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-chip",
    attrs: {
      tabindex: "0"
    }
  }, [_vm.leadingIcon ? _c("mdc-icon", {
    ref: "leadingIcon",
    staticClass: "mdc-chip__icon--leading",
    attrs: {
      icon: _vm.leadingIcon
    }
  }) : _vm._e(), _vm.filter ? _c("div", {
    staticClass: "mdc-chip__checkmark"
  }, [_c("svg", {
    staticClass: "mdc-chip__checkmark-svg",
    attrs: {
      viewBox: "-2 -3 30 30"
    }
  }, [_c("path", {
    staticClass: "mdc-chip__checkmark-path",
    attrs: {
      fill: "none",
      stroke: "black",
      d: "M1.73,12.91 8.1,19.28 22.79,4.59"
    }
  })])]) : _vm._e(), _c("div", {
    staticClass: "mdc-chip__text"
  }, [_vm._v(_vm._s(_vm.text))]), _vm.trailingIcon ? _c("mdc-icon", {
    staticClass: "mdc-chip__icon--trailing",
    attrs: {
      icon: _vm.trailingIcon,
      action: "action"
    }
  }) : _vm._e()], 1);
};

var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;
/* style */

const __vue_inject_styles__$8 = undefined;
/* scoped */

const __vue_scope_id__$8 = undefined;
/* module identifier */

const __vue_module_identifier__$8 = undefined;
/* functional template */

const __vue_is_functional_template__$8 = false;
/* component normalizer */

function __vue_normalize__$8(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\chips\\Chip.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCChip$1 = __vue_normalize__$8({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, undefined, undefined); //


var script$9 = {
  name: 'MDCChipSet',

  provide() {
    return {
      MDCChipSet: {
        filter: this.filter,
        choice: this.choice,
        select: value => {
          const newValue = handleModel(this.selected, value, {
            checked: false,
            value
          });
          this.$emit('select', newValue);
        },
        deselect: value => {
          const newValue = handleModel(this.selected, '', {
            checked: true,
            value
          });
          this.$emit('select', newValue);
        }
      }
    };
  },

  model: {
    prop: 'selected',
    event: 'select'
  },
  props: {
    input: Boolean,
    choice: Boolean,
    filter: Boolean,
    selected: [Array, String]
  },
  computed: {
    cssClasses() {
      return {
        'mdc-chip-set--input': this.input,
        'mdc-chip-set--choice': this.choice,
        'mdc-chip-set--filter': this.filter
      };
    },

    $_transition() {
      return {
        name: null,
        enterClass: null,
        enterActiveClass: null,
        enterToClass: null,
        leaveClass: null,
        leaveActiveClass: 'mdc-chip--exit',
        leaveToClass: null
      };
    }

  },

  mounted() {
    const {
      $el
    } = this;
    this.foundation = new MDCChipSetFoundation({
      hasClass: className => $el.classList.contains(className),
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      appendChip: () => {},
      removeChip: () => {}
    });
    this.foundation.init();
  },

  beforeDestroy() {
    this.foundation.destroy();
  }

};
/* script */

const __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.input ? _c("transition-group", _vm._b({
    staticClass: "mdc-chip-set",
    class: _vm.cssClasses
  }, "transition-group", _vm.$_transition, false), [_vm._t("default")], 2) : _c("div", {
    staticClass: "mdc-chip-set",
    class: _vm.cssClasses
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;
/* style */

const __vue_inject_styles__$9 = undefined;
/* scoped */

const __vue_scope_id__$9 = undefined;
/* module identifier */

const __vue_module_identifier__$9 = undefined;
/* functional template */

const __vue_is_functional_template__$9 = false;
/* component normalizer */

function __vue_normalize__$9(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\chips\\ChipSet.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCChipSet$1 = __vue_normalize__$9({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, undefined, undefined);

function install$4(Vue, register) {
  register(MDCChip$1, MDCChipSet$1);
}

var Chips =
/*#__PURE__*/
Object.freeze({
  MDCChip: MDCChip$1,
  MDCChipSet: MDCChipSet$1,
  install: install$4
});
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses$4 = {
  ROOT: 'mdc-dialog',
  OPEN: 'mdc-dialog--open',
  ANIMATING: 'mdc-dialog--animating',
  BACKDROP: 'mdc-dialog__backdrop',
  SCROLL_LOCK: 'mdc-dialog-scroll-lock',
  ACCEPT_BTN: 'mdc-dialog__footer__button--accept',
  CANCEL_BTN: 'mdc-dialog__footer__button--cancel'
};
const strings$4 = {
  OPEN_DIALOG_SELECTOR: '.mdc-dialog--open',
  DIALOG_SURFACE_SELECTOR: '.mdc-dialog__surface',
  ACCEPT_SELECTOR: '.mdc-dialog__footer__button--accept',
  ACCEPT_EVENT: 'MDCDialog:accept',
  CANCEL_EVENT: 'MDCDialog:cancel'
};
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCDialogFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$4;
  }

  static get strings() {
    return strings$4;
  }

  static get defaultAdapter() {
    return {
      addClass: () =>
      /* className: string */
      {},
      removeClass: () =>
      /* className: string */
      {},
      addBodyClass: () =>
      /* className: string */
      {},
      removeBodyClass: () =>
      /* className: string */
      {},
      eventTargetHasClass: () =>
      /* target: EventTarget, className: string */

      /* boolean */
      false,
      registerInteractionHandler: () =>
      /* evt: string, handler: EventListener */
      {},
      deregisterInteractionHandler: () =>
      /* evt: string, handler: EventListener */
      {},
      registerSurfaceInteractionHandler: () =>
      /* evt: string, handler: EventListener */
      {},
      deregisterSurfaceInteractionHandler: () =>
      /* evt: string, handler: EventListener */
      {},
      registerDocumentKeydownHandler: () =>
      /* handler: EventListener */
      {},
      deregisterDocumentKeydownHandler: () =>
      /* handler: EventListener */
      {},
      registerTransitionEndHandler: () =>
      /* handler: EventListener */
      {},
      deregisterTransitionEndHandler: () =>
      /* handler: EventListener */
      {},
      notifyAccept: () => {},
      notifyCancel: () => {},
      trapFocusOnSurface: () => {},
      untrapFocusOnSurface: () => {},
      isDialog: () =>
      /* el: Element */

      /* boolean */
      false
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCDialogFoundation.defaultAdapter, adapter));
    this.isOpen_ = false;

    this.componentClickHandler_ = evt => {
      if (this.adapter_.eventTargetHasClass(evt.target, cssClasses$4.BACKDROP)) {
        this.cancel(true);
      }
    };

    this.dialogClickHandler_ = evt => this.handleDialogClick_(evt);

    this.documentKeydownHandler_ = evt => {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        this.cancel(true);
      }
    };

    this.transitionEndHandler_ = evt => this.handleTransitionEnd_(evt);
  }

  destroy() {
    // Ensure that dialog is cleaned up when destroyed
    if (this.isOpen_) {
      this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
      this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
      this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
      this.adapter_.untrapFocusOnSurface();
      this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
      this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
      this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
      this.enableScroll_();
    }
  }

  open() {
    this.isOpen_ = true;
    this.disableScroll_();
    this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.registerSurfaceInteractionHandler('click', this.dialogClickHandler_);
    this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
    this.adapter_.addClass(MDCDialogFoundation.cssClasses.OPEN);
  }

  close() {
    this.isOpen_ = false;
    this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
    this.adapter_.untrapFocusOnSurface();
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
    this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
  }

  isOpen() {
    return this.isOpen_;
  }

  accept(shouldNotify) {
    if (shouldNotify) {
      this.adapter_.notifyAccept();
    }

    this.close();
  }

  cancel(shouldNotify) {
    if (shouldNotify) {
      this.adapter_.notifyCancel();
    }

    this.close();
  }

  handleDialogClick_(evt) {
    const {
      target
    } = evt;

    if (this.adapter_.eventTargetHasClass(target, cssClasses$4.ACCEPT_BTN)) {
      this.accept(true);
    } else if (this.adapter_.eventTargetHasClass(target, cssClasses$4.CANCEL_BTN)) {
      this.cancel(true);
    }
  }

  handleTransitionEnd_(evt) {
    if (this.adapter_.isDialog(evt.target)) {
      this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
      this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);

      if (this.isOpen_) {
        this.adapter_.trapFocusOnSurface();
      } else {
        this.enableScroll_();
      }
    }
  }

  disableScroll_() {
    this.adapter_.addBodyClass(cssClasses$4.SCROLL_LOCK);
  }

  enableScroll_() {
    this.adapter_.removeBodyClass(cssClasses$4.SCROLL_LOCK);
  }

}

var tabbable = function (el, options) {
  options = options || {};
  var elementDocument = el.ownerDocument || el;
  var basicTabbables = [];
  var orderedTabbables = []; // A node is "available" if
  // - it's computed style

  var isUnavailable = createIsUnavailable(elementDocument);
  var candidateSelectors = ['input', 'select', 'a[href]', 'textarea', 'button', '[tabindex]'];
  var candidates = el.querySelectorAll(candidateSelectors.join(','));

  if (options.includeContainer) {
    var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

    if (candidateSelectors.some(function (candidateSelector) {
      return matches.call(el, candidateSelector);
    })) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var candidate, candidateIndex;

  for (var i = 0, l = candidates.length; i < l; i++) {
    candidate = candidates[i];
    candidateIndex = parseInt(candidate.getAttribute('tabindex'), 10) || candidate.tabIndex;

    if (candidateIndex < 0 || candidate.tagName === 'INPUT' && candidate.type === 'hidden' || candidate.disabled || isUnavailable(candidate, elementDocument)) {
      continue;
    }

    if (candidateIndex === 0) {
      basicTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        index: i,
        tabIndex: candidateIndex,
        node: candidate
      });
    }
  }

  var tabbableNodes = orderedTabbables.sort(function (a, b) {
    return a.tabIndex === b.tabIndex ? a.index - b.index : a.tabIndex - b.tabIndex;
  }).map(function (a) {
    return a.node;
  });
  Array.prototype.push.apply(tabbableNodes, basicTabbables);
  return tabbableNodes;
};

function createIsUnavailable(elementDocument) {
  // Node cache must be refreshed on every check, in case
  // the content of the element has changed
  var isOffCache = []; // "off" means `display: none;`, as opposed to "hidden",
  // which means `visibility: hidden;`. getComputedStyle
  // accurately reflects visiblity in context but not
  // "off" state, so we need to recursively check parents.

  function isOff(node, nodeComputedStyle) {
    if (node === elementDocument.documentElement) return false; // Find the cached node (Array.prototype.find not available in IE9)

    for (var i = 0, length = isOffCache.length; i < length; i++) {
      if (isOffCache[i][0] === node) return isOffCache[i][1];
    }

    nodeComputedStyle = nodeComputedStyle || elementDocument.defaultView.getComputedStyle(node);
    var result = false;

    if (nodeComputedStyle.display === 'none') {
      result = true;
    } else if (node.parentNode) {
      result = isOff(node.parentNode);
    }

    isOffCache.push([node, result]);
    return result;
  }

  return function isUnavailable(node) {
    if (node === elementDocument.documentElement) return false;
    var computedStyle = elementDocument.defaultView.getComputedStyle(node);
    if (isOff(node, computedStyle)) return true;
    return computedStyle.visibility === 'hidden';
  };
}

var listeningFocusTrap = null;

function focusTrap(element, userOptions) {
  var tabbableNodes = [];
  var firstTabbableNode = null;
  var lastTabbableNode = null;
  var nodeFocusedBeforeActivation = null;
  var active = false;
  var paused = false;
  var tabEvent = null;
  var container = typeof element === 'string' ? document.querySelector(element) : element;
  var config = userOptions || {};
  config.returnFocusOnDeactivate = userOptions && userOptions.returnFocusOnDeactivate !== undefined ? userOptions.returnFocusOnDeactivate : true;
  config.escapeDeactivates = userOptions && userOptions.escapeDeactivates !== undefined ? userOptions.escapeDeactivates : true;
  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause
  };
  return trap;

  function activate(activateOptions) {
    if (active) return;
    var defaultedActivateOptions = {
      onActivate: activateOptions && activateOptions.onActivate !== undefined ? activateOptions.onActivate : config.onActivate
    };
    active = true;
    paused = false;
    nodeFocusedBeforeActivation = document.activeElement;

    if (defaultedActivateOptions.onActivate) {
      defaultedActivateOptions.onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!active) return;
    var defaultedDeactivateOptions = {
      returnFocus: deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate,
      onDeactivate: deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate
    };
    removeListeners();

    if (defaultedDeactivateOptions.onDeactivate) {
      defaultedDeactivateOptions.onDeactivate();
    }

    if (defaultedDeactivateOptions.returnFocus) {
      setTimeout(function () {
        tryFocus(nodeFocusedBeforeActivation);
      }, 0);
    }

    active = false;
    paused = false;
    return this;
  }

  function pause() {
    if (paused || !active) return;
    paused = true;
    removeListeners();
  }

  function unpause() {
    if (!paused || !active) return;
    paused = false;
    addListeners();
  }

  function addListeners() {
    if (!active) return; // There can be only one listening focus trap at a time

    if (listeningFocusTrap) {
      listeningFocusTrap.pause();
    }

    listeningFocusTrap = trap;
    updateTabbableNodes();
    tryFocus(firstFocusNode());
    document.addEventListener('focus', checkFocus, true);
    document.addEventListener('click', checkClick, true);
    document.addEventListener('mousedown', checkPointerDown, true);
    document.addEventListener('touchstart', checkPointerDown, true);
    document.addEventListener('keydown', checkKey, true);
    return trap;
  }

  function removeListeners() {
    if (!active || listeningFocusTrap !== trap) return;
    document.removeEventListener('focus', checkFocus, true);
    document.removeEventListener('click', checkClick, true);
    document.removeEventListener('mousedown', checkPointerDown, true);
    document.removeEventListener('touchstart', checkPointerDown, true);
    document.removeEventListener('keydown', checkKey, true);
    listeningFocusTrap = null;
    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;

    if (!optionValue) {
      return null;
    }

    if (typeof optionValue === 'string') {
      node = document.querySelector(optionValue);

      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }

    if (typeof optionValue === 'function') {
      node = optionValue();

      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }

    return node;
  }

  function firstFocusNode() {
    var node;

    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(document.activeElement)) {
      node = document.activeElement;
    } else {
      node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error('You can\'t have a focus-trap without at least one focusable element');
    }

    return node;
  } // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event


  function checkPointerDown(e) {
    if (config.clickOutsideDeactivates && !container.contains(e.target)) {
      deactivate({
        returnFocus: false
      });
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function checkFocus(e) {
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation(); // Checking for a blur method here resolves a Firefox issue (#15)

    if (typeof e.target.blur === 'function') e.target.blur();

    if (tabEvent) {
      readjustFocus(tabEvent);
    }
  }

  function checkKey(e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      handleTab(e);
    }

    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      deactivate();
    }
  }

  function handleTab(e) {
    updateTabbableNodes();

    if (e.target.hasAttribute('tabindex') && Number(e.target.getAttribute('tabindex')) < 0) {
      return tabEvent = e;
    }

    e.preventDefault();
    var currentFocusIndex = tabbableNodes.indexOf(e.target);

    if (e.shiftKey) {
      if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {
        return tryFocus(lastTabbableNode);
      }

      return tryFocus(tabbableNodes[currentFocusIndex - 1]);
    }

    if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);
    tryFocus(tabbableNodes[currentFocusIndex + 1]);
  }

  function updateTabbableNodes() {
    tabbableNodes = tabbable(container);
    firstTabbableNode = tabbableNodes[0];
    lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
  }

  function readjustFocus(e) {
    if (e.shiftKey) return tryFocus(lastTabbableNode);
    tryFocus(firstTabbableNode);
  }
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function tryFocus(node) {
  if (!node || !node.focus) return;
  if (node === document.activeElement) return;
  node.focus();

  if (node.tagName.toLowerCase() === 'input') {
    node.select();
  }
}

var focusTrap_1 = focusTrap;
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function createFocusTrapInstance(surfaceEl, acceptButtonEl, focusTrapFactory = focusTrap_1) {
  return focusTrapFactory(surfaceEl, {
    initialFocus: acceptButtonEl,
    clickOutsideDeactivates: true
  });
}
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//


const transitionEnd = getCorrectEventName(window, 'transitionend');
var script$a = {
  name: 'MDCDialog',
  components: {
    MdcButton: MDCButton
  },
  props: {
    header: String,
    scroll: Boolean,
    valid: {
      type: Boolean,
      default: true
    },
    acceptText: {
      type: String,
      default: 'Ok'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    }
  },
  computed: {
    cssBodyClasses() {
      return this.scroll && 'mdc-dialog__body--scrollable';
    },

    hasContent() {
      return !!this.$slots.default;
    }

  },

  mounted() {
    const {
      $el
    } = this;
    const {
      accept,
      surface
    } = this.$refs;
    const focusTrap = createFocusTrapInstance(surface, accept);
    this.foundation = new MDCDialogFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      addBodyClass: className => document.body.classList.add(className),
      removeBodyClass: className => document.body.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      registerInteractionHandler: (evt, handler) => $el.addEventListener(evt, handler),
      deregisterInteractionHandler: (evt, handler) => $el.removeEventListener(evt, handler),
      registerSurfaceInteractionHandler: (evt, handler) => surface.addEventListener(evt, handler),
      deregisterSurfaceInteractionHandler: (evt, handler) => surface.removeEventListener(evt, handler),
      registerDocumentKeydownHandler: handler => document.addEventListener('keydown', handler),
      deregisterDocumentKeydownHandler: handler => document.removeEventListener('keydown', handler),
      registerTransitionEndHandler: handler => surface.addEventListener(transitionEnd, handler),
      deregisterTransitionEndHandler: handler => surface.removeEventListener(transitionEnd, handler),
      notifyAccept: () => {
        this.$emit('action', 'accept');
        this.$emit('accept');
      },
      notifyCancel: () => {
        this.$emit('action', 'cancel');
        this.$emit('cancel');
      },
      trapFocusOnSurface: () => focusTrap.activate(),
      untrapFocusOnSurface: () => focusTrap.deactivate(),
      isDialog: el => el === surface
    });
    this.foundation.init();
  },

  beforeDestroy() {
    this.foundation.destroy();
  },

  methods: {
    open() {
      if (!this.foundation.isOpen()) {
        this.foundation.open();
      }
    }

  }
};
/* script */

const __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("aside", {
    staticClass: "mdc-dialog",
    attrs: {
      role: "alertdialog"
    }
  }, [_c("div", {
    ref: "surface",
    staticClass: "mdc-dialog__surface"
  }, [_vm.header ? _c("header", {
    staticClass: "mdc-dialog__header"
  }, [_c("h2", {
    staticClass: "mdc-dialog__header__title"
  }, [_vm._v(_vm._s(_vm.header))])]) : _vm._e(), _vm.hasContent ? _c("section", {
    staticClass: "mdc-dialog__body",
    class: _vm.cssBodyClasses
  }, [_vm._t("default")], 2) : _vm._e(), _c("footer", {
    staticClass: "mdc-dialog__footer"
  }, [_c("mdc-button", {
    staticClass: "mdc-dialog__footer__button mdc-dialog__footer__button--cancel"
  }, [_vm._v(_vm._s(_vm.cancelText))]), _c("mdc-button", {
    ref: "accept",
    staticClass: "mdc-dialog__footer__button mdc-dialog__footer__button--accept",
    attrs: {
      disabled: !_vm.valid
    }
  }, [_vm._v(_vm._s(_vm.acceptText))])], 1)]), _c("div", {
    staticClass: "mdc-dialog__backdrop"
  })]);
};

var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;
/* style */

const __vue_inject_styles__$a = undefined;
/* scoped */

const __vue_scope_id__$a = undefined;
/* module identifier */

const __vue_module_identifier__$a = undefined;
/* functional template */

const __vue_is_functional_template__$a = false;
/* component normalizer */

function __vue_normalize__$a(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\dialog\\Dialog.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCDialog$1 = __vue_normalize__$a({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, undefined, undefined);

function install$5(Vue, register) {
  register(MDCDialog$1);
}

var Dialog =
/*#__PURE__*/
Object.freeze({
  MDCDialog: MDCDialog$1,
  install: install$5
});
const TYPES = ['permanent', 'persistent', 'temporary'];
var MDCDrawer = {
  name: 'MDCDrawer',
  functional: true,
  inheritAttrs: true,
  props: {
    type: {
      type: String,
      default: 'permanent'
    },
    temporary: Boolean,
    permanent: Boolean,
    persistent: Boolean
  },

  render(h, ctx) {
    const {
      props
    } = ctx;
    let type = props.type || TYPES.find(n => props[n] === true);

    if (!TYPES.includes(type)) {
      throw new Error('MDC Drawer: a valid type was not specified');
    }

    return h(`mdc-${type}-drawer`, ctx.data, ctx.children);
  }

}; //
//
//
//
//
//
//
//

var script$b = {
  name: 'MDCPermanentDrawer',
  props: {
    spacer: Boolean
  }
};
/* script */

const __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("nav", {
    staticClass: "mdc-drawer mdc-drawer--permanent mdc-typography"
  }, [_vm.spacer ? _c("div", {
    staticClass: "mdc-drawer__toolbar-spacer"
  }) : _vm._e(), _c("div", {
    staticClass: "mdc-drawer__content"
  }, [_c("nav", {
    staticClass: "mdc-list"
  }, [_vm._t("default")], 2)])]);
};

var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;
/* style */

const __vue_inject_styles__$b = undefined;
/* scoped */

const __vue_scope_id__$b = undefined;
/* module identifier */

const __vue_module_identifier__$b = undefined;
/* functional template */

const __vue_is_functional_template__$b = false;
/* component normalizer */

function __vue_normalize__$b(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\drawer\\PermanentDrawer.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCPermanentDrawer = __vue_normalize__$b({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, undefined, undefined);
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const TAB_DATA = 'data-mdc-tabindex';
const TAB_DATA_HANDLED = 'data-mdc-tabindex-handled';
let storedTransformPropertyName_;
let supportsPassive_$1; // Remap touch events to pointer events, if the browser doesn't support touch events.

function remapEvent(eventName, globalObj = window) {
  if (!('ontouchstart' in globalObj.document)) {
    switch (eventName) {
      case 'touchstart':
        return 'pointerdown';

      case 'touchmove':
        return 'pointermove';

      case 'touchend':
        return 'pointerup';

      default:
        return eventName;
    }
  }

  return eventName;
} // Choose the correct transform property to use on the current browser.


function getTransformPropertyName(globalObj = window, forceRefresh = false) {
  if (storedTransformPropertyName_ === undefined || forceRefresh) {
    const el = globalObj.document.createElement('div');
    const transformPropertyName = 'transform' in el.style ? 'transform' : '-webkit-transform';
    storedTransformPropertyName_ = transformPropertyName;
  }

  return storedTransformPropertyName_;
} // Determine whether the current browser supports CSS properties.


function supportsCssCustomProperties(globalObj = window) {
  if ('CSS' in globalObj) {
    return globalObj.CSS.supports('(--color: red)');
  }

  return false;
} // Determine whether the current browser supports passive event listeners, and if so, use them.


function applyPassive$1(globalObj = window, forceRefresh = false) {
  if (supportsPassive_$1 === undefined || forceRefresh) {
    let isSupported = false;

    try {
      globalObj.document.addEventListener('test', null, {
        get passive() {
          isSupported = true;
        }

      });
    } catch (e) {}

    supportsPassive_$1 = isSupported;
  }

  return supportsPassive_$1 ? {
    passive: true
  } : false;
} // Save the tab state for an element.


function saveElementTabState(el) {
  if (el.hasAttribute('tabindex')) {
    el.setAttribute(TAB_DATA, el.getAttribute('tabindex'));
  }

  el.setAttribute(TAB_DATA_HANDLED, true);
} // Restore the tab state for an element, if it was saved.


function restoreElementTabState(el) {
  // Only modify elements we've already handled, in case anything was dynamically added since we saved state.
  if (el.hasAttribute(TAB_DATA_HANDLED)) {
    if (el.hasAttribute(TAB_DATA)) {
      el.setAttribute('tabindex', el.getAttribute(TAB_DATA));
      el.removeAttribute(TAB_DATA);
    } else {
      el.removeAttribute('tabindex');
    }

    el.removeAttribute(TAB_DATA_HANDLED);
  }
}
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const FOCUSABLE_ELEMENTS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' + 'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCSlidableDrawerFoundation extends MDCFoundation {
  static get defaultAdapter() {
    return {
      addClass: () =>
      /* className: string */
      {},
      removeClass: () =>
      /* className: string */
      {},
      hasClass: () =>
      /* className: string */
      {},
      hasNecessaryDom: () =>
      /* boolean */
      false,
      registerInteractionHandler: () =>
      /* evt: string, handler: EventListener */
      {},
      deregisterInteractionHandler: () =>
      /* evt: string, handler: EventListener */
      {},
      registerDrawerInteractionHandler: () =>
      /* evt: string, handler: EventListener */
      {},
      deregisterDrawerInteractionHandler: () =>
      /* evt: string, handler: EventListener */
      {},
      registerTransitionEndHandler: () =>
      /* handler: EventListener */
      {},
      deregisterTransitionEndHandler: () =>
      /* handler: EventListener */
      {},
      registerDocumentKeydownHandler: () =>
      /* handler: EventListener */
      {},
      deregisterDocumentKeydownHandler: () =>
      /* handler: EventListener */
      {},
      setTranslateX: () =>
      /* value: number | null */
      {},
      getFocusableElements: () =>
      /* NodeList */
      {},
      saveElementTabState: () =>
      /* el: Element */
      {},
      restoreElementTabState: () =>
      /* el: Element */
      {},
      makeElementUntabbable: () =>
      /* el: Element */
      {},
      notifyOpen: () => {},
      notifyClose: () => {},
      isRtl: () =>
      /* boolean */
      false,
      getDrawerWidth: () =>
      /* number */
      0
    };
  }

  constructor(adapter, rootCssClass, animatingCssClass, openCssClass) {
    super(Object.assign(MDCSlidableDrawerFoundation.defaultAdapter, adapter));
    this.rootCssClass_ = rootCssClass;
    this.animatingCssClass_ = animatingCssClass;
    this.openCssClass_ = openCssClass;

    this.transitionEndHandler_ = evt => this.handleTransitionEnd_(evt);

    this.inert_ = false;

    this.componentTouchStartHandler_ = evt => this.handleTouchStart_(evt);

    this.componentTouchMoveHandler_ = evt => this.handleTouchMove_(evt);

    this.componentTouchEndHandler_ = evt => this.handleTouchEnd_(evt);

    this.documentKeydownHandler_ = evt => {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        this.close();
      }
    };
  }

  init() {
    const ROOT = this.rootCssClass_;
    const OPEN = this.openCssClass_;

    if (!this.adapter_.hasClass(ROOT)) {
      throw new Error(`${ROOT} class required in root element.`);
    }

    if (!this.adapter_.hasNecessaryDom()) {
      throw new Error(`Required DOM nodes missing in ${ROOT} component.`);
    }

    if (this.adapter_.hasClass(OPEN)) {
      this.isOpen_ = true;
    } else {
      this.detabinate_();
      this.isOpen_ = false;
    }

    this.adapter_.registerDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
    this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
    this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
  }

  destroy() {
    this.adapter_.deregisterDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
    this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
    this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_); // Deregister the document keydown handler just in case the component is destroyed while the menu is open.

    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
  }

  open() {
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.addClass(this.animatingCssClass_);
    this.adapter_.addClass(this.openCssClass_);
    this.retabinate_(); // Debounce multiple calls

    if (!this.isOpen_) {
      this.adapter_.notifyOpen();
    }

    this.isOpen_ = true;
  }

  close() {
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.addClass(this.animatingCssClass_);
    this.adapter_.removeClass(this.openCssClass_);
    this.detabinate_(); // Debounce multiple calls

    if (this.isOpen_) {
      this.adapter_.notifyClose();
    }

    this.isOpen_ = false;
  }

  isOpen() {
    return this.isOpen_;
  }
  /**
   *  Render all children of the drawer inert when it's closed.
   */


  detabinate_() {
    if (this.inert_) {
      return;
    }

    const elements = this.adapter_.getFocusableElements();

    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        this.adapter_.saveElementTabState(elements[i]);
        this.adapter_.makeElementUntabbable(elements[i]);
      }
    }

    this.inert_ = true;
  }
  /**
   *  Make all children of the drawer tabbable again when it's open.
   */


  retabinate_() {
    if (!this.inert_) {
      return;
    }

    const elements = this.adapter_.getFocusableElements();

    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        this.adapter_.restoreElementTabState(elements[i]);
      }
    }

    this.inert_ = false;
  }

  handleTouchStart_(evt) {
    if (!this.adapter_.hasClass(this.openCssClass_)) {
      return;
    }

    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.direction_ = this.adapter_.isRtl() ? -1 : 1;
    this.drawerWidth_ = this.adapter_.getDrawerWidth();
    this.startX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
    this.currentX_ = this.startX_;
    this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
  }

  handleTouchMove_(evt) {
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.currentX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
  }

  handleTouchEnd_(evt) {
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.prepareForTouchEnd_(); // Did the user close the drawer by more than 50%?

    if (Math.abs(this.newPosition_ / this.drawerWidth_) >= 0.5) {
      this.close();
    } else {
      // Triggering an open here means we'll get a nice animation back to the fully open state.
      this.open();
    }
  }

  prepareForTouchEnd_() {
    cancelAnimationFrame(this.updateRaf_);
    this.adapter_.setTranslateX(null);
  }

  updateDrawer_() {
    this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
    this.adapter_.setTranslateX(this.newPosition_);
  }

  get newPosition_() {
    let newPos = null;

    if (this.direction_ === 1) {
      newPos = Math.min(0, this.currentX_ - this.startX_);
    } else {
      newPos = Math.max(0, this.currentX_ - this.startX_);
    }

    return newPos;
  }

  isRootTransitioningEventTarget_() {
    // Classes extending MDCSlidableDrawerFoundation should implement this method to return true or false
    // if the event target is the root event target currently transitioning.
    return false;
  }

  handleTransitionEnd_(evt) {
    if (this.isRootTransitioningEventTarget_(evt.target)) {
      this.adapter_.removeClass(this.animatingCssClass_);
      this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
    }
  }

}
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const cssClasses$5 = {
  ROOT: 'mdc-drawer--temporary',
  OPEN: 'mdc-drawer--open',
  ANIMATING: 'mdc-drawer--animating',
  SCROLL_LOCK: 'mdc-drawer-scroll-lock'
};
const strings$5 = {
  DRAWER_SELECTOR: '.mdc-drawer--temporary .mdc-drawer__drawer',
  OPACITY_VAR_NAME: '--mdc-temporary-drawer-opacity',
  FOCUSABLE_ELEMENTS,
  OPEN_EVENT: 'MDCTemporaryDrawer:open',
  CLOSE_EVENT: 'MDCTemporaryDrawer:close'
};
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCTemporaryDrawerFoundation extends MDCSlidableDrawerFoundation {
  static get cssClasses() {
    return cssClasses$5;
  }

  static get strings() {
    return strings$5;
  }

  static get defaultAdapter() {
    return Object.assign(MDCSlidableDrawerFoundation.defaultAdapter, {
      addBodyClass: () =>
      /* className: string */
      {},
      removeBodyClass: () =>
      /* className: string */
      {},
      isDrawer: () => false,
      updateCssVariable: () =>
      /* value: string */
      {},
      eventTargetHasClass: () =>
      /* target: EventTarget, className: string */

      /* boolean */
      false
    });
  }

  constructor(adapter) {
    super(Object.assign(MDCTemporaryDrawerFoundation.defaultAdapter, adapter), MDCTemporaryDrawerFoundation.cssClasses.ROOT, MDCTemporaryDrawerFoundation.cssClasses.ANIMATING, MDCTemporaryDrawerFoundation.cssClasses.OPEN);

    this.componentClickHandler_ = evt => {
      if (this.adapter_.eventTargetHasClass(evt.target, cssClasses$5.ROOT)) {
        this.close(true);
      }
    };
  }

  init() {
    super.init(); // Make browser aware of custom property being used in this element.
    // Workaround for certain types of hard-to-reproduce heisenbugs.

    this.adapter_.updateCssVariable(0);
    this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
  }

  destroy() {
    super.destroy();
    this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
    this.enableScroll_();
  }

  open() {
    this.disableScroll_(); // Make sure custom property values are cleared before starting.

    this.adapter_.updateCssVariable('');
    super.open();
  }

  close() {
    // Make sure custom property values are cleared before making any changes.
    this.adapter_.updateCssVariable('');
    super.close();
  }

  prepareForTouchEnd_() {
    super.prepareForTouchEnd_();
    this.adapter_.updateCssVariable('');
  }

  updateDrawer_() {
    super.updateDrawer_();
    const newOpacity = Math.max(0, 1 + this.direction_ * (this.newPosition_ / this.drawerWidth_));
    this.adapter_.updateCssVariable(newOpacity);
  }

  isRootTransitioningEventTarget_(el) {
    return this.adapter_.isDrawer(el);
  }

  handleTransitionEnd_(evt) {
    super.handleTransitionEnd_(evt);

    if (!this.isOpen_) {
      this.enableScroll_();
    }
  }

  disableScroll_() {
    this.adapter_.addBodyClass(cssClasses$5.SCROLL_LOCK);
  }

  enableScroll_() {
    this.adapter_.removeBodyClass(cssClasses$5.SCROLL_LOCK);
  }

}
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const cssClasses$6 = {
  ROOT: 'mdc-drawer--persistent',
  OPEN: 'mdc-drawer--open',
  ANIMATING: 'mdc-drawer--animating'
};
const strings$6 = {
  DRAWER_SELECTOR: '.mdc-drawer--persistent .mdc-drawer__drawer',
  FOCUSABLE_ELEMENTS,
  OPEN_EVENT: 'MDCPersistentDrawer:open',
  CLOSE_EVENT: 'MDCPersistentDrawer:close'
};
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCPersistentDrawerFoundation extends MDCSlidableDrawerFoundation {
  static get cssClasses() {
    return cssClasses$6;
  }

  static get strings() {
    return strings$6;
  }

  static get defaultAdapter() {
    return Object.assign(MDCSlidableDrawerFoundation.defaultAdapter, {
      isDrawer: () => false
    });
  }

  constructor(adapter) {
    super(Object.assign(MDCPersistentDrawerFoundation.defaultAdapter, adapter), MDCPersistentDrawerFoundation.cssClasses.ROOT, MDCPersistentDrawerFoundation.cssClasses.ANIMATING, MDCPersistentDrawerFoundation.cssClasses.OPEN);
  }

  isRootTransitioningEventTarget_(el) {
    return this.adapter_.isDrawer(el);
  }

}
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Trigger resize on toggle


function triggerResize() {
  // Simple hack for triggering a resize to tell other elements to recalculate it's width/height.
  let event;

  try {
    event = new Event('resize');
  } catch (ex) {
    event = document.createEvent('UIEvents');
    event.initUIEvent('resize', true, false, window, 0);
  }

  window.dispatchEvent(event);
}

var DrawerMixin = {
  props: {
    open: Boolean,
    spacer: Boolean,
    header: String
  },
  methods: {
    toggle(emitResize = false) {
      if (this.foundation.isOpen()) {
        this.foundation.close();
      } else {
        this.foundation.open();
      } // Triggering a resize event after drawer changed state can help with the
      // resizing of the content if the content has 'flexed'.


      if (emitResize) {
        triggerResize();
      }
    }

  }
}; //

var script$c = {
  name: 'MDCPersistentDrawer',
  mixins: [DrawerMixin],

  mounted() {
    const {
      $el
    } = this;
    const {
      drawer
    } = this.$refs;
    const {
      FOCUSABLE_ELEMENTS
    } = MDCPersistentDrawerFoundation.strings;
    const styles = getComputedStyle($el);
    this.foundation = new MDCPersistentDrawerFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      hasNecessaryDom: () => !!drawer,
      registerInteractionHandler: (evt, handler) => $el.addEventListener(remapEvent(evt), handler, applyPassive$1()),
      deregisterInteractionHandler: (evt, handler) => $el.removeEventListener(remapEvent(evt), handler, applyPassive$1()),
      registerDrawerInteractionHandler: (evt, handler) => drawer.addEventListener(remapEvent(evt), handler),
      deregisterDrawerInteractionHandler: (evt, handler) => drawer.removeEventListener(remapEvent(evt), handler),
      registerTransitionEndHandler: handler => $el.addEventListener('transitionend', handler),
      deregisterTransitionEndHandler: handler => $el.removeEventListener('transitionend', handler),
      registerDocumentKeydownHandler: handler => document.addEventListener('keydown', handler),
      deregisterDocumentKeydownHandler: handler => document.removeEventListener('keydown', handler),
      getDrawerWidth: () => drawer.offsetWidth,
      setTranslateX: value => {
        const prop = getTransformPropertyName();
        drawer.style[prop] = value === null ? null : `translateX(${value}px)`;
      },
      getFocusableElements: () => drawer.querySelectorAll(FOCUSABLE_ELEMENTS),
      saveElementTabState: el => saveElementTabState(el),
      restoreElementTabState: el => restoreElementTabState(el),
      makeElementUntabbable: el => el.setAttribute('tabindex', -1),
      notifyOpen: () => this.$emit('open'),
      notifyClose: () => this.$emit('close'),
      isRtl: () => styles.direction === 'rtl',
      isDrawer: el => el === drawer
    });
    this.foundation.init(); // Initial open state

    this.open && this.foundation.open();
  }

};
/* script */

const __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("aside", {
    staticClass: "mdc-drawer mdc-drawer--persistent"
  }, [_c("nav", {
    ref: "drawer",
    staticClass: "mdc-drawer__drawer"
  }, [_vm.spacer ? _c("div", {
    staticClass: "mdc-drawer__toolbar-spacer"
  }) : _vm._e(), _vm.header ? _c("header", {
    staticClass: "mdc-drawer__header"
  }, [_c("div", {
    staticClass: "mdc-drawer__header-content"
  }, [_vm._v(_vm._s(_vm.header))])]) : _vm._e(), _c("nav", {
    staticClass: "mdc-drawer__content mdc-list"
  }, [_vm._t("default")], 2)])]);
};

var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;
/* style */

const __vue_inject_styles__$c = undefined;
/* scoped */

const __vue_scope_id__$c = undefined;
/* module identifier */

const __vue_module_identifier__$c = undefined;
/* functional template */

const __vue_is_functional_template__$c = false;
/* component normalizer */

function __vue_normalize__$c(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\drawer\\PersistentDrawer.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCPersistentDrawer$1 = __vue_normalize__$c({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, undefined, undefined); //


var script$d = {
  name: 'MDCTemporaryDrawer',
  mixins: [DrawerMixin],

  mounted() {
    const {
      $el
    } = this;
    const {
      drawer
    } = this.$refs;
    const {
      FOCUSABLE_ELEMENTS,
      OPACITY_VAR_NAME
    } = MDCTemporaryDrawerFoundation.strings;
    const styles = getComputedStyle($el);
    this.foundation = new MDCTemporaryDrawerFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      addBodyClass: className => document.body.classList.add(className),
      removeBodyClass: className => document.body.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      hasNecessaryDom: () => !!drawer,
      registerInteractionHandler: (evt, handler) => $el.addEventListener(remapEvent(evt), handler, applyPassive$1()),
      deregisterInteractionHandler: (evt, handler) => $el.removeEventListener(remapEvent(evt), handler, applyPassive$1()),
      registerDrawerInteractionHandler: (evt, handler) => drawer.addEventListener(remapEvent(evt), handler),
      deregisterDrawerInteractionHandler: (evt, handler) => drawer.removeEventListener(remapEvent(evt), handler),
      registerTransitionEndHandler: handler => drawer.addEventListener('transitionend', handler),
      deregisterTransitionEndHandler: handler => drawer.removeEventListener('transitionend', handler),
      registerDocumentKeydownHandler: handler => document.addEventListener('keydown', handler),
      deregisterDocumentKeydownHandler: handler => document.removeEventListener('keydown', handler),
      getDrawerWidth: () => drawer.offsetWidth,
      setTranslateX: value => {
        const prop = getTransformPropertyName();
        drawer.style[prop] = value === null ? null : `translateX(${value}px)`;
      },
      updateCssVariable: value => {
        if (supportsCssCustomProperties()) {
          $el.style.setProperty(OPACITY_VAR_NAME, value);
        }
      },
      getFocusableElements: () => drawer.querySelectorAll(FOCUSABLE_ELEMENTS),
      saveElementTabState: el => saveElementTabState(el),
      restoreElementTabState: el => restoreElementTabState(el),
      makeElementUntabbable: el => el.setAttribute('tabindex', -1),
      notifyOpen: () => this.$emit('open'),
      notifyClose: () => this.$emit('close'),
      isRtl: () => styles.direction === 'rtl',
      isDrawer: el => el === drawer
    });
    this.foundation.init(); // Initial open state

    this.open && this.foundation.open();
  }

};
/* script */

const __vue_script__$d = script$d;
/* template */

var __vue_render__$d = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("aside", {
    staticClass: "mdc-drawer mdc-drawer--temporary"
  }, [_c("nav", {
    ref: "drawer",
    staticClass: "mdc-drawer__drawer"
  }, [_vm.header ? _c("header", {
    staticClass: "mdc-drawer__header"
  }, [_c("div", {
    staticClass: "mdc-drawer__header-content"
  }, [_vm._v(_vm._s(_vm.header))])]) : _vm._e(), _c("nav", {
    staticClass: "mdc-drawer__content mdc-list"
  }, [_vm._t("default")], 2)])]);
};

var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;
/* style */

const __vue_inject_styles__$d = undefined;
/* scoped */

const __vue_scope_id__$d = undefined;
/* module identifier */

const __vue_module_identifier__$d = undefined;
/* functional template */

const __vue_is_functional_template__$d = false;
/* component normalizer */

function __vue_normalize__$d(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\drawer\\TemporaryDrawer.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCTemporaryDrawer$1 = __vue_normalize__$d({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, undefined, undefined);

const MDCLink = {
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'a'
    },
    link: String,
    to: String,
    replace: Boolean,
    append: Boolean,
    exact: Boolean
  },

  render(h, ctx) {
    const {
      data,
      props
    } = ctx;
    let tag = props.tag;

    if (props.to) {
      tag = 'router-link'; // remove the link

      data.props = Object.assign({}, props, {
        link: undefined
      });
    } else {
      if (tag === 'a') {
        data.attrs.href = props.link;
      }
    }

    return h(tag, data, ctx.children);
  }

};

function install$6(activeClass, exactActiveClass) {
  return {
    components: {
      MdcLink: MDCLink
    },
    props: {
      to: String,
      replace: Boolean,
      append: Boolean,
      exact: Boolean
    },
    computed: {
      $_link() {
        return this.to && {
          activeClass,
          exactActiveClass,
          to: this.to,
          replace: this.replace,
          append: this.append,
          exact: this.exact
        };
      }

    }
  };
} //


var script$e = {
  name: 'MDCDrawerItem',
  mixins: [Ripple(), install$6('mdc-list-item--activated')],
  props: {
    link: String,
    text: {
      type: String,
      required: true
    }
  }
};
/* script */

const __vue_script__$e = script$e;
/* template */

var __vue_render__$e = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("mdc-link", _vm._g(_vm._b({
    staticClass: "mdc-list-item",
    attrs: {
      tag: "a",
      link: _vm.link
    }
  }, "mdc-link", _vm.$_link, false), _vm.$listeners), [_vm._t("graphic"), _vm._v(_vm._s(_vm.text))], 2);
};

var __vue_staticRenderFns__$e = [];
__vue_render__$e._withStripped = true;
/* style */

const __vue_inject_styles__$e = undefined;
/* scoped */

const __vue_scope_id__$e = undefined;
/* module identifier */

const __vue_module_identifier__$e = undefined;
/* functional template */

const __vue_is_functional_template__$e = false;
/* component normalizer */

function __vue_normalize__$e(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\drawer\\DrawerItem.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCDrawerItem = __vue_normalize__$e({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, undefined, undefined); //
//
//
//


var script$f = {
  name: 'MDCDrawerDivider'
};
/* script */

const __vue_script__$f = script$f;
/* template */

var __vue_render__$f = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("hr", {
    staticClass: "mdc-list-divider"
  });
};

var __vue_staticRenderFns__$f = [];
__vue_render__$f._withStripped = true;
/* style */

const __vue_inject_styles__$f = undefined;
/* scoped */

const __vue_scope_id__$f = undefined;
/* module identifier */

const __vue_module_identifier__$f = undefined;
/* functional template */

const __vue_is_functional_template__$f = false;
/* component normalizer */

function __vue_normalize__$f(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\drawer\\DrawerDivider.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCDrawerDivider = __vue_normalize__$f({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, undefined, undefined);

function install$7(Vue, register) {
  register(MDCDrawer, MDCPermanentDrawer, MDCPersistentDrawer$1, MDCTemporaryDrawer$1, MDCDrawerItem, MDCDrawerDivider);
}

var Drawer =
/*#__PURE__*/
Object.freeze({
  MDCPermanentDrawer: MDCPermanentDrawer,
  MDCPersistentDrawer: MDCPersistentDrawer$1,
  MDCTemporaryDrawer: MDCTemporaryDrawer$1,
  MDCDrawerItem: MDCDrawerItem,
  MDCDrawerDivider: MDCDrawerDivider,
  install: install$7
}); //

var script$g = {
  name: 'MDCFab',
  mixins: [Ripple()],
  props: {
    mini: Boolean,
    exited: Boolean,
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    cssClasses() {
      return {
        'mdc-fab--mini': this.mini,
        'mdc-fab--exited': this.exited
      };
    }

  }
};
/* script */

const __vue_script__$g = script$g;
/* template */

var __vue_render__$g = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("button", {
    staticClass: "mdc-fab material-icons",
    class: _vm.cssClasses,
    attrs: {
      "aria-label": _vm.label,
      title: _vm.label
    }
  }, [_c("span", {
    staticClass: "mdc-fab__icon"
  }, [_vm._v(_vm._s(_vm.icon))])]);
};

var __vue_staticRenderFns__$g = [];
__vue_render__$g._withStripped = true;
/* style */

const __vue_inject_styles__$g = undefined;
/* scoped */

const __vue_scope_id__$g = undefined;
/* module identifier */

const __vue_module_identifier__$g = undefined;
/* functional template */

const __vue_is_functional_template__$g = false;
/* component normalizer */

function __vue_normalize__$g(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\fab\\Fab.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCFab = __vue_normalize__$g({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, undefined, undefined);

function install$8(Vue, register) {
  register(MDCFab);
}

var Fab =
/*#__PURE__*/
Object.freeze({
  MDCFab: MDCFab,
  install: install$8
}); //
//
//
//
//
//

var script$h = {
  name: 'MDCFormField',
  props: {
    label: {
      type: String,
      required: true
    },
    for: String,
    alignEnd: Boolean
  },
  computed: {
    cssClasses() {
      return this.alignEnd && 'mdc-form-field--align-end';
    }

  }
};
/* script */

const __vue_script__$h = script$h;
/* template */

var __vue_render__$h = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-form-field",
    class: _vm.cssClasses
  }, [_vm._t("default"), _c("label", [_vm._v(_vm._s(_vm.label))])], 2);
};

var __vue_staticRenderFns__$h = [];
__vue_render__$h._withStripped = true;
/* style */

const __vue_inject_styles__$h = undefined;
/* scoped */

const __vue_scope_id__$h = undefined;
/* module identifier */

const __vue_module_identifier__$h = undefined;
/* functional template */

const __vue_is_functional_template__$h = false;
/* component normalizer */

function __vue_normalize__$h(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\form-field\\FormField.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCFormField = __vue_normalize__$h({
  render: __vue_render__$h,
  staticRenderFns: __vue_staticRenderFns__$h
}, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, undefined, undefined);

function install$9(Vue, register) {
  register(MDCFormField);
}

var FormField =
/*#__PURE__*/
Object.freeze({
  MDCFormField: MDCFormField,
  install: install$9
});
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const strings$7 = {
  TILES_SELECTOR: '.mdc-grid-list__tiles',
  TILE_SELECTOR: '.mdc-grid-tile'
};
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCGridListFoundation extends MDCFoundation {
  static get strings() {
    return strings$7;
  }

  static get defaultAdapter() {
    return {
      getOffsetWidth: () =>
      /* number */
      0,
      getNumberOfTiles: () =>
      /* number */
      0,
      getOffsetWidthForTileAtIndex: () =>
      /* index: number */

      /* number */
      0,
      setStyleForTilesElement: () =>
      /* property: string, value: string */
      {},
      registerResizeHandler: () =>
      /* handler: EventListener */
      {},
      deregisterResizeHandler: () =>
      /* handler: EventListener */
      {}
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCGridListFoundation.defaultAdapter, adapter));

    this.resizeHandler_ = () => this.alignCenter();

    this.resizeFrame_ = 0;
  }

  init() {
    this.alignCenter();
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  }

  destroy() {
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  }

  alignCenter() {
    if (this.resizeFrame_ !== 0) {
      cancelAnimationFrame(this.resizeFrame_);
    }

    this.resizeFrame_ = requestAnimationFrame(() => {
      this.alignCenter_();
      this.resizeFrame_ = 0;
    });
  }

  alignCenter_() {
    if (this.adapter_.getNumberOfTiles() == 0) {
      return;
    }

    const gridWidth = this.adapter_.getOffsetWidth();
    const itemWidth = this.adapter_.getOffsetWidthForTileAtIndex(0);
    const tilesWidth = itemWidth * Math.floor(gridWidth / itemWidth);
    this.adapter_.setStyleForTilesElement('width', `${tilesWidth}px`);
  }

}
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//


const RATIOS = ['1x1', '16x9', '2x3', '3x2', '4x3', '3x4'];
var script$i = {
  name: 'MDCGridList',
  props: {
    headerCaption: Boolean,
    twoline: Boolean,
    iconAlignEnd: Boolean,
    iconAlignStart: Boolean,
    thinGutter: Boolean,
    ratio: {
      type: String,
      validator: value => RATIOS.includes(value)
    }
  },

  mounted() {
    const {
      $el
    } = this;
    const {
      tiles
    } = this.$refs;
    this.foundation = new MDCGridListFoundation({
      getOffsetWidth: () => $el.offsetWidth,
      getNumberOfTiles: () => tiles.children.length,
      getOffsetWidthForTileAtIndex: index => tiles.children[index].offsetWidth,
      setStyleForTilesElement: (prop, value) => tiles.style[prop] = value,
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler)
    });
    this.foundation.init();
  },

  beforeDestroy() {
    this.foundation.destroy();
  },

  computed: {
    cssClasses() {
      const classes = {
        'mdc-grid-list--tile-gutter-1': this.thinGutter,
        'mdc-grid-list--header-caption': this.captions,
        'mdc-grid-list--twoline-caption': this.twoline,
        'mdc-grid-list--with-icon-align-start': this.iconAlignStart,
        'mdc-grid-list--with-icon-align-end': this.iconAlignEnd
      };

      if (this.aspect) {
        classes[`mdc-grid-list--tile-aspect-${this.ratio}`] = true;
      }

      return classes;
    }

  }
};
/* script */

const __vue_script__$i = script$i;
/* template */

var __vue_render__$i = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-grid-list"
  }, [_c("ul", {
    ref: "tiles",
    staticClass: "mdc-grid-list__tiles"
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$i = [];
__vue_render__$i._withStripped = true;
/* style */

const __vue_inject_styles__$i = undefined;
/* scoped */

const __vue_scope_id__$i = undefined;
/* module identifier */

const __vue_module_identifier__$i = undefined;
/* functional template */

const __vue_is_functional_template__$i = false;
/* component normalizer */

function __vue_normalize__$i(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\grid-list\\GridList.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCGridList$1 = __vue_normalize__$i({
  render: __vue_render__$i,
  staticRenderFns: __vue_staticRenderFns__$i
}, __vue_inject_styles__$i, __vue_script__$i, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, undefined, undefined); //


var script$j = {
  name: 'MDCGridTile',
  components: {
    MdcIcon: MDCIcon
  },
  props: {
    cover: Boolean,
    title: String,
    text: String,
    icon: String,
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    coverStyle() {
      return `background-image: url(${src})`;
    },

    hasSecondary() {
      return this.text || this.title || this.icon;
    }

  }
};
/* script */

const __vue_script__$j = script$j;
/* template */

var __vue_render__$j = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("li", {
    staticClass: "mdc-grid-tile"
  }, [_c("div", {
    staticClass: "mdc-grid-tile__primary"
  }, [_vm.cover ? _c("div", {
    staticClass: "mdc-grid-tile__primary-content",
    style: _vm.coverStyle
  }) : _c("img", {
    staticClass: "mdc-grid-tile__primary-content",
    attrs: {
      src: _vm.src
    }
  })]), _vm.hasSecondary ? _c("span", {
    staticClass: "mdc-grid-tile__secondary"
  }, [_vm.icon ? _c("mdc-icon", {
    attrs: {
      name: "grid-tile",
      icon: _vm.icon
    }
  }) : _vm._e(), _vm.title ? _c("span", {
    staticClass: "mdc-grid-tile__title"
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm.text ? _c("span", {
    staticClass: "mdc-grid-tile__support-text"
  }, [_vm._v(_vm._s(_vm.text))]) : _vm._e()], 1) : _vm._e()]);
};

var __vue_staticRenderFns__$j = [];
__vue_render__$j._withStripped = true;
/* style */

const __vue_inject_styles__$j = undefined;
/* scoped */

const __vue_scope_id__$j = undefined;
/* module identifier */

const __vue_module_identifier__$j = undefined;
/* functional template */

const __vue_is_functional_template__$j = false;
/* component normalizer */

function __vue_normalize__$j(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\grid-list\\GridTile.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCGridTile = __vue_normalize__$j({
  render: __vue_render__$j,
  staticRenderFns: __vue_staticRenderFns__$j
}, __vue_inject_styles__$j, __vue_script__$j, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, undefined, undefined);

function install$a(Vue, register) {
  register(MDCGridList$1, MDCGridTile);
}

var GridList =
/*#__PURE__*/
Object.freeze({
  MDCGridList: MDCGridList$1,
  MDCGridTile: MDCGridTile,
  install: install$a
});
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */

const cssClasses$7 = {
  ROOT: 'mdc-icon-toggle',
  DISABLED: 'mdc-icon-toggle--disabled'
};
/** @enum {string} */

const strings$8 = {
  DATA_TOGGLE_ON: 'data-toggle-on',
  DATA_TOGGLE_OFF: 'data-toggle-off',
  ARIA_PRESSED: 'aria-pressed',
  ARIA_DISABLED: 'aria-disabled',
  ARIA_LABEL: 'aria-label',
  CHANGE_EVENT: 'MDCIconToggle:change'
};
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCIconToggleAdapter>}
 */

class MDCIconToggleFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$7;
  }

  static get strings() {
    return strings$8;
  }

  static get defaultAdapter() {
    return {
      addClass: () =>
      /* className: string */
      {},
      removeClass: () =>
      /* className: string */
      {},
      registerInteractionHandler: () =>
      /* type: string, handler: EventListener */
      {},
      deregisterInteractionHandler: () =>
      /* type: string, handler: EventListener */
      {},
      setText: () =>
      /* text: string */
      {},
      getTabIndex: () =>
      /* number */
      0,
      setTabIndex: () =>
      /* tabIndex: number */
      {},
      getAttr: () =>
      /* name: string */

      /* string */
      '',
      setAttr: () =>
      /* name: string, value: string */
      {},
      rmAttr: () =>
      /* name: string */
      {},
      notifyChange: () =>
      /* evtData: IconToggleEvent */
      {}
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCIconToggleFoundation.defaultAdapter, adapter));
    /** @private {boolean} */

    this.on_ = false;
    /** @private {boolean} */

    this.disabled_ = false;
    /** @private {number} */

    this.savedTabIndex_ = -1;
    /** @private {?IconToggleState} */

    this.toggleOnData_ = null;
    /** @private {?IconToggleState} */

    this.toggleOffData_ = null;

    this.clickHandler_ =
    /** @private {!EventListener} */
    () => this.toggleFromEvt_();
    /** @private {boolean} */


    this.isHandlingKeydown_ = false;

    this.keydownHandler_ =
    /** @private {!EventListener} */

    /** @type {!KeyboardKey} */
    evt => {
      if (isSpace(evt)) {
        this.isHandlingKeydown_ = true;
        return evt.preventDefault();
      }
    };

    this.keyupHandler_ =
    /** @private {!EventListener} */

    /** @type {!KeyboardKey} */
    evt => {
      if (isSpace(evt)) {
        this.isHandlingKeydown_ = false;
        this.toggleFromEvt_();
      }
    };
  }

  init() {
    this.refreshToggleData();
    this.savedTabIndex_ = this.adapter_.getTabIndex();
    this.adapter_.registerInteractionHandler('click', this.clickHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
  }

  refreshToggleData() {
    const {
      DATA_TOGGLE_ON,
      DATA_TOGGLE_OFF
    } = MDCIconToggleFoundation.strings;
    this.toggleOnData_ = this.parseJsonDataAttr_(DATA_TOGGLE_ON);
    this.toggleOffData_ = this.parseJsonDataAttr_(DATA_TOGGLE_OFF);
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
  }
  /** @private */


  toggleFromEvt_() {
    this.toggle();
    const {
      on_: isOn
    } = this;
    this.adapter_.notifyChange(
    /** @type {!IconToggleEvent} */
    {
      isOn
    });
  }
  /** @return {boolean} */


  isOn() {
    return this.on_;
  }
  /** @param {boolean=} isOn */


  toggle(isOn = !this.on_) {
    this.on_ = isOn;
    const {
      ARIA_LABEL,
      ARIA_PRESSED
    } = MDCIconToggleFoundation.strings;

    if (this.on_) {
      this.adapter_.setAttr(ARIA_PRESSED, 'true');
    } else {
      this.adapter_.setAttr(ARIA_PRESSED, 'false');
    }

    const {
      cssClass: classToRemove
    } = this.on_ ? this.toggleOffData_ : this.toggleOnData_;

    if (classToRemove) {
      this.adapter_.removeClass(classToRemove);
    }

    const {
      content,
      label,
      cssClass
    } = this.on_ ? this.toggleOnData_ : this.toggleOffData_;

    if (cssClass) {
      this.adapter_.addClass(cssClass);
    }

    if (content) {
      this.adapter_.setText(content);
    }

    if (label) {
      this.adapter_.setAttr(ARIA_LABEL, label);
    }
  }
  /**
   * @param {string} dataAttr
   * @return {!IconToggleState}
   */


  parseJsonDataAttr_(dataAttr) {
    const val = this.adapter_.getAttr(dataAttr);

    if (!val) {
      return {};
    }

    return (
      /** @type {!IconToggleState} */
      JSON.parse(val)
    );
  }
  /** @return {boolean} */


  isDisabled() {
    return this.disabled_;
  }
  /** @param {boolean} isDisabled */


  setDisabled(isDisabled) {
    this.disabled_ = isDisabled;
    const {
      DISABLED
    } = MDCIconToggleFoundation.cssClasses;
    const {
      ARIA_DISABLED
    } = MDCIconToggleFoundation.strings;

    if (this.disabled_) {
      this.savedTabIndex_ = this.adapter_.getTabIndex();
      this.adapter_.setTabIndex(-1);
      this.adapter_.setAttr(ARIA_DISABLED, 'true');
      this.adapter_.addClass(DISABLED);
    } else {
      this.adapter_.setTabIndex(this.savedTabIndex_);
      this.adapter_.rmAttr(ARIA_DISABLED);
      this.adapter_.removeClass(DISABLED);
    }
  }
  /** @return {boolean} */


  isKeyboardActivated() {
    return this.isHandlingKeydown_;
  }

}
/**
 * @param {!KeyboardKey} keyboardKey
 * @return {boolean}
 */


function isSpace(keyboardKey) {
  return keyboardKey.key === 'Space' || keyboardKey.keyCode === 32;
}
/** @record */


class IconToggleState {}
/**
 * The aria-label value of the icon toggle, or undefined if there is no aria-label.
 * @export {string|undefined}
 */


IconToggleState.prototype.label;
/**
 * The text for the icon toggle, or undefined if there is no text.
 * @export {string|undefined}
 */

IconToggleState.prototype.content;
/**
 * The CSS class to add to the icon toggle, or undefined if there is no CSS class.
 * @export {string|undefined}
 */

IconToggleState.prototype.cssClass;
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//

const rippleAdapter$1 = {
  isSurfaceActive() {
    return this.foundation.isKeyboardActivated();
  }

};
var script$k = {
  name: 'MDCIconToggle',
  mixins: [Ripple(rippleAdapter$1, {
    unbounded: true
  })],
  props: {
    active: Boolean,
    disabled: Boolean,
    on: {
      type: Object,
      required: true
    },
    off: {
      type: Object,
      required: true
    }
  },
  model: {
    prop: 'active',
    event: 'change'
  },
  watch: {
    active(value) {
      this.foundation.toggle(this.active);
    },

    disabled(value) {
      this.foundation.setDisabled(this.disabled);
    },

    on(value) {
      this.foundation.toggleOnData_ = this.on;
    },

    off(value) {
      this.foundation.toggleOffData_ = this.off;
    }

  },

  mounted() {
    const {
      $el
    } = this;

    const findIcon = () => {
      const selector = $el.dataset.iconInnerSelector;
      return selector ? $el.querySelector(selector) : $el;
    };

    this.foundation = new MDCIconToggleFoundation({
      addClass: className => findIcon().classList.add(className),
      removeClass: className => findIcon().classList.remove(className),
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      setText: text => findIcon().textContent = text,
      getTabIndex: () => $el.tabIndex,
      setTabIndex: tabIndex => $el.tabIndex = tabIndex,
      getAttr: (name, value) => $el.getAttribute(name, value),
      setAttr: (name, value) => $el.setAttribute(name, value),
      rmAttr: name => $el.removeAttribute(name),
      notifyChange: data => this.$emit('change', data)
    });
    this.foundation.init(); // Set data here instead of using the data attributes

    this.foundation.toggleOnData_ = this.on;
    this.foundation.toggleOffData_ = this.off; // Sync with dom here

    this.foundation.toggle(this.active);
    this.foundation.setDisabled(this.disabled);
  },

  beforeDestroy() {
    this.foundation.destroy();
  }

};
/* script */

const __vue_script__$k = script$k;
/* template */

var __vue_render__$k = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("i", {
    staticClass: "mdc-icon-toggle material-icons",
    attrs: {
      role: "button",
      tabindex: "0"
    }
  });
};

var __vue_staticRenderFns__$k = [];
__vue_render__$k._withStripped = true;
/* style */

const __vue_inject_styles__$k = undefined;
/* scoped */

const __vue_scope_id__$k = undefined;
/* module identifier */

const __vue_module_identifier__$k = undefined;
/* functional template */

const __vue_is_functional_template__$k = false;
/* component normalizer */

function __vue_normalize__$k(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\icon-toggle\\IconToggle.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCIconToggle$1 = __vue_normalize__$k({
  render: __vue_render__$k,
  staticRenderFns: __vue_staticRenderFns__$k
}, __vue_inject_styles__$k, __vue_script__$k, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, undefined, undefined);

function install$b(Vue, register) {
  register(MDCIconToggle$1);
}

var IconToggle =
/*#__PURE__*/
Object.freeze({
  MDCIconToggle: MDCIconToggle$1,
  install: install$b
}); //
//
//
//
//
//

var script$l = {
  name: 'MDCLayoutGrid',
  props: {
    fixedColumnWidth: Boolean,
    alignLeft: Boolean,
    alignRight: Boolean
  },
  computed: {
    cssClasses() {
      return {
        'mdc-layout-grid--fixed-column-width': this.fixedColumnWidth,
        'mdc-layout-grid--align-left': this.alignLeft,
        'mdc-layout-grid--align-right': this.alignRight
      };
    }

  }
};
/* script */

const __vue_script__$l = script$l;
/* template */

var __vue_render__$l = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-layout-grid",
    class: _vm.cssClasses
  }, [_c("div", {
    staticClass: "mdc-layout-grid__inner"
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$l = [];
__vue_render__$l._withStripped = true;
/* style */

const __vue_inject_styles__$l = undefined;
/* scoped */

const __vue_scope_id__$l = undefined;
/* module identifier */

const __vue_module_identifier__$l = undefined;
/* functional template */

const __vue_is_functional_template__$l = false;
/* component normalizer */

function __vue_normalize__$l(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\layout-grid\\LayoutGrid.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCLayoutGrid = __vue_normalize__$l({
  render: __vue_render__$l,
  staticRenderFns: __vue_staticRenderFns__$l
}, __vue_inject_styles__$l, __vue_script__$l, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, undefined, undefined); //
//
//
//
//


const ALIGNMENTS = ['top', 'bottom', 'middle'];

const spanValidator = value => value >= 1 && value <= 12;

var script$m = {
  name: 'MDCLayoutCell',
  props: {
    span: {
      type: [Number, String],
      validator: spanValidator
    },
    desktop: {
      type: [Number, String],
      validator: spanValidator
    },
    tablet: {
      type: [Number, String],
      validator: spanValidator
    },
    phone: {
      type: [Number, String],
      validator: spanValidator
    },
    order: {
      type: [Number, String],
      validator: spanValidator
    },
    align: {
      type: String,
      validator: value => ALIGNMENTS.includes(value)
    }
  },
  computed: {
    cssClasses() {
      return [this.span && `mdc-layout-grid__cell--span-${this.span}`, this.desktop && `mdc-layout-grid__cell--span-${this.desktop}-desktop`, this.tablet && `mdc-layout-grid__cell--span-${this.tablet}-tablet`, this.phone && `mdc-layout-grid__cell--span-${this.phone}-phone`, this.order && `mdc-layout-grid__cell--order-${this.order}`, this.align && `mdc-layout-grid__cell--align-${this.align}`];
    }

  }
};
/* script */

const __vue_script__$m = script$m;
/* template */

var __vue_render__$m = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-layout-grid__cell",
    class: _vm.cssClasses
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$m = [];
__vue_render__$m._withStripped = true;
/* style */

const __vue_inject_styles__$m = undefined;
/* scoped */

const __vue_scope_id__$m = undefined;
/* module identifier */

const __vue_module_identifier__$m = undefined;
/* functional template */

const __vue_is_functional_template__$m = false;
/* component normalizer */

function __vue_normalize__$m(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\layout-grid\\LayoutCell.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCLayoutCell = __vue_normalize__$m({
  render: __vue_render__$m,
  staticRenderFns: __vue_staticRenderFns__$m
}, __vue_inject_styles__$m, __vue_script__$m, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, undefined, undefined); //
//
//
//
//


var script$n = {
  name: 'MDCLayoutInner'
};
/* script */

const __vue_script__$n = script$n;
/* template */

var __vue_render__$n = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-layout-grid__inner"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$n = [];
__vue_render__$n._withStripped = true;
/* style */

const __vue_inject_styles__$n = undefined;
/* scoped */

const __vue_scope_id__$n = undefined;
/* module identifier */

const __vue_module_identifier__$n = undefined;
/* functional template */

const __vue_is_functional_template__$n = false;
/* component normalizer */

function __vue_normalize__$n(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\layout-grid\\LayoutInner.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCLayoutInner = __vue_normalize__$n({
  render: __vue_render__$n,
  staticRenderFns: __vue_staticRenderFns__$n
}, __vue_inject_styles__$n, __vue_script__$n, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, undefined, undefined);

function install$c(Vue, register) {
  register(MDCLayoutGrid, MDCLayoutCell, MDCLayoutInner);
}

var LayoutGrid =
/*#__PURE__*/
Object.freeze({
  MDCLayoutGrid: MDCLayoutGrid,
  MDCLayoutCell: MDCLayoutCell,
  MDCLayoutInner: MDCLayoutInner,
  install: install$c
});
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses$8 = {
  CLOSED_CLASS: 'mdc-linear-progress--closed',
  INDETERMINATE_CLASS: 'mdc-linear-progress--indeterminate',
  REVERSED_CLASS: 'mdc-linear-progress--reversed'
};
const strings$9 = {
  PRIMARY_BAR_SELECTOR: '.mdc-linear-progress__primary-bar',
  BUFFER_SELECTOR: '.mdc-linear-progress__buffer'
};
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCLinearProgressFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$8;
  }

  static get strings() {
    return strings$9;
  }

  static get defaultAdapter() {
    return {
      addClass: () =>
      /* className: string */
      {},
      getPrimaryBar: () =>
      /* el: Element */
      {},
      getBuffer: () =>
      /* el: Element */
      {},
      hasClass: () =>
      /* className: string */
      false,
      removeClass: () =>
      /* className: string */
      {},
      setStyle: () =>
      /* el: Element, styleProperty: string, value: string */
      {}
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCLinearProgressFoundation.defaultAdapter, adapter));
  }

  init() {
    this.determinate_ = !this.adapter_.hasClass(cssClasses$8.INDETERMINATE_CLASS);
    this.reverse_ = this.adapter_.hasClass(cssClasses$8.REVERSED_CLASS);
    this.progress_ = 0;
  }

  setDeterminate(isDeterminate) {
    this.determinate_ = isDeterminate;

    if (this.determinate_) {
      this.adapter_.removeClass(cssClasses$8.INDETERMINATE_CLASS);
      this.setScale_(this.adapter_.getPrimaryBar(), this.progress_);
    } else {
      this.adapter_.addClass(cssClasses$8.INDETERMINATE_CLASS);
      this.setScale_(this.adapter_.getPrimaryBar(), 1);
      this.setScale_(this.adapter_.getBuffer(), 1);
    }
  }

  setProgress(value) {
    this.progress_ = value;

    if (this.determinate_) {
      this.setScale_(this.adapter_.getPrimaryBar(), value);
    }
  }

  setBuffer(value) {
    if (this.determinate_) {
      this.setScale_(this.adapter_.getBuffer(), value);
    }
  }

  setReverse(isReversed) {
    this.reverse_ = isReversed;

    if (this.reverse_) {
      this.adapter_.addClass(cssClasses$8.REVERSED_CLASS);
    } else {
      this.adapter_.removeClass(cssClasses$8.REVERSED_CLASS);
    }
  }

  open() {
    this.adapter_.removeClass(cssClasses$8.CLOSED_CLASS);
  }

  close() {
    this.adapter_.addClass(cssClasses$8.CLOSED_CLASS);
  }

  setScale_(el, scaleValue) {
    const value = 'scaleX(' + scaleValue + ')';
    transformStyleProperties.forEach(transformStyleProperty => {
      this.adapter_.setStyle(el, transformStyleProperty, value);
    });
  }

}
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//


function assertNumber(value, fn) {
  if (typeof value === 'string') {
    value = parseFloat(value);
    if (isNaN(value)) throw new Error('LinearProgress: value invalid!');
  }

  fn(value);
}

var script$o = {
  name: 'MDCLinearProgress',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    indeterminate: Boolean,
    reversed: Boolean,
    closed: Boolean,
    value: [String, Number],
    buffer: [String, Number]
  },
  watch: {
    indeterminate(value) {
      this.foundation.setDeterminate(!value);
    },

    reversed(value) {
      this.foundation.setReverse(value);
    },

    closed(value) {
      if (value) {
        this.foundation.close();
      } else {
        this.foundation.open();
      }
    },

    value(value) {
      assertNumber(value, value => this.foundation.setProgress(value));
    },

    buffer(value) {
      assertNumber(value, value => this.foundation.setBuffer(value));
    }

  },

  mounted() {
    const {
      $el
    } = this;
    const {
      primary,
      buffer
    } = this.$refs;
    this.foundation = new MDCLinearProgressFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      getPrimaryBar: () => primary,
      getBuffer: () => buffer,
      setStyle: (el, prop, value) => el.style[prop] = value
    });
    this.foundation.init();
    this.foundation.setDeterminate(!this.indeterminate);
    this.foundation.setReverse(this.reversed);
    this.closed && this.foundation.close();
    assertNumber(this.value, value => this.foundation.setProgress(value));
    assertNumber(this.buffer, value => this.foundation.setBuffer(value));
  },

  beforeDestroy() {
    this.foundation.destroy();
  }

};
/* script */

const __vue_script__$o = script$o;
/* template */

var __vue_render__$o = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-linear-progress",
    attrs: {
      role: "progressbar"
    }
  }, [_c("div", {
    staticClass: "mdc-linear-progress__buffering-dots"
  }), _c("div", {
    ref: "buffer",
    staticClass: "mdc-linear-progress__buffer"
  }), _c("div", {
    ref: "primary",
    staticClass: "mdc-linear-progress__bar mdc-linear-progress__primary-bar"
  }, [_c("span", {
    staticClass: "mdc-linear-progress__bar-inner"
  })]), _vm._m(0)]);
};

var __vue_staticRenderFns__$o = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-linear-progress__bar mdc-linear-progress__secondary-bar"
  }, [_c("span", {
    staticClass: "mdc-linear-progress__bar-inner"
  })]);
}];
__vue_render__$o._withStripped = true;
/* style */

const __vue_inject_styles__$o = undefined;
/* scoped */

const __vue_scope_id__$o = undefined;
/* module identifier */

const __vue_module_identifier__$o = undefined;
/* functional template */

const __vue_is_functional_template__$o = false;
/* component normalizer */

function __vue_normalize__$o(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\linear-progress\\LinearProgress.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCLinearProgress$1 = __vue_normalize__$o({
  render: __vue_render__$o,
  staticRenderFns: __vue_staticRenderFns__$o
}, __vue_inject_styles__$o, __vue_script__$o, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, undefined, undefined);

function install$d(Vue, register) {
  register(MDCLinearProgress$1);
}

var LinearProgress =
/*#__PURE__*/
Object.freeze({
  MDCLinearProgress: MDCLinearProgress$1,
  install: install$d
}); //
//
//
//
//

var script$p = {
  name: 'MDCList',
  props: {
    dense: Boolean,
    avatar: Boolean,
    twoLine: Boolean
  },
  computed: {
    cssClasses() {
      return {
        'mdc-list--dense': this.dense,
        'mdc-list--avatar-list': this.avatar,
        'mdc-list--two-line': this.twoLine
      };
    }

  }
};
/* script */

const __vue_script__$p = script$p;
/* template */

var __vue_render__$p = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("ul", {
    staticClass: "mdc-list",
    class: _vm.cssClasses
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$p = [];
__vue_render__$p._withStripped = true;
/* style */

const __vue_inject_styles__$p = undefined;
/* scoped */

const __vue_scope_id__$p = undefined;
/* module identifier */

const __vue_module_identifier__$p = undefined;
/* functional template */

const __vue_is_functional_template__$p = false;
/* component normalizer */

function __vue_normalize__$p(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\list\\List.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCList = __vue_normalize__$p({
  render: __vue_render__$p,
  staticRenderFns: __vue_staticRenderFns__$p
}, __vue_inject_styles__$p, __vue_script__$p, __vue_scope_id__$p, __vue_is_functional_template__$p, __vue_module_identifier__$p, undefined, undefined); //


var script$q = {
  name: 'MDCListItem',
  mixins: [Ripple()],
  props: {
    text: {
      type: String,
      required: true
    },
    secondary: String
  }
};
/* script */

const __vue_script__$q = script$q;
/* template */

var __vue_render__$q = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("li", _vm._g({
    staticClass: "mdc-list-item"
  }, _vm.$listeners), [_vm._t("graphic"), _vm.secondary ? _c("span", {
    staticClass: "mdc-list-item__text"
  }, [_c("span", {
    staticClass: "mdc-list-item__primary-text"
  }, [_vm._v(_vm._s(_vm.text))]), _c("span", {
    staticClass: "mdc-list-item__secondary-text"
  }, [_vm._v(_vm._s(_vm.secondary))])]) : _c("span", {
    staticClass: "mdc-list-item__text"
  }, [_vm._v(_vm._s(_vm.text))]), _vm._t("meta")], 2);
};

var __vue_staticRenderFns__$q = [];
__vue_render__$q._withStripped = true;
/* style */

const __vue_inject_styles__$q = undefined;
/* scoped */

const __vue_scope_id__$q = undefined;
/* module identifier */

const __vue_module_identifier__$q = undefined;
/* functional template */

const __vue_is_functional_template__$q = false;
/* component normalizer */

function __vue_normalize__$q(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\list\\ListItem.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCListItem = __vue_normalize__$q({
  render: __vue_render__$q,
  staticRenderFns: __vue_staticRenderFns__$q
}, __vue_inject_styles__$q, __vue_script__$q, __vue_scope_id__$q, __vue_is_functional_template__$q, __vue_module_identifier__$q, undefined, undefined); //
//
//
//


var script$r = {
  name: 'MDCListDivider',
  props: {
    inset: Boolean
  },
  computed: {
    cssClasses() {
      return this.inset && 'mdc-list-divider--inset';
    }

  }
};
/* script */

const __vue_script__$r = script$r;
/* template */

var __vue_render__$r = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("li", {
    staticClass: "mdc-list-divider",
    class: _vm.cssClasses,
    attrs: {
      role: "separator"
    }
  });
};

var __vue_staticRenderFns__$r = [];
__vue_render__$r._withStripped = true;
/* style */

const __vue_inject_styles__$r = undefined;
/* scoped */

const __vue_scope_id__$r = undefined;
/* module identifier */

const __vue_module_identifier__$r = undefined;
/* functional template */

const __vue_is_functional_template__$r = false;
/* component normalizer */

function __vue_normalize__$r(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\list\\ListDivider.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCListDivider = __vue_normalize__$r({
  render: __vue_render__$r,
  staticRenderFns: __vue_staticRenderFns__$r
}, __vue_inject_styles__$r, __vue_script__$r, __vue_scope_id__$r, __vue_is_functional_template__$r, __vue_module_identifier__$r, undefined, undefined); //
//
//
//


var script$s = {
  name: 'MDCListItemGraphic',
  props: {
    icon: String,
    label: String,
    src: String,
    title: String
  },
  computed: {
    cssClasses() {
      return this.icon && 'material-icons';
    },

    tag() {
      return this.src ? 'img' : 'i';
    }

  }
};
/* script */

const __vue_script__$s = script$s;
/* template */

var __vue_render__$s = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, {
    tag: "component",
    staticClass: "mdc-list-item__graphic",
    class: _vm.cssClasses,
    attrs: {
      "aria-label": _vm.icon && _vm.label,
      "aria-hidden": _vm.icon && "true",
      src: _vm.src,
      title: _vm.title
    }
  }, [_vm._v(_vm._s(_vm.icon))]);
};

var __vue_staticRenderFns__$s = [];
__vue_render__$s._withStripped = true;
/* style */

const __vue_inject_styles__$s = undefined;
/* scoped */

const __vue_scope_id__$s = undefined;
/* module identifier */

const __vue_module_identifier__$s = undefined;
/* functional template */

const __vue_is_functional_template__$s = false;
/* component normalizer */

function __vue_normalize__$s(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\list\\ListItemGraphic.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCListItemGraphic = __vue_normalize__$s({
  render: __vue_render__$s,
  staticRenderFns: __vue_staticRenderFns__$s
}, __vue_inject_styles__$s, __vue_script__$s, __vue_scope_id__$s, __vue_is_functional_template__$s, __vue_module_identifier__$s, undefined, undefined); //
//
//
//


var script$t = {
  name: 'MDCListItemMeta',
  props: {
    icon: String,
    label: String,
    link: String
  },
  computed: {
    cssClasses() {
      return this.icon && 'material-icons';
    },

    content() {
      return this.icon || this.label;
    },

    tag() {
      if (this.link) {
        return 'a';
      }

      return this.icon ? 'i' : 'span';
    }

  }
};
/* script */

const __vue_script__$t = script$t;
/* template */

var __vue_render__$t = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, {
    tag: "mdc-link",
    staticClass: "mdc-list-item__meta",
    class: _vm.cssClasses,
    attrs: {
      "aria-label": _vm.icon && _vm.label,
      "aria-hidden": _vm.icon && "true",
      href: _vm.link
    }
  }, [_vm._v(_vm._s(_vm.content))]);
};

var __vue_staticRenderFns__$t = [];
__vue_render__$t._withStripped = true;
/* style */

const __vue_inject_styles__$t = undefined;
/* scoped */

const __vue_scope_id__$t = undefined;
/* module identifier */

const __vue_module_identifier__$t = undefined;
/* functional template */

const __vue_is_functional_template__$t = false;
/* component normalizer */

function __vue_normalize__$t(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\list\\ListItemMeta.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCListItemMeta = __vue_normalize__$t({
  render: __vue_render__$t,
  staticRenderFns: __vue_staticRenderFns__$t
}, __vue_inject_styles__$t, __vue_script__$t, __vue_scope_id__$t, __vue_is_functional_template__$t, __vue_module_identifier__$t, undefined, undefined); //
//
//
//
//


var script$u = {
  name: 'MDCListGroup'
};
/* script */

const __vue_script__$u = script$u;
/* template */

var __vue_render__$u = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-list-group"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$u = [];
__vue_render__$u._withStripped = true;
/* style */

const __vue_inject_styles__$u = undefined;
/* scoped */

const __vue_scope_id__$u = undefined;
/* module identifier */

const __vue_module_identifier__$u = undefined;
/* functional template */

const __vue_is_functional_template__$u = false;
/* component normalizer */

function __vue_normalize__$u(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\list\\group\\ListGroup.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCListGroup = __vue_normalize__$u({
  render: __vue_render__$u,
  staticRenderFns: __vue_staticRenderFns__$u
}, __vue_inject_styles__$u, __vue_script__$u, __vue_scope_id__$u, __vue_is_functional_template__$u, __vue_module_identifier__$u, undefined, undefined); //
//
//
//


var script$v = {
  name: 'MDCListGroupDivider',
  props: {
    inset: Boolean
  },
  computed: {
    cssClasses() {
      return this.inset && 'mdc-list-divider--inset';
    }

  }
};
/* script */

const __vue_script__$v = script$v;
/* template */

var __vue_render__$v = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("hr", {
    staticClass: "mdc-list-divider",
    class: _vm.cssClasses
  });
};

var __vue_staticRenderFns__$v = [];
__vue_render__$v._withStripped = true;
/* style */

const __vue_inject_styles__$v = undefined;
/* scoped */

const __vue_scope_id__$v = undefined;
/* module identifier */

const __vue_module_identifier__$v = undefined;
/* functional template */

const __vue_is_functional_template__$v = false;
/* component normalizer */

function __vue_normalize__$v(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\list\\group\\ListGroupDivider.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCListGroupDivider = __vue_normalize__$v({
  render: __vue_render__$v,
  staticRenderFns: __vue_staticRenderFns__$v
}, __vue_inject_styles__$v, __vue_script__$v, __vue_scope_id__$v, __vue_is_functional_template__$v, __vue_module_identifier__$v, undefined, undefined); //
//
//
//


var script$w = {
  name: 'MDCListGroupSubheader',
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
/* script */

const __vue_script__$w = script$w;
/* template */

var __vue_render__$w = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("h3", {
    staticClass: "mdc-list-group__subheader"
  }, [_vm._v(_vm._s(_vm.text))]);
};

var __vue_staticRenderFns__$w = [];
__vue_render__$w._withStripped = true;
/* style */

const __vue_inject_styles__$w = undefined;
/* scoped */

const __vue_scope_id__$w = undefined;
/* module identifier */

const __vue_module_identifier__$w = undefined;
/* functional template */

const __vue_is_functional_template__$w = false;
/* component normalizer */

function __vue_normalize__$w(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\list\\group\\ListGroupSubheader.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCListGroupSubheader = __vue_normalize__$w({
  render: __vue_render__$w,
  staticRenderFns: __vue_staticRenderFns__$w
}, __vue_inject_styles__$w, __vue_script__$w, __vue_scope_id__$w, __vue_is_functional_template__$w, __vue_module_identifier__$w, undefined, undefined);

function install$e(Vue, register) {
  register(MDCList, MDCListItem, MDCListDivider, MDCListItemGraphic, MDCListItemMeta, MDCListGroup, MDCListGroupDivider, MDCListGroupSubheader);
}

var List =
/*#__PURE__*/
Object.freeze({
  MDCList: MDCList,
  MDCListItem: MDCListItem,
  MDCListDivider: MDCListDivider,
  MDCListItemGraphic: MDCListItemGraphic,
  MDCListItemMeta: MDCListItemMeta,
  MDCListGroup: MDCListGroup,
  MDCListGroupDivider: MDCListGroupDivider,
  MDCListGroupSubheader: MDCListGroupSubheader,
  install: install$e
});
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @type {string|undefined} */

let storedTransformPropertyName_$1;
/**
 * Returns the name of the correct transform property to use on the current browser.
 * @param {!Window} globalObj
 * @param {boolean=} forceRefresh
 * @return {string}
 */

function getTransformPropertyName$1(globalObj, forceRefresh = false) {
  if (storedTransformPropertyName_$1 === undefined || forceRefresh) {
    const el = globalObj.document.createElement('div');
    const transformPropertyName = 'transform' in el.style ? 'transform' : 'webkitTransform';
    storedTransformPropertyName_$1 = transformPropertyName;
  }

  return storedTransformPropertyName_$1;
}
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */


const cssClasses$9 = {
  ROOT: 'mdc-menu',
  OPEN: 'mdc-menu--open',
  ANIMATING_OPEN: 'mdc-menu--animating-open',
  ANIMATING_CLOSED: 'mdc-menu--animating-closed',
  SELECTED_LIST_ITEM: 'mdc-list-item--selected'
};
/** @enum {string} */

const strings$a = {
  ITEMS_SELECTOR: '.mdc-menu__items',
  SELECTED_EVENT: 'MDCMenu:selected',
  CANCEL_EVENT: 'MDCMenu:cancel',
  ARIA_DISABLED_ATTR: 'aria-disabled'
};
/** @enum {number} */

const numbers$2 = {
  // Amount of time to wait before triggering a selected event on the menu. Note that this time
  // will most likely be bumped up once interactive lists are supported to allow for the ripple to
  // animate before closing the menu
  SELECTED_TRIGGER_DELAY: 50,
  // Total duration of menu open animation.
  TRANSITION_OPEN_DURATION: 120,
  // Total duration of menu close animation.
  TRANSITION_CLOSE_DURATION: 75,
  // Margin left to the edge of the viewport when menu is at maximum possible height.
  MARGIN_TO_EDGE: 32,
  // Ratio of anchor width to menu width for switching from corner positioning to center positioning.
  ANCHOR_TO_MENU_WIDTH_RATIO: 0.67,
  // Ratio of vertical offset to menu height for switching from corner to mid-way origin positioning.
  OFFSET_TO_MENU_HEIGHT_RATIO: 0.1
};
/**
 * Enum for bits in the {@see Corner) bitmap.
 * @enum {number}
 */

const CornerBit = {
  BOTTOM: 1,
  CENTER: 2,
  RIGHT: 4,
  FLIP_RTL: 8
};
/**
 * Enum for representing an element corner for positioning the menu.
 *
 * The START constants map to LEFT if element directionality is left
 * to right and RIGHT if the directionality is right to left.
 * Likewise END maps to RIGHT or LEFT depending on the directionality.
 *
 * @enum {number}
 */

const Corner = {
  TOP_LEFT: 0,
  TOP_RIGHT: CornerBit.RIGHT,
  BOTTOM_LEFT: CornerBit.BOTTOM,
  BOTTOM_RIGHT: CornerBit.BOTTOM | CornerBit.RIGHT,
  TOP_START: CornerBit.FLIP_RTL,
  TOP_END: CornerBit.FLIP_RTL | CornerBit.RIGHT,
  BOTTOM_START: CornerBit.BOTTOM | CornerBit.FLIP_RTL,
  BOTTOM_END: CornerBit.BOTTOM | CornerBit.RIGHT | CornerBit.FLIP_RTL
};
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCMenuAdapter>}
 */

class MDCMenuFoundation extends MDCFoundation {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    return cssClasses$9;
  }
  /** @return enum{strings} */


  static get strings() {
    return strings$a;
  }
  /** @return enum{numbers} */


  static get numbers() {
    return numbers$2;
  }
  /** @return enum{number} */


  static get Corner() {
    return Corner;
  }
  /**
   * {@see MDCMenuAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCMenuAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCMenuAdapter} */
      {
        addClass: () => {},
        removeClass: () => {},
        hasClass: () => false,
        hasNecessaryDom: () => false,
        getAttributeForEventTarget: () => {},
        getInnerDimensions: () => ({}),
        hasAnchor: () => false,
        getAnchorDimensions: () => ({}),
        getWindowDimensions: () => ({}),
        getNumberOfItems: () => 0,
        registerInteractionHandler: () => {},
        deregisterInteractionHandler: () => {},
        registerBodyClickHandler: () => {},
        deregisterBodyClickHandler: () => {},
        getIndexForEventTarget: () => 0,
        notifySelected: () => {},
        notifyCancel: () => {},
        saveFocus: () => {},
        restoreFocus: () => {},
        isFocused: () => false,
        focus: () => {},
        getFocusedItemIndex: () => -1,
        focusItemAtIndex: () => {},
        isRtl: () => false,
        setTransformOrigin: () => {},
        setPosition: () => {},
        setMaxHeight: () => {},
        setAttrForOptionAtIndex: () => {},
        rmAttrForOptionAtIndex: () => {},
        addClassForOptionAtIndex: () => {},
        rmClassForOptionAtIndex: () => {}
      }
    );
  }
  /** @param {!MDCMenuAdapter} adapter */


  constructor(adapter) {
    super(Object.assign(MDCMenuFoundation.defaultAdapter, adapter));
    /** @private {function(!Event)} */

    this.clickHandler_ = evt => this.handlePossibleSelected_(evt);
    /** @private {function(!Event)} */


    this.keydownHandler_ = evt => this.handleKeyboardDown_(evt);
    /** @private {function(!Event)} */


    this.keyupHandler_ = evt => this.handleKeyboardUp_(evt);
    /** @private {function(!Event)} */


    this.documentClickHandler_ = evt => this.handleDocumentClick_(evt);
    /** @private {boolean} */


    this.isOpen_ = false;
    /** @private {number} */

    this.openAnimationEndTimerId_ = 0;
    /** @private {number} */

    this.closeAnimationEndTimerId_ = 0;
    /** @private {number} */

    this.selectedTriggerTimerId_ = 0;
    /** @private {number} */

    this.animationRequestId_ = 0;
    /** @private {!{ width: number, height: number }} */

    this.dimensions_;
    /** @private {number} */

    this.itemHeight_;
    /** @private {Corner} */

    this.anchorCorner_ = Corner.TOP_START;
    /** @private {AnchorMargin} */

    this.anchorMargin_ = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    /** @private {?AutoLayoutMeasurements} */

    this.measures_ = null;
    /** @private {number} */

    this.selectedIndex_ = -1;
    /** @private {boolean} */

    this.rememberSelection_ = false;
    /** @private {boolean} */

    this.quickOpen_ = false; // A keyup event on the menu needs to have a corresponding keydown
    // event on the menu. If the user opens the menu with a keydown event on a
    // button, the menu will only get the key up event causing buggy behavior with selected elements.

    /** @private {boolean} */

    this.keyDownWithinMenu_ = false;
  }

  init() {
    const {
      ROOT,
      OPEN
    } = MDCMenuFoundation.cssClasses;

    if (!this.adapter_.hasClass(ROOT)) {
      throw new Error(`${ROOT} class required in root element.`);
    }

    if (!this.adapter_.hasNecessaryDom()) {
      throw new Error(`Required DOM nodes missing in ${ROOT} component.`);
    }

    if (this.adapter_.hasClass(OPEN)) {
      this.isOpen_ = true;
    }

    this.adapter_.registerInteractionHandler('click', this.clickHandler_);
    this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
  }

  destroy() {
    clearTimeout(this.selectedTriggerTimerId_);
    clearTimeout(this.openAnimationEndTimerId_);
    clearTimeout(this.closeAnimationEndTimerId_); // Cancel any currently running animations.

    cancelAnimationFrame(this.animationRequestId_);
    this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
    this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);
  }
  /**
   * @param {!Corner} corner Default anchor corner alignment of top-left menu corner.
   */


  setAnchorCorner(corner) {
    this.anchorCorner_ = corner;
  }
  /**
   * @param {!AnchorMargin} margin 4-plet of margins from anchor.
   */


  setAnchorMargin(margin) {
    this.anchorMargin_.top = typeof margin.top === 'number' ? margin.top : 0;
    this.anchorMargin_.right = typeof margin.right === 'number' ? margin.right : 0;
    this.anchorMargin_.bottom = typeof margin.bottom === 'number' ? margin.bottom : 0;
    this.anchorMargin_.left = typeof margin.left === 'number' ? margin.left : 0;
  }
  /** @param {boolean} rememberSelection */


  setRememberSelection(rememberSelection) {
    this.rememberSelection_ = rememberSelection;
    this.setSelectedIndex(-1);
  }
  /** @param {boolean} quickOpen */


  setQuickOpen(quickOpen) {
    this.quickOpen_ = quickOpen;
  }
  /**
   * @param {?number} focusIndex
   * @private
   */


  focusOnOpen_(focusIndex) {
    if (focusIndex === null) {
      // If this instance of MDCMenu remembers selections, and the user has
      // made a selection, then focus the last selected item
      if (this.rememberSelection_ && this.selectedIndex_ >= 0) {
        this.adapter_.focusItemAtIndex(this.selectedIndex_);
        return;
      }

      this.adapter_.focus(); // If that doesn't work, focus first item instead.

      if (!this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(0);
      }
    } else {
      this.adapter_.focusItemAtIndex(focusIndex);
    }
  }
  /**
   * Handle clicks and cancel the menu if not a child list-item
   * @param {!Event} evt
   * @private
   */


  handleDocumentClick_(evt) {
    let el = evt.target;

    while (el && el !== document.documentElement) {
      if (this.adapter_.getIndexForEventTarget(el) !== -1) {
        return;
      }

      el = el.parentNode;
    }

    this.adapter_.notifyCancel();
    this.close(evt);
  }

  /**
   * Handle keys that we want to repeat on hold (tab and arrows).
   * @param {!Event} evt
   * @return {boolean}
   * @private
   */
  handleKeyboardDown_(evt) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (evt.altKey || evt.ctrlKey || evt.metaKey) {
      return true;
    }

    const {
      keyCode,
      key,
      shiftKey
    } = evt;
    const isTab = key === 'Tab' || keyCode === 9;
    const isArrowUp = key === 'ArrowUp' || keyCode === 38;
    const isArrowDown = key === 'ArrowDown' || keyCode === 40;
    const isSpace = key === 'Space' || keyCode === 32;
    const isEnter = key === 'Enter' || keyCode === 13; // The menu needs to know if the keydown event was triggered on the menu

    this.keyDownWithinMenu_ = isEnter || isSpace;
    const focusedItemIndex = this.adapter_.getFocusedItemIndex();
    const lastItemIndex = this.adapter_.getNumberOfItems() - 1;

    if (shiftKey && isTab && focusedItemIndex === 0) {
      this.adapter_.focusItemAtIndex(lastItemIndex);
      evt.preventDefault();
      return false;
    }

    if (!shiftKey && isTab && focusedItemIndex === lastItemIndex) {
      this.adapter_.focusItemAtIndex(0);
      evt.preventDefault();
      return false;
    } // Ensure Arrow{Up,Down} and space do not cause inadvertent scrolling


    if (isArrowUp || isArrowDown || isSpace) {
      evt.preventDefault();
    }

    if (isArrowUp) {
      if (focusedItemIndex === 0 || this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(lastItemIndex);
      } else {
        this.adapter_.focusItemAtIndex(focusedItemIndex - 1);
      }
    } else if (isArrowDown) {
      if (focusedItemIndex === lastItemIndex || this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(0);
      } else {
        this.adapter_.focusItemAtIndex(focusedItemIndex + 1);
      }
    }

    return true;
  }
  /**
   * Handle keys that we don't want to repeat on hold (Enter, Space, Escape).
   * @param {!Event} evt
   * @return {boolean}
   * @private
   */


  handleKeyboardUp_(evt) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (evt.altKey || evt.ctrlKey || evt.metaKey) {
      return true;
    }

    const {
      keyCode,
      key
    } = evt;
    const isEnter = key === 'Enter' || keyCode === 13;
    const isSpace = key === 'Space' || keyCode === 32;
    const isEscape = key === 'Escape' || keyCode === 27;

    if (isEnter || isSpace) {
      // If the keydown event didn't occur on the menu, then it should
      // disregard the possible selected event.
      if (this.keyDownWithinMenu_) {
        this.handlePossibleSelected_(evt);
      }

      this.keyDownWithinMenu_ = false;
    }

    if (isEscape) {
      this.adapter_.notifyCancel();
      this.close();
    }

    return true;
  }
  /**
   * @param {!Event} evt
   * @private
   */


  handlePossibleSelected_(evt) {
    if (this.adapter_.getAttributeForEventTarget(evt.target, strings$a.ARIA_DISABLED_ATTR) === 'true') {
      return;
    }

    const targetIndex = this.adapter_.getIndexForEventTarget(evt.target);

    if (targetIndex < 0) {
      return;
    } // Debounce multiple selections


    if (this.selectedTriggerTimerId_) {
      return;
    }

    this.selectedTriggerTimerId_ = setTimeout(() => {
      this.selectedTriggerTimerId_ = 0;
      this.close();

      if (this.rememberSelection_) {
        this.setSelectedIndex(targetIndex);
      }

      this.adapter_.notifySelected({
        index: targetIndex
      });
    }, numbers$2.SELECTED_TRIGGER_DELAY);
  }
  /**
   * @return {AutoLayoutMeasurements} Measurements used to position menu popup.
   */


  getAutoLayoutMeasurements_() {
    const anchorRect = this.adapter_.getAnchorDimensions();
    const viewport = this.adapter_.getWindowDimensions();
    return {
      viewport: viewport,
      viewportDistance: {
        top: anchorRect.top,
        right: viewport.width - anchorRect.right,
        left: anchorRect.left,
        bottom: viewport.height - anchorRect.bottom
      },
      anchorHeight: anchorRect.height,
      anchorWidth: anchorRect.width,
      menuHeight: this.dimensions_.height,
      menuWidth: this.dimensions_.width
    };
  }
  /**
   * Computes the corner of the anchor from which to animate and position the menu.
   * @return {Corner}
   * @private
   */


  getOriginCorner_() {
    // Defaults: open from the top left.
    let corner = Corner.TOP_LEFT;
    const {
      viewportDistance,
      anchorHeight,
      anchorWidth,
      menuHeight,
      menuWidth
    } = this.measures_;
    const isBottomAligned = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
    const availableTop = isBottomAligned ? viewportDistance.top + anchorHeight + this.anchorMargin_.bottom : viewportDistance.top + this.anchorMargin_.top;
    const availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom : viewportDistance.bottom + anchorHeight - this.anchorMargin_.top;
    const topOverflow = menuHeight - availableTop;
    const bottomOverflow = menuHeight - availableBottom;

    if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
      corner |= CornerBit.BOTTOM;
    }

    const isRtl = this.adapter_.isRtl();
    const isFlipRtl = Boolean(this.anchorCorner_ & CornerBit.FLIP_RTL);
    const avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
    const isAlignedRight = avoidHorizontalOverlap && !isRtl || !avoidHorizontalOverlap && isFlipRtl && isRtl;
    const availableLeft = isAlignedRight ? viewportDistance.left + anchorWidth + this.anchorMargin_.right : viewportDistance.left + this.anchorMargin_.left;
    const availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right : viewportDistance.right + anchorWidth - this.anchorMargin_.left;
    const leftOverflow = menuWidth - availableLeft;
    const rightOverflow = menuWidth - availableRight;

    if (leftOverflow < 0 && isAlignedRight && isRtl || avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0 || rightOverflow > 0 && leftOverflow < rightOverflow) {
      corner |= CornerBit.RIGHT;
    }

    return corner;
  }
  /**
   * @param {Corner} corner Origin corner of the menu.
   * @return {number} Horizontal offset of menu origin corner from corresponding anchor corner.
   * @private
   */


  getHorizontalOriginOffset_(corner) {
    const {
      anchorWidth
    } = this.measures_;
    const isRightAligned = Boolean(corner & CornerBit.RIGHT);
    const avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
    let x = 0;

    if (isRightAligned) {
      const rightOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.left : this.anchorMargin_.right;
      x = rightOffset;
    } else {
      const leftOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.right : this.anchorMargin_.left;
      x = leftOffset;
    }

    return x;
  }
  /**
   * @param {Corner} corner Origin corner of the menu.
   * @return {number} Vertical offset of menu origin corner from corresponding anchor corner.
   * @private
   */


  getVerticalOriginOffset_(corner) {
    const {
      viewport,
      viewportDistance,
      anchorHeight,
      menuHeight
    } = this.measures_;
    const isBottomAligned = Boolean(corner & CornerBit.BOTTOM);
    const {
      MARGIN_TO_EDGE
    } = MDCMenuFoundation.numbers;
    const avoidVerticalOverlap = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
    const canOverlapVertically = !avoidVerticalOverlap;
    let y = 0;

    if (isBottomAligned) {
      y = avoidVerticalOverlap ? anchorHeight - this.anchorMargin_.top : -this.anchorMargin_.bottom; // adjust for when menu can overlap anchor, but too tall to be aligned to bottom
      // anchor corner. Bottom margin is ignored in such cases.

      if (canOverlapVertically && menuHeight > viewportDistance.top + anchorHeight) {
        y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.top + anchorHeight));
      }
    } else {
      y = avoidVerticalOverlap ? anchorHeight + this.anchorMargin_.bottom : this.anchorMargin_.top; // adjust for when menu can overlap anchor, but too tall to be aligned to top
      // anchor corners. Top margin is ignored in that case.

      if (canOverlapVertically && menuHeight > viewportDistance.bottom + anchorHeight) {
        y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.bottom + anchorHeight));
      }
    }

    return y;
  }
  /**
   * @param {Corner} corner Origin corner of the menu.
   * @return {number} Maximum height of the menu, based on available space. 0 indicates should not be set.
   * @private
   */


  getMenuMaxHeight_(corner) {
    let maxHeight = 0;
    const {
      viewportDistance
    } = this.measures_;
    const isBottomAligned = Boolean(corner & CornerBit.BOTTOM); // When maximum height is not specified, it is handled from css.

    if (this.anchorCorner_ & CornerBit.BOTTOM) {
      if (isBottomAligned) {
        maxHeight = viewportDistance.top + this.anchorMargin_.top;
      } else {
        maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom;
      }
    }

    return maxHeight;
  }
  /** @private */


  autoPosition_() {
    if (!this.adapter_.hasAnchor()) {
      return;
    } // Compute measurements for autoposition methods reuse.


    this.measures_ = this.getAutoLayoutMeasurements_();
    const corner = this.getOriginCorner_();
    const maxMenuHeight = this.getMenuMaxHeight_(corner);
    let verticalAlignment = corner & CornerBit.BOTTOM ? 'bottom' : 'top';
    let horizontalAlignment = corner & CornerBit.RIGHT ? 'right' : 'left';
    const horizontalOffset = this.getHorizontalOriginOffset_(corner);
    const verticalOffset = this.getVerticalOriginOffset_(corner);
    const position = {
      [horizontalAlignment]: horizontalOffset ? horizontalOffset + 'px' : '0',
      [verticalAlignment]: verticalOffset ? verticalOffset + 'px' : '0'
    };
    const {
      anchorWidth,
      menuHeight,
      menuWidth
    } = this.measures_; // Center align when anchor width is comparable or greater than menu, otherwise keep corner.

    if (anchorWidth / menuWidth > numbers$2.ANCHOR_TO_MENU_WIDTH_RATIO) {
      horizontalAlignment = 'center';
    } // Adjust vertical origin when menu is positioned with significant offset from anchor. This is done so that
    // scale animation is "anchored" on the anchor.


    if (!(this.anchorCorner_ & CornerBit.BOTTOM) && Math.abs(verticalOffset / menuHeight) > numbers$2.OFFSET_TO_MENU_HEIGHT_RATIO) {
      const verticalOffsetPercent = Math.abs(verticalOffset / menuHeight) * 100;
      const originPercent = corner & CornerBit.BOTTOM ? 100 - verticalOffsetPercent : verticalOffsetPercent;
      verticalAlignment = Math.round(originPercent * 100) / 100 + '%';
    }

    this.adapter_.setTransformOrigin(`${horizontalAlignment} ${verticalAlignment}`);
    this.adapter_.setPosition(position);
    this.adapter_.setMaxHeight(maxMenuHeight ? maxMenuHeight + 'px' : ''); // Clear measures after positioning is complete.

    this.measures_ = null;
  }
  /**
   * Open the menu.
   * @param {{focusIndex: ?number}=} options
   */


  open({
    focusIndex = null
  } = {}) {
    this.adapter_.saveFocus();

    if (!this.quickOpen_) {
      this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
    }

    this.animationRequestId_ = requestAnimationFrame(() => {
      this.dimensions_ = this.adapter_.getInnerDimensions();
      this.autoPosition_();
      this.adapter_.addClass(MDCMenuFoundation.cssClasses.OPEN);
      this.focusOnOpen_(focusIndex);
      this.adapter_.registerBodyClickHandler(this.documentClickHandler_);

      if (!this.quickOpen_) {
        this.openAnimationEndTimerId_ = setTimeout(() => {
          this.openAnimationEndTimerId_ = 0;
          this.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
        }, numbers$2.TRANSITION_OPEN_DURATION);
      }
    });
    this.isOpen_ = true;
  }
  /**
   * Closes the menu.
   * @param {Event=} evt
   */


  close(evt = null) {
    const targetIsDisabled = evt ? this.adapter_.getAttributeForEventTarget(evt.target, strings$a.ARIA_DISABLED_ATTR) === 'true' : false;

    if (targetIsDisabled) {
      return;
    }

    this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);

    if (!this.quickOpen_) {
      this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
    }

    requestAnimationFrame(() => {
      this.adapter_.removeClass(MDCMenuFoundation.cssClasses.OPEN);

      if (!this.quickOpen_) {
        this.closeAnimationEndTimerId_ = setTimeout(() => {
          this.closeAnimationEndTimerId_ = 0;
          this.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
        }, numbers$2.TRANSITION_CLOSE_DURATION);
      }
    });
    this.isOpen_ = false;
    this.adapter_.restoreFocus();
  }
  /** @return {boolean} */


  isOpen() {
    return this.isOpen_;
  }
  /** @return {number} */


  getSelectedIndex() {
    return this.selectedIndex_;
  }
  /**
   * @param {number} index Index of the item to set as selected.
   */


  setSelectedIndex(index) {
    if (index === this.selectedIndex_) {
      return;
    }

    const prevSelectedIndex = this.selectedIndex_;

    if (prevSelectedIndex >= 0) {
      this.adapter_.rmAttrForOptionAtIndex(prevSelectedIndex, 'aria-selected');
      this.adapter_.rmClassForOptionAtIndex(prevSelectedIndex, cssClasses$9.SELECTED_LIST_ITEM);
    }

    this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfItems() ? index : -1;

    if (this.selectedIndex_ >= 0) {
      this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
      this.adapter_.addClassForOptionAtIndex(this.selectedIndex_, cssClasses$9.SELECTED_LIST_ITEM);
    }
  }

}
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//


var script$x = {
  name: 'MDCMenu',
  props: {
    anchor: Boolean,
    margin: {
      type: Object,

      default() {
        return {};
      }

    },
    corner: {
      type: String,
      default: 'top_left',
      validator: value => {
        let prop = value.toUpperCase();
        return typeof Corner[prop] !== 'undefined';
      }
    }
  },
  watch: {
    margin(value) {
      this.foundation.setAnchorMargin(value);
    },

    corner(value) {
      this.foundation.setAnchorCorner(value);
    }

  },

  data() {
    return {
      items: []
    };
  },

  mounted() {
    const {
      $el
    } = this;
    const {
      itemsContainer
    } = this.$refs;
    const $styles = getComputedStyle($el);
    let $anchor, prevFocus;

    if (this.anchor) {
      $anchor = $el.parentElement;
      $anchor.classList.add('mdc-menu-anchor');
    }

    this.foundation = new MDCMenuFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      hasNecessaryDom: () => !!itemsContainer,
      getAttributeForEventTarget: (target, name) => target.getAttribute(name),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      getInnerDimensions: () => ({
        width: itemsContainer.offsetWidth,
        height: itemsContainer.offsetHeight
      }),
      hasAnchor: () => !!$anchor,
      getAnchorDimensions: () => $el.parentElement.getBoundingClientRect(),
      getWindowDimensions: () => ({
        width: window.innerWidth,
        height: window.innerHeight
      }),
      getNumberOfItems: () => this.items.length,
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      registerBodyClickHandler: handler => document.body.addEventListener('click', handler),
      deregisterBodyClickHandler: handler => document.body.removeEventListener('click', handler),
      getIndexForEventTarget: target => this.items.indexOf(target),
      notifySelected: data => this.$emit('selected', data.index, this.items[data.index]),
      notifyCancel: () => this.$emit('cancel'),
      saveFocus: () => {
        prevFocus = document.activeElement;
      },
      restoreFocus: () => prevFocus && prevFocus.focus(),
      isFocused: () => document.activeElement === $el,
      focus: () => $el.focus(),
      getFocusedItemIndex: () => this.items.indexOf(document.activeElement),
      focusItemAtIndex: index => this.items[index].focus(),
      isRtl: () => $styles.direction === 'rtl',
      setTransformOrigin: origin => {
        const prop = getTransformPropertyName$1(window);
        $el.style[`${prop}-origin`] = origin;
      },
      setPosition: pos => {
        $el.style.left = 'left' in pos ? pos.left : null;
        $el.style.right = 'right' in pos ? pos.right : null;
        $el.style.top = 'top' in pos ? pos.top : null;
        $el.style.bottom = 'bottom' in pos ? pos.bottom : null;
      },
      setMaxHeight: height => $el.style.maxHeight = height,
      setAttrForOptionAtIndex: (index, attr, value) => this.items[index].setAttribute(attr, value),
      rmAttrForOptionAtIndex: (index, attr) => this.items[index].removeAttribute(attr),
      addClassForOptionAtIndex: (index, className) => this.items[index].classList.add(className),
      rmClassForOptionAtIndex: (index, className) => this.items[index].classList.remove(className)
    });
    this.items = this.$_findItems();
    this.foundation.init();
    this.foundation.setAnchorCorner(this.corner.toUpperCase());
    this.foundation.setAnchorMargin(this.margin);
  },

  updated() {
    this.items = this.$_findItems();
  },

  computed: {
    open() {
      return this.foundation && this.foundation.isOpen();
    }

  },
  methods: {
    show(index = null) {
      this.foundation.open({
        focusIndex: index
      });
    },

    hide() {
      this.foundation.close();
    },

    $_findItems() {
      return Array.prototype.slice.call(this.$refs.itemsContainer.querySelectorAll('.mdc-list-item[role]'));
    }

  }
};
/* script */

const __vue_script__$x = script$x;
/* template */

var __vue_render__$x = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-menu",
    class: _vm.cssClasses,
    attrs: {
      tabindex: "-1"
    }
  }, [_c("div", {
    ref: "itemsContainer",
    staticClass: "mdc-list mdc-menu__items",
    attrs: {
      role: "menu"
    }
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$x = [];
__vue_render__$x._withStripped = true;
/* style */

const __vue_inject_styles__$x = undefined;
/* scoped */

const __vue_scope_id__$x = undefined;
/* module identifier */

const __vue_module_identifier__$x = undefined;
/* functional template */

const __vue_is_functional_template__$x = false;
/* component normalizer */

function __vue_normalize__$x(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\menu\\Menu.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCMenu$1 = __vue_normalize__$x({
  render: __vue_render__$x,
  staticRenderFns: __vue_staticRenderFns__$x
}, __vue_inject_styles__$x, __vue_script__$x, __vue_scope_id__$x, __vue_is_functional_template__$x, __vue_module_identifier__$x, undefined, undefined); //
//
//
//


var script$y = {
  name: 'MDCMenuItem',
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
/* script */

const __vue_script__$y = script$y;
/* template */

var __vue_render__$y = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("li", {
    staticClass: "mdc-list-item",
    attrs: {
      role: "menuitem",
      tabindex: "0"
    }
  }, [_vm._v(_vm._s(_vm.text))]);
};

var __vue_staticRenderFns__$y = [];
__vue_render__$y._withStripped = true;
/* style */

const __vue_inject_styles__$y = undefined;
/* scoped */

const __vue_scope_id__$y = undefined;
/* module identifier */

const __vue_module_identifier__$y = undefined;
/* functional template */

const __vue_is_functional_template__$y = false;
/* component normalizer */

function __vue_normalize__$y(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\menu\\MenuItem.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCMenuItem = __vue_normalize__$y({
  render: __vue_render__$y,
  staticRenderFns: __vue_staticRenderFns__$y
}, __vue_inject_styles__$y, __vue_script__$y, __vue_scope_id__$y, __vue_is_functional_template__$y, __vue_module_identifier__$y, undefined, undefined);

function install$f(Vue, register) {
  register(MDCMenu$1, MDCMenuItem);
}

var Menu =
/*#__PURE__*/
Object.freeze({
  MDCMenu: MDCMenu$1,
  MDCMenuItem: MDCMenuItem,
  install: install$f
});
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */

const strings$b = {
  NATIVE_CONTROL_SELECTOR: '.mdc-radio__native-control'
};
/** @enum {string} */

const cssClasses$a = {
  ROOT: 'mdc-radio',
  DISABLED: 'mdc-radio--disabled'
};
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCRadioAdapter>}
 */

class MDCRadioFoundation extends MDCFoundation {
  /** @return enum {cssClasses} */
  static get cssClasses() {
    return cssClasses$a;
  }
  /** @return enum {strings} */


  static get strings() {
    return strings$b;
  }
  /** @return {!MDCRadioAdapter} */


  static get defaultAdapter() {
    return (
      /** @type {!MDCRadioAdapter} */
      {
        addClass: () =>
        /* className: string */
        {},
        removeClass: () =>
        /* className: string */
        {},
        getNativeControl: () =>
        /* !MDCSelectionControlState */
        {}
      }
    );
  }
  /** @return {boolean} */


  isChecked() {
    return this.getNativeControl_().checked;
  }
  /** @param {boolean} checked */


  setChecked(checked) {
    this.getNativeControl_().checked = checked;
  }
  /** @return {boolean} */


  isDisabled() {
    return this.getNativeControl_().disabled;
  }
  /** @param {boolean} disabled */


  setDisabled(disabled) {
    const {
      DISABLED
    } = MDCRadioFoundation.cssClasses;
    this.getNativeControl_().disabled = disabled;

    if (disabled) {
      this.adapter_.addClass(DISABLED);
    } else {
      this.adapter_.removeClass(DISABLED);
    }
  }
  /** @return {?string} */


  getValue() {
    return this.getNativeControl_().value;
  }
  /** @param {?string} value */


  setValue(value) {
    this.getNativeControl_().value = value;
  }
  /**
   * @return {!MDCSelectionControlState}
   * @private
   */


  getNativeControl_() {
    return this.adapter_.getNativeControl() || {
      checked: false,
      disabled: false,
      value: null
    };
  }

}
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//


const rippleAdapter$2 = {
  isSurfaceActive() {
    return false;
  },

  registerInteractionHandler(type, handler) {
    this.$refs.input.addEventListener(type, handler);
  },

  deregisterInteractionHandler(type, handler) {
    this.$refs.input.removeEventListener(type, handler);
  }

};
var script$z = {
  name: 'MDCRadio',
  mixins: [Ripple(rippleAdapter$2, {
    unbounded: true
  })],
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    disabled: Boolean,
    checked: [Boolean, String],
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },

      set(value) {
        this.$emit('change', value);
      }

    }
  },

  mounted() {
    const {
      $el
    } = this;
    this.foundation = new MDCRadioFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      getNativeControl: () => this.$refs.input
    });
    this.foundation.init();
  },

  beforeDestroy() {
    this.foundation.destroy();
  }

};
/* script */

const __vue_script__$z = script$z;
/* template */

var __vue_render__$z = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-radio",
    class: _vm.cssClasses
  }, [_c("input", _vm._b({
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.model,
      expression: "model"
    }],
    ref: "input",
    staticClass: "mdc-radio__native-control",
    attrs: {
      type: "radio",
      disabled: _vm.disabled
    },
    domProps: {
      value: _vm.value,
      checked: _vm._q(_vm.model, _vm.value)
    },
    on: {
      change: function ($event) {
        _vm.model = _vm.value;
      }
    }
  }, "input", _vm.$attrs, false)), _vm._m(0)]);
};

var __vue_staticRenderFns__$z = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-radio__background"
  }, [_c("div", {
    staticClass: "mdc-radio__outer-circle"
  }), _c("div", {
    staticClass: "mdc-radio__inner-circle"
  })]);
}];
__vue_render__$z._withStripped = true;
/* style */

const __vue_inject_styles__$z = undefined;
/* scoped */

const __vue_scope_id__$z = undefined;
/* module identifier */

const __vue_module_identifier__$z = undefined;
/* functional template */

const __vue_is_functional_template__$z = false;
/* component normalizer */

function __vue_normalize__$z(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\radio\\Radio.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCRadio$1 = __vue_normalize__$z({
  render: __vue_render__$z,
  staticRenderFns: __vue_staticRenderFns__$z
}, __vue_inject_styles__$z, __vue_script__$z, __vue_scope_id__$z, __vue_is_functional_template__$z, __vue_module_identifier__$z, undefined, undefined);

function install$g(Vue, register) {
  register(MDCRadio$1);
}

var Radio =
/*#__PURE__*/
Object.freeze({
  MDCRadio: MDCRadio$1,
  install: install$g
});
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */

const cssClasses$b = {
  LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
  LABEL_SHAKE: 'mdc-floating-label--shake'
};
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCFloatingLabelAdapter>}
 * @final
 */

class MDCFloatingLabelFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$b;
  }
  /**
   * {@see MDCFloatingLabelAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCFloatingLabelAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCFloatingLabelAdapter} */
      {
        addClass: () => {},
        removeClass: () => {},
        getWidth: () => {},
        registerInteractionHandler: () => {},
        deregisterInteractionHandler: () => {}
      }
    );
  }
  /**
   * @param {!MDCFloatingLabelAdapter} adapter
   */


  constructor(adapter) {
    super(Object.assign(MDCFloatingLabelFoundation.defaultAdapter, adapter));
    /** @private {function(!Event): undefined} */

    this.shakeAnimationEndHandler_ = () => this.handleShakeAnimationEnd_();
  }

  init() {
    this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  }
  /**
   * Returns the width of the label element.
   * @return {number}
   */


  getWidth() {
    return this.adapter_.getWidth();
  }
  /**
   * Styles the label to produce the label shake for errors.
   * @param {boolean} shouldShake adds shake class if true,
   * otherwise removes shake class.
   */


  shake(shouldShake) {
    const {
      LABEL_SHAKE
    } = MDCFloatingLabelFoundation.cssClasses;

    if (shouldShake) {
      this.adapter_.addClass(LABEL_SHAKE);
    } else {
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  }
  /**
   * Styles the label to float or dock.
   * @param {boolean} shouldFloat adds float class if true, otherwise remove
   * float and shake class to dock label.
   */


  float(shouldFloat) {
    const {
      LABEL_FLOAT_ABOVE,
      LABEL_SHAKE
    } = MDCFloatingLabelFoundation.cssClasses;

    if (shouldFloat) {
      this.adapter_.addClass(LABEL_FLOAT_ABOVE);
    } else {
      this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  }
  /**
   * Handles an interaction event on the root element.
   */


  handleShakeAnimationEnd_() {
    const {
      LABEL_SHAKE
    } = MDCFloatingLabelFoundation.cssClasses;
    this.adapter_.removeClass(LABEL_SHAKE);
  }

}
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */


const cssClasses$c = {
  LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
  LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
};
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCLineRippleAdapter>}
 * @final
 */

class MDCLineRippleFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$c;
  }
  /**
   * {@see MDCLineRippleAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCLineRippleAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCLineRippleAdapter} */
      {
        addClass: () => {},
        removeClass: () => {},
        hasClass: () => {},
        setStyle: () => {},
        registerEventHandler: () => {},
        deregisterEventHandler: () => {}
      }
    );
  }
  /**
   * @param {!MDCLineRippleAdapter=} adapter
   */


  constructor(adapter =
  /** @type {!MDCLineRippleAdapter} */
  {}) {
    super(Object.assign(MDCLineRippleFoundation.defaultAdapter, adapter));
    /** @private {function(!Event): undefined} */

    this.transitionEndHandler_ = evt => this.handleTransitionEnd(evt);
  }

  init() {
    this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
  }

  destroy() {
    this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
  }
  /**
   * Activates the line ripple
   */


  activate() {
    this.adapter_.removeClass(cssClasses$c.LINE_RIPPLE_DEACTIVATING);
    this.adapter_.addClass(cssClasses$c.LINE_RIPPLE_ACTIVE);
  }
  /**
   * Sets the center of the ripple animation to the given X coordinate.
   * @param {number} xCoordinate
   */


  setRippleCenter(xCoordinate) {
    this.adapter_.setStyle('transform-origin', `${xCoordinate}px center`);
  }
  /**
   * Deactivates the line ripple
   */


  deactivate() {
    this.adapter_.addClass(cssClasses$c.LINE_RIPPLE_DEACTIVATING);
  }
  /**
   * Handles a transition end event
   * @param {!Event} evt
   */


  handleTransitionEnd(evt) {
    // Wait for the line ripple to be either transparent or opaque
    // before emitting the animation end event
    const isDeactivating = this.adapter_.hasClass(cssClasses$c.LINE_RIPPLE_DEACTIVATING);

    if (evt.propertyName === 'opacity') {
      if (isDeactivating) {
        this.adapter_.removeClass(cssClasses$c.LINE_RIPPLE_ACTIVE);
        this.adapter_.removeClass(cssClasses$c.LINE_RIPPLE_DEACTIVATING);
      }
    }
  }

}
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const cssClasses$d = {
  BOX: 'mdc-select--box',
  DISABLED: 'mdc-select--disabled',
  ROOT: 'mdc-select'
};
const strings$c = {
  CHANGE_EVENT: 'MDCSelect:change',
  LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
  LABEL_SELECTOR: '.mdc-floating-label',
  NATIVE_CONTROL_SELECTOR: '.mdc-select__native-control'
};
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCSelectFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$d;
  }

  static get strings() {
    return strings$c;
  }

  static get defaultAdapter() {
    return {
      addClass: () =>
      /* className: string */
      {},
      removeClass: () =>
      /* className: string */
      {},
      floatLabel: () =>
      /* value: boolean */
      {},
      activateBottomLine: () => {},
      deactivateBottomLine: () => {},
      registerInteractionHandler: () =>
      /* type: string, handler: EventListener */
      {},
      deregisterInteractionHandler: () =>
      /* type: string, handler: EventListener */
      {},
      getSelectedIndex: () =>
      /* number */
      -1,
      setSelectedIndex: () =>
      /* index: number */
      {},
      setDisabled: () =>
      /* disabled: boolean */
      {},
      getValue: () =>
      /* string */
      '',
      setValue: () =>
      /* value: string */
      {}
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCSelectFoundation.defaultAdapter, adapter));

    this.focusHandler_ = evt => this.handleFocus_(evt);

    this.blurHandler_ = evt => this.handleBlur_(evt);

    this.selectionHandler_ = evt => this.handleSelect_(evt);
  }

  init() {
    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
    this.adapter_.registerInteractionHandler('change', this.selectionHandler_);
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
    this.adapter_.deregisterInteractionHandler('change', this.selectionHandler_);
  }

  setSelectedIndex(index) {
    this.adapter_.setSelectedIndex(index);
    this.floatLabelWithValue_();
  }

  setValue(value) {
    this.adapter_.setValue(value);
    this.setSelectedIndex(this.adapter_.getSelectedIndex());
  }

  setDisabled(disabled) {
    const {
      DISABLED
    } = MDCSelectFoundation.cssClasses;
    this.adapter_.setDisabled(disabled);

    if (disabled) {
      this.adapter_.addClass(DISABLED);
    } else {
      this.adapter_.removeClass(DISABLED);
    }
  }

  floatLabelWithValue_() {
    const optionHasValue = this.adapter_.getValue().length > 0;
    this.adapter_.floatLabel(optionHasValue);
  }

  handleFocus_() {
    this.adapter_.floatLabel(true);
    this.adapter_.activateBottomLine();
  }

  handleBlur_() {
    this.floatLabelWithValue_();
    this.adapter_.deactivateBottomLine();
  }

  handleSelect_() {
    this.setSelectedIndex(this.adapter_.getSelectedIndex());
  }

}
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//


var script$A = {
  name: "MDCFloatingLabel",
  props: {
    label: {
      type: String,
      required: true
    },
    id: String
  },

  mounted() {
    const {
      $el
    } = this;
    this.foundation = new MDCFloatingLabelFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      getWidth: () => $el.offsetWidth,
      registerInteractionHandler: (evtType, handler) => $el.addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType, handler) => $el.removeEventListener(evtType, handler)
    });
    this.foundation.init();
  },

  beforeDestroy() {
    this.foundation.destroy();
  },

  methods: {
    shake(shouldShake) {
      this.foundation.shake(shouldShake);
    },

    float(shouldFloat) {
      this.foundation.float(shouldFloat);
    },

    getWidth() {
      return this.foundation.getWidth();
    }

  }
};
/* script */

const __vue_script__$A = script$A;
/* template */

var __vue_render__$A = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("label", {
    staticClass: "mdc-floating-label",
    attrs: {
      for: _vm.id
    }
  }, [_vm._v(_vm._s(_vm.label))]);
};

var __vue_staticRenderFns__$A = [];
__vue_render__$A._withStripped = true;
/* style */

const __vue_inject_styles__$A = undefined;
/* scoped */

const __vue_scope_id__$A = undefined;
/* module identifier */

const __vue_module_identifier__$A = undefined;
/* functional template */

const __vue_is_functional_template__$A = false;
/* component normalizer */

function __vue_normalize__$A(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\floating-label\\FloatingLabel.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCFloatingLabel$1 = __vue_normalize__$A({
  render: __vue_render__$A,
  staticRenderFns: __vue_staticRenderFns__$A
}, __vue_inject_styles__$A, __vue_script__$A, __vue_scope_id__$A, __vue_is_functional_template__$A, __vue_module_identifier__$A, undefined, undefined); //


var script$B = {
  name: 'MDCLineRipple',

  mounted() {
    const {
      $el
    } = this;
    this.foundation = new MDCLineRippleFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      setStyle: (prop, value) => $el.style.setProperty(prop, value),
      registerEventHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterEventHandler: (type, handler) => $el.removeEventListener(type, handler)
    });
    this.foundation.init();
  },

  beforeDestroy() {
    this.foundation.destroy();
  },

  methods: {
    activate() {
      this.foundation.activate();
    },

    deactivate() {
      this.foundation.deactivate();
    },

    setRippleCenter(normalizedX) {
      this.foundation.setRippleCenter(normalizedX);
    }

  }
};
/* script */

const __vue_script__$B = script$B;
/* template */

var __vue_render__$B = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-line-ripple"
  });
};

var __vue_staticRenderFns__$B = [];
__vue_render__$B._withStripped = true;
/* style */

const __vue_inject_styles__$B = undefined;
/* scoped */

const __vue_scope_id__$B = undefined;
/* module identifier */

const __vue_module_identifier__$B = undefined;
/* functional template */

const __vue_is_functional_template__$B = false;
/* component normalizer */

function __vue_normalize__$B(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\line-ripple\\LineRipple.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCLineRipple$1 = __vue_normalize__$B({
  render: __vue_render__$B,
  staticRenderFns: __vue_staticRenderFns__$B
}, __vue_inject_styles__$B, __vue_script__$B, __vue_scope_id__$B, __vue_is_functional_template__$B, __vue_module_identifier__$B, undefined, undefined); //


var script$C = {
  name: 'MDCSelect',
  components: {
    MdcFloatingLabel: MDCFloatingLabel$1,
    MdcLineRipple: MDCLineRipple$1
  },
  model: {
    prop: 'selected',
    event: 'select'
  },
  props: {
    label: {
      type: String,
      required: true
    },
    boxed: Boolean,
    disabled: Boolean,
    selected: [String, Number]
  },
  computed: {
    cssClasses() {
      return {
        'mdc-select--box': this.boxed,
        'mdc-select--disabled': this.disabled
      };
    },

    model: {
      get() {
        return this.selected;
      },

      set(value) {
        this.$emit('select', value);
      }

    }
  },

  mounted() {
    const {
      $el
    } = this;
    const {
      select,
      floatingLabel,
      lineRipple
    } = this.$refs;
    this.foundation = new MDCSelectFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      floatLabel: shouldFloat => floatingLabel.float(shouldFloat),
      activateBottomLine: () => lineRipple.activate(),
      deactivateBottomLine: () => lineRipple.deactivate(),
      setDisabled: disabled => {
        select.disabled = disabled;
      },
      registerInteractionHandler: (type, handler) => select.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => select.removeEventListener(type, handler),
      getSelectedIndex: () => select.selectedIndex,
      setSelectedIndex: index => {
        select.selectedIndex = index;
      },
      getValue: () => select.value,
      setValue: value => {
        select.value = value;
      }
    });
    this.foundation.init();
  },

  beforeDestroy() {
    this.foundation.destroy();
  }

};
/* script */

const __vue_script__$C = script$C;
/* template */

var __vue_render__$C = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-select",
    class: _vm.cssClasses
  }, [_c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.model,
      expression: "model"
    }],
    ref: "select",
    staticClass: "mdc-select__native-control",
    attrs: {
      disabled: _vm.disabled
    },
    on: {
      change: function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.model = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_vm._t("default")], 2), _c("mdc-floating-label", {
    ref: "floatingLabel",
    attrs: {
      label: _vm.label
    }
  }), _c("mdc-line-ripple", {
    ref: "lineRipple"
  })], 1);
};

var __vue_staticRenderFns__$C = [];
__vue_render__$C._withStripped = true;
/* style */

const __vue_inject_styles__$C = undefined;
/* scoped */

const __vue_scope_id__$C = undefined;
/* module identifier */

const __vue_module_identifier__$C = undefined;
/* functional template */

const __vue_is_functional_template__$C = false;
/* component normalizer */

function __vue_normalize__$C(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\select\\Select.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCSelect$1 = __vue_normalize__$C({
  render: __vue_render__$C,
  staticRenderFns: __vue_staticRenderFns__$C
}, __vue_inject_styles__$C, __vue_script__$C, __vue_scope_id__$C, __vue_is_functional_template__$C, __vue_module_identifier__$C, undefined, undefined); //
//
//
//


var script$D = {
  name: 'MDCSelectItem',
  props: {
    label: {
      type: [String, Number],
      required: true
    },
    disabled: Boolean,
    value: [String, Number]
  }
};
/* script */

const __vue_script__$D = script$D;
/* template */

var __vue_render__$D = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("option", {
    attrs: {
      disabled: _vm.disabled
    },
    domProps: {
      value: _vm.value || _vm.label
    }
  }, [_vm._v(_vm._s(_vm.label))]);
};

var __vue_staticRenderFns__$D = [];
__vue_render__$D._withStripped = true;
/* style */

const __vue_inject_styles__$D = undefined;
/* scoped */

const __vue_scope_id__$D = undefined;
/* module identifier */

const __vue_module_identifier__$D = undefined;
/* functional template */

const __vue_is_functional_template__$D = false;
/* component normalizer */

function __vue_normalize__$D(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\select\\SelectItem.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCSelectItem = __vue_normalize__$D({
  render: __vue_render__$D,
  staticRenderFns: __vue_staticRenderFns__$D
}, __vue_inject_styles__$D, __vue_script__$D, __vue_scope_id__$D, __vue_is_functional_template__$D, __vue_module_identifier__$D, undefined, undefined); //
//
//
//
//


var script$E = {
  name: 'MDCSelectItemGroup',
  props: {
    label: {
      type: String,
      required: true
    }
  }
};
/* script */

const __vue_script__$E = script$E;
/* template */

var __vue_render__$E = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("optgroup", {
    attrs: {
      label: _vm.label
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$E = [];
__vue_render__$E._withStripped = true;
/* style */

const __vue_inject_styles__$E = undefined;
/* scoped */

const __vue_scope_id__$E = undefined;
/* module identifier */

const __vue_module_identifier__$E = undefined;
/* functional template */

const __vue_is_functional_template__$E = false;
/* component normalizer */

function __vue_normalize__$E(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\select\\SelectItemGroup.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCSelectItemGroup = __vue_normalize__$E({
  render: __vue_render__$E,
  staticRenderFns: __vue_staticRenderFns__$E
}, __vue_inject_styles__$E, __vue_script__$E, __vue_scope_id__$E, __vue_is_functional_template__$E, __vue_module_identifier__$E, undefined, undefined);

function install$h(Vue, register) {
  register(MDCSelect$1, MDCSelectItem, MDCSelectItemGroup);
}

var Select =
/*#__PURE__*/
Object.freeze({
  MDCSelect: MDCSelect$1,
  MDCSelectItem: MDCSelectItem,
  MDCSelectItemGroup: MDCSelectItemGroup,
  install: install$h
});
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses$e = {
  ROOT: 'mdc-snackbar',
  TEXT: 'mdc-snackbar__text',
  ACTION_WRAPPER: 'mdc-snackbar__action-wrapper',
  ACTION_BUTTON: 'mdc-snackbar__action-button',
  ACTIVE: 'mdc-snackbar--active',
  MULTILINE: 'mdc-snackbar--multiline',
  ACTION_ON_BOTTOM: 'mdc-snackbar--action-on-bottom'
};
const strings$d = {
  TEXT_SELECTOR: '.mdc-snackbar__text',
  ACTION_WRAPPER_SELECTOR: '.mdc-snackbar__action-wrapper',
  ACTION_BUTTON_SELECTOR: '.mdc-snackbar__action-button',
  SHOW_EVENT: 'MDCSnackbar:show',
  HIDE_EVENT: 'MDCSnackbar:hide'
};
const numbers$3 = {
  MESSAGE_TIMEOUT: 2750
};
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCSnackbarFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$e;
  }

  static get strings() {
    return strings$d;
  }

  static get defaultAdapter() {
    return {
      addClass: () =>
      /* className: string */
      {},
      removeClass: () =>
      /* className: string */
      {},
      setAriaHidden: () => {},
      unsetAriaHidden: () => {},
      setActionAriaHidden: () => {},
      unsetActionAriaHidden: () => {},
      setActionText: () =>
      /* actionText: string */
      {},
      setMessageText: () =>
      /* message: string */
      {},
      setFocus: () => {},
      visibilityIsHidden: () =>
      /* boolean */
      false,
      registerCapturedBlurHandler: () =>
      /* handler: EventListener */
      {},
      deregisterCapturedBlurHandler: () =>
      /* handler: EventListener */
      {},
      registerVisibilityChangeHandler: () =>
      /* handler: EventListener */
      {},
      deregisterVisibilityChangeHandler: () =>
      /* handler: EventListener */
      {},
      registerCapturedInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      deregisterCapturedInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      registerActionClickHandler: () =>
      /* handler: EventListener */
      {},
      deregisterActionClickHandler: () =>
      /* handler: EventListener */
      {},
      registerTransitionEndHandler: () =>
      /* handler: EventListener */
      {},
      deregisterTransitionEndHandler: () =>
      /* handler: EventListener */
      {},
      notifyShow: () => {},
      notifyHide: () => {}
    };
  }

  get active() {
    return this.active_;
  }

  constructor(adapter) {
    super(Object.assign(MDCSnackbarFoundation.defaultAdapter, adapter));
    this.active_ = false;
    this.actionWasClicked_ = false;
    this.dismissOnAction_ = true;
    this.firstFocus_ = true;
    this.pointerDownRecognized_ = false;
    this.snackbarHasFocus_ = false;
    this.snackbarData_ = null;
    this.queue_ = [];

    this.actionClickHandler_ = () => {
      this.actionWasClicked_ = true;
      this.invokeAction_();
    };

    this.visibilitychangeHandler_ = () => {
      clearTimeout(this.timeoutId_);
      this.snackbarHasFocus_ = true;

      if (!this.adapter_.visibilityIsHidden()) {
        setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$3.MESSAGE_TIMEOUT);
      }
    };

    this.interactionHandler_ = evt => {
      if (evt.type == 'touchstart' || evt.type == 'mousedown') {
        this.pointerDownRecognized_ = true;
      }

      this.handlePossibleTabKeyboardFocus_(evt);

      if (evt.type == 'focus') {
        this.pointerDownRecognized_ = false;
      }
    };

    this.blurHandler_ = () => {
      clearTimeout(this.timeoutId_);
      this.snackbarHasFocus_ = false;
      this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$3.MESSAGE_TIMEOUT);
    };
  }

  init() {
    this.adapter_.registerActionClickHandler(this.actionClickHandler_);
    this.adapter_.setAriaHidden();
    this.adapter_.setActionAriaHidden();
  }

  destroy() {
    this.adapter_.deregisterActionClickHandler(this.actionClickHandler_);
    this.adapter_.deregisterCapturedBlurHandler(this.blurHandler_);
    this.adapter_.deregisterVisibilityChangeHandler(this.visibilitychangeHandler_);
    ['touchstart', 'mousedown', 'focus'].forEach(evtType => {
      this.adapter_.deregisterCapturedInteractionHandler(evtType, this.interactionHandler_);
    });
  }

  dismissesOnAction() {
    return this.dismissOnAction_;
  }

  setDismissOnAction(dismissOnAction) {
    this.dismissOnAction_ = !!dismissOnAction;
  }

  show(data) {
    if (!data) {
      throw new Error('Please provide a data object with at least a message to display.');
    }

    if (!data.message) {
      throw new Error('Please provide a message to be displayed.');
    }

    if (data.actionHandler && !data.actionText) {
      throw new Error('Please provide action text with the handler.');
    }

    if (this.active) {
      this.queue_.push(data);
      return;
    }

    clearTimeout(this.timeoutId_);
    this.snackbarData_ = data;
    this.firstFocus_ = true;
    this.adapter_.registerVisibilityChangeHandler(this.visibilitychangeHandler_);
    this.adapter_.registerCapturedBlurHandler(this.blurHandler_);
    ['touchstart', 'mousedown', 'focus'].forEach(evtType => {
      this.adapter_.registerCapturedInteractionHandler(evtType, this.interactionHandler_);
    });
    const {
      ACTIVE,
      MULTILINE,
      ACTION_ON_BOTTOM
    } = cssClasses$e;
    this.adapter_.setMessageText(this.snackbarData_.message);

    if (this.snackbarData_.multiline) {
      this.adapter_.addClass(MULTILINE);

      if (this.snackbarData_.actionOnBottom) {
        this.adapter_.addClass(ACTION_ON_BOTTOM);
      }
    }

    if (this.snackbarData_.actionHandler) {
      this.adapter_.setActionText(this.snackbarData_.actionText);
      this.actionHandler_ = this.snackbarData_.actionHandler;
      this.setActionHidden_(false);
    } else {
      this.setActionHidden_(true);
      this.actionHandler_ = null;
      this.adapter_.setActionText(null);
    }

    this.active_ = true;
    this.adapter_.addClass(ACTIVE);
    this.adapter_.unsetAriaHidden();
    this.adapter_.notifyShow();
    this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$3.MESSAGE_TIMEOUT);
  }

  handlePossibleTabKeyboardFocus_() {
    const hijackFocus = this.firstFocus_ && !this.pointerDownRecognized_;

    if (hijackFocus) {
      this.setFocusOnAction_();
    }

    this.firstFocus_ = false;
  }

  setFocusOnAction_() {
    this.adapter_.setFocus();
    this.snackbarHasFocus_ = true;
    this.firstFocus_ = false;
  }

  invokeAction_() {
    try {
      if (!this.actionHandler_) {
        return;
      }

      this.actionHandler_();
    } finally {
      if (this.dismissOnAction_) {
        this.cleanup_();
      }
    }
  }

  cleanup_() {
    const allowDismissal = !this.snackbarHasFocus_ || this.actionWasClicked_;

    if (allowDismissal) {
      const {
        ACTIVE,
        MULTILINE,
        ACTION_ON_BOTTOM
      } = cssClasses$e;
      this.adapter_.removeClass(ACTIVE);

      const handler = () => {
        clearTimeout(this.timeoutId_);
        this.adapter_.deregisterTransitionEndHandler(handler);
        this.adapter_.removeClass(MULTILINE);
        this.adapter_.removeClass(ACTION_ON_BOTTOM);
        this.setActionHidden_(true);
        this.adapter_.setAriaHidden();
        this.active_ = false;
        this.snackbarHasFocus_ = false;
        this.adapter_.notifyHide();
        this.showNext_();
      };

      this.adapter_.registerTransitionEndHandler(handler);
    }
  }

  showNext_() {
    if (!this.queue_.length) {
      return;
    }

    this.show(this.queue_.shift());
  }

  setActionHidden_(isHidden) {
    if (isHidden) {
      this.adapter_.setActionAriaHidden();
    } else {
      this.adapter_.unsetActionAriaHidden();
    }
  }

}
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//


const transitionend = getCorrectEventName(window, 'transitionend');
var script$F = {
  name: 'MDCSnackbar',
  props: {
    alignStart: Boolean,
    dismissesOnAction: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    dismissesOnAction(value) {
      this.foundation.setDismissOnAction(value);
    }

  },

  data() {
    return {
      messageText: null,
      actionText: null,
      hidden: true,
      actionHidden: true
    };
  },

  mounted() {
    const {
      $el
    } = this;
    const {
      actionButton
    } = this.$refs;
    this.foundation = new MDCSnackbarFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      setAriaHidden: () => {
        this.hidden = true;
      },
      unsetAriaHidden: () => {
        this.hidden = false;
      },
      setActionAriaHidden: () => {
        this.actionHidden = true;
      },
      unsetActionAriaHidden: () => {
        this.actionHidden = false;
      },
      setActionText: text => {
        this.actionText = text;
      },
      setMessageText: text => {
        this.messageText = text;
      },
      setFocus: () => actionButton.focus(),
      visibilityIsHidden: () => document.hidden,
      // Interactions
      registerCapturedBlurHandler: handler => actionButton.addEventListener('blur', handler, true),
      deregisterCapturedBlurHandler: handler => actionButton.removeEventListener('blur', handler, true),
      registerVisibilityChangeHandler: handler => document.addEventListener('visibilitychange', handler),
      deregisterVisibilityChangeHandler: handler => document.removeEventListener('visibilitychange', handler),
      registerCapturedInteractionHandler: (evt, handler) => document.body.addEventListener(evt, handler, true),
      deregisterCapturedInteractionHandler: (evt, handler) => document.body.removeEventListener(evt, handler, true),
      registerActionClickHandler: handler => actionButton.addEventListener('click', handler),
      deregisterActionClickHandler: handler => actionButton.removeEventListener('click', handler),
      registerTransitionEndHandler: handler => $el.addEventListener(transitionend, handler),
      deregisterTransitionEndHandler: handler => $el.removeEventListener(transitionend, handler),
      // Events
      notifyShow: () => this.$emit('show'),
      notifyHide: () => this.$emit('hide')
    });
    this.foundation.init();
    this.foundation.setDismissOnAction(this.dismissesOnAction);
  },

  beforeDestroy() {
    this.foundation.destroy();
  },

  computed: {
    cssClasses() {
      return this.alignStart && 'mdc-snackbar--align-start';
    }

  },
  methods: {
    show(data) {
      if (typeof data === 'string') {
        data = {
          message: data
        };
      }

      this.foundation.show(data);
    }

  }
};
/* script */

const __vue_script__$F = script$F;
/* template */

var __vue_render__$F = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-snackbar",
    class: _vm.cssClasses,
    attrs: {
      "aria-live": "assertive",
      "aria-atomic": "true",
      "aria-hidden": _vm.hidden && "true"
    }
  }, [_c("div", {
    staticClass: "mdc-snackbar__text"
  }, [_vm._v(_vm._s(_vm.messageText))]), _c("div", {
    staticClass: "mdc-snackbar__action__wrapper"
  }, [_c("button", {
    ref: "actionButton",
    staticClass: "mdc-snackbar__action-button",
    attrs: {
      type: "button",
      "aria-hidden": _vm.actionHidden && "true"
    }
  }, [_vm._v(_vm._s(_vm.actionText))])])]);
};

var __vue_staticRenderFns__$F = [];
__vue_render__$F._withStripped = true;
/* style */

const __vue_inject_styles__$F = undefined;
/* scoped */

const __vue_scope_id__$F = undefined;
/* module identifier */

const __vue_module_identifier__$F = undefined;
/* functional template */

const __vue_is_functional_template__$F = false;
/* component normalizer */

function __vue_normalize__$F(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\snackbar\\Snackbar.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCSnackbar$1 = __vue_normalize__$F({
  render: __vue_render__$F,
  staticRenderFns: __vue_staticRenderFns__$F
}, __vue_inject_styles__$F, __vue_script__$F, __vue_scope_id__$F, __vue_is_functional_template__$F, __vue_module_identifier__$F, undefined, undefined);

function install$i(Vue, register) {
  register(MDCSnackbar$1);
}

var Snackbar =
/*#__PURE__*/
Object.freeze({
  MDCSnackbar: MDCSnackbar$1,
  install: install$i
}); //
//
//
//
//
//
//

var script$G = {
  name: 'MDCSwitch',
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    disabled: Boolean,
    value: String,
    checked: [Boolean, Array, String]
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },

      set(value) {
        this.$emit('change', value);
      }

    },

    cssClasses() {
      return this.disabled && 'mdc-switch--disabled';
    }

  }
};
/* script */

const __vue_script__$G = script$G;
/* template */

var __vue_render__$G = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-switch",
    class: _vm.cssClasses
  }, [_c("input", _vm._b({
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.model,
      expression: "model"
    }],
    staticClass: "mdc-switch__native-control",
    attrs: {
      type: "checkbox",
      role: "switch",
      disabled: _vm.disabled
    },
    domProps: {
      value: _vm.value,
      checked: Array.isArray(_vm.model) ? _vm._i(_vm.model, _vm.value) > -1 : _vm.model
    },
    on: {
      change: function ($event) {
        var $$a = _vm.model,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = _vm.value,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.model = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.model = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.model = $$c;
        }
      }
    }
  }, "input", _vm.$attrs, false)), _vm._m(0)]);
};

var __vue_staticRenderFns__$G = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-switch__background"
  }, [_c("div", {
    staticClass: "mdc-switch__knob"
  })]);
}];
__vue_render__$G._withStripped = true;
/* style */

const __vue_inject_styles__$G = undefined;
/* scoped */

const __vue_scope_id__$G = undefined;
/* module identifier */

const __vue_module_identifier__$G = undefined;
/* functional template */

const __vue_is_functional_template__$G = false;
/* component normalizer */

function __vue_normalize__$G(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\switch\\Switch.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCSwitch = __vue_normalize__$G({
  render: __vue_render__$G,
  staticRenderFns: __vue_staticRenderFns__$G
}, __vue_inject_styles__$G, __vue_script__$G, __vue_scope_id__$G, __vue_is_functional_template__$G, __vue_module_identifier__$G, undefined, undefined);

function install$j(Vue, register) {
  register(MDCSwitch);
}

var Switch =
/*#__PURE__*/
Object.freeze({
  MDCSwitch: MDCSwitch,
  install: install$j
});
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */

const strings$e = {
  ARIA_CONTROLS: 'aria-controls',
  INPUT_SELECTOR: '.mdc-text-field__input',
  LABEL_SELECTOR: '.mdc-floating-label',
  ICON_SELECTOR: '.mdc-text-field__icon',
  OUTLINE_SELECTOR: '.mdc-notched-outline',
  LINE_RIPPLE_SELECTOR: '.mdc-line-ripple'
};
/** @enum {string} */

const cssClasses$f = {
  ROOT: 'mdc-text-field',
  UPGRADED: 'mdc-text-field--upgraded',
  DISABLED: 'mdc-text-field--disabled',
  DENSE: 'mdc-text-field--dense',
  FOCUSED: 'mdc-text-field--focused',
  INVALID: 'mdc-text-field--invalid',
  BOX: 'mdc-text-field--box',
  OUTLINED: 'mdc-text-field--outlined'
};
/** @enum {number} */

const numbers$4 = {
  LABEL_SCALE: 0.75,
  DENSE_LABEL_SCALE: 0.923
};
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */

const strings$f = {
  ARIA_HIDDEN: 'aria-hidden',
  ROLE: 'role'
};
/** @enum {string} */

const cssClasses$g = {
  HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
  HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg'
};
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCTextFieldHelperTextAdapter>}
 * @final
 */

class MDCTextFieldHelperTextFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$g;
  }
  /** @return enum {string} */


  static get strings() {
    return strings$f;
  }
  /**
   * {@see MDCTextFieldHelperTextAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextFieldHelperTextAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCTextFieldHelperTextAdapter} */
      {
        addClass: () => {},
        removeClass: () => {},
        hasClass: () => {},
        setAttr: () => {},
        removeAttr: () => {},
        setContent: () => {}
      }
    );
  }
  /**
   * @param {!MDCTextFieldHelperTextAdapter} adapter
   */


  constructor(adapter) {
    super(Object.assign(MDCTextFieldHelperTextFoundation.defaultAdapter, adapter));
  }
  /**
   * Sets the content of the helper text field.
   * @param {string} content
   */


  setContent(content) {
    this.adapter_.setContent(content);
  }
  /** @param {boolean} isPersistent Sets the persistency of the helper text. */


  setPersistent(isPersistent) {
    if (isPersistent) {
      this.adapter_.addClass(cssClasses$g.HELPER_TEXT_PERSISTENT);
    } else {
      this.adapter_.removeClass(cssClasses$g.HELPER_TEXT_PERSISTENT);
    }
  }
  /**
   * @param {boolean} isValidation True to make the helper text act as an
   *   error validation message.
   */


  setValidation(isValidation) {
    if (isValidation) {
      this.adapter_.addClass(cssClasses$g.HELPER_TEXT_VALIDATION_MSG);
    } else {
      this.adapter_.removeClass(cssClasses$g.HELPER_TEXT_VALIDATION_MSG);
    }
  }
  /** Makes the helper text visible to the screen reader. */


  showToScreenReader() {
    this.adapter_.removeAttr(strings$f.ARIA_HIDDEN);
  }
  /**
   * Sets the validity of the helper text based on the input validity.
   * @param {boolean} inputIsValid
   */


  setValidity(inputIsValid) {
    const helperTextIsPersistent = this.adapter_.hasClass(cssClasses$g.HELPER_TEXT_PERSISTENT);
    const helperTextIsValidationMsg = this.adapter_.hasClass(cssClasses$g.HELPER_TEXT_VALIDATION_MSG);
    const validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

    if (validationMsgNeedsDisplay) {
      this.adapter_.setAttr(strings$f.ROLE, 'alert');
    } else {
      this.adapter_.removeAttr(strings$f.ROLE);
    }

    if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
      this.hide_();
    }
  }
  /**
   * Hides the help text from screen readers.
   * @private
   */


  hide_() {
    this.adapter_.setAttr(strings$f.ARIA_HIDDEN, 'true');
  }

}
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */


const strings$g = {
  ICON_EVENT: 'MDCTextField:icon',
  ICON_ROLE: 'button'
};
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCTextFieldIconAdapter>}
 * @final
 */

class MDCTextFieldIconFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get strings() {
    return strings$g;
  }
  /**
   * {@see MDCTextFieldIconAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextFieldIconAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCTextFieldIconAdapter} */
      {
        getAttr: () => {},
        setAttr: () => {},
        removeAttr: () => {},
        registerInteractionHandler: () => {},
        deregisterInteractionHandler: () => {},
        notifyIconAction: () => {}
      }
    );
  }
  /**
   * @param {!MDCTextFieldIconAdapter} adapter
   */


  constructor(adapter) {
    super(Object.assign(MDCTextFieldIconFoundation.defaultAdapter, adapter));
    /** @private {string?} */

    this.savedTabIndex_ = null;
    /** @private {function(!Event): undefined} */

    this.interactionHandler_ = evt => this.handleInteraction(evt);
  }

  init() {
    this.savedTabIndex_ = this.adapter_.getAttr('tabindex');
    ['click', 'keydown'].forEach(evtType => {
      this.adapter_.registerInteractionHandler(evtType, this.interactionHandler_);
    });
  }

  destroy() {
    ['click', 'keydown'].forEach(evtType => {
      this.adapter_.deregisterInteractionHandler(evtType, this.interactionHandler_);
    });
  }
  /**
   * Sets the content of the helper text field.
   * @param {boolean} disabled
   */


  setDisabled(disabled) {
    if (!this.savedTabIndex_) {
      return;
    }

    if (disabled) {
      this.adapter_.setAttr('tabindex', '-1');
      this.adapter_.removeAttr('role');
    } else {
      this.adapter_.setAttr('tabindex', this.savedTabIndex_);
      this.adapter_.setAttr('role', strings$g.ICON_ROLE);
    }
  }
  /**
   * Handles an interaction event
   * @param {!Event} evt
   */


  handleInteraction(evt) {
    if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
      this.adapter_.notifyIconAction();
    }
  }

}
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
// under section: `Validation-related attributes`


const VALIDATION_ATTR_WHITELIST = ['pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength'];
/**
 * @extends {MDCFoundation<!MDCTextFieldAdapter>}
 * @final
 */

class MDCTextFieldFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$f;
  }
  /** @return enum {string} */


  static get strings() {
    return strings$e;
  }
  /** @return enum {string} */


  static get numbers() {
    return numbers$4;
  }
  /** @return {boolean} */


  get shouldShake() {
    return !this.isValid() && !this.isFocused_;
  }
  /** @return {boolean} */


  get shouldFloat() {
    return !this.isBadInput_() && (!!this.getValue() || this.isFocused_);
  }
  /**
   * {@see MDCTextFieldAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextFieldAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCTextFieldAdapter} */
      {
        addClass: () => {},
        removeClass: () => {},
        hasClass: () => {},
        registerTextFieldInteractionHandler: () => {},
        deregisterTextFieldInteractionHandler: () => {},
        registerInputInteractionHandler: () => {},
        deregisterInputInteractionHandler: () => {},
        registerValidationAttributeChangeHandler: () => {},
        deregisterValidationAttributeChangeHandler: () => {},
        getNativeInput: () => {},
        isFocused: () => {},
        isRtl: () => {},
        activateLineRipple: () => {},
        deactivateLineRipple: () => {},
        setLineRippleTransformOrigin: () => {},
        shakeLabel: () => {},
        floatLabel: () => {},
        hasLabel: () => {},
        getLabelWidth: () => {},
        hasOutline: () => {},
        notchOutline: () => {},
        closeOutline: () => {}
      }
    );
  }
  /**
   * @param {!MDCTextFieldAdapter} adapter
   * @param {!FoundationMapType=} foundationMap Map from subcomponent names to their subfoundations.
   */


  constructor(adapter, foundationMap =
  /** @type {!FoundationMapType} */
  {}) {
    super(Object.assign(MDCTextFieldFoundation.defaultAdapter, adapter));
    /** @type {!MDCTextFieldHelperTextFoundation|undefined} */

    this.helperText_ = foundationMap.helperText;
    /** @type {!MDCTextFieldIconFoundation|undefined} */

    this.icon_ = foundationMap.icon;
    /** @private {boolean} */

    this.isFocused_ = false;
    /** @private {boolean} */

    this.receivedUserInput_ = false;
    /** @private {boolean} */

    this.useCustomValidityChecking_ = false;
    /** @private {boolean} */

    this.isValid_ = true;
    /** @private {function(): undefined} */

    this.inputFocusHandler_ = () => this.activateFocus();
    /** @private {function(): undefined} */


    this.inputBlurHandler_ = () => this.deactivateFocus();
    /** @private {function(): undefined} */


    this.inputInputHandler_ = () => this.autoCompleteFocus();
    /** @private {function(!Event): undefined} */


    this.setPointerXOffset_ = evt => this.setTransformOrigin(evt);
    /** @private {function(!Event): undefined} */


    this.textFieldInteractionHandler_ = () => this.handleTextFieldInteraction();
    /** @private {function(!Array): undefined} */


    this.validationAttributeChangeHandler_ = mutations => this.handleValidationAttributeMutation_(mutations);
    /** @private {!MutationObserver} */


    this.validationObserver_;
  }

  init() {
    this.adapter_.addClass(MDCTextFieldFoundation.cssClasses.UPGRADED); // Ensure label does not collide with any pre-filled value.

    if (this.adapter_.hasLabel() && this.getValue()) {
      this.adapter_.floatLabel(this.shouldFloat);
      this.notchOutline(this.shouldFloat);
    }

    if (this.adapter_.isFocused()) {
      this.inputFocusHandler_();
    }

    this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
    ['mousedown', 'touchstart'].forEach(evtType => {
      this.adapter_.registerInputInteractionHandler(evtType, this.setPointerXOffset_);
    });
    ['click', 'keydown'].forEach(evtType => {
      this.adapter_.registerTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler_);
    });
    this.validationObserver_ = this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
  }

  destroy() {
    this.adapter_.removeClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
    this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
    ['mousedown', 'touchstart'].forEach(evtType => {
      this.adapter_.deregisterInputInteractionHandler(evtType, this.setPointerXOffset_);
    });
    ['click', 'keydown'].forEach(evtType => {
      this.adapter_.deregisterTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler_);
    });
    this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_);
  }
  /**
   * Handles user interactions with the Text Field.
   */


  handleTextFieldInteraction() {
    if (this.adapter_.getNativeInput().disabled) {
      return;
    }

    this.receivedUserInput_ = true;
  }
  /**
   * Handles validation attribute changes
   * @param {Array<MutationRecord>} mutationsList
   * @private
   */


  handleValidationAttributeMutation_(mutationsList) {
    mutationsList.some(mutation => {
      if (VALIDATION_ATTR_WHITELIST.indexOf(mutation.attributeName) > -1) {
        this.styleValidity_(true);
        return true;
      }
    });
  }
  /**
   * Opens/closes the notched outline.
   * @param {boolean} openNotch
   */


  notchOutline(openNotch) {
    if (!this.adapter_.hasOutline() || !this.adapter_.hasLabel()) {
      return;
    }

    if (openNotch) {
      const isDense = this.adapter_.hasClass(cssClasses$f.DENSE);
      const labelScale = isDense ? numbers$4.DENSE_LABEL_SCALE : numbers$4.LABEL_SCALE;
      const labelWidth = this.adapter_.getLabelWidth() * labelScale;
      const isRtl = this.adapter_.isRtl();
      this.adapter_.notchOutline(labelWidth, isRtl);
    } else {
      this.adapter_.closeOutline();
    }
  }
  /**
   * Activates the text field focus state.
   */


  activateFocus() {
    this.isFocused_ = true;
    this.styleFocused_(this.isFocused_);
    this.adapter_.activateLineRipple();
    this.notchOutline(this.shouldFloat);

    if (this.adapter_.hasLabel()) {
      this.adapter_.shakeLabel(this.shouldShake);
      this.adapter_.floatLabel(this.shouldFloat);
    }

    if (this.helperText_) {
      this.helperText_.showToScreenReader();
    }
  }
  /**
   * Sets the line ripple's transform origin, so that the line ripple activate
   * animation will animate out from the user's click location.
   * @param {!Event} evt
   */


  setTransformOrigin(evt) {
    const targetClientRect = evt.target.getBoundingClientRect();
    const evtCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    const normalizedX = evtCoords.x - targetClientRect.left;
    this.adapter_.setLineRippleTransformOrigin(normalizedX);
  }
  /**
   * Activates the Text Field's focus state in cases when the input value
   * changes without user input (e.g. programatically).
   */


  autoCompleteFocus() {
    if (!this.receivedUserInput_) {
      this.activateFocus();
    }
  }
  /**
   * Deactivates the Text Field's focus state.
   */


  deactivateFocus() {
    this.isFocused_ = false;
    this.adapter_.deactivateLineRipple();
    const input = this.getNativeInput_();
    const shouldRemoveLabelFloat = !input.value && !this.isBadInput_();
    const isValid = this.isValid();
    this.styleValidity_(isValid);
    this.styleFocused_(this.isFocused_);

    if (this.adapter_.hasLabel()) {
      this.adapter_.shakeLabel(this.shouldShake);
      this.adapter_.floatLabel(this.shouldFloat);
      this.notchOutline(this.shouldFloat);
    }

    if (shouldRemoveLabelFloat) {
      this.receivedUserInput_ = false;
    }
  }
  /**
   * @return {string} The value of the input Element.
   */


  getValue() {
    return this.getNativeInput_().value;
  }
  /**
   * @param {string} value The value to set on the input Element.
   */


  setValue(value) {
    this.getNativeInput_().value = value;
    const isValid = this.isValid();
    this.styleValidity_(isValid);

    if (this.adapter_.hasLabel()) {
      this.adapter_.shakeLabel(this.shouldShake);
      this.adapter_.floatLabel(this.shouldFloat);
      this.notchOutline(this.shouldFloat);
    }
  }
  /**
   * @return {boolean} If a custom validity is set, returns that value.
   *     Otherwise, returns the result of native validity checks.
   */


  isValid() {
    return this.useCustomValidityChecking_ ? this.isValid_ : this.isNativeInputValid_();
  }
  /**
   * @param {boolean} isValid Sets the validity state of the Text Field.
   */


  setValid(isValid) {
    this.useCustomValidityChecking_ = true;
    this.isValid_ = isValid; // Retrieve from the getter to ensure correct logic is applied.

    isValid = this.isValid();
    this.styleValidity_(isValid);

    if (this.adapter_.hasLabel()) {
      this.adapter_.shakeLabel(this.shouldShake);
    }
  }
  /**
   * @return {boolean} True if the Text Field is disabled.
   */


  isDisabled() {
    return this.getNativeInput_().disabled;
  }
  /**
   * @param {boolean} disabled Sets the text-field disabled or enabled.
   */


  setDisabled(disabled) {
    this.getNativeInput_().disabled = disabled;
    this.styleDisabled_(disabled);
  }
  /**
   * @param {string} content Sets the content of the helper text.
   */


  setHelperTextContent(content) {
    if (this.helperText_) {
      this.helperText_.setContent(content);
    }
  }
  /**
   * @return {boolean} True if the Text Field input fails in converting the
   *     user-supplied value.
   * @private
   */


  isBadInput_() {
    return this.getNativeInput_().validity.badInput;
  }
  /**
   * @return {boolean} The result of native validity checking
   *     (ValidityState.valid).
   */


  isNativeInputValid_() {
    return this.getNativeInput_().validity.valid;
  }
  /**
   * Styles the component based on the validity state.
   * @param {boolean} isValid
   * @private
   */


  styleValidity_(isValid) {
    const {
      INVALID
    } = MDCTextFieldFoundation.cssClasses;

    if (isValid) {
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.addClass(INVALID);
    }

    if (this.helperText_) {
      this.helperText_.setValidity(isValid);
    }
  }
  /**
   * Styles the component based on the focused state.
   * @param {boolean} isFocused
   * @private
   */


  styleFocused_(isFocused) {
    const {
      FOCUSED
    } = MDCTextFieldFoundation.cssClasses;

    if (isFocused) {
      this.adapter_.addClass(FOCUSED);
    } else {
      this.adapter_.removeClass(FOCUSED);
    }
  }
  /**
   * Styles the component based on the disabled state.
   * @param {boolean} isDisabled
   * @private
   */


  styleDisabled_(isDisabled) {
    const {
      DISABLED,
      INVALID
    } = MDCTextFieldFoundation.cssClasses;

    if (isDisabled) {
      this.adapter_.addClass(DISABLED);
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.removeClass(DISABLED);
    }

    if (this.icon_) {
      this.icon_.setDisabled(isDisabled);
    }
  }
  /**
   * @return {!Element|!NativeInputType} The native text input from the
   * host environment, or a dummy if none exists.
   * @private
   */


  getNativeInput_() {
    return this.adapter_.getNativeInput() ||
    /** @type {!NativeInputType} */
    {
      value: '',
      disabled: false,
      validity: {
        badInput: false,
        valid: true
      }
    };
  }

}
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */


const strings$h = {
  PATH_SELECTOR: '.mdc-notched-outline__path',
  IDLE_OUTLINE_SELECTOR: '.mdc-notched-outline__idle'
};
/** @enum {string} */

const cssClasses$h = {
  OUTLINE_NOTCHED: 'mdc-notched-outline--notched'
};
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCNotchedOutlineAdapter>}
 * @final
 */

class MDCNotchedOutlineFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get strings() {
    return strings$h;
  }
  /** @return enum {string} */


  static get cssClasses() {
    return cssClasses$h;
  }
  /**
   * {@see MDCNotchedOutlineAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCNotchedOutlineAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCNotchedOutlineAdapter} */
      {
        getWidth: () => {},
        getHeight: () => {},
        addClass: () => {},
        removeClass: () => {},
        setOutlinePathAttr: () => {},
        getIdleOutlineStyleValue: () => {}
      }
    );
  }
  /**
   * @param {!MDCNotchedOutlineAdapter} adapter
   */


  constructor(adapter) {
    super(Object.assign(MDCNotchedOutlineFoundation.defaultAdapter, adapter));
  }
  /**
   * Adds the outline notched selector and updates the notch width
   * calculated based off of notchWidth and isRtl.
   * @param {number} notchWidth
   * @param {boolean=} isRtl
   */


  notch(notchWidth, isRtl = false) {
    const {
      OUTLINE_NOTCHED
    } = MDCNotchedOutlineFoundation.cssClasses;
    this.adapter_.addClass(OUTLINE_NOTCHED);
    this.updateSvgPath_(notchWidth, isRtl);
  }
  /**
   * Removes notched outline selector to close the notch in the outline.
   */


  closeNotch() {
    const {
      OUTLINE_NOTCHED
    } = MDCNotchedOutlineFoundation.cssClasses;
    this.adapter_.removeClass(OUTLINE_NOTCHED);
  }
  /**
   * Updates the SVG path of the focus outline element based on the notchWidth
   * and the RTL context.
   * @param {number} notchWidth
   * @param {boolean=} isRtl
   * @private
   */


  updateSvgPath_(notchWidth, isRtl) {
    // Fall back to reading a specific corner's style because Firefox doesn't report the style on border-radius.
    const radiusStyleValue = this.adapter_.getIdleOutlineStyleValue('border-radius') || this.adapter_.getIdleOutlineStyleValue('border-top-left-radius');
    const radius = parseFloat(radiusStyleValue);
    const width = this.adapter_.getWidth();
    const height = this.adapter_.getHeight();
    const cornerWidth = radius + 1.2;
    const leadingStrokeLength = Math.abs(11 - cornerWidth);
    const paddedNotchWidth = notchWidth + 8; // The right, bottom, and left sides of the outline follow the same SVG path.

    const pathMiddle = 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + 'v' + (height - 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + 'h' + (-width + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + 'v' + (-height + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius;
    let path;

    if (!isRtl) {
      path = 'M' + (cornerWidth + leadingStrokeLength + paddedNotchWidth) + ',' + 1 + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength) + pathMiddle + 'h' + leadingStrokeLength;
    } else {
      path = 'M' + (width - cornerWidth - leadingStrokeLength) + ',' + 1 + 'h' + leadingStrokeLength + pathMiddle + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength);
    }

    this.adapter_.setOutlinePathAttr(path);
  }

}
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//


var script$H = {
  name: 'MDCNotchedOutline',

  mounted() {
    const {
      notchedOutline,
      notchedOutlinePath
    } = this.$refs; // The notched-outline-idle element directly precedes this element

    const notchedOutlineIdle = this.$el.nextElementSibling;
    const styles = window.getComputedStyle(notchedOutlineIdle);
    this.foundation = new MDCNotchedOutlineFoundation({
      getWidth: () => notchedOutline.offsetWidth,
      getHeight: () => notchedOutline.offsetHeight,
      addClass: className => notchedOutline.classList.add(className),
      removeClass: className => notchedOutline.classList.remove(className),
      setOutlinePathAttr: value => notchedOutlinePath.setAttribute('d', value),
      getIdleOutlineStyleValue: prop => styles && styles.getPropertyValue(prop)
    });
    this.foundation.init();
  },

  beforeDestroy() {
    this.foundation.destroy();
  },

  methods: {
    notch(labelWidth, isRtl) {
      this.foundation.notch(labelWidth, isRtl);
    },

    closeNotch() {
      this.foundation.closeNotch();
    }

  }
};
/* script */

const __vue_script__$H = script$H;
/* template */

var __vue_render__$H = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    ref: "notchedOutline",
    staticClass: "mdc-notched-outline"
  }, [_c("svg", [_c("path", {
    ref: "notchedOutlinePath",
    staticClass: "mdc-notched-outline__path"
  })])]);
};

var __vue_staticRenderFns__$H = [];
__vue_render__$H._withStripped = true;
/* style */

const __vue_inject_styles__$H = undefined;
/* scoped */

const __vue_scope_id__$H = undefined;
/* module identifier */

const __vue_module_identifier__$H = undefined;
/* functional template */

const __vue_is_functional_template__$H = false;
/* component normalizer */

function __vue_normalize__$H(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\notched-outline\\NotchedOutline.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCNotchedOutline$1 = __vue_normalize__$H({
  render: __vue_render__$H,
  staticRenderFns: __vue_staticRenderFns__$H
}, __vue_inject_styles__$H, __vue_script__$H, __vue_scope_id__$H, __vue_is_functional_template__$H, __vue_module_identifier__$H, undefined, undefined);

function helperTextFactory(helperText) {
  // Check if helperText is really a helper text element
  const $el = helperText && helperText.classList.contains('mdc-text-field-helper-text') ? helperText : null;
  if (!$el) return; // return undefined if a valid helperText doesn't exist

  return new MDCTextFieldHelperTextFoundation({
    addClass: className => $el.classList.add(className),
    removeClass: className => $el.classList.remove(className),
    hasClass: className => $el.classList.contains(className),
    setAttr: (attr, value) => $el.setAttribute(attr, value),
    removeAttr: attr => $el.removeAttribute(attr),
    setContent: content => {
      $el.textContent = content;
    }
  });
}

function iconFactory($el, notifyIconAction) {
  return new MDCTextFieldIconFoundation({
    getAttr: attr => $el.getAttribute(attr),
    setAttr: (attr, value) => $el.setAttribute(attr, value),
    removeAttr: attr => $el.removeAttribute(attr),
    registerInteractionHandler: (tvtType, handler) => $el.addEventListener(type, handler),
    deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
    notifyIconAction
  });
} // Creates a uuid for the labelFor attribute.


function uuid() {
  return '_mdtf_' + Math.random().toString(36).substr(2);
}

var TextfieldMixin = {
  components: {
    MdcFloatingLabel: MDCFloatingLabel$1,
    MdcLineRipple: MDCLineRipple$1,
    MdcNotchedOutline: MDCNotchedOutline$1
  },
  props: {
    fullwidth: Boolean,
    dense: Boolean,
    disabled: Boolean,
    required: Boolean,
    id: String,
    value: String,
    label: String,
    name: String,
    // Validation
    pattern: String,
    minlength: [String, Number],
    maxlength: [String, Number]
  },
  computed: {
    hasIconListener() {
      return !!(this.$listeners && this.$listeners.icon);
    },

    model: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      }

    },

    inputAttrs() {
      const label = this.fullwidth && this.label;
      return {
        required: this.required,
        placeholder: label,
        ariaLabel: label,
        name: this.name,
        // Validation
        id: this.uuid,
        type: this.type,
        pattern: this.pattern,
        min: this.min,
        max: this.max,
        step: this.step,
        minlength: this.minlength,
        maxlength: this.maxlength
      };
    }

  },
  watch: {
    disabled(value) {
      this.foundation.setDisabled(value);
    }

  },

  data() {
    return {
      uuid: this.id || uuid()
    };
  },

  mounted() {
    const {
      $el
    } = this;
    const {
      input,
      lineRipple,
      notchedOutline,
      floatingLabel
    } = this.$refs;
    const styles = window.getComputedStyle($el); // Run each factory and save them into variables.

    this._helperText = helperTextFactory(this.$el.nextElementSibling);

    if (this.$refs.icon && this.hasIconListener) {
      this._icon = iconFactory(this.$refs.icon, () => this.$emit('icon'));
    }

    this.foundation = new MDCTextFieldFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      // Interactions
      registerTextFieldInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterTextFieldInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      registerInputInteractionHandler: (type, handler) => input.addEventListener(type, handler),
      deregisterInputInteractionHandler: (type, handler) => input.removeEventListener(type, handler),
      registerValidationAttributeChangeHandler: handler => {
        const observer = new MutationObserver(handler);
        observer.observe(input, {
          attributes: true
        });
        return observer;
      },
      deregisterValidationAttributeChangeHandler: observer => observer.disconnect(),
      getNativeInput: () => input,
      isFocused: () => document.activeElement === input,
      isRtl: () => styles.direction === 'rtl',
      // MDCLineRipple
      activateLineRipple: () => lineRipple && lineRipple.activate(),
      deactivateLineRipple: () => lineRipple && lineRipple.deactivate(),
      setLineRippleTransformOrigin: normalizedX => lineRipple && lineRipple.setRippleCenter(normalizedX),
      // MDCFloatingLabel
      shakeLabel: shouldShake => floatingLabel.shake(shouldShake),
      floatLabel: shouldFloat => floatingLabel.float(shouldFloat),
      hasLabel: () => !!floatingLabel,
      getLabelWidth: () => floatingLabel.getWidth(),
      // MDCNotchedOutline
      hasOutline: () => !!notchedOutline,
      notchOutline: (labelWidth, isRtl) => notchedOutline.notch(labelWidth, isRtl),
      closeOutline: () => notchedOutline.closeNotch()
    }, {
      helperText: this._helperText,
      icon: this._icon
    });
    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
  },

  beforeDestroy() {
    if (this._helperText) {
      this._helperText.destroy();
    }

    if (this._icon) {
      this._icon.destroy();
    }

    this.foundation.destroy();
  }

}; //

const INPUT_TYPES = ['', 'password', 'email', 'number', 'date', 'month', 'tel', 'text', 'time', 'url', 'week', 'search'];
var script$I = {
  name: 'MDCTextfield',
  mixins: [TextfieldMixin],
  components: {
    MdcIcon: MDCIcon
  },
  props: {
    boxed: Boolean,
    outlined: Boolean,
    trailingIcon: String,
    leadingIcon: String,
    type: {
      type: String,
      validator: value => INPUT_TYPES.includes(value)
    },
    min: [String, Number],
    max: [String, Number],
    step: [String, Number]
  },
  computed: {
    cssClasses() {
      return {
        'mdc-text-field--box': this.isBoxed,
        'mdc-text-field--outlined': this.isOutlined,
        'mdc-text-field--fullwidth': this.fullwidth,
        'mdc-text-field--dense': this.dense,
        'mdc-text-field--with-leading-icon': this.leadingIcon,
        'mdc-text-field--with-trailing-icon': !this.leadingIcon && this.trailingIcon
      };
    },

    isBoxed() {
      return !this.fullwidth && this.boxed;
    },

    isOutlined() {
      return !this.fullwidth && !this.boxed && this.outlined;
    }

  }
};
/* script */

const __vue_script__$I = script$I;
/* template */

var __vue_render__$I = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-text-field",
    class: _vm.cssClasses
  }, [_vm.leadingIcon ? _c("mdc-icon", {
    ref: "icon",
    attrs: {
      name: "text-field",
      icon: _vm.leadingIcon
    }
  }) : _vm._e(), _vm.inputAttrs.type === "checkbox" ? _c("input", _vm._b({
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.model,
      expression: "model"
    }],
    ref: "input",
    staticClass: "mdc-text-field__input",
    attrs: {
      type: "checkbox"
    },
    domProps: {
      checked: Array.isArray(_vm.model) ? _vm._i(_vm.model, null) > -1 : _vm.model
    },
    on: {
      change: function ($event) {
        var $$a = _vm.model,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.model = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.model = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.model = $$c;
        }
      }
    }
  }, "input", _vm.inputAttrs, false)) : _vm.inputAttrs.type === "radio" ? _c("input", _vm._b({
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.model,
      expression: "model"
    }],
    ref: "input",
    staticClass: "mdc-text-field__input",
    attrs: {
      type: "radio"
    },
    domProps: {
      checked: _vm._q(_vm.model, null)
    },
    on: {
      change: function ($event) {
        _vm.model = null;
      }
    }
  }, "input", _vm.inputAttrs, false)) : _c("input", _vm._b({
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.model,
      expression: "model"
    }],
    ref: "input",
    staticClass: "mdc-text-field__input",
    attrs: {
      type: _vm.inputAttrs.type
    },
    domProps: {
      value: _vm.model
    },
    on: {
      input: function ($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.model = $event.target.value;
      }
    }
  }, "input", _vm.inputAttrs, false)), !_vm.fullwidth ? _c("mdc-floating-label", {
    ref: "floatingLabel",
    attrs: {
      label: _vm.label,
      id: _vm.uuid
    }
  }) : _vm._e(), !_vm.leadingIcon && _vm.trailingIcon ? _c("mdc-icon", {
    ref: "icon",
    attrs: {
      name: "text-field",
      icon: _vm.trailingIcon
    }
  }) : _vm._e(), _vm.isOutlined ? [_c("mdc-notched-outline", {
    ref: "notchedOutline"
  }), _c("div", {
    staticClass: "mdc-notched-outline__idle"
  })] : _c("mdc-line-ripple", {
    ref: "lineRipple"
  })], 2);
};

var __vue_staticRenderFns__$I = [];
__vue_render__$I._withStripped = true;
/* style */

const __vue_inject_styles__$I = undefined;
/* scoped */

const __vue_scope_id__$I = undefined;
/* module identifier */

const __vue_module_identifier__$I = undefined;
/* functional template */

const __vue_is_functional_template__$I = false;
/* component normalizer */

function __vue_normalize__$I(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\textfield\\Textfield.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCTextfield = __vue_normalize__$I({
  render: __vue_render__$I,
  staticRenderFns: __vue_staticRenderFns__$I
}, __vue_inject_styles__$I, __vue_script__$I, __vue_scope_id__$I, __vue_is_functional_template__$I, __vue_module_identifier__$I, undefined, undefined); //


var script$J = {
  name: 'MDCTextarea',
  mixins: [TextfieldMixin],
  inheritAttrs: false,
  props: {
    rows: [String, Number],
    cols: [String, Number]
  },
  computed: {
    cssClasses() {
      return {
        'mdc-text-field--fullwidth': this.fullwidth,
        'mdc-text-field--dense': this.dense
      };
    }

  }
};
/* script */

const __vue_script__$J = script$J;
/* template */

var __vue_render__$J = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-text-field mdc-text-field--textarea",
    class: _vm.cssClasses
  }, [_c("textarea", _vm._b({
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.model,
      expression: "model"
    }],
    ref: "input",
    staticClass: "mdc-text-field__input",
    attrs: {
      rows: _vm.rows,
      cols: _vm.cols
    },
    domProps: {
      value: _vm.model
    },
    on: {
      input: function ($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.model = $event.target.value;
      }
    }
  }, "textarea", _vm.inputAttrs, false)), !_vm.fullwidth ? _c("mdc-floating-label", {
    ref: "floatingLabel",
    attrs: {
      label: _vm.label,
      id: _vm.uuid
    }
  }) : _vm._e()], 1);
};

var __vue_staticRenderFns__$J = [];
__vue_render__$J._withStripped = true;
/* style */

const __vue_inject_styles__$J = undefined;
/* scoped */

const __vue_scope_id__$J = undefined;
/* module identifier */

const __vue_module_identifier__$J = undefined;
/* functional template */

const __vue_is_functional_template__$J = false;
/* component normalizer */

function __vue_normalize__$J(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\textfield\\Textarea.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCTextarea = __vue_normalize__$J({
  render: __vue_render__$J,
  staticRenderFns: __vue_staticRenderFns__$J
}, __vue_inject_styles__$J, __vue_script__$J, __vue_scope_id__$J, __vue_is_functional_template__$J, __vue_module_identifier__$J, undefined, undefined); //
//
//
//


var script$K = {
  name: 'MDCTextfieldHelpertext',
  props: {
    text: {
      type: String,
      required: true
    },
    persistent: Boolean,
    validation: Boolean
  },
  computed: {
    cssClasses() {
      return {
        'mdc-text-field-helper-text--persistent': this.persistent,
        'mdc-text-field-helper-text--validation-msg': this.validation
      };
    }

  }
};
/* script */

const __vue_script__$K = script$K;
/* template */

var __vue_render__$K = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("p", {
    staticClass: "mdc-text-field-helper-text",
    class: _vm.cssClasses,
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v(_vm._s(_vm.text))]);
};

var __vue_staticRenderFns__$K = [];
__vue_render__$K._withStripped = true;
/* style */

const __vue_inject_styles__$K = undefined;
/* scoped */

const __vue_scope_id__$K = undefined;
/* module identifier */

const __vue_module_identifier__$K = undefined;
/* functional template */

const __vue_is_functional_template__$K = false;
/* component normalizer */

function __vue_normalize__$K(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\textfield\\TextfieldHelpertext.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCTextfieldHelpertext = __vue_normalize__$K({
  render: __vue_render__$K,
  staticRenderFns: __vue_staticRenderFns__$K
}, __vue_inject_styles__$K, __vue_script__$K, __vue_scope_id__$K, __vue_is_functional_template__$K, __vue_module_identifier__$K, undefined, undefined); // Used to easily separate the textarea and textfield components


const MDCTextfieldProxy = {
  functional: true,
  props: {
    multiline: Boolean
  },

  render(h, ctx) {
    const tag = ctx.props.multiline ? MDCTextarea : MDCTextfield;
    return h(tag, ctx.data, ctx.children);
  }

};

function install$k(Vue, register) {
  register(MDCTextfieldHelpertext); // Register proxy component seperately

  Vue.component('mdc-textfield', MDCTextfieldProxy);
}

var Textfield =
/*#__PURE__*/
Object.freeze({
  MDCTextfield: MDCTextfieldProxy,
  MDCTextfieldHelpertext: MDCTextfieldHelpertext,
  install: install$k
});
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses$i = {
  FIXED: 'mdc-toolbar--fixed',
  FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
  FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
  TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
  FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
  FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
  FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized'
};
const strings$i = {
  TITLE_SELECTOR: '.mdc-toolbar__title',
  ICON_SELECTOR: '.mdc-toolbar__icon',
  FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
  CHANGE_EVENT: 'MDCToolbar:change'
};
const numbers$5 = {
  MAX_TITLE_SIZE: 2.125,
  MIN_TITLE_SIZE: 1.25,
  TOOLBAR_ROW_HEIGHT: 64,
  TOOLBAR_ROW_MOBILE_HEIGHT: 56,
  TOOLBAR_MOBILE_BREAKPOINT: 600
};
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCToolbarFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$i;
  }

  static get strings() {
    return strings$i;
  }

  static get numbers() {
    return numbers$5;
  }

  static get defaultAdapter() {
    return {
      hasClass: () =>
      /* className: string */

      /* boolean */
      false,
      addClass: () =>
      /* className: string */
      {},
      removeClass: () =>
      /* className: string */
      {},
      registerScrollHandler: () =>
      /* handler: EventListener */
      {},
      deregisterScrollHandler: () =>
      /* handler: EventListener */
      {},
      registerResizeHandler: () =>
      /* handler: EventListener */
      {},
      deregisterResizeHandler: () =>
      /* handler: EventListener */
      {},
      getViewportWidth: () =>
      /* number */
      0,
      getViewportScrollY: () =>
      /* number */
      0,
      getOffsetHeight: () =>
      /* number */
      0,
      getFirstRowElementOffsetHeight: () =>
      /* number */
      0,
      notifyChange: () =>
      /* evtData: {flexibleExpansionRatio: number} */
      {},
      setStyle: () =>
      /* property: string, value: string */
      {},
      setStyleForTitleElement: () =>
      /* property: string, value: string */
      {},
      setStyleForFlexibleRowElement: () =>
      /* property: string, value: string */
      {},
      setStyleForFixedAdjustElement: () =>
      /* property: string, value: string */
      {}
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCToolbarFoundation.defaultAdapter, adapter));

    this.resizeHandler_ = () => this.checkRowHeight_();

    this.scrollHandler_ = () => this.updateToolbarStyles_();

    this.checkRowHeightFrame_ = 0;
    this.scrollFrame_ = 0;
    this.executedLastChange_ = false;
    this.calculations_ = {
      toolbarRowHeight: 0,
      // Calculated Height ratio. We use ratio to calculate corresponding heights in resize event.
      toolbarRatio: 0,
      // The ratio of toolbar height to row height
      flexibleExpansionRatio: 0,
      // The ratio of flexible space height to row height
      maxTranslateYRatio: 0,
      // The ratio of max toolbar move up distance to row height
      scrollThresholdRatio: 0,
      // The ratio of max scrollTop that we should listen to to row height
      // Derived Heights based on the above key ratios.
      toolbarHeight: 0,
      flexibleExpansionHeight: 0,
      // Flexible row minus toolbar height (derived)
      maxTranslateYDistance: 0,
      // When toolbar only fix last row (derived)
      scrollThreshold: 0
    }; // Toolbar fixed behavior
    // If toolbar is fixed

    this.fixed_ = false; // If fixed is targeted only at the last row

    this.fixedLastrow_ = false; // Toolbar flexible behavior
    // If the first row is flexible

    this.hasFlexibleRow_ = false; // If use the default behavior

    this.useFlexDefaultBehavior_ = false;
  }

  init() {
    this.fixed_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED);
    this.fixedLastrow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED_LASTROW) & this.fixed_;
    this.hasFlexibleRow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.TOOLBAR_ROW_FLEXIBLE);

    if (this.hasFlexibleRow_) {
      this.useFlexDefaultBehavior_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR);
    }

    this.initKeyRatio_();
    this.setKeyHeights_();
    this.adapter_.registerResizeHandler(this.resizeHandler_);
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  }

  destroy() {
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }

  updateAdjustElementStyles() {
    if (this.fixed_) {
      this.adapter_.setStyleForFixedAdjustElement('margin-top', `${this.calculations_.toolbarHeight}px`);
    }
  }

  getFlexibleExpansionRatio_(scrollTop) {
    // To prevent division by zero when there is no flexibleExpansionHeight
    const delta = 0.0001;
    return Math.max(0, 1 - scrollTop / (this.calculations_.flexibleExpansionHeight + delta));
  }

  checkRowHeight_() {
    cancelAnimationFrame(this.checkRowHeightFrame_);
    this.checkRowHeightFrame_ = requestAnimationFrame(() => this.setKeyHeights_());
  }

  setKeyHeights_() {
    const newToolbarRowHeight = this.getRowHeight_();

    if (newToolbarRowHeight !== this.calculations_.toolbarRowHeight) {
      this.calculations_.toolbarRowHeight = newToolbarRowHeight;
      this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.flexibleExpansionHeight = this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.maxTranslateYDistance = this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.scrollThreshold = this.calculations_.scrollThresholdRatio * this.calculations_.toolbarRowHeight;
      this.updateAdjustElementStyles();
      this.updateToolbarStyles_();
    }
  }

  updateToolbarStyles_() {
    cancelAnimationFrame(this.scrollFrame_);
    this.scrollFrame_ = requestAnimationFrame(() => {
      const scrollTop = this.adapter_.getViewportScrollY();
      const hasScrolledOutOfThreshold = this.scrolledOutOfThreshold_(scrollTop);

      if (hasScrolledOutOfThreshold && this.executedLastChange_) {
        return;
      }

      const flexibleExpansionRatio = this.getFlexibleExpansionRatio_(scrollTop);
      this.updateToolbarFlexibleState_(flexibleExpansionRatio);

      if (this.fixedLastrow_) {
        this.updateToolbarFixedState_(scrollTop);
      }

      if (this.hasFlexibleRow_) {
        this.updateFlexibleRowElementStyles_(flexibleExpansionRatio);
      }

      this.executedLastChange_ = hasScrolledOutOfThreshold;
      this.adapter_.notifyChange({
        flexibleExpansionRatio: flexibleExpansionRatio
      });
    });
  }

  scrolledOutOfThreshold_(scrollTop) {
    return scrollTop > this.calculations_.scrollThreshold;
  }

  initKeyRatio_() {
    const toolbarRowHeight = this.getRowHeight_();
    const firstRowMaxRatio = this.adapter_.getFirstRowElementOffsetHeight() / toolbarRowHeight;
    this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / toolbarRowHeight;
    this.calculations_.flexibleExpansionRatio = firstRowMaxRatio - 1;
    this.calculations_.maxTranslateYRatio = this.fixedLastrow_ ? this.calculations_.toolbarRatio - firstRowMaxRatio : 0;
    this.calculations_.scrollThresholdRatio = (this.fixedLastrow_ ? this.calculations_.toolbarRatio : firstRowMaxRatio) - 1;
  }

  getRowHeight_() {
    const breakpoint = MDCToolbarFoundation.numbers.TOOLBAR_MOBILE_BREAKPOINT;
    return this.adapter_.getViewportWidth() < breakpoint ? MDCToolbarFoundation.numbers.TOOLBAR_ROW_MOBILE_HEIGHT : MDCToolbarFoundation.numbers.TOOLBAR_ROW_HEIGHT;
  }

  updateToolbarFlexibleState_(flexibleExpansionRatio) {
    this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
    this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);

    if (flexibleExpansionRatio === 1) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
    } else if (flexibleExpansionRatio === 0) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
    }
  }

  updateToolbarFixedState_(scrollTop) {
    const translateDistance = Math.max(0, Math.min(scrollTop - this.calculations_.flexibleExpansionHeight, this.calculations_.maxTranslateYDistance));
    this.adapter_.setStyle('transform', `translateY(${-translateDistance}px)`);

    if (translateDistance === this.calculations_.maxTranslateYDistance) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
    } else {
      this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
    }
  }

  updateFlexibleRowElementStyles_(flexibleExpansionRatio) {
    if (this.fixed_) {
      const height = this.calculations_.flexibleExpansionHeight * flexibleExpansionRatio;
      this.adapter_.setStyleForFlexibleRowElement('height', `${height + this.calculations_.toolbarRowHeight}px`);
    }

    if (this.useFlexDefaultBehavior_) {
      this.updateElementStylesDefaultBehavior_(flexibleExpansionRatio);
    }
  }

  updateElementStylesDefaultBehavior_(flexibleExpansionRatio) {
    const maxTitleSize = MDCToolbarFoundation.numbers.MAX_TITLE_SIZE;
    const minTitleSize = MDCToolbarFoundation.numbers.MIN_TITLE_SIZE;
    const currentTitleSize = (maxTitleSize - minTitleSize) * flexibleExpansionRatio + minTitleSize;
    this.adapter_.setStyleForTitleElement('font-size', `${currentTitleSize}rem`);
  }

}
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//


var script$L = {
  name: 'MDCToolbar',
  props: {
    flexible: Boolean,
    waterfall: Boolean,
    fixed: Boolean,
    fixedLastrow: Boolean
  },
  watch: {
    flexible(value) {
      this.foundation.hasFlexibleRow_ = value;
      this.foundation.useFlexDefaultBehaviour_ = value;
    }

  },
  computed: {
    cssClasses() {
      //TODO: minimize flexible and fixed to a string
      return {
        'mdc-toolbar--waterfall': this.waterfall,
        'mdc-toolbar--fixed': this.isFixed,
        'mdc-toolbar--fixed-lastrow-only': this.fixedLastrow,
        'mdc-toolbar--flexible': this.flexible,
        'mdc-toolbar--flexible-default-behavior': this.flexible
      };
    },

    isFixed() {
      if (this.foundation) {
        this.foundation.fixed_ = this.fixed;
        this.foundation.fixedLastrow_ = this.fixedLastrow;
      }

      return this.fixed || this.fixedLastrow;
    }

  },

  mounted() {
    const {
      $el
    } = this;

    const findTitle = () => $el.querySelector('.mdc-toolbar__title');

    const findRow = () => $el.querySelector('.mdc-toolbar__row:first-child');

    this.foundation = new MDCToolbarFoundation({
      hasClass: className => $el.classList.contains(className),
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      registerScrollHandler: handler => window.addEventListener('scroll', handler),
      deregisterScrollHandler: handler => window.removeEventListener('scroll', handler),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      getViewportWidth: () => window.innerWidth,
      getViewportScrollY: () => window.pageYOffset,
      getOffsetHeight: () => $el.offsetHeight,
      getFirstRowElementOffsetHeight: () => findRow().offsetHeight,
      notifyChange: data => this.$emit('change', data),
      setStyle: (prop, value) => $el.style.setProperty(prop, value),
      setStyleForTitleElement: (prop, value) => findTitle().style.setProperty(prop, value),
      setStyleForFlexibleRowElement: (prop, value) => findRow().style.setProperty(prop, value),
      setStyleForFixedAdjustElement: (prop, value) => {
        const $fixedAdjust = this.isFixed && $el.nextElementSibling;

        if ($fixedAdjust) {
          $fixedAdjust.style.setProperty(prop, value);
        }
      }
    });
    this.foundation.init();
  },

  beforeDestroy() {
    this.foundation.destroy();
  }

};
/* script */

const __vue_script__$L = script$L;
/* template */

var __vue_render__$L = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("header", {
    staticClass: "mdc-toolbar",
    class: _vm.cssClasses
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$L = [];
__vue_render__$L._withStripped = true;
/* style */

const __vue_inject_styles__$L = undefined;
/* scoped */

const __vue_scope_id__$L = undefined;
/* module identifier */

const __vue_module_identifier__$L = undefined;
/* functional template */

const __vue_is_functional_template__$L = false;
/* component normalizer */

function __vue_normalize__$L(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\toolbar\\Toolbar.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCToolbar$1 = __vue_normalize__$L({
  render: __vue_render__$L,
  staticRenderFns: __vue_staticRenderFns__$L
}, __vue_inject_styles__$L, __vue_script__$L, __vue_scope_id__$L, __vue_is_functional_template__$L, __vue_module_identifier__$L, undefined, undefined); //
//
//
//
//


var script$M = {
  name: 'MDCToolbarRow'
};
/* script */

const __vue_script__$M = script$M;
/* template */

var __vue_render__$M = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "mdc-toolbar__row"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$M = [];
__vue_render__$M._withStripped = true;
/* style */

const __vue_inject_styles__$M = undefined;
/* scoped */

const __vue_scope_id__$M = undefined;
/* module identifier */

const __vue_module_identifier__$M = undefined;
/* functional template */

const __vue_is_functional_template__$M = false;
/* component normalizer */

function __vue_normalize__$M(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\toolbar\\ToolbarRow.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCToolbarRow = __vue_normalize__$M({
  render: __vue_render__$M,
  staticRenderFns: __vue_staticRenderFns__$M
}, __vue_inject_styles__$M, __vue_script__$M, __vue_scope_id__$M, __vue_is_functional_template__$M, __vue_module_identifier__$M, undefined, undefined); //
//
//
//
//


var script$N = {
  name: 'MDCToolbarSection',
  props: {
    alignStart: Boolean,
    alignEnd: Boolean,
    shrinkToFit: Boolean
  },
  computed: {
    cssClasses() {
      return {
        'mdc-toolbar__section--align-start': this.alignStart,
        'mdc-toolbar__section--align-end': this.alignEnd,
        'mdc-toolbar__section--shrink-to-fit': this.shrinkToFit
      };
    }

  }
};
/* script */

const __vue_script__$N = script$N;
/* template */

var __vue_render__$N = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("section", {
    staticClass: "mdc-toolbar__section",
    class: _vm.cssClasses,
    attrs: {
      role: "toolbar"
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$N = [];
__vue_render__$N._withStripped = true;
/* style */

const __vue_inject_styles__$N = undefined;
/* scoped */

const __vue_scope_id__$N = undefined;
/* module identifier */

const __vue_module_identifier__$N = undefined;
/* functional template */

const __vue_is_functional_template__$N = false;
/* component normalizer */

function __vue_normalize__$N(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\toolbar\\ToolbarSection.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCToolbarSection = __vue_normalize__$N({
  render: __vue_render__$N,
  staticRenderFns: __vue_staticRenderFns__$N
}, __vue_inject_styles__$N, __vue_script__$N, __vue_scope_id__$N, __vue_is_functional_template__$N, __vue_module_identifier__$N, undefined, undefined); //
//
//
//
//


var script$O = {
  name: 'MDCToolbarTitle'
};
/* script */

const __vue_script__$O = script$O;
/* template */

var __vue_render__$O = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("span", {
    staticClass: "mdc-toolbar__title"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$O = [];
__vue_render__$O._withStripped = true;
/* style */

const __vue_inject_styles__$O = undefined;
/* scoped */

const __vue_scope_id__$O = undefined;
/* module identifier */

const __vue_module_identifier__$O = undefined;
/* functional template */

const __vue_is_functional_template__$O = false;
/* component normalizer */

function __vue_normalize__$O(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\toolbar\\ToolbarTitle.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCToolbarTitle = __vue_normalize__$O({
  render: __vue_render__$O,
  staticRenderFns: __vue_staticRenderFns__$O
}, __vue_inject_styles__$O, __vue_script__$O, __vue_scope_id__$O, __vue_is_functional_template__$O, __vue_module_identifier__$O, undefined, undefined); //


var script$P = {
  name: 'MDCToolbarIcon',
  components: {
    MdcIcon: MDCIcon
  },
  props: {
    link: String,
    label: String,
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    tag() {
      return this.link ? 'a' : 'button';
    }

  }
};
/* script */

const __vue_script__$P = script$P;
/* template */

var __vue_render__$P = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("mdc-icon", {
    attrs: {
      tag: _vm.tag,
      name: "toolbar",
      icon: _vm.icon,
      label: _vm.label,
      href: _vm.link
    }
  }, [_vm._v(_vm._s(_vm.icon))]);
};

var __vue_staticRenderFns__$P = [];
__vue_render__$P._withStripped = true;
/* style */

const __vue_inject_styles__$P = undefined;
/* scoped */

const __vue_scope_id__$P = undefined;
/* module identifier */

const __vue_module_identifier__$P = undefined;
/* functional template */

const __vue_is_functional_template__$P = false;
/* component normalizer */

function __vue_normalize__$P(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\toolbar\\ToolbarIcon.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCToolbarIcon = __vue_normalize__$P({
  render: __vue_render__$P,
  staticRenderFns: __vue_staticRenderFns__$P
}, __vue_inject_styles__$P, __vue_script__$P, __vue_scope_id__$P, __vue_is_functional_template__$P, __vue_module_identifier__$P, undefined, undefined); //
//
//
//


var script$Q = {
  name: 'MDCToolbarMenuIcon',
  props: {
    link: String
  },
  computed: {
    tag() {
      return this.link ? 'a' : 'button';
    }

  }
};
/* script */

const __vue_script__$Q = script$Q;
/* template */

var __vue_render__$Q = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.tag, _vm._g({
    tag: "component",
    staticClass: "material-icons mdc-toolbar__menu-icon",
    attrs: {
      href: _vm.link
    }
  }, _vm.$listeners), [_vm._v("menu")]);
};

var __vue_staticRenderFns__$Q = [];
__vue_render__$Q._withStripped = true;
/* style */

const __vue_inject_styles__$Q = undefined;
/* scoped */

const __vue_scope_id__$Q = undefined;
/* module identifier */

const __vue_module_identifier__$Q = undefined;
/* functional template */

const __vue_is_functional_template__$Q = false;
/* component normalizer */

function __vue_normalize__$Q(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\toolbar\\ToolbarMenuIcon.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCToolbarMenuIcon = __vue_normalize__$Q({
  render: __vue_render__$Q,
  staticRenderFns: __vue_staticRenderFns__$Q
}, __vue_inject_styles__$Q, __vue_script__$Q, __vue_scope_id__$Q, __vue_is_functional_template__$Q, __vue_module_identifier__$Q, undefined, undefined);

function install$l(Vue, register) {
  register(MDCToolbar$1, MDCToolbarRow, MDCToolbarSection, MDCToolbarTitle, MDCToolbarIcon, MDCToolbarMenuIcon);
}

var Toolbar =
/*#__PURE__*/
Object.freeze({
  MDCToolbar: MDCToolbar$1,
  MDCToolbarRow: MDCToolbarRow,
  MDCToolbarSection: MDCToolbarSection,
  MDCToolbarTitle: MDCToolbarTitle,
  MDCToolbarIcon: MDCToolbarIcon,
  MDCToolbarMenuIcon: MDCToolbarMenuIcon,
  install: install$l
});
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */

const cssClasses$j = {
  FIXED_CLASS: 'mdc-top-app-bar--fixed',
  FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
  SHORT_CLASS: 'mdc-top-app-bar--short',
  SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item',
  SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed'
};
/** @enum {number} */

const numbers$6 = {
  DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
  MAX_TOP_APP_BAR_HEIGHT: 128
};
/** @enum {string} */

const strings$j = {
  ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
  NAVIGATION_EVENT: 'MDCTopAppBar:nav',
  NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
  ROOT_SELECTOR: '.mdc-top-app-bar',
  TITLE_SELECTOR: '.mdc-top-app-bar__title'
};
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCTopAppBarAdapter>}
 */

class MDCTopAppBarBaseFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get strings() {
    return strings$j;
  }
  /** @return enum {string} */


  static get cssClasses() {
    return cssClasses$j;
  }
  /** @return enum {number} */


  static get numbers() {
    return numbers$6;
  }
  /**
   * {@see MDCTopAppBarAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTopAppBarAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCTopAppBarAdapter} */
      {
        hasClass: () =>
        /* className: string */
        {},
        addClass: () =>
        /* className: string */
        {},
        removeClass: () =>
        /* className: string */
        {},
        setStyle: () =>
        /* property: string, value: string */
        {},
        getTopAppBarHeight: () => {},
        registerNavigationIconInteractionHandler: () =>
        /* type: string, handler: EventListener */
        {},
        deregisterNavigationIconInteractionHandler: () =>
        /* type: string, handler: EventListener */
        {},
        notifyNavigationIconClicked: () => {},
        registerScrollHandler: () =>
        /* handler: EventListener */
        {},
        deregisterScrollHandler: () =>
        /* handler: EventListener */
        {},
        registerResizeHandler: () =>
        /* handler: EventListener */
        {},
        deregisterResizeHandler: () =>
        /* handler: EventListener */
        {},
        getViewportScrollY: () =>
        /* number */
        0,
        getTotalActionItems: () =>
        /* number */
        0
      }
    );
  }
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */


  constructor(
  /** @type {!MDCTopAppBarAdapter} */
  adapter) {
    super(Object.assign(MDCTopAppBarBaseFoundation.defaultAdapter, adapter));

    this.navClickHandler_ = () => this.adapter_.notifyNavigationIconClicked();
  }

  init() {
    this.adapter_.registerNavigationIconInteractionHandler('click', this.navClickHandler_);
  }

  destroy() {
    this.adapter_.deregisterNavigationIconInteractionHandler('click', this.navClickHandler_);
  }

}
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCTopAppBarFoundation<!MDCFixedTopAppBarFoundation>}
 * @final
 */


class MDCFixedTopAppBarFoundation extends MDCTopAppBarBaseFoundation {
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  constructor(adapter) {
    super(adapter);
    /** State variable for the previous scroll iteration top app bar state */

    this.wasScrolled_ = false;

    this.scrollHandler_ = () => this.fixedScrollHandler_();
  }

  init() {
    super.init();
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  }

  destroy() {
    super.destroy();
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }
  /**
   * Scroll handler for applying/removing the modifier class
   * on the fixed top app bar.
   */


  fixedScrollHandler_() {
    const currentScroll = this.adapter_.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.wasScrolled_) {
        this.adapter_.removeClass(cssClasses$j.FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = false;
      }
    } else {
      if (!this.wasScrolled_) {
        this.adapter_.addClass(cssClasses$j.FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = true;
      }
    }
  }

}
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCTopAppBarBaseFoundation<!MDCShortTopAppBarFoundation>}
 * @final
 */


class MDCShortTopAppBarFoundation extends MDCTopAppBarBaseFoundation {
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  constructor(adapter) {
    super(adapter); // State variable for the current top app bar state

    this.isCollapsed = false;

    this.scrollHandler_ = () => this.shortAppBarScrollHandler_();
  }

  init() {
    super.init();
    const isAlwaysCollapsed = this.adapter_.hasClass(cssClasses$j.SHORT_COLLAPSED_CLASS);

    if (this.adapter_.getTotalActionItems() > 0) {
      this.adapter_.addClass(cssClasses$j.SHORT_HAS_ACTION_ITEM_CLASS);
    }

    if (!isAlwaysCollapsed) {
      this.adapter_.registerScrollHandler(this.scrollHandler_);
      this.shortAppBarScrollHandler_();
    }
  }

  destroy() {
    super.destroy();
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }
  /**
   * Scroll handler for applying/removing the collapsed modifier class
   * on the short top app bar.
   * @private
   */


  shortAppBarScrollHandler_() {
    const currentScroll = this.adapter_.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.isCollapsed) {
        this.adapter_.removeClass(cssClasses$j.SHORT_COLLAPSED_CLASS);
        this.isCollapsed = false;
      }
    } else {
      if (!this.isCollapsed) {
        this.adapter_.addClass(cssClasses$j.SHORT_COLLAPSED_CLASS);
        this.isCollapsed = true;
      }
    }
  }

}
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const INITIAL_VALUE = 0;
/**
 * @extends {MDCTopAppBarBaseFoundation<!MDCTopAppBarFoundation>}
 * @final
 */

class MDCTopAppBarFoundation extends MDCTopAppBarBaseFoundation {
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  constructor(adapter) {
    super(adapter);
    /**
     * Used for diffs of current scroll position vs previous scroll position
     * @private {number}
     */

    this.lastScrollPosition_ = this.adapter_.getViewportScrollY();
    /**
     * Used to verify when the top app bar is completely showing or completely hidden
     * @private {number}
     */

    this.topAppBarHeight_ = this.adapter_.getTopAppBarHeight();
    /**
     * wasDocked_ is used to indicate if the top app bar was docked in the previous
     * scroll handler iteration.
     * @private {boolean}
     */

    this.wasDocked_ = true;
    /**
     * isDockedShowing_ is used to indicate if the top app bar is docked in the fully
     * shown position.
     * @private {boolean}
     */

    this.isDockedShowing_ = true;
    /**
     * Variable for current scroll position of the top app bar
     * @private {number}
     */

    this.currentAppBarOffsetTop_ = 0;
    /**
     * Used to prevent the top app bar from being scrolled out of view during resize events
     * @private {boolean} */

    this.isCurrentlyBeingResized_ = false;
    /**
     * The timeout that's used to throttle the resize events
     * @private {number}
     */

    this.resizeThrottleId_ = INITIAL_VALUE;
    /**
     * The timeout that's used to debounce toggling the isCurrentlyBeingResized_ variable after a resize
     * @private {number}
     */

    this.resizeDebounceId_ = INITIAL_VALUE;

    this.scrollHandler_ = () => this.topAppBarScrollHandler_();

    this.resizeHandler_ = () => this.topAppBarResizeHandler_();
  }

  init() {
    super.init();
    this.adapter_.registerScrollHandler(this.scrollHandler_);
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  }

  destroy() {
    super.destroy();
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    this.adapter_.setStyle('top', '');
  }
  /**
   * Function to determine if the DOM needs to update.
   * @return {boolean}
   * @private
   */


  checkForUpdate_() {
    const offscreenBoundaryTop = -this.topAppBarHeight_;
    const hasAnyPixelsOffscreen = this.currentAppBarOffsetTop_ < 0;
    const hasAnyPixelsOnscreen = this.currentAppBarOffsetTop_ > offscreenBoundaryTop;
    const partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen; // If it's partially showing, it can't be docked.

    if (partiallyShowing) {
      this.wasDocked_ = false;
    } else {
      // Not previously docked and not partially showing, it's now docked.
      if (!this.wasDocked_) {
        this.wasDocked_ = true;
        return true;
      } else if (this.isDockedShowing_ !== hasAnyPixelsOnscreen) {
        this.isDockedShowing_ = hasAnyPixelsOnscreen;
        return true;
      }
    }

    return partiallyShowing;
  }
  /**
   * Function to move the top app bar if needed.
   * @private
   */


  moveTopAppBar_() {
    if (this.checkForUpdate_()) {
      // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
      // so the top app bar doesn't show if the window resizes and the new height > the old height.
      let offset = this.currentAppBarOffsetTop_;

      if (Math.abs(offset) >= this.topAppBarHeight_) {
        offset = -numbers$6.MAX_TOP_APP_BAR_HEIGHT;
      }

      this.adapter_.setStyle('top', offset + 'px');
    }
  }
  /**
   * Scroll handler for the default scroll behavior of the top app bar.
   * @private
   */


  topAppBarScrollHandler_() {
    const currentScrollPosition = Math.max(this.adapter_.getViewportScrollY(), 0);
    const diff = currentScrollPosition - this.lastScrollPosition_;
    this.lastScrollPosition_ = currentScrollPosition; // If the window is being resized the lastScrollPosition_ needs to be updated but the
    // current scroll of the top app bar should stay in the same position.

    if (!this.isCurrentlyBeingResized_) {
      this.currentAppBarOffsetTop_ -= diff;

      if (this.currentAppBarOffsetTop_ > 0) {
        this.currentAppBarOffsetTop_ = 0;
      } else if (Math.abs(this.currentAppBarOffsetTop_) > this.topAppBarHeight_) {
        this.currentAppBarOffsetTop_ = -this.topAppBarHeight_;
      }

      this.moveTopAppBar_();
    }
  }
  /**
   * Top app bar resize handler that throttle/debounce functions that execute updates.
   * @private
   */


  topAppBarResizeHandler_() {
    // Throttle resize events 10 p/s
    if (!this.resizeThrottleId_) {
      this.resizeThrottleId_ = setTimeout(() => {
        this.resizeThrottleId_ = INITIAL_VALUE;
        this.throttledResizeHandler_();
      }, numbers$6.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
    }

    this.isCurrentlyBeingResized_ = true;

    if (this.resizeDebounceId_) {
      clearTimeout(this.resizeDebounceId_);
    }

    this.resizeDebounceId_ = setTimeout(() => {
      this.topAppBarScrollHandler_();
      this.isCurrentlyBeingResized_ = false;
      this.resizeDebounceId_ = INITIAL_VALUE;
    }, numbers$6.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
  }
  /**
   * Throttled function that updates the top app bar scrolled values if the
   * top app bar height changes.
   * @private
   */


  throttledResizeHandler_() {
    const currentHeight = this.adapter_.getTopAppBarHeight();

    if (this.topAppBarHeight_ !== currentHeight) {
      this.wasDocked_ = false; // Since the top app bar has a different height depending on the screen width, this
      // will ensure that the top app bar remains in the correct location if
      // completely hidden and a resize makes the top app bar a different height.

      this.currentAppBarOffsetTop_ -= this.topAppBarHeight_ - currentHeight;
      this.topAppBarHeight_ = currentHeight;
    }

    this.topAppBarScrollHandler_();
  }

}
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//
//
//
//
//


var script$R = {
  name: 'MDCTopAppBarSection',
  props: {
    alignStart: Boolean,
    alignEnd: Boolean
  },
  computed: {
    cssClasses() {
      return {
        'mdc-top-app-bar__section--align-start': this.alignStart,
        'mdc-top-app-bar__section--align-end': this.alignEnd
      };
    }

  }
};
/* script */

const __vue_script__$R = script$R;
/* template */

var __vue_render__$R = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("section", {
    staticClass: "mdc-top-app-bar__section",
    class: _vm.cssClasses
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$R = [];
__vue_render__$R._withStripped = true;
/* style */

const __vue_inject_styles__$R = undefined;
/* scoped */

const __vue_scope_id__$R = undefined;
/* module identifier */

const __vue_module_identifier__$R = undefined;
/* functional template */

const __vue_is_functional_template__$R = false;
/* component normalizer */

function __vue_normalize__$R(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\top-app-bar\\TopAppBarSection.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var Section = __vue_normalize__$R({
  render: __vue_render__$R,
  staticRenderFns: __vue_staticRenderFns__$R
}, __vue_inject_styles__$R, __vue_script__$R, __vue_scope_id__$R, __vue_is_functional_template__$R, __vue_module_identifier__$R, undefined, undefined); //


const FIXED_ADJUST_CLASSES = ['fixed-adjust', 'dense-fixed-adjust', 'short-fixed-adjust', 'prominent-fixed-adjust', 'dense-prominent-fixed-adjust'];
var script$S = {
  name: 'MDCTopAppBar',
  components: {
    MdcTopAppBarSection: Section
  },
  props: {
    short: Boolean,
    shortCollapsed: Boolean,
    fixed: Boolean,
    prominent: Boolean,
    title: String,
    navIcon: {
      type: String,
      default: 'menu'
    }
  },
  computed: {
    cssClasses() {
      // Don't allow options when the bar is of the type short
      if (this.short) {
        return {
          'mdc-top-app-bar--short': this.short,
          'mdc-top-app-bar--short-collapsed': this.shortCollapsed
        };
      }

      return {
        'mdc-top-app-bar--dense': this.dense,
        'mdc-top-app-bar--fixed': this.fixed,
        'mdc-top-app-bar--prominent': this.prominent
      };
    },

    hasSlot() {
      return !!this.$slots.default;
    }

  },

  mounted() {
    const {
      $el
    } = this;
    const adapter = {
      hasClass: className => $el.classList.contains(className),
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      setStyle: (prop, value) => $el.style.setProperty(prop, value),
      getTopAppBarHeight: () => $el.clientHeight,
      registerNavigationIconInteractionHandler: (type, handler) => {
        const {
          navIcon
        } = this.$refs;
        navIcon && navIcon.addEventListener(type, handler);
      },
      deregisterNavigationIconInteractionHandler: (type, handler) => {
        const {
          navIcon
        } = this.$refs;
        navIcon && navIcon.removeEventListener(type, handler);
      },
      notifyNavigationIconClicked: () => this.$emit('nav'),
      registerScrollHandler: handler => window.addEventListener('scroll', handler),
      deregisterScrollHandler: handler => window.removeEventListener('scroll', handler),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      getViewportScrollY: () => window.pageYOffset,
      // Check if this works with 'preserveWhitespace' to true
      getTotalActionItems: () => this.$slots.default.filter(n => !!n.tag).length
    }; // Create foundation instance

    if (this.short) {
      this.foundation = new MDCShortTopAppBarFoundation(adapter);
    } else if (this.fixed) {
      this.foundation = new MDCFixedTopAppBarFoundation(adapter);
    } else {
      this.foundation = new MDCTopAppBarFoundation(adapter);
    }

    this.$_addAdjustClass();
    this.foundation.init();
  },

  beforeDestroy() {
    if (this.$_fixedAdjust) {
      this.$_fixedAdjust.classList.remove(this.$_fixedAdjustClass);
    }

    this.foundation.destroy();
  },

  methods: {
    $_addAdjustClass() {
      // Add fixed adjust class
      if (!this.$el.nextElementSibling) return;
      let adjustClassIndex = 0;

      if (this.short) {
        adjustClassIndex = 2;
      } else if (this.dense) {
        adjustClassIndex = this.prominent ? 4 : 1;
      } else if (this.prominent) {
        adjustClassIndex = 3;
      }

      this.$_fixedAdjustClass = 'mdc-top-app-bar--' + FIXED_ADJUST_CLASSES[adjustClassIndex];
      this.$_fixedAdjust = this.$el.nextElementSibling;
      this.$_fixedAdjust.classList.add(this.$_fixedAdjustClass);
    }

  }
};
/* script */

const __vue_script__$S = script$S;
/* template */

var __vue_render__$S = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("header", {
    staticClass: "mdc-top-app-bar",
    class: _vm.cssClasses
  }, [_c("div", {
    staticClass: "mdc-top-app-bar__row"
  }, [_c("mdc-top-app-bar-section", {
    attrs: {
      "align-start": "align-start"
    }
  }, [_vm.navIcon ? _c("a", {
    ref: "navIcon",
    staticClass: "material-icons mdc-top-app-bar__navigation-icon",
    attrs: {
      href: "#"
    }
  }, [_vm._v(_vm._s(_vm.navIcon))]) : _vm._e(), _vm.title ? _c("span", {
    staticClass: "mdc-top-app-bar__title"
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e()]), _vm.hasSlot ? _c("mdc-top-app-bar-section", {
    attrs: {
      "align-end": "align-end"
    }
  }, [_vm._t("default")], 2) : _vm._e()], 1)]);
};

var __vue_staticRenderFns__$S = [];
__vue_render__$S._withStripped = true;
/* style */

const __vue_inject_styles__$S = undefined;
/* scoped */

const __vue_scope_id__$S = undefined;
/* module identifier */

const __vue_module_identifier__$S = undefined;
/* functional template */

const __vue_is_functional_template__$S = false;
/* component normalizer */

function __vue_normalize__$S(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\top-app-bar\\TopAppBar.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCTopAppBar$1 = __vue_normalize__$S({
  render: __vue_render__$S,
  staticRenderFns: __vue_staticRenderFns__$S
}, __vue_inject_styles__$S, __vue_script__$S, __vue_scope_id__$S, __vue_is_functional_template__$S, __vue_module_identifier__$S, undefined, undefined); //


var script$T = {
  name: 'MDCTopAppBarActionItem',
  components: {
    MdcIcon: MDCIcon
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    label: String,
    link: String
  }
};
/* script */

const __vue_script__$T = script$T;
/* template */

var __vue_render__$T = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("mdc-icon", {
    staticClass: "mdc-top-app-bar__action-item",
    attrs: {
      tag: "a",
      icon: _vm.icon,
      label: _vm.label,
      href: _vm.link
    }
  }, [_vm._v(_vm._s(_vm.icon))]);
};

var __vue_staticRenderFns__$T = [];
__vue_render__$T._withStripped = true;
/* style */

const __vue_inject_styles__$T = undefined;
/* scoped */

const __vue_scope_id__$T = undefined;
/* module identifier */

const __vue_module_identifier__$T = undefined;
/* functional template */

const __vue_is_functional_template__$T = false;
/* component normalizer */

function __vue_normalize__$T(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  const component = (typeof script === 'function' ? script.options : script) || {}; // For security concerns, we use only base name in production mode.

  component.__file = "C:\\Users\\Christian\\Documents\\GitHub\\vue-mdc-web\\packages\\top-app-bar\\TopAppBarActionItem.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;
    if (functional) component.functional = true;
  }

  component._scopeId = scope;
  return component;
}
/* style inject */

/* style inject SSR */


var MDCTopAppBarActionItem = __vue_normalize__$T({
  render: __vue_render__$T,
  staticRenderFns: __vue_staticRenderFns__$T
}, __vue_inject_styles__$T, __vue_script__$T, __vue_scope_id__$T, __vue_is_functional_template__$T, __vue_module_identifier__$T, undefined, undefined);

function install$m(Vue, register) {
  register(MDCTopAppBar$1, Section, MDCTopAppBarActionItem);
}

var TopAppBar =
/*#__PURE__*/
Object.freeze({
  MDCTopAppBar: MDCTopAppBar$1,
  MDCTopAppBarSection: Section,
  MDCTopAppBarActionItem: MDCTopAppBarActionItem,
  install: install$m
});
const DEFAULT_OPTS = {
  theme: '',
  typography: false
}; //TODO: make option manager in mixins and other stuff...instead of having options in components
//TODO: fix all v-model DRY with arrays strings bindings. Chips, Checkbox, Radio, Select, Switch, Textfield.

var index = {
  install(Vue, opts) {
    const {
      body
    } = document;
    opts = Object.assign({}, DEFAULT_OPTS, opts); // Add typography on body

    if (opts.typography) {
      body.classList.add('mdc-typography');
    } // Apply theme on body


    if (opts.theme) {
      body.classList.add(`mdc-theme--${opts.theme}`);
    } // Simple helper function for registering components


    const register = (...components) => {
      components.forEach(component => {
        const name = component.name.substr(3);
        Vue.component('Mdc' + name, component);
      });
    }; // Add all the packages as global components


    Vue.use(App, register);
    Vue.use(Button, register);
    Vue.use(Card, register);
    Vue.use(Checkbox, register);
    Vue.use(Chips, register);
    Vue.use(Dialog, register);
    Vue.use(Drawer, register);
    Vue.use(Fab, register);
    Vue.use(FormField, register);
    Vue.use(GridList, register);
    Vue.use(IconToggle, register); //Vue.use(ImageList, register);

    Vue.use(LayoutGrid, register);
    Vue.use(LinearProgress, register);
    Vue.use(List, register);
    Vue.use(Menu, register);
    Vue.use(Radio, register); //Vue.use(Shape, register);

    Vue.use(Select, register); //Vue.use(Slider);

    Vue.use(Snackbar, register);
    Vue.use(Switch, register); //Vue.use(Tabs, register);

    Vue.use(Textfield, register);
    Vue.use(Toolbar, register);
    Vue.use(TopAppBar, register);
  }

};
var _default = index;
exports.default = _default;
},{}],"lib/storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let isSupported = true; // Check for StorageAPI support

try {
  const key = '_';
  localStorage.setItem(key, true);
  localStorage.removeItem(key);
} catch (ex) {
  isSupported = false;
}

var _default = {
  data: {},

  get(key, asJSON = false) {
    if (isSupported) {
      let value = localStorage.getItem(key);

      if (asJSON) {
        value = JSON.parse(value);
      }

      return value;
    }

    return this.data.hasOwnProperty(key) ? this.data[key] : null;
  },

  set(key, value) {
    if (isSupported) {
      // Save non natives as JSON string
      if (value instanceof Object || value instanceof Array) {
        value = JSON.stringify(value);
      }

      return localStorage.setItem(key, value);
    } // Emulate null behaviour of storage api


    if (value === null) {
      value = 'null';
    }

    this.data[key] = value;
  },

  has(key) {
    return this.get(key) !== null;
  },

  remove(key) {
    if (isSupported) {
      return localStorage.removeItem(key);
    }

    delete this.data[key];
  },

  clear() {
    if (isSupported) {
      return localStorage.clear();
    }

    this.data = {};
  }

};
exports.default = _default;
},{}],"lib/auth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Auth = void 0;

var _storage = _interopRequireDefault(require("./storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TOKEN_KEY = 'auth_token';
const PAYLOAD_KEY = 'auth_payload';
const EXPIRES_KEY = 'auth_expires';
/**
 * Simplified fetch wrapper
 * @param {String} path 
 * @param {Object} body 
 */

async function request(path, body) {
  if (!body) {
    throw new Error('Auth requester needs a body!');
  }

  const res = await fetch(path, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  });

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.message || 'Generellt autensiterigs fel!');
  }

  return res.json();
}

const Auth = {
  path: '/cms/auth',

  get token() {
    return _storage.default.get(TOKEN_KEY);
  },

  get expires() {
    return _storage.default.get(EXPIRES_KEY);
  },

  get payload() {
    return _storage.default.get(PAYLOAD_KEY, true);
  },

  get isLoggedIn() {
    const {
      token,
      expires
    } = this; // Check if token is still valid

    return !!token && expires >= Date.now();
  },

  /**
   * 
   * @param {*} role - Role key.access string
   */
  hasRole(role) {
    const [roleKey, roleAccess] = role.split('.');
    if (!this.isLoggedIn) return false; // Check if we have access to the 

    return this.payload.roles.some(userRole => {
      const [key, access] = userRole.split('.');
      return roleKey == key && (access == 'all' || access == roleAccess);
    });
  },

  /**
   * Renews the token
   */
  async renewToken() {
    if (!this.token) {
      throw new Error('Can\'t renew a nonexistent token!');
    } // Renew the token


    const {
      token,
      expires
    } = await request(`${this.path}/renewToken`, {
      token
    });

    _storage.default.set(TOKEN_KEY, token);

    _storage.default.set(EXPIRES_KEY, expires);
  },

  /**
   * Changes the users password
   * @param {String} newPassword 
   */
  changePassword(newPassword) {
    const {
      path,
      token
    } = this; // Changing the password also renews the token

    return request(`${path}/changePassword`, {
      token,
      newPassword
    });
  },

  /**
   * Logins the user and sets the session
   * @param {String} username 
   * @param {String} password 
   */
  async login(username, password) {
    const {
      path
    } = this; // Set access token

    const {
      token,
      expires,
      payload
    } = await request(`${path}/login`, {
      username,
      password
    });

    _storage.default.set(TOKEN_KEY, token);

    _storage.default.set(EXPIRES_KEY, expires);

    _storage.default.set(PAYLOAD_KEY, payload);
  },

  /**
   * Destroys the session
   */
  logout() {
    _storage.default.clear();
    /*Storage.remove(TOKEN_KEY);
    Storage.remove(EXPIRES_KEY);
    Storage.remove(PAYLOAD_KEY);*/

  }

};
exports.Auth = Auth;
var _default = {
  // Vue plugin
  installed: false,

  install(Vue, path = '/cms/auth') {
    if (this.installed) return;
    this.installed = true;
    Auth.path = path; // Define auth object to vue prototype

    Object.defineProperty(Vue.prototype, '$auth', {
      writable: false,
      value: Auth
    });
  },

  // Vue Router authentication middleware
  middleware(to, from, next) {
    if (!Auth.isLoggedIn && to.matched.some(record => record.meta.requiresAuth)) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath != '/' ? to.fullPath : undefined
        }
      });
    } else {
      next();
    }
  }

};
exports.default = _default;
},{"./storage":"lib/storage.js"}],"../../node_modules/vue-hot-reload-api/dist/index.js":[function(require,module,exports) {
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }
      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)
      instance.$forceUpdate()
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

},{}],"Layout.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
var _default = {
  name: 'App',

  mounted() {
    this.$snackbar.$on(this.$refs.snackbar.show);
  },

  beforeDestroy() {
    this.$snackbar.$off(this.$refs.snackbar.show);
  }

};
exports.default = _default;
        var $875ec7 = exports.default || module.exports;
      
      if (typeof $875ec7 === 'function') {
        $875ec7 = $875ec7.options;
      }
    
        /* template */
        Object.assign($875ec7, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "mdc-typography", attrs: { id: "app" } },
    [
      _c("router-view", { staticClass: "app-view" }),
      _vm._v(" "),
      _c("mdc-snackbar", {
        ref: "snackbar",
        attrs: { "align-start": "align-start" }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$875ec7', $875ec7);
          } else {
            api.reload('$875ec7', $875ec7);
          }
        }

        
      }
    })();
},{"vue-hot-reload-api":"../../node_modules/vue-hot-reload-api/dist/index.js","vue":"../../node_modules/vue/dist/vue.runtime.esm.js"}],"../../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"routes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = require("./lib/auth");

/* Lazy load the routes */
const Dashboard = () => require("_bundle_loader")(require.resolve('./components/Dashboard.vue'));

const EditFields = () => require("_bundle_loader")(require.resolve('./components/EditFields.vue'));

const EditPage = () => require("_bundle_loader")(require.resolve('./components/EditPage.vue'));

const Layout = () => require("_bundle_loader")(require.resolve('./components/Layout.vue'));

const Login = () => require("_bundle_loader")(require.resolve('./components/Login.vue'));

const Pages = () => require("_bundle_loader")(require.resolve('./components/Pages.vue'));

const NotFound = () => require("_bundle_loader")(require.resolve('./components/NotFound.vue'));

var _default = [{
  path: '/login',
  component: Login,
  meta: {
    title: 'Logga in'
  },

  beforeEnter(to, from, next) {
    if (_auth.Auth.isLoggedIn) {
      const {
        redirect
      } = to.query;
      const path = redirect || from.path || '/';
      next(path);
    }

    next();
  }

}, {
  path: '/logout',
  meta: {
    requiresAuth: true
  },

  beforeEnter(to, from, next) {
    _auth.Auth.logout();

    next('/login');
  }

}, {
  path: '/',
  component: Layout,
  meta: {
    requiresAuth: true
  },
  children: [{
    path: '',
    component: Dashboard,
    meta: {
      title: 'Dashboard'
    }
  }, {
    path: 'pages',
    component: Pages,
    meta: {
      title: 'Pages'
    }
  }, {
    path: 'edit/page/:page',
    component: EditPage,
    meta: {
      title: 'Edit Page'
    }
  }, {
    path: 'edit/fields/:page',
    component: EditFields,
    meta: {
      title: 'Edit Fields'
    }
  }, {
    path: '*',
    component: NotFound
  }]
}, {
  path: '/*',
  component: NotFound
}];
exports.default = _default;
},{"_bundle_loader":"../../node_modules/parcel-bundler/src/builtins/bundle-loader.js","./components/Dashboard.vue":[["Dashboard.6bb2be57.js","components/Dashboard.vue"],"Dashboard.6bb2be57.map","components/Dashboard.vue"],"./components/EditFields.vue":[["EditFields.db2187f8.js","components/EditFields.vue"],"EditFields.db2187f8.map","components/EditFields.vue"],"./components/EditPage.vue":[["EditPage.8c3362a0.js","components/EditPage.vue"],"EditPage.8c3362a0.map","components/EditPage.vue"],"./components/Layout.vue":[["Layout.42b12e09.js","components/Layout.vue"],"Layout.42b12e09.map","components/Layout.vue"],"./components/Login.vue":[["Login.73b5ea52.js","components/Login.vue"],"Login.73b5ea52.map","components/Login.vue"],"./components/Pages.vue":[["Pages.c0f6e4a4.js","components/Pages.vue"],"Pages.c0f6e4a4.map","components/Pages.vue"],"./components/NotFound.vue":[["NotFound.11221f77.js","components/NotFound.vue"],"NotFound.11221f77.map","components/NotFound.vue"],"./lib/auth":"lib/auth.js"}],"lib/snackbar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Snackbar = {
  _listeners: [],

  $on(handler) {
    if (typeof handler !== "function") {
      throw "listener has to be a function";
    }

    this._listeners.push(handler);
  },

  $off(handler) {
    const index = this._listeners.includes(handler);

    if (index >= 0) {
      this._listeners.splice(index, 1);
    }
  },

  show(...args) {
    this._listeners.forEach(listener => listener(...args));
  }

};

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.defineProperty(Vue.prototype, "$snackbar", {
    value: Snackbar,
    writable: false
  });
}

var _default = {
  install
};
exports.default = _default;
},{}],"lib/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = require("./auth");

function param(params) {
  if (!params || !(typeof params == 'object' || Array.isArray(params))) {
    throw new TypeError('Parameter \'params\' is not an object or an array');
  }

  return Object.entries(params).filter(item => item[1] !== undefined).map(item => `${item[0]}=${encodeURIComponent(item[1])}`).join('&');
}

async function request(root, path, {
  method,
  body
} = {}) {
  body = body || {};
  method = method ? method.toLowerCase() : 'get';
  const headers = new Headers({
    'Accept': 'application/json'
  }); // Add token to api request

  if (!_auth.Auth.isLoggedIn) {
    await _auth.Auth.renewToken();
  }

  body.token = _auth.Auth.token;

  if (method === 'post' || method == 'put') {
    if (typeof body === 'object' || Array.isArray(body)) {
      headers.append('Content-Type', 'application/json');
      body = JSON.stringify(body);
    }
  } else if (body) {
    const query = param(body);
    path = `${path}?${query}`;
    body = undefined; // unset body
  }

  const res = await fetch(root + path, {
    method,
    headers,
    body
  });
  const json = await res.json(); // Only let 2xx requests be resolved

  if (!res.ok) {
    throw new Error(json.message || 'Generellt fel');
  }

  return json;
}

var _default = {
  installed: false,

  install(Vue, root = '') {
    if (!this.installed) {
      this.installed = true;
      Object.defineProperty(Vue.prototype, '$api', {
        writable: false,
        value: request.bind(this, root)
      });
    }
  }

};
exports.default = _default;
},{"./auth":"lib/auth.js"}],"../../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _vueMdcWeb = _interopRequireDefault(require("vue-mdc-web"));

var _auth = _interopRequireDefault(require("./lib/auth"));

var _Layout = _interopRequireDefault(require("./Layout.vue"));

var _routes = _interopRequireDefault(require("./routes"));

var _snackbar = _interopRequireDefault(require("./lib/snackbar"));

var _api = _interopRequireDefault(require("./lib/api"));

require("./styles.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO: add vuex to avoid globals and ugly magic in plugins (toaster for example)
//import Vuex from 'vuex';
const Router = new _vueRouter.default({
  base: '/',
  mode: 'history',
  routes: _routes.default
});

_vue.default.use(_vueRouter.default);

_vue.default.use(_vueMdcWeb.default);

_vue.default.use(_snackbar.default); // Set API fetch shorthand


_vue.default.use(_api.default, '/api');

_vue.default.use(_auth.default, '/auth'); // Title plugin


Router.beforeEach((to, from, next) => {
  const match = to.matched.find(record => record.meta.title);

  if (match && match.meta && match.meta.title) {
    document.title = `CMS | ${match.meta.title}`;
  }

  next();
});
Router.beforeEach(_auth.default.middleware); // Create vue instance

new _vue.default({
  el: '#app',
  router: Router,
  render: h => h(_Layout.default)
});
},{"vue":"../../node_modules/vue/dist/vue.runtime.esm.js","vue-router":"../../node_modules/vue-router/dist/vue-router.esm.js","vue-mdc-web":"../../node_modules/vue-mdc-web/dist/vue-mdc-web.esm.js","./lib/auth":"lib/auth.js","./Layout.vue":"Layout.vue","./routes":"routes.js","./lib/snackbar":"lib/snackbar.js","./lib/api":"lib/api.js","./styles.scss":"styles.scss"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55597" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}],"../../node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;

    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };

    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("../../node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.register("js",require("../../node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js"));
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0,"app.js"], null)
//# sourceMappingURL=/dist/app.map