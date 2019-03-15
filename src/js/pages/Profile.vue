<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>Профиль</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Профиль</li>
            </ol>
        </section>

        <!-- Main content -->
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
                                <li><a href="#tab_3" data-toggle="tab">Пароль</a></li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="tab_1">
                                    <profile-form/>
                                </div>
                                <!-- /.tab-pane -->
                                <div class="tab-pane" id="tab_3">
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
        <!-- /.content -->
    </div>
</template>

<script>
    import ChangePasswordForm  from '../components/modules/profile/ChangePasswordForm.vue';
    import ProfileForm  from '../components/modules/profile/ProfileForm.vue';


    export default {
        components: {ChangePasswordForm, ProfileForm},
        name: 'profile',
        data(){
            return {
                user: this.$store.getters.getUser
            }
        },

        methods: {

        },
        locales: {
            uz: {

            }
        }
    }
</script>
