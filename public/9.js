webpackJsonp([9],{

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(119)
/* template */
var __vue_template__ = __webpack_require__(120)
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

/***/ 119:
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

/***/ 120:
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

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(224)
/* template */
var __vue_template__ = null
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
Component.options.__file = "src/js/mixins/has-permission.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-40bdeedc", Component.options)
  } else {
    hotAPI.reload("data-v-40bdeedc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__permissions__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(5);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'has-permission',
  data: function data() {
    return {
      permissions: __WEBPACK_IMPORTED_MODULE_0__permissions__["a" /* PERMISSIONS */]
    };
  },

  computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapGetters */])(["hasPermission", "hasAnyPermission"]))
});

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
 * LiquorTree v0.2.49
 * (c) 2019 amsik
 * Released under the MIT License.
 */
var NodeContent={name:"node-content",props:["node"],render:function(e){var t=this,n=this.node,r=this.node.tree.vm;if(n.isEditing){var o=n.text;return this.$nextTick(function(e){t.$refs.editCtrl.focus()}),e("input",{domProps:{value:n.text,type:"text"},class:"tree-input",on:{input:function(e){o=e.target.value},blur:function(){n.stopEditing(o)},keyup:function(e){13===e.keyCode&&n.stopEditing(o)},mouseup:function(e){e.stopPropagation()}},ref:"editCtrl"})}return r.$scopedSlots.default?r.$scopedSlots.default({node:this.node}):e("span",{domProps:{innerHTML:n.text}})}};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),n=' .tree-node { white-space: nowrap; display: flex; flex-direction: column; position: relative; box-sizing: border-box; } .tree-content { display: flex; align-items: center; padding: 3px; cursor: pointer; width: 100%; box-sizing: border-box; } .tree-node:not(.selected) > .tree-content:hover { background: #f6f8fb; } .tree-node.selected > .tree-content { background-color: #e7eef7; } .tree-node.disabled > .tree-content:hover { background: inherit; } .tree-arrow { flex-shrink: 0; height: 30px; cursor: pointer; margin-left: 30px; width: 0; } .tree-arrow.has-child { margin-left: 0; width: 30px; position: relative; } .tree-arrow.has-child:after { border: 1.5px solid #494646; position: absolute; border-left: 0; border-top: 0; left: 9px; top: 50%; height: 9px; width: 9px; transform: rotate(-45deg) translateY(-50%) translateX(0); transition: transform .25s; transform-origin: center; } .tree-arrow.expanded.has-child:after { transform: rotate(45deg) translateY(-50%) translateX(-5px); } .tree-checkbox { flex-shrink: 0; position: relative; width: 30px; height: 30px; box-sizing: border-box; border: 1px solid #dadada; border-radius: 2px; background: #fff; transition: border-color .25s, background-color .25s; } .tree-checkbox:after, .tree-arrow:after { position: absolute; display: block; content: ""; } .tree-checkbox.checked, .tree-checkbox.indeterminate { background-color: #3a99fc; border-color: #218eff; } .tree-checkbox.checked:after { box-sizing: content-box; border: 1.5px solid #fff; /* probably width would be rounded in most cases */ border-left: 0; border-top: 0; left: 9px; top: 3px; height: 15px; width: 8px; transform: rotate(45deg) scaleY(0); transition: transform .25s; transform-origin: center; } .tree-checkbox.checked:after { transform: rotate(45deg) scaleY(1); } .tree-checkbox.indeterminate:after { background-color: #fff; top: 50%; left: 20%; right: 20%; height: 2px; } .tree-anchor { flex-grow: 2; outline: none; display: flex; text-decoration: none; color: #343434; vertical-align: top; margin-left: 3px; line-height: 24px; padding: 3px 6px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .tree-node.selected > .tree-content > .tree-anchor { outline: none; } .tree-node.disabled > .tree-content > .tree-anchor { color: #989191; background: #fff; opacity: .6; cursor: default; outline: none; } .tree-input { display: block; width: 100%; height: 24px; line-height: 24px; outline: none; border: 1px solid #3498db; padding: 0 4px; } .l-fade-enter-active, .l-fade-leave-active { transition: opacity .3s, transform .3s; transform: translateX(0); } .l-fade-enter, .l-fade-leave-to { opacity: 0; transform: translateX(-2em); } .tree--small .tree-anchor { line-height: 19px; } .tree--small .tree-checkbox { width: 23px; height: 23px; } .tree--small .tree-arrow { height: 23px; } .tree--small .tree-checkbox.checked:after { left: 7px; top: 3px; height: 11px; width: 5px; } .tree-node.has-child.loading > .tree-content > .tree-arrow, .tree-node.has-child.loading > .tree-content > .tree-arrow:after { border-radius: 50%; width: 15px; height: 15px; border: 0; } .tree-node.has-child.loading > .tree-content > .tree-arrow { font-size: 3px; position: relative; border-top: 1.1em solid rgba(45,45,45, 0.2); border-right: 1.1em solid rgba(45,45,45, 0.2); border-bottom: 1.1em solid rgba(45,45,45, 0.2); border-left: 1.1em solid #2d2d2d; -webkit-transform: translateZ(0); -ms-transform: translateZ(0); transform: translateZ(0); left: 5px; -webkit-animation: loading 1.1s infinite linear; animation: loading 1.1s infinite linear; margin-right: 8px; } @-webkit-keyframes loading { 0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } } @keyframes loading { 0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } } ';t.type="text/css",t.styleSheet?t.styleSheet.cssText=n:t.appendChild(document.createTextNode(n)),e.appendChild(t)}}();var TreeNode={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"tree-node",class:e.nodeClass,attrs:{"data-id":e.node.id},on:{mousedown:function(t){return t.stopPropagation(),e.handleMouseDown(t)}}},[n("div",{staticClass:"tree-content",style:["ltr"==e.options.direction?{"padding-left":e.padding}:{"padding-right":e.padding}],on:{mouseup:function(t){return t.stopPropagation(),e.select(t)}}},[n("i",{staticClass:"tree-arrow",class:{expanded:e.node.states.expanded,"has-child":e.node.children.length||e.node.isBatch},on:{mouseup:function(t){return t.stopPropagation(),e.toggleExpand(t)}}}),e._v(" "),e.options.checkbox?n("i",{staticClass:"tree-checkbox",class:{checked:e.node.states.checked,indeterminate:e.node.states.indeterminate},on:{mouseup:function(t){return t.stopPropagation(),e.check(t)}}}):e._e(),e._v(" "),n("span",{ref:"anchor",staticClass:"tree-anchor",attrs:{tabindex:"-1"},on:{focus:e.onNodeFocus,dblclick:function(t){e.tree.$emit("node:dblclick",e.node)}}},[n("node-content",{attrs:{node:e.node}})],1)]),e._v(" "),n("transition",{attrs:{name:"l-fade"}},[e.hasChildren()&&e.node.states.expanded?n("ul",{staticClass:"tree-children"},e._l(e.node.children,function(t){return t&&t.visible()?n("node",{key:t.id,attrs:{node:t,options:e.options}}):e._e()})):e._e()])],1)},staticRenderFns:[],name:"Node",inject:["tree"],props:["node","options"],components:{NodeContent:NodeContent},data:function(){return this.node.vm=this,{loading:!1}},computed:{padding:function(){return this.node.depth*(this.options.paddingLeft?this.options.paddingLeft:this.options.nodeIndent)+"px"},nodeClass:function(){var e=this.node.states,t=this.hasChildren(),n={"has-child":t,expanded:t&&e.expanded,selected:e.selected,disabled:e.disabled,matched:e.matched,dragging:e.dragging,loading:this.loading};return this.options.checkbox&&(n.checked=e.checked,n.indeterminate=e.indeterminate),n}},methods:{onNodeFocus:function(){this.tree.activeElement=this.node},focus:function(){this.$refs.anchor.focus(),this.node.select()},check:function(){this.node.checked()?this.node.uncheck():this.node.check()},select:function(e){void 0===e&&(e=evnt);var t=e.ctrlKey,n=this.options,r=this.tree,o=this.node;if(!n.editing||!o.isEditing){if(n.editing&&o.editable())return this.startEditing();if(n.checkbox&&n.checkOnSelect)return!n.parentSelect&&this.hasChildren()?this.toggleExpand():this.check(t);!n.parentSelect&&this.hasChildren()&&this.toggleExpand(),n.multiple?o.selected()?t?o.unselect():1!=this.tree.selectedNodes.length&&(r.unselectAll(),o.select()):o.select(t):o.selected()&&t?o.unselect():o.select()}},toggleExpand:function(){this.hasChildren()&&this.node.toggleExpand()},hasChildren:function(){return this.node.hasChildren()},startEditing:function(){this.tree._editingNode&&this.tree._editingNode.stopEditing(),this.node.startEditing()},stopEditing:function(){this.node.stopEditing()},handleMouseDown:function(e){this.options.dnd&&this.tree.vm.startDragging(this.node,e)}}};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),n=" .tree-dragnode { padding: 10px; border: 1px solid #e7eef7; position: fixed; border-radius: 8px; background: #fff; transform: translate(-50%, -110%); z-index: 10; } ";t.type="text/css",t.styleSheet?t.styleSheet.cssText=n:t.appendChild(document.createTextNode(n)),e.appendChild(t)}}();var DraggableNode={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"tree-dragnode",style:this.style},[this._v(" "+this._s(this.target.node.text)+" ")])},staticRenderFns:[],name:"DragNode",props:["target"],computed:{style:function(){return void 0===this.target.top?"display: none":"top: "+this.target.top+"px; left: "+this.target.left+"px"}}};function recurseDown(e,t){var n;return Array.isArray(e)?e.map(function(e){return recurseDown(e,t)}):(!1!==(n=t(e))&&e.children&&e.children.length&&(n=recurseDown(e.children,t)),n)}function striptags(e){return!1==!!document?e:(striptags.__element||(striptags.__element=document.createElement("div")),striptags.__element.innerHTML=e,striptags.__element.innerText)}function finder(e){return function(t){return Object.keys(e).every(function(n){if("text"===n){var r=e[n],o=t[n];return o=striptags(o),isRegExp(r)?r.test(o):r===o}var i=e[n];return"state"===n&&(n="states"),Object.keys(i).every(function(e){return t[n][e]===i[e]})})}}function isRegExp(e){return e instanceof RegExp}function getAllChildren(e){var t=[];return e.forEach(function e(n){t.push(n),n.children&&n.children.forEach(e)}),t}function find(e,t,n){if(void 0===n&&(n=!0),!e||!e.length||!t)return null;if(n&&(e=getAllChildren(e)),"number"==typeof t)return e[t]||null;("string"==typeof t||t instanceof RegExp)&&(t={text:t}),"function"!=typeof t&&(t=finder(t));var r=e.filter(t);return r.length?r:null}function s4(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}function uuidV4(){return s4()+s4()+"-"+s4()+"-"+s4()+"-"+s4()+"-"+s4()+s4()+s4()}function nodeIterator(e,t){for(var n=[],r=arguments.length-2;r-- >0;)n[r]=arguments[r+2];e.forEach(function(e){return e[t].apply(e,n)})}var Selection=function(e){function t(t,n){var r;void 0===n&&(n=[]),e.call(this),this.tree=t,(r=this).push.apply(r,n)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.remove=function(){return nodeIterator(this,"remove"),this},t.prototype.expand=function(){return nodeIterator(this,"expand"),this},t.prototype.collapse=function(){return nodeIterator(this,"collapse"),this},t.prototype.select=function(e){return nodeIterator(this,"select",e),this},t.prototype.unselect=function(){return nodeIterator(this,"unselect"),this},t.prototype.check=function(){return this.tree.options.checkbox&&nodeIterator(this,"check"),this},t.prototype.uncheck=function(){return this.tree.options.checkbox&&nodeIterator(this,"uncheck"),this},t}(Array),Node=function(e,t){if(!t)throw new Error("Node can not be empty");if(this.id=t.id||uuidV4(),this.states=t.state||{},this.showChildren=!0,this.children=t.children||[],this.parent=t.parent||null,this.isBatch=t.isBatch||!1,this.isEditing=!1,this.data=Object.assign({},t.data||{},{text:t.text}),!e)throw new Error("Node must has a Tree context!");this.tree=e},prototypeAccessors={key:{configurable:!0},depth:{configurable:!0},text:{configurable:!0}};Node.prototype.$emit=function(e){for(var t,n=[],r=arguments.length-1;r-- >0;)n[r]=arguments[r+1];(t=this.tree).$emit.apply(t,["node:"+e,this].concat(n))},Node.prototype.getPath=function(){if(!this.parent)return[this];for(var e=[this],t=this;null!==(t=t.parent);)e.push(t);return e},prototypeAccessors.key.get=function(){return this.id+this.text},prototypeAccessors.depth.get=function(){var e=0,t=this.parent;if(!t||!1===this.showChildren)return e;do{e++}while(t=t.parent);return e},prototypeAccessors.text.get=function(){return this.data.text},prototypeAccessors.text.set=function(e){var t=this.text;t!==e&&(this.data.text=e,this.$emit("text:changed",e,t))},Node.prototype.state=function(e,t){return void 0===t?this.states[e]:(this.states[e]=t,this)},Node.prototype.recurseUp=function(e,t){if(void 0===t&&(t=this),t.parent)return!1!==e(t.parent)?this.recurseUp(e,t.parent):void 0},Node.prototype.recurseDown=function(e,t){!0!==t&&e(this),this.hasChildren()&&recurseDown(this.children,e)},Node.prototype.refreshIndeterminateState=function(){if(!this.tree.options.autoCheckChildren)return this;if(this.state("indeterminate",!1),this.hasChildren()){var e=this.children.length,t=0,n=0,r=0;this.children.forEach(function(e){e.checked()&&t++,e.disabled()&&r++,e.indeterminate()&&n++}),t>0&&t===e-r?this.checked()||(this.state("checked",!0),this.tree.check(this),this.$emit("checked")):(this.checked()&&(this.state("checked",!1),this.tree.uncheck(this),this.$emit("unchecked")),this.state("indeterminate",n>0||t>0&&t<e))}this.parent&&this.parent.refreshIndeterminateState()},Node.prototype.indeterminate=function(){return this.state("indeterminate")},Node.prototype.editable=function(){return!this.state("disabled")&&this.state("editable")},Node.prototype.selectable=function(){return!this.state("disabled")&&this.state("selectable")},Node.prototype.selected=function(){return this.state("selected")},Node.prototype.select=function(e){return!this.selectable()||this.selected()?this:(this.tree.select(this,e),this.state("selected",!0),this.$emit("selected"),this)},Node.prototype.unselect=function(){return this.selectable()&&this.selected()?(this.tree.unselect(this),this.state("selected",!1),this.$emit("unselected"),this):this},Node.prototype.checked=function(){return this.state("checked")},Node.prototype.check=function(){var e=this;return this.checked()||this.disabled()?this:this.indeterminate()?this.uncheck():(this.tree.options.autoCheckChildren?(this.recurseDown(function(t){t.state("indeterminate",!1),t.checked()||(e.tree.check(t),t.state("checked",!0),t.$emit("checked"))}),this.parent&&this.parent.refreshIndeterminateState()):(this.tree.check(this),this.state("checked",!0),this.$emit("checked")),this)},Node.prototype.uncheck=function(){var e=this;return!this.indeterminate()&&!this.checked()||this.disabled()?this:(this.tree.options.autoCheckChildren?(this.recurseDown(function(t){t.state("indeterminate",!1),t.checked()&&(e.tree.uncheck(t),t.state("checked",!1),t.$emit("unchecked"))}),this.parent&&this.parent.refreshIndeterminateState()):(this.tree.uncheck(this),this.state("checked",!1),this.$emit("unchecked")),this)},Node.prototype.show=function(){return this.visible()?this:(this.state("visible",!0),this.$emit("shown"),this)},Node.prototype.hide=function(){return this.hidden()?this:(this.state("visible",!1),this.$emit("hidden"),this)},Node.prototype.visible=function(){return this.state("visible")},Node.prototype.hidden=function(){return!this.state("visible")},Node.prototype.enable=function(){return this.enabled()?this:(this.tree.options.autoDisableChildren?(this.state("disabled",!1),this.$emit("enabled")):this.recurseDown(function(e){e.disabled()&&(e.state("disabled",!1),e.$emit("enabled"))}),this)},Node.prototype.enabled=function(){return!this.state("disabled")},Node.prototype.disable=function(){return this.disabled()?this:(this.tree.options.autoDisableChildren?this.recurseDown(function(e){e.enabled()&&(e.state("disabled",!0),e.$emit("disabled"))}):(this.state("disabled",!0),this.$emit("disabled")),this)},Node.prototype.disabled=function(){return this.state("disabled")},Node.prototype.expandTop=function(e){var t=this;this.recurseUp(function(n){n.state("expanded",!0),!0!==e&&t.$emit("expanded",n)})},Node.prototype.expand=function(){var e=this;return this.canExpand()?(this.isBatch?this.tree.loadChildren(this).then(function(t){e.state("expanded",!0),e.$emit("expanded")}):(this.state("expanded",!0),this.$emit("expanded")),this):this},Node.prototype.canExpand=function(){return this.collapsed()&&this.hasChildren()&&(!this.tree.autoDisableChildren||this.disabled())},Node.prototype.canCollapse=function(){return this.expanded()&&this.hasChildren()&&(!this.tree.autoDisableChildren||this.disabled())},Node.prototype.expanded=function(){return this.state("expanded")},Node.prototype.collapse=function(){return this.canCollapse()?(this.state("expanded",!1),this.$emit("collapsed"),this):this},Node.prototype.collapsed=function(){return!this.state("expanded")},Node.prototype.toggleExpand=function(){return this._toggleOpenedState()},Node.prototype.toggleCollapse=function(){return this._toggleOpenedState()},Node.prototype._toggleOpenedState=function(){return this.canCollapse()?this.collapse():this.canExpand()?this.expand():void 0},Node.prototype.isDropable=function(){return this.enabled()&&this.state("dropable")},Node.prototype.isDraggable=function(){return this.enabled()&&this.state("draggable")&&!this.isEditing},Node.prototype.startDragging=function(){return!(!this.isDraggable()||this.state("dragging"))&&((!this.isRoot()||1!==this.tree.model.length)&&(this.tree.options.store&&(this.tree.__silence=!0),this.select(),this.state("dragging",!0),this.$emit("dragging:start"),this.tree.__silence=!1,!0))},Node.prototype.finishDragging=function(e,t){if(e.isDropable()||"drag-on"!==t){var n=this.tree,r=this.clone(),o=this.parent;r.id=this.id,n.__silence=!0,"drag-on"===t?n.append(e,r):"drag-below"===t?n.after(e,r):"drag-above"===t&&n.before(e,r),this.remove(),e.refreshIndeterminateState(),o&&o.refreshIndeterminateState(),n.__silence=!1,r.state("dragging",!1),this.state("dragging",!1),this.$emit("dragging:finish"),r.state("selected")&&(n.selectedNodes.remove(this),n.selectedNodes.add(r),n.vm.$set(this.state,"selected",!1),n.vm.$set(r.state,"selected",!0)),this.tree.options.store&&this.tree.vm.$emit("LIQUOR_NOISE")}},Node.prototype.startEditing=function(){if(this.disabled())return!1;this.isEditing||(this.tree._editingNode=this,this.tree.activeElement=this,this.isEditing=!0,this.$emit("editing:start"))},Node.prototype.stopEditing=function(e){this.isEditing&&(this.isEditing=!1,this.tree._editingNode=null,this.tree.activeElement=null,e&&!1!==e&&this.text!==e&&(this.text=e),this.$emit("editing:stop",this.text===e))},Node.prototype.index=function(e){return this.tree.index(this,e)},Node.prototype.first=function(){return this.hasChildren()?this.children[0]:null},Node.prototype.last=function(){return this.hasChildren()?this.children[this.children.length-1]:null},Node.prototype.next=function(){return this.tree.nextNode(this)},Node.prototype.prev=function(){return this.tree.prevNode(this)},Node.prototype.insertAt=function(e,t){var n=this;if(void 0===t&&(t=this.children.length),e)return e=this.tree.objectToNode(e),Array.isArray(e)?(e.reverse().map(function(e){return n.insertAt(e,t)}),new Selection(this.tree,[].concat(e))):(e.parent=this,this.children.splice(t,0,e),e.disabled()&&e.hasChildren()&&e.recurseDown(function(e){e.state("disabled",!0)}),this.isBatch||this.$emit("added",e),e)},Node.prototype.addChild=function(e){return this.insertAt(e)},Node.prototype.append=function(e){return this.addChild(e)},Node.prototype.prepend=function(e){return this.insertAt(e,0)},Node.prototype.before=function(e){return this.tree.before(this,e)},Node.prototype.after=function(e){return this.tree.after(this,e)},Node.prototype.empty=function(){for(var e;e=this.children.pop();)e.remove();return this},Node.prototype.remove=function(){return this.tree.removeNode(this)},Node.prototype.removeChild=function(e){var t=this.find(e);return t?this.tree.removeNode(t):null},Node.prototype.find=function(e,t){return this.tree.isNode(e)?e:find(this.children,e,t)},Node.prototype.focus=function(){this.vm&&this.vm.focus()},Node.prototype.hasChildren=function(){return this.showChildren&&this.isBatch||this.children.length>0},Node.prototype.isRoot=function(){return null===this.parent},Node.prototype.clone=function(){return this.tree.objectToNode(this.toJSON())},Node.prototype.toJSON=function(){var e=this;return{text:this.text,data:this.data,state:this.states,children:this.children.map(function(t){return e.tree.objectToNode(t).toJSON()})}},Object.defineProperties(Node.prototype,prototypeAccessors);var nodeStates={selected:!1,selectable:!0,checked:!1,expanded:!1,disabled:!1,visible:!0,indeterminate:!1,matched:!1,editable:!0,dragging:!1,draggable:!0,dropable:!0};function merge(e){return void 0===e&&(e={}),Object.assign({},nodeStates,e)}function objectToNode(e,t){var n=null;if(t instanceof Node)return t;if("string"==typeof t)n=new Node(e,{text:t,state:merge(),id:uuidV4()});else{if(Array.isArray(t))return t.map(function(t){return objectToNode(e,t)});(n=new Node(e,t)).states=merge(n.states),n.id||(n.id=uuidV4()),n.children.length&&(n.children=n.children.map(function(t){return(t=objectToNode(e,t)).parent=n,t}))}return n}var List=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.empty=function(){return this.splice(0,this.length),this},t.prototype.has=function(e){return this.includes(e)},t.prototype.add=function(){for(var e,t=[],n=arguments.length;n--;)t[n]=arguments[n];return(e=this).push.apply(e,t),this},t.prototype.remove=function(e){var t=this.indexOf(e);return-1===t?this:(this.splice(t,1),this)},t.prototype.removeAll=function(e){for(;this.includes(e);)this.remove(e);return this},t.prototype.top=function(){return this[this.length-1]},t}(Array),defaultPropertyNames={id:"id",text:"text",children:"children",state:"state",data:"data",isBatch:"isBatch"};function convertNames(e,t){return{id:e[t.id],text:e[t.text],children:e[t.children],state:e[t.state],data:e[t.data],isBatch:e[t.isBatch]}}var TreeParser={parse:function(e,t,n){void 0===n&&(n={}),"string"==typeof e&&(e=JSON.parse(e)),Array.isArray(e)||(e=[e]);var r=Object.assign({},defaultPropertyNames,n);return e.map(function e(t){var n=convertNames(t,r);return n.children&&!Array.isArray(n.children)&&(n.children=[n.children]),n.children&&(n.children=n.children.map(e)),n}).map(function(e){return objectToNode(t,e)})}};function request(e){return new Promise(function(t,n){var r=new XMLHttpRequest;r.open("GET",e),r.setRequestHeader("Content-Type","application/json"),r.addEventListener("load",function(e){try{var o=JSON.parse(r.response);t(o)}catch(e){n(e)}}),r.send(null)})}function get(e){return request(e)}function createTemplate(e){return function(t){for(var n,r=/{([^}]+)}/,o=e;n=r.exec(o);)o=o.replace(n[0],t[n[1]]);return o}}function orderAsc(e,t){return e.text<t.text?-1:e.text>t.text?1:0}function orderDesc(e,t){return e.text<t.text?1:e.text>t.text?-1:0}function getCompareFunction(e){switch(e.toLowerCase()){case"asc":return orderAsc;case"desc":return orderDesc}}function sort(e,t){"string"==typeof t&&(t=getCompareFunction(t)),Array.isArray(e)&&"function"==typeof t&&e.sort(t)}function fetchDelay(e){return new Promise(function(t){setTimeout(t,e)})}var Tree=function(e){var t=this;this.vm=e,this.options=e.opts,this.activeElement=null;var n,r=this.options.fetchData;"string"==typeof r&&(this.options.fetchData=(n=createTemplate(r),function(e){return get(n(e)).catch(t.options.onFetchError)}))};Tree.prototype.$on=function(e){for(var t,n=[],r=arguments.length-1;r-- >0;)n[r]=arguments[r+1];(t=this.vm).$on.apply(t,[e].concat(n))},Tree.prototype.$once=function(e){for(var t,n=[],r=arguments.length-1;r-- >0;)n[r]=arguments[r+1];(t=this.vm).$once.apply(t,[e].concat(n))},Tree.prototype.$off=function(e){for(var t,n=[],r=arguments.length-1;r-- >0;)n[r]=arguments[r+1];(t=this.vm).$off.apply(t,[e].concat(n))},Tree.prototype.$emit=function(e){for(var t,n=[],r=arguments.length-1;r-- >0;)n[r]=arguments[r+1];this.__silence||((t=this.vm).$emit.apply(t,[e].concat(n)),this.options.store&&this.vm.$emit("LIQUOR_NOISE"))},Tree.prototype._sort=function(e,t,n){!1!==n&&this.recurseDown(e,function(e){e.hasChildren()&&sort(e.children,t)}),sort(e,t)},Tree.prototype.sortTree=function(e,t){this._sort(this.model,e,t)},Tree.prototype.sort=function(e,t,n){var r=this,o=this.find(e,!0);o&&t&&o.forEach(function(e){r._sort(e.children,t,n)})},Tree.prototype.clearFilter=function(){this.recurseDown(function(e){e.state("matched",!1),e.state("visible",!0),e.state("expanded",e.__expanded),e.__expanded=void 0,e.showChildren=!0}),this.vm.matches.length=0,this.vm.$emit("tree:filtered",[],"")},Tree.prototype.filter=function(e){if(!e)return this.clearFilter();var t=[],n=this.options.filter.matcher,r=this.options.filter,o=r.showChildren,i=r.plainList;return this.recurseDown(function(r){n(e,r)&&t.push(r),r.showChildren=!0,void 0===r.__expanded&&(r.__expanded=r.state("expanded")),r.state("visible",!1),r.state("matched",!1),r.state("expanded",!0)}),t.reverse().forEach(function(e){e.state("matched",!0),e.state("visible",!0),e.showChildren=!i,e.hasChildren()&&e.recurseDown(function(e){e.state("visible",!!o)},!0),e.recurseUp(function(e){e.state("visible",!0),e.state("expanded",!0)}),e.hasChildren()&&e.state("expanded",!1)}),this.vm.matches=t,this.vm.$emit("tree:filtered",t,e),t},Tree.prototype.selected=function(){return new(Function.prototype.bind.apply(Selection,[null].concat([this],this.selectedNodes)))},Tree.prototype.checked=function(){return this.options.checkbox?new(Function.prototype.bind.apply(Selection,[null].concat([this],this.checkedNodes))):null},Tree.prototype.loadChildren=function(e){var t=this;if(e){this.$emit("tree:data:fetch",e),this.options.minFetchDelay>0&&(e.vm.loading=!0);var n=this.fetch(e).then(function(n){e.append(n),e.isBatch=!1,t.options.autoCheckChildren&&e.checked()&&e.recurseDown(function(e){e.state("checked",!0)}),t.$emit("tree:data:received",e)});return Promise.all([fetchDelay(this.options.minFetchDelay),n]).then(function(t){return e.vm.loading=!1,n})}},Tree.prototype.fetch=function(e,t){var n=this,r=this.options.fetchData(e);return r.then||(r=get(r).catch(this.options.onFetchError)),!1===t?r:r.then(function(e){return n.parse(e,n.options.modelParse)}).catch(this.options.onFetchError)},Tree.prototype.fetchInitData=function(){return this.fetch({id:"root",name:"root"},!1)},Tree.prototype.setModel=function(e){var t=this;if(this.model=this.parse(e,this.options.modelParse),this.vm.model=this.model,this.selectedNodes=new List,this.checkedNodes=new List,recurseDown(this.model,function(e){e.tree=t,e.selected()&&t.selectedNodes.add(e),e.checked()&&(t.checkedNodes.add(e),e.parent&&e.parent.refreshIndeterminateState()),t.options.autoDisableChildren&&e.disabled()&&e.recurseDown(function(e){e.state("disabled",!0)})}),!this.options.multiple&&this.selectedNodes.length){var n=this.selectedNodes.top();this.selectedNodes.forEach(function(e){n!==e&&e.state("selected",!1)}),this.selectedNodes.empty().add(n)}this.options.checkOnSelect&&this.options.checkbox&&this.unselectAll()},Tree.prototype.recurseDown=function(e,t){return!t&&e&&(t=e,e=this.model),recurseDown(e,t)},Tree.prototype.select=function(e,t){var n=this.getNode(e);return!!n&&(this.options.multiple&&t?this.selectedNodes.add(n):(this.unselectAll(),this.selectedNodes.empty().add(n)),!0)},Tree.prototype.selectAll=function(){var e=this;return!!this.options.multiple&&(this.selectedNodes.empty(),this.recurseDown(function(t){e.selectedNodes.add(t.select(!0))}),!0)},Tree.prototype.unselect=function(e){var t=this.getNode(e);return!!t&&(this.selectedNodes.remove(t),!0)},Tree.prototype.unselectAll=function(){for(var e;e=this.selectedNodes.pop();)e.unselect();return!0},Tree.prototype.check=function(e){this.checkedNodes.add(e)},Tree.prototype.uncheck=function(e){this.checkedNodes.remove(e)},Tree.prototype.checkAll=function(){this.recurseDown(function(e){0===e.depth&&(e.indeterminate()&&e.state("indeterminate",!1),e.check())})},Tree.prototype.uncheckAll=function(){for(var e;e=this.checkedNodes.pop();)e.uncheck();return!0},Tree.prototype.expand=function(e){return!e.expanded()&&(e.expand(),!0)},Tree.prototype.collapse=function(e){return!e.collapsed()&&(e.collapse(),!0)},Tree.prototype.toggleExpand=function(e){return!!e.hasChildren()&&(e.toggleExpand(),!0)},Tree.prototype.toggleCollapse=function(e){return!!e.hasChildren()&&(e.toggleCollapse(),!0)},Tree.prototype.expandAll=function(){this.recurseDown(function(e){e.hasChildren()&&e.collapsed()&&e.expand()})},Tree.prototype.collapseAll=function(){this.recurseDown(function(e){e.hasChildren()&&e.expanded()&&e.collapse()})},Tree.prototype.index=function(e,t){var n=e.parent,r=(n=n?n.children:this.model).indexOf(e);return t?{index:r,target:n,node:n[r]}:r},Tree.prototype.nextNode=function(e){var t=this.index(e,!0);return t.target[t.index+1]||null},Tree.prototype.nextVisibleNode=function(e){if(e.hasChildren()&&e.expanded())return e.first();var t=this.nextNode(e);return!t&&e.parent?e.parent.next():t},Tree.prototype.prevNode=function(e){var t=this.index(e,!0);return t.target[t.index-1]||null},Tree.prototype.prevVisibleNode=function(e){var t=this.prevNode(e);return t?t.hasChildren()&&t.expanded()?t.last():t:e.parent},Tree.prototype.addToModel=function(e,t){var n=this;return void 0===t&&(t=this.model.length),e=this.objectToNode(e),this.model.splice(t,0,e),this.recurseDown(e,function(e){e.tree=n}),this.$emit("node:added",e),e},Tree.prototype.append=function(e,t){var n=this.find(e);return!!n&&n.append(t)},Tree.prototype.prepend=function(e,t){var n=this.find(e);return!!n&&n.prepend(t)},Tree.prototype.before=function(e,t){e=this.find(e);var n=this.index(e,!0),r=this.objectToNode(t);return!!~n.index&&(n.target.splice(n.index,0,r),r.parent=e.parent,this.$emit("node:added",r),r)},Tree.prototype.after=function(e,t){e=this.find(e);var n=this.index(e,!0),r=this.objectToNode(t);return!!~n.index&&(n.target.splice(n.index+1,0,r),r.parent=e.parent,this.$emit("node:added",r),r)},Tree.prototype.addNode=function(e){var t=this.model.length;return e=objectToNode(e),this.model.splice(t,0,e),this.$emit("node:added",e),e},Tree.prototype.remove=function(e,t){return this.removeNode(this.find(e,t))},Tree.prototype.removeNode=function(e){if(e instanceof Selection)return e.remove();if(!e)return!1;if(e.parent){var t=e.parent.children;~t.indexOf(e)&&t.splice(t.indexOf(e),1)}else~this.model.indexOf(e)&&this.model.splice(this.model.indexOf(e),1);e.parent&&e.parent.indeterminate()&&!e.parent.hasChildren()&&e.parent.state("indeterminate",!1),null!==this.activeElement&&e.id===this.activeElement.id&&(this.activeElement=null),e.parent=null,this.$emit("node:removed",e),this.selectedNodes.remove(e),this.checkedNodes.remove(e);var n=this.vm.matches;return n&&n.length&&n.includes(e)&&n.splice(n.indexOf(e),1),e},Tree.prototype.isNode=function(e){return e instanceof Node},Tree.prototype.find=function(e,t){if(this.isNode(e))return e;var n=find(this.model,e);return n&&n.length?new Selection(this,!0===t?n:[n[0]]):null},Tree.prototype.getNodeById=function(e){var t=null;return recurseDown(this.model,function(n){if(""+n.id===e)return t=n,!1}),t},Tree.prototype.getNode=function(e){return this.isNode(e)?e:null},Tree.prototype.objectToNode=function(e){return objectToNode(this,e)},Tree.prototype.parse=function(e,t){t||(t=this.options.propertyNames);try{return TreeParser.parse(e,this,t)}catch(e){return console.error(e),[]}};var keyCodes={ARROW_LEFT:37,ARROW_TOP:38,ARROW_RIGHT:39,ARROW_BOTTOM:40,SPACE:32,DELETE:46,ENTER:13,ESC:27},codesArr=[37,38,39,40,32];function focusUp(e,t){var n=e.prevVisibleNode(t);if(n)return n.disabled()?focusUp(e,n):void n.focus()}function focusdDown(e,t){var n=e.nextVisibleNode(t);if(n)return n.disabled()?focusdDown(e,n):void n.focus()}function checkNode(e,t){e.options.checkbox&&(t.checked()?t.uncheck():t.check())}function leftArrow(e,t){if(t.expanded())t.collapse();else{var n=t.parent;n&&n.focus()}}function rightArrow(e,t){if(t.collapsed())t.expand();else{var n=t.first();n&&n.focus()}}function deleteNode(e,t){var n=e.options.deletion;n&&("function"==typeof n?!0===n(t)&&t.remove():!0===n&&t.remove())}function initKeyboardNavigation(e){e.vm.$el.addEventListener("keydown",function(t){var n=t.keyCode,r=e.activeElement;if(e.isNode(r))if(r.isEditing)switch(n){case keyCodes.ESC:return r.stopEditing(!1)}else switch(codesArr.includes(n)&&(t.preventDefault(),t.stopPropagation()),n){case keyCodes.ARROW_LEFT:return leftArrow(e,r);case keyCodes.ARROW_RIGHT:return rightArrow(e,r);case keyCodes.ARROW_TOP:return focusUp(e,r);case keyCodes.ARROW_BOTTOM:return focusdDown(e,r);case keyCodes.SPACE:case keyCodes.ENTER:return checkNode(e,r);case keyCodes.DELETE:return deleteNode(e,r)}},!0)}function assert(e,t){if(!1===e)throw new Error(t)}function initEvents(e){var t=e.opts,n=t.multiple,r=t.checkbox,o=e.tree,i=function(t){var o=e.selected();r?e.$emit("input",{selected:n?o:o[0]||null,checked:e.checked()}):e.$emit("input",n?o:o[0]||null)};i(),o.$on("node:selected",i),o.$on("node:unselected",i),r&&(o.$on("node:checked",i),o.$on("node:unchecked",i)),o.$on("node:added",function(e,t){var n=t||e;r&&(n.state("checked")&&!o.checkedNodes.has(n)&&o.checkedNodes.add(n),n.refreshIndeterminateState()),n.state("selected")&&!o.selectedNodes.has(n)&&o.select(n),i()})}var TreeMixin={mounted:function(){var e,t=this,n=new Tree(this);this.tree=n,this._provided.tree=n,!this.data&&this.opts.fetchData?e=n.fetchInitData():this.data&&this.data.then?(e=this.data,this.loading=!0):e=Promise.resolve(this.data),e.then(function(e){e||(e=[]),t.opts.store?t.connectStore(t.opts.store):t.tree.setModel(e),t.loading&&(t.loading=!1),t.$emit("tree:mounted",t),initEvents(t)}),!1!==this.opts.keyboardNavigation&&initKeyboardNavigation(n)},methods:{connectStore:function(e){var t=this,n=e.store,r=e.mutations,o=e.getter,i=e.dispatcher;assert("function"==typeof o,"`getter` must be a function"),assert("function"==typeof i,"`dispatcher` must be a function"),void 0!==r&&assert(Array.isArray(r),"`mutations` must be an array"),n.subscribe(function(e,n){r?r.includes(e.type)&&t.tree.setModel(o()):t.tree.setModel(o())}),this.tree.setModel(o()),this.$on("LIQUOR_NOISE",function(){t.$nextTick(function(e){i(t.toJSON())})})},recurseDown:function(e){this.tree.recurseDown(e)},selected:function(){return this.tree.selected()},checked:function(){return this.tree.checked()},append:function(e,t){return t?this.tree.append(e,t):this.tree.addToModel(e,this.tree.model.length)},prepend:function(e,t){return t?this.tree.prepend(e,t):this.tree.addToModel(e,0)},addChild:function(e,t){return this.append(e,t)},remove:function(e,t){return this.tree.remove(e,t)},before:function(e,t){return t?this.tree.before(e,t):this.prepend(e)},after:function(e,t){return t?this.tree.after(e,t):this.append(e)},find:function(e,t){return this.tree.find(e,t)},findAll:function(e){return this.tree.find(e,!0)},expandAll:function(){return this.tree.expandAll()},collapseAll:function(){return this.tree.collapseAll()},sortTree:function(e,t){return this.tree.sortTree(e,t)},sort:function(){for(var e,t=[],n=arguments.length;n--;)t[n]=arguments[n];return(e=this.tree).sort.apply(e,t)},setModel:function(e){return this.tree.setModel(e)},getRootNode:function(){return 1===this.tree.model.length?this.tree.model[0]:this.tree.model},toJSON:function(){return JSON.parse(JSON.stringify(this.model))}}},DropPosition={ABOVE:"drag-above",BELOW:"drag-below",ON:"drag-on"};function isMovingStarted(e,t){return Math.abs(e.clientX-t[0])>5||Math.abs(e.clientY-t[1])>5}function composedPath(e){for(var t=e.target,n=[];t;){if(n.push(t),"HTML"===t.tagName)return n.push(document),n.push(window),n;t=t.parentElement}return n}function getPath(e){return e.path?e.path:e.composedPath?e.composedPath():composedPath(e)}function getSelectedNode(e){for(var t,n=0,r=getPath(e);n<r.length;n++)if(t=r[n].className||"",/tree-node/.test(t))return r[n];return null}function getDropDestination(e){var t=getSelectedNode(e);return t||null}function updateHelperClasses(e,t){if(e){var n=e.className;if(t)new RegExp(t).test(n)||(n+=" "+t);else{for(var r in DropPosition)n=n.replace(DropPosition[r],"");n.replace("dragging","")}e.className=n.replace(/\s+/g," ")}}function getDropPosition(e,t){var n=t.getBoundingClientRect(),r=n.height/3,o=DropPosition.ON;return n.top+r>=e.clientY?o=DropPosition.ABOVE:n.top+2*r<=e.clientY&&(o=DropPosition.BELOW),o}function callDndCb(e,t,n){if(t&&t[n]&&"function"==typeof t[n])return!1!==t[n].apply(t,e)}function clearDropClasses(e){for(var t in DropPosition)for(var n=e.querySelectorAll("."+DropPosition[t]),r=0;r<n.length;r++)updateHelperClasses(n[r])}var TreeDnd={methods:{onDragStart:function(e){e.preventDefault()},startDragging:function(e,t){e.isDraggable()&&!1!==callDndCb([e],this.tree.options.dnd,"onDragStart")&&(this.$$startDragPosition=[t.clientX,t.clientY],this.$$possibleDragNode=e,this.initDragListeners())},initDragListeners:function(){var e,t=this,n=function(){window.removeEventListener("mouseup",r,!0),window.removeEventListener("mousemove",o,!0)},r=function(r){(t.$$startDragPosition||r.stopPropagation(),t.draggableNode&&t.draggableNode.node.state("dragging",!1),t.$$dropDestination&&t.tree.isNode(t.$$dropDestination)&&t.$$dropDestination.vm)&&(updateHelperClasses(t.$$dropDestination.vm.$el,null),!1!==callDndCb([t.draggableNode.node,t.$$dropDestination],t.tree.options.dnd,"onDragFinish")&&(t.$$dropDestination.isDropable()||e!==DropPosition.ON)&&e&&t.draggableNode.node.finishDragging(t.$$dropDestination,e),t.$$dropDestination=null);t.$$possibleDragNode=null,t.$set(t,"draggableNode",null),n()},o=function(r){if(!t.$$startDragPosition||isMovingStarted(r,t.$$startDragPosition)){if(t.$$startDragPosition=null,t.$$possibleDragNode){if(!1===t.$$possibleDragNode.startDragging())return n(),void(t.$$possibleDragNode=null);t.$set(t,"draggableNode",{node:t.$$possibleDragNode,left:0,top:0}),t.$$possibleDragNode=null}t.draggableNode.left=r.clientX,t.draggableNode.top=r.clientY;var o=getDropDestination(r);if(clearDropClasses(t.$el),o){var i=o.getAttribute("data-id");if(t.draggableNode.node.id===i)return;if(t.$$dropDestination&&t.$$dropDestination.id===i||(t.$$dropDestination=t.tree.getNodeById(i)),t.$$dropDestination&&t.draggableNode.node)if(t.$$dropDestination.getPath().includes(t.draggableNode.node))return void(t.$$dropDestination=null);var s=callDndCb([t.draggableNode.node,t.$$dropDestination],t.tree.options.dnd,"onDragOn"),d=t.$$dropDestination.isDropable()&&!1!==s;e=getDropPosition(r,o),d||e!==DropPosition.ON||(e=null),updateHelperClasses(o,e)}}};window.addEventListener("mouseup",r,!0),window.addEventListener("mousemove",o,!0)}}};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),n=" .tree { overflow: auto; } .tree-root, .tree-children { list-style: none; padding: 0; } .tree > .tree-root, .tree > .tree-filter-empty { padding: 3px; box-sizing: border-box; } .tree.tree--draggable .tree-node:not(.selected) > .tree-content:hover { background: transparent; } .drag-above, .drag-below, .drag-on { position: relative; z-index: 1; } .drag-on > .tree-content { background: #fafcff; outline: 1px solid #7baff2; } .drag-above > .tree-content::before, .drag-below > .tree-content::after { display: block; content: ''; position: absolute; height: 8px; left: 0; right: 0; z-index: 2; box-sizing: border-box; background-color: #3367d6; border: 3px solid #3367d6; background-clip: padding-box; border-bottom-color: transparent; border-top-color: transparent; border-radius: 0; } .drag-above > .tree-content::before { top: 0; transform: translateY(-50%); } .drag-below > .tree-content::after { bottom: 0; transform: translateY(50%); } ";t.type="text/css",t.styleSheet?t.styleSheet.cssText=n:t.appendChild(document.createTextNode(n)),e.appendChild(t)}}();var defaults={direction:"ltr",multiple:!0,checkbox:!1,checkOnSelect:!1,autoCheckChildren:!0,autoDisableChildren:!0,parentSelect:!1,keyboardNavigation:!0,nodeIndent:24,minFetchDelay:0,fetchData:null,propertyNames:null,deletion:!1,dnd:!1,editing:!1,onFetchError:function(e){throw e}},filterDefaults={emptyText:"Nothing found!",matcher:function(e,t){return new RegExp(e,"i").test(t.text)},plainList:!1,showChildren:!0},TreeRoot={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.tag,{tag:"component",class:{tree:!0,"tree-loading":this.loading,"tree--draggable":!!this.draggableNode},attrs:{role:"tree"}},[e.filter&&0==e.matches.length?[n("div",{staticClass:"tree-filter-empty"},[e._v(e._s(e.opts.filter.emptyText))])]:[n("ul",{staticClass:"tree-root",on:{dragstart:e.onDragStart}},[e.opts.filter.plainList&&e.matches.length>0?e._l(e.matches,function(t){return t.visible()?n("TreeNode",{key:t.id,attrs:{node:t,options:e.opts}}):e._e()}):e._l(e.model,function(t){return t&&t.visible()?n("TreeNode",{key:t.id,attrs:{node:t,options:e.opts}}):e._e()})],2)],e._v(" "),e.draggableNode?n("DraggableNode",{attrs:{target:e.draggableNode}}):e._e()],2)},staticRenderFns:[],name:"Tree",components:{TreeNode:TreeNode,DraggableNode:DraggableNode},mixins:[TreeMixin,TreeDnd],provide:function(e){return{tree:null}},props:{data:{},options:{type:Object,default:function(e){return{}}},filter:String,tag:{type:String,default:"div"}},watch:{filter:function(e){this.tree.filter(e)}},data:function(){var e=Object.assign({},defaults,this.options);return e.filter=Object.assign({},filterDefaults,e.filter),{model:null,tree:null,loading:!1,opts:e,matches:[],draggableNode:null}}},install=function(e){e.component(TreeRoot.name,TreeRoot)};TreeRoot.install=install,"undefined"!=typeof window&&window.Vue&&window.Vue.use(TreeRoot);/* harmony default export */ __webpack_exports__["a"] = (TreeRoot);


