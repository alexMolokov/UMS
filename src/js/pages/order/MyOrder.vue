<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>Моя заявка №{{order.id}}</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Моя заявка</li>
            </ol>
        </section>

        <section class="content">
            <div class="box box-header ">
                    <div class="row">
                        <div class="col-xs-10">
                            <h3 class="box-title">Тема: {{order.subject}}</h3>
                            <div>
                                <h3 class="box-title" style="margin: 5px 0">Статус: <span>{{stateName(order.state)}}</span></h3>
                            </div>

                        </div>
                        <div class="col-xs-2">
                            <div class="pull-right">
                                    <button v-if="isAccept" type="button" class="btn btn-danger" v-translate @click="cancel">Cancel</button>
                            </div>
                        </div>
                        <div class="col-xs-10 col-lg-5" style="margin-top: 5px">
                                <error-inform :err="err" :state="state"></error-inform>
                                <ok-action-inform :state="state">
                                    <div slot="ok-message">
                                        <div  v-translate>Заявка была отменена</div>
                                    </div>
                                </ok-action-inform>
                        </div>
                    </div>

            </div>
            <div class="box box-body">
                <div class="row">
                    <div class="col-sm-12 col-lg-10">
                            <form-block-account v-if="forms.showFormBlockAccount" :info="order.info"></form-block-account>
                    </div>
                </div>
            </div>

            <!-- /.box -->

        </section>


    </div>
</template>

<script>
    const formBlockAccount  = () => System.import('./action/block.vue');

    import ErrorInform from '../../mixins/error-inform.vue';
    import OkActionInform  from '../../mixins/ok-action-inform.vue';

    import ajaxform from '../../mixins/ajax-form.vue';
    import {STATES} from "../../mixins/states";
    import { ORDER_STATES} from "../../mixins/order-states";


    export default {
        components: {
            ErrorInform,
            OkActionInform,
            formBlockAccount
        },
        name: 'order-my-id',
        mixins: [ajaxform],
        created(){
            this.order.id = this.$route.params.id;
            let path =  '/order/my/' + this.order.id;

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
                  "block": "showFormBlockAccount"
                },
                order: {
                    id: "",
                    subject: "",
                    action: "",
                    state: "",
                    info: {},

                },

                forms: {
                    showFormBlockAccount: false
                }

            }
        },
        computed: {
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

                cancel() {
                    let self = this;
                    this.send("/order/my/cancel", {id: this.order.id, "lang": this.$store.state.lang}, (data) => {
                        this.order.state = data.state;

                    }, () => {

                    });


                }

        },
        locales: {
            ru: {
                    'Cancel': "Отменить",
                    'Cancelled': "Отменен",
                    'Done': "Выполнен",
            },
            uz: {

            }
        }
    }
</script>
<style lang="scss">





</style>
