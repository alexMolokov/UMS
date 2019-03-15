webpackJsonp([23],{

/***/ 243:
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
  name: 'DashboardIndex'
});

/***/ }),

/***/ 244:
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
        _c("h1", [
          _vm._v("\n      Blank page\n      "),
          _c("small", [_vm._v("it all starts here")])
        ]),
        _vm._v(" "),
        _c("ol", { staticClass: "breadcrumb" }, [
          _c("li", [
            _c("a", { attrs: { href: "#" } }, [
              _c("i", { staticClass: "fa fa-dashboard" }),
              _vm._v(" Home")
            ])
          ]),
          _vm._v(" "),
          _c("li", [_c("a", { attrs: { href: "#" } }, [_vm._v("Examples")])]),
          _vm._v(" "),
          _c("li", { staticClass: "active" }, [_vm._v("Blank page")])
        ])
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "content" }, [
        _c("div", { staticClass: "box" }, [
          _c("div", { staticClass: "box-header with-border" }, [
            _c("h3", { staticClass: "box-title" }, [_vm._v("Title")]),
            _vm._v(" "),
            _c("div", { staticClass: "box-tools pull-right" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-box-tool",
                  attrs: {
                    type: "button",
                    "data-widget": "collapse",
                    "data-toggle": "tooltip",
                    title: "Collapse"
                  }
                },
                [_c("i", { staticClass: "fa fa-minus" })]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-box-tool",
                  attrs: {
                    type: "button",
                    "data-widget": "remove",
                    "data-toggle": "tooltip",
                    title: "Remove"
                  }
                },
                [_c("i", { staticClass: "fa fa-times" })]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "box-body" }, [
            _vm._v("\n        Start creating your amazing application!\n      ")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "box-footer" }, [
            _vm._v("\n        Footer\n      ")
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
    require("vue-hot-reload-api")      .rerender("data-v-5d84f773", module.exports)
  }
}

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(243)
/* template */
var __vue_template__ = __webpack_require__(244)
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
Component.options.__file = "src/js/components/modules/dashboard/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d84f773", Component.options)
  } else {
    hotAPI.reload("data-v-5d84f773", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});