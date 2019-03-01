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
            <!-- Default box -->
            <div class="row">
                <div class="col-lg-6 col-md-12">
                    <profile-form/>
                </div>
                <div class="col-lg-6 col-md-12">
                    <change-password-form/>
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