/***/ }),

/***/ 345:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(346);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(96)("f92d64a8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-823d8e84\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Role.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-823d8e84\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Role.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 346:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(95)(false);
// imports


// module
exports.push([module.i, "\n.section_name[data-v-823d8e84] {\n  color: #fff;\n  background-color: #3c8dbc;\n  font-weight: bold;\n}\ntbody[data-v-823d8e84] {\n  border-top: none !important;\n}\n", ""]);

// exports


/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_ajax_form_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_ajax_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mixins_ajax_form_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_error_inform_vue__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_error_inform_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__mixins_error_inform_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_ok_action_inform_vue__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_ok_action_inform_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__mixins_ok_action_inform_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_liquor_tree__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_permissions__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_modules_admin_DeleteRole_vue__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_modules_admin_DeleteRole_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_modules_admin_DeleteRole_vue__);
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
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
    components: { ErrorInform: __WEBPACK_IMPORTED_MODULE_1__mixins_error_inform_vue___default.a, OkActionInform: __WEBPACK_IMPORTED_MODULE_2__mixins_ok_action_inform_vue___default.a, liquorTree: __WEBPACK_IMPORTED_MODULE_4_liquor_tree__["a" /* default */], DeleteRole: __WEBPACK_IMPORTED_MODULE_6__components_modules_admin_DeleteRole_vue___default.a },
    name: 'role-form',
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_ajax_form_vue___default.a],
    created: function created() {
        var _this = this;

        this.role.id = this.$route.params.id;
        var path = '/admin/role/' + this.role.id + '/get';

        this.uploadInfo(path, {}, function (data) {
            _this.initRole(data);
            _this.initTree(data);
        }, {}, function (data) {});
    },
    data: function data() {
        return {
            error: '',
            role: {
                "id": "",
                "name": "",
                "is_editable": 1,
                "is_deleted": false
            },
            tree: {
                data: [],
                loaded: false
            },
            permissions: [], // key -> id, value {checked, approved, disabled},
            selectedPermissions: [],
            selectedAttributes: []
        };
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["b" /* mapGetters */])(["hasPermission"]), {
        disabled: function disabled() {
            return !this.hasPermission(this.permissions.ADMIN_EDIT_ROLE) || this.role.is_editable == 0;
        },
        isActive: function isActive() {
            return !this.role.is_deleted;
        }
    }),
    methods: {
        roleDeleted: function roleDeleted() {
            this.role.is_deleted = true;
        },
        initTree: function initTree(data) {
            this.tree.data = data.tree;

            var self = this;
            data.tree.forEach(function (record) {
                record.children.forEach(function (permission) {

                    if (permission.state.checked) {
                        self.selectedPermissions.push(permission.id);

                        if (permission.attributes.approved) self.selectedAttributes.push(permission.id);
                    }
                });
            });

            this.tree.loaded = true;
        },
        initRole: function initRole(data) {
            for (var key in data) {
                if (this.role[key] != "undefined") this.role[key] = data[key];
            }
        },
        changeAttributes: function changeAttributes(id) {
            if (this.isDisabled(id)) {
                var index = this.selectedAttributes.indexOf(id);
                if (index !== -1) {
                    this.selectedAttributes.splice(index, 1);
                }
            }
        },
        isDisabled: function isDisabled(id) {
            return this.selectedPermissions.indexOf(id) == -1;
        },


        validate: function validate() {
            var permissions = [];

            var self = this;
            self.selectedPermissions.forEach(function (permission) {
                permissions.push({
                    "id": permission,
                    "approved": self.selectedAttributes.indexOf(permission) != -1
                });
            });

            var data = {
                "name": this.role.name,
                "description": this.role.description,
                permissions: permissions
            };

            this.send("/admin/role/" + this.role.id + "/update", data, function (data) {
                console.log("updated role");
            });
        }
    },
    locales: {
        uz: {}
    }
});

