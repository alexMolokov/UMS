<template>
    <modal-window :id="id"  @close="close" class="in"  style="display: block" :show="true" :wide="true">
        <div slot="title" v-translate><span v-if="isCopy">Копирование</span><span v-if="!isCopy">Перемещение</span> пользователей</div>
        <form @submit.prevent.stop class="form-horizontal">
            <div style="position: relative">
                <loading-inform :state="state" @close="close" v-if="!hasOrderId">
                    <div class="window-center" slot="ok-message">
                        <div class="complete-body"><span>Пользователи были успешно</span> <span  v-if="!isCopy">перенесены</span> <span  v-if="isCopy">скопированы</span>.</div>
                        <div class="button-close-ok"><button type="button" class="btn  btn-primary" v-translate @click="close">Ok</button></div>
                    </div>
                    <div slot="buttons"></div>
                </loading-inform>
                <loading-inform :state="state" @close="close" v-if="hasOrderId">
                    <div class="window-center" slot="ok-message">
                        <div class="complete-body">
                            <div>Ваша заявка на  <span  v-if="!isCopy">перемещение</span> <span  v-if="isCopy">копирование</span> пользователей принята.</div>
                            <h4>Номер заявки {{order.id}}</h4>
                        </div>
                        <div class="button-close-ok"><button type="button" class="btn  btn-primary" v-translate @click="close">Ok</button></div>
                    </div>
                    <div slot="buttons"></div>
                </loading-inform>

                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="box-body">
                                    <label>Подразделение: <span v-if="!isActionDisabled">{{tree.selectedNode.name}}</span></label>
                                    <div style="overflow: auto; width: 100%; height: 150px; border: 1px solid rgb(210, 214, 222); position: relative">
                                        <v-jstree :data="tree.data" :async="loadTree"allow-batch whole-row  ref="jsTree"  @item-click="itemClick"></v-jstree>
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="box-body selected-users">
                                    <label>Выбранные пользователи:</label>
                                    <vuetable :fields="table.fields"
                                              :css="table.css"
                                              :api-mode="false"
                                              :data-total="users.length"
                                              :has-filters="false"
                                              tableHeight="300px"
                                              ref="loadUsersTable"
                                             >
                                    </vuetable>

                                </div>
                            </div>

                        </div>
                    </div>
                    <error-inform :err="err" :state="state"></error-inform>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" v-translate @click="validate" :disabled="isActionDisabled"><span v-if="isCopy">Копировать</span><span v-if="!isCopy">Переместить</span></button>
                </div>
            </div>
        </form>
    </modal-window>
</template>


<script>

    import modalWindow from '../modalWindow.vue';
    import ajax from '../../../mixins/ajax-form.vue';
    import errorInform from '../../../mixins/error-inform.vue';
    import loadingInform from '../../../mixins/loading-inform.vue';
    import Vuetable from "vuetable-2/src/components/Vuetable.vue";
    import VJstree from "vue-jstree/src/tree.vue";
    import loadTree from '../../../mixins/load-tree';
    import acceptAction from '../../../mixins/accept-action.vue';
    import {ACCEPT_ACTION_HANDLER} from "../../../mixins/accept-action-handler";

    export default {
        name: 'form-user-action',
        mixins: [ajax, loadTree, acceptAction],
        components: {
            modalWindow,
            VJstree,
            Vuetable,
            errorInform,
            loadingInform,

        },
        props: {
            action: {
                type: String
            },

            checkedUsers: {
                type: [Array, Function],
                default () {
                    return [{
                        "login": "",
                        "firstName": "",
                        "lastName": "",
                        "middleName": "",
                    }]
                }
            },
        },

        data() {
                return {
                    id: "user-action",
                    table: {
                        css: {
                            tableClass: "table table-bordered table-striped dataTable",
                            loadingClass: 'loading',
                            ascendingIcon: 'fa fa-sort-amount-asc',
                            descendingIcon: 'fa fa-sort-amount-desc',
                            detailRowClass: 'vuetable-detail-row',
                            handleIcon: 'grey sidebar icon',
                            sortableIcon: 'sortable-hidden',
                            tableFilterClass: "form-control"
                        },
                        fields: [
                            {
                                name: '__sequence',
                                title: '#',
                                titleClass: 'text-center',
                                dataClass: 'text-center',
                                width: "30px"
                            },
                            {
                                name: 'login',
                                title: "Login",
                                titleClass: 'text-center',
                                dataClass: 'text-right',
                                sortField: 'login',
                                filtered: true,
                                filtername: "login"

                            },
                            {
                                name: 'lastName',
                                title: "Фамилия",
                                titleClass: 'text-center',
                                dataClass: 'text-right',
                                sortField: 'lastName',
                                filtered: false,
                                filtername: "lastName"

                            },
                            {
                                name: 'firstName',
                                titleClass: 'text-center',
                                dataClass: 'text-right',
                                title: "Имя",
                                sortField: 'firstName',
                                filtered: false,
                                filtername: "firstName"

                            },
                            {
                                name: 'middleName',
                                titleClass: 'text-center',
                                dataClass: 'text-right',
                                title: "Отчество",
                                sortField: 'middleName',
                                filtered: false,
                            },
                            {
                                name: 'email',
                                titleClass: 'text-center',
                                dataClass: 'text-right',
                                title: "Email",
                                sortField: 'email',
                                filtered: false,
                                filtername: "email"
                            },
                            {
                                name: 'id',
                                visible: false
                            }


                        ],
                    },
                    users:  {
                        current_page: 1,
                        links: {pagination: {total: 1, from: 1}},
                        data: this.$props.checkedUsers
                    }
                }
            },
            locales: {
                uz: {}
            },
            computed: {
                isCopy: function() {
                    return this.action === "copy";
                },
                isActionDisabled() {
                    return typeof this.tree.selectedNode.id  === "undefined"
                }
            },
            mounted: function () {
                this.getTableReference().setData(this.users);
            },
            methods: {
                getTableReference(){
                    return this.$refs["loadUsersTable"];
                },
                itemClick (node) {
                    let model =  node.model;
                    let value = model.value
                    this.tree.selectedNode = value;


                },


                validate: function () {

                    let url = "/user/" + this.action;
                    let data = {
                        "ou": this.tree.selectedNode.id,
                        "users": []
                    };
                    this.users.data.forEach(function(user){
                        data.users.push(user.login);
                    })

                    let self = this;
                    this.send(url, data, (response) => {
                        ACCEPT_ACTION_HANDLER.handle(
                            self,
                            () => {},
                            response
                        );
                        if(!self.hasOrderId) this.$emit("form:copy-move-users-ok")
                    }, () => {

                    });

                }
            }

    }
</script>
<style lang="scss">
    .tree-selected {
        background: #e1e1e1 !important;
    }

    .selected-users {
        table {
            table-layout: fixed;
        }
    }

    .modal-dialog-wide {
        width: 900px;
    }

    .vuetable-body-wrapper, .vuetable-head-wrapper {
        &::-webkit-scrollbar {
            width: 3px;
            background-color: #F5F5F5;
        }


        table {
            margin-bottom: 0px;
            tr {
                td {
                    border: 0px !important;
                }
            }
        }

    }
</style>

