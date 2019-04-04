<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>Заявки на одобрение</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Заявки на одобрение</li>
            </ol>
        </section>

        <section class="content">
            <div class="box box-body">
                <div class="row">
                    <div class="col-sm-12 col-lg-10">
                        <gapp-table :tableProperties="table" ref="AssignedOrder"></gapp-table>
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
        name: 'order-assigned',
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
                            name: '__slot:assignedOrderId',
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
                            name: 'created_by_login',
                            title: "Инициатор (Логин)",
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            sortField: 'created_at',
                            filtered: true,
                            filtername: "created_by_login"
                        },

                        {
                            name: 'subject',
                            title: "Тема",
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            sortField: 'subject',
                            filtered: true,
                            filtername: "subject",
                            filterData: {
                                type: "one-select",
                                values: [
                                    {"value": "", "title":  this.t("All")},
                                    {"value": "Block User", "title":  this.t("Block User")},
                                    {"value": "Unblock User", "title":  this.t("Unblock User")},
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

                    ],
                    apiUrl: '/order/assigned',
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
                "Block User": "Блокировать пользователя",
                "Unblock User": "Разблокировать пользователя",
            },
            uz: {

            }
        }
    }
</script>
<style lang="scss">





</style>
