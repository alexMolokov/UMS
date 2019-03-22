<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>Профиль пользователя (Messenger)</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Профиль пользователя (Messenger)</li>
            </ol>
        </section>

        <section class="content">

            <div class="box box-header ">
                <div class="row">
                    <div class="col-xs-12">
                        <h3 class="box-title">Логин: {{user.login}}</h3>
                    </div>
                </div>
            </div>

            <div class="box box-body">
                <div class="row">
                    <div class="col-sm-10 col-lg-6 col-xs-12">
                        <div class="nav-tabs-custom">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Личные данные</a></li>
                                <li v-if="hasPermission(permissions.MESSENGER_EDIT_USER)"><a href="#tab_3" data-toggle="tab">Пароль</a></li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="tab_1">
                                    <profile-form @profile-loaded="setProfile"/>
                                </div>
                                <!-- /.tab-pane -->
                                <div class="tab-pane" id="tab_3" v-if="hasPermission(permissions.MESSENGER_EDIT_USER)">
                                    <change-password-form/>
                                </div>
                                <!-- /.tab-pane -->
                            </div>
                            <!-- /.tab-content -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- /.box -->

        </section>


    </div>
</template>

<script>
    import ChangePasswordForm  from '../../components/modules/messenger/ChangePasswordForm.vue';
    import ProfileForm  from '../../components/modules/messenger/ProfileForm.vue';
    import hasPermission from '../../mixins/has-permission.vue';


    export default {
        components: {ChangePasswordForm, ProfileForm},
        name: 'profile',
        mixins: [hasPermission],
        data(){
            return {
                user: {}
            }
        },
        methods: {
            setProfile(user) {
                this.user = user;
            }

        },
        locales: {
            uz: {

            }
        }
    }
</script>
