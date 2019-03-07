<template>
  <div>
                    <div class="box-header">
                        <block-form v-if="loaded" :userid="user.id" :blocked="user.blocked"></block-form>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form class="form-horizontal" @submit.prevent="validate">
                        <div class="box-body">
                              <div class="form-group" :class="{'has-error': errors.has('date_from')}">
                                <label for="date_from" class="col-sm-2 control-label">Дата c</label>
                                  <div class="col-sm-10">
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                            <input type="text" :disabled="disabled" v-model="user.date_from" id="date_from" name="date_from" class="form-control">
                                        </div>
                                        <span v-show="errors.has('date_from')" class="help-block">{{errors.first('date_from')}}</span>
                                  </div>
                                <!-- /.input group -->
                            </div>

                            <div class="form-group" :class="{'has-error': errors.has('date_to')}">
                                <label for="date_to" class="col-sm-2 control-label">Дата по</label>
                                <div class="col-sm-10">
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar"></i>
                                        </div>
                                        <input type="text" :disabled="disabled" v-model="user.date_to" id="date_to" name="date_to" class="form-control">
                                    </div>
                                    <span v-show="errors.has('date_to')" class="help-block">{{errors.first('date_to')}}</span>
                                </div>
                                <!-- /.input group -->
                            </div>



                            <error-inform :err="err" :state="state"></error-inform>
                            <ok-action-inform :state="state">
                                <div slot="ok-message">
                                    <div  v-translate>Срок действия был изменен.</div>
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
    import BlockForm  from './BlockForm.vue';
    import Inputmask from "inputmask";
    import {mapGetters, mapMutations } from 'vuex'


    export default {
        components: {ErrorInform, OkActionInform, BlockForm},
        name: 'date-from-form',
        mixins: [ajaxform, hasPermission],
        props: {
            userdata: [Object],
        },
        computed: {
            disabled(){
                return !this.hasPermission(this.permissions.ADMIN_EDIT_USER);
            }
        },
        created(){
            this.user.id = this.$route.params.id;
        },
        mounted() {
            let selector = document.getElementById("date_from");
            let im = new Inputmask({ alias: "datetime", inputFormat: "yyyy-mm-dd"})
            im.mask(selector);

            selector = document.getElementById("date_to");
            im = new Inputmask({ alias: "datetime", inputFormat: "yyyy-mm-dd"})
            im.mask(selector);
        },
        data(){
            return {
                error: '',
                loaded: false,
                user: {
                    "date_from": this.$props.userdata.date_from,
                    "date_to": this.$props.userdata.date_to
                },
             }
        },
        methods: {
            validate: function()
            {
                let data = {
                    "date_from": this.user.date_from,
                    "date_to": this.user.date_to
                };

                this.send("/admin/user/" + this.user.id + "/setDates", data,
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
