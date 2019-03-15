webpackJsonp([22],{

/***/ 245:
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
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'forbidden',
    data: function data() {
        return {};
    },

    methods: {},
    locales: {
        uz: {}
    }
});

/***/ }),

/***/ 246:
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
    return _c("div", { staticClass: "content-wrapper" }, [
      _c("section", { staticClass: "content-header" }, [
        _c("h1", [_vm._v("403 Ошибка")]),
        _vm._v(" "),
        _c("ol", { staticClass: "breadcrumb" }, [
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("i", { staticClass: "fa fa-dashboard" }),
              _vm._v("Главная")
            ])
          ]),
          _vm._v(" "),
          _c("li", { staticClass: "active" }, [_vm._v("403 ошибка")])
        ])
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "content" }, [
        _c("div", { staticClass: "error-page" }, [
          _c("h2", { staticClass: "headline text-red" }, [_vm._v("403")]),
          _vm._v(" "),
          _c("div", { staticClass: "error-content" }, [
            _c("h3", [
              _c("i", { staticClass: "fa fa-warning text-red" }),
              _vm._v(" Доступ запрещен.")
            ]),
            _vm._v(" "),
            _c("p", [
              _vm._v(
                "\n                    Данная страница запрещена для просмотра. Для ее просмотра обратитесь к администратору системы.\n                "
              )
            ])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-770bba21", module.exports)
  }
}

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(245)
/* template */
var __vue_template__ = __webpack_require__(246)
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
Component.options.__file = "src/js/pages/Forbidden.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-770bba21", Component.options)
  } else {
    hotAPI.reload("data-v-770bba21", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});