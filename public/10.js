webpackJsonp([10],{

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_Sidebar_vue__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_Sidebar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__partials_Sidebar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_Header_vue__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_Header_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__partials_Header_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_Footer_vue__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__partials_Footer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__partials_Footer_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_ControlSidebar_vue__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_ControlSidebar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__partials_ControlSidebar_vue__);
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






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Dashboard',
  components: {
    'app-sidebar': __WEBPACK_IMPORTED_MODULE_0__partials_Sidebar_vue___default.a,
    'app-header': __WEBPACK_IMPORTED_MODULE_1__partials_Header_vue___default.a,
    'app-footer': __WEBPACK_IMPORTED_MODULE_2__partials_Footer_vue___default.a,
    'control-sidebar': __WEBPACK_IMPORTED_MODULE_3__partials_ControlSidebar_vue___default.a
  }
});

/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(290)
/* template */
var __vue_template__ = __webpack_require__(291)
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
Component.options.__file = "src/js/partials/Sidebar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e306b708", Component.options)
  } else {
    hotAPI.reload("data-v-e306b708", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_permissions__ = __webpack_require__(17);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'DashboardSidebar',
    data: function data() {
        return {
            permissions: __WEBPACK_IMPORTED_MODULE_1__mixins_permissions__["a" /* PERMISSIONS */]

        };
    },
    created: function created() {},

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapGetters */])(["hasPermission", "hasAnyPermission"]))

});

/***/ }),

