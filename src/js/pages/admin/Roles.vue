<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>Администрирование/Роли</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Администрирование/Роли</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">


            <!-- Default box -->
            <div class="box">
                <div class="box-header ">
                    <div class="row">
                        <div class="col-lg-8 col-md-12">
                            <h3 class="box-title">Роли</h3>
                        </div>

                    </div>
                </div>
                <form-create-role v-if="show.formCreateRoleShow"  @close="show.formCreateRoleShow = false" @form:create-role="create"></form-create-role>
                <gapp-table :tableProperties="table" @gapptable:create="show.formCreateRoleShow = true" :tableDataAdd="tableDataAdd"></gapp-table>

            </div>

        </section>
        <!-- /.content -->
    </div>

</template>

<script type="text/ecmascript-6">

    import { mapState, mapGetters, mapMutations } from 'vuex'
    import GappTable from "../../components/table/GappTable.vue";
    import FormCreateRole from "../../components/window/formCreateRole.vue";
    import {PERMISSIONS} from "../../mixins/permissions";

    export default {
        name: 'admin-roles',
        data() {
            return {
                table: {
                    sortOrder: [
                        {
                            field: 'role',
                            sortField: 'name',
                            direction: 'asc'
                        }
                    ],
                    fields: [
                        {
                            name: '__sequence',
                            title: '#',
                            titleClass: 'center aligned',
                            dataClass: 'right aligned'
                        },
                        {
                            name: '__slot:role',
                            title: "Название",
                            sortField: 'name',
                        },
                        {
                            name: "id",
                            visible: false
                        }

                    ],
                    apiUrl: '/admin/role/list',
                    trackBy: "id",
                    slots: {"role": true},
                    searchPlaceHolder: "Название ",
                    buttons: {
                        "create": false
                    }
                },
                tableDataAdd: [],
                show: {
                    formCreateRoleShow: false
                }
            }
        },
        mounted(){
            this.table.buttons.create = this.hasPermission(PERMISSIONS.ADMIN_CREATE_ROLE);
        },
        components: {
            FormCreateRole,
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

