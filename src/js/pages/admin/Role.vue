<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1 style="display: inline-block">Роль</h1>

            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Роль</li>
            </ol>
            <div class="row">
                <div class="col-lg-6 col-md-12">
                    <delete-role :role-id="role.id" @role:deleted="roleDeleted"></delete-role>
                </div>
            </div>
        </section>
        <!-- Main content -->
        <section class="content" v-if="isActive">
            <!-- Default box -->
            <div class="row">
                <div class="col-lg-6 col-md-12">
                    <div class="box box-info">
                        <div class="box-header with-border">
                            <h3 class="box-title">Редактировать роль</h3>
                        </div>
                        <!-- /.box-header -->
                        <!-- form start -->
                        <form class="form-horizontal" @submit.prevent="validate">
                            <div class="box-body">
                                <div class="form-group"  :class="{'has-error': errors.has('role')}">
                                    <label for="role" class="col-sm-2 control-label">Роль</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="role" name="role" v-model="role.name" v-validate="{ required: true, min:3, regex: /^[a-zA-Z]{1,}$/ }" placeholder="Название (Только Латинские буквы)"  :disabled="disabled">
                                        <span v-show="errors.has('role')" class="help-block">{{errors.first('role')}}</span>
                                    </div>
                                </div>
                                <div class="form-group"  :class="{'has-error': errors.has('description')}">
                                    <label for="role" class="col-sm-2 control-label">Описание</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="description" name="description" v-model="role.description"  v-validate="'max:100'" placeholder="Описание" :disabled="disabled">
                                        <span v-show="errors.has('description')" class="help-block">{{errors.first('description')}}</span>
                                    </div>
                                </div>

                                <div class="form-group" :class="{'has-error': errors.has('permissions')}">
                                    <label class="col-sm-2 control-label">Права</label>
                                    <div class="col-sm-10">

                                        <div class="table-responsive">
                                        <table class="table table-bordered" v-if="tree.loaded">
                                            <thead>
                                                <tr>
                                                    <th style="width:20px">#</th>
                                                    <th v-translate>Название</th>
                                                    <th v-translate  style="width:90px">Одобрение</th>
                                                </tr>
                                            </thead>
                                            <tbody v-for="section in tree.data">
                                                <tr><td colspan="3" class="section_name">{{section.text}}</td></tr>
                                                <tr v-for="permission in section.children">
                                                    <td class="form-group">
                                                        <input type="checkbox"  v-model="selectedPermissions" @change="changeAttributes(permission.id)" :value="permission.id"  :disabled="disabled">
                                                    </td>
                                                    <td>{{permission.text}}</td>
                                                    <td style="text-align: center">
                                                        <input v-if="permission.attributes.is_approved == 1" type="checkbox"  v-model="selectedAttributes" :value="permission.id" :disabled="isDisabled(permission.id)">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                      </div>
                                </div>

                                <error-inform :err="err" :state="state"></error-inform>
                                <ok-action-inform :state="state">
                                    <div slot="ok-message">
                                        <div  v-translate>Роль была изменена.</div>
                                    </div>
                                </ok-action-inform>

                            </div>
                            <div class="box-footer overlay-wrapper" v-if="!disabled">
                                <button type="submit" class="btn btn-primary pull-right">Сохранить</button>
                                <div class="overlay" v-if="submitting"><i class="fa fa-refresh fa-spin"></i></div>
                            </div>
                            <!-- /.box-footer -->
                        </form>
                    </div>
                </div>
            </div>

            <!-- /.box -->

        </section>
        <!-- /.content -->
    </div>
</template>

<script>
    import ajaxform from '../../mixins/ajax-form.vue';
    import ErrorInform  from '../../mixins/error-inform.vue';
    import OkActionInform  from '../../mixins/ok-action-inform.vue';
    import {mapGetters, mapMutations } from 'vuex'
    import liquorTree from 'liquor-tree'
    import {PERMISSIONS} from "../../mixins/permissions";
    import DeleteRole from '../../components/modules/admin/DeleteRole.vue';


    export default {
        components: {ErrorInform, OkActionInform, liquorTree, DeleteRole},
        name: 'role-form',
        mixins: [ajaxform],
        created(){
            this.role.id = this.$route.params.id;
            let path =  '/admin/role/' + this.role.id + '/get';

            this.uploadInfo(path, {}, (data) => {
                this.initRole(data);
                this.initTree(data);
            }, {}, (data) => {

            });

        },
        data(){
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
            }
        },
        computed: {
            ...mapGetters(["hasPermission"]),
            disabled: function () {
                return !this.hasPermission(this.permissions.ADMIN_EDIT_ROLE) || this.role.is_editable == 0
            },
            isActive() {
                return !this.role.is_deleted;
            }
        },
        methods: {
            roleDeleted: function(){
                this.role.is_deleted = true;
            },
            initTree: function(data) {
                this.tree.data = data.tree;

                let self  = this;
                data.tree.forEach(function(record) {
                    record.children.forEach(function(permission) {

                        if(permission.state.checked){
                            self.selectedPermissions.push(permission.id);

                            if(permission.attributes.approved)
                                self.selectedAttributes.push(permission.id);
                        }


                    })
                });

                this.tree.loaded = true;
            },
            initRole: function(data) {
                for(let key in data)
                {
                    if(this.role[key] != "undefined") this.role[key] = data[key];
                }
            },
            changeAttributes: function(id)
            {
                if(this.isDisabled(id)) {
                   let index =  this.selectedAttributes.indexOf(id);
                   if(index !== -1) {
                       this.selectedAttributes.splice(index,1);
                   }
                }

            },
            isDisabled(id) {
                return this.selectedPermissions.indexOf(id) == -1
            },

            validate: function()
            {
                let permissions = [];

                let self = this;
                self.selectedPermissions.forEach(function(permission) {
                        permissions.push({
                            "id": permission,
                            "approved": self.selectedAttributes.indexOf(permission) != -1
                        });
                });

                let data = {
                    "name": this.role.name,
                    "description": this.role.description,
                     permissions: permissions
                };

                this.send("/admin/role/" + this.role.id + "/update", data,
                    function(data) {
                        console.log("updated role");
                    }
                );

            }
        },
        locales: {
            uz: {

            }
        }
    }
</script>

<style scoped="" lang="scss">
    .section_name {
        color: #fff;
        background-color: #3c8dbc;
        font-weight: bold;
    }

    tbody {
        border-top: none !important;
    }
</style>
