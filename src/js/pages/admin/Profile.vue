<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>Профиль пользователя</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Профиль пользователя</li>
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
                                    <li class=""><a href="#tab_2" data-toggle="tab" aria-expanded="false" @click="RolesFormShow = true">Роли</a></li>
                                    <li><a href="#tab_3" data-toggle="tab">Пароль</a></li>
                                    <li><a href="#tab_4" data-toggle="tab">Срок действия</a></li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tab_1">
                                        <profile-form @profile-loaded="setProfile"/>
                                    </div>
                                    <!-- /.tab-pane -->
                                    <div class="tab-pane" id="tab_2">
                                        <roles-form v-if="RolesFormShow"></roles-form>
                                    </div>
                                    <!-- /.tab-pane -->
                                    <div class="tab-pane" id="tab_3">
                                        <change-password-form/>
                                    </div>

                                    <div class="tab-pane" id="tab_4">
                                        <date-from-form v-if="DatesFormShow" :userdata="user"/>
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
    import ChangePasswordForm  from '../../components/modules/admin/ChangePasswordForm.vue';
    import ProfileForm  from '../../components/modules/admin/ProfileForm.vue';
    import RolesForm  from '../../components/modules/admin/RolesForm.vue';
    import dateFromForm  from '../../components/modules/admin/dateFromForm.vue';

    export default {
        components: {ChangePasswordForm, ProfileForm, RolesForm, dateFromForm},
        name: 'profile',
        data(){
            return {
                RolesFormShow: false,
                DatesFormShow: false,
                user: {},

            }
        },
        methods: {
            setProfile: function(user) {
                this.user = user;
                this.DatesFormShow = true;
            }
        },
        locales: {
            uz: {

            }
        }
    }
</script>