/***/ }),

/***/ 348:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(349)
/* template */
var __vue_template__ = __webpack_require__(350)
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
Component.options.__file = "src/js/components/modules/admin/DeleteRole.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4cf52755", Component.options)
  } else {
    hotAPI.reload("data-v-4cf52755", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_ajax_form_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_ajax_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mixins_ajax_form_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_has_permission_vue__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_has_permission_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__mixins_has_permission_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_error_inform_vue__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_error_inform_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__mixins_error_inform_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_ok_action_inform_vue__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_ok_action_inform_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__mixins_ok_action_inform_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__(5);
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







/* harmony default export */ __webpack_exports__["default"] = ({
    components: { ErrorInform: __WEBPACK_IMPORTED_MODULE_2__mixins_error_inform_vue___default.a, OkActionInform: __WEBPACK_IMPORTED_MODULE_3__mixins_ok_action_inform_vue___default.a },
    name: 'delete-role',
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_ajax_form_vue___default.a, __WEBPACK_IMPORTED_MODULE_1__mixins_has_permission_vue___default.a],
    props: {
        "roleId": [Number]
    },
    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_4_vuex__["b" /* mapGetters */])('roles', ['getRoles']), {
        disabled: function disabled() {
            return !this.hasPermission(this.permissions.ADMIN_EDIT_USER);
        }
    }),
    data: function data() {
        return {
            error: '',
            is_deleted: false
        };
    },

    methods: {
        deleteRole: function deleteRole() {
            var self = this;
            this.send("/admin/role/" + this.roleId + "/delete", {}, function (data) {
                self.is_deleted = true;
                self.$emit("role:deleted");
            });
        }
    }

});

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticStyle: { "margin-top": "5px" } }, [
    !_vm.is_deleted
      ? _c("div", { staticClass: "overlay-wrapper pull-right" }, [
          _c(
            "a",
            {
              staticClass: "btn btn-danger",
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.deleteRole($event)
                }
              }
            },
            [_vm._v("Удалить")]
          )
        ])
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "clearfix" }),
    _vm._v(" "),
    _c(
      "div",
      { staticStyle: { "margin-top": "5px" } },
      [
        _c("ok-action-inform", { attrs: { err: _vm.err, state: _vm.state } }, [
          _c("div", { attrs: { slot: "ok-message" }, slot: "ok-message" }, [
            _c(
              "div",
              { directives: [{ name: "translate", rawName: "v-translate" }] },
              [_vm._v("Роль была удалена.")]
            )
          ])
        ]),
        _vm._v(" "),
        _c("error-inform", { attrs: { err: _vm.err, state: _vm.state } })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4cf52755", module.exports)
  }
}

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content-wrapper" }, [
    _c("section", { staticClass: "content-header" }, [
      _c("h1", { staticStyle: { display: "inline-block" } }, [_vm._v("Роль")]),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-lg-6 col-md-12" },
          [
            _c("delete-role", {
              attrs: { "role-id": _vm.role.id },
              on: { "role:deleted": _vm.roleDeleted }
            })
          ],
          1
        )
      ])
    ]),
    _vm._v(" "),
    _vm.isActive
      ? _c("section", { staticClass: "content" }, [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-lg-6 col-md-12" }, [
              _c("div", { staticClass: "box box-info" }, [
                _vm._m(1),
                _vm._v(" "),
                _c(
                  "form",
                  {
                    staticClass: "form-horizontal",
                    on: {
                      submit: function($event) {
                        $event.preventDefault()
                        return _vm.validate($event)
                      }
                    }
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "box-body" },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "form-group",
                            class: { "has-error": _vm.errors.has("role") }
                          },
                          [
                            _c(
                              "label",
                              {
                                staticClass: "col-sm-2 control-label",
                                attrs: { for: "role" }
                              },
                              [_vm._v("Роль")]
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-sm-10" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.role.name,
                                    expression: "role.name"
                                  },
                                  {
                                    name: "validate",
                                    rawName: "v-validate",
                                    value: {
                                      required: true,
                                      min: 3,
                                      regex: /^[a-zA-Z]{1,}$/
                                    },
                                    expression:
                                      "{ required: true, min:3, regex: /^[a-zA-Z]{1,}$/ }"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  type: "text",
                                  id: "role",
                                  name: "role",
                                  placeholder:
                                    "Название (Только Латинские буквы)",
                                  disabled: _vm.disabled
                                },
                                domProps: { value: _vm.role.name },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.role,
                                      "name",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: _vm.errors.has("role"),
                                      expression: "errors.has('role')"
                                    }
                                  ],
                                  staticClass: "help-block"
                                },
                                [_vm._v(_vm._s(_vm.errors.first("role")))]
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "form-group",
                            class: {
                              "has-error": _vm.errors.has("description")
                            }
                          },
                          [
                            _c(
                              "label",
                              {
                                staticClass: "col-sm-2 control-label",
                                attrs: { for: "role" }
                              },
                              [_vm._v("Описание")]
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-sm-10" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.role.description,
                                    expression: "role.description"
                                  },
                                  {
                                    name: "validate",
                                    rawName: "v-validate",
                                    value: "max:100",
                                    expression: "'max:100'"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  type: "text",
                                  id: "description",
                                  name: "description",
                                  placeholder: "Описание",
                                  disabled: _vm.disabled
                                },
                                domProps: { value: _vm.role.description },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.role,
                                      "description",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: _vm.errors.has("description"),
                                      expression: "errors.has('description')"
                                    }
                                  ],
                                  staticClass: "help-block"
                                },
                                [
                                  _vm._v(
                                    _vm._s(_vm.errors.first("description"))
                                  )
                                ]
                              )
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "form-group",
                            class: {
                              "has-error": _vm.errors.has("permissions")
                            }
                          },
                          [
                            _c(
                              "label",
                              { staticClass: "col-sm-2 control-label" },
                              [_vm._v("Права")]
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-sm-10" }, [
                              _c("div", { staticClass: "table-responsive" }, [
                                _vm.tree.loaded
                                  ? _c(
                                      "table",
                                      { staticClass: "table table-bordered" },
                                      [
                                        _c("thead", [
                                          _c("tr", [
                                            _c(
                                              "th",
                                              {
                                                staticStyle: { width: "20px" }
                                              },
                                              [_vm._v("#")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "th",
                                              {
                                                directives: [
                                                  {
                                                    name: "translate",
                                                    rawName: "v-translate"
                                                  }
                                                ]
                                              },
                                              [_vm._v("Название")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "th",
                                              {
                                                directives: [
                                                  {
                                                    name: "translate",
                                                    rawName: "v-translate"
                                                  }
                                                ],
                                                staticStyle: { width: "90px" }
                                              },
                                              [_vm._v("Одобрение")]
                                            )
                                          ])
                                        ]),
                                        _vm._v(" "),
                                        _vm._l(_vm.tree.data, function(
                                          section
                                        ) {
                                          return _c(
                                            "tbody",
                                            [
                                              _c("tr", [
                                                _c(
                                                  "td",
                                                  {
                                                    staticClass: "section_name",
                                                    attrs: { colspan: "3" }
                                                  },
                                                  [_vm._v(_vm._s(section.text))]
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _vm._l(section.children, function(
                                                permission
                                              ) {
                                                return _c("tr", [
                                                  _c(
                                                    "td",
                                                    {
                                                      staticClass: "form-group"
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.selectedPermissions,
                                                            expression:
                                                              "selectedPermissions"
                                                          }
                                                        ],
                                                        attrs: {
                                                          type: "checkbox",
                                                          disabled: _vm.disabled
                                                        },
                                                        domProps: {
                                                          value: permission.id,
                                                          checked: Array.isArray(
                                                            _vm.selectedPermissions
                                                          )
                                                            ? _vm._i(
                                                                _vm.selectedPermissions,
                                                                permission.id
                                                              ) > -1
                                                            : _vm.selectedPermissions
                                                        },
                                                        on: {
                                                          change: [
                                                            function($event) {
                                                              var $$a =
                                                                  _vm.selectedPermissions,
                                                                $$el =
                                                                  $event.target,
                                                                $$c = $$el.checked
                                                                  ? true
                                                                  : false
                                                              if (
                                                                Array.isArray(
                                                                  $$a
                                                                )
                                                              ) {
                                                                var $$v =
                                                                    permission.id,
                                                                  $$i = _vm._i(
                                                                    $$a,
                                                                    $$v
                                                                  )
                                                                if (
                                                                  $$el.checked
                                                                ) {
                                                                  $$i < 0 &&
                                                                    (_vm.selectedPermissions = $$a.concat(
                                                                      [$$v]
                                                                    ))
                                                                } else {
                                                                  $$i > -1 &&
                                                                    (_vm.selectedPermissions = $$a
                                                                      .slice(
                                                                        0,
                                                                        $$i
                                                                      )
                                                                      .concat(
                                                                        $$a.slice(
                                                                          $$i +
                                                                            1
                                                                        )
                                                                      ))
                                                                }
                                                              } else {
                                                                _vm.selectedPermissions = $$c
                                                              }
                                                            },
                                                            function($event) {
                                                              _vm.changeAttributes(
                                                                permission.id
                                                              )
                                                            }
                                                          ]
                                                        }
                                                      })
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c("td", [
                                                    _vm._v(
                                                      _vm._s(permission.text)
                                                    )
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "td",
                                                    {
                                                      staticStyle: {
                                                        "text-align": "center"
                                                      }
                                                    },
                                                    [
                                                      permission.attributes
                                                        .is_approved == 1
                                                        ? _c("input", {
                                                            directives: [
                                                              {
                                                                name: "model",
                                                                rawName:
                                                                  "v-model",
                                                                value:
                                                                  _vm.selectedAttributes,
                                                                expression:
                                                                  "selectedAttributes"
                                                              }
                                                            ],
                                                            attrs: {
                                                              type: "checkbox",
                                                              disabled: _vm.isDisabled(
                                                                permission.id
                                                              )
                                                            },
                                                            domProps: {
                                                              value:
                                                                permission.id,
                                                              checked: Array.isArray(
                                                                _vm.selectedAttributes
                                                              )
                                                                ? _vm._i(
                                                                    _vm.selectedAttributes,
                                                                    permission.id
                                                                  ) > -1
                                                                : _vm.selectedAttributes
                                                            },
                                                            on: {
                                                              change: function(
                                                                $event
                                                              ) {
                                                                var $$a =
                                                                    _vm.selectedAttributes,
                                                                  $$el =
                                                                    $event.target,
                                                                  $$c = $$el.checked
                                                                    ? true
                                                                    : false
                                                                if (
                                                                  Array.isArray(
                                                                    $$a
                                                                  )
                                                                ) {
                                                                  var $$v =
                                                                      permission.id,
                                                                    $$i = _vm._i(
                                                                      $$a,
                                                                      $$v
                                                                    )
                                                                  if (
                                                                    $$el.checked
                                                                  ) {
                                                                    $$i < 0 &&
                                                                      (_vm.selectedAttributes = $$a.concat(
                                                                        [$$v]
                                                                      ))
                                                                  } else {
                                                                    $$i > -1 &&
                                                                      (_vm.selectedAttributes = $$a
                                                                        .slice(
                                                                          0,
                                                                          $$i
                                                                        )
                                                                        .concat(
                                                                          $$a.slice(
                                                                            $$i +
                                                                              1
                                                                          )
                                                                        ))
                                                                  }
                                                                } else {
                                                                  _vm.selectedAttributes = $$c
                                                                }
                                                              }
                                                            }
                                                          })
                                                        : _vm._e()
                                                    ]
                                                  )
                                                ])
                                              })
                                            ],
                                            2
                                          )
                                        })
                                      ],
                                      2
                                    )
                                  : _vm._e()
                              ])
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c("error-inform", {
                          attrs: { err: _vm.err, state: _vm.state }
                        }),
                        _vm._v(" "),
                        _c(
                          "ok-action-inform",
                          { attrs: { state: _vm.state } },
                          [
                            _c(
                              "div",
                              {
                                attrs: { slot: "ok-message" },
                                slot: "ok-message"
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    directives: [
                                      {
                                        name: "translate",
                                        rawName: "v-translate"
                                      }
                                    ]
                                  },
                                  [_vm._v("Роль была изменена.")]
                                )
                              ]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    !_vm.disabled
                      ? _c(
                          "div",
                          { staticClass: "box-footer overlay-wrapper" },
                          [
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-primary pull-right",
                                attrs: { type: "submit" }
                              },
                              [_vm._v("Сохранить")]
                            ),
                            _vm._v(" "),
                            _vm.submitting
                              ? _c("div", { staticClass: "overlay" }, [
                                  _c("i", {
                                    staticClass: "fa fa-refresh fa-spin"
                                  })
                                ])
                              : _vm._e()
                          ]
                        )
                      : _vm._e()
                  ]
                )
              ])
            ])
          ])
        ])
      : _vm._e()
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
      _c("li", { staticClass: "active" }, [_vm._v("Роль")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "box-header with-border" }, [
      _c("h3", { staticClass: "box-title" }, [_vm._v("Редактировать роль")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-823d8e84", module.exports)
  }
}

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(345)
}
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(347)
/* template */
var __vue_template__ = __webpack_require__(351)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-823d8e84"
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
Component.options.__file = "src/js/pages/admin/Role.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-823d8e84", Component.options)
  } else {
    hotAPI.reload("data-v-823d8e84", Component.options)
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