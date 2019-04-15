<template>
  <div  v-if="hasPermission(permissions.ADMIN_EDIT_USER)">
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
</template>

<script>
    import ajaxform from '../../../mixins/ajax-form.vue';
    import hasPermission from '../../../mixins/has-permission.vue';
    import ErrorInform  from '../../../mixins/error-inform.vue';
    import OkActionInform  from '../../../mixins/ok-action-inform.vue';
    import {mapGetters, mapMutations } from 'vuex'


    export default {
        components: {ErrorInform, OkActionInform},
        name: 'block-user-form',
        mixins: [ajaxform, hasPermission],
        props: {
            "userid": [Number],
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

                },
             }
        },
        methods: {


            validate: function()
            {
                let blocked =  (this.user.blocked == 0)? 1 : 0

                let data = {
                    "blocked": blocked
                };

                let self = this;
                this.send("/admin/user/" + this.$props.userid + "/block", data,
                    function(data) {
                        self.user.blocked = (self.user.blocked == 0)?  1: 0
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
