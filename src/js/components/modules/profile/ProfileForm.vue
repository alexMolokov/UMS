<template>
  <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">Данные пользователя</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form class="form-horizontal" @submit.prevent="validate">
                        <div class="box-body">
                            <div class="form-group">
                                <label for="login" class="col-sm-2 control-label">Логин</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="login"  :value="user.login" readonly>
                                </div>
                            </div>
                            <div class="form-group" :class="{'has-error': errors.has('lastname')}">
                                <label for="lastname" class="col-sm-2 control-label">Фамилия</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="lastname" name="lastname" placeholder="Фамилия" v-model="user.lastname"  v-validate="'min:3'">
                                    <span v-show="errors.has('lastname')" class="help-block">{{errors.first('lastname')}}</span>
                                </div>
                            </div>
                            <div class="form-group"  :class="{'has-error': errors.has('firstname')}">
                                <label for="firstname" class="col-sm-2 control-label">Имя</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="firstname" name="firstname" placeholder="Имя" v-model="user.firstname"  v-validate="'min:3'">
                                    <span v-show="errors.has('firstname')" class="help-block">{{errors.first('firstname')}}</span>
                                </div>
                            </div>
                            <div class="form-group" :class="{'has-error': errors.has('position')}">
                                <label for="position" class="col-sm-2 control-label">Должность</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="position" name="position" placeholder="Должность" v-model="user.position" v-validate="'min:3'">
                                    <span v-show="errors.has('position')" class="help-block">{{errors.first('position')}}</span>
                                </div>
                            </div>

                            <div class="form-group" :class="{'has-error': errors.has('email')}">
                                <label for="firstname" class="col-sm-2 control-label">Email</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="email" placeholder="Email" name="email" v-model="user.email" v-validate="'min:3'">
                                    <span v-show="errors.has('email')" class="help-block">{{errors.first('email')}}</span>
                                </div>
                            </div>

                            <error-inform :err="err" :state="state"></error-inform>
                            <ok-action-inform :state="state">
                                <div slot="ok-message">
                                    <div  v-translate>Ваш профиль был изменен.</div>
                                </div>
                            </ok-action-inform>

                        </div>
                        <!-- /.box-body -->
                        <div class="box-footer overlay-wrapper">
                            <button type="submit" class="btn btn-info pull-right">Изменить</button>
                            <div class="overlay" v-if="submitting"><i class="fa fa-refresh fa-spin"></i></div>
                        </div>
                        <!-- /.box-footer -->
                    </form>
                </div>
</template>

<script>
    import ajaxform from '../../../mixins/ajax-form.vue';
    import ErrorInform  from '../../../mixins/error-inform.vue';
    import OkActionInform  from '../../../mixins/ok-action-inform.vue';
    import {mapGetters, mapMutations } from 'vuex'


    export default {
        components: {ErrorInform, OkActionInform},
        name: 'profile-form',

        mixins: [ajaxform],
        data(){
            let data = this.$store.getters.getUser;
            return {
                error: '',
                user: {
                    "login": data.login,
                    "email": data.email,
                    "firstname": data.firstname,
                    "lastname": data.lastname,
                    "position": data.position
                },
             }
        },
        methods: {
            ...mapMutations(["updateProfile"]),
            validate: function()
            {

                let data = {
                    "email": this.user.email.trim(),
                    "firstname": this.user.firstname.trim(),
                    "lastname": this.user.lastname.trim(),
                    "position": this.user.position.trim()
                };

                let store =  this.$store;

                this.send("/profile/update", data,
                    function() {
                        store.commit("updateProfile", data);
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
