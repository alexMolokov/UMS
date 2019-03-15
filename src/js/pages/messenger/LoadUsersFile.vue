<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>Загрузка пользователей</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Загрузка пользователей</li>
            </ol>
        </section>

        <section class="content">
            <div class="box box-body">
                <div class="row">
                    <div class="col-sm-12 col-lg-10">
                        <div class="nav-tabs-custom" v-if="!isFinish">
                            <ul class="nav nav-tabs nav-master">
                                <li :class="{ active: isActive(1), done: isDone(1)}">
                                    <a href="#" @click.prevent="preventClick()">
                                        <h3>Шаг 1</h3>
                                        <div>Загрузить файл</div>
                                    </a>
                                </li>
                                <li :class="{ active: isActive(2)}">
                                    <a href="#"  @click.prevent="preventClick()">
                                        <h3>Шаг 2</h3>
                                        <div>Просмотр \ Редактирование</div>
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content tab-master">
                                <div class="tab-pane" :class="{ active: isActive(1)}">
                                    <div class="file-wrapper">
                                        <input type="file"  id="files" ref="files" accept=".csv" class="inputfile" @change="handleFileUploads()">
                                        <label for="files"><img src="/img/icons/icon-download.svg"><span>{{labelForFiles()}}</span></label>
                                    </div>

                                    <div v-if="isFileErrors()" class="alert alert-danger fade in alert-dismissible">
                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true" @click.prevent="closeErrors">×</button>
                                        <div class="top-10">
                                            Ошибка
                                        </div>
                                    </div>

                                    <div>
                                        <div>Файл в формате csv</div>
                                        <div>Порядок полей: Фамилия, Имя, Отчество, Email</div>
                                        <div><a href="/examples/importUsers.csv" target="_blank">Пример файла</a></div>
                                    </div>
                                </div>
                                <!-- /.tab-pane -->
                                <div class="tab-pane" :class="{ active: isActive(2)}">
                                    <form-edit-user-load-file :data="cloneObject(userData)" v-if="showForm.formEditUserLoadFile" @close="showForm.formEditUserLoadFile = false" @form:edited-user="editedUser">

                                    </form-edit-user-load-file>

                                    <form-choose-ou  v-show="showForm.formChooseOu" @close="showForm.formChooseOu = false" @ou:selected-node="setOU"></form-choose-ou>

                                    <div class="row" style="margin-bottom: 20px">
                                        <div class="col-xs-6"><p>Необходимо заполнить поля</p> <p>Фамилия, Имя, Email и Подразделение</p>
                                        </div>
                                        <div class="col-xs-6">
                                            <div class="pull-right create-button">
                                                <button type="button" class="btn btn-block btn-primary" @click="chooseOU" :disabled="chooseOUDisabled">Выбрать подразделение</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="margin-bottom: 20px">
                                        <div class="col-xs-12">
                                            <vuetable :fields="table.fields"
                                              :css="table.css"
                                              :api-mode="false"
                                              :data-total="users.length"
                                              :has-filters="false"
                                              tableHeight="500px"
                                              ref="loadUsersTable"
                                              v-show="fileLoaded">

                                        <template slot="lastName" slot-scope="props">
                                            <a href="#" @click.prevent="editAction(props.rowData)">{{props.rowData.lastName}}</a>
                                        </template>

                                        <template slot="actions" slot-scope="props">
                                            <div class="delete-edit-table-action">
                                                <a href="#" @click.prevent="editAction(props.rowData)"><i class="fa fa-edit"></i></a>
                                                <a href="#" @click.prevent="deleteAction(props.rowIndex)"><i class="fa fa-trash-o" style="color: red"></i></a>
                                            </div>
                                        </template>
                                    </vuetable>
                                        </div>
                                    </div>

                                    <error-inform :err="err" :state="state" @error-inform:closed="errorClosed"></error-inform>

                                    <div class="row">
                                        <div class="col-xs-12">
                                            <div class="overlay-wrapper pull-right" style="position: relative">
                                                <button type="button" class="btn btn-block btn-primary" @click.prevent="validate">Сохранить</button>
                                                <div class="overlay" v-if="submitting"><i class="fa fa-refresh fa-spin"></i></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <!-- /.tab-pane -->
                            </div>
                            <!-- /.tab-content -->
                        </div>
                        <div class="alert alert-success alert-dismissible" v-if="isFinish">
                               {{okMessage}}
                        </div>
                    </div>
                </div>
            </div>

            <!-- /.box -->

        </section>


    </div>
