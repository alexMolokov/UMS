<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>Администрирование/Пользователи</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Администрирование/Пользователи</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">


            <!-- Default box -->
            <div class="box">
                <div class="box-header ">
                    <div class="row">
                        <div class="col-lg-8 col-md-12">
                            <h3 class="box-title">Пользователи системы</h3>
                        </div>

                    </div>
                </div>

                <form-create-login v-if="show.formCreateUserShow"  @close="show.formCreateUserShow = false" @form:create-login="create"></form-create-login>


                <div class="row">
                    <div class="col-lg-8 col-md-12">
                        <gapp-table :tableProperties="table" @gapptable:create="show.formCreateUserShow = true" :tableDataAdd="tableDataAdd"></gapp-table>
                    </div>
                </div>

            </div>

        </section>
        <!-- /.content -->
    </div>

</template>

<script type="text/ecmascript-6">

    import { mapState, mapGetters, mapMutations } from 'vuex'
    import GappTable from "../../components/table/GappTable.vue";
    import FormCreateLogin from "../../components/window/formCreateLogin.vue";
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
                            name: '__slot:login',
                            title: "Логин",
                            sortField: 'login',
                            filtered: true,
                            filtername: 'login'
                        },
                        {
                            name: "lastname",
                            title: this.t("Фамилия"),
                            sortField: 'lastname',
                            filtered: true,
                            filtername: 'lastname'
                        },
                        {
                            name: "firstname",
                            title: this.t("Имя"),
                            sortField: 'firstname',
                            filtered: false,

                        },
                        {
                            name: "email",
                            title: "Email",
                            sortField: 'email',

                            filtered: true,
                            filtername: 'email'

                        },
                        {
                            name: "position",
                            title: this.t("Должность"),
                            sortField: 'position',
                            filtered: false
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
                    apiUrl: '/admin/user/list',
                    rowClass: function(dataItem, index){
                        if(dataItem.blocked != 0) return "text-red";
                        return "";
                    },
                    trackBy: "login",
                    slots: {"login": true},
                    searchPlaceHolder: "Логин, Фамилия, Email ",
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
            this.table.buttons.create = this.hasPermission(PERMISSIONS.ADMIN_CREATE_USER);
        },
        components: {
            FormCreateLogin,
            GappTable
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

