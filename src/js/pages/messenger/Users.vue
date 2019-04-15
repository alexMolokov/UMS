<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>Пользователи Messenger</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Пользователи Messenger</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="messenger-users-wrapper box">
                <div class="panel-box tree">
                    <div>
                        <v-jstree  v-if="!tree.empty" :data="tree.data" :async="loadTree" allow-batch whole-row  ref="jsTree"  @item-click="itemClick"></v-jstree>
                        <div v-if="tree.empty">
                            Нет назначенных подразделений
                        </div>
                    </div>
                </div>
                <div class="handler"></div>
                <div class="panel-box user-table">

                    <div class="row" style="margin-bottom: 20px">
                        <div class="col-xs-12">
                            <form-create-login v-if="showForm.formCreateUserShow"  @close="showForm.formCreateUserShow = false" @form:create-login="create" :ou="table.moreParams.ou_id"></form-create-login>
                            <form-user-action v-if="showForm.formUserActionShow"  @close="showForm.formUserActionShow = false" :action="userAction.type" :checked-users="userAction.chooseUsers" @form:copy-move-users-ok="copyMoveUsersOk"></form-user-action>
                            <gapp-table
                                    v-if="tree.loaded && !tree.empty"
                                    :tableProperties="table"
                                    @gapptable:create="showForm.formCreateUserShow = true"
                                    @gapptable:checkbox-toggled="checkboxToggled"
                                    @gapptable:checkbox-toggled-all="checkboxToggledAll"
                                    :tableDataAdd="tableDataAdd"

                                    ref="messengerUsers">
                                        <template slot="add-buttons">
                                            <div class="pull-right create-button" v-if="hasPermission(permissions.MESSENGER_EDIT_USER)" style="margin-right: 20px">
                                                <router-link :to="{ name: 'messenger-load-users-file', params: {'ou': table.moreParams.ou_id}}" class="btn btn-block btn-primary">Загрузить из csv</router-link>
                                            </div>

                                            <div class="pull-right" style="margin-right: 20px" v-if="hasPermission(permissions.MESSENGER_COPY_USER)">
                                                <a href="#" class="btn btn-block btn-primary" v-translate @click.prevent="setAction('copy')" :disabled="!isUserSelected">Копировать</a>
                                            </div>
                                            <div class="pull-right" style="margin-right: 20px" v-if="hasPermission(permissions.MESSENGER_MOVE_USER)">
                                                <a href="#" class="btn btn-block btn-primary" v-translate @click.prevent="setAction('move')" :disabled="!isUserSelected">Переместить</a>
                                            </div>


                                        </template>
                            </gapp-table>
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
    import hasPermission from '../../mixins/has-permission.vue';
    import { mapState, mapGetters, mapMutations } from 'vuex'
    import FormCreateLogin from "../../components/window/messenger/formCreateLogin.vue";
    import FormUserAction from "../../components/window/messenger/formUserAction.vue";
    import {PERMISSIONS} from "../../mixins/permissions";
    import GappTable from "../../components/table/GappTable.vue";
    import VJstree from "vue-jstree/src/tree.vue";
    import loadTree from '../../mixins/load-tree';

    export default {
        name: 'messenger-users',
        mixins: [ajaxform, hasPermission, loadTree],
        data() {
            return {
                table: {
                    sortOrder: [
                        {
                            field: 'login',
                            sortField: 'login',
                            direction: 'asc'
                        }
                    ],
                    fields: [
                        {
                            name: '__sequence',
                            title: '#',
                            titleClass: 'center aligned',
                            dataClass: 'right aligned',
                            filtered: false
                        },
                        {
                            name: '__checkbox',
                            titleClass: 'center aligned',
                            dataClass: 'center aligned',
                        },

                        {
                            name: '__slot:loginMessenger',
                            title: "Логин",
                            sortField: 'login',
                            filtered: true,
                            filtername: "login",
                        },
                        {
                            name: "lastName",
                            title: this.t("Фамилия"),
                            sortField: 'lastName',
                            filtered: true,
                            filtername: "lastName",
                        },
                        {
                            name: "firstName",
                            title: this.t("Имя"),
                            sortField: 'firstName',
                            filtered: false
                        },
                        {
                            name: "middleName",
                            title: this.t("Отчество"),
                            sortField: 'middleName',
                            filtered: false
                        },
                        {
                            name: "nickName",
                            title: this.t("Ник"),
                            sortField: 'nickName',
                            filtered: true,
                            filtername: 'nickName'
                        },

                        {
                            name: "email",
                            title: "Email",
                            sortField: 'email',
                            filtered: true,
                            filtername: 'email'
                        },
                        {
                            name: "blocked",
                            visible: false,
                            filtered: false
                        },
                        {
                            name: "id",
                            visible: false,
                            filtered: false
                        }

                    ],
                    apiUrl: '/user/list',
                    rowClass: function(dataItem, index){
                        if(dataItem.blocked != 0) return "text-red";
                        return "";
                    },
                    trackBy: "login",
                    slots: {"loginMessenger": true},
                    searchPlaceHolder: "Логин",
                    buttons: {
                        "create": false
                    },
                    moreParams: {
                        "ou_id": null
                    }
                },
                tableDataAdd: [],
                showForm: {
                    formCreateUserShow: false,
                    formUserActionShow: false
                },
                userAction: {
                    type: "",
                    chooseUsersMap: new Map(),
                    chooseUsers:[],
                    count: 0
                }
            }
        },
        mounted(){
            this.table.buttons.create = this.hasPermission(PERMISSIONS.MESSENGER_EDIT_USER);
            this.initDraggableWindow();


        },
        components: {
            FormCreateLogin,
            FormUserAction,
            GappTable,
            VJstree
    },
        computed: {
            ...mapGetters(["hasPermission"]),
            isUserSelected() {
                return this.userAction.chooseUsers.length > 0
            }
        },
        methods: {
            getUserMap(){
                return this.userAction.chooseUsersMap;
            },
            copyMoveUsersOk(){

                this.$refs["messengerUsers"].checkboxUnSelect();
                this.userAction.chooseUsersMap = new Map();
                this.userAction.chooseUsers = [];
                this.$refs["messengerUsers"].reload();
            },
            checkboxToggled: function(data) {
                let item = data.item;
                let map =  this.getUserMap();
                if(data.isChecked){
                    map.set(item.id, item);
                } else {
                    map.delete(item.id);
                }
                this.setUsersForVueTable();
            },
            checkboxToggledAll: function(data){
                let map =  this.getUserMap();
                if(data.isChecked) {
                    data.items.forEach(function(item){
                        map.set(item.id, item);
                    });
                } else {
                    data.items.forEach(function(item){
                        map.delete(item.id);
                    });
                }
                this.setUsersForVueTable();
            },
            setAction(action) {
                this.userAction.type = action;
                this.showForm.formUserActionShow = true;
            },
            setUsersForVueTable() {
                let map =  this.userAction.chooseUsersMap;
                let keys = map.keys();
                let result = [];

                for(let key of keys) {
                    result.push(map.get(key));
                }

                this.userAction.chooseUsers = result;
            },
            create(obj) {
                let data = {};
                for (let prop in obj) {
                    data[prop] = obj[prop];
                }
                this.tableDataAdd = [data];
            },
            initDraggableWindow(){
                var handler = document.querySelector('.handler');
                var wrapper = handler.closest('.messenger-users-wrapper');
                var boxA = wrapper.querySelector('.tree');
                var isHandlerDragging = false;

                document.addEventListener('mousedown', function(e) {
                    // If mousedown event is fired from .handler, toggle flag to true
                    if (e.target === handler) {
                        isHandlerDragging = true;
                    }
                });

                document.addEventListener('mousemove', function(e) {
                    // Don't do anything if dragging flag is false
                    if (!isHandlerDragging) {
                        return false;
                    }

                    // Get offset
                    var containerOffsetLeft = wrapper.offsetLeft;

                    // Get x-coordinate of pointer relative to container
                    var pointerRelativeXpos = e.clientX - containerOffsetLeft;

                    // Resize box A
                    // * 8px is the left/right spacing between .handler and its inner pseudo-element
                    // * Set flex-grow to 0 to prevent it from growing
                    boxA.style.width = (pointerRelativeXpos - 8) + 'px';
                    boxA.style.flexGrow = 0;
                });

                document.addEventListener('mouseup', function(e) {
                    // Turn off dragging flag when user mouse is up
                    isHandlerDragging = false;
                });
            },

            itemClick (node) {
                let model =  node.model;
                let value = model.value
                this.tree.selectedNode = value;
                this.table.moreParams.ou_id = value.id;
                this.$refs.messengerUsers.onStartSearch();
            },

        },
        locales: {
            uz: {

            }
        }

    }
</script>

<style lang="scss">
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
                /*flex: 1 1 1200px;*/

               /* @media (max-width: 1200px) {
                    flex: 1 1 1000px;
                }

                @media (max-width: 1024px) {
                    flex: 1 1 600px;
                }

                @media (max-width: 800px) {
                    flex: 1 1 400px;
                }*/



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