/***/ 291:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("aside", { staticClass: "main-sidebar" }, [
    _c("section", { staticClass: "sidebar" }, [
      _c("ul", { staticClass: "sidebar-menu" }, [
        _c("li", { staticClass: "header" }, [_vm._v("НАВИГАЦИЯ")]),
        _vm._v(" "),
        _vm.hasAnyPermission([
          _vm.permissions.ADMIN_WATCH_USER,
          _vm.permissions.ADMIN_WATCH_ROLE
        ])
          ? _c("li", { staticClass: "treeview" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("ul", { staticClass: "treeview-menu" }, [
                _vm.hasPermission(_vm.permissions.ADMIN_WATCH_USER)
                  ? _c(
                      "li",
                      [
                        _c(
                          "router-link",
                          { attrs: { to: { name: "admin-users" } } },
                          [
                            _c("i", { staticClass: "fa fa-circle-o" }),
                            _vm._v("Пользователи")
                          ]
                        )
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.hasPermission(_vm.permissions.ADMIN_WATCH_ROLE)
                  ? _c(
                      "li",
                      [
                        _c(
                          "router-link",
                          { attrs: { to: { name: "admin-roles" } } },
                          [
                            _c("i", { staticClass: "fa fa-circle-o" }),
                            _vm._v("Роли")
                          ]
                        )
                      ],
                      1
                    )
                  : _vm._e()
              ])
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("li", { staticClass: "treeview" }, [
          _vm._m(1),
          _vm._v(" "),
          _c("ul", { staticClass: "treeview-menu" }, [
            _vm.hasPermission(_vm.permissions.MESSENGER_WATCH_USER)
              ? _c(
                  "li",
                  [
                    _c(
                      "router-link",
                      { attrs: { to: { name: "messenger-users" } } },
                      [
                        _c("i", { staticClass: "fa fa-circle-o" }),
                        _vm._v(" "),
                        _c("span", [_vm._v("Пользователи")])
                      ]
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.hasPermission(_vm.permissions.MESSENGER_EDIT_STRUCTURE)
              ? _c(
                  "li",
                  [
                    _c(
                      "router-link",
                      { attrs: { to: { name: "messenger-structure" } } },
                      [
                        _c("i", { staticClass: "fa fa-circle-o" }),
                        _vm._v(" "),
                        _c("span", [_vm._v("Структура")])
                      ]
                    )
                  ],
                  1
                )
              : _vm._e()
          ])
        ]),
        _vm._v(" "),
        _c("li", { staticClass: "treeview" }, [
          _vm._m(2),
          _vm._v(" "),
          _c("ul", { staticClass: "treeview-menu" }, [
            _c(
              "li",
              [
                _c("router-link", { attrs: { to: { name: "order-my" } } }, [
                  _c("i", { staticClass: "fa fa-circle-o" }),
                  _vm._v(" "),
                  _c("span", [_vm._v("Мои заявки")])
                ])
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "li",
              [
                _c(
                  "router-link",
                  { attrs: { to: { name: "order-assigned" } } },
                  [
                    _c("i", { staticClass: "fa fa-circle-o" }),
                    _vm._v(" "),
                    _c("span", [_vm._v("На Одобрение")])
                  ]
                )
              ],
              1
            )
          ])
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
    return _c("a", { attrs: { href: "#" } }, [
      _c("i", { staticClass: "fa fa-wrench" }),
      _vm._v(" "),
      _c("span", [_vm._v("Система")]),
      _vm._v(" "),
      _c("span", { staticClass: "pull-right-container" }, [
        _c("i", { staticClass: "fa fa-angle-left pull-right" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("a", { attrs: { href: "#" } }, [
      _c("i", { staticClass: "fa fa-users" }),
      _vm._v(" "),
      _c("span", [_vm._v("Мессенджер")]),
      _vm._v(" "),
      _c("span", { staticClass: "pull-right-container" }, [
        _c("i", { staticClass: "fa fa-angle-left pull-right" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("a", { attrs: { href: "#" } }, [
      _c("i", { staticClass: "fa fa-envelope" }),
      _vm._v(" "),
      _c("span", [_vm._v("Заявки")]),
      _vm._v(" "),
      _c("span", { staticClass: "pull-right-container" }, [
        _c("i", { staticClass: "fa fa-angle-left pull-right" })
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e306b708", module.exports)
  }
}

/***/ }),

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(293)
/* template */
var __vue_template__ = __webpack_require__(294)
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
Component.options.__file = "src/js/partials/Header.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11e03dc6", Component.options)
  } else {
    hotAPI.reload("data-v-11e03dc6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_ajax_form_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_ajax_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__mixins_ajax_form_vue__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'DashboardHeader',
    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_ajax_form_vue___default.a],
    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapGetters */])(['getLogin', 'getUserHeader'])),
    methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapMutations */])(['logout']), {
        userLogout: function userLogout() {
            var _this = this;

            var url = "/auth/logout";
            this.send(url, {}, function () {
                _this.logout();
            });
        }
    })
});

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "header",
    { staticClass: "main-header" },
    [
      _c("router-link", { staticClass: "logo", attrs: { to: "/dashboard" } }, [
        _c("span", { staticClass: "logo-mini" }, [_vm._v("UMS")]),
        _vm._v(" "),
        _c("span", { staticClass: "logo-lg" }, [
          _c("b", [_vm._v("Admin")]),
          _vm._v("UMS")
        ])
      ]),
      _vm._v(" "),
      _c("nav", { staticClass: "navbar navbar-static-top" }, [
        _vm._m(0),
        _vm._v(" "),
        _c("div", { staticClass: "navbar-custom-menu" }, [
          _c("ul", { staticClass: "nav navbar-nav" }, [
            _c("li", { staticClass: "dropdown user user-menu" }, [
              _c(
                "a",
                {
                  staticClass: "dropdown-toggle",
                  attrs: { href: "#", "data-toggle": "dropdown" }
                },
                [_c("span", [_vm._v(_vm._s(_vm.getLogin))])]
              ),
              _vm._v(" "),
              _c("ul", { staticClass: "dropdown-menu" }, [
                _c(
                  "li",
                  {
                    staticClass: "user-header",
                    staticStyle: { height: "auto" }
                  },
                  [
                    _c("p", [
                      _vm._v(
                        "\n                " +
                          _vm._s(_vm.getUserHeader) +
                          "\n              "
                      )
                    ])
                  ]
                ),
                _vm._v(" "),
                _c("li", { staticClass: "user-footer" }, [
                  _c(
                    "div",
                    { staticClass: "pull-left" },
                    [
                      _c(
                        "router-link",
                        {
                          staticClass: "btn btn-default btn-flat",
                          attrs: { to: { name: "profile" } }
                        },
                        [_vm._v("Профиль")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "pull-right" }, [
                    _c(
                      "a",
                      {
                        staticClass: "btn btn-default btn-flat",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.userLogout($event)
                          }
                        }
                      },
                      [_vm._v("Выйти")]
                    )
                  ])
                ])
              ])
            ]),
            _vm._v(" "),
            _vm._m(1)
          ])
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      {
        staticClass: "sidebar-toggle",
        attrs: { href: "#", "data-toggle": "offcanvas", role: "button" }
      },
      [
        _c("span", { staticClass: "sr-only" }, [_vm._v("Toggle navigation")]),
        _vm._v(" "),
        _c("span", { staticClass: "icon-bar" }),
        _vm._v(" "),
        _c("span", { staticClass: "icon-bar" }),
        _vm._v(" "),
        _c("span", { staticClass: "icon-bar" })
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", [
      _c(
        "a",
        {
          staticStyle: { visibility: "hidden" },
          attrs: { href: "#", "data-toggle": "control-sidebar" }
        },
        [_c("i", { staticClass: "fa fa-gears" })]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-11e03dc6", module.exports)
  }
}

/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(296)
/* template */
var __vue_template__ = __webpack_require__(297)
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
Component.options.__file = "src/js/partials/Footer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-544505aa", Component.options)
  } else {
    hotAPI.reload("data-v-544505aa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
  name: 'DashboardFooter',
  computed: {
    currentYear: function currentYear() {
      var d = new Date();
      return d.getFullYear();
    }
  }
});

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("footer", { staticClass: "main-footer" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("strong", [_vm._v("Copyright © " + _vm._s(_vm.currentYear) + " ")]),
    _vm._v(" OOO Kibernika, All rights reserved.\n")
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "pull-right hidden-xs" }, [
      _c("b", [_vm._v("Version")]),
      _vm._v(" 1.0.0\n  ")
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-544505aa", module.exports)
  }
}

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(299)
/* template */
var __vue_template__ = __webpack_require__(300)
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
Component.options.__file = "src/js/partials/ControlSidebar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c2b6e62", Component.options)
  } else {
    hotAPI.reload("data-v-4c2b6e62", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ControlSidebar',
  mounted: function mounted() {
    // $.AdminLTE.controlSidebar.activate({});
  }
});

/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

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
    return _c("div", [
      _c("aside", { staticClass: "control-sidebar control-sidebar-dark" }, [
        _c(
          "ul",
          { staticClass: "nav nav-tabs nav-justified control-sidebar-tabs" },
          [
            _c("li", [
              _c(
                "a",
                {
                  attrs: {
                    href: "#control-sidebar-settings-tab",
                    "data-toggle": "tab"
                  }
                },
                [_c("i", { staticClass: "fa fa-wrench" })]
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "tab-content" }, [
          _c(
            "div",
            {
              staticClass: "tab-pane active",
              attrs: { id: "control-sidebar-settings-tab" }
            },
            [
              _c("h4", { staticClass: "control-sidebar-heading" }, [
                _vm._v("Skins")
              ])
            ]
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "control-sidebar-bg" })
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4c2b6e62", module.exports)
  }
}

/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("app-header"),
      _vm._v(" "),
      _c("app-sidebar"),
      _vm._v(" "),
      _c("router-view"),
      _vm._v(" "),
      _c("app-footer"),
      _vm._v(" "),
      _c("control-sidebar")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5ca9433c", module.exports)
  }
}

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(288)
/* template */
var __vue_template__ = __webpack_require__(301)
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
Component.options.__file = "src/js/pages/Dashboard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ca9433c", Component.options)
  } else {
    hotAPI.reload("data-v-5ca9433c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});