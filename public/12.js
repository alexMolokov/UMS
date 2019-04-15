webpackJsonp([12],{

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(118)
/* template */
var __vue_template__ = __webpack_require__(119)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/mixins/error-inform.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d373c7e", Component.options)
  } else {
    hotAPI.reload("data-v-5d373c7e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__states__ = __webpack_require__(15);
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



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'error-inform',
    props: {
        state: { type: Number, default: __WEBPACK_IMPORTED_MODULE_0__states__["a" /* STATES */].START },
        err: { type: Object, default: function _default() {
                return { validation: [], common: [] };
            } }
    },
    data: function data() {
        return {};
    },

    computed: {
        showError: function showError() {
            return (this.err.validation.length > 0 || this.err.common.length > 0) && this.state == __WEBPACK_IMPORTED_MODULE_0__states__["a" /* STATES */].ERROR;
        }
    },
    methods: {
        closeErrors: function closeErrors() {
            this.$emit("error-inform:closed");
            this.err = { validation: [], common: [] };
        }
    }
});

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.showError
    ? _c(
        "div",
        { staticClass: "alert alert-danger fade in alert-dismissible" },
        [
          _c(
            "button",
            {
              staticClass: "close",
              attrs: {
                type: "button",
                "data-dismiss": "alert",
                "aria-hidden": "true"
              },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.closeErrors($event)
                }
              }
            },
            [_vm._v("×")]
          ),
          _vm._v(" "),
          _vm._l(_vm.err.validation, function(er) {
            return _c("div", { staticClass: "top-10" }, [
              _vm._v(
                "\n                    " +
                  _vm._s(er.name) +
                  " - " +
                  _vm._s(er.description) +
                  "\n                "
              )
            ])
          }),
          _vm._v(" "),
          _vm._l(_vm.err.common, function(er) {
            return _c("div", { staticClass: "top-10" }, [
              _c("div", { staticClass: "top-10" }, [_vm._v(_vm._s(er))])
            ])
          })
        ],
        2
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5d373c7e", module.exports)
  }
}

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(137)
/* template */
var __vue_template__ = __webpack_require__(138)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/mixins/ok-action-inform.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-03ad89df", Component.options)
  } else {
    hotAPI.reload("data-v-03ad89df", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 136:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__states__ = __webpack_require__(15);
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'ok-action-inform',
    props: {
        state: { type: Number, default: __WEBPACK_IMPORTED_MODULE_0__states__["a" /* STATES */].START }
    },
    data: function data() {
        return {
            STATES: __WEBPACK_IMPORTED_MODULE_0__states__["a" /* STATES */]
        };
    },

    methods: {
        close: function close() {
            this.$emit('close');
        }
    }
});

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.state == _vm.STATES.ANSWER
    ? _c(
        "div",
        { staticClass: "alert alert-success alert-dismissible" },
        [
          _c(
            "button",
            {
              staticClass: "close",
              attrs: {
                type: "button",
                "data-dismiss": "alert",
                "aria-hidden": "true"
              }
            },
            [_vm._v("×")]
          ),
          _vm._v(" "),
          _vm._t("ok-message")
        ],
        2
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-03ad89df", module.exports)
  }
}

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ORDER_STATES; });
var _en, _ru;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ACCEPT = 2;
var CANCEL = 3;
var REJECT = 4;
var DONE = 5;

var ORDER_STATES = {
    statesName: {
        en: (_en = {}, _defineProperty(_en, ACCEPT, "Accept"), _defineProperty(_en, CANCEL, "Cancelled"), _defineProperty(_en, REJECT, "Rejected"), _defineProperty(_en, DONE, "Done"), _en),
        ru: (_ru = {}, _defineProperty(_ru, ACCEPT, "На рассмотрении"), _defineProperty(_ru, CANCEL, "Отменен"), _defineProperty(_ru, REJECT, "Отклонен"), _defineProperty(_ru, DONE, "Выполнен"), _ru)

    },

    isCancelled: function isCancelled(state) {
        return state == CANCEL;
    },
    isAccept: function isAccept(state) {
        return state == ACCEPT;
    },
    isDone: function isDone(state) {
        return state == DONE;
    },
    isRejected: function isRejected(state) {
        return state == REJECT;
    },
    getName: function getName(state, lang) {

        lang = lang || "en";

        if (typeof this.statesName[lang][state] != "undefined") {
            var result = this.statesName[lang][state];

            return result;
        }

        return state;
    }
};

