<template>
    <modal-window :id="id"  @close="close" class="in"  style="display: block" :show="true">
        <div slot="title" v-translate>Новый пользователь Messenger</div>
        <form :url="url" @submit.prevent.stop class="form-horizontal">
            <div style="position: relative">
                <loading-inform :state="state" @close="close">
                    <div class="window-center" slot="ok-message">
                        <div class="complete-body" v-translate>Пользователь был успешно создан.</div>
                        <div class="button-close-ok"><button type="button" class="btn  btn-primary" v-translate @click="close">Ok</button></div>
                    </div>
                    <div slot="buttons"></div>
                </loading-inform>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="box-body">
                                <div class="form-group"  :class="{'has-error': errors.has('login')}">
                                    <label for="login" class="col-sm-2 control-label">Логин</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="login" name="login" v-model="user.login"  v-validate="'required|min:5'" placeholder="Логин">
                                        <span v-show="errors.has('login')" class="help-block">{{errors.first('login')}}</span>
                                    </div>
                                </div>
                                <div class="form-group" :class="{'has-error': errors.has('lastName')}">
                                    <label for="lastName" class="col-sm-2 control-label">Фамилия</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="lastName" name="lastName" placeholder="Фамилия" v-model="user.lastName"  v-validate="'min:3'">
                                        <span v-show="errors.has('lastName')" class="help-block">{{errors.first('lastName')}}</span>
                                    </div>
                                </div>
                                <div class="form-group"  :class="{'has-error': errors.has('firstName')}">
                                    <label for="firstName" class="col-sm-2 control-label">Имя</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="firstName" name="firstName" placeholder="Имя" v-model="user.firstName"  v-validate="'min:3'">
                                        <span v-show="errors.has('firstName')" class="help-block">{{errors.first('firstName')}}</span>
                                    </div>
                                </div>
                                    <div class="form-group"  :class="{'has-error': errors.has('middleName')}">
                                        <label for="middleName" class="col-sm-2 control-label">Отчество</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="middleName" name="middleName" placeholder="Отчество" v-model="user.middleName"  v-validate="'min:3'">
                                            <span v-show="errors.has('middleName')" class="help-block">{{errors.first('firstName')}}</span>
                                        </div>
                                    </div>
                                    <div class="form-group"  :class="{'has-error': errors.has('nickName')}">
                                        <label for="nickName" class="col-sm-2 control-label">Ник</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="nickName" name="nickName" placeholder="Ник" v-model="user.nickName"  v-validate="'min:3'">
                                            <span v-show="errors.has('nickName')" class="help-block">{{errors.first('nickName')}}</span>
                                        </div>
                                    </div>    
                                    

                                <div class="form-group" :class="{'has-error': errors.has('email')}">
                                    <label for="email" class="col-sm-2 control-label">Email</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="email" placeholder="Email" name="email" v-model="user.email" v-validate="'min:3|email'">
                                        <span v-show="errors.has('email')" class="help-block">{{errors.first('email')}}</span>
                                    </div>
                                </div>
                                <div class="form-group" :class="{'has-error': errors.has('password')}">
                                        <label for="password" class="col-sm-2 control-label">Пароль</label>
                                        <div class="col-sm-10">
                                            <div class="input-group">
                                                <input :type="typeInput.new" placeholder="Пароль" class="form-control" id="password" name="password"  v-model="user.password" v-validate="{ rules: {required:true, min:6}}">                 <div class="input-group-addon">
                                                <a class="fa fa-eye" :class="(typeInput.new == 'password')? 'fa-eye': 'fa-eye-slash'" @click.prevent.stop="togglePassword('new')"></a>
                                            </div>
                                            </div>
                                            <span v-show="errors.has('password')" class="help-block">{{errors.first('password')}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <error-inform :err="err" :state="state"></error-inform>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" v-translate @click="validate">Создать</button>
                </div>
            </div>
        </form>
    </modal-window>
</template>


<script>

    import modalWindow from '../modalWindow.vue';
    import ajaxform from '../../../mixins/ajax-form.vue';
    import errorInform from '../../../mixins/error-inform.vue';
    import loadingInform from '../../../mixins/loading-inform.vue';
    import {mapState} from 'vuex';
    import {mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'form-create-messenger-login',
        components: {
            "modal-window": modalWindow,
            "error-inform": errorInform,
            "loading-inform": loadingInform,
        },
        data() {
                return {
                    id: "create-login",
                    url: "/user/create",
                    redirect: false,
                    error: '',
                    user: {
                        "login": "",
                        "email": "",
                        "firstName": "",
                        "lastName": "",
                        "middleName": "",
                        "nickName": "",
                        "password": "",
                        "blocked": false
                    },
                    typeInput: {
                        new: "password",
                    }
                }
            },
            mixins: [ajaxform],
            locales: {
                uz: {}
            },
            methods: {
                togglePassword: function(type){
                    this.typeInput[type] = (this.typeInput[type] == 'password')? 'text' : 'password';
                },
                validate: function () {
                    let user = this.user;
                    let data = {
                        login: user.login,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        middleName: user.middleName,
                        nickName: user.nickName,
                        password: user.password,
                        blocked: user.blocked
                    };
                    this.error = '';


                    this.send(this.url, data, (response) => {
                        this.$emit("form:create-login", response);
                    }, () => {

                    });
                }
            }

    }
</script>

