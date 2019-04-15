<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>Заявка на одобрение №{{order.id}}</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Заявка на одобрение</li>
            </ol>
        </section>

        <section class="content">
            <div class="box box-header ">
                <div class="row">
                    <div class="col-xs-6">
                        <h3 class="box-title">Тема: {{order.subject}}</h3>
                     </div>
                    <div class="col-xs-6" >
                        <div class="pull-right" >
                            <button  v-if="isAccept" type="button" class="btn btn-danger" v-translate @click="reject" style="margin-right: 20px;">Reject</button>
                            <button  v-if="isAccept" type="button" class="btn btn-success" v-translate @click="accept">Accept</button>
                            &nbsp;
                        </div>
                    </div>
                    <div class="col-xs-10 col-md-7 col-lg-5" style="margin-top: 5px">
                        <error-inform :err="err" :state="state"></error-inform>
                        <ok-action-inform :state="state">
                            <div slot="ok-message">
                                <div  v-translate v-if="isRejected">Заявка была отклонена</div>
                                <div  v-translate v-if="isDone">Заявка была одобрена и выполнена</div>
                            </div>
                        </ok-action-inform>
                    </div>
                </div>

            </div>
            <div class="box box-body">
                <div class="row">
                    <div class="col-sm-12 col-lg-10">
                        <form-block-account v-if="forms.showFormBlockAccount" :info="order.info"></form-block-account>
                        <form-change-profile  v-if="forms.showFormChangeProfile" :info="order.info"></form-change-profile>
                        <form-create-user v-if="forms.showFormCreateUser" :info="order.info"></form-create-user>
                        <form-copy-user v-if="forms.showFormCopyUser" :info="order.info"></form-copy-user>
                        <form-move-user v-if="forms.showFormMoveUser" :info="order.info"></form-move-user>
                        <form-create-users v-if="forms.showFormCreateUsers" :info="order.info"></form-create-users>
                    </div>
                </div>
            </div>

            <!-- /.box -->

        </section>


    </div>
</template>

<script>
    const formBlockAccount  = () => System.import('./action/block.vue');
    const formChangeProfile  = () => System.import('./action/changeProfile.vue');
    const formCreateUser  = () => System.import('./action/createUser.vue');
    const formCreateUsers  = () => System.import('./action/createUsers.vue');
    const formMoveUser  = () => System.import('./action/moveUser.vue');
    const formCopyUser  = () => System.import('./action/copyUser.vue');


    import ErrorInform from '../../mixins/error-inform.vue';
    import OkActionInform  from '../../mixins/ok-action-inform.vue';

    import ajaxform from '../../mixins/ajax-form.vue';
    import {STATES} from "../../mixins/states";
    import { ORDER_STATES} from "../../mixins/order-states";


    export default {
        components: {
            ErrorInform,
            OkActionInform,
            formBlockAccount,
            formChangeProfile,
            formCreateUser,
            formMoveUser,
            formCopyUser,
            formCreateUsers
        },
        name: 'order-assigned-id',
        mixins: [ajaxform],
        created(){
            this.order.id = this.$route.params.id;
            let path =  '/order/assigned/' + this.order.id;

            this.uploadInfo(path, {}, (data) => {

                this.order.subject = data.subject;
                this.order.info = data.info;
                this.order.state = data.state;



                if(typeof this.actionMap[data.action] != "undefined")
                {
                    let formName = this.actionMap[data.action];
                    this.forms[formName] = true;
                }

            }, {}, (data) => {

            });

        },
        data(){
            return {
                actionMap: {
                    "messenger.user.block": "showFormBlockAccount",
                    "messenger.change.profile": "showFormChangeProfile",
                    "messenger.user.change.password": "showFormBlockAccount",
                    "messenger.user.create": "showFormCreateUser",
                    "messenger.user.move": "showFormMoveUser",
                    "messenger.user.copy": "showFormCopyUser",
                    "messenger.users.create": "showFormCreateUsers",
                },
                order: {
                    id: "",
                    subject: "",
                    action: "",
                    state: "",
                    info: {},

                },

                forms: {
                    showFormBlockAccount: false,
                    showFormChangeProfile: false,
                    showFormCreateUser: false,
                    showFormMoveUser: false,
                    showFormCopyUser: false,
                    showFormCreateUsers: false
                }

            }
        },
        computed: {
            isRejected() {
                return ORDER_STATES.isRejected(this.order.state)
            },
            isDone() {
                return ORDER_STATES.isDone(this.order.state)
            },

            isAccept() {
                return ORDER_STATES.isAccept(this.order.state)
            },

            stateName() {
                let vm = this;
                return (state) => {
                    return ORDER_STATES.getName(state, vm.$store.state.lang);
                }
            },

        },
        methods: {

            reject() {
                let self = this;
                this.send("/order/reject", {id: this.order.id, "lang": this.$store.state.lang}, (data) => {
                    this.order.state = data.state;

                }, () => {

                });


            },

            accept() {
                let self = this;
                this.send("/order/done", {id: this.order.id, "lang": this.$store.state.lang}, (data) => {
                    this.order.state = data.state;

                }, () => {

                });
            }

        },
        locales: {
            ru: {
                'Reject': "Отклонить",
                'Accept': "Одобрить",
                'Done': "Выполнен",
            },
            uz: {

            }
        }
    }
</script>
<style lang="scss">





</style>
