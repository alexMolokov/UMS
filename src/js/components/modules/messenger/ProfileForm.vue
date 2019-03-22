<template>
  <div>
                  <div class="box-header">
                      <block-form v-if="loaded" :userid="user.id" :blocked="user.blocked"></block-form>
                  </div>
                    <!-- form start -->
                    <form class="form-horizontal" @submit.prevent="validate">
                        <div class="box-body">
                            <div class="form-group" :class="{'has-error': errors.has('lastname')}">
                                <label for="lastname" class="col-sm-2 control-label">Фамилия</label>
                                <div class="col-sm-10">
                                    <input :disabled="disabled" type="text" class="form-control" id="lastname" name="lastname" placeholder="Фамилия" v-model="user.lastName"  v-validate="'min:3'">
                                    <span v-show="errors.has('lastname')" class="help-block">{{errors.first('lastname')}}</span>
                                </div>
                            </div>
                            <div class="form-group"  :class="{'has-error': errors.has('firstname')}">
                                <label for="firstname" class="col-sm-2 control-label">Имя</label>
                                <div class="col-sm-10">
                                    <input :disabled="disabled" type="text" class="form-control" id="firstname" name="firstname" placeholder="Имя" v-model="user.firstName"  v-validate="'min:3'">
                                    <span v-show="errors.has('firstname')" class="help-block">{{errors.first('firstname')}}</span>
                                </div>
                            </div>

                            <div class="form-group"  :class="{'has-error': errors.has('middlename')}">
                                <label for="middlename" class="col-sm-2 control-label">Отчество</label>
                                <div class="col-sm-10">
                                    <input :disabled="disabled" type="text" class="form-control" id="middlename" name="firstname" placeholder="Отчество" v-model="user.middleName"  v-validate="'min:3'">
                                    <span v-show="errors.has('middlename')" class="help-block">{{errors.first('middlename')}}</span>
                                </div>
                            </div>

                            <div class="form-group"  :class="{'has-error': errors.has('nickname')}">
                                <label for="nickname" class="col-sm-2 control-label">Ник</label>
                                <div class="col-sm-10">
                                    <input :disabled="disabled" type="text" class="form-control" id="nickname" name="nickname" placeholder="Ник" v-model="user.nickName"  v-validate="'min:3'">
                                    <span v-show="errors.has('nickname')" class="help-block">{{errors.first('nickname')}}</span>
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
                        <div class="box-footer overlay-wrapper"  v-if="hasPermission(permissions.MESSENGER_EDIT_USER)">
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
        name: 'profile-messenger-user-form',
        mixins: [ajaxform, hasPermission],
        computed: {
            disabled(){
                return !this.hasPermission(this.permissions.MESSENGER_EDIT_USER);
            }
        },
        created(){
            this.user.id = this.$route.params.id;
            let path =  '/user/get';

            this.uploadInfo(path, {login: this.user.id }, (data) => {
                for(let key in data)
                {
                    if(this.user[key] != "undefined" && data[key] !== null) {
                        this.user[key] = data[key];
                    }
                }
                this.loaded = true;

                if(this.user.blocked) {
                    this.user.blocked = 1;
                } else {
                    this.user.blocked = 0;
                }

                this.$emit('profile-loaded', this.user);

            }, {}, (data) => {

            });


        },
        data(){
            return {
                error: '',
                loaded: false,
                user: {
                    "id": "",
                    "login": "",
                    "email": "",
                    "firstName": "",
                    "lastName": "",
                    "middleName": "",
                    "nickName": "",
                    "blocked": "0"
                },
             }
        },
        methods: {

            validate: function()
            {


                let data = {
                    "email": this.user.email,
                    "firstname": this.user.firstName,
                    "lastname": this.user.lastName,
                    "middlename": this.user.middleName,
                    "nickname": this.user.nickName,
                    "blocked": (this.user.blocked == '1'),
                    "login": this.user.id
                };


                this.send("/user/update/profile", data,
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
