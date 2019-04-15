<template>
    <div style="margin-top: 5px">
        <div class="overlay-wrapper pull-right" v-if="!is_deleted"><a href="#" class="btn btn-danger" @click.prevent="deleteRole">Удалить</a></div>
        <div class="clearfix"></div>
        <div style="margin-top: 5px">
            <ok-action-inform :err="err" :state="state">
                <div slot="ok-message">
                    <div  v-translate>Роль была удалена.</div>
                </div>
            </ok-action-inform>
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
        name: 'delete-role',
        mixins: [ajaxform, hasPermission],
        props: {
            "roleId": [Number],
        },
        computed: {
            ...mapGetters('roles',['getRoles']),
            disabled(){
                return !this.hasPermission(this.permissions.ADMIN_EDIT_USER);
            },

        },
        data(){
            return {
                error: '',
                is_deleted: false
             }
        },
        methods: {
            deleteRole: function() {
                let self = this;
                this.send("/admin/role/" + this.roleId + "/delete", {},
                    function(data) {
                       self.is_deleted = true;
                       self.$emit("role:deleted");
                    }
                );
            }
        },

    }
</script>