</template>

<script>
    //import ChangePasswordForm  from '../../components/modules/messenger/ChangePasswordForm.vue';

    import Papa from 'papaparse';
    import Vuetable from "vuetable-2/src/components/Vuetable.vue";
    import FormEditUserLoadFile from "../../components/window/messenger/formEditUserLoadFile.vue";
    import FormChooseOu from "../../components/window/messenger/formChooseOU.vue";
    import errorInform from '../../mixins/error-inform.vue';
    import ajaxform from '../../mixins/ajax-form.vue';
    import {STATES} from "../../mixins/states";

    export default {
        components: {
            FormEditUserLoadFile,
            Papa,
            Vuetable,
            FormChooseOu,
            errorInform
        },
        name: 'load-users-file',
        mixins: [ajaxform],
        data(){
            return {
                table: {
                    css: {
                        tableClass: "table table-bordered table-striped dataTable",
                        loadingClass: 'loading',
                        ascendingIcon: 'fa fa-sort-amount-asc',
                        descendingIcon: 'fa fa-sort-amount-desc',
                        detailRowClass: 'vuetable-detail-row',
                        handleIcon: 'grey sidebar icon',
                        sortableIcon: 'sortable-hidden',
                        tableFilterClass: "form-control"
                    },
                    fields: [
                        {
                            name: '__sequence',
                            title: '#',
                            titleClass: 'text-center',
                            dataClass: 'text-center',
                            width: "30px"
                        },
                        {
                            name: '__checkbox',
                            titleClass: 'text-center',
                            dataClass: 'text-center',
                            width: "30px"
                         },
                        {
                            name: '__slot:lastName',
                            title: "Фамилия",
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            sortField: 'lastName',
                            filtered: false,
                            filtername: "lastName"

                        },
                        {
                            name: 'firstName',
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            title: "Имя",
                            sortField: 'firstName',
                            filtered: false,
                            filtername: "firstName"

                        },
                        {
                            name: 'middleName',
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            title: "Отчество",
                            sortField: 'middleName',
                            filtered: false,
                        },
                        {
                            name: 'email',
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            title: "Email",
                            sortField: 'email',
                            filtered: false,
                            filtername: "email"
                        },
                        {
                            name: 'ouname',
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            title: "Подразделение",
                            filtered: false
                        },
                        {
                            name: '__slot:actions',
                            titleClass: 'text-center',
                            dataClass: 'text-right',
                            title: "Действия",
                            filtered: false
                        },
                        {
                            name: 'ou',
                            visible: false
                        },
                        {
                            name: 'id',
                            visible: false
                        }


                    ],
                },
                users: [],
                step: {
                    current: 1,
                    count: 2,
                    start: 1,
                    finish: 3
                },

                files: [],
                fileLoaded: false,

                showForm: {
                    formEditUserLoadFile: false,
                    formChooseOu: false
                },
                userData: {},
                okMessage: "",


                error: {
                    reason: ""
                }


            }
        },
        computed: {
            chooseOUDisabled(){
                if(!this.fileLoaded) return true;

                let table = this.getTableReference();
                return table.selectedTo.length == 0;
            },
            isFinish(){
                return this.step.current == this.step.finish;
            }
        },
        methods: {
            chooseOU(){
                this.showForm.formChooseOu = true;
            },
            setOU(node) {
                let table =  this.getTableReference();

                let selected = table.selectedTo.sort(
                    function(a,b) {
                        return a - b;
                    }
                );

                let self = this;
                this.users.data.forEach(function(item, index){
                        if(selected.indexOf(item.id) !== -1){
                            let row = self.users.data[index];
                            row.ou[0] = node.id;
                            row.ouname = node.name;
                            table.unselectId(item.id);
                        }
                });

                table.setData(this.users);
            },

            editedUser(user){
                let self = this;
                let keys = Object.keys(user);
                keys.forEach(function(key){
                    self.userData[key] = user[key];
                });

                this.userData = user;
            },
            cloneObject(obj){
                let keys = Object.keys(obj);
                let result = {};
                keys.forEach(function(key){
                    result[key] = obj[key];
                });
                return result;
            },
            editAction(data){
               this.userData = data;
               this.showForm.formEditUserLoadFile=true;
            },
            deleteAction(index){
                let table = this.getTableReference();
                let key = this.users.data[index].id;

                table.unselectId(key);
                this.users.data.splice(index,1);
                table.setData(this.users);
                if(this.users.data.length == 0) {
                    this.step.current = this.step.start;
                }
            },
            getTableReference(){
                return this.$refs["loadUsersTable"];
            },

            isActive(tab) {
                return (tab === this.step.current);
            },
            isDone(tab) {
                return (tab < this.step.current)
            },

            preventClick(){

            },
            labelForFiles() {
                if (this.files.length > 1) {
                    return this.files.length + " " + this.$translate.text("файл выбран");
                } else if (this.files.length == 0) {
                    return this.$translate.text("Выберите файл с пользователями");
                }  else {
                    return this.files[0].name
                }
            },
            handleFileUploads(){
                let file = document.getElementById('files').files[0];
                let self = this;
                Papa.parse(file, {
                    complete: function(results) {
                        self.users = self.vuetableDataAdapter(results.data);
                        self.fileLoaded = true;
                        self.getTableReference().setData(self.users);
                        self.step.current++;
                    },
                    error: function(err, file, inputElem, reason)
                    {
                        self.error.reason = reason;
                    }

            });


            },
            vuetableDataAdapter(data){
                let result = {current_page: 1, links: {pagination: {total: 1, from: 1}}, data: []};
                let i = 0;
                let self = this;
                data.forEach(function(item, index){
                    let isValidEmail = self.$validator.rules["email"].validate(item[3])
                    result.data.push({
                        "id": i,
                        "lastName": item[0],
                        "firstName": item[1],
                        "middleName": item[2],
                        "email": (isValidEmail)? item[3]: "",
                        "ou": [],
                        "ouname": ""
                    });
                    i++;
                });
                return result;
            },
            isFileErrors(){
               return  this.error.reason.trim() != ""
            },
            closeErrors(){
                this.error.reason = ""
            },
            isFilled(user) {

                return user.ouname != "" && user.lastName != "" && user.firstName != "" && user.email != "";
            },
            errorClosed(){
                this.state = STATES.START;
                this.$validator.errors.clear();
                this.err.common = [];
            },



            validate() {

                this.state = STATES.START;
                this.$validator.errors.clear();

                let len = this.users.data.length;
                for(let i = 0; i< len; i++)
                {
                    let user = this.users.data[i];

                    if(!this.isFilled(user))
                    {
                        this.state = STATES.ERROR;
                        this.err.common = [];
                        this.err.common.push("Необходимо заполнить поля Фамилия, Имя, Email и Подразделение");
                        return;
                    }
                }

                let self = this;
                this.send("/user/create/csv", {users: this.users.data}, (response) => {
                        self.step.current = self.step.finish;
                        self.okMessage = response.message;
                }, () => {
                    alert("bad");
                });


            }

        },
        locales: {
            uz: {

            }
        }
    }
