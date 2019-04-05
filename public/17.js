webpackJsonp([17],{

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(362)
}
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(364)
/* template */
var __vue_template__ = __webpack_require__(365)
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
Component.options.__file = "src/js/pages/order/action/block.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-139c367d", Component.options)
  } else {
    hotAPI.reload("data-v-139c367d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(363);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(90)("4725c636", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-139c367d\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./block.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-139c367d\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./block.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(89)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    components: {},
    name: 'block-action',
    data: function data() {
        return {};
    },

    props: {
        info: {
            type: Object,
            default: function _default() {
                var _ref;

                return _ref = {
                    "login": "",
                    "lastname": "",
                    "firstname": ""
                }, _defineProperty(_ref, "login", ""), _defineProperty(_ref, "email", ""), _ref;
            }
        }
    },
    computed: {},
    methods: {},
    locales: {}
});

/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "col-sm-10 col-lg-6 col-xs-12" }, [
    _c("form", { staticClass: "form-horizontal" }, [
      _c("div", { staticClass: "form-group" }, [
        _c(
          "label",
          { staticClass: "col-sm-2 control-label", attrs: { for: "login" } },
          [_vm._v("Логин")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "col-sm-10" }, [
          _c("input", {
            staticClass: "form-control",
            attrs: { type: "text", id: "login", name: "login", readonly: "" },
            domProps: { value: _vm.info.login }
          })
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "form-group" }, [
        _c(
          "label",
          { staticClass: "col-sm-2 control-label", attrs: { for: "lastname" } },
          [_vm._v("Фамилия")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "col-sm-10" }, [
          _c("input", {
            staticClass: "form-control",
            attrs: {
              type: "text",
              id: "lastname",
              name: "lastname",
              readonly: ""
            },
            domProps: { value: _vm.info.lastname }
          })
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "form-group" }, [
        _c(
          "label",
          {
            staticClass: "col-sm-2 control-label",
            attrs: { for: "firstname" }
          },
          [_vm._v("Имя")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "col-sm-10" }, [
          _c("input", {
            staticClass: "form-control",
            attrs: {
              type: "text",
              id: "firstname",
              name: "firstname",
              readonly: ""
            },
            domProps: { value: _vm.info.firstname }
          })
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "form-group" }, [
        _c(
          "label",
          {
            staticClass: "col-sm-2 control-label",
            attrs: { for: "firstname" }
          },
          [_vm._v("Email")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "col-sm-10" }, [
          _c("input", {
            staticClass: "form-control",
            attrs: { type: "text", id: "email", name: "email", readonly: "" },
            domProps: { value: _vm.info.email }
          })
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-139c367d", module.exports)
  }
}

/***/ })

});