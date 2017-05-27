(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const riot = require("riot");
//const UI_TAGS = ["button", "grid", "icon", "item", "menu", "segment"];

// Main components
require("./modules/cms.tag");

const isStr = str => typeof str === "string";

// Get all the UI components
/*UI_TAGS.forEach(name => {
  require(`./modules/ui/${name}.tag`);
});*/
require('./modules/ui/button.tag');require('./modules/ui/grid.tag');require('./modules/ui/icon.tag');require('./modules/ui/item.tag');require('./modules/ui/menu.tag');require('./modules/ui/segment.tag');

if(!window.riot) {
  window.riot = riot;
}
},{"./modules/cms.tag":2,"./modules/ui/button.tag":3,"./modules/ui/grid.tag":4,"./modules/ui/icon.tag":5,"./modules/ui/item.tag":6,"./modules/ui/menu.tag":7,"./modules/ui/segment.tag":8,"riot":10}],2:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('cms', '<h3>{opts.title} - {opts.count}</h3> <form> <input ref="input" type="text" oninput="{onInput}"> <h3>Hello {greeting}</h3> </form> <ui-button basic icon="linkify">Hello mate</ui-button> <ui-segment> <ui-button>Click me</ui-button> </ui-segment>', 'cms { margin-left: 16rem; display: block; } cms h3,[data-is="cms"] h3{ color: red; }', '', function(opts) {
    this.greeting = "Kek";
    this.items = ["kek", "lel", "lol", "halal", "tripp"];

    this.onInput = function(e) {
      this.greeting = this.refs.input.value;
    }.bind(this)
});
},{"riot":10}],3:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('ui-button', '<ui-icon if="{icon}" icon="{icon}"></ui-icon> <yield></yield>', '', 'class="{classes}" tabindex="{tabindex}"', function(opts) {
    const { isStr, classify } = require("./util.js");
    const { icon, color, social, size, float, attach } = opts;
    const classes = {
      basic: opts.basic,
      animated: opts.animated,
      active: opts.active,
      disabled: opts.disabled,
      loading: opts.loading,
      compact: opts.compact,
      toggle: opts.toggle,
      fluid: opts.fluid,
      circular: opts.circular,
      labeled: opts.labeled
    };

    classes[size] = size;
    classes[color] = color;

    if(isStr(icon)) {
      classes.icon = true;
      if(icon) {
        this.icon = opts.icon;
      }
    } else if(isStr(social)) {
      classes[social] = true;
      if(social) {
        this.icon = social;
      }
    }

    if(isStr(float)) {
      classes.floated = true;
      if(float) {
        classes[float] = true;
      }
    }
    if(isStr(attach)) {
      classes.attached = true;
      if(attach) {
        classes[attach] = true;
      }
    }

    this.classes = classify(classes, "button");
});
},{"./util.js":9,"riot":10}],4:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('ui-grid', '<ui-column size="2"></ui-column>', '', 'class="ui grid {classes}"', function(opts) {
});
},{"riot":10}],5:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('ui-icon', '', '', 'class="{opts.icon} icon"', function(opts) {
});
},{"riot":10}],6:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('ui-item', '<ui-icon if="{icon}" icon="{icon}"></ui-icon> <a if="{opts.href}" href="{opts.href}"><yield></yield></a> <yield if="{!opts.href}"></yield>', '', 'class="{classes}"', function(opts) {
    const {icon} = opts;

    if(icon) {
      this.icon = icon;
    }
});
},{"riot":10}],7:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('ui-menu', '<yield></yield>', '', 'class="{classes}"', function(opts) {
    const {classify, enumOf} = require("./util.js");
    const {size, width, color, position} = opts;
    const classes = {
      icon: opts.icon,
      labeled: opts.labeled,
      text: opts.text,
      attached: opts.attached,
      vertical: opts.vertical,
      stackable: opts.stackable,
      inverted: opts.inverted,
      borderless: opts.borderless,
      pagination: opts.pagination,
      compact: opts.compact,
      pointing: opts.pointing,
      tabular: opts.tabular,
      fluid: opts.fluid,
      fixed: opts.fixed
    };

    if(enumOf(size, SIZES)) {

    }

    if(enumOf(width, WIDTH)) {
      classes[width] = true;
      classes.item = true;
    }
    if(size) {
      classes[size] = true;
    }
    if(width) {
      classes[width] = true;
      classes.item = true;
    }
    if (position) {
      classes[position] = true;
    }
    if (color) {
      classes[color] = true;
    }

    this.classes = classify(classes, "menu");
});
},{"./util.js":9,"riot":10}],8:[function(require,module,exports){
var riot = require('riot');
module.exports = riot.tag2('ui-segment', '<yield></yield>', '', 'class="{classes}"', function(opts) {
    const { isStr } = require("./util.js");
    const {color, attach, float, align} = opts;

    this.classes = {
      ui: true,
      segment: true,
      raised: isStr(opts.raised),
      stacked: isStr(opts.stacked),
      piled: isStr(opts.piled),
      vertical: isStr(opts.vertical),
      disabled: isStr(opts.disabled),
      loading: isStr(opts.loading),
      inverted: isStr(opts.inverted),
      padded: isStr(opts.padded),
      compact: isStr(opts.compact),
      circular: isStr(opts.circular),
      clearing: isStr(opts.clearing),
      basic: isStr(opts.basic)
    };

    if(color) {
      this.classes[color] = true;
    }
    if(isStr(attach)) {
      this.classes.attached = true;
      if(attach) {
        this.classes[attach] = true;
      }
    }
    if(isStr(float)) {
      this.classes.floated = true;
      if(float) {
        this.classes[float] = true;
      }
    }
    if(isStr(align)) {
      this.classes.aligned = true;
      if(align) {
        this.classes[align] = true;
      }
    }
});
},{"./util.js":9,"riot":10}],9:[function(require,module,exports){
module.exports = {
  WIDTH: [
    "one", "two", "three", "four", "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve", "fourteen", "fifteen", "sixteen"
  ],
  SIZES: ["mini", "small", "large", "massive"],
  ATTACH: ["top","bottom","left","right"],

  isStr(str) {
    return typeof str === "string";
  },
  classify(obj, type) {
    const classes = ["ui"];
    Object.keys(obj).forEach(name => {
      const value = obj[name];
      if (value || value === "")
        classes.push(name);
    });

    if(type) {
      classes.push(type);
    }
    return classes.join(" ");
  },
  enumOf(value, enums) {
    return enums.include(value);
  }
};
},{}],10:[function(require,module,exports){
/* Riot v3.5.1, @license MIT */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.riot = global.riot || {})));
}(this, (function (exports) { 'use strict';

var __TAGS_CACHE = [];
var __TAG_IMPL = {};
var GLOBAL_MIXIN = '__global_mixin';
var ATTRS_PREFIX = 'riot-';
var REF_DIRECTIVES = ['ref', 'data-ref'];
var IS_DIRECTIVE = 'data-is';
var CONDITIONAL_DIRECTIVE = 'if';
var LOOP_DIRECTIVE = 'each';
var LOOP_NO_REORDER_DIRECTIVE = 'no-reorder';
var SHOW_DIRECTIVE = 'show';
var HIDE_DIRECTIVE = 'hide';
var RIOT_EVENTS_KEY = '__riot-events__';
var T_STRING = 'string';
var T_OBJECT = 'object';
var T_UNDEF  = 'undefined';
var T_FUNCTION = 'function';
var XLINK_NS = 'http://www.w3.org/1999/xlink';
var SVG_NS = 'http://www.w3.org/2000/svg';
var XLINK_REGEX = /^xlink:(\w+)/;
var WIN = typeof window === T_UNDEF ? undefined : window;
var RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/;
var RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
var RE_EVENTS_PREFIX = /^on/;
var RE_RESERVED_NAMES = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/;
var RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
var CASE_SENSITIVE_ATTRIBUTES = { 'viewbox': 'viewBox' };
var RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/;
var IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;

/**
 * Check Check if the passed argument is undefined
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isBoolAttr(value) {
  return RE_BOOL_ATTRS.test(value)
}

/**
 * Check if passed argument is a function
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isFunction(value) {
  return typeof value === T_FUNCTION
}

/**
 * Check if passed argument is an object, exclude null
 * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isObject(value) {
  return value && typeof value === T_OBJECT // typeof null is 'object'
}

/**
 * Check if passed argument is undefined
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isUndefined(value) {
  return typeof value === T_UNDEF
}

/**
 * Check if passed argument is a string
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isString(value) {
  return typeof value === T_STRING
}

/**
 * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
 * @param { * } value -
 * @returns { Boolean } -
 */
function isBlank(value) {
  return isUndefined(value) || value === null || value === ''
}

/**
 * Check if passed argument is a kind of array
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isArray(value) {
  return Array.isArray(value) || value instanceof Array
}

/**
 * Check whether object's property could be overridden
 * @param   { Object }  obj - source object
 * @param   { String }  key - object property
 * @returns { Boolean } -
 */
function isWritable(obj, key) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, key);
  return isUndefined(obj[key]) || descriptor && descriptor.writable
}

/**
 * Check if passed argument is a reserved name
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isReservedName(value) {
  return RE_RESERVED_NAMES.test(value)
}

var check = Object.freeze({
	isBoolAttr: isBoolAttr,
	isFunction: isFunction,
	isObject: isObject,
	isUndefined: isUndefined,
	isString: isString,
	isBlank: isBlank,
	isArray: isArray,
	isWritable: isWritable,
	isReservedName: isReservedName
});

/**
 * Shorter and fast way to select multiple nodes in the DOM
 * @param   { String } selector - DOM selector
 * @param   { Object } ctx - DOM node where the targets of our search will is located
 * @returns { Object } dom nodes found
 */
function $$(selector, ctx) {
  return Array.prototype.slice.call((ctx || document).querySelectorAll(selector))
}

/**
 * Shorter and fast way to select a single node in the DOM
 * @param   { String } selector - unique dom selector
 * @param   { Object } ctx - DOM node where the target of our search will is located
 * @returns { Object } dom node found
 */
function $(selector, ctx) {
  return (ctx || document).querySelector(selector)
}

/**
 * Create a document fragment
 * @returns { Object } document fragment
 */
function createFrag() {
  return document.createDocumentFragment()
}

/**
 * Create a document text node
 * @returns { Object } create a text node to use as placeholder
 */
function createDOMPlaceholder() {
  return document.createTextNode('')
}

/**
 * Check if a DOM node is an svg tag
 * @param   { HTMLElement }  el - node we want to test
 * @returns {Boolean} true if it's an svg node
 */
function isSvg(el) {
  return !!el.ownerSVGElement
}

/**
 * Create a generic DOM node
 * @param   { String } name - name of the DOM node we want to create
 * @param   { Boolean } isSvg - true if we need to use an svg node
 * @returns { Object } DOM node just created
 */
function mkEl(name) {
  return name === 'svg' ? document.createElementNS(SVG_NS, name) : document.createElement(name)
}

/**
 * Set the inner html of any DOM node SVGs included
 * @param { Object } container - DOM node where we'll inject new html
 * @param { String } html - html to inject
 */
/* istanbul ignore next */
function setInnerHTML(container, html) {
  if (!isUndefined(container.innerHTML))
    { container.innerHTML = html; }
    // some browsers do not support innerHTML on the SVGs tags
  else {
    var doc = new DOMParser().parseFromString(html, 'application/xml');
    var node = container.ownerDocument.importNode(doc.documentElement, true);
    container.appendChild(node);
  }
}

/**
 * Toggle the visibility of any DOM node
 * @param   { Object }  dom - DOM node we want to hide
 * @param   { Boolean } show - do we want to show it?
 */

function toggleVisibility(dom, show) {
  dom.style.display = show ? '' : 'none';
  dom['hidden'] = show ? false : true;
}

/**
 * Remove any DOM attribute from a node
 * @param   { Object } dom - DOM node we want to update
 * @param   { String } name - name of the property we want to remove
 */
function remAttr(dom, name) {
  dom.removeAttribute(name);
}

/**
 * Convert a style object to a string
 * @param   { Object } style - style object we need to parse
 * @returns { String } resulting css string
 * @example
 * styleObjectToString({ color: 'red', height: '10px'}) // => 'color: red; height: 10px'
 */
function styleObjectToString(style) {
  return Object.keys(style).reduce(function (acc, prop) {
    return (acc + " " + prop + ": " + (style[prop]) + ";")
  }, '')
}

/**
 * Get the value of any DOM attribute on a node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { String } name - name of the attribute we want to get
 * @returns { String | undefined } name of the node attribute whether it exists
 */
function getAttr(dom, name) {
  return dom.getAttribute(name)
}

/**
 * Set any DOM attribute
 * @param { Object } dom - DOM node we want to update
 * @param { String } name - name of the property we want to set
 * @param { String } val - value of the property we want to set
 */
function setAttr(dom, name, val) {
  var xlink = XLINK_REGEX.exec(name);
  if (xlink && xlink[1])
    { dom.setAttributeNS(XLINK_NS, xlink[1], val); }
  else
    { dom.setAttribute(name, val); }
}

/**
 * Insert safely a tag to fix #1962 #1649
 * @param   { HTMLElement } root - children container
 * @param   { HTMLElement } curr - node to insert
 * @param   { HTMLElement } next - node that should preceed the current node inserted
 */
function safeInsert(root, curr, next) {
  root.insertBefore(curr, next.parentNode && next);
}

/**
 * Minimize risk: only zero or one _space_ between attr & value
 * @param   { String }   html - html string we want to parse
 * @param   { Function } fn - callback function to apply on any attribute found
 */
function walkAttrs(html, fn) {
  if (!html)
    { return }
  var m;
  while (m = RE_HTML_ATTRS.exec(html))
    { fn(m[1].toLowerCase(), m[2] || m[3] || m[4]); }
}

/**
 * Walk down recursively all the children tags starting dom node
 * @param   { Object }   dom - starting node where we will start the recursion
 * @param   { Function } fn - callback to transform the child node just found
 * @param   { Object }   context - fn can optionally return an object, which is passed to children
 */
function walkNodes(dom, fn, context) {
  if (dom) {
    var res = fn(dom, context);
    var next;
    // stop the recursion
    if (res === false) { return }

    dom = dom.firstChild;

    while (dom) {
      next = dom.nextSibling;
      walkNodes(dom, fn, res);
      dom = next;
    }
  }
}

var dom = Object.freeze({
	$$: $$,
	$: $,
	createFrag: createFrag,
	createDOMPlaceholder: createDOMPlaceholder,
	isSvg: isSvg,
	mkEl: mkEl,
	setInnerHTML: setInnerHTML,
	toggleVisibility: toggleVisibility,
	remAttr: remAttr,
	styleObjectToString: styleObjectToString,
	getAttr: getAttr,
	setAttr: setAttr,
	safeInsert: safeInsert,
	walkAttrs: walkAttrs,
	walkNodes: walkNodes
});

var styleNode;
var cssTextProp;
var byName = {};
var remainder = [];
var needsInject = false;

// skip the following code on the server
if (WIN) {
  styleNode = (function () {
    // create a new style element with the correct type
    var newNode = mkEl('style');
    setAttr(newNode, 'type', 'text/css');

    // replace any user node or insert the new one into the head
    var userNode = $('style[type=riot]');
    /* istanbul ignore next */
    if (userNode) {
      if (userNode.id) { newNode.id = userNode.id; }
      userNode.parentNode.replaceChild(newNode, userNode);
    }
    else { document.getElementsByTagName('head')[0].appendChild(newNode); }

    return newNode
  })();
  cssTextProp = styleNode.styleSheet;
}

/**
 * Object that will be used to inject and manage the css of every tag instance
 */
var styleManager = {
  styleNode: styleNode,
  /**
   * Save a tag style to be later injected into DOM
   * @param { String } css - css string
   * @param { String } name - if it's passed we will map the css to a tagname
   */
  add: function add(css, name) {
    if (name) { byName[name] = css; }
    else { remainder.push(css); }
    needsInject = true;
  },
  /**
   * Inject all previously saved tag styles into DOM
   * innerHTML seems slow: http://jsperf.com/riot-insert-style
   */
  inject: function inject() {
    if (!WIN || !needsInject) { return }
    needsInject = false;
    var style = Object.keys(byName)
      .map(function(k) { return byName[k] })
      .concat(remainder).join('\n');
    /* istanbul ignore next */
    if (cssTextProp) { cssTextProp.cssText = style; }
    else { styleNode.innerHTML = style; }
  }
};

/**
 * The riot template engine
 * @version v3.0.5
 */
/**
 * riot.util.brackets
 *
 * - `brackets    ` - Returns a string or regex based on its parameter
 * - `brackets.set` - Change the current riot brackets
 *
 * @module
 */

/* global riot */

/* istanbul ignore next */
var brackets = (function (UNDEF) {

  var
    REGLOB = 'g',

    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`/g,

    S_QBLOCKS = R_STRINGS.source + '|' +
      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?([^<]\/)[gim]*/.source,

    UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),

    NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,

    FINDBRACES = {
      '(': RegExp('([()])|'   + S_QBLOCKS, REGLOB),
      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
      '{': RegExp('([{}])|'   + S_QBLOCKS, REGLOB)
    },

    DEFAULT = '{ }';

  var _pairs = [
    '{', '}',
    '{', '}',
    /{[^}]*}/,
    /\\([{}])/g,
    /\\({)|{/g,
    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB),
    DEFAULT,
    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
    /(^|[^\\]){=[\S\s]*?}/
  ];

  var
    cachedBrackets = UNDEF,
    _regex,
    _cache = [],
    _settings;

  function _loopback (re) { return re }

  function _rewrite (re, bp) {
    if (!bp) { bp = _cache; }
    return new RegExp(
      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
    )
  }

  function _create (pair) {
    if (pair === DEFAULT) { return _pairs }

    var arr = pair.split(' ');

    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
      throw new Error('Unsupported brackets "' + pair + '"')
    }
    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));

    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
    arr[6] = _rewrite(_pairs[6], arr);
    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB);
    arr[8] = pair;
    return arr
  }

  function _brackets (reOrIdx) {
    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
  }

  _brackets.split = function split (str, tmpl, _bp) {
    // istanbul ignore next: _bp is for the compiler
    if (!_bp) { _bp = _cache; }

    var
      parts = [],
      match,
      isexpr,
      start,
      pos,
      re = _bp[6];

    isexpr = start = re.lastIndex = 0;

    while ((match = re.exec(str))) {

      pos = match.index;

      if (isexpr) {

        if (match[2]) {
          re.lastIndex = skipBraces(str, match[2], re.lastIndex);
          continue
        }
        if (!match[3]) {
          continue
        }
      }

      if (!match[1]) {
        unescapeStr(str.slice(start, pos));
        start = re.lastIndex;
        re = _bp[6 + (isexpr ^= 1)];
        re.lastIndex = start;
      }
    }

    if (str && start < str.length) {
      unescapeStr(str.slice(start));
    }

    return parts

    function unescapeStr (s) {
      if (tmpl || isexpr) {
        parts.push(s && s.replace(_bp[5], '$1'));
      } else {
        parts.push(s);
      }
    }

    function skipBraces (s, ch, ix) {
      var
        match,
        recch = FINDBRACES[ch];

      recch.lastIndex = ix;
      ix = 1;
      while ((match = recch.exec(s))) {
        if (match[1] &&
          !(match[1] === ch ? ++ix : --ix)) { break }
      }
      return ix ? s.length : recch.lastIndex
    }
  };

  _brackets.hasExpr = function hasExpr (str) {
    return _cache[4].test(str)
  };

  _brackets.loopKeys = function loopKeys (expr) {
    var m = expr.match(_cache[9]);

    return m
      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
      : { val: expr.trim() }
  };

  _brackets.array = function array (pair) {
    return pair ? _create(pair) : _cache
  };

  function _reset (pair) {
    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
      _cache = _create(pair);
      _regex = pair === DEFAULT ? _loopback : _rewrite;
      _cache[9] = _regex(_pairs[9]);
    }
    cachedBrackets = pair;
  }

  function _setSettings (o) {
    var b;

    o = o || {};
    b = o.brackets;
    Object.defineProperty(o, 'brackets', {
      set: _reset,
      get: function () { return cachedBrackets },
      enumerable: true
    });
    _settings = o;
    _reset(b);
  }

  Object.defineProperty(_brackets, 'settings', {
    set: _setSettings,
    get: function () { return _settings }
  });

  /* istanbul ignore next: in the browser riot is always in the scope */
  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
  _brackets.set = _reset;

  _brackets.R_STRINGS = R_STRINGS;
  _brackets.R_MLCOMMS = R_MLCOMMS;
  _brackets.S_QBLOCKS = S_QBLOCKS;

  return _brackets

})();

/**
 * @module tmpl
 *
 * tmpl          - Root function, returns the template value, render with data
 * tmpl.hasExpr  - Test the existence of a expression inside a string
 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
 */

/* istanbul ignore next */
var tmpl = (function () {

  var _cache = {};

  function _tmpl (str, data) {
    if (!str) { return str }

    return (_cache[str] || (_cache[str] = _create(str))).call(
      data, _logErr.bind({
        data: data,
        tmpl: str
      })
    )
  }

  _tmpl.hasExpr = brackets.hasExpr;

  _tmpl.loopKeys = brackets.loopKeys;

  // istanbul ignore next
  _tmpl.clearCache = function () { _cache = {}; };

  _tmpl.errorHandler = null;

  function _logErr (err, ctx) {

    err.riotData = {
      tagName: ctx && ctx.__ && ctx.__.tagName,
      _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
    };

    if (_tmpl.errorHandler) { _tmpl.errorHandler(err); }
    else if (
      typeof console !== 'undefined' &&
      typeof console.error === 'function'
    ) {
      console.error(err.message);
      console.log('<%s> %s', err.riotData.tagName || 'Unknown tag', this.tmpl); // eslint-disable-line
      console.log(this.data); // eslint-disable-line
    }
  }

  function _create (str) {
    var expr = _getTmpl(str);

    if (expr.slice(0, 11) !== 'try{return ') { expr = 'return ' + expr; }

    return new Function('E', expr + ';')    // eslint-disable-line no-new-func
  }

  var
    CH_IDEXPR = String.fromCharCode(0x2057),
    RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
    RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
    RE_DQUOTE = /\u2057/g,
    RE_QBMARK = /\u2057(\d+)~/g;

  function _getTmpl (str) {
    var
      qstr = [],
      expr,
      parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);

    if (parts.length > 2 || parts[0]) {
      var i, j, list = [];

      for (i = j = 0; i < parts.length; ++i) {

        expr = parts[i];

        if (expr && (expr = i & 1

            ? _parseExpr(expr, 1, qstr)

            : '"' + expr
                .replace(/\\/g, '\\\\')
                .replace(/\r\n?|\n/g, '\\n')
                .replace(/"/g, '\\"') +
              '"'

          )) { list[j++] = expr; }

      }

      expr = j < 2 ? list[0]
           : '[' + list.join(',') + '].join("")';

    } else {

      expr = _parseExpr(parts[1], 0, qstr);
    }

    if (qstr[0]) {
      expr = expr.replace(RE_QBMARK, function (_, pos) {
        return qstr[pos]
          .replace(/\r/g, '\\r')
          .replace(/\n/g, '\\n')
      });
    }
    return expr
  }

  var
    RE_BREND = {
      '(': /[()]/g,
      '[': /[[\]]/g,
      '{': /[{}]/g
    };

  function _parseExpr (expr, asText, qstr) {

    expr = expr
          .replace(RE_QBLOCK, function (s, div) {
            return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s
          })
          .replace(/\s+/g, ' ').trim()
          .replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

    if (expr) {
      var
        list = [],
        cnt = 0,
        match;

      while (expr &&
            (match = expr.match(RE_CSNAME)) &&
            !match.index
        ) {
        var
          key,
          jsb,
          re = /,|([[{(])|$/g;

        expr = RegExp.rightContext;
        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

        while (jsb = (match = re.exec(expr))[1]) { skipBraces(jsb, re); }

        jsb  = expr.slice(0, match.index);
        expr = RegExp.rightContext;

        list[cnt++] = _wrapExpr(jsb, 1, key);
      }

      expr = !cnt ? _wrapExpr(expr, asText)
           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
    }
    return expr

    function skipBraces (ch, re) {
      var
        mm,
        lv = 1,
        ir = RE_BREND[ch];

      ir.lastIndex = re.lastIndex;
      while (mm = ir.exec(expr)) {
        if (mm[0] === ch) { ++lv; }
        else if (!--lv) { break }
      }
      re.lastIndex = lv ? expr.length : ir.lastIndex;
    }
  }

  // istanbul ignore next: not both
  var // eslint-disable-next-line max-len
    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
    JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

  function _wrapExpr (expr, asText, key) {
    var tb;

    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
      if (mvar) {
        pos = tb ? 0 : pos + match.length;

        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
          match = p + '("' + mvar + JS_CONTEXT + mvar;
          if (pos) { tb = (s = s[pos]) === '.' || s === '(' || s === '['; }
        } else if (pos) {
          tb = !JS_NOPROPS.test(s.slice(pos));
        }
      }
      return match
    });

    if (tb) {
      expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
    }

    if (key) {

      expr = (tb
          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
        ) + '?"' + key + '":""';

    } else if (asText) {

      expr = 'function(v){' + (tb
          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
        ) + ';return v||v===0?v:""}.call(this)';
    }

    return expr
  }

  _tmpl.version = brackets.version = 'v3.0.5';

  return _tmpl

})();

/* istanbul ignore next */
var observable$1 = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {};

  /**
   * Private variables
   */
  var callbacks = {},
    slice = Array.prototype.slice;

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given `event` ands
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value: function(event, fn) {
        if (typeof fn == 'function')
          { (callbacks[event] = callbacks[event] || []).push(fn); }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value: function(event, fn) {
        if (event == '*' && !fn) { callbacks = {}; }
        else {
          if (fn) {
            var arr = callbacks[event];
            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
              if (cb == fn) { arr.splice(i--, 1); }
            }
          } else { delete callbacks[event]; }
        }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value: function(event, fn) {
        function on() {
          el.off(event, on);
          fn.apply(el, arguments);
        }
        return el.on(event, on)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    trigger: {
      value: function(event) {
        var arguments$1 = arguments;


        // getting the arguments
        var arglen = arguments.length - 1,
          args = new Array(arglen),
          fns,
          fn,
          i;

        for (i = 0; i < arglen; i++) {
          args[i] = arguments$1[i + 1]; // skip first argument
        }

        fns = slice.call(callbacks[event] || [], 0);

        for (i = 0; fn = fns[i]; ++i) {
          fn.apply(el, args);
        }

        if (callbacks['*'] && event != '*')
          { el.trigger.apply(el, ['*', event].concat(args)); }

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  });

  return el

};

/**
 * Specialized function for looping an array-like collection with `each={}`
 * @param   { Array } list - collection of items
 * @param   {Function} fn - callback function
 * @returns { Array } the array looped
 */
function each(list, fn) {
  var len = list ? list.length : 0;
  var i = 0;
  for (; i < len; ++i) {
    fn(list[i], i);
  }
  return list
}

/**
 * Check whether an array contains an item
 * @param   { Array } array - target array
 * @param   { * } item - item to test
 * @returns { Boolean } -
 */
function contains(array, item) {
  return array.indexOf(item) !== -1
}

/**
 * Convert a string containing dashes to camel case
 * @param   { String } str - input string
 * @returns { String } my-string -> myString
 */
function toCamel(str) {
  return str.replace(/-(\w)/g, function (_, c) { return c.toUpperCase(); })
}

/**
 * Faster String startsWith alternative
 * @param   { String } str - source string
 * @param   { String } value - test string
 * @returns { Boolean } -
 */
function startsWith(str, value) {
  return str.slice(0, value.length) === value
}

/**
 * Helper function to set an immutable property
 * @param   { Object } el - object where the new property will be set
 * @param   { String } key - object key where the new property will be stored
 * @param   { * } value - value of the new property
 * @param   { Object } options - set the propery overriding the default options
 * @returns { Object } - the initial object
 */
function defineProperty(el, key, value, options) {
  Object.defineProperty(el, key, extend({
    value: value,
    enumerable: false,
    writable: false,
    configurable: true
  }, options));
  return el
}

/**
 * Extend any object with other properties
 * @param   { Object } src - source object
 * @returns { Object } the resulting extended object
 *
 * var obj = { foo: 'baz' }
 * extend(obj, {bar: 'bar', foo: 'bar'})
 * console.log(obj) => {bar: 'bar', foo: 'bar'}
 *
 */
function extend(src) {
  var obj, args = arguments;
  for (var i = 1; i < args.length; ++i) {
    if (obj = args[i]) {
      for (var key in obj) {
        // check if this property of the source object could be overridden
        if (isWritable(src, key))
          { src[key] = obj[key]; }
      }
    }
  }
  return src
}

var misc = Object.freeze({
	each: each,
	contains: contains,
	toCamel: toCamel,
	startsWith: startsWith,
	defineProperty: defineProperty,
	extend: extend
});

var settings$1 = extend(Object.create(brackets.settings), {
  skipAnonymousTags: true
});

/**
 * Trigger DOM events
 * @param   { HTMLElement } dom - dom element target of the event
 * @param   { Function } handler - user function
 * @param   { Object } e - event object
 */
function handleEvent(dom, handler, e) {
  var ptag = this.__.parent,
    item = this.__.item;

  if (!item)
    { while (ptag && !item) {
      item = ptag.__.item;
      ptag = ptag.__.parent;
    } }

  // override the event properties
  /* istanbul ignore next */
  if (isWritable(e, 'currentTarget')) { e.currentTarget = dom; }
  /* istanbul ignore next */
  if (isWritable(e, 'target')) { e.target = e.srcElement; }
  /* istanbul ignore next */
  if (isWritable(e, 'which')) { e.which = e.charCode || e.keyCode; }

  e.item = item;

  handler.call(this, e);

  if (!e.preventUpdate) {
    var p = getImmediateCustomParentTag(this);
    // fixes #2083
    if (p.isMounted) { p.update(); }
  }
}

/**
 * Attach an event to a DOM node
 * @param { String } name - event name
 * @param { Function } handler - event callback
 * @param { Object } dom - dom node
 * @param { Tag } tag - tag instance
 */
function setEventHandler(name, handler, dom, tag) {
  var eventName,
    cb = handleEvent.bind(tag, dom, handler);

  // avoid to bind twice the same event
  // possible fix for #2332
  dom[name] = null;

  // normalize event name
  eventName = name.replace(RE_EVENTS_PREFIX, '');

  // cache the listener into the listeners array
  if (!contains(tag.__.listeners, dom)) { tag.__.listeners.push(dom); }
  if (!dom[RIOT_EVENTS_KEY]) { dom[RIOT_EVENTS_KEY] = {}; }
  if (dom[RIOT_EVENTS_KEY][name]) { dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][name]); }

  dom[RIOT_EVENTS_KEY][name] = cb;
  dom.addEventListener(eventName, cb, false);
}

/**
 * Update dynamically created data-is tags with changing expressions
 * @param { Object } expr - expression tag and expression info
 * @param { Tag }    parent - parent for tag creation
 * @param { String } tagName - tag implementation we want to use
 */
function updateDataIs(expr, parent, tagName) {
  var conf, isVirtual, head, ref;

  if (expr.tag && expr.tagName === tagName) {
    expr.tag.update();
    return
  }

  isVirtual = expr.dom.tagName === 'VIRTUAL';
  // sync _parent to accommodate changing tagnames
  if (expr.tag) {
    // need placeholder before unmount
    if(isVirtual) {
      head = expr.tag.__.head;
      ref = createDOMPlaceholder();
      head.parentNode.insertBefore(ref, head);
    }

    expr.tag.unmount(true);
  }

  if (!isString(tagName)) { return }

  expr.impl = __TAG_IMPL[tagName];
  conf = {root: expr.dom, parent: parent, hasImpl: true, tagName: tagName};
  expr.tag = initChildTag(expr.impl, conf, expr.dom.innerHTML, parent);
  each(expr.attrs, function (a) { return setAttr(expr.tag.root, a.name, a.value); });
  expr.tagName = tagName;
  expr.tag.mount();
  if (isVirtual)
    { makeReplaceVirtual(expr.tag, ref || expr.tag.root); } // root exist first time, after use placeholder

  // parent is the placeholder tag, not the dynamic tag so clean up
  parent.__.onUnmount = function() {
    var delName = expr.tag.opts.dataIs,
      tags = expr.tag.parent.tags,
      _tags = expr.tag.__.parent.tags;
    arrayishRemove(tags, delName, expr.tag);
    arrayishRemove(_tags, delName, expr.tag);
    expr.tag.unmount();
  };
}

/**
 * Nomalize any attribute removing the "riot-" prefix
 * @param   { String } attrName - original attribute name
 * @returns { String } valid html attribute name
 */
function normalizeAttrName(attrName) {
  if (!attrName) { return null }
  attrName = attrName.replace(ATTRS_PREFIX, '');
  if (CASE_SENSITIVE_ATTRIBUTES[attrName]) { attrName = CASE_SENSITIVE_ATTRIBUTES[attrName]; }
  return attrName
}

/**
 * Update on single tag expression
 * @this Tag
 * @param { Object } expr - expression logic
 * @returns { undefined }
 */
function updateExpression(expr) {
  if (this.root && getAttr(this.root,'virtualized')) { return }

  var dom = expr.dom,
    // remove the riot- prefix
    attrName = normalizeAttrName(expr.attr),
    isToggle = contains([SHOW_DIRECTIVE, HIDE_DIRECTIVE], attrName),
    isVirtual = expr.root && expr.root.tagName === 'VIRTUAL',
    parent = dom && (expr.parent || dom.parentNode),
    // detect the style attributes
    isStyleAttr = attrName === 'style',
    isClassAttr = attrName === 'class',
    hasValue,
    isObj,
    value;

  // if it's a tag we could totally skip the rest
  if (expr._riot_id) {
    if (expr.isMounted) {
      expr.update();
    // if it hasn't been mounted yet, do that now.
    } else {
      expr.mount();
      if (isVirtual) {
        makeReplaceVirtual(expr, expr.root);
      }
    }
    return
  }
  // if this expression has the update method it means it can handle the DOM changes by itself
  if (expr.update) { return expr.update() }

  // ...it seems to be a simple expression so we try to calculat its value
  value = tmpl(expr.expr, isToggle ? extend({}, Object.create(this.parent), this) : this);
  hasValue = !isBlank(value);
  isObj = isObject(value);

  // convert the style/class objects to strings
  if (isObj) {
    isObj = !isClassAttr && !isStyleAttr;
    if (isClassAttr) {
      value = tmpl(JSON.stringify(value), this);
    } else if (isStyleAttr) {
      value = styleObjectToString(value);
    }
  }

  // remove original attribute
  if (expr.attr && (!expr.isAttrRemoved || !hasValue || value === false)) {
    remAttr(dom, expr.attr);
    expr.isAttrRemoved = true;
  }

  // for the boolean attributes we don't need the value
  // we can convert it to checked=true to checked=checked
  if (expr.bool) { value = value ? attrName : false; }
  if (expr.isRtag) { return updateDataIs(expr, this, value) }
  if (expr.wasParsedOnce && expr.value === value) { return }

  // update the expression value
  expr.value = value;
  expr.wasParsedOnce = true;

  // if the value is an object we can not do much more with it
  if (isObj && !isToggle) { return }
  // avoid to render undefined/null values
  if (isBlank(value)) { value = ''; }

  // textarea and text nodes have no attribute name
  if (!attrName) {
    // about #815 w/o replace: the browser converts the value to a string,
    // the comparison by "==" does too, but not in the server
    value += '';
    // test for parent avoids error with invalid assignment to nodeValue
    if (parent) {
      // cache the parent node because somehow it will become null on IE
      // on the next iteration
      expr.parent = parent;
      if (parent.tagName === 'TEXTAREA') {
        parent.value = value;                    // #1113
        if (!IE_VERSION) { dom.nodeValue = value; }  // #1625 IE throws here, nodeValue
      }                                         // will be available on 'updated'
      else { dom.nodeValue = value; }
    }
    return
  }


  // event handler
  if (isFunction(value)) {
    setEventHandler(attrName, value, dom, this);
  // show / hide
  } else if (isToggle) {
    toggleVisibility(dom, attrName === HIDE_DIRECTIVE ? !value : value);
  // handle attributes
  } else {
    if (expr.bool) {
      dom[attrName] = value;
    }

    if (attrName === 'value' && dom.value !== value) {
      dom.value = value;
    }

    if (hasValue && value !== false) {
      setAttr(dom, attrName, value);
    }

    // make sure that in case of style changes
    // the element stays hidden
    if (isStyleAttr && dom.hidden) { toggleVisibility(dom, false); }
  }
}

/**
 * Update all the expressions in a Tag instance
 * @this Tag
 * @param { Array } expressions - expression that must be re evaluated
 */
function updateAllExpressions(expressions) {
  each(expressions, updateExpression.bind(this));
}

var IfExpr = {
  init: function init(dom, tag, expr) {
    remAttr(dom, CONDITIONAL_DIRECTIVE);
    this.tag = tag;
    this.expr = expr;
    this.stub = document.createTextNode('');
    this.pristine = dom;

    var p = dom.parentNode;
    p.insertBefore(this.stub, dom);
    p.removeChild(dom);

    return this
  },
  update: function update() {
    this.value = tmpl(this.expr, this.tag);

    if (this.value && !this.current) { // insert
      this.current = this.pristine.cloneNode(true);
      this.stub.parentNode.insertBefore(this.current, this.stub);
      this.expressions = [];
      parseExpressions.apply(this.tag, [this.current, this.expressions, true]);
    } else if (!this.value && this.current) { // remove
      unmountAll(this.expressions);
      if (this.current._tag) {
        this.current._tag.unmount();
      } else if (this.current.parentNode) {
        this.current.parentNode.removeChild(this.current);
      }
      this.current = null;
      this.expressions = [];
    }

    if (this.value) { updateAllExpressions.call(this.tag, this.expressions); }
  },
  unmount: function unmount() {
    unmountAll(this.expressions || []);
  }
};

var RefExpr = {
  init: function init(dom, parent, attrName, attrValue) {
    this.dom = dom;
    this.attr = attrName;
    this.rawValue = attrValue;
    this.parent = parent;
    this.hasExp = tmpl.hasExpr(attrValue);
    return this
  },
  update: function update() {
    var old = this.value;
    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
    // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
    var tagOrDom = this.dom.__ref || this.tag || this.dom;

    this.value = this.hasExp ? tmpl(this.rawValue, this.parent) : this.rawValue;

    // the name changed, so we need to remove it from the old key (if present)
    if (!isBlank(old) && customParent) { arrayishRemove(customParent.refs, old, tagOrDom); }
    if (!isBlank(this.value) && isString(this.value)) {
      // add it to the refs of parent tag (this behavior was changed >=3.0)
      if (customParent) { arrayishAdd(
        customParent.refs,
        this.value,
        tagOrDom,
        // use an array if it's a looped node and the ref is not an expression
        null,
        this.parent.__.index
      ); }

      if (this.value !== old) {
        setAttr(this.dom, this.attr, this.value);
      }
    } else {
      remAttr(this.dom, this.attr);
    }

    // cache the ref bound to this dom node
    // to reuse it in future (see also #2329)
    if (!this.dom.__ref) { this.dom.__ref = tagOrDom; }
  },
  unmount: function unmount() {
    var tagOrDom = this.tag || this.dom;
    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
    if (!isBlank(this.value) && customParent)
      { arrayishRemove(customParent.refs, this.value, tagOrDom); }
  }
};

/**
 * Convert the item looped into an object used to extend the child tag properties
 * @param   { Object } expr - object containing the keys used to extend the children tags
 * @param   { * } key - value to assign to the new object returned
 * @param   { * } val - value containing the position of the item in the array
 * @param   { Object } base - prototype object for the new item
 * @returns { Object } - new object containing the values of the original item
 *
 * The variables 'key' and 'val' are arbitrary.
 * They depend on the collection type looped (Array, Object)
 * and on the expression used on the each tag
 *
 */
function mkitem(expr, key, val, base) {
  var item = base ? Object.create(base) : {};
  item[expr.key] = key;
  if (expr.pos) { item[expr.pos] = val; }
  return item
}

/**
 * Unmount the redundant tags
 * @param   { Array } items - array containing the current items to loop
 * @param   { Array } tags - array containing all the children tags
 */
function unmountRedundant(items, tags) {
  var i = tags.length,
    j = items.length;

  while (i > j) {
    i--;
    remove.apply(tags[i], [tags, i]);
  }
}


/**
 * Remove a child tag
 * @this Tag
 * @param   { Array } tags - tags collection
 * @param   { Number } i - index of the tag to remove
 */
function remove(tags, i) {
  tags.splice(i, 1);
  this.unmount();
  arrayishRemove(this.parent, this, this.__.tagName, true);
}

/**
 * Move the nested custom tags in non custom loop tags
 * @this Tag
 * @param   { Number } i - current position of the loop tag
 */
function moveNestedTags(i) {
  var this$1 = this;

  each(Object.keys(this.tags), function (tagName) {
    moveChildTag.apply(this$1.tags[tagName], [tagName, i]);
  });
}

/**
 * Move a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function move(root, nextTag, isVirtual) {
  if (isVirtual)
    { moveVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Insert and mount a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function insert(root, nextTag, isVirtual) {
  if (isVirtual)
    { makeVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Append a new tag into the DOM
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function append(root, isVirtual) {
  if (isVirtual)
    { makeVirtual.call(this, root); }
  else
    { root.appendChild(this.root); }
}

/**
 * Manage tags having the 'each'
 * @param   { HTMLElement } dom - DOM node we need to loop
 * @param   { Tag } parent - parent tag instance where the dom node is contained
 * @param   { String } expr - string contained in the 'each' attribute
 * @returns { Object } expression object for this each loop
 */
function _each(dom, parent, expr) {

  // remove the each property from the original tag
  remAttr(dom, LOOP_DIRECTIVE);

  var mustReorder = typeof getAttr(dom, LOOP_NO_REORDER_DIRECTIVE) !== T_STRING || remAttr(dom, LOOP_NO_REORDER_DIRECTIVE),
    tagName = getTagName(dom),
    impl = __TAG_IMPL[tagName],
    parentNode = dom.parentNode,
    placeholder = createDOMPlaceholder(),
    child = getTag(dom),
    ifExpr = getAttr(dom, CONDITIONAL_DIRECTIVE),
    tags = [],
    oldItems = [],
    hasKeys,
    isLoop = true,
    isAnonymous = !__TAG_IMPL[tagName],
    isVirtual = dom.tagName === 'VIRTUAL';

  // parse the each expression
  expr = tmpl.loopKeys(expr);
  expr.isLoop = true;

  if (ifExpr) { remAttr(dom, CONDITIONAL_DIRECTIVE); }

  // insert a marked where the loop tags will be injected
  parentNode.insertBefore(placeholder, dom);
  parentNode.removeChild(dom);

  expr.update = function updateEach() {
    // get the new items collection
    expr.value = tmpl(expr.val, parent);

    var frag = createFrag(),
      items = expr.value,
      isObject$$1 = !isArray(items) && !isString(items),
      root = placeholder.parentNode;

    // if this DOM was removed the update here is useless
    // this condition fixes also a weird async issue on IE in our unit test
    if (!root) { return }

    // object loop. any changes cause full redraw
    if (isObject$$1) {
      hasKeys = items || false;
      items = hasKeys ?
        Object.keys(items).map(function (key) {
          return mkitem(expr, items[key], key)
        }) : [];
    } else {
      hasKeys = false;
    }

    if (ifExpr) {
      items = items.filter(function(item, i) {
        if (expr.key && !isObject$$1)
          { return !!tmpl(ifExpr, mkitem(expr, item, i, parent)) }

        return !!tmpl(ifExpr, extend(Object.create(parent), item))
      });
    }

    // loop all the new items
    each(items, function(item, i) {
      // reorder only if the items are objects
      var
        doReorder = mustReorder && typeof item === T_OBJECT && !hasKeys,
        oldPos = oldItems.indexOf(item),
        isNew = oldPos === -1,
        pos = !isNew && doReorder ? oldPos : i,
        // does a tag exist in this position?
        tag = tags[pos],
        mustAppend = i >= oldItems.length,
        mustCreate =  doReorder && isNew || !doReorder && !tag;

      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

      // new tag
      if (mustCreate) {
        tag = new Tag$1(impl, {
          parent: parent,
          isLoop: isLoop,
          isAnonymous: isAnonymous,
          tagName: tagName,
          root: dom.cloneNode(isAnonymous),
          item: item,
          index: i,
        }, dom.innerHTML);

        // mount the tag
        tag.mount();

        if (mustAppend)
          { append.apply(tag, [frag || root, isVirtual]); }
        else
          { insert.apply(tag, [root, tags[i], isVirtual]); }

        if (!mustAppend) { oldItems.splice(i, 0, item); }
        tags.splice(i, 0, tag);
        if (child) { arrayishAdd(parent.tags, tagName, tag, true); }
      } else if (pos !== i && doReorder) {
        // move
        if (contains(items, oldItems[pos])) {
          move.apply(tag, [root, tags[i], isVirtual]);
          // move the old tag instance
          tags.splice(i, 0, tags.splice(pos, 1)[0]);
          // move the old item
          oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
        }

        // update the position attribute if it exists
        if (expr.pos) { tag[expr.pos] = i; }

        // if the loop tags are not custom
        // we need to move all their custom tags into the right position
        if (!child && tag.tags) { moveNestedTags.call(tag, i); }
      }

      // cache the original item to use it in the events bound to this node
      // and its children
      tag.__.item = item;
      tag.__.index = i;
      tag.__.parent = parent;

      if (!mustCreate) { tag.update(item); }
    });

    // remove the redundant tags
    unmountRedundant(items, tags);

    // clone the items array
    oldItems = items.slice();

    // this condition is weird u
    root.insertBefore(frag, placeholder);
  };

  expr.unmount = function() {
    each(tags, function(t) { t.unmount(); });
  };

  return expr
}

/**
 * Walk the tag DOM to detect the expressions to evaluate
 * @this Tag
 * @param   { HTMLElement } root - root tag where we will start digging the expressions
 * @param   { Array } expressions - empty array where the expressions will be added
 * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
 * @returns { Object } an object containing the root noode and the dom tree
 */
function parseExpressions(root, expressions, mustIncludeRoot) {
  var this$1 = this;

  var tree = {parent: {children: expressions}};

  walkNodes(root, function (dom, ctx) {
    var type = dom.nodeType, parent = ctx.parent, attr, expr, tagImpl;
    if (!mustIncludeRoot && dom === root) { return {parent: parent} }

    // text node
    if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue))
      { parent.children.push({dom: dom, expr: dom.nodeValue}); }

    if (type !== 1) { return ctx } // not an element

    var isVirtual = dom.tagName === 'VIRTUAL';

    // loop. each does it's own thing (for now)
    if (attr = getAttr(dom, LOOP_DIRECTIVE)) {
      if(isVirtual) { setAttr(dom, 'loopVirtual', true); } // ignore here, handled in _each
      parent.children.push(_each(dom, this$1, attr));
      return false
    }

    // if-attrs become the new parent. Any following expressions (either on the current
    // element, or below it) become children of this expression.
    if (attr = getAttr(dom, CONDITIONAL_DIRECTIVE)) {
      parent.children.push(Object.create(IfExpr).init(dom, this$1, attr));
      return false
    }

    if (expr = getAttr(dom, IS_DIRECTIVE)) {
      if (tmpl.hasExpr(expr)) {
        parent.children.push({isRtag: true, expr: expr, dom: dom, attrs: [].slice.call(dom.attributes)});
        return false
      }
    }

    // if this is a tag, stop traversing here.
    // we ignore the root, since parseExpressions is called while we're mounting that root
    tagImpl = getTag(dom);
    if(isVirtual) {
      if(getAttr(dom, 'virtualized')) {dom.parentElement.removeChild(dom); } // tag created, remove from dom
      if(!tagImpl && !getAttr(dom, 'virtualized') && !getAttr(dom, 'loopVirtual'))  // ok to create virtual tag
        { tagImpl = { tmpl: dom.outerHTML }; }
    }

    if (tagImpl && (dom !== root || mustIncludeRoot)) {
      if(isVirtual && !getAttr(dom, IS_DIRECTIVE)) { // handled in update
        // can not remove attribute like directives
        // so flag for removal after creation to prevent maximum stack error
        setAttr(dom, 'virtualized', true);

        var tag = new Tag$1({ tmpl: dom.outerHTML },
          {root: dom, parent: this$1},
          dom.innerHTML);
        parent.children.push(tag); // no return, anonymous tag, keep parsing
      } else {
        var conf = {root: dom, parent: this$1, hasImpl: true};
        parent.children.push(initChildTag(tagImpl, conf, dom.innerHTML, this$1));
        return false
      }
    }

    // attribute expressions
    parseAttributes.apply(this$1, [dom, dom.attributes, function(attr, expr) {
      if (!expr) { return }
      parent.children.push(expr);
    }]);

    // whatever the parent is, all child elements get the same parent.
    // If this element had an if-attr, that's the parent for all child elements
    return {parent: parent}
  }, tree);
}

/**
 * Calls `fn` for every attribute on an element. If that attr has an expression,
 * it is also passed to fn.
 * @this Tag
 * @param   { HTMLElement } dom - dom node to parse
 * @param   { Array } attrs - array of attributes
 * @param   { Function } fn - callback to exec on any iteration
 */
function parseAttributes(dom, attrs, fn) {
  var this$1 = this;

  each(attrs, function (attr) {
    if (!attr) { return false }

    var name = attr.name, bool = isBoolAttr(name), expr;

    if (contains(REF_DIRECTIVES, name)) {
      expr =  Object.create(RefExpr).init(dom, this$1, name, attr.value);
    } else if (tmpl.hasExpr(attr.value)) {
      expr = {dom: dom, expr: attr.value, attr: name, bool: bool};
    }

    fn(attr, expr);
  });
}

/*
  Includes hacks needed for the Internet Explorer version 9 and below
  See: http://kangax.github.io/compat-table/es5/#ie8
       http://codeplanet.io/dropping-ie8/
*/

var reHasYield  = /<yield\b/i;
var reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig;
var reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig;
var reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' };
var tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION;
var GENERIC = 'div';
var SVG = 'svg';


/*
  Creates the root element for table or select child elements:
  tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
*/
function specialTags(el, tmpl, tagName) {

  var
    select = tagName[0] === 'o',
    parent = select ? 'select>' : 'table>';

  // trim() is important here, this ensures we don't have artifacts,
  // so we can check if we have only one element inside the parent
  el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
  parent = el.firstChild;

  // returns the immediate parent if tr/th/td/col is the only element, if not
  // returns the whole tree, as this can include additional elements
  /* istanbul ignore next */
  if (select) {
    parent.selectedIndex = -1;  // for IE9, compatible w/current riot behavior
  } else {
    // avoids insertion of cointainer inside container (ex: tbody inside tbody)
    var tname = rootEls[tagName];
    if (tname && parent.childElementCount === 1) { parent = $(tname, parent); }
  }
  return parent
}

/*
  Replace the yield tag from any tag template with the innerHTML of the
  original tag in the page
*/
function replaceYield(tmpl, html) {
  // do nothing if no yield
  if (!reHasYield.test(tmpl)) { return tmpl }

  // be careful with #1343 - string on the source having `$1`
  var src = {};

  html = html && html.replace(reYieldSrc, function (_, ref, text) {
    src[ref] = src[ref] || text;   // preserve first definition
    return ''
  }).trim();

  return tmpl
    .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
      return src[ref] || def || ''
    })
    .replace(reYieldAll, function (_, def) {        // yield without any "from"
      return html || def || ''
    })
}

/**
 * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
 * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
 *
 * @param   { String } tmpl  - The template coming from the custom tag definition
 * @param   { String } html - HTML content that comes from the DOM element where you
 *           will mount the tag, mostly the original tag in the page
 * @param   { Boolean } isSvg - true if the root node is an svg
 * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
 */
function mkdom(tmpl, html, isSvg$$1) {
  var match   = tmpl && tmpl.match(/^\s*<([-\w]+)/),
    tagName = match && match[1].toLowerCase(),
    el = mkEl(isSvg$$1 ? SVG : GENERIC);

  // replace all the yield tags with the tag inner html
  tmpl = replaceYield(tmpl, html);

  /* istanbul ignore next */
  if (tblTags.test(tagName))
    { el = specialTags(el, tmpl, tagName); }
  else
    { setInnerHTML(el, tmpl); }

  return el
}

/**
 * Another way to create a riot tag a bit more es6 friendly
 * @param { HTMLElement } el - tag DOM selector or DOM node/s
 * @param { Object } opts - tag logic
 * @returns { Tag } new riot tag instance
 */
function Tag$2(el, opts) {
  // get the tag properties from the class constructor
  var ref = this;
  var name = ref.name;
  var tmpl = ref.tmpl;
  var css = ref.css;
  var attrs = ref.attrs;
  var onCreate = ref.onCreate;
  // register a new tag and cache the class prototype
  if (!__TAG_IMPL[name]) {
    tag$1(name, tmpl, css, attrs, onCreate);
    // cache the class constructor
    __TAG_IMPL[name].class = this.constructor;
  }

  // mount the tag using the class instance
  mountTo(el, name, opts, this);
  // inject the component css
  if (css) { styleManager.inject(); }

  return this
}

/**
 * Create a new riot tag implementation
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag$1(name, tmpl, css, attrs, fn) {
  if (isFunction(attrs)) {
    fn = attrs;

    if (/^[\w\-]+\s?=/.test(css)) {
      attrs = css;
      css = '';
    } else
      { attrs = ''; }
  }

  if (css) {
    if (isFunction(css))
      { fn = css; }
    else
      { styleManager.add(css); }
  }

  name = name.toLowerCase();
  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name
}

/**
 * Create a new riot tag implementation (for use by the compiler)
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag2$1(name, tmpl, css, attrs, fn) {
  if (css) { styleManager.add(css, name); }

  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name
}

/**
 * Mount a tag using a specific tag implementation
 * @param   { * } selector - tag DOM selector or DOM node/s
 * @param   { String } tagName - tag implementation name
 * @param   { Object } opts - tag logic
 * @returns { Array } new tags instances
 */
function mount$1(selector, tagName, opts) {
  var tags = [];
  var elem, allTags;

  function pushTagsTo(root) {
    if (root.tagName) {
      var riotTag = getAttr(root, IS_DIRECTIVE), tag;

      // have tagName? force riot-tag to be the same
      if (tagName && riotTag !== tagName) {
        riotTag = tagName;
        setAttr(root, IS_DIRECTIVE, tagName);
      }

      tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

      if (tag)
        { tags.push(tag); }
    } else if (root.length)
      { each(root, pushTagsTo); } // assume nodeList
  }

  // inject styles into DOM
  styleManager.inject();

  if (isObject(tagName)) {
    opts = tagName;
    tagName = 0;
  }

  // crawl the DOM to find the tag
  if (isString(selector)) {
    selector = selector === '*' ?
      // select all registered tags
      // & tags found with the riot-tag attribute set
      allTags = selectTags() :
      // or just the ones named like the selector
      selector + selectTags(selector.split(/, */));

    // make sure to pass always a selector
    // to the querySelectorAll function
    elem = selector ? $$(selector) : [];
  }
  else
    // probably you have passed already a tag or a NodeList
    { elem = selector; }

  // select all the registered and mount them inside their root elements
  if (tagName === '*') {
    // get all custom tags
    tagName = allTags || selectTags();
    // if the root els it's just a single tag
    if (elem.tagName)
      { elem = $$(tagName, elem); }
    else {
      // select all the children for all the different root elements
      var nodeList = [];

      each(elem, function (_el) { return nodeList.push($$(tagName, _el)); });

      elem = nodeList;
    }
    // get rid of the tagName
    tagName = 0;
  }

  pushTagsTo(elem);

  return tags
}

// Create a mixin that could be globally shared across all the tags
var mixins = {};
var globals = mixins[GLOBAL_MIXIN] = {};
var mixins_id = 0;

/**
 * Create/Return a mixin by its name
 * @param   { String }  name - mixin name (global mixin if object)
 * @param   { Object }  mix - mixin logic
 * @param   { Boolean } g - is global?
 * @returns { Object }  the mixin logic
 */
function mixin$1(name, mix, g) {
  // Unnamed global
  if (isObject(name)) {
    mixin$1(("__" + (mixins_id++) + "__"), name, true);
    return
  }

  var store = g ? globals : mixins;

  // Getter
  if (!mix) {
    if (isUndefined(store[name]))
      { throw new Error(("Unregistered mixin: " + name)) }

    return store[name]
  }

  // Setter
  store[name] = isFunction(mix) ?
    extend(mix.prototype, store[name] || {}) && mix :
    extend(store[name] || {}, mix);
}

/**
 * Update all the tags instances created
 * @returns { Array } all the tags instances
 */
function update$1() {
  return each(__TAGS_CACHE, function (tag) { return tag.update(); })
}

function unregister$1(name) {
  __TAG_IMPL[name] = null;
}

var version$1 = 'v3.5.1';


var core = Object.freeze({
	Tag: Tag$2,
	tag: tag$1,
	tag2: tag2$1,
	mount: mount$1,
	mixin: mixin$1,
	update: update$1,
	unregister: unregister$1,
	version: version$1
});

// counter to give a unique id to all the Tag instances
var __uid = 0;

/**
 * We need to update opts for this tag. That requires updating the expressions
 * in any attributes on the tag, and then copying the result onto opts.
 * @this Tag
 * @param   {Boolean} isLoop - is it a loop tag?
 * @param   { Tag }  parent - parent tag node
 * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
 * @param   { Object }  opts - tag options
 * @param   { Array }  instAttrs - tag attributes array
 */
function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
  // isAnonymous `each` tags treat `dom` and `root` differently. In this case
  // (and only this case) we don't need to do updateOpts, because the regular parse
  // will update those attrs. Plus, isAnonymous tags don't need opts anyway
  if (isLoop && isAnonymous) { return }

  var ctx = !isAnonymous && isLoop ? this : parent || this;
  each(instAttrs, function (attr) {
    if (attr.expr) { updateAllExpressions.call(ctx, [attr.expr]); }
    // normalize the attribute names
    opts[toCamel(attr.name).replace(ATTRS_PREFIX, '')] = attr.expr ? attr.expr.value : attr.value;
  });
}


/**
 * Tag class
 * @constructor
 * @param { Object } impl - it contains the tag template, and logic
 * @param { Object } conf - tag options
 * @param { String } innerHTML - html that eventually we need to inject in the tag
 */
function Tag$1(impl, conf, innerHTML) {
  if ( impl === void 0 ) impl = {};
  if ( conf === void 0 ) conf = {};

  var opts = extend({}, conf.opts),
    parent = conf.parent,
    isLoop = conf.isLoop,
    isAnonymous = !!conf.isAnonymous,
    skipAnonymous = settings$1.skipAnonymousTags && isAnonymous,
    item = cleanUpData(conf.item),
    index = conf.index, // available only for the looped nodes
    instAttrs = [], // All attributes on the Tag when it's first parsed
    implAttrs = [], // expressions on this type of Tag
    expressions = [],
    root = conf.root,
    tagName = conf.tagName || getTagName(root),
    isVirtual = tagName === 'virtual',
    isInline = !isVirtual && !impl.tmpl,
    propsInSyncWithParent = [],
    dom;

  // make this tag observable
  if (!skipAnonymous) { observable$1(this); }
  // only call unmount if we have a valid __TAG_IMPL (has name property)
  if (impl.name && root._tag) { root._tag.unmount(true); }

  // not yet mounted
  this.isMounted = false;

  defineProperty(this, '__', {
    isAnonymous: isAnonymous,
    instAttrs: instAttrs,
    innerHTML: innerHTML,
    tagName: tagName,
    index: index,
    isLoop: isLoop,
    isInline: isInline,
    // tags having event listeners
    // it would be better to use weak maps here but we can not introduce breaking changes now
    listeners: [],
    // these vars will be needed only for the virtual tags
    virts: [],
    tail: null,
    head: null,
    parent: null,
    item: null
  });

  // create a unique id to this tag
  // it could be handy to use it also to improve the virtual dom rendering speed
  defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id
  defineProperty(this, 'root', root);
  extend(this, { opts: opts }, item);
  // protect the "tags" and "refs" property from being overridden
  defineProperty(this, 'parent', parent || null);
  defineProperty(this, 'tags', {});
  defineProperty(this, 'refs', {});

  if (isInline || isLoop && isAnonymous) {
    dom = root;
  } else {
    if (!isVirtual) { root.innerHTML = ''; }
    dom = mkdom(impl.tmpl, innerHTML, isSvg(root));
  }

  /**
   * Update the tag expressions and options
   * @param   { * }  data - data we want to use to extend the tag properties
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'update', function tagUpdate(data) {
    var nextOpts = {},
      canTrigger = this.isMounted && !skipAnonymous;

    // make sure the data passed will not override
    // the component core methods
    data = cleanUpData(data);
    extend(this, data);
    updateOpts.apply(this, [isLoop, parent, isAnonymous, nextOpts, instAttrs]);

    if (canTrigger && this.isMounted && isFunction(this.shouldUpdate) && !this.shouldUpdate(data, nextOpts)) {
      return this
    }

    // inherit properties from the parent, but only for isAnonymous tags
    if (isLoop && isAnonymous) { inheritFrom.apply(this, [this.parent, propsInSyncWithParent]); }
    extend(opts, nextOpts);
    if (canTrigger) { this.trigger('update', data); }
    updateAllExpressions.call(this, expressions);
    if (canTrigger) { this.trigger('updated'); }

    return this

  }.bind(this));

  /**
   * Add a mixin to this tag
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mixin', function tagMixin() {
    var this$1 = this;

    each(arguments, function (mix) {
      var instance, obj;
      var props = [];

      // properties blacklisted and will not be bound to the tag instance
      var propsBlacklist = ['init', '__proto__'];

      mix = isString(mix) ? mixin$1(mix) : mix;

      // check if the mixin is a function
      if (isFunction(mix)) {
        // create the new mixin instance
        instance = new mix();
      } else { instance = mix; }

      var proto = Object.getPrototypeOf(instance);

      // build multilevel prototype inheritance chain property list
      do { props = props.concat(Object.getOwnPropertyNames(obj || instance)); }
      while (obj = Object.getPrototypeOf(obj || instance))

      // loop the keys in the function prototype or the all object keys
      each(props, function (key) {
        // bind methods to this
        // allow mixins to override other properties/parent mixins
        if (!contains(propsBlacklist, key)) {
          // check for getters/setters
          var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key);
          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);

          // apply method only if it does not already exist on the instance
          if (!this$1.hasOwnProperty(key) && hasGetterSetter) {
            Object.defineProperty(this$1, key, descriptor);
          } else {
            this$1[key] = isFunction(instance[key]) ?
              instance[key].bind(this$1) :
              instance[key];
          }
        }
      });

      // init method will be called automatically
      if (instance.init)
        { instance.init.bind(this$1)(); }
    });
    return this
  }.bind(this));

  /**
   * Mount the current tag instance
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mount', function tagMount() {
    var this$1 = this;

    root._tag = this; // keep a reference to the tag just created

    // Read all the attrs on this instance. This give us the info we need for updateOpts
    parseAttributes.apply(parent, [root, root.attributes, function (attr, expr) {
      if (!isAnonymous && RefExpr.isPrototypeOf(expr)) { expr.tag = this$1; }
      attr.expr = expr;
      instAttrs.push(attr);
    }]);

    // update the root adding custom attributes coming from the compiler
    implAttrs = [];
    walkAttrs(impl.attrs, function (k, v) { implAttrs.push({name: k, value: v}); });
    parseAttributes.apply(this, [root, implAttrs, function (attr, expr) {
      if (expr) { expressions.push(expr); }
      else { setAttr(root, attr.name, attr.value); }
    }]);

    // initialiation
    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);

    // add global mixins
    var globalMixin = mixin$1(GLOBAL_MIXIN);

    if (globalMixin && !skipAnonymous) {
      for (var i in globalMixin) {
        if (globalMixin.hasOwnProperty(i)) {
          this$1.mixin(globalMixin[i]);
        }
      }
    }

    if (impl.fn) { impl.fn.call(this, opts); }

    if (!skipAnonymous) { this.trigger('before-mount'); }

    // parse layout after init. fn may calculate args for nested custom tags
    parseExpressions.apply(this, [dom, expressions, isAnonymous]);

    this.update(item);

    if (!isAnonymous && !isInline) {
      while (dom.firstChild) { root.appendChild(dom.firstChild); }
    }

    defineProperty(this, 'root', root);
    defineProperty(this, 'isMounted', true);

    if (skipAnonymous) { return }

    // if it's not a child tag we can trigger its mount event
    if (!this.parent) {
      this.trigger('mount');
    }
    // otherwise we need to wait that the parent "mount" or "updated" event gets triggered
    else {
      var p = getImmediateCustomParentTag(this.parent);
      p.one(!p.isMounted ? 'mount' : 'updated', function () {
        this$1.trigger('mount');
      });
    }

    return this

  }.bind(this));

  /**
   * Unmount the tag instance
   * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'unmount', function tagUnmount(mustKeepRoot) {
    var this$1 = this;

    var el = this.root,
      p = el.parentNode,
      ptag,
      tagIndex = __TAGS_CACHE.indexOf(this);

    if (!skipAnonymous) { this.trigger('before-unmount'); }

    // clear all attributes coming from the mounted tag
    walkAttrs(impl.attrs, function (name) {
      if (startsWith(name, ATTRS_PREFIX))
        { name = name.slice(ATTRS_PREFIX.length); }

      remAttr(root, name);
    });

    // remove all the event listeners
    this.__.listeners.forEach(function (dom) {
      Object.keys(dom[RIOT_EVENTS_KEY]).forEach(function (eventName) {
        dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][eventName]);
      });
    });

    // remove this tag instance from the global virtualDom variable
    if (tagIndex !== -1)
      { __TAGS_CACHE.splice(tagIndex, 1); }

    if (p || isVirtual) {
      if (parent) {
        ptag = getImmediateCustomParentTag(parent);

        if (isVirtual) {
          Object.keys(this.tags).forEach(function (tagName) {
            arrayishRemove(ptag.tags, tagName, this$1.tags[tagName]);
          });
        } else {
          arrayishRemove(ptag.tags, tagName, this);
          // remove from _parent too
          if(parent !== ptag) {
            arrayishRemove(parent.tags, tagName, this);
          }
        }
      } else {
        // remove the tag contents
        setInnerHTML(el, '');
      }

      if (p && !mustKeepRoot) { p.removeChild(el); }
    }

    if (this.__.virts) {
      each(this.__.virts, function (v) {
        if (v.parentNode) { v.parentNode.removeChild(v); }
      });
    }

    // allow expressions to unmount themselves
    unmountAll(expressions);
    each(instAttrs, function (a) { return a.expr && a.expr.unmount && a.expr.unmount(); });

    // custom internal unmount function to avoid relying on the observable
    if (this.__.onUnmount) { this.__.onUnmount(); }

    if (!skipAnonymous) {
      this.trigger('unmount');
      this.off('*');
    }

    defineProperty(this, 'isMounted', false);

    delete this.root._tag;

    return this

  }.bind(this));
}

/**
 * Detect the tag implementation by a DOM node
 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
 */
function getTag(dom) {
  return dom.tagName && __TAG_IMPL[getAttr(dom, IS_DIRECTIVE) ||
    getAttr(dom, IS_DIRECTIVE) || dom.tagName.toLowerCase()]
}

/**
 * Inherit properties from a target tag instance
 * @this Tag
 * @param   { Tag } target - tag where we will inherit properties
 * @param   { Array } propsInSyncWithParent - array of properties to sync with the target
 */
function inheritFrom(target, propsInSyncWithParent) {
  var this$1 = this;

  each(Object.keys(target), function (k) {
    // some properties must be always in sync with the parent tag
    var mustSync = !isReservedName(k) && contains(propsInSyncWithParent, k);

    if (isUndefined(this$1[k]) || mustSync) {
      // track the property to keep in sync
      // so we can keep it updated
      if (!mustSync) { propsInSyncWithParent.push(k); }
      this$1[k] = target[k];
    }
  });
}

/**
 * Move the position of a custom tag in its parent tag
 * @this Tag
 * @param   { String } tagName - key where the tag was stored
 * @param   { Number } newPos - index where the new tag will be stored
 */
function moveChildTag(tagName, newPos) {
  var parent = this.parent,
    tags;
  // no parent no move
  if (!parent) { return }

  tags = parent.tags[tagName];

  if (isArray(tags))
    { tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]); }
  else { arrayishAdd(parent.tags, tagName, this); }
}

/**
 * Create a new child tag including it correctly into its parent
 * @param   { Object } child - child tag implementation
 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
 * @param   { String } innerHTML - inner html of the child node
 * @param   { Object } parent - instance of the parent tag including the child custom tag
 * @returns { Object } instance of the new child tag just created
 */
function initChildTag(child, opts, innerHTML, parent) {
  var tag = new Tag$1(child, opts, innerHTML),
    tagName = opts.tagName || getTagName(opts.root, true),
    ptag = getImmediateCustomParentTag(parent);
  // fix for the parent attribute in the looped elements
  defineProperty(tag, 'parent', ptag);
  // store the real parent tag
  // in some cases this could be different from the custom parent tag
  // for example in nested loops
  tag.__.parent = parent;

  // add this tag to the custom parent tag
  arrayishAdd(ptag.tags, tagName, tag);

  // and also to the real parent tag
  if (ptag !== parent)
    { arrayishAdd(parent.tags, tagName, tag); }

  return tag
}

/**
 * Loop backward all the parents tree to detect the first custom parent tag
 * @param   { Object } tag - a Tag instance
 * @returns { Object } the instance of the first custom parent tag found
 */
function getImmediateCustomParentTag(tag) {
  var ptag = tag;
  while (ptag.__.isAnonymous) {
    if (!ptag.parent) { break }
    ptag = ptag.parent;
  }
  return ptag
}

/**
 * Trigger the unmount method on all the expressions
 * @param   { Array } expressions - DOM expressions
 */
function unmountAll(expressions) {
  each(expressions, function(expr) {
    if (expr instanceof Tag$1) { expr.unmount(true); }
    else if (expr.tagName) { expr.tag.unmount(true); }
    else if (expr.unmount) { expr.unmount(); }
  });
}

/**
 * Get the tag name of any DOM node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
 * @returns { String } name to identify this dom node in riot
 */
function getTagName(dom, skipDataIs) {
  var child = getTag(dom),
    namedTag = !skipDataIs && getAttr(dom, IS_DIRECTIVE);
  return namedTag && !tmpl.hasExpr(namedTag) ?
                namedTag :
              child ? child.name : dom.tagName.toLowerCase()
}

/**
 * With this function we avoid that the internal Tag methods get overridden
 * @param   { Object } data - options we want to use to extend the tag instance
 * @returns { Object } clean object without containing the riot internal reserved words
 */
function cleanUpData(data) {
  if (!(data instanceof Tag$1) && !(data && isFunction(data.trigger)))
    { return data }

  var o = {};
  for (var key in data) {
    if (!RE_RESERVED_NAMES.test(key)) { o[key] = data[key]; }
  }
  return o
}

/**
 * Set the property of an object for a given key. If something already
 * exists there, then it becomes an array containing both the old and new value.
 * @param { Object } obj - object on which to set the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be set
 * @param { Boolean } ensureArray - ensure that the property remains an array
 * @param { Number } index - add the new item in a certain array position
 */
function arrayishAdd(obj, key, value, ensureArray, index) {
  var dest = obj[key];
  var isArr = isArray(dest);
  var hasIndex = !isUndefined(index);

  if (dest && dest === value) { return }

  // if the key was never set, set it once
  if (!dest && ensureArray) { obj[key] = [value]; }
  else if (!dest) { obj[key] = value; }
  // if it was an array and not yet set
  else {
    if (isArr) {
      var oldIndex = dest.indexOf(value);
      // this item never changed its position
      if (oldIndex === index) { return }
      // remove the item from its old position
      if (oldIndex !== -1) { dest.splice(oldIndex, 1); }
      // move or add the item
      if (hasIndex) {
        dest.splice(index, 0, value);
      } else {
        dest.push(value);
      }
    } else { obj[key] = [dest, value]; }
  }
}

/**
 * Removes an item from an object at a given key. If the key points to an array,
 * then the item is just removed from the array.
 * @param { Object } obj - object on which to remove the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be removed
 * @param { Boolean } ensureArray - ensure that the property remains an array
*/
function arrayishRemove(obj, key, value, ensureArray) {
  if (isArray(obj[key])) {
    var index = obj[key].indexOf(value);
    if (index !== -1) { obj[key].splice(index, 1); }
    if (!obj[key].length) { delete obj[key]; }
    else if (obj[key].length === 1 && !ensureArray) { obj[key] = obj[key][0]; }
  } else
    { delete obj[key]; } // otherwise just delete the key
}

/**
 * Mount a tag creating new Tag instance
 * @param   { Object } root - dom node where the tag will be mounted
 * @param   { String } tagName - name of the riot tag we want to mount
 * @param   { Object } opts - options to pass to the Tag instance
 * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
 * @returns { Tag } a new Tag instance
 */
function mountTo(root, tagName, opts, ctx) {
  var impl = __TAG_IMPL[tagName],
    implClass = __TAG_IMPL[tagName].class,
    tag = ctx || (implClass ? Object.create(implClass.prototype) : {}),
    // cache the inner HTML to fix #855
    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

  var conf = extend({ root: root, opts: opts }, { parent: opts ? opts.parent : null });

  if (impl && root) { Tag$1.apply(tag, [impl, conf, innerHTML]); }

  if (tag && tag.mount) {
    tag.mount(true);
    // add this tag to the virtualDom variable
    if (!contains(__TAGS_CACHE, tag)) { __TAGS_CACHE.push(tag); }
  }

  return tag
}

/**
 * makes a tag virtual and replaces a reference in the dom
 * @this Tag
 * @param { tag } the tag to make virtual
 * @param { ref } the dom reference location
 */
function makeReplaceVirtual(tag, ref) {
  var frag = createFrag();
  makeVirtual.call(tag, frag);
  ref.parentNode.replaceChild(frag, ref);
}

/**
 * Adds the elements for a virtual tag
 * @this Tag
 * @param { Node } src - the node that will do the inserting or appending
 * @param { Tag } target - only if inserting, insert before this tag's first child
 */
function makeVirtual(src, target) {
  var this$1 = this;

  var head = createDOMPlaceholder(),
    tail = createDOMPlaceholder(),
    frag = createFrag(),
    sib, el;

  this.root.insertBefore(head, this.root.firstChild);
  this.root.appendChild(tail);

  this.__.head = el = head;
  this.__.tail = tail;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    this$1.__.virts.push(el); // hold for unmounting
    el = sib;
  }

  if (target)
    { src.insertBefore(frag, target.__.head); }
  else
    { src.appendChild(frag); }
}

/**
 * Move virtual tag and all child nodes
 * @this Tag
 * @param { Node } src  - the node that will do the inserting
 * @param { Tag } target - insert before this tag's first child
 */
function moveVirtual(src, target) {
  var this$1 = this;

  var el = this.__.head,
    frag = createFrag(),
    sib;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    el = sib;
    if (el === this$1.__.tail) {
      frag.appendChild(el);
      src.insertBefore(frag, target.__.head);
      break
    }
  }
}

/**
 * Get selectors for tags
 * @param   { Array } tags - tag names to select
 * @returns { String } selector
 */
function selectTags(tags) {
  // select all tags
  if (!tags) {
    var keys = Object.keys(__TAG_IMPL);
    return keys + selectTags(keys)
  }

  return tags
    .filter(function (t) { return !/[^-\w]/.test(t); })
    .reduce(function (list, t) {
      var name = t.trim().toLowerCase();
      return list + ",[" + IS_DIRECTIVE + "=\"" + name + "\"]"
    }, '')
}


var tags = Object.freeze({
	getTag: getTag,
	inheritFrom: inheritFrom,
	moveChildTag: moveChildTag,
	initChildTag: initChildTag,
	getImmediateCustomParentTag: getImmediateCustomParentTag,
	unmountAll: unmountAll,
	getTagName: getTagName,
	cleanUpData: cleanUpData,
	arrayishAdd: arrayishAdd,
	arrayishRemove: arrayishRemove,
	mountTo: mountTo,
	makeReplaceVirtual: makeReplaceVirtual,
	makeVirtual: makeVirtual,
	moveVirtual: moveVirtual,
	selectTags: selectTags
});

/**
 * Riot public api
 */
var settings = settings$1;
var util = {
  tmpl: tmpl,
  brackets: brackets,
  styleManager: styleManager,
  vdom: __TAGS_CACHE,
  styleNode: styleManager.styleNode,
  // export the riot internal utils as well
  dom: dom,
  check: check,
  misc: misc,
  tags: tags
};

// export the core props/methods
var Tag$$1 = Tag$2;
var tag$$1 = tag$1;
var tag2$$1 = tag2$1;
var mount$$1 = mount$1;
var mixin$$1 = mixin$1;
var update$$1 = update$1;
var unregister$$1 = unregister$1;
var version$$1 = version$1;
var observable = observable$1;

var riot$1 = extend({}, core, {
  observable: observable$1,
  settings: settings,
  util: util,
});

exports.settings = settings;
exports.util = util;
exports.Tag = Tag$$1;
exports.tag = tag$$1;
exports.tag2 = tag2$$1;
exports.mount = mount$$1;
exports.mixin = mixin$$1;
exports.update = update$$1;
exports.unregister = unregister$$1;
exports.version = version$$1;
exports.observable = observable;
exports['default'] = riot$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvTG9jYWwvWWFybi9jb25maWcvZ2xvYmFsL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvYXBwLmpzIiwiY2xpZW50L21vZHVsZXMvY21zLnRhZyIsImNsaWVudC9tb2R1bGVzL3VpL2J1dHRvbi50YWciLCJjbGllbnQvbW9kdWxlcy91aS9ncmlkLnRhZyIsImNsaWVudC9tb2R1bGVzL3VpL2ljb24udGFnIiwiY2xpZW50L21vZHVsZXMvdWkvaXRlbS50YWciLCJjbGllbnQvbW9kdWxlcy91aS9tZW51LnRhZyIsImNsaWVudC9tb2R1bGVzL3VpL3NlZ21lbnQudGFnIiwiY2xpZW50L21vZHVsZXMvdWkvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9yaW90L3Jpb3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCByaW90ID0gcmVxdWlyZShcInJpb3RcIik7XHJcbi8vY29uc3QgVUlfVEFHUyA9IFtcImJ1dHRvblwiLCBcImdyaWRcIiwgXCJpY29uXCIsIFwiaXRlbVwiLCBcIm1lbnVcIiwgXCJzZWdtZW50XCJdO1xyXG5cclxuLy8gTWFpbiBjb21wb25lbnRzXHJcbnJlcXVpcmUoXCIuL21vZHVsZXMvY21zLnRhZ1wiKTtcclxuXHJcbmNvbnN0IGlzU3RyID0gc3RyID0+IHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCI7XHJcblxyXG4vLyBHZXQgYWxsIHRoZSBVSSBjb21wb25lbnRzXHJcbi8qVUlfVEFHUy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gIHJlcXVpcmUoYC4vbW9kdWxlcy91aS8ke25hbWV9LnRhZ2ApO1xyXG59KTsqL1xyXG5yZXF1aXJlKCcuL21vZHVsZXMvdWkvYnV0dG9uLnRhZycpO3JlcXVpcmUoJy4vbW9kdWxlcy91aS9ncmlkLnRhZycpO3JlcXVpcmUoJy4vbW9kdWxlcy91aS9pY29uLnRhZycpO3JlcXVpcmUoJy4vbW9kdWxlcy91aS9pdGVtLnRhZycpO3JlcXVpcmUoJy4vbW9kdWxlcy91aS9tZW51LnRhZycpO3JlcXVpcmUoJy4vbW9kdWxlcy91aS9zZWdtZW50LnRhZycpO1xyXG5cclxuaWYoIXdpbmRvdy5yaW90KSB7XHJcbiAgd2luZG93LnJpb3QgPSByaW90O1xyXG59IiwidmFyIHJpb3QgPSByZXF1aXJlKCdyaW90Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJpb3QudGFnMignY21zJywgJzxoMz57b3B0cy50aXRsZX0gLSB7b3B0cy5jb3VudH08L2gzPiA8Zm9ybT4gPGlucHV0IHJlZj1cImlucHV0XCIgdHlwZT1cInRleHRcIiBvbmlucHV0PVwie29uSW5wdXR9XCI+IDxoMz5IZWxsbyB7Z3JlZXRpbmd9PC9oMz4gPC9mb3JtPiA8dWktYnV0dG9uIGJhc2ljIGljb249XCJsaW5raWZ5XCI+SGVsbG8gbWF0ZTwvdWktYnV0dG9uPiA8dWktc2VnbWVudD4gPHVpLWJ1dHRvbj5DbGljayBtZTwvdWktYnV0dG9uPiA8L3VpLXNlZ21lbnQ+JywgJ2NtcyB7IG1hcmdpbi1sZWZ0OiAxNnJlbTsgZGlzcGxheTogYmxvY2s7IH0gY21zIGgzLFtkYXRhLWlzPVwiY21zXCJdIGgzeyBjb2xvcjogcmVkOyB9JywgJycsIGZ1bmN0aW9uKG9wdHMpIHtcbiAgICB0aGlzLmdyZWV0aW5nID0gXCJLZWtcIjtcbiAgICB0aGlzLml0ZW1zID0gW1wia2VrXCIsIFwibGVsXCIsIFwibG9sXCIsIFwiaGFsYWxcIiwgXCJ0cmlwcFwiXTtcblxuICAgIHRoaXMub25JbnB1dCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHRoaXMuZ3JlZXRpbmcgPSB0aGlzLnJlZnMuaW5wdXQudmFsdWU7XG4gICAgfS5iaW5kKHRoaXMpXG59KTsiLCJ2YXIgcmlvdCA9IHJlcXVpcmUoJ3Jpb3QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmlvdC50YWcyKCd1aS1idXR0b24nLCAnPHVpLWljb24gaWY9XCJ7aWNvbn1cIiBpY29uPVwie2ljb259XCI+PC91aS1pY29uPiA8eWllbGQ+PC95aWVsZD4nLCAnJywgJ2NsYXNzPVwie2NsYXNzZXN9XCIgdGFiaW5kZXg9XCJ7dGFiaW5kZXh9XCInLCBmdW5jdGlvbihvcHRzKSB7XG4gICAgY29uc3QgeyBpc1N0ciwgY2xhc3NpZnkgfSA9IHJlcXVpcmUoXCIuL3V0aWwuanNcIik7XG4gICAgY29uc3QgeyBpY29uLCBjb2xvciwgc29jaWFsLCBzaXplLCBmbG9hdCwgYXR0YWNoIH0gPSBvcHRzO1xuICAgIGNvbnN0IGNsYXNzZXMgPSB7XG4gICAgICBiYXNpYzogb3B0cy5iYXNpYyxcbiAgICAgIGFuaW1hdGVkOiBvcHRzLmFuaW1hdGVkLFxuICAgICAgYWN0aXZlOiBvcHRzLmFjdGl2ZSxcbiAgICAgIGRpc2FibGVkOiBvcHRzLmRpc2FibGVkLFxuICAgICAgbG9hZGluZzogb3B0cy5sb2FkaW5nLFxuICAgICAgY29tcGFjdDogb3B0cy5jb21wYWN0LFxuICAgICAgdG9nZ2xlOiBvcHRzLnRvZ2dsZSxcbiAgICAgIGZsdWlkOiBvcHRzLmZsdWlkLFxuICAgICAgY2lyY3VsYXI6IG9wdHMuY2lyY3VsYXIsXG4gICAgICBsYWJlbGVkOiBvcHRzLmxhYmVsZWRcbiAgICB9O1xuXG4gICAgY2xhc3Nlc1tzaXplXSA9IHNpemU7XG4gICAgY2xhc3Nlc1tjb2xvcl0gPSBjb2xvcjtcblxuICAgIGlmKGlzU3RyKGljb24pKSB7XG4gICAgICBjbGFzc2VzLmljb24gPSB0cnVlO1xuICAgICAgaWYoaWNvbikge1xuICAgICAgICB0aGlzLmljb24gPSBvcHRzLmljb247XG4gICAgICB9XG4gICAgfSBlbHNlIGlmKGlzU3RyKHNvY2lhbCkpIHtcbiAgICAgIGNsYXNzZXNbc29jaWFsXSA9IHRydWU7XG4gICAgICBpZihzb2NpYWwpIHtcbiAgICAgICAgdGhpcy5pY29uID0gc29jaWFsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKGlzU3RyKGZsb2F0KSkge1xuICAgICAgY2xhc3Nlcy5mbG9hdGVkID0gdHJ1ZTtcbiAgICAgIGlmKGZsb2F0KSB7XG4gICAgICAgIGNsYXNzZXNbZmxvYXRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoaXNTdHIoYXR0YWNoKSkge1xuICAgICAgY2xhc3Nlcy5hdHRhY2hlZCA9IHRydWU7XG4gICAgICBpZihhdHRhY2gpIHtcbiAgICAgICAgY2xhc3Nlc1thdHRhY2hdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNsYXNzZXMgPSBjbGFzc2lmeShjbGFzc2VzLCBcImJ1dHRvblwiKTtcbn0pOyIsInZhciByaW90ID0gcmVxdWlyZSgncmlvdCcpO1xubW9kdWxlLmV4cG9ydHMgPSByaW90LnRhZzIoJ3VpLWdyaWQnLCAnPHVpLWNvbHVtbiBzaXplPVwiMlwiPjwvdWktY29sdW1uPicsICcnLCAnY2xhc3M9XCJ1aSBncmlkIHtjbGFzc2VzfVwiJywgZnVuY3Rpb24ob3B0cykge1xufSk7IiwidmFyIHJpb3QgPSByZXF1aXJlKCdyaW90Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJpb3QudGFnMigndWktaWNvbicsICcnLCAnJywgJ2NsYXNzPVwie29wdHMuaWNvbn0gaWNvblwiJywgZnVuY3Rpb24ob3B0cykge1xufSk7IiwidmFyIHJpb3QgPSByZXF1aXJlKCdyaW90Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJpb3QudGFnMigndWktaXRlbScsICc8dWktaWNvbiBpZj1cIntpY29ufVwiIGljb249XCJ7aWNvbn1cIj48L3VpLWljb24+IDxhIGlmPVwie29wdHMuaHJlZn1cIiBocmVmPVwie29wdHMuaHJlZn1cIj48eWllbGQ+PC95aWVsZD48L2E+IDx5aWVsZCBpZj1cInshb3B0cy5ocmVmfVwiPjwveWllbGQ+JywgJycsICdjbGFzcz1cIntjbGFzc2VzfVwiJywgZnVuY3Rpb24ob3B0cykge1xuICAgIGNvbnN0IHtpY29ufSA9IG9wdHM7XG5cbiAgICBpZihpY29uKSB7XG4gICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgIH1cbn0pOyIsInZhciByaW90ID0gcmVxdWlyZSgncmlvdCcpO1xubW9kdWxlLmV4cG9ydHMgPSByaW90LnRhZzIoJ3VpLW1lbnUnLCAnPHlpZWxkPjwveWllbGQ+JywgJycsICdjbGFzcz1cIntjbGFzc2VzfVwiJywgZnVuY3Rpb24ob3B0cykge1xuICAgIGNvbnN0IHtjbGFzc2lmeSwgZW51bU9mfSA9IHJlcXVpcmUoXCIuL3V0aWwuanNcIik7XG4gICAgY29uc3Qge3NpemUsIHdpZHRoLCBjb2xvciwgcG9zaXRpb259ID0gb3B0cztcbiAgICBjb25zdCBjbGFzc2VzID0ge1xuICAgICAgaWNvbjogb3B0cy5pY29uLFxuICAgICAgbGFiZWxlZDogb3B0cy5sYWJlbGVkLFxuICAgICAgdGV4dDogb3B0cy50ZXh0LFxuICAgICAgYXR0YWNoZWQ6IG9wdHMuYXR0YWNoZWQsXG4gICAgICB2ZXJ0aWNhbDogb3B0cy52ZXJ0aWNhbCxcbiAgICAgIHN0YWNrYWJsZTogb3B0cy5zdGFja2FibGUsXG4gICAgICBpbnZlcnRlZDogb3B0cy5pbnZlcnRlZCxcbiAgICAgIGJvcmRlcmxlc3M6IG9wdHMuYm9yZGVybGVzcyxcbiAgICAgIHBhZ2luYXRpb246IG9wdHMucGFnaW5hdGlvbixcbiAgICAgIGNvbXBhY3Q6IG9wdHMuY29tcGFjdCxcbiAgICAgIHBvaW50aW5nOiBvcHRzLnBvaW50aW5nLFxuICAgICAgdGFidWxhcjogb3B0cy50YWJ1bGFyLFxuICAgICAgZmx1aWQ6IG9wdHMuZmx1aWQsXG4gICAgICBmaXhlZDogb3B0cy5maXhlZFxuICAgIH07XG5cbiAgICBpZihlbnVtT2Yoc2l6ZSwgU0laRVMpKSB7XG5cbiAgICB9XG5cbiAgICBpZihlbnVtT2Yod2lkdGgsIFdJRFRIKSkge1xuICAgICAgY2xhc3Nlc1t3aWR0aF0gPSB0cnVlO1xuICAgICAgY2xhc3Nlcy5pdGVtID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYoc2l6ZSkge1xuICAgICAgY2xhc3Nlc1tzaXplXSA9IHRydWU7XG4gICAgfVxuICAgIGlmKHdpZHRoKSB7XG4gICAgICBjbGFzc2VzW3dpZHRoXSA9IHRydWU7XG4gICAgICBjbGFzc2VzLml0ZW0gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgIGNsYXNzZXNbcG9zaXRpb25dID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICBjbGFzc2VzW2NvbG9yXSA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5jbGFzc2VzID0gY2xhc3NpZnkoY2xhc3NlcywgXCJtZW51XCIpO1xufSk7IiwidmFyIHJpb3QgPSByZXF1aXJlKCdyaW90Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJpb3QudGFnMigndWktc2VnbWVudCcsICc8eWllbGQ+PC95aWVsZD4nLCAnJywgJ2NsYXNzPVwie2NsYXNzZXN9XCInLCBmdW5jdGlvbihvcHRzKSB7XG4gICAgY29uc3QgeyBpc1N0ciB9ID0gcmVxdWlyZShcIi4vdXRpbC5qc1wiKTtcbiAgICBjb25zdCB7Y29sb3IsIGF0dGFjaCwgZmxvYXQsIGFsaWdufSA9IG9wdHM7XG5cbiAgICB0aGlzLmNsYXNzZXMgPSB7XG4gICAgICB1aTogdHJ1ZSxcbiAgICAgIHNlZ21lbnQ6IHRydWUsXG4gICAgICByYWlzZWQ6IGlzU3RyKG9wdHMucmFpc2VkKSxcbiAgICAgIHN0YWNrZWQ6IGlzU3RyKG9wdHMuc3RhY2tlZCksXG4gICAgICBwaWxlZDogaXNTdHIob3B0cy5waWxlZCksXG4gICAgICB2ZXJ0aWNhbDogaXNTdHIob3B0cy52ZXJ0aWNhbCksXG4gICAgICBkaXNhYmxlZDogaXNTdHIob3B0cy5kaXNhYmxlZCksXG4gICAgICBsb2FkaW5nOiBpc1N0cihvcHRzLmxvYWRpbmcpLFxuICAgICAgaW52ZXJ0ZWQ6IGlzU3RyKG9wdHMuaW52ZXJ0ZWQpLFxuICAgICAgcGFkZGVkOiBpc1N0cihvcHRzLnBhZGRlZCksXG4gICAgICBjb21wYWN0OiBpc1N0cihvcHRzLmNvbXBhY3QpLFxuICAgICAgY2lyY3VsYXI6IGlzU3RyKG9wdHMuY2lyY3VsYXIpLFxuICAgICAgY2xlYXJpbmc6IGlzU3RyKG9wdHMuY2xlYXJpbmcpLFxuICAgICAgYmFzaWM6IGlzU3RyKG9wdHMuYmFzaWMpXG4gICAgfTtcblxuICAgIGlmKGNvbG9yKSB7XG4gICAgICB0aGlzLmNsYXNzZXNbY29sb3JdID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYoaXNTdHIoYXR0YWNoKSkge1xuICAgICAgdGhpcy5jbGFzc2VzLmF0dGFjaGVkID0gdHJ1ZTtcbiAgICAgIGlmKGF0dGFjaCkge1xuICAgICAgICB0aGlzLmNsYXNzZXNbYXR0YWNoXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGlzU3RyKGZsb2F0KSkge1xuICAgICAgdGhpcy5jbGFzc2VzLmZsb2F0ZWQgPSB0cnVlO1xuICAgICAgaWYoZmxvYXQpIHtcbiAgICAgICAgdGhpcy5jbGFzc2VzW2Zsb2F0XSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGlzU3RyKGFsaWduKSkge1xuICAgICAgdGhpcy5jbGFzc2VzLmFsaWduZWQgPSB0cnVlO1xuICAgICAgaWYoYWxpZ24pIHtcbiAgICAgICAgdGhpcy5jbGFzc2VzW2FsaWduXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxufSk7IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgV0lEVEg6IFtcclxuICAgIFwib25lXCIsIFwidHdvXCIsIFwidGhyZWVcIiwgXCJmb3VyXCIsIFwiZml2ZVwiLCBcInNpeFwiLCBcInNldmVuXCIsIFwiZWlnaHRcIixcclxuICAgIFwibmluZVwiLCBcInRlblwiLCBcImVsZXZlblwiLCBcInR3ZWx2ZVwiLCBcImZvdXJ0ZWVuXCIsIFwiZmlmdGVlblwiLCBcInNpeHRlZW5cIlxyXG4gIF0sXHJcbiAgU0laRVM6IFtcIm1pbmlcIiwgXCJzbWFsbFwiLCBcImxhcmdlXCIsIFwibWFzc2l2ZVwiXSxcclxuICBBVFRBQ0g6IFtcInRvcFwiLFwiYm90dG9tXCIsXCJsZWZ0XCIsXCJyaWdodFwiXSxcclxuXHJcbiAgaXNTdHIoc3RyKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIjtcclxuICB9LFxyXG4gIGNsYXNzaWZ5KG9iaiwgdHlwZSkge1xyXG4gICAgY29uc3QgY2xhc3NlcyA9IFtcInVpXCJdO1xyXG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcclxuICAgICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSBcIlwiKVxyXG4gICAgICAgIGNsYXNzZXMucHVzaChuYW1lKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmKHR5cGUpIHtcclxuICAgICAgY2xhc3Nlcy5wdXNoKHR5cGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbihcIiBcIik7XHJcbiAgfSxcclxuICBlbnVtT2YodmFsdWUsIGVudW1zKSB7XHJcbiAgICByZXR1cm4gZW51bXMuaW5jbHVkZSh2YWx1ZSk7XHJcbiAgfVxyXG59OyIsIi8qIFJpb3QgdjMuNS4xLCBAbGljZW5zZSBNSVQgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcblx0KGZhY3RvcnkoKGdsb2JhbC5yaW90ID0gZ2xvYmFsLnJpb3QgfHwge30pKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbnZhciBfX1RBR1NfQ0FDSEUgPSBbXTtcbnZhciBfX1RBR19JTVBMID0ge307XG52YXIgR0xPQkFMX01JWElOID0gJ19fZ2xvYmFsX21peGluJztcbnZhciBBVFRSU19QUkVGSVggPSAncmlvdC0nO1xudmFyIFJFRl9ESVJFQ1RJVkVTID0gWydyZWYnLCAnZGF0YS1yZWYnXTtcbnZhciBJU19ESVJFQ1RJVkUgPSAnZGF0YS1pcyc7XG52YXIgQ09ORElUSU9OQUxfRElSRUNUSVZFID0gJ2lmJztcbnZhciBMT09QX0RJUkVDVElWRSA9ICdlYWNoJztcbnZhciBMT09QX05PX1JFT1JERVJfRElSRUNUSVZFID0gJ25vLXJlb3JkZXInO1xudmFyIFNIT1dfRElSRUNUSVZFID0gJ3Nob3cnO1xudmFyIEhJREVfRElSRUNUSVZFID0gJ2hpZGUnO1xudmFyIFJJT1RfRVZFTlRTX0tFWSA9ICdfX3Jpb3QtZXZlbnRzX18nO1xudmFyIFRfU1RSSU5HID0gJ3N0cmluZyc7XG52YXIgVF9PQkpFQ1QgPSAnb2JqZWN0JztcbnZhciBUX1VOREVGICA9ICd1bmRlZmluZWQnO1xudmFyIFRfRlVOQ1RJT04gPSAnZnVuY3Rpb24nO1xudmFyIFhMSU5LX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnO1xudmFyIFNWR19OUyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG52YXIgWExJTktfUkVHRVggPSAvXnhsaW5rOihcXHcrKS87XG52YXIgV0lOID0gdHlwZW9mIHdpbmRvdyA9PT0gVF9VTkRFRiA/IHVuZGVmaW5lZCA6IHdpbmRvdztcbnZhciBSRV9TUEVDSUFMX1RBR1MgPSAvXig/OnQoPzpib2R5fGhlYWR8Zm9vdHxbcmhkXSl8Y2FwdGlvbnxjb2woPzpncm91cCk/fG9wdCg/Omlvbnxncm91cCkpJC87XG52YXIgUkVfU1BFQ0lBTF9UQUdTX05PX09QVElPTiA9IC9eKD86dCg/OmJvZHl8aGVhZHxmb290fFtyaGRdKXxjYXB0aW9ufGNvbCg/Omdyb3VwKT8pJC87XG52YXIgUkVfRVZFTlRTX1BSRUZJWCA9IC9eb24vO1xudmFyIFJFX1JFU0VSVkVEX05BTUVTID0gL14oPzpfKD86aXRlbXxpZHxwYXJlbnQpfHVwZGF0ZXxyb290fCg/OnVuKT9tb3VudHxtaXhpbnxpcyg/Ok1vdW50ZWR8TG9vcCl8dGFnc3xyZWZzfHBhcmVudHxvcHRzfHRyaWdnZXJ8byg/Om58ZmZ8bmUpKSQvO1xudmFyIFJFX0hUTUxfQVRUUlMgPSAvKFstXFx3XSspID89ID8oPzpcIihbXlwiXSopfCcoW14nXSopfCh7W159XSp9KSkvZztcbnZhciBDQVNFX1NFTlNJVElWRV9BVFRSSUJVVEVTID0geyAndmlld2JveCc6ICd2aWV3Qm94JyB9O1xudmFyIFJFX0JPT0xfQVRUUlMgPSAvXig/OmRpc2FibGVkfGNoZWNrZWR8cmVhZG9ubHl8cmVxdWlyZWR8YWxsb3dmdWxsc2NyZWVufGF1dG8oPzpmb2N1c3xwbGF5KXxjb21wYWN0fGNvbnRyb2xzfGRlZmF1bHR8Zm9ybW5vdmFsaWRhdGV8aGlkZGVufGlzbWFwfGl0ZW1zY29wZXxsb29wfG11bHRpcGxlfG11dGVkfG5vKD86cmVzaXplfHNoYWRlfHZhbGlkYXRlfHdyYXApP3xvcGVufHJldmVyc2VkfHNlYW1sZXNzfHNlbGVjdGVkfHNvcnRhYmxlfHRydWVzcGVlZHx0eXBlbXVzdG1hdGNoKSQvO1xudmFyIElFX1ZFUlNJT04gPSAoV0lOICYmIFdJTi5kb2N1bWVudCB8fCB7fSkuZG9jdW1lbnRNb2RlIHwgMDtcblxuLyoqXG4gKiBDaGVjayBDaGVjayBpZiB0aGUgcGFzc2VkIGFyZ3VtZW50IGlzIHVuZGVmaW5lZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQm9vbEF0dHIodmFsdWUpIHtcbiAgcmV0dXJuIFJFX0JPT0xfQVRUUlMudGVzdCh2YWx1ZSlcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSBmdW5jdGlvblxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFRfRlVOQ1RJT05cbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYW4gb2JqZWN0LCBleGNsdWRlIG51bGxcbiAqIE5PVEU6IHVzZSBpc09iamVjdCh4KSAmJiAhaXNBcnJheSh4KSB0byBleGNsdWRlcyBhcnJheXMuXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFRfT0JKRUNUIC8vIHR5cGVvZiBudWxsIGlzICdvYmplY3QnXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIHVuZGVmaW5lZFxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBUX1VOREVGXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEgc3RyaW5nXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFRfU1RSSU5HXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGVtcHR5LiBEaWZmZXJlbnQgZnJvbSBmYWxzeSwgYmVjYXVzZSB3ZSBkb250IGNvbnNpZGVyIDAgb3IgZmFsc2UgdG8gYmUgYmxhbmtcbiAqIEBwYXJhbSB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQmxhbmsodmFsdWUpIHtcbiAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJydcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSBraW5kIG9mIGFycmF5XG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXlcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIG9iamVjdCdzIHByb3BlcnR5IGNvdWxkIGJlIG92ZXJyaWRkZW5cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIG9iaiAtIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gIGtleSAtIG9iamVjdCBwcm9wZXJ0eVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1dyaXRhYmxlKG9iaiwga2V5KSB7XG4gIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gIHJldHVybiBpc1VuZGVmaW5lZChvYmpba2V5XSkgfHwgZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLndyaXRhYmxlXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEgcmVzZXJ2ZWQgbmFtZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzUmVzZXJ2ZWROYW1lKHZhbHVlKSB7XG4gIHJldHVybiBSRV9SRVNFUlZFRF9OQU1FUy50ZXN0KHZhbHVlKVxufVxuXG52YXIgY2hlY2sgPSBPYmplY3QuZnJlZXplKHtcblx0aXNCb29sQXR0cjogaXNCb29sQXR0cixcblx0aXNGdW5jdGlvbjogaXNGdW5jdGlvbixcblx0aXNPYmplY3Q6IGlzT2JqZWN0LFxuXHRpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG5cdGlzU3RyaW5nOiBpc1N0cmluZyxcblx0aXNCbGFuazogaXNCbGFuayxcblx0aXNBcnJheTogaXNBcnJheSxcblx0aXNXcml0YWJsZTogaXNXcml0YWJsZSxcblx0aXNSZXNlcnZlZE5hbWU6IGlzUmVzZXJ2ZWROYW1lXG59KTtcblxuLyoqXG4gKiBTaG9ydGVyIGFuZCBmYXN0IHdheSB0byBzZWxlY3QgbXVsdGlwbGUgbm9kZXMgaW4gdGhlIERPTVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzZWxlY3RvciAtIERPTSBzZWxlY3RvclxuICogQHBhcmFtICAgeyBPYmplY3QgfSBjdHggLSBET00gbm9kZSB3aGVyZSB0aGUgdGFyZ2V0cyBvZiBvdXIgc2VhcmNoIHdpbGwgaXMgbG9jYXRlZFxuICogQHJldHVybnMgeyBPYmplY3QgfSBkb20gbm9kZXMgZm91bmRcbiAqL1xuZnVuY3Rpb24gJCQoc2VsZWN0b3IsIGN0eCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoKGN0eCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG59XG5cbi8qKlxuICogU2hvcnRlciBhbmQgZmFzdCB3YXkgdG8gc2VsZWN0IGEgc2luZ2xlIG5vZGUgaW4gdGhlIERPTVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzZWxlY3RvciAtIHVuaXF1ZSBkb20gc2VsZWN0b3JcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY3R4IC0gRE9NIG5vZGUgd2hlcmUgdGhlIHRhcmdldCBvZiBvdXIgc2VhcmNoIHdpbGwgaXMgbG9jYXRlZFxuICogQHJldHVybnMgeyBPYmplY3QgfSBkb20gbm9kZSBmb3VuZFxuICovXG5mdW5jdGlvbiAkKHNlbGVjdG9yLCBjdHgpIHtcbiAgcmV0dXJuIChjdHggfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnRcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZG9jdW1lbnQgZnJhZ21lbnRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRnJhZygpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRvY3VtZW50IHRleHQgbm9kZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBjcmVhdGUgYSB0ZXh0IG5vZGUgdG8gdXNlIGFzIHBsYWNlaG9sZGVyXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZURPTVBsYWNlaG9sZGVyKCkge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBET00gbm9kZSBpcyBhbiBzdmcgdGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gIGVsIC0gbm9kZSB3ZSB3YW50IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIGl0J3MgYW4gc3ZnIG5vZGVcbiAqL1xuZnVuY3Rpb24gaXNTdmcoZWwpIHtcbiAgcmV0dXJuICEhZWwub3duZXJTVkdFbGVtZW50XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZ2VuZXJpYyBET00gbm9kZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBuYW1lIC0gbmFtZSBvZiB0aGUgRE9NIG5vZGUgd2Ugd2FudCB0byBjcmVhdGVcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGlzU3ZnIC0gdHJ1ZSBpZiB3ZSBuZWVkIHRvIHVzZSBhbiBzdmcgbm9kZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBET00gbm9kZSBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gbWtFbChuYW1lKSB7XG4gIHJldHVybiBuYW1lID09PSAnc3ZnJyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdfTlMsIG5hbWUpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKVxufVxuXG4vKipcbiAqIFNldCB0aGUgaW5uZXIgaHRtbCBvZiBhbnkgRE9NIG5vZGUgU1ZHcyBpbmNsdWRlZFxuICogQHBhcmFtIHsgT2JqZWN0IH0gY29udGFpbmVyIC0gRE9NIG5vZGUgd2hlcmUgd2UnbGwgaW5qZWN0IG5ldyBodG1sXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBodG1sIC0gaHRtbCB0byBpbmplY3RcbiAqL1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIHNldElubmVySFRNTChjb250YWluZXIsIGh0bWwpIHtcbiAgaWYgKCFpc1VuZGVmaW5lZChjb250YWluZXIuaW5uZXJIVE1MKSlcbiAgICB7IGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sOyB9XG4gICAgLy8gc29tZSBicm93c2VycyBkbyBub3Qgc3VwcG9ydCBpbm5lckhUTUwgb24gdGhlIFNWR3MgdGFnc1xuICBlbHNlIHtcbiAgICB2YXIgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCAnYXBwbGljYXRpb24veG1sJyk7XG4gICAgdmFyIG5vZGUgPSBjb250YWluZXIub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRvYy5kb2N1bWVudEVsZW1lbnQsIHRydWUpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgfVxufVxuXG4vKipcbiAqIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiBhbnkgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gaGlkZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gc2hvdyAtIGRvIHdlIHdhbnQgdG8gc2hvdyBpdD9cbiAqL1xuXG5mdW5jdGlvbiB0b2dnbGVWaXNpYmlsaXR5KGRvbSwgc2hvdykge1xuICBkb20uc3R5bGUuZGlzcGxheSA9IHNob3cgPyAnJyA6ICdub25lJztcbiAgZG9tWydoaWRkZW4nXSA9IHNob3cgPyBmYWxzZSA6IHRydWU7XG59XG5cbi8qKlxuICogUmVtb3ZlIGFueSBET00gYXR0cmlidXRlIGZyb20gYSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gdXBkYXRlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3ZSB3YW50IHRvIHJlbW92ZVxuICovXG5mdW5jdGlvbiByZW1BdHRyKGRvbSwgbmFtZSkge1xuICBkb20ucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYSBzdHlsZSBvYmplY3QgdG8gYSBzdHJpbmdcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gc3R5bGUgLSBzdHlsZSBvYmplY3Qgd2UgbmVlZCB0byBwYXJzZVxuICogQHJldHVybnMgeyBTdHJpbmcgfSByZXN1bHRpbmcgY3NzIHN0cmluZ1xuICogQGV4YW1wbGVcbiAqIHN0eWxlT2JqZWN0VG9TdHJpbmcoeyBjb2xvcjogJ3JlZCcsIGhlaWdodDogJzEwcHgnfSkgLy8gPT4gJ2NvbG9yOiByZWQ7IGhlaWdodDogMTBweCdcbiAqL1xuZnVuY3Rpb24gc3R5bGVPYmplY3RUb1N0cmluZyhzdHlsZSkge1xuICByZXR1cm4gT2JqZWN0LmtleXMoc3R5bGUpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wKSB7XG4gICAgcmV0dXJuIChhY2MgKyBcIiBcIiArIHByb3AgKyBcIjogXCIgKyAoc3R5bGVbcHJvcF0pICsgXCI7XCIpXG4gIH0sICcnKVxufVxuXG4vKipcbiAqIEdldCB0aGUgdmFsdWUgb2YgYW55IERPTSBhdHRyaWJ1dGUgb24gYSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gcGFyc2VcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB3ZSB3YW50IHRvIGdldFxuICogQHJldHVybnMgeyBTdHJpbmcgfCB1bmRlZmluZWQgfSBuYW1lIG9mIHRoZSBub2RlIGF0dHJpYnV0ZSB3aGV0aGVyIGl0IGV4aXN0c1xuICovXG5mdW5jdGlvbiBnZXRBdHRyKGRvbSwgbmFtZSkge1xuICByZXR1cm4gZG9tLmdldEF0dHJpYnV0ZShuYW1lKVxufVxuXG4vKipcbiAqIFNldCBhbnkgRE9NIGF0dHJpYnV0ZVxuICogQHBhcmFtIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byB1cGRhdGVcbiAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3ZSB3YW50IHRvIHNldFxuICogQHBhcmFtIHsgU3RyaW5nIH0gdmFsIC0gdmFsdWUgb2YgdGhlIHByb3BlcnR5IHdlIHdhbnQgdG8gc2V0XG4gKi9cbmZ1bmN0aW9uIHNldEF0dHIoZG9tLCBuYW1lLCB2YWwpIHtcbiAgdmFyIHhsaW5rID0gWExJTktfUkVHRVguZXhlYyhuYW1lKTtcbiAgaWYgKHhsaW5rICYmIHhsaW5rWzFdKVxuICAgIHsgZG9tLnNldEF0dHJpYnV0ZU5TKFhMSU5LX05TLCB4bGlua1sxXSwgdmFsKTsgfVxuICBlbHNlXG4gICAgeyBkb20uc2V0QXR0cmlidXRlKG5hbWUsIHZhbCk7IH1cbn1cblxuLyoqXG4gKiBJbnNlcnQgc2FmZWx5IGEgdGFnIHRvIGZpeCAjMTk2MiAjMTY0OVxuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBjaGlsZHJlbiBjb250YWluZXJcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBjdXJyIC0gbm9kZSB0byBpbnNlcnRcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBuZXh0IC0gbm9kZSB0aGF0IHNob3VsZCBwcmVjZWVkIHRoZSBjdXJyZW50IG5vZGUgaW5zZXJ0ZWRcbiAqL1xuZnVuY3Rpb24gc2FmZUluc2VydChyb290LCBjdXJyLCBuZXh0KSB7XG4gIHJvb3QuaW5zZXJ0QmVmb3JlKGN1cnIsIG5leHQucGFyZW50Tm9kZSAmJiBuZXh0KTtcbn1cblxuLyoqXG4gKiBNaW5pbWl6ZSByaXNrOiBvbmx5IHplcm8gb3Igb25lIF9zcGFjZV8gYmV0d2VlbiBhdHRyICYgdmFsdWVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBodG1sIC0gaHRtbCBzdHJpbmcgd2Ugd2FudCB0byBwYXJzZVxuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gYXBwbHkgb24gYW55IGF0dHJpYnV0ZSBmb3VuZFxuICovXG5mdW5jdGlvbiB3YWxrQXR0cnMoaHRtbCwgZm4pIHtcbiAgaWYgKCFodG1sKVxuICAgIHsgcmV0dXJuIH1cbiAgdmFyIG07XG4gIHdoaWxlIChtID0gUkVfSFRNTF9BVFRSUy5leGVjKGh0bWwpKVxuICAgIHsgZm4obVsxXS50b0xvd2VyQ2FzZSgpLCBtWzJdIHx8IG1bM10gfHwgbVs0XSk7IH1cbn1cblxuLyoqXG4gKiBXYWxrIGRvd24gcmVjdXJzaXZlbHkgYWxsIHRoZSBjaGlsZHJlbiB0YWdzIHN0YXJ0aW5nIGRvbSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICAgZG9tIC0gc3RhcnRpbmcgbm9kZSB3aGVyZSB3ZSB3aWxsIHN0YXJ0IHRoZSByZWN1cnNpb25cbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIHRvIHRyYW5zZm9ybSB0aGUgY2hpbGQgbm9kZSBqdXN0IGZvdW5kXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICAgY29udGV4dCAtIGZuIGNhbiBvcHRpb25hbGx5IHJldHVybiBhbiBvYmplY3QsIHdoaWNoIGlzIHBhc3NlZCB0byBjaGlsZHJlblxuICovXG5mdW5jdGlvbiB3YWxrTm9kZXMoZG9tLCBmbiwgY29udGV4dCkge1xuICBpZiAoZG9tKSB7XG4gICAgdmFyIHJlcyA9IGZuKGRvbSwgY29udGV4dCk7XG4gICAgdmFyIG5leHQ7XG4gICAgLy8gc3RvcCB0aGUgcmVjdXJzaW9uXG4gICAgaWYgKHJlcyA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cblxuICAgIGRvbSA9IGRvbS5maXJzdENoaWxkO1xuXG4gICAgd2hpbGUgKGRvbSkge1xuICAgICAgbmV4dCA9IGRvbS5uZXh0U2libGluZztcbiAgICAgIHdhbGtOb2Rlcyhkb20sIGZuLCByZXMpO1xuICAgICAgZG9tID0gbmV4dDtcbiAgICB9XG4gIH1cbn1cblxudmFyIGRvbSA9IE9iamVjdC5mcmVlemUoe1xuXHQkJDogJCQsXG5cdCQ6ICQsXG5cdGNyZWF0ZUZyYWc6IGNyZWF0ZUZyYWcsXG5cdGNyZWF0ZURPTVBsYWNlaG9sZGVyOiBjcmVhdGVET01QbGFjZWhvbGRlcixcblx0aXNTdmc6IGlzU3ZnLFxuXHRta0VsOiBta0VsLFxuXHRzZXRJbm5lckhUTUw6IHNldElubmVySFRNTCxcblx0dG9nZ2xlVmlzaWJpbGl0eTogdG9nZ2xlVmlzaWJpbGl0eSxcblx0cmVtQXR0cjogcmVtQXR0cixcblx0c3R5bGVPYmplY3RUb1N0cmluZzogc3R5bGVPYmplY3RUb1N0cmluZyxcblx0Z2V0QXR0cjogZ2V0QXR0cixcblx0c2V0QXR0cjogc2V0QXR0cixcblx0c2FmZUluc2VydDogc2FmZUluc2VydCxcblx0d2Fsa0F0dHJzOiB3YWxrQXR0cnMsXG5cdHdhbGtOb2Rlczogd2Fsa05vZGVzXG59KTtcblxudmFyIHN0eWxlTm9kZTtcbnZhciBjc3NUZXh0UHJvcDtcbnZhciBieU5hbWUgPSB7fTtcbnZhciByZW1haW5kZXIgPSBbXTtcbnZhciBuZWVkc0luamVjdCA9IGZhbHNlO1xuXG4vLyBza2lwIHRoZSBmb2xsb3dpbmcgY29kZSBvbiB0aGUgc2VydmVyXG5pZiAoV0lOKSB7XG4gIHN0eWxlTm9kZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLy8gY3JlYXRlIGEgbmV3IHN0eWxlIGVsZW1lbnQgd2l0aCB0aGUgY29ycmVjdCB0eXBlXG4gICAgdmFyIG5ld05vZGUgPSBta0VsKCdzdHlsZScpO1xuICAgIHNldEF0dHIobmV3Tm9kZSwgJ3R5cGUnLCAndGV4dC9jc3MnKTtcblxuICAgIC8vIHJlcGxhY2UgYW55IHVzZXIgbm9kZSBvciBpbnNlcnQgdGhlIG5ldyBvbmUgaW50byB0aGUgaGVhZFxuICAgIHZhciB1c2VyTm9kZSA9ICQoJ3N0eWxlW3R5cGU9cmlvdF0nKTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICh1c2VyTm9kZSkge1xuICAgICAgaWYgKHVzZXJOb2RlLmlkKSB7IG5ld05vZGUuaWQgPSB1c2VyTm9kZS5pZDsgfVxuICAgICAgdXNlck5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgdXNlck5vZGUpO1xuICAgIH1cbiAgICBlbHNlIHsgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChuZXdOb2RlKTsgfVxuXG4gICAgcmV0dXJuIG5ld05vZGVcbiAgfSkoKTtcbiAgY3NzVGV4dFByb3AgPSBzdHlsZU5vZGUuc3R5bGVTaGVldDtcbn1cblxuLyoqXG4gKiBPYmplY3QgdGhhdCB3aWxsIGJlIHVzZWQgdG8gaW5qZWN0IGFuZCBtYW5hZ2UgdGhlIGNzcyBvZiBldmVyeSB0YWcgaW5zdGFuY2VcbiAqL1xudmFyIHN0eWxlTWFuYWdlciA9IHtcbiAgc3R5bGVOb2RlOiBzdHlsZU5vZGUsXG4gIC8qKlxuICAgKiBTYXZlIGEgdGFnIHN0eWxlIHRvIGJlIGxhdGVyIGluamVjdGVkIGludG8gRE9NXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IGNzcyAtIGNzcyBzdHJpbmdcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSAtIGlmIGl0J3MgcGFzc2VkIHdlIHdpbGwgbWFwIHRoZSBjc3MgdG8gYSB0YWduYW1lXG4gICAqL1xuICBhZGQ6IGZ1bmN0aW9uIGFkZChjc3MsIG5hbWUpIHtcbiAgICBpZiAobmFtZSkgeyBieU5hbWVbbmFtZV0gPSBjc3M7IH1cbiAgICBlbHNlIHsgcmVtYWluZGVyLnB1c2goY3NzKTsgfVxuICAgIG5lZWRzSW5qZWN0ID0gdHJ1ZTtcbiAgfSxcbiAgLyoqXG4gICAqIEluamVjdCBhbGwgcHJldmlvdXNseSBzYXZlZCB0YWcgc3R5bGVzIGludG8gRE9NXG4gICAqIGlubmVySFRNTCBzZWVtcyBzbG93OiBodHRwOi8vanNwZXJmLmNvbS9yaW90LWluc2VydC1zdHlsZVxuICAgKi9cbiAgaW5qZWN0OiBmdW5jdGlvbiBpbmplY3QoKSB7XG4gICAgaWYgKCFXSU4gfHwgIW5lZWRzSW5qZWN0KSB7IHJldHVybiB9XG4gICAgbmVlZHNJbmplY3QgPSBmYWxzZTtcbiAgICB2YXIgc3R5bGUgPSBPYmplY3Qua2V5cyhieU5hbWUpXG4gICAgICAubWFwKGZ1bmN0aW9uKGspIHsgcmV0dXJuIGJ5TmFtZVtrXSB9KVxuICAgICAgLmNvbmNhdChyZW1haW5kZXIpLmpvaW4oJ1xcbicpO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGNzc1RleHRQcm9wKSB7IGNzc1RleHRQcm9wLmNzc1RleHQgPSBzdHlsZTsgfVxuICAgIGVsc2UgeyBzdHlsZU5vZGUuaW5uZXJIVE1MID0gc3R5bGU7IH1cbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgcmlvdCB0ZW1wbGF0ZSBlbmdpbmVcbiAqIEB2ZXJzaW9uIHYzLjAuNVxuICovXG4vKipcbiAqIHJpb3QudXRpbC5icmFja2V0c1xuICpcbiAqIC0gYGJyYWNrZXRzICAgIGAgLSBSZXR1cm5zIGEgc3RyaW5nIG9yIHJlZ2V4IGJhc2VkIG9uIGl0cyBwYXJhbWV0ZXJcbiAqIC0gYGJyYWNrZXRzLnNldGAgLSBDaGFuZ2UgdGhlIGN1cnJlbnQgcmlvdCBicmFja2V0c1xuICpcbiAqIEBtb2R1bGVcbiAqL1xuXG4vKiBnbG9iYWwgcmlvdCAqL1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xudmFyIGJyYWNrZXRzID0gKGZ1bmN0aW9uIChVTkRFRikge1xuXG4gIHZhclxuICAgIFJFR0xPQiA9ICdnJyxcblxuICAgIFJfTUxDT01NUyA9IC9cXC9cXCpbXipdKlxcKisoPzpbXipcXC9dW14qXSpcXCorKSpcXC8vZyxcblxuICAgIFJfU1RSSU5HUyA9IC9cIlteXCJcXFxcXSooPzpcXFxcW1xcU1xcc11bXlwiXFxcXF0qKSpcInwnW14nXFxcXF0qKD86XFxcXFtcXFNcXHNdW14nXFxcXF0qKSonfGBbXmBcXFxcXSooPzpcXFxcW1xcU1xcc11bXmBcXFxcXSopKmAvZyxcblxuICAgIFNfUUJMT0NLUyA9IFJfU1RSSU5HUy5zb3VyY2UgKyAnfCcgK1xuICAgICAgLyg/OlxcYnJldHVyblxccyt8KD86WyRcXHdcXClcXF1dfFxcK1xcK3wtLSlcXHMqKFxcLykoPyFbKlxcL10pKS8uc291cmNlICsgJ3wnICtcbiAgICAgIC9cXC8oPz1bXipcXC9dKVteW1xcL1xcXFxdKig/Oig/OlxcWyg/OlxcXFwufFteXFxdXFxcXF0qKSpcXF18XFxcXC4pW15bXFwvXFxcXF0qKSo/KFtePF1cXC8pW2dpbV0qLy5zb3VyY2UsXG5cbiAgICBVTlNVUFBPUlRFRCA9IFJlZ0V4cCgnW1xcXFwnICsgJ3gwMC1cXFxceDFGPD5hLXpBLVowLTlcXCdcIiw7XFxcXFxcXFxdJyksXG5cbiAgICBORUVEX0VTQ0FQRSA9IC8oPz1bW1xcXSgpKis/Ll4kfF0pL2csXG5cbiAgICBGSU5EQlJBQ0VTID0ge1xuICAgICAgJygnOiBSZWdFeHAoJyhbKCldKXwnICAgKyBTX1FCTE9DS1MsIFJFR0xPQiksXG4gICAgICAnWyc6IFJlZ0V4cCgnKFtbXFxcXF1dKXwnICsgU19RQkxPQ0tTLCBSRUdMT0IpLFxuICAgICAgJ3snOiBSZWdFeHAoJyhbe31dKXwnICAgKyBTX1FCTE9DS1MsIFJFR0xPQilcbiAgICB9LFxuXG4gICAgREVGQVVMVCA9ICd7IH0nO1xuXG4gIHZhciBfcGFpcnMgPSBbXG4gICAgJ3snLCAnfScsXG4gICAgJ3snLCAnfScsXG4gICAgL3tbXn1dKn0vLFxuICAgIC9cXFxcKFt7fV0pL2csXG4gICAgL1xcXFwoeyl8ey9nLFxuICAgIFJlZ0V4cCgnXFxcXFxcXFwofSl8KFtbKHtdKXwofSl8JyArIFNfUUJMT0NLUywgUkVHTE9CKSxcbiAgICBERUZBVUxULFxuICAgIC9eXFxzKntcXF4/XFxzKihbJFxcd10rKSg/OlxccyosXFxzKihcXFMrKSk/XFxzK2luXFxzKyhcXFMuKilcXHMqfS8sXG4gICAgLyhefFteXFxcXF0pez1bXFxTXFxzXSo/fS9cbiAgXTtcblxuICB2YXJcbiAgICBjYWNoZWRCcmFja2V0cyA9IFVOREVGLFxuICAgIF9yZWdleCxcbiAgICBfY2FjaGUgPSBbXSxcbiAgICBfc2V0dGluZ3M7XG5cbiAgZnVuY3Rpb24gX2xvb3BiYWNrIChyZSkgeyByZXR1cm4gcmUgfVxuXG4gIGZ1bmN0aW9uIF9yZXdyaXRlIChyZSwgYnApIHtcbiAgICBpZiAoIWJwKSB7IGJwID0gX2NhY2hlOyB9XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICByZS5zb3VyY2UucmVwbGFjZSgvey9nLCBicFsyXSkucmVwbGFjZSgvfS9nLCBicFszXSksIHJlLmdsb2JhbCA/IFJFR0xPQiA6ICcnXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZSAocGFpcikge1xuICAgIGlmIChwYWlyID09PSBERUZBVUxUKSB7IHJldHVybiBfcGFpcnMgfVxuXG4gICAgdmFyIGFyciA9IHBhaXIuc3BsaXQoJyAnKTtcblxuICAgIGlmIChhcnIubGVuZ3RoICE9PSAyIHx8IFVOU1VQUE9SVEVELnRlc3QocGFpcikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgYnJhY2tldHMgXCInICsgcGFpciArICdcIicpXG4gICAgfVxuICAgIGFyciA9IGFyci5jb25jYXQocGFpci5yZXBsYWNlKE5FRURfRVNDQVBFLCAnXFxcXCcpLnNwbGl0KCcgJykpO1xuXG4gICAgYXJyWzRdID0gX3Jld3JpdGUoYXJyWzFdLmxlbmd0aCA+IDEgPyAve1tcXFNcXHNdKj99LyA6IF9wYWlyc1s0XSwgYXJyKTtcbiAgICBhcnJbNV0gPSBfcmV3cml0ZShwYWlyLmxlbmd0aCA+IDMgPyAvXFxcXCh7fH0pL2cgOiBfcGFpcnNbNV0sIGFycik7XG4gICAgYXJyWzZdID0gX3Jld3JpdGUoX3BhaXJzWzZdLCBhcnIpO1xuICAgIGFycls3XSA9IFJlZ0V4cCgnXFxcXFxcXFwoJyArIGFyclszXSArICcpfChbWyh7XSl8KCcgKyBhcnJbM10gKyAnKXwnICsgU19RQkxPQ0tTLCBSRUdMT0IpO1xuICAgIGFycls4XSA9IHBhaXI7XG4gICAgcmV0dXJuIGFyclxuICB9XG5cbiAgZnVuY3Rpb24gX2JyYWNrZXRzIChyZU9ySWR4KSB7XG4gICAgcmV0dXJuIHJlT3JJZHggaW5zdGFuY2VvZiBSZWdFeHAgPyBfcmVnZXgocmVPcklkeCkgOiBfY2FjaGVbcmVPcklkeF1cbiAgfVxuXG4gIF9icmFja2V0cy5zcGxpdCA9IGZ1bmN0aW9uIHNwbGl0IChzdHIsIHRtcGwsIF9icCkge1xuICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBfYnAgaXMgZm9yIHRoZSBjb21waWxlclxuICAgIGlmICghX2JwKSB7IF9icCA9IF9jYWNoZTsgfVxuXG4gICAgdmFyXG4gICAgICBwYXJ0cyA9IFtdLFxuICAgICAgbWF0Y2gsXG4gICAgICBpc2V4cHIsXG4gICAgICBzdGFydCxcbiAgICAgIHBvcyxcbiAgICAgIHJlID0gX2JwWzZdO1xuXG4gICAgaXNleHByID0gc3RhcnQgPSByZS5sYXN0SW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMoc3RyKSkpIHtcblxuICAgICAgcG9zID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgIGlmIChpc2V4cHIpIHtcblxuICAgICAgICBpZiAobWF0Y2hbMl0pIHtcbiAgICAgICAgICByZS5sYXN0SW5kZXggPSBza2lwQnJhY2VzKHN0ciwgbWF0Y2hbMl0sIHJlLmxhc3RJbmRleCk7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1hdGNoWzNdKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIW1hdGNoWzFdKSB7XG4gICAgICAgIHVuZXNjYXBlU3RyKHN0ci5zbGljZShzdGFydCwgcG9zKSk7XG4gICAgICAgIHN0YXJ0ID0gcmUubGFzdEluZGV4O1xuICAgICAgICByZSA9IF9icFs2ICsgKGlzZXhwciBePSAxKV07XG4gICAgICAgIHJlLmxhc3RJbmRleCA9IHN0YXJ0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHIgJiYgc3RhcnQgPCBzdHIubGVuZ3RoKSB7XG4gICAgICB1bmVzY2FwZVN0cihzdHIuc2xpY2Uoc3RhcnQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFydHNcblxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlU3RyIChzKSB7XG4gICAgICBpZiAodG1wbCB8fCBpc2V4cHIpIHtcbiAgICAgICAgcGFydHMucHVzaChzICYmIHMucmVwbGFjZShfYnBbNV0sICckMScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnRzLnB1c2gocyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2tpcEJyYWNlcyAocywgY2gsIGl4KSB7XG4gICAgICB2YXJcbiAgICAgICAgbWF0Y2gsXG4gICAgICAgIHJlY2NoID0gRklOREJSQUNFU1tjaF07XG5cbiAgICAgIHJlY2NoLmxhc3RJbmRleCA9IGl4O1xuICAgICAgaXggPSAxO1xuICAgICAgd2hpbGUgKChtYXRjaCA9IHJlY2NoLmV4ZWMocykpKSB7XG4gICAgICAgIGlmIChtYXRjaFsxXSAmJlxuICAgICAgICAgICEobWF0Y2hbMV0gPT09IGNoID8gKytpeCA6IC0taXgpKSB7IGJyZWFrIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpeCA/IHMubGVuZ3RoIDogcmVjY2gubGFzdEluZGV4XG4gICAgfVxuICB9O1xuXG4gIF9icmFja2V0cy5oYXNFeHByID0gZnVuY3Rpb24gaGFzRXhwciAoc3RyKSB7XG4gICAgcmV0dXJuIF9jYWNoZVs0XS50ZXN0KHN0cilcbiAgfTtcblxuICBfYnJhY2tldHMubG9vcEtleXMgPSBmdW5jdGlvbiBsb29wS2V5cyAoZXhwcikge1xuICAgIHZhciBtID0gZXhwci5tYXRjaChfY2FjaGVbOV0pO1xuXG4gICAgcmV0dXJuIG1cbiAgICAgID8geyBrZXk6IG1bMV0sIHBvczogbVsyXSwgdmFsOiBfY2FjaGVbMF0gKyBtWzNdLnRyaW0oKSArIF9jYWNoZVsxXSB9XG4gICAgICA6IHsgdmFsOiBleHByLnRyaW0oKSB9XG4gIH07XG5cbiAgX2JyYWNrZXRzLmFycmF5ID0gZnVuY3Rpb24gYXJyYXkgKHBhaXIpIHtcbiAgICByZXR1cm4gcGFpciA/IF9jcmVhdGUocGFpcikgOiBfY2FjaGVcbiAgfTtcblxuICBmdW5jdGlvbiBfcmVzZXQgKHBhaXIpIHtcbiAgICBpZiAoKHBhaXIgfHwgKHBhaXIgPSBERUZBVUxUKSkgIT09IF9jYWNoZVs4XSkge1xuICAgICAgX2NhY2hlID0gX2NyZWF0ZShwYWlyKTtcbiAgICAgIF9yZWdleCA9IHBhaXIgPT09IERFRkFVTFQgPyBfbG9vcGJhY2sgOiBfcmV3cml0ZTtcbiAgICAgIF9jYWNoZVs5XSA9IF9yZWdleChfcGFpcnNbOV0pO1xuICAgIH1cbiAgICBjYWNoZWRCcmFja2V0cyA9IHBhaXI7XG4gIH1cblxuICBmdW5jdGlvbiBfc2V0U2V0dGluZ3MgKG8pIHtcbiAgICB2YXIgYjtcblxuICAgIG8gPSBvIHx8IHt9O1xuICAgIGIgPSBvLmJyYWNrZXRzO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCAnYnJhY2tldHMnLCB7XG4gICAgICBzZXQ6IF9yZXNldCxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY2FjaGVkQnJhY2tldHMgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBfc2V0dGluZ3MgPSBvO1xuICAgIF9yZXNldChiKTtcbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYnJhY2tldHMsICdzZXR0aW5ncycsIHtcbiAgICBzZXQ6IF9zZXRTZXR0aW5ncyxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9zZXR0aW5ncyB9XG4gIH0pO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBpbiB0aGUgYnJvd3NlciByaW90IGlzIGFsd2F5cyBpbiB0aGUgc2NvcGUgKi9cbiAgX2JyYWNrZXRzLnNldHRpbmdzID0gdHlwZW9mIHJpb3QgIT09ICd1bmRlZmluZWQnICYmIHJpb3Quc2V0dGluZ3MgfHwge307XG4gIF9icmFja2V0cy5zZXQgPSBfcmVzZXQ7XG5cbiAgX2JyYWNrZXRzLlJfU1RSSU5HUyA9IFJfU1RSSU5HUztcbiAgX2JyYWNrZXRzLlJfTUxDT01NUyA9IFJfTUxDT01NUztcbiAgX2JyYWNrZXRzLlNfUUJMT0NLUyA9IFNfUUJMT0NLUztcblxuICByZXR1cm4gX2JyYWNrZXRzXG5cbn0pKCk7XG5cbi8qKlxuICogQG1vZHVsZSB0bXBsXG4gKlxuICogdG1wbCAgICAgICAgICAtIFJvb3QgZnVuY3Rpb24sIHJldHVybnMgdGhlIHRlbXBsYXRlIHZhbHVlLCByZW5kZXIgd2l0aCBkYXRhXG4gKiB0bXBsLmhhc0V4cHIgIC0gVGVzdCB0aGUgZXhpc3RlbmNlIG9mIGEgZXhwcmVzc2lvbiBpbnNpZGUgYSBzdHJpbmdcbiAqIHRtcGwubG9vcEtleXMgLSBHZXQgdGhlIGtleXMgZm9yIGFuICdlYWNoJyBsb29wICh1c2VkIGJ5IGBfZWFjaGApXG4gKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbnZhciB0bXBsID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX2NhY2hlID0ge307XG5cbiAgZnVuY3Rpb24gX3RtcGwgKHN0ciwgZGF0YSkge1xuICAgIGlmICghc3RyKSB7IHJldHVybiBzdHIgfVxuXG4gICAgcmV0dXJuIChfY2FjaGVbc3RyXSB8fCAoX2NhY2hlW3N0cl0gPSBfY3JlYXRlKHN0cikpKS5jYWxsKFxuICAgICAgZGF0YSwgX2xvZ0Vyci5iaW5kKHtcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgdG1wbDogc3RyXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIF90bXBsLmhhc0V4cHIgPSBicmFja2V0cy5oYXNFeHByO1xuXG4gIF90bXBsLmxvb3BLZXlzID0gYnJhY2tldHMubG9vcEtleXM7XG5cbiAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgX3RtcGwuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uICgpIHsgX2NhY2hlID0ge307IH07XG5cbiAgX3RtcGwuZXJyb3JIYW5kbGVyID0gbnVsbDtcblxuICBmdW5jdGlvbiBfbG9nRXJyIChlcnIsIGN0eCkge1xuXG4gICAgZXJyLnJpb3REYXRhID0ge1xuICAgICAgdGFnTmFtZTogY3R4ICYmIGN0eC5fXyAmJiBjdHguX18udGFnTmFtZSxcbiAgICAgIF9yaW90X2lkOiBjdHggJiYgY3R4Ll9yaW90X2lkICAvL2VzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gICAgfTtcblxuICAgIGlmIChfdG1wbC5lcnJvckhhbmRsZXIpIHsgX3RtcGwuZXJyb3JIYW5kbGVyKGVycik7IH1cbiAgICBlbHNlIGlmIChcbiAgICAgIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbidcbiAgICApIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgY29uc29sZS5sb2coJzwlcz4gJXMnLCBlcnIucmlvdERhdGEudGFnTmFtZSB8fCAnVW5rbm93biB0YWcnLCB0aGlzLnRtcGwpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZSAoc3RyKSB7XG4gICAgdmFyIGV4cHIgPSBfZ2V0VG1wbChzdHIpO1xuXG4gICAgaWYgKGV4cHIuc2xpY2UoMCwgMTEpICE9PSAndHJ5e3JldHVybiAnKSB7IGV4cHIgPSAncmV0dXJuICcgKyBleHByOyB9XG5cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdFJywgZXhwciArICc7JykgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctZnVuY1xuICB9XG5cbiAgdmFyXG4gICAgQ0hfSURFWFBSID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweDIwNTcpLFxuICAgIFJFX0NTTkFNRSA9IC9eKD86KC0/W19BLVphLXpcXHhBMC1cXHhGRl1bLVxcd1xceEEwLVxceEZGXSopfFxcdTIwNTcoXFxkKyl+KTovLFxuICAgIFJFX1FCTE9DSyA9IFJlZ0V4cChicmFja2V0cy5TX1FCTE9DS1MsICdnJyksXG4gICAgUkVfRFFVT1RFID0gL1xcdTIwNTcvZyxcbiAgICBSRV9RQk1BUksgPSAvXFx1MjA1NyhcXGQrKX4vZztcblxuICBmdW5jdGlvbiBfZ2V0VG1wbCAoc3RyKSB7XG4gICAgdmFyXG4gICAgICBxc3RyID0gW10sXG4gICAgICBleHByLFxuICAgICAgcGFydHMgPSBicmFja2V0cy5zcGxpdChzdHIucmVwbGFjZShSRV9EUVVPVEUsICdcIicpLCAxKTtcblxuICAgIGlmIChwYXJ0cy5sZW5ndGggPiAyIHx8IHBhcnRzWzBdKSB7XG4gICAgICB2YXIgaSwgaiwgbGlzdCA9IFtdO1xuXG4gICAgICBmb3IgKGkgPSBqID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgZXhwciA9IHBhcnRzW2ldO1xuXG4gICAgICAgIGlmIChleHByICYmIChleHByID0gaSAmIDFcblxuICAgICAgICAgICAgPyBfcGFyc2VFeHByKGV4cHIsIDEsIHFzdHIpXG5cbiAgICAgICAgICAgIDogJ1wiJyArIGV4cHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHJcXG4/fFxcbi9nLCAnXFxcXG4nKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgK1xuICAgICAgICAgICAgICAnXCInXG5cbiAgICAgICAgICApKSB7IGxpc3RbaisrXSA9IGV4cHI7IH1cblxuICAgICAgfVxuXG4gICAgICBleHByID0gaiA8IDIgPyBsaXN0WzBdXG4gICAgICAgICAgIDogJ1snICsgbGlzdC5qb2luKCcsJykgKyAnXS5qb2luKFwiXCIpJztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGV4cHIgPSBfcGFyc2VFeHByKHBhcnRzWzFdLCAwLCBxc3RyKTtcbiAgICB9XG5cbiAgICBpZiAocXN0clswXSkge1xuICAgICAgZXhwciA9IGV4cHIucmVwbGFjZShSRV9RQk1BUkssIGZ1bmN0aW9uIChfLCBwb3MpIHtcbiAgICAgICAgcmV0dXJuIHFzdHJbcG9zXVxuICAgICAgICAgIC5yZXBsYWNlKC9cXHIvZywgJ1xcXFxyJylcbiAgICAgICAgICAucmVwbGFjZSgvXFxuL2csICdcXFxcbicpXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGV4cHJcbiAgfVxuXG4gIHZhclxuICAgIFJFX0JSRU5EID0ge1xuICAgICAgJygnOiAvWygpXS9nLFxuICAgICAgJ1snOiAvW1tcXF1dL2csXG4gICAgICAneyc6IC9be31dL2dcbiAgICB9O1xuXG4gIGZ1bmN0aW9uIF9wYXJzZUV4cHIgKGV4cHIsIGFzVGV4dCwgcXN0cikge1xuXG4gICAgZXhwciA9IGV4cHJcbiAgICAgICAgICAucmVwbGFjZShSRV9RQkxPQ0ssIGZ1bmN0aW9uIChzLCBkaXYpIHtcbiAgICAgICAgICAgIHJldHVybiBzLmxlbmd0aCA+IDIgJiYgIWRpdiA/IENIX0lERVhQUiArIChxc3RyLnB1c2gocykgLSAxKSArICd+JyA6IHNcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpXG4gICAgICAgICAgLnJlcGxhY2UoL1xcID8oW1tcXCh7fSw/XFwuOl0pXFwgPy9nLCAnJDEnKTtcblxuICAgIGlmIChleHByKSB7XG4gICAgICB2YXJcbiAgICAgICAgbGlzdCA9IFtdLFxuICAgICAgICBjbnQgPSAwLFxuICAgICAgICBtYXRjaDtcblxuICAgICAgd2hpbGUgKGV4cHIgJiZcbiAgICAgICAgICAgIChtYXRjaCA9IGV4cHIubWF0Y2goUkVfQ1NOQU1FKSkgJiZcbiAgICAgICAgICAgICFtYXRjaC5pbmRleFxuICAgICAgICApIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIGpzYixcbiAgICAgICAgICByZSA9IC8sfChbW3soXSl8JC9nO1xuXG4gICAgICAgIGV4cHIgPSBSZWdFeHAucmlnaHRDb250ZXh0O1xuICAgICAgICBrZXkgID0gbWF0Y2hbMl0gPyBxc3RyW21hdGNoWzJdXS5zbGljZSgxLCAtMSkudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJyAnKSA6IG1hdGNoWzFdO1xuXG4gICAgICAgIHdoaWxlIChqc2IgPSAobWF0Y2ggPSByZS5leGVjKGV4cHIpKVsxXSkgeyBza2lwQnJhY2VzKGpzYiwgcmUpOyB9XG5cbiAgICAgICAganNiICA9IGV4cHIuc2xpY2UoMCwgbWF0Y2guaW5kZXgpO1xuICAgICAgICBleHByID0gUmVnRXhwLnJpZ2h0Q29udGV4dDtcblxuICAgICAgICBsaXN0W2NudCsrXSA9IF93cmFwRXhwcihqc2IsIDEsIGtleSk7XG4gICAgICB9XG5cbiAgICAgIGV4cHIgPSAhY250ID8gX3dyYXBFeHByKGV4cHIsIGFzVGV4dClcbiAgICAgICAgICAgOiBjbnQgPiAxID8gJ1snICsgbGlzdC5qb2luKCcsJykgKyAnXS5qb2luKFwiIFwiKS50cmltKCknIDogbGlzdFswXTtcbiAgICB9XG4gICAgcmV0dXJuIGV4cHJcblxuICAgIGZ1bmN0aW9uIHNraXBCcmFjZXMgKGNoLCByZSkge1xuICAgICAgdmFyXG4gICAgICAgIG1tLFxuICAgICAgICBsdiA9IDEsXG4gICAgICAgIGlyID0gUkVfQlJFTkRbY2hdO1xuXG4gICAgICBpci5sYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICB3aGlsZSAobW0gPSBpci5leGVjKGV4cHIpKSB7XG4gICAgICAgIGlmIChtbVswXSA9PT0gY2gpIHsgKytsdjsgfVxuICAgICAgICBlbHNlIGlmICghLS1sdikgeyBicmVhayB9XG4gICAgICB9XG4gICAgICByZS5sYXN0SW5kZXggPSBsdiA/IGV4cHIubGVuZ3RoIDogaXIubGFzdEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBub3QgYm90aFxuICB2YXIgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBKU19DT05URVhUID0gJ1wiaW4gdGhpcz90aGlzOicgKyAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgPyAnZ2xvYmFsJyA6ICd3aW5kb3cnKSArICcpLicsXG4gICAgSlNfVkFSTkFNRSA9IC9bLHtdW1xcJFxcd10rKD89Oil8KF4gKnxbXiRcXHdcXC57XSkoPyEoPzp0eXBlb2Z8dHJ1ZXxmYWxzZXxudWxsfHVuZGVmaW5lZHxpbnxpbnN0YW5jZW9mfGlzKD86RmluaXRlfE5hTil8dm9pZHxOYU58bmV3fERhdGV8UmVnRXhwfE1hdGgpKD8hWyRcXHddKSkoWyRfQS1aYS16XVskXFx3XSopL2csXG4gICAgSlNfTk9QUk9QUyA9IC9eKD89KFxcLlskXFx3XSspKVxcMSg/OlteLlsoXXwkKS87XG5cbiAgZnVuY3Rpb24gX3dyYXBFeHByIChleHByLCBhc1RleHQsIGtleSkge1xuICAgIHZhciB0YjtcblxuICAgIGV4cHIgPSBleHByLnJlcGxhY2UoSlNfVkFSTkFNRSwgZnVuY3Rpb24gKG1hdGNoLCBwLCBtdmFyLCBwb3MsIHMpIHtcbiAgICAgIGlmIChtdmFyKSB7XG4gICAgICAgIHBvcyA9IHRiID8gMCA6IHBvcyArIG1hdGNoLmxlbmd0aDtcblxuICAgICAgICBpZiAobXZhciAhPT0gJ3RoaXMnICYmIG12YXIgIT09ICdnbG9iYWwnICYmIG12YXIgIT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgbWF0Y2ggPSBwICsgJyhcIicgKyBtdmFyICsgSlNfQ09OVEVYVCArIG12YXI7XG4gICAgICAgICAgaWYgKHBvcykgeyB0YiA9IChzID0gc1twb3NdKSA9PT0gJy4nIHx8IHMgPT09ICcoJyB8fCBzID09PSAnWyc7IH1cbiAgICAgICAgfSBlbHNlIGlmIChwb3MpIHtcbiAgICAgICAgICB0YiA9ICFKU19OT1BST1BTLnRlc3Qocy5zbGljZShwb3MpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoXG4gICAgfSk7XG5cbiAgICBpZiAodGIpIHtcbiAgICAgIGV4cHIgPSAndHJ5e3JldHVybiAnICsgZXhwciArICd9Y2F0Y2goZSl7RShlLHRoaXMpfSc7XG4gICAgfVxuXG4gICAgaWYgKGtleSkge1xuXG4gICAgICBleHByID0gKHRiXG4gICAgICAgICAgPyAnZnVuY3Rpb24oKXsnICsgZXhwciArICd9LmNhbGwodGhpcyknIDogJygnICsgZXhwciArICcpJ1xuICAgICAgICApICsgJz9cIicgKyBrZXkgKyAnXCI6XCJcIic7XG5cbiAgICB9IGVsc2UgaWYgKGFzVGV4dCkge1xuXG4gICAgICBleHByID0gJ2Z1bmN0aW9uKHYpeycgKyAodGJcbiAgICAgICAgICA/IGV4cHIucmVwbGFjZSgncmV0dXJuICcsICd2PScpIDogJ3Y9KCcgKyBleHByICsgJyknXG4gICAgICAgICkgKyAnO3JldHVybiB2fHx2PT09MD92OlwiXCJ9LmNhbGwodGhpcyknO1xuICAgIH1cblxuICAgIHJldHVybiBleHByXG4gIH1cblxuICBfdG1wbC52ZXJzaW9uID0gYnJhY2tldHMudmVyc2lvbiA9ICd2My4wLjUnO1xuXG4gIHJldHVybiBfdG1wbFxuXG59KSgpO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xudmFyIG9ic2VydmFibGUkMSA9IGZ1bmN0aW9uKGVsKSB7XG5cbiAgLyoqXG4gICAqIEV4dGVuZCB0aGUgb3JpZ2luYWwgb2JqZWN0IG9yIGNyZWF0ZSBhIG5ldyBlbXB0eSBvbmVcbiAgICogQHR5cGUgeyBPYmplY3QgfVxuICAgKi9cblxuICBlbCA9IGVsIHx8IHt9O1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlc1xuICAgKi9cbiAgdmFyIGNhbGxiYWNrcyA9IHt9LFxuICAgIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4gIC8qKlxuICAgKiBQdWJsaWMgQXBpXG4gICAqL1xuXG4gIC8vIGV4dGVuZCB0aGUgZWwgb2JqZWN0IGFkZGluZyB0aGUgb2JzZXJ2YWJsZSBtZXRob2RzXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGVsLCB7XG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIHRoZSBnaXZlbiBgZXZlbnRgIGFuZHNcbiAgICAgKiBleGVjdXRlIHRoZSBgY2FsbGJhY2tgIGVhY2ggdGltZSBhbiBldmVudCBpcyB0cmlnZ2VyZWQuXG4gICAgICogQHBhcmFtICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcGFyYW0gIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIG9uOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICB7IChjYWxsYmFja3NbZXZlbnRdID0gY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSkucHVzaChmbik7IH1cbiAgICAgICAgcmV0dXJuIGVsXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGdpdmVuIGBldmVudGAgbGlzdGVuZXJzXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb2ZmOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGlmIChldmVudCA9PSAnKicgJiYgIWZuKSB7IGNhbGxiYWNrcyA9IHt9OyB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgdmFyIGFyciA9IGNhbGxiYWNrc1tldmVudF07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgY2I7IGNiID0gYXJyICYmIGFycltpXTsgKytpKSB7XG4gICAgICAgICAgICAgIGlmIChjYiA9PSBmbikgeyBhcnIuc3BsaWNlKGktLSwgMSk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgeyBkZWxldGUgY2FsbGJhY2tzW2V2ZW50XTsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gdGhlIGdpdmVuIGBldmVudGAgYW5kXG4gICAgICogZXhlY3V0ZSB0aGUgYGNhbGxiYWNrYCBhdCBtb3N0IG9uY2VcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvbmU6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgICAgZnVuY3Rpb24gb24oKSB7XG4gICAgICAgICAgZWwub2ZmKGV2ZW50LCBvbik7XG4gICAgICAgICAgZm4uYXBwbHkoZWwsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsLm9uKGV2ZW50LCBvbilcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZSBhbGwgY2FsbGJhY2sgZnVuY3Rpb25zIHRoYXQgbGlzdGVuIHRvXG4gICAgICogdGhlIGdpdmVuIGBldmVudGBcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgdHJpZ2dlcjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcblxuXG4gICAgICAgIC8vIGdldHRpbmcgdGhlIGFyZ3VtZW50c1xuICAgICAgICB2YXIgYXJnbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDEsXG4gICAgICAgICAgYXJncyA9IG5ldyBBcnJheShhcmdsZW4pLFxuICAgICAgICAgIGZucyxcbiAgICAgICAgICBmbixcbiAgICAgICAgICBpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcmdsZW47IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHMkMVtpICsgMV07IC8vIHNraXAgZmlyc3QgYXJndW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGZucyA9IHNsaWNlLmNhbGwoY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSwgMCk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgZm4gPSBmbnNbaV07ICsraSkge1xuICAgICAgICAgIGZuLmFwcGx5KGVsLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYWxsYmFja3NbJyonXSAmJiBldmVudCAhPSAnKicpXG4gICAgICAgICAgeyBlbC50cmlnZ2VyLmFwcGx5KGVsLCBbJyonLCBldmVudF0uY29uY2F0KGFyZ3MpKTsgfVxuXG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGVsXG5cbn07XG5cbi8qKlxuICogU3BlY2lhbGl6ZWQgZnVuY3Rpb24gZm9yIGxvb3BpbmcgYW4gYXJyYXktbGlrZSBjb2xsZWN0aW9uIHdpdGggYGVhY2g9e31gXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gbGlzdCAtIGNvbGxlY3Rpb24gb2YgaXRlbXNcbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMgeyBBcnJheSB9IHRoZSBhcnJheSBsb29wZWRcbiAqL1xuZnVuY3Rpb24gZWFjaChsaXN0LCBmbikge1xuICB2YXIgbGVuID0gbGlzdCA/IGxpc3QubGVuZ3RoIDogMDtcbiAgdmFyIGkgPSAwO1xuICBmb3IgKDsgaSA8IGxlbjsgKytpKSB7XG4gICAgZm4obGlzdFtpXSwgaSk7XG4gIH1cbiAgcmV0dXJuIGxpc3Rcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGFycmF5IGNvbnRhaW5zIGFuIGl0ZW1cbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBhcnJheSAtIHRhcmdldCBhcnJheVxuICogQHBhcmFtICAgeyAqIH0gaXRlbSAtIGl0ZW0gdG8gdGVzdFxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBjb250YWlucyhhcnJheSwgaXRlbSkge1xuICByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKSAhPT0gLTFcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgc3RyaW5nIGNvbnRhaW5pbmcgZGFzaGVzIHRvIGNhbWVsIGNhc2VcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc3RyIC0gaW5wdXQgc3RyaW5nXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG15LXN0cmluZyAtPiBteVN0cmluZ1xuICovXG5mdW5jdGlvbiB0b0NhbWVsKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLy0oXFx3KS9nLCBmdW5jdGlvbiAoXywgYykgeyByZXR1cm4gYy50b1VwcGVyQ2FzZSgpOyB9KVxufVxuXG4vKipcbiAqIEZhc3RlciBTdHJpbmcgc3RhcnRzV2l0aCBhbHRlcm5hdGl2ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzdHIgLSBzb3VyY2Ugc3RyaW5nXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHZhbHVlIC0gdGVzdCBzdHJpbmdcbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gc3RhcnRzV2l0aChzdHIsIHZhbHVlKSB7XG4gIHJldHVybiBzdHIuc2xpY2UoMCwgdmFsdWUubGVuZ3RoKSA9PT0gdmFsdWVcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gc2V0IGFuIGltbXV0YWJsZSBwcm9wZXJ0eVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBlbCAtIG9iamVjdCB3aGVyZSB0aGUgbmV3IHByb3BlcnR5IHdpbGwgYmUgc2V0XG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGtleSAtIG9iamVjdCBrZXkgd2hlcmUgdGhlIG5ldyBwcm9wZXJ0eSB3aWxsIGJlIHN0b3JlZFxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLSB2YWx1ZSBvZiB0aGUgbmV3IHByb3BlcnR5XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdGlvbnMgLSBzZXQgdGhlIHByb3Blcnkgb3ZlcnJpZGluZyB0aGUgZGVmYXVsdCBvcHRpb25zXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IC0gdGhlIGluaXRpYWwgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGVsLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbCwga2V5LCBleHRlbmQoe1xuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0sIG9wdGlvbnMpKTtcbiAgcmV0dXJuIGVsXG59XG5cbi8qKlxuICogRXh0ZW5kIGFueSBvYmplY3Qgd2l0aCBvdGhlciBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHNyYyAtIHNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gdGhlIHJlc3VsdGluZyBleHRlbmRlZCBvYmplY3RcbiAqXG4gKiB2YXIgb2JqID0geyBmb286ICdiYXonIH1cbiAqIGV4dGVuZChvYmosIHtiYXI6ICdiYXInLCBmb286ICdiYXInfSlcbiAqIGNvbnNvbGUubG9nKG9iaikgPT4ge2JhcjogJ2JhcicsIGZvbzogJ2Jhcid9XG4gKlxuICovXG5mdW5jdGlvbiBleHRlbmQoc3JjKSB7XG4gIHZhciBvYmosIGFyZ3MgPSBhcmd1bWVudHM7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChvYmogPSBhcmdzW2ldKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgcHJvcGVydHkgb2YgdGhlIHNvdXJjZSBvYmplY3QgY291bGQgYmUgb3ZlcnJpZGRlblxuICAgICAgICBpZiAoaXNXcml0YWJsZShzcmMsIGtleSkpXG4gICAgICAgICAgeyBzcmNba2V5XSA9IG9ialtrZXldOyB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzcmNcbn1cblxudmFyIG1pc2MgPSBPYmplY3QuZnJlZXplKHtcblx0ZWFjaDogZWFjaCxcblx0Y29udGFpbnM6IGNvbnRhaW5zLFxuXHR0b0NhbWVsOiB0b0NhbWVsLFxuXHRzdGFydHNXaXRoOiBzdGFydHNXaXRoLFxuXHRkZWZpbmVQcm9wZXJ0eTogZGVmaW5lUHJvcGVydHksXG5cdGV4dGVuZDogZXh0ZW5kXG59KTtcblxudmFyIHNldHRpbmdzJDEgPSBleHRlbmQoT2JqZWN0LmNyZWF0ZShicmFja2V0cy5zZXR0aW5ncyksIHtcbiAgc2tpcEFub255bW91c1RhZ3M6IHRydWVcbn0pO1xuXG4vKipcbiAqIFRyaWdnZXIgRE9NIGV2ZW50c1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IGRvbSAtIGRvbSBlbGVtZW50IHRhcmdldCBvZiB0aGUgZXZlbnRcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBoYW5kbGVyIC0gdXNlciBmdW5jdGlvblxuICogQHBhcmFtICAgeyBPYmplY3QgfSBlIC0gZXZlbnQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUV2ZW50KGRvbSwgaGFuZGxlciwgZSkge1xuICB2YXIgcHRhZyA9IHRoaXMuX18ucGFyZW50LFxuICAgIGl0ZW0gPSB0aGlzLl9fLml0ZW07XG5cbiAgaWYgKCFpdGVtKVxuICAgIHsgd2hpbGUgKHB0YWcgJiYgIWl0ZW0pIHtcbiAgICAgIGl0ZW0gPSBwdGFnLl9fLml0ZW07XG4gICAgICBwdGFnID0gcHRhZy5fXy5wYXJlbnQ7XG4gICAgfSB9XG5cbiAgLy8gb3ZlcnJpZGUgdGhlIGV2ZW50IHByb3BlcnRpZXNcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKGlzV3JpdGFibGUoZSwgJ2N1cnJlbnRUYXJnZXQnKSkgeyBlLmN1cnJlbnRUYXJnZXQgPSBkb207IH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKGlzV3JpdGFibGUoZSwgJ3RhcmdldCcpKSB7IGUudGFyZ2V0ID0gZS5zcmNFbGVtZW50OyB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChpc1dyaXRhYmxlKGUsICd3aGljaCcpKSB7IGUud2hpY2ggPSBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZTsgfVxuXG4gIGUuaXRlbSA9IGl0ZW07XG5cbiAgaGFuZGxlci5jYWxsKHRoaXMsIGUpO1xuXG4gIGlmICghZS5wcmV2ZW50VXBkYXRlKSB7XG4gICAgdmFyIHAgPSBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcodGhpcyk7XG4gICAgLy8gZml4ZXMgIzIwODNcbiAgICBpZiAocC5pc01vdW50ZWQpIHsgcC51cGRhdGUoKTsgfVxuICB9XG59XG5cbi8qKlxuICogQXR0YWNoIGFuIGV2ZW50IHRvIGEgRE9NIG5vZGVcbiAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgLSBldmVudCBuYW1lXG4gKiBAcGFyYW0geyBGdW5jdGlvbiB9IGhhbmRsZXIgLSBldmVudCBjYWxsYmFja1xuICogQHBhcmFtIHsgT2JqZWN0IH0gZG9tIC0gZG9tIG5vZGVcbiAqIEBwYXJhbSB7IFRhZyB9IHRhZyAtIHRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBzZXRFdmVudEhhbmRsZXIobmFtZSwgaGFuZGxlciwgZG9tLCB0YWcpIHtcbiAgdmFyIGV2ZW50TmFtZSxcbiAgICBjYiA9IGhhbmRsZUV2ZW50LmJpbmQodGFnLCBkb20sIGhhbmRsZXIpO1xuXG4gIC8vIGF2b2lkIHRvIGJpbmQgdHdpY2UgdGhlIHNhbWUgZXZlbnRcbiAgLy8gcG9zc2libGUgZml4IGZvciAjMjMzMlxuICBkb21bbmFtZV0gPSBudWxsO1xuXG4gIC8vIG5vcm1hbGl6ZSBldmVudCBuYW1lXG4gIGV2ZW50TmFtZSA9IG5hbWUucmVwbGFjZShSRV9FVkVOVFNfUFJFRklYLCAnJyk7XG5cbiAgLy8gY2FjaGUgdGhlIGxpc3RlbmVyIGludG8gdGhlIGxpc3RlbmVycyBhcnJheVxuICBpZiAoIWNvbnRhaW5zKHRhZy5fXy5saXN0ZW5lcnMsIGRvbSkpIHsgdGFnLl9fLmxpc3RlbmVycy5wdXNoKGRvbSk7IH1cbiAgaWYgKCFkb21bUklPVF9FVkVOVFNfS0VZXSkgeyBkb21bUklPVF9FVkVOVFNfS0VZXSA9IHt9OyB9XG4gIGlmIChkb21bUklPVF9FVkVOVFNfS0VZXVtuYW1lXSkgeyBkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGRvbVtSSU9UX0VWRU5UU19LRVldW25hbWVdKTsgfVxuXG4gIGRvbVtSSU9UX0VWRU5UU19LRVldW25hbWVdID0gY2I7XG4gIGRvbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2IsIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgZHluYW1pY2FsbHkgY3JlYXRlZCBkYXRhLWlzIHRhZ3Mgd2l0aCBjaGFuZ2luZyBleHByZXNzaW9uc1xuICogQHBhcmFtIHsgT2JqZWN0IH0gZXhwciAtIGV4cHJlc3Npb24gdGFnIGFuZCBleHByZXNzaW9uIGluZm9cbiAqIEBwYXJhbSB7IFRhZyB9ICAgIHBhcmVudCAtIHBhcmVudCBmb3IgdGFnIGNyZWF0aW9uXG4gKiBAcGFyYW0geyBTdHJpbmcgfSB0YWdOYW1lIC0gdGFnIGltcGxlbWVudGF0aW9uIHdlIHdhbnQgdG8gdXNlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZURhdGFJcyhleHByLCBwYXJlbnQsIHRhZ05hbWUpIHtcbiAgdmFyIGNvbmYsIGlzVmlydHVhbCwgaGVhZCwgcmVmO1xuXG4gIGlmIChleHByLnRhZyAmJiBleHByLnRhZ05hbWUgPT09IHRhZ05hbWUpIHtcbiAgICBleHByLnRhZy51cGRhdGUoKTtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlzVmlydHVhbCA9IGV4cHIuZG9tLnRhZ05hbWUgPT09ICdWSVJUVUFMJztcbiAgLy8gc3luYyBfcGFyZW50IHRvIGFjY29tbW9kYXRlIGNoYW5naW5nIHRhZ25hbWVzXG4gIGlmIChleHByLnRhZykge1xuICAgIC8vIG5lZWQgcGxhY2Vob2xkZXIgYmVmb3JlIHVubW91bnRcbiAgICBpZihpc1ZpcnR1YWwpIHtcbiAgICAgIGhlYWQgPSBleHByLnRhZy5fXy5oZWFkO1xuICAgICAgcmVmID0gY3JlYXRlRE9NUGxhY2Vob2xkZXIoKTtcbiAgICAgIGhlYWQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVmLCBoZWFkKTtcbiAgICB9XG5cbiAgICBleHByLnRhZy51bm1vdW50KHRydWUpO1xuICB9XG5cbiAgaWYgKCFpc1N0cmluZyh0YWdOYW1lKSkgeyByZXR1cm4gfVxuXG4gIGV4cHIuaW1wbCA9IF9fVEFHX0lNUExbdGFnTmFtZV07XG4gIGNvbmYgPSB7cm9vdDogZXhwci5kb20sIHBhcmVudDogcGFyZW50LCBoYXNJbXBsOiB0cnVlLCB0YWdOYW1lOiB0YWdOYW1lfTtcbiAgZXhwci50YWcgPSBpbml0Q2hpbGRUYWcoZXhwci5pbXBsLCBjb25mLCBleHByLmRvbS5pbm5lckhUTUwsIHBhcmVudCk7XG4gIGVhY2goZXhwci5hdHRycywgZnVuY3Rpb24gKGEpIHsgcmV0dXJuIHNldEF0dHIoZXhwci50YWcucm9vdCwgYS5uYW1lLCBhLnZhbHVlKTsgfSk7XG4gIGV4cHIudGFnTmFtZSA9IHRhZ05hbWU7XG4gIGV4cHIudGFnLm1vdW50KCk7XG4gIGlmIChpc1ZpcnR1YWwpXG4gICAgeyBtYWtlUmVwbGFjZVZpcnR1YWwoZXhwci50YWcsIHJlZiB8fCBleHByLnRhZy5yb290KTsgfSAvLyByb290IGV4aXN0IGZpcnN0IHRpbWUsIGFmdGVyIHVzZSBwbGFjZWhvbGRlclxuXG4gIC8vIHBhcmVudCBpcyB0aGUgcGxhY2Vob2xkZXIgdGFnLCBub3QgdGhlIGR5bmFtaWMgdGFnIHNvIGNsZWFuIHVwXG4gIHBhcmVudC5fXy5vblVubW91bnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGVsTmFtZSA9IGV4cHIudGFnLm9wdHMuZGF0YUlzLFxuICAgICAgdGFncyA9IGV4cHIudGFnLnBhcmVudC50YWdzLFxuICAgICAgX3RhZ3MgPSBleHByLnRhZy5fXy5wYXJlbnQudGFncztcbiAgICBhcnJheWlzaFJlbW92ZSh0YWdzLCBkZWxOYW1lLCBleHByLnRhZyk7XG4gICAgYXJyYXlpc2hSZW1vdmUoX3RhZ3MsIGRlbE5hbWUsIGV4cHIudGFnKTtcbiAgICBleHByLnRhZy51bm1vdW50KCk7XG4gIH07XG59XG5cbi8qKlxuICogTm9tYWxpemUgYW55IGF0dHJpYnV0ZSByZW1vdmluZyB0aGUgXCJyaW90LVwiIHByZWZpeFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBhdHRyTmFtZSAtIG9yaWdpbmFsIGF0dHJpYnV0ZSBuYW1lXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IHZhbGlkIGh0bWwgYXR0cmlidXRlIG5hbWVcbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplQXR0ck5hbWUoYXR0ck5hbWUpIHtcbiAgaWYgKCFhdHRyTmFtZSkgeyByZXR1cm4gbnVsbCB9XG4gIGF0dHJOYW1lID0gYXR0ck5hbWUucmVwbGFjZShBVFRSU19QUkVGSVgsICcnKTtcbiAgaWYgKENBU0VfU0VOU0lUSVZFX0FUVFJJQlVURVNbYXR0ck5hbWVdKSB7IGF0dHJOYW1lID0gQ0FTRV9TRU5TSVRJVkVfQVRUUklCVVRFU1thdHRyTmFtZV07IH1cbiAgcmV0dXJuIGF0dHJOYW1lXG59XG5cbi8qKlxuICogVXBkYXRlIG9uIHNpbmdsZSB0YWcgZXhwcmVzc2lvblxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyBPYmplY3QgfSBleHByIC0gZXhwcmVzc2lvbiBsb2dpY1xuICogQHJldHVybnMgeyB1bmRlZmluZWQgfVxuICovXG5mdW5jdGlvbiB1cGRhdGVFeHByZXNzaW9uKGV4cHIpIHtcbiAgaWYgKHRoaXMucm9vdCAmJiBnZXRBdHRyKHRoaXMucm9vdCwndmlydHVhbGl6ZWQnKSkgeyByZXR1cm4gfVxuXG4gIHZhciBkb20gPSBleHByLmRvbSxcbiAgICAvLyByZW1vdmUgdGhlIHJpb3QtIHByZWZpeFxuICAgIGF0dHJOYW1lID0gbm9ybWFsaXplQXR0ck5hbWUoZXhwci5hdHRyKSxcbiAgICBpc1RvZ2dsZSA9IGNvbnRhaW5zKFtTSE9XX0RJUkVDVElWRSwgSElERV9ESVJFQ1RJVkVdLCBhdHRyTmFtZSksXG4gICAgaXNWaXJ0dWFsID0gZXhwci5yb290ICYmIGV4cHIucm9vdC50YWdOYW1lID09PSAnVklSVFVBTCcsXG4gICAgcGFyZW50ID0gZG9tICYmIChleHByLnBhcmVudCB8fCBkb20ucGFyZW50Tm9kZSksXG4gICAgLy8gZGV0ZWN0IHRoZSBzdHlsZSBhdHRyaWJ1dGVzXG4gICAgaXNTdHlsZUF0dHIgPSBhdHRyTmFtZSA9PT0gJ3N0eWxlJyxcbiAgICBpc0NsYXNzQXR0ciA9IGF0dHJOYW1lID09PSAnY2xhc3MnLFxuICAgIGhhc1ZhbHVlLFxuICAgIGlzT2JqLFxuICAgIHZhbHVlO1xuXG4gIC8vIGlmIGl0J3MgYSB0YWcgd2UgY291bGQgdG90YWxseSBza2lwIHRoZSByZXN0XG4gIGlmIChleHByLl9yaW90X2lkKSB7XG4gICAgaWYgKGV4cHIuaXNNb3VudGVkKSB7XG4gICAgICBleHByLnVwZGF0ZSgpO1xuICAgIC8vIGlmIGl0IGhhc24ndCBiZWVuIG1vdW50ZWQgeWV0LCBkbyB0aGF0IG5vdy5cbiAgICB9IGVsc2Uge1xuICAgICAgZXhwci5tb3VudCgpO1xuICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICBtYWtlUmVwbGFjZVZpcnR1YWwoZXhwciwgZXhwci5yb290KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cbiAgLy8gaWYgdGhpcyBleHByZXNzaW9uIGhhcyB0aGUgdXBkYXRlIG1ldGhvZCBpdCBtZWFucyBpdCBjYW4gaGFuZGxlIHRoZSBET00gY2hhbmdlcyBieSBpdHNlbGZcbiAgaWYgKGV4cHIudXBkYXRlKSB7IHJldHVybiBleHByLnVwZGF0ZSgpIH1cblxuICAvLyAuLi5pdCBzZWVtcyB0byBiZSBhIHNpbXBsZSBleHByZXNzaW9uIHNvIHdlIHRyeSB0byBjYWxjdWxhdCBpdHMgdmFsdWVcbiAgdmFsdWUgPSB0bXBsKGV4cHIuZXhwciwgaXNUb2dnbGUgPyBleHRlbmQoe30sIE9iamVjdC5jcmVhdGUodGhpcy5wYXJlbnQpLCB0aGlzKSA6IHRoaXMpO1xuICBoYXNWYWx1ZSA9ICFpc0JsYW5rKHZhbHVlKTtcbiAgaXNPYmogPSBpc09iamVjdCh2YWx1ZSk7XG5cbiAgLy8gY29udmVydCB0aGUgc3R5bGUvY2xhc3Mgb2JqZWN0cyB0byBzdHJpbmdzXG4gIGlmIChpc09iaikge1xuICAgIGlzT2JqID0gIWlzQ2xhc3NBdHRyICYmICFpc1N0eWxlQXR0cjtcbiAgICBpZiAoaXNDbGFzc0F0dHIpIHtcbiAgICAgIHZhbHVlID0gdG1wbChKU09OLnN0cmluZ2lmeSh2YWx1ZSksIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNTdHlsZUF0dHIpIHtcbiAgICAgIHZhbHVlID0gc3R5bGVPYmplY3RUb1N0cmluZyh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gcmVtb3ZlIG9yaWdpbmFsIGF0dHJpYnV0ZVxuICBpZiAoZXhwci5hdHRyICYmICghZXhwci5pc0F0dHJSZW1vdmVkIHx8ICFoYXNWYWx1ZSB8fCB2YWx1ZSA9PT0gZmFsc2UpKSB7XG4gICAgcmVtQXR0cihkb20sIGV4cHIuYXR0cik7XG4gICAgZXhwci5pc0F0dHJSZW1vdmVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIGZvciB0aGUgYm9vbGVhbiBhdHRyaWJ1dGVzIHdlIGRvbid0IG5lZWQgdGhlIHZhbHVlXG4gIC8vIHdlIGNhbiBjb252ZXJ0IGl0IHRvIGNoZWNrZWQ9dHJ1ZSB0byBjaGVja2VkPWNoZWNrZWRcbiAgaWYgKGV4cHIuYm9vbCkgeyB2YWx1ZSA9IHZhbHVlID8gYXR0ck5hbWUgOiBmYWxzZTsgfVxuICBpZiAoZXhwci5pc1J0YWcpIHsgcmV0dXJuIHVwZGF0ZURhdGFJcyhleHByLCB0aGlzLCB2YWx1ZSkgfVxuICBpZiAoZXhwci53YXNQYXJzZWRPbmNlICYmIGV4cHIudmFsdWUgPT09IHZhbHVlKSB7IHJldHVybiB9XG5cbiAgLy8gdXBkYXRlIHRoZSBleHByZXNzaW9uIHZhbHVlXG4gIGV4cHIudmFsdWUgPSB2YWx1ZTtcbiAgZXhwci53YXNQYXJzZWRPbmNlID0gdHJ1ZTtcblxuICAvLyBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0IHdlIGNhbiBub3QgZG8gbXVjaCBtb3JlIHdpdGggaXRcbiAgaWYgKGlzT2JqICYmICFpc1RvZ2dsZSkgeyByZXR1cm4gfVxuICAvLyBhdm9pZCB0byByZW5kZXIgdW5kZWZpbmVkL251bGwgdmFsdWVzXG4gIGlmIChpc0JsYW5rKHZhbHVlKSkgeyB2YWx1ZSA9ICcnOyB9XG5cbiAgLy8gdGV4dGFyZWEgYW5kIHRleHQgbm9kZXMgaGF2ZSBubyBhdHRyaWJ1dGUgbmFtZVxuICBpZiAoIWF0dHJOYW1lKSB7XG4gICAgLy8gYWJvdXQgIzgxNSB3L28gcmVwbGFjZTogdGhlIGJyb3dzZXIgY29udmVydHMgdGhlIHZhbHVlIHRvIGEgc3RyaW5nLFxuICAgIC8vIHRoZSBjb21wYXJpc29uIGJ5IFwiPT1cIiBkb2VzIHRvbywgYnV0IG5vdCBpbiB0aGUgc2VydmVyXG4gICAgdmFsdWUgKz0gJyc7XG4gICAgLy8gdGVzdCBmb3IgcGFyZW50IGF2b2lkcyBlcnJvciB3aXRoIGludmFsaWQgYXNzaWdubWVudCB0byBub2RlVmFsdWVcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICAvLyBjYWNoZSB0aGUgcGFyZW50IG5vZGUgYmVjYXVzZSBzb21laG93IGl0IHdpbGwgYmVjb21lIG51bGwgb24gSUVcbiAgICAgIC8vIG9uIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgZXhwci5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICBpZiAocGFyZW50LnRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgcGFyZW50LnZhbHVlID0gdmFsdWU7ICAgICAgICAgICAgICAgICAgICAvLyAjMTExM1xuICAgICAgICBpZiAoIUlFX1ZFUlNJT04pIHsgZG9tLm5vZGVWYWx1ZSA9IHZhbHVlOyB9ICAvLyAjMTYyNSBJRSB0aHJvd3MgaGVyZSwgbm9kZVZhbHVlXG4gICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIGJlIGF2YWlsYWJsZSBvbiAndXBkYXRlZCdcbiAgICAgIGVsc2UgeyBkb20ubm9kZVZhbHVlID0gdmFsdWU7IH1cbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuXG4gIC8vIGV2ZW50IGhhbmRsZXJcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgc2V0RXZlbnRIYW5kbGVyKGF0dHJOYW1lLCB2YWx1ZSwgZG9tLCB0aGlzKTtcbiAgLy8gc2hvdyAvIGhpZGVcbiAgfSBlbHNlIGlmIChpc1RvZ2dsZSkge1xuICAgIHRvZ2dsZVZpc2liaWxpdHkoZG9tLCBhdHRyTmFtZSA9PT0gSElERV9ESVJFQ1RJVkUgPyAhdmFsdWUgOiB2YWx1ZSk7XG4gIC8vIGhhbmRsZSBhdHRyaWJ1dGVzXG4gIH0gZWxzZSB7XG4gICAgaWYgKGV4cHIuYm9vbCkge1xuICAgICAgZG9tW2F0dHJOYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChhdHRyTmFtZSA9PT0gJ3ZhbHVlJyAmJiBkb20udmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICBkb20udmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaGFzVmFsdWUgJiYgdmFsdWUgIT09IGZhbHNlKSB7XG4gICAgICBzZXRBdHRyKGRvbSwgYXR0ck5hbWUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBtYWtlIHN1cmUgdGhhdCBpbiBjYXNlIG9mIHN0eWxlIGNoYW5nZXNcbiAgICAvLyB0aGUgZWxlbWVudCBzdGF5cyBoaWRkZW5cbiAgICBpZiAoaXNTdHlsZUF0dHIgJiYgZG9tLmhpZGRlbikgeyB0b2dnbGVWaXNpYmlsaXR5KGRvbSwgZmFsc2UpOyB9XG4gIH1cbn1cblxuLyoqXG4gKiBVcGRhdGUgYWxsIHRoZSBleHByZXNzaW9ucyBpbiBhIFRhZyBpbnN0YW5jZVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyBBcnJheSB9IGV4cHJlc3Npb25zIC0gZXhwcmVzc2lvbiB0aGF0IG11c3QgYmUgcmUgZXZhbHVhdGVkXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUFsbEV4cHJlc3Npb25zKGV4cHJlc3Npb25zKSB7XG4gIGVhY2goZXhwcmVzc2lvbnMsIHVwZGF0ZUV4cHJlc3Npb24uYmluZCh0aGlzKSk7XG59XG5cbnZhciBJZkV4cHIgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoZG9tLCB0YWcsIGV4cHIpIHtcbiAgICByZW1BdHRyKGRvbSwgQ09ORElUSU9OQUxfRElSRUNUSVZFKTtcbiAgICB0aGlzLnRhZyA9IHRhZztcbiAgICB0aGlzLmV4cHIgPSBleHByO1xuICAgIHRoaXMuc3R1YiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICB0aGlzLnByaXN0aW5lID0gZG9tO1xuXG4gICAgdmFyIHAgPSBkb20ucGFyZW50Tm9kZTtcbiAgICBwLmluc2VydEJlZm9yZSh0aGlzLnN0dWIsIGRvbSk7XG4gICAgcC5yZW1vdmVDaGlsZChkb20pO1xuXG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdGhpcy52YWx1ZSA9IHRtcGwodGhpcy5leHByLCB0aGlzLnRhZyk7XG5cbiAgICBpZiAodGhpcy52YWx1ZSAmJiAhdGhpcy5jdXJyZW50KSB7IC8vIGluc2VydFxuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5wcmlzdGluZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICB0aGlzLnN0dWIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5jdXJyZW50LCB0aGlzLnN0dWIpO1xuICAgICAgdGhpcy5leHByZXNzaW9ucyA9IFtdO1xuICAgICAgcGFyc2VFeHByZXNzaW9ucy5hcHBseSh0aGlzLnRhZywgW3RoaXMuY3VycmVudCwgdGhpcy5leHByZXNzaW9ucywgdHJ1ZV0pO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMudmFsdWUgJiYgdGhpcy5jdXJyZW50KSB7IC8vIHJlbW92ZVxuICAgICAgdW5tb3VudEFsbCh0aGlzLmV4cHJlc3Npb25zKTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnQuX3RhZykge1xuICAgICAgICB0aGlzLmN1cnJlbnQuX3RhZy51bm1vdW50KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xuICAgICAgdGhpcy5leHByZXNzaW9ucyA9IFtdO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZhbHVlKSB7IHVwZGF0ZUFsbEV4cHJlc3Npb25zLmNhbGwodGhpcy50YWcsIHRoaXMuZXhwcmVzc2lvbnMpOyB9XG4gIH0sXG4gIHVubW91bnQ6IGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgdW5tb3VudEFsbCh0aGlzLmV4cHJlc3Npb25zIHx8IFtdKTtcbiAgfVxufTtcblxudmFyIFJlZkV4cHIgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoZG9tLCBwYXJlbnQsIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICB0aGlzLmF0dHIgPSBhdHRyTmFtZTtcbiAgICB0aGlzLnJhd1ZhbHVlID0gYXR0clZhbHVlO1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuaGFzRXhwID0gdG1wbC5oYXNFeHByKGF0dHJWYWx1ZSk7XG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIG9sZCA9IHRoaXMudmFsdWU7XG4gICAgdmFyIGN1c3RvbVBhcmVudCA9IHRoaXMucGFyZW50ICYmIGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyh0aGlzLnBhcmVudCk7XG4gICAgLy8gaWYgdGhlIHJlZmVyZW5jZWQgZWxlbWVudCBpcyBhIGN1c3RvbSB0YWcsIHRoZW4gd2Ugc2V0IHRoZSB0YWcgaXRzZWxmLCByYXRoZXIgdGhhbiBET01cbiAgICB2YXIgdGFnT3JEb20gPSB0aGlzLmRvbS5fX3JlZiB8fCB0aGlzLnRhZyB8fCB0aGlzLmRvbTtcblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLmhhc0V4cCA/IHRtcGwodGhpcy5yYXdWYWx1ZSwgdGhpcy5wYXJlbnQpIDogdGhpcy5yYXdWYWx1ZTtcblxuICAgIC8vIHRoZSBuYW1lIGNoYW5nZWQsIHNvIHdlIG5lZWQgdG8gcmVtb3ZlIGl0IGZyb20gdGhlIG9sZCBrZXkgKGlmIHByZXNlbnQpXG4gICAgaWYgKCFpc0JsYW5rKG9sZCkgJiYgY3VzdG9tUGFyZW50KSB7IGFycmF5aXNoUmVtb3ZlKGN1c3RvbVBhcmVudC5yZWZzLCBvbGQsIHRhZ09yRG9tKTsgfVxuICAgIGlmICghaXNCbGFuayh0aGlzLnZhbHVlKSAmJiBpc1N0cmluZyh0aGlzLnZhbHVlKSkge1xuICAgICAgLy8gYWRkIGl0IHRvIHRoZSByZWZzIG9mIHBhcmVudCB0YWcgKHRoaXMgYmVoYXZpb3Igd2FzIGNoYW5nZWQgPj0zLjApXG4gICAgICBpZiAoY3VzdG9tUGFyZW50KSB7IGFycmF5aXNoQWRkKFxuICAgICAgICBjdXN0b21QYXJlbnQucmVmcyxcbiAgICAgICAgdGhpcy52YWx1ZSxcbiAgICAgICAgdGFnT3JEb20sXG4gICAgICAgIC8vIHVzZSBhbiBhcnJheSBpZiBpdCdzIGEgbG9vcGVkIG5vZGUgYW5kIHRoZSByZWYgaXMgbm90IGFuIGV4cHJlc3Npb25cbiAgICAgICAgbnVsbCxcbiAgICAgICAgdGhpcy5wYXJlbnQuX18uaW5kZXhcbiAgICAgICk7IH1cblxuICAgICAgaWYgKHRoaXMudmFsdWUgIT09IG9sZCkge1xuICAgICAgICBzZXRBdHRyKHRoaXMuZG9tLCB0aGlzLmF0dHIsIHRoaXMudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1BdHRyKHRoaXMuZG9tLCB0aGlzLmF0dHIpO1xuICAgIH1cblxuICAgIC8vIGNhY2hlIHRoZSByZWYgYm91bmQgdG8gdGhpcyBkb20gbm9kZVxuICAgIC8vIHRvIHJldXNlIGl0IGluIGZ1dHVyZSAoc2VlIGFsc28gIzIzMjkpXG4gICAgaWYgKCF0aGlzLmRvbS5fX3JlZikgeyB0aGlzLmRvbS5fX3JlZiA9IHRhZ09yRG9tOyB9XG4gIH0sXG4gIHVubW91bnQ6IGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgdmFyIHRhZ09yRG9tID0gdGhpcy50YWcgfHwgdGhpcy5kb207XG4gICAgdmFyIGN1c3RvbVBhcmVudCA9IHRoaXMucGFyZW50ICYmIGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyh0aGlzLnBhcmVudCk7XG4gICAgaWYgKCFpc0JsYW5rKHRoaXMudmFsdWUpICYmIGN1c3RvbVBhcmVudClcbiAgICAgIHsgYXJyYXlpc2hSZW1vdmUoY3VzdG9tUGFyZW50LnJlZnMsIHRoaXMudmFsdWUsIHRhZ09yRG9tKTsgfVxuICB9XG59O1xuXG4vKipcbiAqIENvbnZlcnQgdGhlIGl0ZW0gbG9vcGVkIGludG8gYW4gb2JqZWN0IHVzZWQgdG8gZXh0ZW5kIHRoZSBjaGlsZCB0YWcgcHJvcGVydGllc1xuICogQHBhcmFtICAgeyBPYmplY3QgfSBleHByIC0gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGtleXMgdXNlZCB0byBleHRlbmQgdGhlIGNoaWxkcmVuIHRhZ3NcbiAqIEBwYXJhbSAgIHsgKiB9IGtleSAtIHZhbHVlIHRvIGFzc2lnbiB0byB0aGUgbmV3IG9iamVjdCByZXR1cm5lZFxuICogQHBhcmFtICAgeyAqIH0gdmFsIC0gdmFsdWUgY29udGFpbmluZyB0aGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gaW4gdGhlIGFycmF5XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGJhc2UgLSBwcm90b3R5cGUgb2JqZWN0IGZvciB0aGUgbmV3IGl0ZW1cbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gLSBuZXcgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHZhbHVlcyBvZiB0aGUgb3JpZ2luYWwgaXRlbVxuICpcbiAqIFRoZSB2YXJpYWJsZXMgJ2tleScgYW5kICd2YWwnIGFyZSBhcmJpdHJhcnkuXG4gKiBUaGV5IGRlcGVuZCBvbiB0aGUgY29sbGVjdGlvbiB0eXBlIGxvb3BlZCAoQXJyYXksIE9iamVjdClcbiAqIGFuZCBvbiB0aGUgZXhwcmVzc2lvbiB1c2VkIG9uIHRoZSBlYWNoIHRhZ1xuICpcbiAqL1xuZnVuY3Rpb24gbWtpdGVtKGV4cHIsIGtleSwgdmFsLCBiYXNlKSB7XG4gIHZhciBpdGVtID0gYmFzZSA/IE9iamVjdC5jcmVhdGUoYmFzZSkgOiB7fTtcbiAgaXRlbVtleHByLmtleV0gPSBrZXk7XG4gIGlmIChleHByLnBvcykgeyBpdGVtW2V4cHIucG9zXSA9IHZhbDsgfVxuICByZXR1cm4gaXRlbVxufVxuXG4vKipcbiAqIFVubW91bnQgdGhlIHJlZHVuZGFudCB0YWdzXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gaXRlbXMgLSBhcnJheSBjb250YWluaW5nIHRoZSBjdXJyZW50IGl0ZW1zIHRvIGxvb3BcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSB0YWdzIC0gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGNoaWxkcmVuIHRhZ3NcbiAqL1xuZnVuY3Rpb24gdW5tb3VudFJlZHVuZGFudChpdGVtcywgdGFncykge1xuICB2YXIgaSA9IHRhZ3MubGVuZ3RoLFxuICAgIGogPSBpdGVtcy5sZW5ndGg7XG5cbiAgd2hpbGUgKGkgPiBqKSB7XG4gICAgaS0tO1xuICAgIHJlbW92ZS5hcHBseSh0YWdzW2ldLCBbdGFncywgaV0pO1xuICB9XG59XG5cblxuLyoqXG4gKiBSZW1vdmUgYSBjaGlsZCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBBcnJheSB9IHRhZ3MgLSB0YWdzIGNvbGxlY3Rpb25cbiAqIEBwYXJhbSAgIHsgTnVtYmVyIH0gaSAtIGluZGV4IG9mIHRoZSB0YWcgdG8gcmVtb3ZlXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZSh0YWdzLCBpKSB7XG4gIHRhZ3Muc3BsaWNlKGksIDEpO1xuICB0aGlzLnVubW91bnQoKTtcbiAgYXJyYXlpc2hSZW1vdmUodGhpcy5wYXJlbnQsIHRoaXMsIHRoaXMuX18udGFnTmFtZSwgdHJ1ZSk7XG59XG5cbi8qKlxuICogTW92ZSB0aGUgbmVzdGVkIGN1c3RvbSB0YWdzIGluIG5vbiBjdXN0b20gbG9vcCB0YWdzXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgTnVtYmVyIH0gaSAtIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIGxvb3AgdGFnXG4gKi9cbmZ1bmN0aW9uIG1vdmVOZXN0ZWRUYWdzKGkpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgZWFjaChPYmplY3Qua2V5cyh0aGlzLnRhZ3MpLCBmdW5jdGlvbiAodGFnTmFtZSkge1xuICAgIG1vdmVDaGlsZFRhZy5hcHBseSh0aGlzJDEudGFnc1t0YWdOYW1lXSwgW3RhZ05hbWUsIGldKTtcbiAgfSk7XG59XG5cbi8qKlxuICogTW92ZSBhIGNoaWxkIHRhZ1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIGRvbSBub2RlIGNvbnRhaW5pbmcgYWxsIHRoZSBsb29wIGNoaWxkcmVuXG4gKiBAcGFyYW0gICB7IFRhZyB9IG5leHRUYWcgLSBpbnN0YW5jZSBvZiB0aGUgbmV4dCB0YWcgcHJlY2VkaW5nIHRoZSBvbmUgd2Ugd2FudCB0byBtb3ZlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1ZpcnR1YWwgLSBpcyBpdCBhIHZpcnR1YWwgdGFnP1xuICovXG5mdW5jdGlvbiBtb3ZlKHJvb3QsIG5leHRUYWcsIGlzVmlydHVhbCkge1xuICBpZiAoaXNWaXJ0dWFsKVxuICAgIHsgbW92ZVZpcnR1YWwuYXBwbHkodGhpcywgW3Jvb3QsIG5leHRUYWddKTsgfVxuICBlbHNlXG4gICAgeyBzYWZlSW5zZXJ0KHJvb3QsIHRoaXMucm9vdCwgbmV4dFRhZy5yb290KTsgfVxufVxuXG4vKipcbiAqIEluc2VydCBhbmQgbW91bnQgYSBjaGlsZCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBkb20gbm9kZSBjb250YWluaW5nIGFsbCB0aGUgbG9vcCBjaGlsZHJlblxuICogQHBhcmFtICAgeyBUYWcgfSBuZXh0VGFnIC0gaW5zdGFuY2Ugb2YgdGhlIG5leHQgdGFnIHByZWNlZGluZyB0aGUgb25lIHdlIHdhbnQgdG8gaW5zZXJ0XG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1ZpcnR1YWwgLSBpcyBpdCBhIHZpcnR1YWwgdGFnP1xuICovXG5mdW5jdGlvbiBpbnNlcnQocm9vdCwgbmV4dFRhZywgaXNWaXJ0dWFsKSB7XG4gIGlmIChpc1ZpcnR1YWwpXG4gICAgeyBtYWtlVmlydHVhbC5hcHBseSh0aGlzLCBbcm9vdCwgbmV4dFRhZ10pOyB9XG4gIGVsc2VcbiAgICB7IHNhZmVJbnNlcnQocm9vdCwgdGhpcy5yb290LCBuZXh0VGFnLnJvb3QpOyB9XG59XG5cbi8qKlxuICogQXBwZW5kIGEgbmV3IHRhZyBpbnRvIHRoZSBET01cbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBkb20gbm9kZSBjb250YWluaW5nIGFsbCB0aGUgbG9vcCBjaGlsZHJlblxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNWaXJ0dWFsIC0gaXMgaXQgYSB2aXJ0dWFsIHRhZz9cbiAqL1xuZnVuY3Rpb24gYXBwZW5kKHJvb3QsIGlzVmlydHVhbCkge1xuICBpZiAoaXNWaXJ0dWFsKVxuICAgIHsgbWFrZVZpcnR1YWwuY2FsbCh0aGlzLCByb290KTsgfVxuICBlbHNlXG4gICAgeyByb290LmFwcGVuZENoaWxkKHRoaXMucm9vdCk7IH1cbn1cblxuLyoqXG4gKiBNYW5hZ2UgdGFncyBoYXZpbmcgdGhlICdlYWNoJ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IGRvbSAtIERPTSBub2RlIHdlIG5lZWQgdG8gbG9vcFxuICogQHBhcmFtICAgeyBUYWcgfSBwYXJlbnQgLSBwYXJlbnQgdGFnIGluc3RhbmNlIHdoZXJlIHRoZSBkb20gbm9kZSBpcyBjb250YWluZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXhwciAtIHN0cmluZyBjb250YWluZWQgaW4gdGhlICdlYWNoJyBhdHRyaWJ1dGVcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZXhwcmVzc2lvbiBvYmplY3QgZm9yIHRoaXMgZWFjaCBsb29wXG4gKi9cbmZ1bmN0aW9uIF9lYWNoKGRvbSwgcGFyZW50LCBleHByKSB7XG5cbiAgLy8gcmVtb3ZlIHRoZSBlYWNoIHByb3BlcnR5IGZyb20gdGhlIG9yaWdpbmFsIHRhZ1xuICByZW1BdHRyKGRvbSwgTE9PUF9ESVJFQ1RJVkUpO1xuXG4gIHZhciBtdXN0UmVvcmRlciA9IHR5cGVvZiBnZXRBdHRyKGRvbSwgTE9PUF9OT19SRU9SREVSX0RJUkVDVElWRSkgIT09IFRfU1RSSU5HIHx8IHJlbUF0dHIoZG9tLCBMT09QX05PX1JFT1JERVJfRElSRUNUSVZFKSxcbiAgICB0YWdOYW1lID0gZ2V0VGFnTmFtZShkb20pLFxuICAgIGltcGwgPSBfX1RBR19JTVBMW3RhZ05hbWVdLFxuICAgIHBhcmVudE5vZGUgPSBkb20ucGFyZW50Tm9kZSxcbiAgICBwbGFjZWhvbGRlciA9IGNyZWF0ZURPTVBsYWNlaG9sZGVyKCksXG4gICAgY2hpbGQgPSBnZXRUYWcoZG9tKSxcbiAgICBpZkV4cHIgPSBnZXRBdHRyKGRvbSwgQ09ORElUSU9OQUxfRElSRUNUSVZFKSxcbiAgICB0YWdzID0gW10sXG4gICAgb2xkSXRlbXMgPSBbXSxcbiAgICBoYXNLZXlzLFxuICAgIGlzTG9vcCA9IHRydWUsXG4gICAgaXNBbm9ueW1vdXMgPSAhX19UQUdfSU1QTFt0YWdOYW1lXSxcbiAgICBpc1ZpcnR1YWwgPSBkb20udGFnTmFtZSA9PT0gJ1ZJUlRVQUwnO1xuXG4gIC8vIHBhcnNlIHRoZSBlYWNoIGV4cHJlc3Npb25cbiAgZXhwciA9IHRtcGwubG9vcEtleXMoZXhwcik7XG4gIGV4cHIuaXNMb29wID0gdHJ1ZTtcblxuICBpZiAoaWZFeHByKSB7IHJlbUF0dHIoZG9tLCBDT05ESVRJT05BTF9ESVJFQ1RJVkUpOyB9XG5cbiAgLy8gaW5zZXJ0IGEgbWFya2VkIHdoZXJlIHRoZSBsb29wIHRhZ3Mgd2lsbCBiZSBpbmplY3RlZFxuICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShwbGFjZWhvbGRlciwgZG9tKTtcbiAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb20pO1xuXG4gIGV4cHIudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlRWFjaCgpIHtcbiAgICAvLyBnZXQgdGhlIG5ldyBpdGVtcyBjb2xsZWN0aW9uXG4gICAgZXhwci52YWx1ZSA9IHRtcGwoZXhwci52YWwsIHBhcmVudCk7XG5cbiAgICB2YXIgZnJhZyA9IGNyZWF0ZUZyYWcoKSxcbiAgICAgIGl0ZW1zID0gZXhwci52YWx1ZSxcbiAgICAgIGlzT2JqZWN0JCQxID0gIWlzQXJyYXkoaXRlbXMpICYmICFpc1N0cmluZyhpdGVtcyksXG4gICAgICByb290ID0gcGxhY2Vob2xkZXIucGFyZW50Tm9kZTtcblxuICAgIC8vIGlmIHRoaXMgRE9NIHdhcyByZW1vdmVkIHRoZSB1cGRhdGUgaGVyZSBpcyB1c2VsZXNzXG4gICAgLy8gdGhpcyBjb25kaXRpb24gZml4ZXMgYWxzbyBhIHdlaXJkIGFzeW5jIGlzc3VlIG9uIElFIGluIG91ciB1bml0IHRlc3RcbiAgICBpZiAoIXJvb3QpIHsgcmV0dXJuIH1cblxuICAgIC8vIG9iamVjdCBsb29wLiBhbnkgY2hhbmdlcyBjYXVzZSBmdWxsIHJlZHJhd1xuICAgIGlmIChpc09iamVjdCQkMSkge1xuICAgICAgaGFzS2V5cyA9IGl0ZW1zIHx8IGZhbHNlO1xuICAgICAgaXRlbXMgPSBoYXNLZXlzID9cbiAgICAgICAgT2JqZWN0LmtleXMoaXRlbXMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIG1raXRlbShleHByLCBpdGVtc1trZXldLCBrZXkpXG4gICAgICAgIH0pIDogW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhc0tleXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaWZFeHByKSB7XG4gICAgICBpdGVtcyA9IGl0ZW1zLmZpbHRlcihmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAgIGlmIChleHByLmtleSAmJiAhaXNPYmplY3QkJDEpXG4gICAgICAgICAgeyByZXR1cm4gISF0bXBsKGlmRXhwciwgbWtpdGVtKGV4cHIsIGl0ZW0sIGksIHBhcmVudCkpIH1cblxuICAgICAgICByZXR1cm4gISF0bXBsKGlmRXhwciwgZXh0ZW5kKE9iamVjdC5jcmVhdGUocGFyZW50KSwgaXRlbSkpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBsb29wIGFsbCB0aGUgbmV3IGl0ZW1zXG4gICAgZWFjaChpdGVtcywgZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgLy8gcmVvcmRlciBvbmx5IGlmIHRoZSBpdGVtcyBhcmUgb2JqZWN0c1xuICAgICAgdmFyXG4gICAgICAgIGRvUmVvcmRlciA9IG11c3RSZW9yZGVyICYmIHR5cGVvZiBpdGVtID09PSBUX09CSkVDVCAmJiAhaGFzS2V5cyxcbiAgICAgICAgb2xkUG9zID0gb2xkSXRlbXMuaW5kZXhPZihpdGVtKSxcbiAgICAgICAgaXNOZXcgPSBvbGRQb3MgPT09IC0xLFxuICAgICAgICBwb3MgPSAhaXNOZXcgJiYgZG9SZW9yZGVyID8gb2xkUG9zIDogaSxcbiAgICAgICAgLy8gZG9lcyBhIHRhZyBleGlzdCBpbiB0aGlzIHBvc2l0aW9uP1xuICAgICAgICB0YWcgPSB0YWdzW3Bvc10sXG4gICAgICAgIG11c3RBcHBlbmQgPSBpID49IG9sZEl0ZW1zLmxlbmd0aCxcbiAgICAgICAgbXVzdENyZWF0ZSA9ICBkb1Jlb3JkZXIgJiYgaXNOZXcgfHwgIWRvUmVvcmRlciAmJiAhdGFnO1xuXG4gICAgICBpdGVtID0gIWhhc0tleXMgJiYgZXhwci5rZXkgPyBta2l0ZW0oZXhwciwgaXRlbSwgaSkgOiBpdGVtO1xuXG4gICAgICAvLyBuZXcgdGFnXG4gICAgICBpZiAobXVzdENyZWF0ZSkge1xuICAgICAgICB0YWcgPSBuZXcgVGFnJDEoaW1wbCwge1xuICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgIGlzTG9vcDogaXNMb29wLFxuICAgICAgICAgIGlzQW5vbnltb3VzOiBpc0Fub255bW91cyxcbiAgICAgICAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgICAgICAgIHJvb3Q6IGRvbS5jbG9uZU5vZGUoaXNBbm9ueW1vdXMpLFxuICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIH0sIGRvbS5pbm5lckhUTUwpO1xuXG4gICAgICAgIC8vIG1vdW50IHRoZSB0YWdcbiAgICAgICAgdGFnLm1vdW50KCk7XG5cbiAgICAgICAgaWYgKG11c3RBcHBlbmQpXG4gICAgICAgICAgeyBhcHBlbmQuYXBwbHkodGFnLCBbZnJhZyB8fCByb290LCBpc1ZpcnR1YWxdKTsgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgeyBpbnNlcnQuYXBwbHkodGFnLCBbcm9vdCwgdGFnc1tpXSwgaXNWaXJ0dWFsXSk7IH1cblxuICAgICAgICBpZiAoIW11c3RBcHBlbmQpIHsgb2xkSXRlbXMuc3BsaWNlKGksIDAsIGl0ZW0pOyB9XG4gICAgICAgIHRhZ3Muc3BsaWNlKGksIDAsIHRhZyk7XG4gICAgICAgIGlmIChjaGlsZCkgeyBhcnJheWlzaEFkZChwYXJlbnQudGFncywgdGFnTmFtZSwgdGFnLCB0cnVlKTsgfVxuICAgICAgfSBlbHNlIGlmIChwb3MgIT09IGkgJiYgZG9SZW9yZGVyKSB7XG4gICAgICAgIC8vIG1vdmVcbiAgICAgICAgaWYgKGNvbnRhaW5zKGl0ZW1zLCBvbGRJdGVtc1twb3NdKSkge1xuICAgICAgICAgIG1vdmUuYXBwbHkodGFnLCBbcm9vdCwgdGFnc1tpXSwgaXNWaXJ0dWFsXSk7XG4gICAgICAgICAgLy8gbW92ZSB0aGUgb2xkIHRhZyBpbnN0YW5jZVxuICAgICAgICAgIHRhZ3Muc3BsaWNlKGksIDAsIHRhZ3Muc3BsaWNlKHBvcywgMSlbMF0pO1xuICAgICAgICAgIC8vIG1vdmUgdGhlIG9sZCBpdGVtXG4gICAgICAgICAgb2xkSXRlbXMuc3BsaWNlKGksIDAsIG9sZEl0ZW1zLnNwbGljZShwb3MsIDEpWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9zaXRpb24gYXR0cmlidXRlIGlmIGl0IGV4aXN0c1xuICAgICAgICBpZiAoZXhwci5wb3MpIHsgdGFnW2V4cHIucG9zXSA9IGk7IH1cblxuICAgICAgICAvLyBpZiB0aGUgbG9vcCB0YWdzIGFyZSBub3QgY3VzdG9tXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gbW92ZSBhbGwgdGhlaXIgY3VzdG9tIHRhZ3MgaW50byB0aGUgcmlnaHQgcG9zaXRpb25cbiAgICAgICAgaWYgKCFjaGlsZCAmJiB0YWcudGFncykgeyBtb3ZlTmVzdGVkVGFncy5jYWxsKHRhZywgaSk7IH1cbiAgICAgIH1cblxuICAgICAgLy8gY2FjaGUgdGhlIG9yaWdpbmFsIGl0ZW0gdG8gdXNlIGl0IGluIHRoZSBldmVudHMgYm91bmQgdG8gdGhpcyBub2RlXG4gICAgICAvLyBhbmQgaXRzIGNoaWxkcmVuXG4gICAgICB0YWcuX18uaXRlbSA9IGl0ZW07XG4gICAgICB0YWcuX18uaW5kZXggPSBpO1xuICAgICAgdGFnLl9fLnBhcmVudCA9IHBhcmVudDtcblxuICAgICAgaWYgKCFtdXN0Q3JlYXRlKSB7IHRhZy51cGRhdGUoaXRlbSk7IH1cbiAgICB9KTtcblxuICAgIC8vIHJlbW92ZSB0aGUgcmVkdW5kYW50IHRhZ3NcbiAgICB1bm1vdW50UmVkdW5kYW50KGl0ZW1zLCB0YWdzKTtcblxuICAgIC8vIGNsb25lIHRoZSBpdGVtcyBhcnJheVxuICAgIG9sZEl0ZW1zID0gaXRlbXMuc2xpY2UoKTtcblxuICAgIC8vIHRoaXMgY29uZGl0aW9uIGlzIHdlaXJkIHVcbiAgICByb290Lmluc2VydEJlZm9yZShmcmFnLCBwbGFjZWhvbGRlcik7XG4gIH07XG5cbiAgZXhwci51bm1vdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgZWFjaCh0YWdzLCBmdW5jdGlvbih0KSB7IHQudW5tb3VudCgpOyB9KTtcbiAgfTtcblxuICByZXR1cm4gZXhwclxufVxuXG4vKipcbiAqIFdhbGsgdGhlIHRhZyBET00gdG8gZGV0ZWN0IHRoZSBleHByZXNzaW9ucyB0byBldmFsdWF0ZVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIHJvb3QgdGFnIHdoZXJlIHdlIHdpbGwgc3RhcnQgZGlnZ2luZyB0aGUgZXhwcmVzc2lvbnNcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBleHByZXNzaW9ucyAtIGVtcHR5IGFycmF5IHdoZXJlIHRoZSBleHByZXNzaW9ucyB3aWxsIGJlIGFkZGVkXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBtdXN0SW5jbHVkZVJvb3QgLSBmbGFnIHRvIGRlY2lkZSB3aGV0aGVyIHRoZSByb290IG11c3QgYmUgcGFyc2VkIGFzIHdlbGxcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJvb3Qgbm9vZGUgYW5kIHRoZSBkb20gdHJlZVxuICovXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb25zKHJvb3QsIGV4cHJlc3Npb25zLCBtdXN0SW5jbHVkZVJvb3QpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIHRyZWUgPSB7cGFyZW50OiB7Y2hpbGRyZW46IGV4cHJlc3Npb25zfX07XG5cbiAgd2Fsa05vZGVzKHJvb3QsIGZ1bmN0aW9uIChkb20sIGN0eCkge1xuICAgIHZhciB0eXBlID0gZG9tLm5vZGVUeXBlLCBwYXJlbnQgPSBjdHgucGFyZW50LCBhdHRyLCBleHByLCB0YWdJbXBsO1xuICAgIGlmICghbXVzdEluY2x1ZGVSb290ICYmIGRvbSA9PT0gcm9vdCkgeyByZXR1cm4ge3BhcmVudDogcGFyZW50fSB9XG5cbiAgICAvLyB0ZXh0IG5vZGVcbiAgICBpZiAodHlwZSA9PT0gMyAmJiBkb20ucGFyZW50Tm9kZS50YWdOYW1lICE9PSAnU1RZTEUnICYmIHRtcGwuaGFzRXhwcihkb20ubm9kZVZhbHVlKSlcbiAgICAgIHsgcGFyZW50LmNoaWxkcmVuLnB1c2goe2RvbTogZG9tLCBleHByOiBkb20ubm9kZVZhbHVlfSk7IH1cblxuICAgIGlmICh0eXBlICE9PSAxKSB7IHJldHVybiBjdHggfSAvLyBub3QgYW4gZWxlbWVudFxuXG4gICAgdmFyIGlzVmlydHVhbCA9IGRvbS50YWdOYW1lID09PSAnVklSVFVBTCc7XG5cbiAgICAvLyBsb29wLiBlYWNoIGRvZXMgaXQncyBvd24gdGhpbmcgKGZvciBub3cpXG4gICAgaWYgKGF0dHIgPSBnZXRBdHRyKGRvbSwgTE9PUF9ESVJFQ1RJVkUpKSB7XG4gICAgICBpZihpc1ZpcnR1YWwpIHsgc2V0QXR0cihkb20sICdsb29wVmlydHVhbCcsIHRydWUpOyB9IC8vIGlnbm9yZSBoZXJlLCBoYW5kbGVkIGluIF9lYWNoXG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChfZWFjaChkb20sIHRoaXMkMSwgYXR0cikpO1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gaWYtYXR0cnMgYmVjb21lIHRoZSBuZXcgcGFyZW50LiBBbnkgZm9sbG93aW5nIGV4cHJlc3Npb25zIChlaXRoZXIgb24gdGhlIGN1cnJlbnRcbiAgICAvLyBlbGVtZW50LCBvciBiZWxvdyBpdCkgYmVjb21lIGNoaWxkcmVuIG9mIHRoaXMgZXhwcmVzc2lvbi5cbiAgICBpZiAoYXR0ciA9IGdldEF0dHIoZG9tLCBDT05ESVRJT05BTF9ESVJFQ1RJVkUpKSB7XG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChPYmplY3QuY3JlYXRlKElmRXhwcikuaW5pdChkb20sIHRoaXMkMSwgYXR0cikpO1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKGV4cHIgPSBnZXRBdHRyKGRvbSwgSVNfRElSRUNUSVZFKSkge1xuICAgICAgaWYgKHRtcGwuaGFzRXhwcihleHByKSkge1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaCh7aXNSdGFnOiB0cnVlLCBleHByOiBleHByLCBkb206IGRvbSwgYXR0cnM6IFtdLnNsaWNlLmNhbGwoZG9tLmF0dHJpYnV0ZXMpfSk7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoaXMgaXMgYSB0YWcsIHN0b3AgdHJhdmVyc2luZyBoZXJlLlxuICAgIC8vIHdlIGlnbm9yZSB0aGUgcm9vdCwgc2luY2UgcGFyc2VFeHByZXNzaW9ucyBpcyBjYWxsZWQgd2hpbGUgd2UncmUgbW91bnRpbmcgdGhhdCByb290XG4gICAgdGFnSW1wbCA9IGdldFRhZyhkb20pO1xuICAgIGlmKGlzVmlydHVhbCkge1xuICAgICAgaWYoZ2V0QXR0cihkb20sICd2aXJ0dWFsaXplZCcpKSB7ZG9tLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tKTsgfSAvLyB0YWcgY3JlYXRlZCwgcmVtb3ZlIGZyb20gZG9tXG4gICAgICBpZighdGFnSW1wbCAmJiAhZ2V0QXR0cihkb20sICd2aXJ0dWFsaXplZCcpICYmICFnZXRBdHRyKGRvbSwgJ2xvb3BWaXJ0dWFsJykpICAvLyBvayB0byBjcmVhdGUgdmlydHVhbCB0YWdcbiAgICAgICAgeyB0YWdJbXBsID0geyB0bXBsOiBkb20ub3V0ZXJIVE1MIH07IH1cbiAgICB9XG5cbiAgICBpZiAodGFnSW1wbCAmJiAoZG9tICE9PSByb290IHx8IG11c3RJbmNsdWRlUm9vdCkpIHtcbiAgICAgIGlmKGlzVmlydHVhbCAmJiAhZ2V0QXR0cihkb20sIElTX0RJUkVDVElWRSkpIHsgLy8gaGFuZGxlZCBpbiB1cGRhdGVcbiAgICAgICAgLy8gY2FuIG5vdCByZW1vdmUgYXR0cmlidXRlIGxpa2UgZGlyZWN0aXZlc1xuICAgICAgICAvLyBzbyBmbGFnIGZvciByZW1vdmFsIGFmdGVyIGNyZWF0aW9uIHRvIHByZXZlbnQgbWF4aW11bSBzdGFjayBlcnJvclxuICAgICAgICBzZXRBdHRyKGRvbSwgJ3ZpcnR1YWxpemVkJywgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIHRhZyA9IG5ldyBUYWckMSh7IHRtcGw6IGRvbS5vdXRlckhUTUwgfSxcbiAgICAgICAgICB7cm9vdDogZG9tLCBwYXJlbnQ6IHRoaXMkMX0sXG4gICAgICAgICAgZG9tLmlubmVySFRNTCk7XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKHRhZyk7IC8vIG5vIHJldHVybiwgYW5vbnltb3VzIHRhZywga2VlcCBwYXJzaW5nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY29uZiA9IHtyb290OiBkb20sIHBhcmVudDogdGhpcyQxLCBoYXNJbXBsOiB0cnVlfTtcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goaW5pdENoaWxkVGFnKHRhZ0ltcGwsIGNvbmYsIGRvbS5pbm5lckhUTUwsIHRoaXMkMSkpO1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhdHRyaWJ1dGUgZXhwcmVzc2lvbnNcbiAgICBwYXJzZUF0dHJpYnV0ZXMuYXBwbHkodGhpcyQxLCBbZG9tLCBkb20uYXR0cmlidXRlcywgZnVuY3Rpb24oYXR0ciwgZXhwcikge1xuICAgICAgaWYgKCFleHByKSB7IHJldHVybiB9XG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChleHByKTtcbiAgICB9XSk7XG5cbiAgICAvLyB3aGF0ZXZlciB0aGUgcGFyZW50IGlzLCBhbGwgY2hpbGQgZWxlbWVudHMgZ2V0IHRoZSBzYW1lIHBhcmVudC5cbiAgICAvLyBJZiB0aGlzIGVsZW1lbnQgaGFkIGFuIGlmLWF0dHIsIHRoYXQncyB0aGUgcGFyZW50IGZvciBhbGwgY2hpbGQgZWxlbWVudHNcbiAgICByZXR1cm4ge3BhcmVudDogcGFyZW50fVxuICB9LCB0cmVlKTtcbn1cblxuLyoqXG4gKiBDYWxscyBgZm5gIGZvciBldmVyeSBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudC4gSWYgdGhhdCBhdHRyIGhhcyBhbiBleHByZXNzaW9uLFxuICogaXQgaXMgYWxzbyBwYXNzZWQgdG8gZm4uXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBkb20gLSBkb20gbm9kZSB0byBwYXJzZVxuICogQHBhcmFtICAgeyBBcnJheSB9IGF0dHJzIC0gYXJyYXkgb2YgYXR0cmlidXRlc1xuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgdG8gZXhlYyBvbiBhbnkgaXRlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQXR0cmlidXRlcyhkb20sIGF0dHJzLCBmbikge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBlYWNoKGF0dHJzLCBmdW5jdGlvbiAoYXR0cikge1xuICAgIGlmICghYXR0cikgeyByZXR1cm4gZmFsc2UgfVxuXG4gICAgdmFyIG5hbWUgPSBhdHRyLm5hbWUsIGJvb2wgPSBpc0Jvb2xBdHRyKG5hbWUpLCBleHByO1xuXG4gICAgaWYgKGNvbnRhaW5zKFJFRl9ESVJFQ1RJVkVTLCBuYW1lKSkge1xuICAgICAgZXhwciA9ICBPYmplY3QuY3JlYXRlKFJlZkV4cHIpLmluaXQoZG9tLCB0aGlzJDEsIG5hbWUsIGF0dHIudmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodG1wbC5oYXNFeHByKGF0dHIudmFsdWUpKSB7XG4gICAgICBleHByID0ge2RvbTogZG9tLCBleHByOiBhdHRyLnZhbHVlLCBhdHRyOiBuYW1lLCBib29sOiBib29sfTtcbiAgICB9XG5cbiAgICBmbihhdHRyLCBleHByKTtcbiAgfSk7XG59XG5cbi8qXG4gIEluY2x1ZGVzIGhhY2tzIG5lZWRlZCBmb3IgdGhlIEludGVybmV0IEV4cGxvcmVyIHZlcnNpb24gOSBhbmQgYmVsb3dcbiAgU2VlOiBodHRwOi8va2FuZ2F4LmdpdGh1Yi5pby9jb21wYXQtdGFibGUvZXM1LyNpZThcbiAgICAgICBodHRwOi8vY29kZXBsYW5ldC5pby9kcm9wcGluZy1pZTgvXG4qL1xuXG52YXIgcmVIYXNZaWVsZCAgPSAvPHlpZWxkXFxiL2k7XG52YXIgcmVZaWVsZEFsbCAgPSAvPHlpZWxkXFxzKig/OlxcLz58PihbXFxTXFxzXSo/KTxcXC95aWVsZFxccyo+fD4pL2lnO1xudmFyIHJlWWllbGRTcmMgID0gLzx5aWVsZFxccyt0bz1bJ1wiXShbXidcIj5dKilbJ1wiXVxccyo+KFtcXFNcXHNdKj8pPFxcL3lpZWxkXFxzKj4vaWc7XG52YXIgcmVZaWVsZERlc3QgPSAvPHlpZWxkXFxzK2Zyb209WydcIl0/KFstXFx3XSspWydcIl0/XFxzKig/OlxcLz58PihbXFxTXFxzXSo/KTxcXC95aWVsZFxccyo+KS9pZztcbnZhciByb290RWxzID0geyB0cjogJ3Rib2R5JywgdGg6ICd0cicsIHRkOiAndHInLCBjb2w6ICdjb2xncm91cCcgfTtcbnZhciB0YmxUYWdzID0gSUVfVkVSU0lPTiAmJiBJRV9WRVJTSU9OIDwgMTAgPyBSRV9TUEVDSUFMX1RBR1MgOiBSRV9TUEVDSUFMX1RBR1NfTk9fT1BUSU9OO1xudmFyIEdFTkVSSUMgPSAnZGl2JztcbnZhciBTVkcgPSAnc3ZnJztcblxuXG4vKlxuICBDcmVhdGVzIHRoZSByb290IGVsZW1lbnQgZm9yIHRhYmxlIG9yIHNlbGVjdCBjaGlsZCBlbGVtZW50czpcbiAgdHIvdGgvdGQvdGhlYWQvdGZvb3QvdGJvZHkvY2FwdGlvbi9jb2wvY29sZ3JvdXAvb3B0aW9uL29wdGdyb3VwXG4qL1xuZnVuY3Rpb24gc3BlY2lhbFRhZ3MoZWwsIHRtcGwsIHRhZ05hbWUpIHtcblxuICB2YXJcbiAgICBzZWxlY3QgPSB0YWdOYW1lWzBdID09PSAnbycsXG4gICAgcGFyZW50ID0gc2VsZWN0ID8gJ3NlbGVjdD4nIDogJ3RhYmxlPic7XG5cbiAgLy8gdHJpbSgpIGlzIGltcG9ydGFudCBoZXJlLCB0aGlzIGVuc3VyZXMgd2UgZG9uJ3QgaGF2ZSBhcnRpZmFjdHMsXG4gIC8vIHNvIHdlIGNhbiBjaGVjayBpZiB3ZSBoYXZlIG9ubHkgb25lIGVsZW1lbnQgaW5zaWRlIHRoZSBwYXJlbnRcbiAgZWwuaW5uZXJIVE1MID0gJzwnICsgcGFyZW50ICsgdG1wbC50cmltKCkgKyAnPC8nICsgcGFyZW50O1xuICBwYXJlbnQgPSBlbC5maXJzdENoaWxkO1xuXG4gIC8vIHJldHVybnMgdGhlIGltbWVkaWF0ZSBwYXJlbnQgaWYgdHIvdGgvdGQvY29sIGlzIHRoZSBvbmx5IGVsZW1lbnQsIGlmIG5vdFxuICAvLyByZXR1cm5zIHRoZSB3aG9sZSB0cmVlLCBhcyB0aGlzIGNhbiBpbmNsdWRlIGFkZGl0aW9uYWwgZWxlbWVudHNcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHNlbGVjdCkge1xuICAgIHBhcmVudC5zZWxlY3RlZEluZGV4ID0gLTE7ICAvLyBmb3IgSUU5LCBjb21wYXRpYmxlIHcvY3VycmVudCByaW90IGJlaGF2aW9yXG4gIH0gZWxzZSB7XG4gICAgLy8gYXZvaWRzIGluc2VydGlvbiBvZiBjb2ludGFpbmVyIGluc2lkZSBjb250YWluZXIgKGV4OiB0Ym9keSBpbnNpZGUgdGJvZHkpXG4gICAgdmFyIHRuYW1lID0gcm9vdEVsc1t0YWdOYW1lXTtcbiAgICBpZiAodG5hbWUgJiYgcGFyZW50LmNoaWxkRWxlbWVudENvdW50ID09PSAxKSB7IHBhcmVudCA9ICQodG5hbWUsIHBhcmVudCk7IH1cbiAgfVxuICByZXR1cm4gcGFyZW50XG59XG5cbi8qXG4gIFJlcGxhY2UgdGhlIHlpZWxkIHRhZyBmcm9tIGFueSB0YWcgdGVtcGxhdGUgd2l0aCB0aGUgaW5uZXJIVE1MIG9mIHRoZVxuICBvcmlnaW5hbCB0YWcgaW4gdGhlIHBhZ2VcbiovXG5mdW5jdGlvbiByZXBsYWNlWWllbGQodG1wbCwgaHRtbCkge1xuICAvLyBkbyBub3RoaW5nIGlmIG5vIHlpZWxkXG4gIGlmICghcmVIYXNZaWVsZC50ZXN0KHRtcGwpKSB7IHJldHVybiB0bXBsIH1cblxuICAvLyBiZSBjYXJlZnVsIHdpdGggIzEzNDMgLSBzdHJpbmcgb24gdGhlIHNvdXJjZSBoYXZpbmcgYCQxYFxuICB2YXIgc3JjID0ge307XG5cbiAgaHRtbCA9IGh0bWwgJiYgaHRtbC5yZXBsYWNlKHJlWWllbGRTcmMsIGZ1bmN0aW9uIChfLCByZWYsIHRleHQpIHtcbiAgICBzcmNbcmVmXSA9IHNyY1tyZWZdIHx8IHRleHQ7ICAgLy8gcHJlc2VydmUgZmlyc3QgZGVmaW5pdGlvblxuICAgIHJldHVybiAnJ1xuICB9KS50cmltKCk7XG5cbiAgcmV0dXJuIHRtcGxcbiAgICAucmVwbGFjZShyZVlpZWxkRGVzdCwgZnVuY3Rpb24gKF8sIHJlZiwgZGVmKSB7ICAvLyB5aWVsZCB3aXRoIGZyb20gLSB0byBhdHRyc1xuICAgICAgcmV0dXJuIHNyY1tyZWZdIHx8IGRlZiB8fCAnJ1xuICAgIH0pXG4gICAgLnJlcGxhY2UocmVZaWVsZEFsbCwgZnVuY3Rpb24gKF8sIGRlZikgeyAgICAgICAgLy8geWllbGQgd2l0aG91dCBhbnkgXCJmcm9tXCJcbiAgICAgIHJldHVybiBodG1sIHx8IGRlZiB8fCAnJ1xuICAgIH0pXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIERPTSBlbGVtZW50IHRvIHdyYXAgdGhlIGdpdmVuIGNvbnRlbnQuIE5vcm1hbGx5IGFuIGBESVZgLCBidXQgY2FuIGJlXG4gKiBhbHNvIGEgYFRBQkxFYCwgYFNFTEVDVGAsIGBUQk9EWWAsIGBUUmAsIG9yIGBDT0xHUk9VUGAgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHRtcGwgIC0gVGhlIHRlbXBsYXRlIGNvbWluZyBmcm9tIHRoZSBjdXN0b20gdGFnIGRlZmluaXRpb25cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gaHRtbCAtIEhUTUwgY29udGVudCB0aGF0IGNvbWVzIGZyb20gdGhlIERPTSBlbGVtZW50IHdoZXJlIHlvdVxuICogICAgICAgICAgIHdpbGwgbW91bnQgdGhlIHRhZywgbW9zdGx5IHRoZSBvcmlnaW5hbCB0YWcgaW4gdGhlIHBhZ2VcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGlzU3ZnIC0gdHJ1ZSBpZiB0aGUgcm9vdCBub2RlIGlzIGFuIHN2Z1xuICogQHJldHVybnMgeyBIVE1MRWxlbWVudCB9IERPTSBlbGVtZW50IHdpdGggX3RtcGxfIG1lcmdlZCB0aHJvdWdoIGBZSUVMRGAgd2l0aCB0aGUgX2h0bWxfLlxuICovXG5mdW5jdGlvbiBta2RvbSh0bXBsLCBodG1sLCBpc1N2ZyQkMSkge1xuICB2YXIgbWF0Y2ggICA9IHRtcGwgJiYgdG1wbC5tYXRjaCgvXlxccyo8KFstXFx3XSspLyksXG4gICAgdGFnTmFtZSA9IG1hdGNoICYmIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCksXG4gICAgZWwgPSBta0VsKGlzU3ZnJCQxID8gU1ZHIDogR0VORVJJQyk7XG5cbiAgLy8gcmVwbGFjZSBhbGwgdGhlIHlpZWxkIHRhZ3Mgd2l0aCB0aGUgdGFnIGlubmVyIGh0bWxcbiAgdG1wbCA9IHJlcGxhY2VZaWVsZCh0bXBsLCBodG1sKTtcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAodGJsVGFncy50ZXN0KHRhZ05hbWUpKVxuICAgIHsgZWwgPSBzcGVjaWFsVGFncyhlbCwgdG1wbCwgdGFnTmFtZSk7IH1cbiAgZWxzZVxuICAgIHsgc2V0SW5uZXJIVE1MKGVsLCB0bXBsKTsgfVxuXG4gIHJldHVybiBlbFxufVxuXG4vKipcbiAqIEFub3RoZXIgd2F5IHRvIGNyZWF0ZSBhIHJpb3QgdGFnIGEgYml0IG1vcmUgZXM2IGZyaWVuZGx5XG4gKiBAcGFyYW0geyBIVE1MRWxlbWVudCB9IGVsIC0gdGFnIERPTSBzZWxlY3RvciBvciBET00gbm9kZS9zXG4gKiBAcGFyYW0geyBPYmplY3QgfSBvcHRzIC0gdGFnIGxvZ2ljXG4gKiBAcmV0dXJucyB7IFRhZyB9IG5ldyByaW90IHRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBUYWckMihlbCwgb3B0cykge1xuICAvLyBnZXQgdGhlIHRhZyBwcm9wZXJ0aWVzIGZyb20gdGhlIGNsYXNzIGNvbnN0cnVjdG9yXG4gIHZhciByZWYgPSB0aGlzO1xuICB2YXIgbmFtZSA9IHJlZi5uYW1lO1xuICB2YXIgdG1wbCA9IHJlZi50bXBsO1xuICB2YXIgY3NzID0gcmVmLmNzcztcbiAgdmFyIGF0dHJzID0gcmVmLmF0dHJzO1xuICB2YXIgb25DcmVhdGUgPSByZWYub25DcmVhdGU7XG4gIC8vIHJlZ2lzdGVyIGEgbmV3IHRhZyBhbmQgY2FjaGUgdGhlIGNsYXNzIHByb3RvdHlwZVxuICBpZiAoIV9fVEFHX0lNUExbbmFtZV0pIHtcbiAgICB0YWckMShuYW1lLCB0bXBsLCBjc3MsIGF0dHJzLCBvbkNyZWF0ZSk7XG4gICAgLy8gY2FjaGUgdGhlIGNsYXNzIGNvbnN0cnVjdG9yXG4gICAgX19UQUdfSU1QTFtuYW1lXS5jbGFzcyA9IHRoaXMuY29uc3RydWN0b3I7XG4gIH1cblxuICAvLyBtb3VudCB0aGUgdGFnIHVzaW5nIHRoZSBjbGFzcyBpbnN0YW5jZVxuICBtb3VudFRvKGVsLCBuYW1lLCBvcHRzLCB0aGlzKTtcbiAgLy8gaW5qZWN0IHRoZSBjb21wb25lbnQgY3NzXG4gIGlmIChjc3MpIHsgc3R5bGVNYW5hZ2VyLmluamVjdCgpOyB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcmlvdCB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBuYW1lIC0gbmFtZS9pZCBvZiB0aGUgbmV3IHJpb3QgdGFnXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgdG1wbCAtIHRhZyB0ZW1wbGF0ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGNzcyAtIGN1c3RvbSB0YWcgY3NzXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgYXR0cnMgLSByb290IHRhZyBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSB1c2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG5hbWUvaWQgb2YgdGhlIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gdGFnJDEobmFtZSwgdG1wbCwgY3NzLCBhdHRycywgZm4pIHtcbiAgaWYgKGlzRnVuY3Rpb24oYXR0cnMpKSB7XG4gICAgZm4gPSBhdHRycztcblxuICAgIGlmICgvXltcXHdcXC1dK1xccz89Ly50ZXN0KGNzcykpIHtcbiAgICAgIGF0dHJzID0gY3NzO1xuICAgICAgY3NzID0gJyc7XG4gICAgfSBlbHNlXG4gICAgICB7IGF0dHJzID0gJyc7IH1cbiAgfVxuXG4gIGlmIChjc3MpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjc3MpKVxuICAgICAgeyBmbiA9IGNzczsgfVxuICAgIGVsc2VcbiAgICAgIHsgc3R5bGVNYW5hZ2VyLmFkZChjc3MpOyB9XG4gIH1cblxuICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICBfX1RBR19JTVBMW25hbWVdID0geyBuYW1lOiBuYW1lLCB0bXBsOiB0bXBsLCBhdHRyczogYXR0cnMsIGZuOiBmbiB9O1xuXG4gIHJldHVybiBuYW1lXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHJpb3QgdGFnIGltcGxlbWVudGF0aW9uIChmb3IgdXNlIGJ5IHRoZSBjb21waWxlcilcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBuYW1lIC0gbmFtZS9pZCBvZiB0aGUgbmV3IHJpb3QgdGFnXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgdG1wbCAtIHRhZyB0ZW1wbGF0ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGNzcyAtIGN1c3RvbSB0YWcgY3NzXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgYXR0cnMgLSByb290IHRhZyBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSB1c2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG5hbWUvaWQgb2YgdGhlIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gdGFnMiQxKG5hbWUsIHRtcGwsIGNzcywgYXR0cnMsIGZuKSB7XG4gIGlmIChjc3MpIHsgc3R5bGVNYW5hZ2VyLmFkZChjc3MsIG5hbWUpOyB9XG5cbiAgX19UQUdfSU1QTFtuYW1lXSA9IHsgbmFtZTogbmFtZSwgdG1wbDogdG1wbCwgYXR0cnM6IGF0dHJzLCBmbjogZm4gfTtcblxuICByZXR1cm4gbmFtZVxufVxuXG4vKipcbiAqIE1vdW50IGEgdGFnIHVzaW5nIGEgc3BlY2lmaWMgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7ICogfSBzZWxlY3RvciAtIHRhZyBET00gc2VsZWN0b3Igb3IgRE9NIG5vZGUvc1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0gdGFnIGltcGxlbWVudGF0aW9uIG5hbWVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIHRhZyBsb2dpY1xuICogQHJldHVybnMgeyBBcnJheSB9IG5ldyB0YWdzIGluc3RhbmNlc1xuICovXG5mdW5jdGlvbiBtb3VudCQxKHNlbGVjdG9yLCB0YWdOYW1lLCBvcHRzKSB7XG4gIHZhciB0YWdzID0gW107XG4gIHZhciBlbGVtLCBhbGxUYWdzO1xuXG4gIGZ1bmN0aW9uIHB1c2hUYWdzVG8ocm9vdCkge1xuICAgIGlmIChyb290LnRhZ05hbWUpIHtcbiAgICAgIHZhciByaW90VGFnID0gZ2V0QXR0cihyb290LCBJU19ESVJFQ1RJVkUpLCB0YWc7XG5cbiAgICAgIC8vIGhhdmUgdGFnTmFtZT8gZm9yY2UgcmlvdC10YWcgdG8gYmUgdGhlIHNhbWVcbiAgICAgIGlmICh0YWdOYW1lICYmIHJpb3RUYWcgIT09IHRhZ05hbWUpIHtcbiAgICAgICAgcmlvdFRhZyA9IHRhZ05hbWU7XG4gICAgICAgIHNldEF0dHIocm9vdCwgSVNfRElSRUNUSVZFLCB0YWdOYW1lKTtcbiAgICAgIH1cblxuICAgICAgdGFnID0gbW91bnRUbyhyb290LCByaW90VGFnIHx8IHJvb3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpLCBvcHRzKTtcblxuICAgICAgaWYgKHRhZylcbiAgICAgICAgeyB0YWdzLnB1c2godGFnKTsgfVxuICAgIH0gZWxzZSBpZiAocm9vdC5sZW5ndGgpXG4gICAgICB7IGVhY2gocm9vdCwgcHVzaFRhZ3NUbyk7IH0gLy8gYXNzdW1lIG5vZGVMaXN0XG4gIH1cblxuICAvLyBpbmplY3Qgc3R5bGVzIGludG8gRE9NXG4gIHN0eWxlTWFuYWdlci5pbmplY3QoKTtcblxuICBpZiAoaXNPYmplY3QodGFnTmFtZSkpIHtcbiAgICBvcHRzID0gdGFnTmFtZTtcbiAgICB0YWdOYW1lID0gMDtcbiAgfVxuXG4gIC8vIGNyYXdsIHRoZSBET00gdG8gZmluZCB0aGUgdGFnXG4gIGlmIChpc1N0cmluZyhzZWxlY3RvcikpIHtcbiAgICBzZWxlY3RvciA9IHNlbGVjdG9yID09PSAnKicgP1xuICAgICAgLy8gc2VsZWN0IGFsbCByZWdpc3RlcmVkIHRhZ3NcbiAgICAgIC8vICYgdGFncyBmb3VuZCB3aXRoIHRoZSByaW90LXRhZyBhdHRyaWJ1dGUgc2V0XG4gICAgICBhbGxUYWdzID0gc2VsZWN0VGFncygpIDpcbiAgICAgIC8vIG9yIGp1c3QgdGhlIG9uZXMgbmFtZWQgbGlrZSB0aGUgc2VsZWN0b3JcbiAgICAgIHNlbGVjdG9yICsgc2VsZWN0VGFncyhzZWxlY3Rvci5zcGxpdCgvLCAqLykpO1xuXG4gICAgLy8gbWFrZSBzdXJlIHRvIHBhc3MgYWx3YXlzIGEgc2VsZWN0b3JcbiAgICAvLyB0byB0aGUgcXVlcnlTZWxlY3RvckFsbCBmdW5jdGlvblxuICAgIGVsZW0gPSBzZWxlY3RvciA/ICQkKHNlbGVjdG9yKSA6IFtdO1xuICB9XG4gIGVsc2VcbiAgICAvLyBwcm9iYWJseSB5b3UgaGF2ZSBwYXNzZWQgYWxyZWFkeSBhIHRhZyBvciBhIE5vZGVMaXN0XG4gICAgeyBlbGVtID0gc2VsZWN0b3I7IH1cblxuICAvLyBzZWxlY3QgYWxsIHRoZSByZWdpc3RlcmVkIGFuZCBtb3VudCB0aGVtIGluc2lkZSB0aGVpciByb290IGVsZW1lbnRzXG4gIGlmICh0YWdOYW1lID09PSAnKicpIHtcbiAgICAvLyBnZXQgYWxsIGN1c3RvbSB0YWdzXG4gICAgdGFnTmFtZSA9IGFsbFRhZ3MgfHwgc2VsZWN0VGFncygpO1xuICAgIC8vIGlmIHRoZSByb290IGVscyBpdCdzIGp1c3QgYSBzaW5nbGUgdGFnXG4gICAgaWYgKGVsZW0udGFnTmFtZSlcbiAgICAgIHsgZWxlbSA9ICQkKHRhZ05hbWUsIGVsZW0pOyB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBzZWxlY3QgYWxsIHRoZSBjaGlsZHJlbiBmb3IgYWxsIHRoZSBkaWZmZXJlbnQgcm9vdCBlbGVtZW50c1xuICAgICAgdmFyIG5vZGVMaXN0ID0gW107XG5cbiAgICAgIGVhY2goZWxlbSwgZnVuY3Rpb24gKF9lbCkgeyByZXR1cm4gbm9kZUxpc3QucHVzaCgkJCh0YWdOYW1lLCBfZWwpKTsgfSk7XG5cbiAgICAgIGVsZW0gPSBub2RlTGlzdDtcbiAgICB9XG4gICAgLy8gZ2V0IHJpZCBvZiB0aGUgdGFnTmFtZVxuICAgIHRhZ05hbWUgPSAwO1xuICB9XG5cbiAgcHVzaFRhZ3NUbyhlbGVtKTtcblxuICByZXR1cm4gdGFnc1xufVxuXG4vLyBDcmVhdGUgYSBtaXhpbiB0aGF0IGNvdWxkIGJlIGdsb2JhbGx5IHNoYXJlZCBhY3Jvc3MgYWxsIHRoZSB0YWdzXG52YXIgbWl4aW5zID0ge307XG52YXIgZ2xvYmFscyA9IG1peGluc1tHTE9CQUxfTUlYSU5dID0ge307XG52YXIgbWl4aW5zX2lkID0gMDtcblxuLyoqXG4gKiBDcmVhdGUvUmV0dXJuIGEgbWl4aW4gYnkgaXRzIG5hbWVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gIG5hbWUgLSBtaXhpbiBuYW1lIChnbG9iYWwgbWl4aW4gaWYgb2JqZWN0KVxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgbWl4IC0gbWl4aW4gbG9naWNcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGcgLSBpcyBnbG9iYWw/XG4gKiBAcmV0dXJucyB7IE9iamVjdCB9ICB0aGUgbWl4aW4gbG9naWNcbiAqL1xuZnVuY3Rpb24gbWl4aW4kMShuYW1lLCBtaXgsIGcpIHtcbiAgLy8gVW5uYW1lZCBnbG9iYWxcbiAgaWYgKGlzT2JqZWN0KG5hbWUpKSB7XG4gICAgbWl4aW4kMSgoXCJfX1wiICsgKG1peGluc19pZCsrKSArIFwiX19cIiksIG5hbWUsIHRydWUpO1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN0b3JlID0gZyA/IGdsb2JhbHMgOiBtaXhpbnM7XG5cbiAgLy8gR2V0dGVyXG4gIGlmICghbWl4KSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKHN0b3JlW25hbWVdKSlcbiAgICAgIHsgdGhyb3cgbmV3IEVycm9yKChcIlVucmVnaXN0ZXJlZCBtaXhpbjogXCIgKyBuYW1lKSkgfVxuXG4gICAgcmV0dXJuIHN0b3JlW25hbWVdXG4gIH1cblxuICAvLyBTZXR0ZXJcbiAgc3RvcmVbbmFtZV0gPSBpc0Z1bmN0aW9uKG1peCkgP1xuICAgIGV4dGVuZChtaXgucHJvdG90eXBlLCBzdG9yZVtuYW1lXSB8fCB7fSkgJiYgbWl4IDpcbiAgICBleHRlbmQoc3RvcmVbbmFtZV0gfHwge30sIG1peCk7XG59XG5cbi8qKlxuICogVXBkYXRlIGFsbCB0aGUgdGFncyBpbnN0YW5jZXMgY3JlYXRlZFxuICogQHJldHVybnMgeyBBcnJheSB9IGFsbCB0aGUgdGFncyBpbnN0YW5jZXNcbiAqL1xuZnVuY3Rpb24gdXBkYXRlJDEoKSB7XG4gIHJldHVybiBlYWNoKF9fVEFHU19DQUNIRSwgZnVuY3Rpb24gKHRhZykgeyByZXR1cm4gdGFnLnVwZGF0ZSgpOyB9KVxufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVyJDEobmFtZSkge1xuICBfX1RBR19JTVBMW25hbWVdID0gbnVsbDtcbn1cblxudmFyIHZlcnNpb24kMSA9ICd2My41LjEnO1xuXG5cbnZhciBjb3JlID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFRhZzogVGFnJDIsXG5cdHRhZzogdGFnJDEsXG5cdHRhZzI6IHRhZzIkMSxcblx0bW91bnQ6IG1vdW50JDEsXG5cdG1peGluOiBtaXhpbiQxLFxuXHR1cGRhdGU6IHVwZGF0ZSQxLFxuXHR1bnJlZ2lzdGVyOiB1bnJlZ2lzdGVyJDEsXG5cdHZlcnNpb246IHZlcnNpb24kMVxufSk7XG5cbi8vIGNvdW50ZXIgdG8gZ2l2ZSBhIHVuaXF1ZSBpZCB0byBhbGwgdGhlIFRhZyBpbnN0YW5jZXNcbnZhciBfX3VpZCA9IDA7XG5cbi8qKlxuICogV2UgbmVlZCB0byB1cGRhdGUgb3B0cyBmb3IgdGhpcyB0YWcuIFRoYXQgcmVxdWlyZXMgdXBkYXRpbmcgdGhlIGV4cHJlc3Npb25zXG4gKiBpbiBhbnkgYXR0cmlidXRlcyBvbiB0aGUgdGFnLCBhbmQgdGhlbiBjb3B5aW5nIHRoZSByZXN1bHQgb250byBvcHRzLlxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7Qm9vbGVhbn0gaXNMb29wIC0gaXMgaXQgYSBsb29wIHRhZz9cbiAqIEBwYXJhbSAgIHsgVGFnIH0gIHBhcmVudCAtIHBhcmVudCB0YWcgbm9kZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gIGlzQW5vbnltb3VzIC0gaXMgaXQgYSB0YWcgd2l0aG91dCBhbnkgaW1wbD8gKGEgdGFnIG5vdCByZWdpc3RlcmVkKVxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgb3B0cyAtIHRhZyBvcHRpb25zXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gIGluc3RBdHRycyAtIHRhZyBhdHRyaWJ1dGVzIGFycmF5XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZU9wdHMoaXNMb29wLCBwYXJlbnQsIGlzQW5vbnltb3VzLCBvcHRzLCBpbnN0QXR0cnMpIHtcbiAgLy8gaXNBbm9ueW1vdXMgYGVhY2hgIHRhZ3MgdHJlYXQgYGRvbWAgYW5kIGByb290YCBkaWZmZXJlbnRseS4gSW4gdGhpcyBjYXNlXG4gIC8vIChhbmQgb25seSB0aGlzIGNhc2UpIHdlIGRvbid0IG5lZWQgdG8gZG8gdXBkYXRlT3B0cywgYmVjYXVzZSB0aGUgcmVndWxhciBwYXJzZVxuICAvLyB3aWxsIHVwZGF0ZSB0aG9zZSBhdHRycy4gUGx1cywgaXNBbm9ueW1vdXMgdGFncyBkb24ndCBuZWVkIG9wdHMgYW55d2F5XG4gIGlmIChpc0xvb3AgJiYgaXNBbm9ueW1vdXMpIHsgcmV0dXJuIH1cblxuICB2YXIgY3R4ID0gIWlzQW5vbnltb3VzICYmIGlzTG9vcCA/IHRoaXMgOiBwYXJlbnQgfHwgdGhpcztcbiAgZWFjaChpbnN0QXR0cnMsIGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgaWYgKGF0dHIuZXhwcikgeyB1cGRhdGVBbGxFeHByZXNzaW9ucy5jYWxsKGN0eCwgW2F0dHIuZXhwcl0pOyB9XG4gICAgLy8gbm9ybWFsaXplIHRoZSBhdHRyaWJ1dGUgbmFtZXNcbiAgICBvcHRzW3RvQ2FtZWwoYXR0ci5uYW1lKS5yZXBsYWNlKEFUVFJTX1BSRUZJWCwgJycpXSA9IGF0dHIuZXhwciA/IGF0dHIuZXhwci52YWx1ZSA6IGF0dHIudmFsdWU7XG4gIH0pO1xufVxuXG5cbi8qKlxuICogVGFnIGNsYXNzXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGltcGwgLSBpdCBjb250YWlucyB0aGUgdGFnIHRlbXBsYXRlLCBhbmQgbG9naWNcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGNvbmYgLSB0YWcgb3B0aW9uc1xuICogQHBhcmFtIHsgU3RyaW5nIH0gaW5uZXJIVE1MIC0gaHRtbCB0aGF0IGV2ZW50dWFsbHkgd2UgbmVlZCB0byBpbmplY3QgaW4gdGhlIHRhZ1xuICovXG5mdW5jdGlvbiBUYWckMShpbXBsLCBjb25mLCBpbm5lckhUTUwpIHtcbiAgaWYgKCBpbXBsID09PSB2b2lkIDAgKSBpbXBsID0ge307XG4gIGlmICggY29uZiA9PT0gdm9pZCAwICkgY29uZiA9IHt9O1xuXG4gIHZhciBvcHRzID0gZXh0ZW5kKHt9LCBjb25mLm9wdHMpLFxuICAgIHBhcmVudCA9IGNvbmYucGFyZW50LFxuICAgIGlzTG9vcCA9IGNvbmYuaXNMb29wLFxuICAgIGlzQW5vbnltb3VzID0gISFjb25mLmlzQW5vbnltb3VzLFxuICAgIHNraXBBbm9ueW1vdXMgPSBzZXR0aW5ncyQxLnNraXBBbm9ueW1vdXNUYWdzICYmIGlzQW5vbnltb3VzLFxuICAgIGl0ZW0gPSBjbGVhblVwRGF0YShjb25mLml0ZW0pLFxuICAgIGluZGV4ID0gY29uZi5pbmRleCwgLy8gYXZhaWxhYmxlIG9ubHkgZm9yIHRoZSBsb29wZWQgbm9kZXNcbiAgICBpbnN0QXR0cnMgPSBbXSwgLy8gQWxsIGF0dHJpYnV0ZXMgb24gdGhlIFRhZyB3aGVuIGl0J3MgZmlyc3QgcGFyc2VkXG4gICAgaW1wbEF0dHJzID0gW10sIC8vIGV4cHJlc3Npb25zIG9uIHRoaXMgdHlwZSBvZiBUYWdcbiAgICBleHByZXNzaW9ucyA9IFtdLFxuICAgIHJvb3QgPSBjb25mLnJvb3QsXG4gICAgdGFnTmFtZSA9IGNvbmYudGFnTmFtZSB8fCBnZXRUYWdOYW1lKHJvb3QpLFxuICAgIGlzVmlydHVhbCA9IHRhZ05hbWUgPT09ICd2aXJ0dWFsJyxcbiAgICBpc0lubGluZSA9ICFpc1ZpcnR1YWwgJiYgIWltcGwudG1wbCxcbiAgICBwcm9wc0luU3luY1dpdGhQYXJlbnQgPSBbXSxcbiAgICBkb207XG5cbiAgLy8gbWFrZSB0aGlzIHRhZyBvYnNlcnZhYmxlXG4gIGlmICghc2tpcEFub255bW91cykgeyBvYnNlcnZhYmxlJDEodGhpcyk7IH1cbiAgLy8gb25seSBjYWxsIHVubW91bnQgaWYgd2UgaGF2ZSBhIHZhbGlkIF9fVEFHX0lNUEwgKGhhcyBuYW1lIHByb3BlcnR5KVxuICBpZiAoaW1wbC5uYW1lICYmIHJvb3QuX3RhZykgeyByb290Ll90YWcudW5tb3VudCh0cnVlKTsgfVxuXG4gIC8vIG5vdCB5ZXQgbW91bnRlZFxuICB0aGlzLmlzTW91bnRlZCA9IGZhbHNlO1xuXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdfXycsIHtcbiAgICBpc0Fub255bW91czogaXNBbm9ueW1vdXMsXG4gICAgaW5zdEF0dHJzOiBpbnN0QXR0cnMsXG4gICAgaW5uZXJIVE1MOiBpbm5lckhUTUwsXG4gICAgdGFnTmFtZTogdGFnTmFtZSxcbiAgICBpbmRleDogaW5kZXgsXG4gICAgaXNMb29wOiBpc0xvb3AsXG4gICAgaXNJbmxpbmU6IGlzSW5saW5lLFxuICAgIC8vIHRhZ3MgaGF2aW5nIGV2ZW50IGxpc3RlbmVyc1xuICAgIC8vIGl0IHdvdWxkIGJlIGJldHRlciB0byB1c2Ugd2VhayBtYXBzIGhlcmUgYnV0IHdlIGNhbiBub3QgaW50cm9kdWNlIGJyZWFraW5nIGNoYW5nZXMgbm93XG4gICAgbGlzdGVuZXJzOiBbXSxcbiAgICAvLyB0aGVzZSB2YXJzIHdpbGwgYmUgbmVlZGVkIG9ubHkgZm9yIHRoZSB2aXJ0dWFsIHRhZ3NcbiAgICB2aXJ0czogW10sXG4gICAgdGFpbDogbnVsbCxcbiAgICBoZWFkOiBudWxsLFxuICAgIHBhcmVudDogbnVsbCxcbiAgICBpdGVtOiBudWxsXG4gIH0pO1xuXG4gIC8vIGNyZWF0ZSBhIHVuaXF1ZSBpZCB0byB0aGlzIHRhZ1xuICAvLyBpdCBjb3VsZCBiZSBoYW5keSB0byB1c2UgaXQgYWxzbyB0byBpbXByb3ZlIHRoZSB2aXJ0dWFsIGRvbSByZW5kZXJpbmcgc3BlZWRcbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ19yaW90X2lkJywgKytfX3VpZCk7IC8vIGJhc2UgMSBhbGxvd3MgdGVzdCAhdC5fcmlvdF9pZFxuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAncm9vdCcsIHJvb3QpO1xuICBleHRlbmQodGhpcywgeyBvcHRzOiBvcHRzIH0sIGl0ZW0pO1xuICAvLyBwcm90ZWN0IHRoZSBcInRhZ3NcIiBhbmQgXCJyZWZzXCIgcHJvcGVydHkgZnJvbSBiZWluZyBvdmVycmlkZGVuXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdwYXJlbnQnLCBwYXJlbnQgfHwgbnVsbCk7XG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICd0YWdzJywge30pO1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVmcycsIHt9KTtcblxuICBpZiAoaXNJbmxpbmUgfHwgaXNMb29wICYmIGlzQW5vbnltb3VzKSB7XG4gICAgZG9tID0gcm9vdDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWlzVmlydHVhbCkgeyByb290LmlubmVySFRNTCA9ICcnOyB9XG4gICAgZG9tID0gbWtkb20oaW1wbC50bXBsLCBpbm5lckhUTUwsIGlzU3ZnKHJvb3QpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHRhZyBleHByZXNzaW9ucyBhbmQgb3B0aW9uc1xuICAgKiBAcGFyYW0gICB7ICogfSAgZGF0YSAtIGRhdGEgd2Ugd2FudCB0byB1c2UgdG8gZXh0ZW5kIHRoZSB0YWcgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3VwZGF0ZScsIGZ1bmN0aW9uIHRhZ1VwZGF0ZShkYXRhKSB7XG4gICAgdmFyIG5leHRPcHRzID0ge30sXG4gICAgICBjYW5UcmlnZ2VyID0gdGhpcy5pc01vdW50ZWQgJiYgIXNraXBBbm9ueW1vdXM7XG5cbiAgICAvLyBtYWtlIHN1cmUgdGhlIGRhdGEgcGFzc2VkIHdpbGwgbm90IG92ZXJyaWRlXG4gICAgLy8gdGhlIGNvbXBvbmVudCBjb3JlIG1ldGhvZHNcbiAgICBkYXRhID0gY2xlYW5VcERhdGEoZGF0YSk7XG4gICAgZXh0ZW5kKHRoaXMsIGRhdGEpO1xuICAgIHVwZGF0ZU9wdHMuYXBwbHkodGhpcywgW2lzTG9vcCwgcGFyZW50LCBpc0Fub255bW91cywgbmV4dE9wdHMsIGluc3RBdHRyc10pO1xuXG4gICAgaWYgKGNhblRyaWdnZXIgJiYgdGhpcy5pc01vdW50ZWQgJiYgaXNGdW5jdGlvbih0aGlzLnNob3VsZFVwZGF0ZSkgJiYgIXRoaXMuc2hvdWxkVXBkYXRlKGRhdGEsIG5leHRPcHRzKSkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvLyBpbmhlcml0IHByb3BlcnRpZXMgZnJvbSB0aGUgcGFyZW50LCBidXQgb25seSBmb3IgaXNBbm9ueW1vdXMgdGFnc1xuICAgIGlmIChpc0xvb3AgJiYgaXNBbm9ueW1vdXMpIHsgaW5oZXJpdEZyb20uYXBwbHkodGhpcywgW3RoaXMucGFyZW50LCBwcm9wc0luU3luY1dpdGhQYXJlbnRdKTsgfVxuICAgIGV4dGVuZChvcHRzLCBuZXh0T3B0cyk7XG4gICAgaWYgKGNhblRyaWdnZXIpIHsgdGhpcy50cmlnZ2VyKCd1cGRhdGUnLCBkYXRhKTsgfVxuICAgIHVwZGF0ZUFsbEV4cHJlc3Npb25zLmNhbGwodGhpcywgZXhwcmVzc2lvbnMpO1xuICAgIGlmIChjYW5UcmlnZ2VyKSB7IHRoaXMudHJpZ2dlcigndXBkYXRlZCcpOyB9XG5cbiAgICByZXR1cm4gdGhpc1xuXG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgLyoqXG4gICAqIEFkZCBhIG1peGluIHRvIHRoaXMgdGFnXG4gICAqIEByZXR1cm5zIHsgVGFnIH0gdGhlIGN1cnJlbnQgdGFnIGluc3RhbmNlXG4gICAqL1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWl4aW4nLCBmdW5jdGlvbiB0YWdNaXhpbigpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGVhY2goYXJndW1lbnRzLCBmdW5jdGlvbiAobWl4KSB7XG4gICAgICB2YXIgaW5zdGFuY2UsIG9iajtcbiAgICAgIHZhciBwcm9wcyA9IFtdO1xuXG4gICAgICAvLyBwcm9wZXJ0aWVzIGJsYWNrbGlzdGVkIGFuZCB3aWxsIG5vdCBiZSBib3VuZCB0byB0aGUgdGFnIGluc3RhbmNlXG4gICAgICB2YXIgcHJvcHNCbGFja2xpc3QgPSBbJ2luaXQnLCAnX19wcm90b19fJ107XG5cbiAgICAgIG1peCA9IGlzU3RyaW5nKG1peCkgPyBtaXhpbiQxKG1peCkgOiBtaXg7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBtaXhpbiBpcyBhIGZ1bmN0aW9uXG4gICAgICBpZiAoaXNGdW5jdGlvbihtaXgpKSB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbmV3IG1peGluIGluc3RhbmNlXG4gICAgICAgIGluc3RhbmNlID0gbmV3IG1peCgpO1xuICAgICAgfSBlbHNlIHsgaW5zdGFuY2UgPSBtaXg7IH1cblxuICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGluc3RhbmNlKTtcblxuICAgICAgLy8gYnVpbGQgbXVsdGlsZXZlbCBwcm90b3R5cGUgaW5oZXJpdGFuY2UgY2hhaW4gcHJvcGVydHkgbGlzdFxuICAgICAgZG8geyBwcm9wcyA9IHByb3BzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmogfHwgaW5zdGFuY2UpKTsgfVxuICAgICAgd2hpbGUgKG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmogfHwgaW5zdGFuY2UpKVxuXG4gICAgICAvLyBsb29wIHRoZSBrZXlzIGluIHRoZSBmdW5jdGlvbiBwcm90b3R5cGUgb3IgdGhlIGFsbCBvYmplY3Qga2V5c1xuICAgICAgZWFjaChwcm9wcywgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAvLyBiaW5kIG1ldGhvZHMgdG8gdGhpc1xuICAgICAgICAvLyBhbGxvdyBtaXhpbnMgdG8gb3ZlcnJpZGUgb3RoZXIgcHJvcGVydGllcy9wYXJlbnQgbWl4aW5zXG4gICAgICAgIGlmICghY29udGFpbnMocHJvcHNCbGFja2xpc3QsIGtleSkpIHtcbiAgICAgICAgICAvLyBjaGVjayBmb3IgZ2V0dGVycy9zZXR0ZXJzXG4gICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGluc3RhbmNlLCBrZXkpIHx8IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIGtleSk7XG4gICAgICAgICAgdmFyIGhhc0dldHRlclNldHRlciA9IGRlc2NyaXB0b3IgJiYgKGRlc2NyaXB0b3IuZ2V0IHx8IGRlc2NyaXB0b3Iuc2V0KTtcblxuICAgICAgICAgIC8vIGFwcGx5IG1ldGhvZCBvbmx5IGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3Qgb24gdGhlIGluc3RhbmNlXG4gICAgICAgICAgaWYgKCF0aGlzJDEuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBoYXNHZXR0ZXJTZXR0ZXIpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzJDEsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMkMVtrZXldID0gaXNGdW5jdGlvbihpbnN0YW5jZVtrZXldKSA/XG4gICAgICAgICAgICAgIGluc3RhbmNlW2tleV0uYmluZCh0aGlzJDEpIDpcbiAgICAgICAgICAgICAgaW5zdGFuY2Vba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBpbml0IG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBhdXRvbWF0aWNhbGx5XG4gICAgICBpZiAoaW5zdGFuY2UuaW5pdClcbiAgICAgICAgeyBpbnN0YW5jZS5pbml0LmJpbmQodGhpcyQxKSgpOyB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXNcbiAgfS5iaW5kKHRoaXMpKTtcblxuICAvKipcbiAgICogTW91bnQgdGhlIGN1cnJlbnQgdGFnIGluc3RhbmNlXG4gICAqIEByZXR1cm5zIHsgVGFnIH0gdGhlIGN1cnJlbnQgdGFnIGluc3RhbmNlXG4gICAqL1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbW91bnQnLCBmdW5jdGlvbiB0YWdNb3VudCgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJvb3QuX3RhZyA9IHRoaXM7IC8vIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIHRhZyBqdXN0IGNyZWF0ZWRcblxuICAgIC8vIFJlYWQgYWxsIHRoZSBhdHRycyBvbiB0aGlzIGluc3RhbmNlLiBUaGlzIGdpdmUgdXMgdGhlIGluZm8gd2UgbmVlZCBmb3IgdXBkYXRlT3B0c1xuICAgIHBhcnNlQXR0cmlidXRlcy5hcHBseShwYXJlbnQsIFtyb290LCByb290LmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChhdHRyLCBleHByKSB7XG4gICAgICBpZiAoIWlzQW5vbnltb3VzICYmIFJlZkV4cHIuaXNQcm90b3R5cGVPZihleHByKSkgeyBleHByLnRhZyA9IHRoaXMkMTsgfVxuICAgICAgYXR0ci5leHByID0gZXhwcjtcbiAgICAgIGluc3RBdHRycy5wdXNoKGF0dHIpO1xuICAgIH1dKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgcm9vdCBhZGRpbmcgY3VzdG9tIGF0dHJpYnV0ZXMgY29taW5nIGZyb20gdGhlIGNvbXBpbGVyXG4gICAgaW1wbEF0dHJzID0gW107XG4gICAgd2Fsa0F0dHJzKGltcGwuYXR0cnMsIGZ1bmN0aW9uIChrLCB2KSB7IGltcGxBdHRycy5wdXNoKHtuYW1lOiBrLCB2YWx1ZTogdn0pOyB9KTtcbiAgICBwYXJzZUF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW3Jvb3QsIGltcGxBdHRycywgZnVuY3Rpb24gKGF0dHIsIGV4cHIpIHtcbiAgICAgIGlmIChleHByKSB7IGV4cHJlc3Npb25zLnB1c2goZXhwcik7IH1cbiAgICAgIGVsc2UgeyBzZXRBdHRyKHJvb3QsIGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7IH1cbiAgICB9XSk7XG5cbiAgICAvLyBpbml0aWFsaWF0aW9uXG4gICAgdXBkYXRlT3B0cy5hcHBseSh0aGlzLCBbaXNMb29wLCBwYXJlbnQsIGlzQW5vbnltb3VzLCBvcHRzLCBpbnN0QXR0cnNdKTtcblxuICAgIC8vIGFkZCBnbG9iYWwgbWl4aW5zXG4gICAgdmFyIGdsb2JhbE1peGluID0gbWl4aW4kMShHTE9CQUxfTUlYSU4pO1xuXG4gICAgaWYgKGdsb2JhbE1peGluICYmICFza2lwQW5vbnltb3VzKSB7XG4gICAgICBmb3IgKHZhciBpIGluIGdsb2JhbE1peGluKSB7XG4gICAgICAgIGlmIChnbG9iYWxNaXhpbi5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgIHRoaXMkMS5taXhpbihnbG9iYWxNaXhpbltpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW1wbC5mbikgeyBpbXBsLmZuLmNhbGwodGhpcywgb3B0cyk7IH1cblxuICAgIGlmICghc2tpcEFub255bW91cykgeyB0aGlzLnRyaWdnZXIoJ2JlZm9yZS1tb3VudCcpOyB9XG5cbiAgICAvLyBwYXJzZSBsYXlvdXQgYWZ0ZXIgaW5pdC4gZm4gbWF5IGNhbGN1bGF0ZSBhcmdzIGZvciBuZXN0ZWQgY3VzdG9tIHRhZ3NcbiAgICBwYXJzZUV4cHJlc3Npb25zLmFwcGx5KHRoaXMsIFtkb20sIGV4cHJlc3Npb25zLCBpc0Fub255bW91c10pO1xuXG4gICAgdGhpcy51cGRhdGUoaXRlbSk7XG5cbiAgICBpZiAoIWlzQW5vbnltb3VzICYmICFpc0lubGluZSkge1xuICAgICAgd2hpbGUgKGRvbS5maXJzdENoaWxkKSB7IHJvb3QuYXBwZW5kQ2hpbGQoZG9tLmZpcnN0Q2hpbGQpOyB9XG4gICAgfVxuXG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3Jvb3QnLCByb290KTtcbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXNNb3VudGVkJywgdHJ1ZSk7XG5cbiAgICBpZiAoc2tpcEFub255bW91cykgeyByZXR1cm4gfVxuXG4gICAgLy8gaWYgaXQncyBub3QgYSBjaGlsZCB0YWcgd2UgY2FuIHRyaWdnZXIgaXRzIG1vdW50IGV2ZW50XG4gICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy50cmlnZ2VyKCdtb3VudCcpO1xuICAgIH1cbiAgICAvLyBvdGhlcndpc2Ugd2UgbmVlZCB0byB3YWl0IHRoYXQgdGhlIHBhcmVudCBcIm1vdW50XCIgb3IgXCJ1cGRhdGVkXCIgZXZlbnQgZ2V0cyB0cmlnZ2VyZWRcbiAgICBlbHNlIHtcbiAgICAgIHZhciBwID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRoaXMucGFyZW50KTtcbiAgICAgIHAub25lKCFwLmlzTW91bnRlZCA/ICdtb3VudCcgOiAndXBkYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcyQxLnRyaWdnZXIoJ21vdW50Jyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuXG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgLyoqXG4gICAqIFVubW91bnQgdGhlIHRhZyBpbnN0YW5jZVxuICAgKiBAcGFyYW0geyBCb29sZWFuIH0gbXVzdEtlZXBSb290IC0gaWYgaXQncyB0cnVlIHRoZSByb290IG5vZGUgd2lsbCBub3QgYmUgcmVtb3ZlZFxuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3VubW91bnQnLCBmdW5jdGlvbiB0YWdVbm1vdW50KG11c3RLZWVwUm9vdCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIGVsID0gdGhpcy5yb290LFxuICAgICAgcCA9IGVsLnBhcmVudE5vZGUsXG4gICAgICBwdGFnLFxuICAgICAgdGFnSW5kZXggPSBfX1RBR1NfQ0FDSEUuaW5kZXhPZih0aGlzKTtcblxuICAgIGlmICghc2tpcEFub255bW91cykgeyB0aGlzLnRyaWdnZXIoJ2JlZm9yZS11bm1vdW50Jyk7IH1cblxuICAgIC8vIGNsZWFyIGFsbCBhdHRyaWJ1dGVzIGNvbWluZyBmcm9tIHRoZSBtb3VudGVkIHRhZ1xuICAgIHdhbGtBdHRycyhpbXBsLmF0dHJzLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgaWYgKHN0YXJ0c1dpdGgobmFtZSwgQVRUUlNfUFJFRklYKSlcbiAgICAgICAgeyBuYW1lID0gbmFtZS5zbGljZShBVFRSU19QUkVGSVgubGVuZ3RoKTsgfVxuXG4gICAgICByZW1BdHRyKHJvb3QsIG5hbWUpO1xuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5fXy5saXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoZG9tKSB7XG4gICAgICBPYmplY3Qua2V5cyhkb21bUklPVF9FVkVOVFNfS0VZXSkuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgIGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZG9tW1JJT1RfRVZFTlRTX0tFWV1bZXZlbnROYW1lXSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHJlbW92ZSB0aGlzIHRhZyBpbnN0YW5jZSBmcm9tIHRoZSBnbG9iYWwgdmlydHVhbERvbSB2YXJpYWJsZVxuICAgIGlmICh0YWdJbmRleCAhPT0gLTEpXG4gICAgICB7IF9fVEFHU19DQUNIRS5zcGxpY2UodGFnSW5kZXgsIDEpOyB9XG5cbiAgICBpZiAocCB8fCBpc1ZpcnR1YWwpIHtcbiAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgcHRhZyA9IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyhwYXJlbnQpO1xuXG4gICAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnRhZ3MpLmZvckVhY2goZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICAgICAgICAgIGFycmF5aXNoUmVtb3ZlKHB0YWcudGFncywgdGFnTmFtZSwgdGhpcyQxLnRhZ3NbdGFnTmFtZV0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFycmF5aXNoUmVtb3ZlKHB0YWcudGFncywgdGFnTmFtZSwgdGhpcyk7XG4gICAgICAgICAgLy8gcmVtb3ZlIGZyb20gX3BhcmVudCB0b29cbiAgICAgICAgICBpZihwYXJlbnQgIT09IHB0YWcpIHtcbiAgICAgICAgICAgIGFycmF5aXNoUmVtb3ZlKHBhcmVudC50YWdzLCB0YWdOYW1lLCB0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlbW92ZSB0aGUgdGFnIGNvbnRlbnRzXG4gICAgICAgIHNldElubmVySFRNTChlbCwgJycpO1xuICAgICAgfVxuXG4gICAgICBpZiAocCAmJiAhbXVzdEtlZXBSb290KSB7IHAucmVtb3ZlQ2hpbGQoZWwpOyB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX18udmlydHMpIHtcbiAgICAgIGVhY2godGhpcy5fXy52aXJ0cywgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgaWYgKHYucGFyZW50Tm9kZSkgeyB2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodik7IH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGFsbG93IGV4cHJlc3Npb25zIHRvIHVubW91bnQgdGhlbXNlbHZlc1xuICAgIHVubW91bnRBbGwoZXhwcmVzc2lvbnMpO1xuICAgIGVhY2goaW5zdEF0dHJzLCBmdW5jdGlvbiAoYSkgeyByZXR1cm4gYS5leHByICYmIGEuZXhwci51bm1vdW50ICYmIGEuZXhwci51bm1vdW50KCk7IH0pO1xuXG4gICAgLy8gY3VzdG9tIGludGVybmFsIHVubW91bnQgZnVuY3Rpb24gdG8gYXZvaWQgcmVseWluZyBvbiB0aGUgb2JzZXJ2YWJsZVxuICAgIGlmICh0aGlzLl9fLm9uVW5tb3VudCkgeyB0aGlzLl9fLm9uVW5tb3VudCgpOyB9XG5cbiAgICBpZiAoIXNraXBBbm9ueW1vdXMpIHtcbiAgICAgIHRoaXMudHJpZ2dlcigndW5tb3VudCcpO1xuICAgICAgdGhpcy5vZmYoJyonKTtcbiAgICB9XG5cbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXNNb3VudGVkJywgZmFsc2UpO1xuXG4gICAgZGVsZXRlIHRoaXMucm9vdC5fdGFnO1xuXG4gICAgcmV0dXJuIHRoaXNcblxuICB9LmJpbmQodGhpcykpO1xufVxuXG4vKipcbiAqIERldGVjdCB0aGUgdGFnIGltcGxlbWVudGF0aW9uIGJ5IGEgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2UgbmVlZCB0byBwYXJzZSB0byBnZXQgaXRzIHRhZyBpbXBsZW1lbnRhdGlvblxuICogQHJldHVybnMgeyBPYmplY3QgfSBpdCByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBhIGN1c3RvbSB0YWcgKHRlbXBsYXRlIGFuZCBib290IGZ1bmN0aW9uKVxuICovXG5mdW5jdGlvbiBnZXRUYWcoZG9tKSB7XG4gIHJldHVybiBkb20udGFnTmFtZSAmJiBfX1RBR19JTVBMW2dldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpIHx8XG4gICAgZ2V0QXR0cihkb20sIElTX0RJUkVDVElWRSkgfHwgZG9tLnRhZ05hbWUudG9Mb3dlckNhc2UoKV1cbn1cblxuLyoqXG4gKiBJbmhlcml0IHByb3BlcnRpZXMgZnJvbSBhIHRhcmdldCB0YWcgaW5zdGFuY2VcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBUYWcgfSB0YXJnZXQgLSB0YWcgd2hlcmUgd2Ugd2lsbCBpbmhlcml0IHByb3BlcnRpZXNcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBwcm9wc0luU3luY1dpdGhQYXJlbnQgLSBhcnJheSBvZiBwcm9wZXJ0aWVzIHRvIHN5bmMgd2l0aCB0aGUgdGFyZ2V0XG4gKi9cbmZ1bmN0aW9uIGluaGVyaXRGcm9tKHRhcmdldCwgcHJvcHNJblN5bmNXaXRoUGFyZW50KSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGVhY2goT2JqZWN0LmtleXModGFyZ2V0KSwgZnVuY3Rpb24gKGspIHtcbiAgICAvLyBzb21lIHByb3BlcnRpZXMgbXVzdCBiZSBhbHdheXMgaW4gc3luYyB3aXRoIHRoZSBwYXJlbnQgdGFnXG4gICAgdmFyIG11c3RTeW5jID0gIWlzUmVzZXJ2ZWROYW1lKGspICYmIGNvbnRhaW5zKHByb3BzSW5TeW5jV2l0aFBhcmVudCwgayk7XG5cbiAgICBpZiAoaXNVbmRlZmluZWQodGhpcyQxW2tdKSB8fCBtdXN0U3luYykge1xuICAgICAgLy8gdHJhY2sgdGhlIHByb3BlcnR5IHRvIGtlZXAgaW4gc3luY1xuICAgICAgLy8gc28gd2UgY2FuIGtlZXAgaXQgdXBkYXRlZFxuICAgICAgaWYgKCFtdXN0U3luYykgeyBwcm9wc0luU3luY1dpdGhQYXJlbnQucHVzaChrKTsgfVxuICAgICAgdGhpcyQxW2tdID0gdGFyZ2V0W2tdO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogTW92ZSB0aGUgcG9zaXRpb24gb2YgYSBjdXN0b20gdGFnIGluIGl0cyBwYXJlbnQgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIGtleSB3aGVyZSB0aGUgdGFnIHdhcyBzdG9yZWRcbiAqIEBwYXJhbSAgIHsgTnVtYmVyIH0gbmV3UG9zIC0gaW5kZXggd2hlcmUgdGhlIG5ldyB0YWcgd2lsbCBiZSBzdG9yZWRcbiAqL1xuZnVuY3Rpb24gbW92ZUNoaWxkVGFnKHRhZ05hbWUsIG5ld1Bvcykge1xuICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQsXG4gICAgdGFncztcbiAgLy8gbm8gcGFyZW50IG5vIG1vdmVcbiAgaWYgKCFwYXJlbnQpIHsgcmV0dXJuIH1cblxuICB0YWdzID0gcGFyZW50LnRhZ3NbdGFnTmFtZV07XG5cbiAgaWYgKGlzQXJyYXkodGFncykpXG4gICAgeyB0YWdzLnNwbGljZShuZXdQb3MsIDAsIHRhZ3Muc3BsaWNlKHRhZ3MuaW5kZXhPZih0aGlzKSwgMSlbMF0pOyB9XG4gIGVsc2UgeyBhcnJheWlzaEFkZChwYXJlbnQudGFncywgdGFnTmFtZSwgdGhpcyk7IH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgY2hpbGQgdGFnIGluY2x1ZGluZyBpdCBjb3JyZWN0bHkgaW50byBpdHMgcGFyZW50XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGNoaWxkIC0gY2hpbGQgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdHMgLSB0YWcgb3B0aW9ucyBjb250YWluaW5nIHRoZSBET00gbm9kZSB3aGVyZSB0aGUgdGFnIHdpbGwgYmUgbW91bnRlZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBpbm5lckhUTUwgLSBpbm5lciBodG1sIG9mIHRoZSBjaGlsZCBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHBhcmVudCAtIGluc3RhbmNlIG9mIHRoZSBwYXJlbnQgdGFnIGluY2x1ZGluZyB0aGUgY2hpbGQgY3VzdG9tIHRhZ1xuICogQHJldHVybnMgeyBPYmplY3QgfSBpbnN0YW5jZSBvZiB0aGUgbmV3IGNoaWxkIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gaW5pdENoaWxkVGFnKGNoaWxkLCBvcHRzLCBpbm5lckhUTUwsIHBhcmVudCkge1xuICB2YXIgdGFnID0gbmV3IFRhZyQxKGNoaWxkLCBvcHRzLCBpbm5lckhUTUwpLFxuICAgIHRhZ05hbWUgPSBvcHRzLnRhZ05hbWUgfHwgZ2V0VGFnTmFtZShvcHRzLnJvb3QsIHRydWUpLFxuICAgIHB0YWcgPSBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcocGFyZW50KTtcbiAgLy8gZml4IGZvciB0aGUgcGFyZW50IGF0dHJpYnV0ZSBpbiB0aGUgbG9vcGVkIGVsZW1lbnRzXG4gIGRlZmluZVByb3BlcnR5KHRhZywgJ3BhcmVudCcsIHB0YWcpO1xuICAvLyBzdG9yZSB0aGUgcmVhbCBwYXJlbnQgdGFnXG4gIC8vIGluIHNvbWUgY2FzZXMgdGhpcyBjb3VsZCBiZSBkaWZmZXJlbnQgZnJvbSB0aGUgY3VzdG9tIHBhcmVudCB0YWdcbiAgLy8gZm9yIGV4YW1wbGUgaW4gbmVzdGVkIGxvb3BzXG4gIHRhZy5fXy5wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgLy8gYWRkIHRoaXMgdGFnIHRvIHRoZSBjdXN0b20gcGFyZW50IHRhZ1xuICBhcnJheWlzaEFkZChwdGFnLnRhZ3MsIHRhZ05hbWUsIHRhZyk7XG5cbiAgLy8gYW5kIGFsc28gdG8gdGhlIHJlYWwgcGFyZW50IHRhZ1xuICBpZiAocHRhZyAhPT0gcGFyZW50KVxuICAgIHsgYXJyYXlpc2hBZGQocGFyZW50LnRhZ3MsIHRhZ05hbWUsIHRhZyk7IH1cblxuICByZXR1cm4gdGFnXG59XG5cbi8qKlxuICogTG9vcCBiYWNrd2FyZCBhbGwgdGhlIHBhcmVudHMgdHJlZSB0byBkZXRlY3QgdGhlIGZpcnN0IGN1c3RvbSBwYXJlbnQgdGFnXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHRhZyAtIGEgVGFnIGluc3RhbmNlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IHRoZSBpbnN0YW5jZSBvZiB0aGUgZmlyc3QgY3VzdG9tIHBhcmVudCB0YWcgZm91bmRcbiAqL1xuZnVuY3Rpb24gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRhZykge1xuICB2YXIgcHRhZyA9IHRhZztcbiAgd2hpbGUgKHB0YWcuX18uaXNBbm9ueW1vdXMpIHtcbiAgICBpZiAoIXB0YWcucGFyZW50KSB7IGJyZWFrIH1cbiAgICBwdGFnID0gcHRhZy5wYXJlbnQ7XG4gIH1cbiAgcmV0dXJuIHB0YWdcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIHRoZSB1bm1vdW50IG1ldGhvZCBvbiBhbGwgdGhlIGV4cHJlc3Npb25zXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gZXhwcmVzc2lvbnMgLSBET00gZXhwcmVzc2lvbnNcbiAqL1xuZnVuY3Rpb24gdW5tb3VudEFsbChleHByZXNzaW9ucykge1xuICBlYWNoKGV4cHJlc3Npb25zLCBmdW5jdGlvbihleHByKSB7XG4gICAgaWYgKGV4cHIgaW5zdGFuY2VvZiBUYWckMSkgeyBleHByLnVubW91bnQodHJ1ZSk7IH1cbiAgICBlbHNlIGlmIChleHByLnRhZ05hbWUpIHsgZXhwci50YWcudW5tb3VudCh0cnVlKTsgfVxuICAgIGVsc2UgaWYgKGV4cHIudW5tb3VudCkgeyBleHByLnVubW91bnQoKTsgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHRhZyBuYW1lIG9mIGFueSBET00gbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBza2lwRGF0YUlzIC0gaGFjayB0byBpZ25vcmUgdGhlIGRhdGEtaXMgYXR0cmlidXRlIHdoZW4gYXR0YWNoaW5nIHRvIHBhcmVudFxuICogQHJldHVybnMgeyBTdHJpbmcgfSBuYW1lIHRvIGlkZW50aWZ5IHRoaXMgZG9tIG5vZGUgaW4gcmlvdFxuICovXG5mdW5jdGlvbiBnZXRUYWdOYW1lKGRvbSwgc2tpcERhdGFJcykge1xuICB2YXIgY2hpbGQgPSBnZXRUYWcoZG9tKSxcbiAgICBuYW1lZFRhZyA9ICFza2lwRGF0YUlzICYmIGdldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpO1xuICByZXR1cm4gbmFtZWRUYWcgJiYgIXRtcGwuaGFzRXhwcihuYW1lZFRhZykgP1xuICAgICAgICAgICAgICAgIG5hbWVkVGFnIDpcbiAgICAgICAgICAgICAgY2hpbGQgPyBjaGlsZC5uYW1lIDogZG9tLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxufVxuXG4vKipcbiAqIFdpdGggdGhpcyBmdW5jdGlvbiB3ZSBhdm9pZCB0aGF0IHRoZSBpbnRlcm5hbCBUYWcgbWV0aG9kcyBnZXQgb3ZlcnJpZGRlblxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkYXRhIC0gb3B0aW9ucyB3ZSB3YW50IHRvIHVzZSB0byBleHRlbmQgdGhlIHRhZyBpbnN0YW5jZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBjbGVhbiBvYmplY3Qgd2l0aG91dCBjb250YWluaW5nIHRoZSByaW90IGludGVybmFsIHJlc2VydmVkIHdvcmRzXG4gKi9cbmZ1bmN0aW9uIGNsZWFuVXBEYXRhKGRhdGEpIHtcbiAgaWYgKCEoZGF0YSBpbnN0YW5jZW9mIFRhZyQxKSAmJiAhKGRhdGEgJiYgaXNGdW5jdGlvbihkYXRhLnRyaWdnZXIpKSlcbiAgICB7IHJldHVybiBkYXRhIH1cblxuICB2YXIgbyA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgIGlmICghUkVfUkVTRVJWRURfTkFNRVMudGVzdChrZXkpKSB7IG9ba2V5XSA9IGRhdGFba2V5XTsgfVxuICB9XG4gIHJldHVybiBvXG59XG5cbi8qKlxuICogU2V0IHRoZSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgZm9yIGEgZ2l2ZW4ga2V5LiBJZiBzb21ldGhpbmcgYWxyZWFkeVxuICogZXhpc3RzIHRoZXJlLCB0aGVuIGl0IGJlY29tZXMgYW4gYXJyYXkgY29udGFpbmluZyBib3RoIHRoZSBvbGQgYW5kIG5ldyB2YWx1ZS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IG9iaiAtIG9iamVjdCBvbiB3aGljaCB0byBzZXQgdGhlIHByb3BlcnR5XG4gKiBAcGFyYW0geyBTdHJpbmcgfSBrZXkgLSBwcm9wZXJ0eSBuYW1lXG4gKiBAcGFyYW0geyBPYmplY3QgfSB2YWx1ZSAtIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgc2V0XG4gKiBAcGFyYW0geyBCb29sZWFuIH0gZW5zdXJlQXJyYXkgLSBlbnN1cmUgdGhhdCB0aGUgcHJvcGVydHkgcmVtYWlucyBhbiBhcnJheVxuICogQHBhcmFtIHsgTnVtYmVyIH0gaW5kZXggLSBhZGQgdGhlIG5ldyBpdGVtIGluIGEgY2VydGFpbiBhcnJheSBwb3NpdGlvblxuICovXG5mdW5jdGlvbiBhcnJheWlzaEFkZChvYmosIGtleSwgdmFsdWUsIGVuc3VyZUFycmF5LCBpbmRleCkge1xuICB2YXIgZGVzdCA9IG9ialtrZXldO1xuICB2YXIgaXNBcnIgPSBpc0FycmF5KGRlc3QpO1xuICB2YXIgaGFzSW5kZXggPSAhaXNVbmRlZmluZWQoaW5kZXgpO1xuXG4gIGlmIChkZXN0ICYmIGRlc3QgPT09IHZhbHVlKSB7IHJldHVybiB9XG5cbiAgLy8gaWYgdGhlIGtleSB3YXMgbmV2ZXIgc2V0LCBzZXQgaXQgb25jZVxuICBpZiAoIWRlc3QgJiYgZW5zdXJlQXJyYXkpIHsgb2JqW2tleV0gPSBbdmFsdWVdOyB9XG4gIGVsc2UgaWYgKCFkZXN0KSB7IG9ialtrZXldID0gdmFsdWU7IH1cbiAgLy8gaWYgaXQgd2FzIGFuIGFycmF5IGFuZCBub3QgeWV0IHNldFxuICBlbHNlIHtcbiAgICBpZiAoaXNBcnIpIHtcbiAgICAgIHZhciBvbGRJbmRleCA9IGRlc3QuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAvLyB0aGlzIGl0ZW0gbmV2ZXIgY2hhbmdlZCBpdHMgcG9zaXRpb25cbiAgICAgIGlmIChvbGRJbmRleCA9PT0gaW5kZXgpIHsgcmV0dXJuIH1cbiAgICAgIC8vIHJlbW92ZSB0aGUgaXRlbSBmcm9tIGl0cyBvbGQgcG9zaXRpb25cbiAgICAgIGlmIChvbGRJbmRleCAhPT0gLTEpIHsgZGVzdC5zcGxpY2Uob2xkSW5kZXgsIDEpOyB9XG4gICAgICAvLyBtb3ZlIG9yIGFkZCB0aGUgaXRlbVxuICAgICAgaWYgKGhhc0luZGV4KSB7XG4gICAgICAgIGRlc3Quc3BsaWNlKGluZGV4LCAwLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXN0LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7IG9ialtrZXldID0gW2Rlc3QsIHZhbHVlXTsgfVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gYW4gb2JqZWN0IGF0IGEgZ2l2ZW4ga2V5LiBJZiB0aGUga2V5IHBvaW50cyB0byBhbiBhcnJheSxcbiAqIHRoZW4gdGhlIGl0ZW0gaXMganVzdCByZW1vdmVkIGZyb20gdGhlIGFycmF5LlxuICogQHBhcmFtIHsgT2JqZWN0IH0gb2JqIC0gb2JqZWN0IG9uIHdoaWNoIHRvIHJlbW92ZSB0aGUgcHJvcGVydHlcbiAqIEBwYXJhbSB7IFN0cmluZyB9IGtleSAtIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHZhbHVlIC0gdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSByZW1vdmVkXG4gKiBAcGFyYW0geyBCb29sZWFuIH0gZW5zdXJlQXJyYXkgLSBlbnN1cmUgdGhhdCB0aGUgcHJvcGVydHkgcmVtYWlucyBhbiBhcnJheVxuKi9cbmZ1bmN0aW9uIGFycmF5aXNoUmVtb3ZlKG9iaiwga2V5LCB2YWx1ZSwgZW5zdXJlQXJyYXkpIHtcbiAgaWYgKGlzQXJyYXkob2JqW2tleV0pKSB7XG4gICAgdmFyIGluZGV4ID0gb2JqW2tleV0uaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkgeyBvYmpba2V5XS5zcGxpY2UoaW5kZXgsIDEpOyB9XG4gICAgaWYgKCFvYmpba2V5XS5sZW5ndGgpIHsgZGVsZXRlIG9ialtrZXldOyB9XG4gICAgZWxzZSBpZiAob2JqW2tleV0ubGVuZ3RoID09PSAxICYmICFlbnN1cmVBcnJheSkgeyBvYmpba2V5XSA9IG9ialtrZXldWzBdOyB9XG4gIH0gZWxzZVxuICAgIHsgZGVsZXRlIG9ialtrZXldOyB9IC8vIG90aGVyd2lzZSBqdXN0IGRlbGV0ZSB0aGUga2V5XG59XG5cbi8qKlxuICogTW91bnQgYSB0YWcgY3JlYXRpbmcgbmV3IFRhZyBpbnN0YW5jZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSByb290IC0gZG9tIG5vZGUgd2hlcmUgdGhlIHRhZyB3aWxsIGJlIG1vdW50ZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIG5hbWUgb2YgdGhlIHJpb3QgdGFnIHdlIHdhbnQgdG8gbW91bnRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIG9wdGlvbnMgdG8gcGFzcyB0byB0aGUgVGFnIGluc3RhbmNlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGN0eCAtIG9wdGlvbmFsIGNvbnRleHQgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZXh0ZW5kIGFuIGV4aXN0aW5nIGNsYXNzICggdXNlZCBpbiByaW90LlRhZyApXG4gKiBAcmV0dXJucyB7IFRhZyB9IGEgbmV3IFRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBtb3VudFRvKHJvb3QsIHRhZ05hbWUsIG9wdHMsIGN0eCkge1xuICB2YXIgaW1wbCA9IF9fVEFHX0lNUExbdGFnTmFtZV0sXG4gICAgaW1wbENsYXNzID0gX19UQUdfSU1QTFt0YWdOYW1lXS5jbGFzcyxcbiAgICB0YWcgPSBjdHggfHwgKGltcGxDbGFzcyA/IE9iamVjdC5jcmVhdGUoaW1wbENsYXNzLnByb3RvdHlwZSkgOiB7fSksXG4gICAgLy8gY2FjaGUgdGhlIGlubmVyIEhUTUwgdG8gZml4ICM4NTVcbiAgICBpbm5lckhUTUwgPSByb290Ll9pbm5lckhUTUwgPSByb290Ll9pbm5lckhUTUwgfHwgcm9vdC5pbm5lckhUTUw7XG5cbiAgdmFyIGNvbmYgPSBleHRlbmQoeyByb290OiByb290LCBvcHRzOiBvcHRzIH0sIHsgcGFyZW50OiBvcHRzID8gb3B0cy5wYXJlbnQgOiBudWxsIH0pO1xuXG4gIGlmIChpbXBsICYmIHJvb3QpIHsgVGFnJDEuYXBwbHkodGFnLCBbaW1wbCwgY29uZiwgaW5uZXJIVE1MXSk7IH1cblxuICBpZiAodGFnICYmIHRhZy5tb3VudCkge1xuICAgIHRhZy5tb3VudCh0cnVlKTtcbiAgICAvLyBhZGQgdGhpcyB0YWcgdG8gdGhlIHZpcnR1YWxEb20gdmFyaWFibGVcbiAgICBpZiAoIWNvbnRhaW5zKF9fVEFHU19DQUNIRSwgdGFnKSkgeyBfX1RBR1NfQ0FDSEUucHVzaCh0YWcpOyB9XG4gIH1cblxuICByZXR1cm4gdGFnXG59XG5cbi8qKlxuICogbWFrZXMgYSB0YWcgdmlydHVhbCBhbmQgcmVwbGFjZXMgYSByZWZlcmVuY2UgaW4gdGhlIGRvbVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyB0YWcgfSB0aGUgdGFnIHRvIG1ha2UgdmlydHVhbFxuICogQHBhcmFtIHsgcmVmIH0gdGhlIGRvbSByZWZlcmVuY2UgbG9jYXRpb25cbiAqL1xuZnVuY3Rpb24gbWFrZVJlcGxhY2VWaXJ0dWFsKHRhZywgcmVmKSB7XG4gIHZhciBmcmFnID0gY3JlYXRlRnJhZygpO1xuICBtYWtlVmlydHVhbC5jYWxsKHRhZywgZnJhZyk7XG4gIHJlZi5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChmcmFnLCByZWYpO1xufVxuXG4vKipcbiAqIEFkZHMgdGhlIGVsZW1lbnRzIGZvciBhIHZpcnR1YWwgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IE5vZGUgfSBzcmMgLSB0aGUgbm9kZSB0aGF0IHdpbGwgZG8gdGhlIGluc2VydGluZyBvciBhcHBlbmRpbmdcbiAqIEBwYXJhbSB7IFRhZyB9IHRhcmdldCAtIG9ubHkgaWYgaW5zZXJ0aW5nLCBpbnNlcnQgYmVmb3JlIHRoaXMgdGFnJ3MgZmlyc3QgY2hpbGRcbiAqL1xuZnVuY3Rpb24gbWFrZVZpcnR1YWwoc3JjLCB0YXJnZXQpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGhlYWQgPSBjcmVhdGVET01QbGFjZWhvbGRlcigpLFxuICAgIHRhaWwgPSBjcmVhdGVET01QbGFjZWhvbGRlcigpLFxuICAgIGZyYWcgPSBjcmVhdGVGcmFnKCksXG4gICAgc2liLCBlbDtcblxuICB0aGlzLnJvb3QuaW5zZXJ0QmVmb3JlKGhlYWQsIHRoaXMucm9vdC5maXJzdENoaWxkKTtcbiAgdGhpcy5yb290LmFwcGVuZENoaWxkKHRhaWwpO1xuXG4gIHRoaXMuX18uaGVhZCA9IGVsID0gaGVhZDtcbiAgdGhpcy5fXy50YWlsID0gdGFpbDtcblxuICB3aGlsZSAoZWwpIHtcbiAgICBzaWIgPSBlbC5uZXh0U2libGluZztcbiAgICBmcmFnLmFwcGVuZENoaWxkKGVsKTtcbiAgICB0aGlzJDEuX18udmlydHMucHVzaChlbCk7IC8vIGhvbGQgZm9yIHVubW91bnRpbmdcbiAgICBlbCA9IHNpYjtcbiAgfVxuXG4gIGlmICh0YXJnZXQpXG4gICAgeyBzcmMuaW5zZXJ0QmVmb3JlKGZyYWcsIHRhcmdldC5fXy5oZWFkKTsgfVxuICBlbHNlXG4gICAgeyBzcmMuYXBwZW5kQ2hpbGQoZnJhZyk7IH1cbn1cblxuLyoqXG4gKiBNb3ZlIHZpcnR1YWwgdGFnIGFuZCBhbGwgY2hpbGQgbm9kZXNcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtIHsgTm9kZSB9IHNyYyAgLSB0aGUgbm9kZSB0aGF0IHdpbGwgZG8gdGhlIGluc2VydGluZ1xuICogQHBhcmFtIHsgVGFnIH0gdGFyZ2V0IC0gaW5zZXJ0IGJlZm9yZSB0aGlzIHRhZydzIGZpcnN0IGNoaWxkXG4gKi9cbmZ1bmN0aW9uIG1vdmVWaXJ0dWFsKHNyYywgdGFyZ2V0KSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciBlbCA9IHRoaXMuX18uaGVhZCxcbiAgICBmcmFnID0gY3JlYXRlRnJhZygpLFxuICAgIHNpYjtcblxuICB3aGlsZSAoZWwpIHtcbiAgICBzaWIgPSBlbC5uZXh0U2libGluZztcbiAgICBmcmFnLmFwcGVuZENoaWxkKGVsKTtcbiAgICBlbCA9IHNpYjtcbiAgICBpZiAoZWwgPT09IHRoaXMkMS5fXy50YWlsKSB7XG4gICAgICBmcmFnLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgIHNyYy5pbnNlcnRCZWZvcmUoZnJhZywgdGFyZ2V0Ll9fLmhlYWQpO1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgc2VsZWN0b3JzIGZvciB0YWdzXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gdGFncyAtIHRhZyBuYW1lcyB0byBzZWxlY3RcbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gc2VsZWN0b3JcbiAqL1xuZnVuY3Rpb24gc2VsZWN0VGFncyh0YWdzKSB7XG4gIC8vIHNlbGVjdCBhbGwgdGFnc1xuICBpZiAoIXRhZ3MpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKF9fVEFHX0lNUEwpO1xuICAgIHJldHVybiBrZXlzICsgc2VsZWN0VGFncyhrZXlzKVxuICB9XG5cbiAgcmV0dXJuIHRhZ3NcbiAgICAuZmlsdGVyKGZ1bmN0aW9uICh0KSB7IHJldHVybiAhL1teLVxcd10vLnRlc3QodCk7IH0pXG4gICAgLnJlZHVjZShmdW5jdGlvbiAobGlzdCwgdCkge1xuICAgICAgdmFyIG5hbWUgPSB0LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIGxpc3QgKyBcIixbXCIgKyBJU19ESVJFQ1RJVkUgKyBcIj1cXFwiXCIgKyBuYW1lICsgXCJcXFwiXVwiXG4gICAgfSwgJycpXG59XG5cblxudmFyIHRhZ3MgPSBPYmplY3QuZnJlZXplKHtcblx0Z2V0VGFnOiBnZXRUYWcsXG5cdGluaGVyaXRGcm9tOiBpbmhlcml0RnJvbSxcblx0bW92ZUNoaWxkVGFnOiBtb3ZlQ2hpbGRUYWcsXG5cdGluaXRDaGlsZFRhZzogaW5pdENoaWxkVGFnLFxuXHRnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWc6IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyxcblx0dW5tb3VudEFsbDogdW5tb3VudEFsbCxcblx0Z2V0VGFnTmFtZTogZ2V0VGFnTmFtZSxcblx0Y2xlYW5VcERhdGE6IGNsZWFuVXBEYXRhLFxuXHRhcnJheWlzaEFkZDogYXJyYXlpc2hBZGQsXG5cdGFycmF5aXNoUmVtb3ZlOiBhcnJheWlzaFJlbW92ZSxcblx0bW91bnRUbzogbW91bnRUbyxcblx0bWFrZVJlcGxhY2VWaXJ0dWFsOiBtYWtlUmVwbGFjZVZpcnR1YWwsXG5cdG1ha2VWaXJ0dWFsOiBtYWtlVmlydHVhbCxcblx0bW92ZVZpcnR1YWw6IG1vdmVWaXJ0dWFsLFxuXHRzZWxlY3RUYWdzOiBzZWxlY3RUYWdzXG59KTtcblxuLyoqXG4gKiBSaW90IHB1YmxpYyBhcGlcbiAqL1xudmFyIHNldHRpbmdzID0gc2V0dGluZ3MkMTtcbnZhciB1dGlsID0ge1xuICB0bXBsOiB0bXBsLFxuICBicmFja2V0czogYnJhY2tldHMsXG4gIHN0eWxlTWFuYWdlcjogc3R5bGVNYW5hZ2VyLFxuICB2ZG9tOiBfX1RBR1NfQ0FDSEUsXG4gIHN0eWxlTm9kZTogc3R5bGVNYW5hZ2VyLnN0eWxlTm9kZSxcbiAgLy8gZXhwb3J0IHRoZSByaW90IGludGVybmFsIHV0aWxzIGFzIHdlbGxcbiAgZG9tOiBkb20sXG4gIGNoZWNrOiBjaGVjayxcbiAgbWlzYzogbWlzYyxcbiAgdGFnczogdGFnc1xufTtcblxuLy8gZXhwb3J0IHRoZSBjb3JlIHByb3BzL21ldGhvZHNcbnZhciBUYWckJDEgPSBUYWckMjtcbnZhciB0YWckJDEgPSB0YWckMTtcbnZhciB0YWcyJCQxID0gdGFnMiQxO1xudmFyIG1vdW50JCQxID0gbW91bnQkMTtcbnZhciBtaXhpbiQkMSA9IG1peGluJDE7XG52YXIgdXBkYXRlJCQxID0gdXBkYXRlJDE7XG52YXIgdW5yZWdpc3RlciQkMSA9IHVucmVnaXN0ZXIkMTtcbnZhciB2ZXJzaW9uJCQxID0gdmVyc2lvbiQxO1xudmFyIG9ic2VydmFibGUgPSBvYnNlcnZhYmxlJDE7XG5cbnZhciByaW90JDEgPSBleHRlbmQoe30sIGNvcmUsIHtcbiAgb2JzZXJ2YWJsZTogb2JzZXJ2YWJsZSQxLFxuICBzZXR0aW5nczogc2V0dGluZ3MsXG4gIHV0aWw6IHV0aWwsXG59KTtcblxuZXhwb3J0cy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuZXhwb3J0cy51dGlsID0gdXRpbDtcbmV4cG9ydHMuVGFnID0gVGFnJCQxO1xuZXhwb3J0cy50YWcgPSB0YWckJDE7XG5leHBvcnRzLnRhZzIgPSB0YWcyJCQxO1xuZXhwb3J0cy5tb3VudCA9IG1vdW50JCQxO1xuZXhwb3J0cy5taXhpbiA9IG1peGluJCQxO1xuZXhwb3J0cy51cGRhdGUgPSB1cGRhdGUkJDE7XG5leHBvcnRzLnVucmVnaXN0ZXIgPSB1bnJlZ2lzdGVyJCQxO1xuZXhwb3J0cy52ZXJzaW9uID0gdmVyc2lvbiQkMTtcbmV4cG9ydHMub2JzZXJ2YWJsZSA9IG9ic2VydmFibGU7XG5leHBvcnRzWydkZWZhdWx0J10gPSByaW90JDE7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG4iXX0=
