<template>
    <div class="col-sm-10 col-lg-6 col-xs-12">
        <form class="form-horizontal">
        <div class="form-group">
            <label class="col-sm-2 control-label">Логин</label>
            <div class="col-sm-10 control-info" >
                <div>{{info.old.login}}</div>
            </div>
        </div>
        <div class="form-group">
            <label  class="col-sm-2 control-label">Фамилия</label>
            <div class="col-sm-10 control-info">
                <div><span :class="{danger: isDifferent('lastName')}">{{info.old.lastName}}</span> <span v-if="isDifferent('lastName')"> \ {{info.new.lastName}} </span></div>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">Имя</label>
            <div class="col-sm-10 control-info">
                <div><span :class="{danger: isDifferent('firstName')}">{{info.old.firstName}}</span> <span v-if="isDifferent('firstName')"> \ {{info.new.firstName}} </span></div>
            </div>
        </div>

        <div class="form-group">
                <label class="col-sm-2 control-label">Отчество</label>
                <div class="col-sm-10 control-info">
                    <div><span :class="{danger: isDifferent('middleName')}">{{info.old.middleName}}</span> <span v-if="isDifferent('middleName')"> \ {{info.new.middleName}} </span></div>
                </div>
        </div>
        <div class="form-group">
                <label class="col-sm-2 control-label">Ник</label>
                <div class="col-sm-10 control-info">
                    <div><span :class="{danger: isDifferent('nickName')}">{{info.old.nickName}}</span> <span v-if="isDifferent('nickName')"> \ {{info.new.nickName}} </span></div>
                </div>
        </div>

        <div class="form-group">
            <label class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10  control-info">
                <div><span :class="{danger: isDifferent('email')}">{{info.old.email}}</span> <span v-if="isDifferent('email')"> \ {{info.new.email}} </span></div>
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
                        "old" : {
                            "login": "",
                            "lastName": "",
                            "firstName": "",
                            "middleName": "",
                            "nickName": "",
                            "position": "",
                            "email": ""
                        },
                        "new" : {
                            "login": "",
                            "lastName": "",
                            "firstName": "",
                            "middleName": "",
                            "nickName": "",
                            "position": "",
                            "email": ""
                        }
                    }
                }
            },
        },
        created(){
            for (let prop in  this.info.old) {
                if(this.info.old[prop].trim() == "") this.info.old[prop] = this.t("no");
                if(this.info.new[prop].trim() == "") this.info.new[prop] = this.t("no");
            }

        },
        computed: {
            isDifferent() {
                let self = this;
                return (name) => {
                   return self.info.old[name] != self.info.new[name];
                }
            }
        },
        methods: {


        },
        locales: {
            ru: {
                "no": "нет"
            }

        }
    }
</script>
<style lang="scss" scoped="">
    .control-info {
        padding-top: 7px;
    }
    .danger {
        color: red;
        text-decoration: line-through;
    }
</style>