/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(396);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(96)("6b7dc24c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5662352e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MyOrder.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5662352e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MyOrder.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(95)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_error_inform_vue__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_error_inform_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mixins_error_inform_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_ok_action_inform_vue__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_ok_action_inform_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__mixins_ok_action_inform_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_ajax_form_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_ajax_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__mixins_ajax_form_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_states__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_order_states__ = __webpack_require__(220);
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

var formBlockAccount = function formBlockAccount() {
    return __webpack_require__.e/* import() */(22/* duplicate */).then(__webpack_require__.bind(null, 246));
};
var formChangeProfile = function formChangeProfile() {
    return __webpack_require__.e/* import() */(21/* duplicate */).then(__webpack_require__.bind(null, 247));
};
var formCreateUser = function formCreateUser() {
    return __webpack_require__.e/* import() */(20/* duplicate */).then(__webpack_require__.bind(null, 248));
};
var formCreateUsers = function formCreateUsers() {
    return __webpack_require__.e/* import() */(18/* duplicate */).then(__webpack_require__.bind(null, 249));
};
var formMoveUser = function formMoveUser() {
    return __webpack_require__.e/* import() */(17/* duplicate */).then(__webpack_require__.bind(null, 250));
};
var formCopyUser = function formCopyUser() {
    return __webpack_require__.e/* import() */(19/* duplicate */).then(__webpack_require__.bind(null, 251));
};








/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        ErrorInform: __WEBPACK_IMPORTED_MODULE_0__mixins_error_inform_vue___default.a,
        OkActionInform: __WEBPACK_IMPORTED_MODULE_1__mixins_ok_action_inform_vue___default.a,
        formBlockAccount: formBlockAccount,
        formChangeProfile: formChangeProfile,
        formCreateUser: formCreateUser,
        formMoveUser: formMoveUser,
        formCopyUser: formCopyUser,
        formCreateUsers: formCreateUsers
    },
    name: 'order-my-id',
    mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_ajax_form_vue___default.a],
    created: function created() {
        var _this = this;

        this.order.id = this.$route.params.id;
        var path = '/order/my/' + this.order.id;

        this.uploadInfo(path, {}, function (data) {

            _this.order.subject = data.subject;
            _this.order.info = data.info;
            _this.order.state = data.state;

            if (typeof _this.actionMap[data.action] != "undefined") {
                var formName = _this.actionMap[data.action];
                _this.forms[formName] = true;
            }
        }, {}, function (data) {});
    },
    data: function data() {
        return {
            actionMap: {
                "messenger.user.block": "showFormBlockAccount",
                "messenger.change.profile": "showFormChangeProfile",
                "messenger.user.change.password": "showFormBlockAccount",
                "messenger.user.create": "showFormCreateUser",
                "messenger.user.move": "showFormMoveUser",
                "messenger.user.copy": "showFormCopyUser",
                "messenger.users.create": "showFormCreateUsers"
            },
            order: {
                id: "",
                subject: "",
                action: "",
                state: "",
                info: {}

            },

            forms: {
                showFormBlockAccount: false,
                showFormChangeProfile: false,
                showFormCreateUser: false,
                showFormMoveUser: false,
                showFormCopyUser: false,
                showFormCreateUsers: false
            }

        };
    },

    computed: {
        isAccept: function isAccept() {
            return __WEBPACK_IMPORTED_MODULE_4__mixins_order_states__["a" /* ORDER_STATES */].isAccept(this.order.state);
        },
        stateName: function stateName() {
            var vm = this;
            return function (state) {
                return __WEBPACK_IMPORTED_MODULE_4__mixins_order_states__["a" /* ORDER_STATES */].getName(state, vm.$store.state.lang);
            };
        }
    },
    methods: {
        cancel: function cancel() {
            var _this2 = this;

            var self = this;
            this.send("/order/my/cancel", { id: this.order.id, "lang": this.$store.state.lang }, function (data) {
                _this2.order.state = data.state;
            }, function () {});
        }
    },
    locales: {
        ru: {
            'Cancel': "Отменить",
            'Cancelled': "Отменен",
            'Done': "Выполнен"
        },
        uz: {}
    }
});

