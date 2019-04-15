<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>Мои заявки</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Мои заявки</li>
            </ol>
        </section>

        <section class="content">
            <div class="box box-body">
                <div class="row">
                    <div class="col-sm-12 col-lg-10">
                        <gapp-table :tableProperties="table" ref="MyOrder"></gapp-table>
                    </div>
                </div>
            </div>

            <!-- /.box -->

        </section>


    </div>
</template>

<script>

    import GappTable from "../../components/table/GappTable.vue";
    import ErrorInform from '../../mixins/error-inform.vue';
    import OkActionInform  from '../../mixins/ok-action-inform.vue';

    import ajaxform from '../../mixins/ajax-form.vue';
    import {STATES} from "../../mixins/states";

    export default {
        components: {
            GappTable,
            ErrorInform,
            OkActionInform
        },
        name: 'order-my',
        mixins: [ajaxform],
        data(){
            return {

                table: {
                    moreParams: {"lang": "ru"},
                    sortOrder: [
                        {
                            field: 'id',
                            sortField: 'id',
                            direction: 'desc'
                        }
                    ],
                    fields: [
                        {
                            name: '__slot:myOrderId',
                            title: '#',
                            titleClass: 'text-center',
                            dataClass: 'text-center',
                            filtered: true,
                            filtername: "id",
                            sortField: 'id',
                            width: "150px",
                        },
                        {
                            name: 'created_at',
                            title: "Дата",
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            sortField: 'created_at',
                            filtered: false,
                            width: "180px"
                        },
                        {
                            name: 'subject',
                            title: "Тема",
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            sortField: 'subject',
                            filtered: true,
                            filtername: "action",
                            filterData: {
                                type: "one-select",
                                values: [
                                    {"value": "", "title":  this.t("All")},
                                    {"value": "messenger.user.block", "title":  this.t("Block User")},
                                    {"value": "messenger.change.password", "title":  this.t("Change Password")},
                                    {"value": "messenger.change.profile", "title":  this.t("Change Profile")},
                                    {"value": "messenger.user.copy", "title":  this.t("Copy to")},
                                    {"value": "messenger.user.move", "title":  this.t("Move to")},
                                    {"value": "messenger.user.block", "title":  this.t("Unblock User")},
                                    {"value": "messenger.user.create", "title":  this.t("Create User")},
                                    {"value": "messenger.users.create", "title":  this.t("Create Users")},



                                ]

                            }
                        },
                        {
                            name: 'context',
                            title: "Контекст",
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            filtered: false
                        },

                        {
                            name: 'assigned_user',
                            title: "Ответственный",
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            filtered: false
                        },


                        {
                            name: 'order_state_id',
                            title: "Статус",
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            filtered: true,
                            filtername: "order_state_id",
                            filterData: {
                                type: "one-select",
                                values: [
                                    {"value": "", "title":  this.t("All")},
                                    {"value": "2", "title":  this.t("Accept")},
                                    {"value": "3", "title":  this.t("Cancelled")},
                                    {"value": "5", "title":  this.t("Done")}
                                ]

                            }
                        },

                    ],
                    apiUrl: '/order/my',
                    buttons: {
                        create: false
                    }
                },
                orders: [],
            }
        },
        computed: {

        },
        methods: {







        },
        locales: {
            ru: {
                "Done": "Выполнена",
                "Accept": "На рассмотрении",
                "All": "Все",
                "Cancelled": "Отменена",
                "Block User": "Блокировать пользователя",
                "Unblock User": "Разблокировать пользователя",
                "Change Password": "Изменить пароль",
                "Create User": "Создать пользователя",
                "Move users": "Переместить пользователей",
                "Copy users": "Копировать пользователей",
                "Copy to": "Копировать пользователей",
                "Move to": "Переместить пользователей",
                "Create Users": "Создать пользователей",
                "Change Profile": "Изменить профиль",
            },
            uz: {

            }
        }
    }
</script>
<style lang="scss">





</style>
