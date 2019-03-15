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
                                        <span  v-if="loaded" v-for="item in section">\{{item.name}}</span><span @click.prevent="deleteItem(section)" class="fa fa-trash-o" style="cursor: pointer; color: red; display: inline-block; margin-left: 10px;"></span>
                                    </div>
                                    <div style="margin-top: 10px;">
                                        <div v-if="!tree.loaded"><a href="#" @click.prevent="tree.loaded = true">Добавить</a></div>
                                        <div style="overflow: auto; width: 100%; height: 300px; border: 1px solid rgb(210, 214, 222); position: relative" v-if="tree.loaded" >
                                            <v-jstree :data="tree.data" :async="loadTree" show-checkbox multiple allow-batch whole-row  @item-click="itemClick" ref="jsTree"></v-jstree>
                                            <button style="position: absolute; right: 0; top: 0; width: 80px; " type="button" class="btn btn-block btn-success btn-flat" @click.prevent="addToPaths">Добавить</button>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <error-inform :err="err" :state="state"></error-inform>
                            <ok-action-inform :state="state">
                                <div slot="ok-message">
                                    <div  v-translate>Роли пользователя были изменены.</div>
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
            },

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
                    loaded: false,
                    selectedItems: new Map(),
                    allItems: new Map(),
                 }
             }
        },
        methods: {
            hasRoles(id){
                return (typeof this.user.roles[id] != "undefined")
            },

            addToPaths() {
                for(let key of this.tree.selectedItems.keys()) {
                    let item = this.tree.allItems.get(key);
                    if(item.nowAdded || item.added) continue;

                    let section = [{"id": item.id, "name": item.name}];
                    let el = item;
                    while(el.parentId !== null){
                        el = this.tree.allItems.get(el.parentId);
                        section.unshift({"id": el.id, "name": el.name})
                    }


                    this.user.sections.push(section);
                    item.nowAdded = true;
                }
            },

            deleteItem(section){
                let i = 0;
                let sections = this.user.sections;
                let allItems =  this.tree.allItems;
                sections.forEach(function(item){
                    if(section === item) {
                        sections.splice(i,1);

                        let last = section.length - 1;
                        let id = section[last].id;
                        let el  = allItems.get(id);
                        el.added = false;
                        el.nowAdded = false;
                        allItems.set(id, el);
                    }
                    i++;
                });
            },

            itemClick (node) {
                let model =  node.model;
                if(model.selected) {
                    this.tree.selectedItems.set(model.value.id, model.value);
                } else {
                    this.tree.selectedItems.delete(model.value.id);
                }

            },

            loadTree: function (oriNode, resolve) {
                this.tree.loaded = true;
                let id = null;

                if(typeof oriNode !== "undefined"){
                    id = oriNode.data.value ? oriNode.data.value : null;
                }

                this.uploadInfo('/admin/tree/children', {"id": id}, (data) => {
                    let result = [];

                    let self = this;
                    data.forEach(function(item){

                        item.added = false;
                        item.nowAdded = false;

                        self.tree.allItems.set(item.id, item);

                        let isLeaf = !item.hasChild;
                        result.push({
                            "text": item.name,
                            "value": item,
                            "isLeaf": isLeaf,
                            "icon": (isLeaf)? "fa fa-sticky-note-o": "fa fa-folder"
                        })
                    });


                    resolve(result);

                }, {}, (data) => { });
            },




            validate: function()
            {
                let roles = (window.$('#select2').select2('data'));
                let userRoles = [];
                roles.forEach(function(role) {
                    userRoles.push(role.text);
                })

                let data = {
                    "roles": userRoles,
                    "units": this.getUnits()
                };


                this.send("/admin/user/" + this.user.id + "/setRoles", data,
                    function(data) {

                    }
                );

            },
            getUnits() {
                let result = [];
                let sections = this.user.sections;
                sections.forEach(function(section){
                    let last = section.length - 1;
                    let id = section[last].id;
                    result.push(id);
                });
                return result;
            }
        },
        locales: {
            uz: {

            }
        }
    }
</script>
