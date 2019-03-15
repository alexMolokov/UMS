<template>
    <modal-window :id="id"  @close="close" class="in"  style="display: block" :show="true">
        <div slot="title" v-translate>Редактирование пользователя</div>
        <form @submit.prevent.stop class="form-horizontal">
            <div style="position: relative">
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="box-body">
                                <div class="form-group" :class="{'has-error': errors.has('lastName')}">
                                    <label for="lastName" class="col-sm-2 control-label">Фамилия</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="lastName" name="lastName" placeholder="Фамилия" v-model="user.lastName"  v-validate="'required|min:3'">
                                        <span v-show="errors.has('lastName')" class="help-block">{{errors.first('lastName')}}</span>
                                    </div>
                                </div>
                                <div class="form-group"  :class="{'has-error': errors.has('firstName')}">
                                    <label for="firstName" class="col-sm-2 control-label">Имя</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="firstName" name="firstName" placeholder="Имя" v-model="user.firstName"  v-validate="'required|min:3'">
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
                                <div class="form-group" :class="{'has-error': errors.has('email')}">
                                    <label for="email" class="col-sm-2 control-label">Email</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="email" placeholder="Email" name="email" v-model="user.email" v-validate="'required|min:3|email'">
                                        <span v-show="errors.has('email')" class="help-block">{{errors.first('email')}}</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" v-translate @click="validate">Изменить</button>
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
        name: 'form-edit-user-load-file',
        props: {
            data: {
                type: [Object, Function],
                default () {
                    return {
                        "email": "",
                        "firstName": "",
                        "lastName": "",
                        "middleName": "",
                    }
                }
            },
        },
        components: {
            "modal-window": modalWindow
        },
        data() {
                return {
                    id: "edit-user-load-file",
                    error: '',
                    user: this.$props.data
                }
            },
            locales: {
                uz: {}
            },
            methods: {
                close: function()
                {
                    this.$emit('close');
                },
                validate: function () {
                    this.$validator.errors.clear();

                    this.$validator.validateAll().then((result) => {

                        console.log(result);
                        if(result){
                            this.$emit('form:edited-user', this.user);
                            this.$emit('close');
                            return;
                        }



                    }).catch(() => {

                    });



                }
            }

    }
</script>

