<template>
 <div class="box box-info" v-if="hasPermission(this.permissions.ADMIN_EDIT_USER)">
                        <div class="box-header with-border">
                            <h3 class="box-title">Изменить пароль</h3>
                        </div>
                        <!-- /.box-header -->
                        <!-- form start -->
                        <form class="form-horizontal" @submit.prevent="validate">
                            <div class="box-body">
                                <div class="form-group" :class="{'has-error': errors.has('newPassword')}">
                                    <label for="newPassword" class="col-sm-2 control-label">Новый пароль</label>
                                    <div class="col-sm-10">
                                        <div class="input-group">
                                        <input :type="typeInput.new" class="form-control" id="newPassword" name="newPassword" placeholder="Новый пароль" v-model="password.newPassword" v-validate="{ rules: {required:true, min:6}}">                 <div class="input-group-addon">
                                            <a class="fa fa-eye" :class="(typeInput.new == 'password')? 'fa-eye': 'fa-eye-slash'" @click.prevent.stop="togglePassword('new')"></a>
                                        </div>
                                        </div>
                                        <span v-show="errors.has('newPassword')" class="help-block">{{errors.first('newPassword')}}</span>
                                    </div>
                                </div>
                                <div class="form-group" :class="{'has-error': errors.has('repeatPassword')}">
                                    <label for="repeatPassword" class="col-sm-2 control-label">Повторить новый пароль</label>
                                    <div class="col-sm-10">
                                        <div class="input-group">
                                            <input :type="typeInput.repeat" class="form-control" name="repeatPassword" id="repeatPassword" placeholder="Повторить пароль" v-model="password.repeatPassword" v-validate="{ rules: {required:true, is: password.newPassword }}">
                                            <div class="input-group-addon">
                                                <a class="fa fa-eye" :class="(typeInput.repeat == 'password')? 'fa-eye': 'fa-eye-slash'" @click.prevent.stop="togglePassword('repeat')"></a>
                                            </div>
                                        </div>
                                        <span v-show="errors.has('repeatPassword')" class="help-block">{{errors.first('repeatPassword')}}</span>
                                    </div>
                                </div>
                                <error-inform :err="err" :state="state"></error-inform>
                                <ok-action-inform :state="state">
                                    <div slot="ok-message">
                                        <div  v-translate>Пароль пользователя был изменен.</div>
                                    </div>
                                </ok-action-inform>
                            </div>
                            <!-- /.box-body -->
                            <div class="box-footer  overlay-wrapper">
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

    export default {
        components: {ErrorInform, OkActionInform},
        name: 'login',

        mixins: [ajaxform, hasPermission],
        data(){
            return {
                error: '',
                password: {
                    newPassword: "",
                    repeatPassword: ""
                },

                typeInput: {
                    new: "password",
                    repeat: "password"
                }

            }
        },

        methods: {
            togglePassword: function(type){
                this.typeInput[type] = (this.typeInput[type] == 'password')? 'text' : 'password';
            },

            validate: function() {
                let data = {
                    "newPassword": this.password.newPassword,
                    "repeatPassword": this.password.newPassword
                };

                let id = this.$route.params.id;

                this.send("/admin/user/" + id + "/password/change", data,
                    function(data) {
                            //console.log("password changed");
                    });
            }


        },
        locales: {
            uz: {

            }
        }
    }
</script>
