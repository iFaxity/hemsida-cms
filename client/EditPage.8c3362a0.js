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
})({"components/edit/Textfield.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
var _default = {
  props: {
    label: String,
    value: String
  },
  computed: {
    model: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      }

    }
  }
};
exports.default = _default;
        var $cc2b5e = exports.default || module.exports;
      
      if (typeof $cc2b5e === 'function') {
        $cc2b5e = $cc2b5e.options;
      }
    
        /* template */
        Object.assign($cc2b5e, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("mdc-textfield", {
    attrs: { label: _vm.label },
    model: {
      value: _vm.model,
      callback: function($$v) {
        _vm.model = $$v
      },
      expression: "model"
    }
  })
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
            api.createRecord('$cc2b5e', $cc2b5e);
          } else {
            api.reload('$cc2b5e', $cc2b5e);
          }
        }

        
      }
    })();
},{"vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"components/edit/Textarea.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
var _default = {
  props: {
    label: String,
    value: String
  },
  computed: {
    model: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      }

    }
  }
};
exports.default = _default;
        var $8efe6a = exports.default || module.exports;
      
      if (typeof $8efe6a === 'function') {
        $8efe6a = $8efe6a.options;
      }
    
        /* template */
        Object.assign($8efe6a, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("mdc-textfield", {
    attrs: {
      multiline: "multiline",
      cols: "100",
      rows: "100",
      label: _vm.label
    },
    model: {
      value: _vm.model,
      callback: function($$v) {
        _vm.model = $$v
      },
      expression: "model"
    }
  })
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
            api.createRecord('$8efe6a', $8efe6a);
          } else {
            api.reload('$8efe6a', $8efe6a);
          }
        }

        
      }
    })();
},{"vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"components/edit/Froala.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
var _default = {
  props: {
    label: String,
    value: String
  },
  computed: {
    model: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      }

    }
  }
};
exports.default = _default;
        var $54bd01 = exports.default || module.exports;
      
      if (typeof $54bd01 === 'function') {
        $54bd01 = $54bd01.options;
      }
    
        /* template */
        Object.assign($54bd01, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("mdc-textfield", {
    attrs: { multiline: "multiline", label: _vm.label },
    model: {
      value: _vm.model,
      callback: function($$v) {
        _vm.model = $$v
      },
      expression: "model"
    }
  })
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
            api.createRecord('$54bd01', $54bd01);
          } else {
            api.reload('$54bd01', $54bd01);
          }
        }

        
      }
    })();
},{"vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"components/edit/Media.vue":[function(require,module,exports) {
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
var _default = {
  props: {
    label: String,
    value: String
  }
};
exports.default = _default;
        var $07b779 = exports.default || module.exports;
      
      if (typeof $07b779 === 'function') {
        $07b779 = $07b779.options;
      }
    
        /* template */
        Object.assign($07b779, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "media" }, [
      _c("h3", [_vm._v("Not yet finished")])
    ])
  }
]
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
            api.createRecord('$07b779', $07b779);
          } else {
            api.reload('$07b779', $07b779);
          }
        }

        
      }
    })();
},{"vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"components/edit/Number.vue":[function(require,module,exports) {
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
var _default = {
  props: {
    label: String,
    value: String
  }
};
exports.default = _default;
        var $a6e679 = exports.default || module.exports;
      
      if (typeof $a6e679 === 'function') {
        $a6e679 = $a6e679.options;
      }
    
        /* template */
        Object.assign($a6e679, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "number" }, [
      _c("h3", [_vm._v("Not yet finished")])
    ])
  }
]
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
            api.createRecord('$a6e679', $a6e679);
          } else {
            api.reload('$a6e679', $a6e679);
          }
        }

        
      }
    })();
},{"vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"components/edit/Boolean.vue":[function(require,module,exports) {
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
var _default = {
  model: {
    event: 'changed',
    prop: 'checked'
  },
  props: {
    label: String,
    checked: Boolean
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },

      set(checked) {
        this.$emit('changed', checked);
      }

    }
  }
};
exports.default = _default;
        var $4548dc = exports.default || module.exports;
      
      if (typeof $4548dc === 'function') {
        $4548dc = $4548dc.options;
      }
    
        /* template */
        Object.assign($4548dc, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "mdc-form-field",
    { attrs: { label: _vm.label } },
    [
      _c("mdc-checkbox", {
        model: {
          value: _vm.model,
          callback: function($$v) {
            _vm.model = $$v
          },
          expression: "model"
        }
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
            api.createRecord('$4548dc', $4548dc);
          } else {
            api.reload('$4548dc', $4548dc);
          }
        }

        
      }
    })();
},{"vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"components/edit/Collection.vue":[function(require,module,exports) {
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
var _default = {
  props: {
    label: String,
    value: String
  }
};
exports.default = _default;
        var $a5c162 = exports.default || module.exports;
      
      if (typeof $a5c162 === 'function') {
        $a5c162 = $a5c162.options;
      }
    
        /* template */
        Object.assign($a5c162, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "collection" }, [
      _c("h3", [_vm._v("Not yet finished")])
    ])
  }
]
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
            api.createRecord('$a5c162', $a5c162);
          } else {
            api.reload('$a5c162', $a5c162);
          }
        }

        
      }
    })();
},{"vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"components/EditPage.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Textfield = _interopRequireDefault(require("./edit/Textfield.vue"));

var _Textarea = _interopRequireDefault(require("./edit/Textarea.vue"));

var _Froala = _interopRequireDefault(require("./edit/Froala.vue"));

var _Media = _interopRequireDefault(require("./edit/Media.vue"));

var _Number = _interopRequireDefault(require("./edit/Number.vue"));

var _Boolean = _interopRequireDefault(require("./edit/Boolean.vue"));

var _Collection = _interopRequireDefault(require("./edit/Collection.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const FIELDS = {
  paragraph: 'textfield',
  text: 'textarea',
  wysiwyg: 'froala',
  html: 'textarea',
  media: 'media',
  number: 'number',
  boolean: 'boolean',
  collection: 'collection'
};
var _default = {
  name: 'CmsEditPage',
  components: {
    EditTextfield: _Textfield.default,
    EditTextarea: _Textarea.default,
    EditFroala: _Froala.default,
    EditMedia: _Media.default,
    EditNumber: _Number.default,
    EditBoolean: _Boolean.default,
    EditCollection: _Collection.default
  },
  props: {},

  data() {
    return {
      label: '',
      published: false,
      fields: {}
    };
  },

  computed: {
    slug() {
      return this.$route.params.page;
    }

  },

  async created() {
    const token = this.$auth.token; // Call api function to get current pages

    try {
      const page = await this.$api(`/page/${this.slug}`); // Add is prop to field

      Object.keys(page.fields).forEach(key => {
        const field = page.fields[key];
        field.is = `edit-${FIELDS[field.type]}`;
      });
      this.fields = page.fields;
      this.published = page.published;
      this.label = page.label;
    } catch (ex) {
      this.$snackbar.show(ex.message);
    }
  },

  methods: {
    async save() {
      const token = this.$auth.token; // Call api function to save changes

      try {
        const fields = Object.keys(this.fields).reduce((fields, key) => {
          const {
            is,
            ...newField
          } = this.fields[key];
          fields[key] = newField;
          return fields;
        }, {});
        const page = await this.$api(`/page/${this.slug}`, {
          method: 'post',
          body: {
            data: {
              fields,
              published: this.published,
              label: this.label
            }
          }
        });
        this.$snackbar.show('Ändringarna sparades');
      } catch (ex) {
        this.$snackbar.show(ex.message);
      }
    }

  }
};
exports.default = _default;
        var $6dee8f = exports.default || module.exports;
      
      if (typeof $6dee8f === 'function') {
        $6dee8f = $6dee8f.options;
      }
    
        /* template */
        Object.assign($6dee8f, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "edit-page" },
    [
      _c("h2", [_vm._v("Editing page: " + _vm._s(_vm.slug))]),
      _vm._v(" "),
      _c("mdc-textfield", {
        attrs: { label: "Sidonamn" },
        model: {
          value: _vm.label,
          callback: function($$v) {
            _vm.label = $$v
          },
          expression: "label"
        }
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "controls" },
        [
          _c(
            "mdc-form-field",
            { attrs: { label: "Publicerad" } },
            [
              _c("mdc-checkbox", {
                model: {
                  value: _vm.published,
                  callback: function($$v) {
                    _vm.published = $$v
                  },
                  expression: "published"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("mdc-button", { on: { click: _vm.save } }, [
            _vm._v("Spara ändringar")
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "fields" },
        _vm._l(_vm.fields, function(field, name) {
          return _c(
            "div",
            { staticClass: "field" },
            [
              _c("span", { staticClass: "slug" }, [
                _vm._v("Fältnamn: " + _vm._s(name))
              ]),
              _vm._v(" "),
              _c(field.is, {
                tag: "component",
                attrs: { label: field.label },
                model: {
                  value: field.value,
                  callback: function($$v) {
                    _vm.$set(field, "value", $$v)
                  },
                  expression: "field.value"
                }
              })
            ],
            1
          )
        })
      )
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
            api.createRecord('$6dee8f', $6dee8f);
          } else {
            api.reload('$6dee8f', $6dee8f);
          }
        }

        
      }
    })();
},{"./edit/Textfield.vue":"components/edit/Textfield.vue","./edit/Textarea.vue":"components/edit/Textarea.vue","./edit/Froala.vue":"components/edit/Froala.vue","./edit/Media.vue":"components/edit/Media.vue","./edit/Number.vue":"components/edit/Number.vue","./edit/Boolean.vue":"components/edit/Boolean.vue","./edit/Collection.vue":"components/edit/Collection.vue","vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62241" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/EditPage.8c3362a0.map