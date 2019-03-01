<template>
<div class="login-box">
    <div class="login-logo">
        <router-link to="/"><b>Admin</b>UMS</router-link>
    </div>
    <div class="login-box-body">
        <form @submit.prevent="validate">
            <div class="form-group" :class="{'has-error': errors.has('login')}" style="position: relative">
                <input type="text" class="form-control" placeholder="Имя пользователя" v-model="credentials.login" v-validate="'required|min:5'" name="login">
                <span class="glyphicon glyphicon-user form-control-feedback"></span>
                <span v-show="errors.has('login')" class="help-block">{{errors.first('login')}}</span>
            </div>
            <div class="form-group" :class="{'has-error': errors.has('password')}" style="position: relative">
                <input type="password" class="form-control" placeholder="Пароль" v-model="credentials.password" v-validate="'required|min:6'" name="password">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                <span v-show="errors.has('password')" class="help-block">{{errors.first('password')}}</span>
            </div>
            <error-inform :err="err" :state="state"></error-inform>
            <div class="row">
                <div class="col-xs-8">&nbsp;</div>
                <div class="col-xs-4 overlay-wrapper">
                    <button type="submit" class="btn btn-primary btn-block btn-flat">Войти</button>
                    <div class="overlay" v-if="submitting"><i class="fa fa-refresh fa-spin"></i></div>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
    import ajaxform from '../mixins/ajax-form.vue';
    import {STATES} from "../mixins/states";
    import {User} from '../classes/User';
    import ErrorInform  from '../mixins/error-inform.vue';
    import { mapMutations, mapGetters } from 'vuex'


    export default {
        components: {ErrorInform},
        name: 'login',
        data(){
            return {
                url: "/auth/login",
                credentials: {
                    login: '',
                    password: ''
                },
                error: ''
            }
        },
        computed: {
            ...mapGetters(["isRegisterAllowed"]),
            submitting: function() {
                return this.state == STATES.LOADING;
            }
        },
        mixins: [ajaxform],
        methods: {
            ...mapMutations({authLogin: 'login'}),
            togglePassword: function()
            {
                this.type_password = (this.type_password == 'password')? 'text' : 'password';
            },
            validate: function()
            {
                let data = {
                    "login": this.credentials.login,
                    "password": this.credentials.password
                };

                let authLogin = this.authLogin;
                this.send(this.url, data,
                    function(data) {
                        authLogin(new User(data));
                    },
                    (data) => {
                        this.submitting = false;
                    });


            }
        },
        locales: {
            uz: {

            }
        }
    }
</script>