/***/ }),

/***/ 398:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content-wrapper" }, [
    _c("section", { staticClass: "content-header" }, [
      _c("h1", [_vm._v("Моя заявка №" + _vm._s(_vm.order.id))]),
      _vm._v(" "),
      _vm._m(0)
    ]),
    _vm._v(" "),
    _c("section", { staticClass: "content" }, [
      _c("div", { staticClass: "box box-header " }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-xs-10" }, [
            _c("h3", { staticClass: "box-title" }, [
              _vm._v("Тема: " + _vm._s(_vm.order.subject))
            ]),
            _vm._v(" "),
            _c("div", [
              _c(
                "h3",
                { staticClass: "box-title", staticStyle: { margin: "5px 0" } },
                [
                  _vm._v("Статус: "),
                  _c("span", [_vm._v(_vm._s(_vm.stateName(_vm.order.state)))])
                ]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-xs-2" }, [
            _c("div", { staticClass: "pull-right" }, [
              _vm.isAccept
                ? _c(
                    "button",
                    {
                      directives: [
                        { name: "translate", rawName: "v-translate" }
                      ],
                      staticClass: "btn btn-danger",
                      attrs: { type: "button" },
                      on: { click: _vm.cancel }
                    },
                    [_vm._v("Cancel")]
                  )
                : _vm._e()
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "col-xs-10 col-lg-5",
              staticStyle: { "margin-top": "5px" }
            },
            [
              _c("error-inform", { attrs: { err: _vm.err, state: _vm.state } }),
              _vm._v(" "),
              _c("ok-action-inform", { attrs: { state: _vm.state } }, [
                _c(
                  "div",
                  { attrs: { slot: "ok-message" }, slot: "ok-message" },
                  [
                    _c(
                      "div",
                      {
                        directives: [
                          { name: "translate", rawName: "v-translate" }
                        ]
                      },
                      [_vm._v("Заявка была отменена")]
                    )
                  ]
                )
              ])
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "box box-body" }, [
        _c("div", { staticClass: "row" }, [
          _c(
            "div",
            { staticClass: "col-sm-12 col-lg-10" },
            [
              _vm.forms.showFormBlockAccount
                ? _c("form-block-account", { attrs: { info: _vm.order.info } })
                : _vm._e(),
              _vm._v(" "),
              _vm.forms.showFormChangeProfile
                ? _c("form-change-profile", { attrs: { info: _vm.order.info } })
                : _vm._e(),
              _vm._v(" "),
              _vm.forms.showFormCreateUser
                ? _c("form-create-user", { attrs: { info: _vm.order.info } })
                : _vm._e(),
              _vm._v(" "),
              _vm.forms.showFormCopyUser
                ? _c("form-copy-user", { attrs: { info: _vm.order.info } })
                : _vm._e(),
              _vm._v(" "),
              _vm.forms.showFormMoveUser
                ? _c("form-move-user", { attrs: { info: _vm.order.info } })
                : _vm._e(),
              _vm._v(" "),
              _vm.forms.showFormCreateUsers
                ? _c("form-create-users", { attrs: { info: _vm.order.info } })
                : _vm._e()
            ],
            1
          )
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ol", { staticClass: "breadcrumb" }, [
      _c("li", [
        _c("a", { attrs: { href: "#" } }, [
          _c("i", { staticClass: "fa fa-dashboard" }),
          _vm._v("Главная")
        ])
      ]),
      _vm._v(" "),
      _c("li", { staticClass: "active" }, [_vm._v("Моя заявка")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5662352e", module.exports)
  }
}

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(395)
}
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(397)
/* template */
var __vue_template__ = __webpack_require__(398)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/pages/order/MyOrder.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5662352e", Component.options)
  } else {
    hotAPI.reload("data-v-5662352e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 95:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(136)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ })

});