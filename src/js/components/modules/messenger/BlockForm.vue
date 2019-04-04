<template>
  <div  v-if="hasPermission(permissions.MESSENGER_BLOCK_USER)">

      <div v-if="!hasOrderId">
          <form @submit.prevent="validate">
                <div class="overlay-wrapper pull-right" style="position: relative">
                      <button type="submit" class="btn btn-primary pull-right" v-if="!isBlocked">Активный</button>
                      <button type="submit" class="btn  btn-danger pull-right" v-if="isBlocked">Блокирован</button>
                      <div class="overlay" v-if="submitting"><i class="fa fa-refresh fa-spin"></i></div>
                 </div>
                <div class="clearfix"></div>
          </form>

          <div style="margin-top: 10px">
            <error-inform :err="err" :state="state"></error-inform>
          </div>
      </div>

      <div style="margin-top: 10px" v-if="hasOrderId">
          <ok-action-inform :state="state">
              <div slot="ok-message">
                  <div>Ваша заявка на <span v-if="!isBlocked">блокирование</span><span v-if="isBlocked">разблокирование</span> пользователя принята.</div>
                  <h4>Номер заявки {{order.id}}</h4>
              </div>
          </ok-action-inform>
      </div>


   </div>
</template>

<script>
    import ajaxform from '../../../mixins/ajax-form.vue';
    import acceptAction from '../../../mixins/accept-action.vue';
    import hasPermission from '../../../mixins/has-permission.vue';
    import ErrorInform  from '../../../mixins/error-inform.vue';
    import OkActionInform  from '../../../mixins/ok-action-inform.vue';
    import {mapGetters, mapMutations } from 'vuex';
    import {STATES} from "../../../mixins/states";
    import {ACCEPT_ACTION_HANDLER} from "../../../mixins/accept-action-handler";


    export default {
        components: {ErrorInform, OkActionInform},
        name: 'block-user-form',
        mixins: [ajaxform, hasPermission, acceptAction],
        props: {
            "userid": [String],
            "blocked": [Number]
        },
        computed: {
            ...mapGetters('roles',['getRoles']),
            disabled(){
                return !this.hasPermission(this.permissions.ADMIN_EDIT_USER);
            },
            isBlocked() {
                return this.user.blocked == 1
            }
        },
        data(){
            return {
                error: '',
                loaded: false,
                user: {
                    "blocked": this.$props.blocked
                }
             }
        },
        methods: {


            validate: function()
            {
                let blocked =  (this.user.blocked == 0)? 1 : 0

                let data = {
                    "blocked": blocked,
                    "login": this.$props.userid
                };

                let self = this;
                this.send("/user/block", data,
                    function(data) {
                        ACCEPT_ACTION_HANDLER.handle(
                            self,
                            () => {self.user.blocked = (self.user.blocked == 0)?  1: 0},
                            data
                        );
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