</script>
<style lang="scss">

    .vuetable-head-wrapper {
       table {
           margin-bottom: 0px;
       }
    }

    .vuetable-body-wrapper {
        &::-webkit-scrollbar {
            width: 3px;
            background-color: #F5F5F5;
        }


        table {
            margin-bottom: 0px;
            tr {
                td {
                    border: 0px !important;
                }
            }
        }

    }

    .nav-master {
        h3 {
            margin: 5px;
        }

        a {
            cursor: none;
        }

        .done {
            h3,a  {
                color: green !important;
            }
        }
    }

    .tab-master {
        .tab-pane {
                padding: 20px;
        }

        table {
            table-layout: fixed;
        }
    }



    .file-wrapper {
        margin-bottom: 20px;
        position: relative;
        display: inline-block;

        .inputfile {
            width: 100%;
            height: 100%;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: 2;
            cursor: pointer;
        }

        .inputfile + label {
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 500;
            color: white;

            display: inline-block;
            padding: 7px 20px;
            border-radius: 3px;
            cursor: pointer;
            background-color: #00a0c8;

            span {
                cursor: pointer;
            }
        }

        .inputfile + label > img {
            display: inline-block;
            margin: 0 5px 5px 5px;
            width: 20px;
            height: 20px;
            color: #fff;
            cursor: pointer;
        }
    }

    .delete-edit-table-action {
        a {
            display: inline-block;
            margin-right: 8px;
            font-size: 16px;
        }
    }



</style>
