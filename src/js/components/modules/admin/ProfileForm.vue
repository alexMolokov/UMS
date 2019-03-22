<template>
  <div>
                    <div class="box-header">
                        <block-form v-if="loaded" :userid="user.id" :blocked="user.blocked"></block-form>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form class="form-horizontal" @submit.prevent="validate">
                        <div class="box-body">
                            <div class="form-group" :class="{'has-error': errors.has('lastname')}">
                                <label for="lastname" class="col-sm-2 control-label">Фамилия</label>
                                <div class="col-sm-10">
                                    <input :disabled="disabled" type="text" class="form-control" id="lastname" name="lastname" placeholder="Фамилия" v-model="user.lastname"  v-validate="'min:2'">
                                    <span v-show="errors.has('lastname')" class="help-block">{{errors.first('lastname')}}</span>
                                </div>
                            </div>
                            <div class="form-group"  :class="{'has-error': errors.has('firstname')}">
                                <label for="firstname" class="col-sm-2 control-label">Имя</label>
                                <div class="col-sm-10">
                                    <input :disabled="disabled" type="text" class="form-control" id="firstname" name="firstname" placeholder="Имя" v-model="user.firstname"  v-validate="'min:2'">
                                    <span v-show="errors.has('firstname')" class="help-block">{{errors.first('firstname')}}</span>
                                </div>
                            </div>
                            <div class="form-group" :class="{'has-error': errors.has('position')}">
                                <label for="position" class="col-sm-2 control-label">Должность</label>
                                <div class="col-sm-10">
                                    <input :disabled="disabled" type="text" class="form-control" id="position" name="position" placeholder="Должность" v-model="user.position" v-validate="'min:3'">
                                    <span v-show="errors.has('position')" class="help-block">{{errors.first('position')}}</span>
                                </div>
                            </div>

                            <div class="form-group" :class="{'has-error': errors.has('email')}">
                                <label for="firstname" class="col-sm-2 control-label">Email</label>
                                <div class="col-sm-10">
                                    <input :disabled="disabled" type="text" class="form-control" id="email" placeholder="Email" name="email" v-model="user.email" v-validate="'min:3|email'">
                                    <span v-show="errors.has('email')" class="help-block">{{errors.first('email')}}</span>
                                </div>
                            </div>

                            <error-inform :err="err" :state="state"></error-inform>
                            <ok-action-inform :state="state">
                                <div slot="ok-message">
                                    <div  v-translate>Профиль был изменен.</div>
                                </div>
                            </ok-action-inform>

                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer overlay-wrapper"  v-if="hasPermission(permissions.ADMIN_EDIT_USER)">
                            <button type="submit" class="btn btn-primary pull-right">Изменить</button>
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
    import BlockForm  from './BlockForm.vue';
    import {mapGetters, mapMutations } from 'vuex'


    export default {
        components: {ErrorInform, OkActionInform, BlockForm},
        name: 'profile-user-form',
        mixins: [ajaxform, hasPermission],
        computed: {
            ...mapGetters('roles',['getRoles']),
            disabled(){
                return !this.hasPermission(this.permissions.ADMIN_EDIT_USER);
            }
        },
        created(){
            this.user.id = this.$route.params.id;
            let path =  '/admin/user/' + this.user.id + '/get';

            this.uploadInfo(path, {}, (data) => {
                for(let key in data)
                {
                    if(this.user[key] != "undefined" && data[key] !== null) this.user[key] = data[key];
                }
                this.loaded = true;
                this.$emit('profile-loaded', this.user);

            }, {}, (data) => {

            });

            this.$store.dispatch("roles/setRoles");

        },
        data(){
            return {
                error: '',
                loaded: false,
                user: {
                    "id": "",
                    "login": "",
                    "email": "",
                    "firstname": "",
                    "lastname": "",
                    "position": "",
                    "blocked": 0
                },
             }
        },
        methods: {
            validate: function()
            {
                let data = {
                    "email": this.user.email,
                    "firstname": this.user.firstname,
                    "lastname": this.user.lastname,
                    "position": this.user.position
                };


                this.send("/admin/user/" + this.user.id + "/update", data,
                    function(data) {
                       //console.log("updated");
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
