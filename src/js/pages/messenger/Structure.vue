<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1 style="display: inline-block" v-translate>Структура подразделений</h1>
            <div style="display: inline-block; position: relative; margin-left: 20px">
                <div class="overlay-wrapper">
                    <a href="#" @click.prevent="save" class="btn btn-primary" v-if="tree.loaded && !tree.empty" v-translate>Сохранить</a>
                    <div class="overlay" v-if="submitting"><i class="fa fa-refresh fa-spin"></i></div>
                </div>
            </div>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i><span v-translate>Главная</span></a></li>
                <li class="active" v-translate>Структура подразделений</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="messenger-users-wrapper box">
                <div class="panel-box tree structure">
                    <div>
                        <v-jstree v-if="!tree.empty" :data="tree.data" :async="loadTree"allow-batch whole-row  ref="jsTree"  @item-click="itemClick">
                            <template slot-scope="_">
                                <div>
                                    <i :class="_.vm.themeIconClasses" role="presentation" v-if="!_.model.loading"></i>
                                    {{_.model.text}}
                                    <a v-if="_.model.opened" class="structure-action" @click.prevent="addItem(_.vm, _.model, $event)"><i style="color: green" class="fa fa-plus-square"></i></a>
                                    <a v-if="_.model.opened" class="structure-action" @click.prevent="removeItemWrapper(_.vm, _.model, $event)"><i style="color: red" class="fa fa-trash-o"></i></a>
                                </div>
                            </template>
                        </v-jstree>
                        <div v-if="tree.empty">
                            Нет назначенных подразделений
                        </div>
                    </div>

                </div>
                <div class="handler"></div>
                <div class="panel-box user-table">
                    <div class="row" style="margin-bottom: 20px">
                        <div class="col-sm-12 col-md-9 col-lg-6" v-if="tree.loaded && !tree.empty">
                            <h3 style="margin-top: 0px; margin-bottom: 20px; font-size: 20px;" v-translate>Выделенный элемент</h3>
                            <div class="form-group">
                                <label for="name" class="control-label" v-translate>Название</label>
                                <div>
                                    <div><input type="text" class="form-control" id="name" name="name"  v-model="tree.selectedNode.name"></div>
                                </div>
                            </div>

                            <div style="display: flex; margin-bottom: 20px;">
                                <div style="flex: 1 1 auto; text-align: right"><a href="#" @click.prevent="changeData" class="btn btn-primary" :disabled="changeDisabled" v-translate>Изменить</a></div>
                            </div>

                            <error-inform :err="err" :state="state" @error-inform:closed="closeErrorInform"></error-inform>

                            <ok-action-inform :state="state">
                                <div slot="ok-message">
                                    <div>{{okMessage}}</div>
                                </div>
                            </ok-action-inform>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /.content -->
    </div>

</template>

