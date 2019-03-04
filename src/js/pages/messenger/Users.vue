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

            <!-- Default box -->
            <div class="box">
                <div class="box-header ">
                    <div class="row">
                        <div class="col-lg-8 col-md-12">
                            <h3 class="box-title">Пользователи Messenger</h3>
                        </div>
                    </div>
                </div>

                <form-create-login v-if="show.formCreateUserShow"  @close="show.formCreateUserShow = false" @form:create-login="create"></form-create-login>
                <gapp-table :tableProperties="table" @gapptable:create="show.formCreateUserShow = true" :tableDataAdd="tableDataAdd"></gapp-table>

            </div>

        </section>
        <!-- /.content -->
    </div>

</template>

<script type="text/ecmascript-6">

    import { mapState, mapGetters, mapMutations } from 'vuex'
    import GappTable from "../../components/table/GappTable.vue";
    import LoginMessenger from "../../components/table/field/LoginMessenger.vue";
    import FormCreateLogin from "../../components/window/messenger/formCreateLogin.vue";
    import {PERMISSIONS} from "../../mixins/permissions";

    export default {
        name: 'admin-users',
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
                            name: '__slot:loginMessenger',
                            title: "Логин",
                            sortField: 'login',
                            filtered: true
                        },
                        {
                            name: "lastName",
                            title: this.t("Фамилия"),
                            sortField: 'lastName',
                            filtered: true
                        },
                        {
                            name: "firstName",
                            title: this.t("Имя"),
                            sortField: 'firstName',
                            filtered: true
                        },
                        {
                            name: "middleName",
                            title: this.t("Отчество"),
                            sortField: 'middleName',
                            filtered: true
                        },
                        {
                            name: "nickName",
                            title: this.t("Ник"),
                            sortField: 'nickName',
                            filtered: true
                        },

                        {
                            name: "email",
                            title: "Email",
                            sortField: 'email',
                            filtered: true
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
                    }
                },
                tableDataAdd: [],
                show: {
                    formCreateUserShow: false
                }
            }
        },
        mounted(){
            this.table.buttons.create = this.hasPermission(PERMISSIONS.MESSENGER_CREATE_USER);
        },
        components: {
            FormCreateLogin,
            GappTable,
            LoginMessenger
          },
        computed: {
            ...mapGetters(["hasPermission"])
        },
        methods: {
            create(obj) {
                let data = {};
                for (let prop in obj) {
                    data[prop] = obj[prop];
                }
                this.tableDataAdd = [data];
            }

        },
        locales: {
            uz: {

            }
        }

    }
</script>

