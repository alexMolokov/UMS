<template>
    <modal-window :id="id"  @close="close" class="in"  style="display: block" :show="true">
        <div slot="title" v-translate>Новая роль</div>
        <form :url="url" @submit.prevent.stop class="form-horizontal">
            <div style="position: relative">
                <loading-inform :state="state" @close="close">
                    <div class="window-center" slot="ok-message">
                        <div class="complete-body" v-translate>Роль была успешно создана.</div>
                        <div class="button-close-ok"><button type="button" class="btn  btn-primary" v-translate @click="close">Ok</button></div>
                    </div>
                    <div slot="buttons"></div>
                </loading-inform>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="box-body">
                                    <div class="form-group"  :class="{'has-error': errors.has('name')}">
                                        <label for="role" class="col-sm-2 control-label">Роль</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="role" name="name" v-model="role.name"  v-validate="{ required: true, min:3, regex: /^[a-zA-Z]{1,}$/}" placeholder="Название (Только Латинские буквы)">
                                            <span v-show="errors.has('name')" class="help-block">{{errors.first('name')}}</span>
                                        </div>
                                    </div>

                                    <div class="form-group"  :class="{'has-error': errors.has('description')}">
                                         <label for="role" class="col-sm-2 control-label">Описание</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="description" name="description" v-model="role.description"  v-validate="'max:100'" placeholder="Описание">
                                            <span v-show="errors.has('description')" class="help-block">{{errors.first('description')}}</span>
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
    import liquorTree from 'liquor-tree'
    import {mapState} from 'vuex';
    import {mapMutations} from 'vuex';

    export default {
        name: 'form-create-login',
        components: {
            modalWindow,
            errorInform,
            loadingInform,
        },
        data() {
                return {
                    id: "create-login",
                    url: "/admin/role/create",
                    redirect: false,
                    error: '',
                    role: {
                        "name": "",
                        "description": ""
                    }

                }
            },
            mixins: [ajaxform],
            locales: {
                uz: {}
            },
            methods: {

                validate: function () {
                    this.error = '';
                    this.send(this.url, this.role, (response) => {
                        this.$emit("form:create-role", response);
                    }, () => {

                    });
                }
            }

    }
</script>


