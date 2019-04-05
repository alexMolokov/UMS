<template>
    <div class="col-sm-10 col-lg-6 col-xs-12">
        <form class="form-horizontal">
        <div class="form-group">
            <label for="login" class="col-sm-3 control-label">Логин</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="login" name="login" :value="info.login" readonly>
            </div>
        </div>
        <div class="form-group">
            <label for="lastname" class="col-sm-3 control-label">Фамилия</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="lastname" name="lastname" :value="info.lastName" readonly>
            </div>
        </div>
        <div class="form-group">
            <label for="firstname" class="col-sm-3 control-label">Имя</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="firstname" name="firstname"  :value="info.firstName"  readonly>
            </div>
        </div>
        <div class="form-group">
                <label for="middlename" class="col-sm-3 control-label">Отчество</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="middlename" name="middlename"  :value="info.middleName"  readonly>
                </div>
        </div>
            <div class="form-group">
                <label for="nickname" class="col-sm-3 control-label">Ник</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="nickname" name="nickname"  :value="info.nickName"  readonly>
                </div>
            </div>

        <div class="form-group">
            <label for="firstname" class="col-sm-3 control-label">Email</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="email"  name="email" :value="info.email" readonly>
            </div>
        </div>
            <div class="form-group">
                <label  class="col-sm-3 control-label">Подразделение</label>
                <div class="col-sm-9 control-info">
                    <div>
                        <span  v-for="item in info.ou_path">\{{item}}</span>
                    </div>


                </div>
            </div>


        </form>
    </div>
</template>

<script>


    export default {
        components: {

        },
        name: 'create-user-action',
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
                        "middlename": "",
                        "nickname": "",
                        "ou_path": [],
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
<style lang="scss" scoped="">

    .control-info {
        padding-top: 7px;
    }



</style>
