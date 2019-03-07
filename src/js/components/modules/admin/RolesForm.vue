<template>
  <div >
                    <!-- form start -->
                    <form class="form-horizontal" @submit.prevent="validate">
                        <div class="box-body">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">Роли</label>
                                <div class="col-sm-9">
                                    <select id="select2" class="form-control select2" multiple="multiple" data-placeholder="Выберите роль" style="width: 100%;" :disabled="disabled">
                                        <option  v-if="loaded" v-for="role in getRoles" :value="role.id" :selected="hasRoles(role.id)">{{role.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">

                                <div class="col-sm-3">
                                    <div style="text-align: right"><label class="control-label">Юниты</label></div>

                                </div>


                                <div class="col-sm-9">
                                    <div  v-if="loaded" v-for="section in user.sections" style="padding-top: 7px">
                                        <span  v-if="loaded" v-for="item in section">\{{item.name}}</span>
                                    </div>
                                    <div style="margin-top: 10px;">
                                        <div v-if="!tree.loaded"><a @click.stop.prevent="loadTree"  href="#">Добавить</a></div>
                                        <div style="overflow: auto; width: 100%; height: 300px; border: 1px solid rgb(210, 214, 222); position: relative" v-if="tree.loaded" >
                                            <v-jstree :data="tree.data" show-checkbox multiple allow-batch whole-row @item-toggle="itemToggle"></v-jstree>
                                            <button style="position: absolute; right: 0; top: 0; width: 80px; " type="button" class="btn btn-block btn-success btn-flat ">Добавить</button>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <error-inform :err="err" :state="state"></error-inform>
                            <ok-action-inform :state="state">
                                <div slot="ok-message">
                                    <div  v-translate>Роли были изменены.</div>
                                </div>
                            </ok-action-inform>

                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer overlay-wrapper"  v-if="hasPermission(permissions.ADMIN_EDIT_USER)">
                            <button type="submit" class="btn btn-info pull-right">Изменить</button>
                            <div class="overlay" v-if="submitting"><i class="fa fa-refresh fa-spin"></i></div>
                        </div>
                        <!-- /.box-footer -->
                    </form>
    </div>
</template>

<script>
    import ajaxform from '../../../mixins/ajax-form.vue';
    import hasPermission from '../../../mixins/has-permission.vue';
    import ErrorInform  from '../../../mixins/error-inform.vue';
    import OkActionInform  from '../../../mixins/ok-action-inform.vue';
    import {mapGetters, mapMutations } from 'vuex'
    import VJstree from 'vue-jstree'


    export default {
        components: {ErrorInform, OkActionInform, VJstree },
        name: 'role-user-form',
        mixins: [ajaxform, hasPermission],
        computed: {
            ...mapGetters('roles',['getRoles']),
            disabled(){
                return !this.hasPermission(this.permissions.ADMIN_EDIT_USER);
            }
        },
        created(){
            this.user.id = this.$route.params.id;
            let path =  '/admin/user/' + this.user.id + '/getRoles';

            this.uploadInfo(path, {}, (data) => {
                this.loaded = true;
                this.user.roles = data;
            }, {}, (data) => { });


            this.uploadInfo('/admin/user/tree/paths', {"id": this.user.id}, (data) => {
                this.user.sections = data;
            }, {}, (data) => { });




        },
        mounted(){
            window.$("#select2").select2();
        },
        data(){
            return {
                error: '',
                loaded: false,
                user: {
                    "id": "",
                    "roles": [],
                    'sections': []
                },
                tree: {
                    data: [],
                    loaded: false
                }
             }
        },
        methods: {
            itemToggle(node, item, e){
                console.log(node);
            },
            loadTree: function() {
                this.uploadInfo('/admin/tree/children', {}, (data) => {
                    let result = [];

                    data.forEach(function(item){
                        let isLeaf = !item.hasChild;
                        result.push({
                            "text": item.name,
                            "value": item.id,
                            "isLeaf": isLeaf,
                            "icon": (isLeaf)? "fa fa-sticky-note-o": "fa fa-folder"
                        })
                    });
                    this.tree.data = result;
                    this.tree.loaded = true;

                    console.log(this.tree.data)

                }, {}, (data) => { });
            },
            hasRoles: function(id){
              return (typeof this.user.roles[id] != "undefined")
            },

            validate: function()
            {
                let roles = (window.$('#select2').select2('data'));
                let userRoles = this.user.roles = [];
                roles.forEach(function(role) {
                    userRoles.push(role.text);
                })

                let data = {
                    "roles": userRoles
                };


                this.send("/admin/user/" + this.user.id + "/setRoles", data,
                    function(data) {

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
