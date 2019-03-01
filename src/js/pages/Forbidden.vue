<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>403 Ошибка</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">403 ошибка</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">

            <div class="error-page">
                <h2 class="headline text-red">403</h2>

                <div class="error-content">
                    <h3><i class="fa fa-warning text-red"></i> Доступ запрещен.</h3>

                    <p>
                        Данная страница запрещена для просмотра. Для ее просмотра обратитесь к администратору системы.
                    </p>

                </div>
            </div>
            <!-- /.error-page -->

        </section>
        <!-- /.content -->
    </div>
</template>

<script>


    export default {
        name: 'forbidden',
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
