<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>Роль</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Роль</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
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
                                        <input type="text" class="form-control" id="role" name="role" v-model="role.name"  v-validate="'required|min:3'" placeholder="Название" :disabled="!hasPermission(permissions.ADMIN_EDIT_ROLE)">
                                        <span v-show="errors.has('role')" class="help-block">{{errors.first('role')}}</span>
                                    </div>
                                </div>

                                <div class="form-group" :class="{'has-error': errors.has('permissions')}">
                                    <label class="col-sm-2 control-label">Права</label>
                                    <div class="col-sm-10">
                                        <liquor-tree  v-if="tree.loaded" :data="tree.data" :options="{ checkbox: true }" ref="tree"></liquor-tree>
                                        <span v-show="errors.has('permissions')" class="help-block">{{errors.first('permissions')}}</span>
                                    </div>
                                </div>

                                <error-inform :err="err" :state="state"></error-inform>
                                <ok-action-inform :state="state">
                                    <div slot="ok-message">
                                        <div  v-translate>Роль была изменена.</div>
                                    </div>
                                </ok-action-inform>

                            </div>
                            <div class="box-footer overlay-wrapper" v-if="hasPermission(permissions.ADMIN_EDIT_ROLE)">
                                <button type="submit" class="btn btn-info pull-right">Изменить</button>
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


    export default {
        components: {ErrorInform, OkActionInform, liquorTree},
        name: 'role-form',
        mixins: [ajaxform],
        created(){
            this.role.id = this.$route.params.id;
            let path =  '/admin/role/' + this.role.id + '/get';

            this.uploadInfo(path, {}, (data) => {
                for(let key in data)
                {
                    if(this.role[key] != "undefined") this.role[key] = data[key];
                }

                let permission = this.hasPermission(this.permissions.ADMIN_EDIT_ROLE);

                data.tree.forEach(function(record) {
                    record.state = {};
                    if(!permission) record.state.disabled = true;
                });


                this.tree.data = data.tree;
                this.tree.loaded = true;

            }, {}, (data) => {

            });

        },
        data(){
            return {
                error: '',
                role: {
                    "id": "",
                    "name": "",
                    "permissions": []
                },
                tree: {
                    data: [],
                    loaded: false
                },
                permissions: PERMISSIONS
            }
        },
        computed: {
            ...mapGetters(["hasPermission"])
        },
        methods: {
            validate: function()
            {
                let permissions = [];
                let checked = this.$refs.tree.checked();

                checked.forEach(function(permission) {
                    if(permission.data.selectable) {
                        permissions.push(permission.id);
                    }
                });

                let data = {
                    "name": this.role.name.trim(),
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
