<template>
    <modal-window :id="id"  @close="close" class="in"  style="display: block" :show="true">
        <div slot="title" v-translate>Новый пользователь</div>
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
                                        <input type="text" class="form-control" id="email" placeholder="Email" name="email" v-model="user.email" v-validate="'min:3|email'">
                                        <span v-show="errors.has('email')" class="help-block">{{errors.first('email')}}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                        <label class="col-sm-2 control-label">Роли</label>
                                        <div class="col-sm-10">
                                            <select id="select2-create" class="form-control select2" multiple="multiple" data-placeholder="Выберите роль" style="width: 100%;">
                                                <option  v-for="role in getRoles" :value="role.id">{{role.name}}</option>
                                            </select>
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

    import modalWindow from './modalWindow.vue';
    import ajaxform from '../../mixins/ajax-form.vue';
    import errorInform from '../../mixins/error-inform.vue';
    import loadingInform from '../../mixins/loading-inform.vue';
    import {mapState} from 'vuex';
    import {mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'form-create-login',
        components: {
            "modal-window": modalWindow,
            "error-inform": errorInform,
            "loading-inform": loadingInform,
        },
        data() {
                return {
                    id: "create-login",
                    url: "/admin/user/create",
                    redirect: false,
                    error: '',
                    user: {
                        "login": "",
                        "email": "",
                        "firstname": "",
                        "lastname": "",
                        "position": "",
                        "password": "",
                        "roles": {}
                    },
                    typeInput: {
                        new: "password",
                    }
                }
            },
            mixins: [ajaxform],
            computed: {
                ...mapGetters('roles',['getRoles']),
            },
            created(){
                this.$store.dispatch("roles/setRoles");
            },
            mounted() {
                window.$("#select2-create").select2();
            },
            locales: {
                uz: {}
            },
            methods: {
                togglePassword: function(type){
                    this.typeInput[type] = (this.typeInput[type] == 'password')? 'text' : 'password';
                },
                validate: function () {
                    let roles = (window.$('#select2-create').select2('data'));
                    let userRoles = this.user.roles = [];
                    roles.forEach(function(role) {
                        userRoles.push(role.text);
                    })


                    let user = this.user;
                    let data = {
                        login: user.login,
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        position: user.position,
                        password: user.password,
                        roles: userRoles
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