<script type="text/ecmascript-6">
    import ajaxform from '../../mixins/ajax-form.vue';
    import errorInform from '../../mixins/error-inform.vue';
    import hasPermission from '../../mixins/has-permission.vue';
    import { mapState, mapGetters, mapMutations } from 'vuex'
    import {PERMISSIONS} from "../../mixins/permissions";
    import draggableWindow from '../../mixins/draggable-window';
    import {STATES} from "../../mixins/states";
    import OkActionInform  from '../../mixins/ok-action-inform.vue';
    import VJstree from "vue-jstree/src/tree.vue";
    import loadTree from "../../mixins/load-tree";

    export default {
        name: 'messenger-users',
        mixins: [ajaxform, hasPermission, draggableWindow, loadTree],
        data() {
            return {
                actions: {
                    "delete": new Map(),
                    "add": new Map(),
                    "change": new Map()
                },
                saved: false,
                okMessage: ""

            }
        },
        components: {
            VJstree,
            errorInform,
            OkActionInform
        },
        computed: {
            ...mapGetters(["hasPermission"]),
            changeDisabled(){
                return this.tree.selectedNode.name == ""
            }
        },
        methods: {
            reloadPage(){
                this.$router.push(this.$router.currentRoute.path);
            },

            itemClick (node) {
                this.tree.allItems.set(node.model.id, node.model);
                this.setSelectedNode(node)
            },
            setSelectedNode(node){
                this.tree.selectedNode.model = node.model;
                this.tree.selectedNode.name = node.model.text;
                this.tree.selectedNode.node = node;
            },
            changeData(){
                this.tree.selectedNode.model.text  = this.tree.selectedNode.name;
                this.tree.selectedNode.model.value.name  = this.tree.selectedNode.name;

                this.saveForChange(this.tree.selectedNode.model)
            },
            saveForChange(model){
              if(this.isExistsTree(model)) {
                  this.actions.change.set(model.id, model);
              }
            },
            saveForDelete(model){

                if(this.isExistsTree(model)) {
                    this.actions.change.delete(model.id);
                    this.actions.delete.set(model.id, model);
                }
            },

            addItem(){
                    let model = this.tree.selectedNode.model;
                    if (model.id !== undefined) {
                        let newItem = model.addChild({
                            text: "Новое подразделение",
                            opened: true,
                            value: {
                              name: "Новое подразделение",
                              hasUsers: false,
                              parentId: model.id
                            },
                            isLeaf: true,
                            icon: "fa fa-sticky-note-o"
                        })

                        if(this.isExistsTree(model)) {
                            this.actions.add.set(newItem.id, newItem);
                        }

                        model.isLeaf = false;
                        model.icon =  "fa fa-folder";
                    }
            },
            isExistsTree(model){
                if(Number.isInteger(model.id)){
                    return false;
                }
                return true;
            },

            removeItemWrapper() {
                let node = this.tree.selectedNode.node;

                if(typeof node.model.value.hasUsers == "undefined")
                {
                    this.uploadInfo('/user/ou/has', {"ou_id": node.model.value.id}, (data) => {
                        node.model.value.hasUsers = data.has;
                        this.removeOrAlert(node);
                    }, {}, (data) => { });
                } else {
                    this.removeOrAlert(node)
                }

            },
            removeOrAlert(node){
                if(node.model.value.hasUsers) {
                    this.state = STATES.ERROR;
                    this.err.common = [];
                    this.err.common.push("Данное подразделение не может быть удалено так как содержит пользователей");
                } else {
                    this.removeItem(node);
                }
            },
            removeItem(node){

                if (node.model.id !== undefined) {
                    this.saveForDelete(node.model);
                    node.model.text = "";
                    var index = node.parentItem.indexOf(node.model);
                    node.parentItem.splice(index, 1);

                    let parent = node.$parent;

                    if(parent.$children.length == 1){
                        parent.model.icon =  "fa fa-sticky-note-o";
                        parent.model.isLeaf = true;

                    }
                    this.setEmptySelectedNode();


                }

            },

            resetActions(){
                this.actions["delete"] = new Map();
                this.actions["change"] = new Map();
                this.actions["add"] = new Map();

            },
            getRemoveItems() {
              let result = [];
              let self = this;

              let keys = self.actions["delete"].keys();

              for (let key of keys) {
                  let item = self.actions["delete"].get(key);
                  result.push(item.id);
              }

              return result;
            },
            getChangeItems() {
                let result = {};
                let self = this;
                let keys = self.actions["change"].keys();

                for (let key of keys) {
                    let item = self.actions["change"].get(key);
                    result[item.id] = {"name": item.text};
                }

                return result;
            },
            getAddItems(){
                let result = [];
                let keys = this.actions["add"].keys();

                 for (let key of keys) {
                    let item = this.actions["add"].get(key);
                    result.push({
                        "name": item.text,
                        "parentId": item.value.parentId,
                        "children" : this.addRecursion(item)
                    });
                }

                return result;
            },

            addRecursion(item){
                let children = [];

                for(let i = 0; i< item.children.length; i++) {
                    children.push({
                            "name": item.children[i].text,
                            "children": this.addRecursion(item.children[i])
                    })
                }

                return children;
            },

            save(){

                let data = {
                    "change": this.getChangeItems(),
                    "add":  this.getAddItems(),
                    "remove": this.getRemoveItems()
                };

                let self = this;

                this.send("/ou/structure/save", data,
                    function(data) {
                        self.state = STATES.ANSWER;
                        self.saved = true;
                        self.okMessage = "Структура подразделений была изменена"

                        self.setGuidAndParentForAddedItems(data);
                        self.resetActions();
                    }
                );
            },
            setGuidAndParentForAddedItems(items){
                let self = this;
                items.forEach(function(item){
                    let parentItem = self.tree.allItems.get(item.parentId);

                    if(parentItem.children.length > 0) {
                        let len = parentItem.children.length;
                        for(let i=0; i< len; i++ ){
                            if(parentItem.children[i].text == item.name) {
                                if(!self.isExistsTree(parentItem.children[i])) {
                                    parentItem.children[i].id = item.id;
                                    self.tree.allItems.set(item.id, parentItem.children[i]);
                                }
                            }
                        }


                    }

                })


            },
            closeErrorInform(){
                this.state = STATES.START;
                this.err.common = [];
            }


        },
        locales: {
            uz: {

            }
        }

    }
</script>

<style lang="scss">
    .structure {
        .structure-action {
                display: inline-block;
                visibility: hidden;
                border: 0px;
                background-color: transparent;
                cursor: pointer;
                margin-left: 10px;
        }
        .tree-selected {
            .structure-action {
                visibility: visible;
            }
        }
    }


    .float-right {
        float: right!important;
    }

    .messenger-users-wrapper {
        display: flex;

        .handler {
            width: 2px;
            padding: 0;
            cursor: ew-resize;
            flex: 0 0 auto;
        }

        .handler::before {
            content: '';
            display: block;
            width: 3px;
            height: 100%;
            background:  #d2d6de;
            margin: 0 auto;
        }

        .panel-box {
            box-sizing: border-box;
            padding: 10px;

            &.user-table {
                flex-grow: 1;




                .filter-bar {
                    button {
                        display: inline-block;
                        margin-right: 10px;
                    }
                }

                .form-control-feedback {
                    &.vbt-simple-filter-clear {
                        pointer-events: auto;
                        line-height:3.375rem;
                    }
                }

                .pagination {
                    margin: 0 0;

                    input[type="number"] {
                        display: none !important;
                    }
                    .vbt-per-page-dropdown {
                        display: none !important;
                    }
                }
            }
            &.tree {
                height: calc(100vh - 145px);
                min-width: 250px;
                overflow-y: auto;
                position: relative;

                .tree-selected {
                    background: #e1e1e1 !important;
                }

            }
        }

    }

</style>
