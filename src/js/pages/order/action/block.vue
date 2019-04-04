<template>
    <div class="col-sm-10 col-lg-6 col-xs-12">
        <form class="form-horizontal">
        <div class="form-group">
            <label for="login" class="col-sm-2 control-label">Логин</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="login" name="login" :value="info.login" readonly>
            </div>
        </div>
        <div class="form-group">
            <label for="lastname" class="col-sm-2 control-label">Фамилия</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="lastname" name="lastname" :value="info.lastname" readonly>
            </div>
        </div>
        <div class="form-group">
            <label for="firstname" class="col-sm-2 control-label">Имя</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="firstname" name="firstname"  :value="info.firstname"  readonly>
            </div>
        </div>
        <div class="form-group">
            <label for="position" class="col-sm-2 control-label">Должность</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="position" name="position" :value="info.position" readonly>
            </div>
        </div>

        <div class="form-group">
            <label for="firstname" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="email"  name="email" :value="info.email" readonly>
            </div>
        </div>
        </form>
    </div>
</template>

<script>


    export default {
        components: {

        },
        name: 'block-action',
        data(){
            return {

            }
        },
        props: {
            info: {
                type: Object,
                default () {
                    return {
                        "login": "",
                        "lastname": "",
                        "firstname": "",
                        "login": "",
                        "email": ""
                    }
                }
            },
        },
        computed: {

        },
        methods: {


        },
        locales: {

        }
    }
</script>
<style lang="scss">





</style>
